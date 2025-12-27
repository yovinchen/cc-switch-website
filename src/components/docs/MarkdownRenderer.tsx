import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-lua';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function CodeBlock({ className, children }: { className?: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  
  // Extract language from className (e.g., "language-javascript")
  const language = className?.replace('language-', '') || 'text';
  
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-muted/80 hover:bg-muted border border-border/50 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <div className="absolute left-3 top-2 text-xs text-muted-foreground/60 uppercase tracking-wider">
        {language}
      </div>
      <pre className="bg-card border border-border rounded-xl pt-10 pb-4 px-4 overflow-x-auto text-sm">
        <code ref={codeRef} className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // Generate heading IDs for TOC linking
  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <div className={cn('prose-docs', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const id = generateId(String(children));
            return (
              <h1 id={id} className="text-3xl md:text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0 border-b border-border pb-4 scroll-mt-24">
                {children}
              </h1>
            );
          },
          h2: ({ children }) => {
            const id = generateId(String(children));
            return (
              <h2 id={id} className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10 scroll-mt-24">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = generateId(String(children));
            return (
              <h3 id={id} className="text-xl md:text-2xl font-semibold text-foreground mb-3 mt-8 scroll-mt-24">
                {children}
              </h3>
            );
          },
          h4: ({ children }) => {
            const id = generateId(String(children));
            return (
              <h4 id={id} className="text-lg font-semibold text-foreground mb-2 mt-6 scroll-mt-24">
                {children}
              </h4>
            );
          },
          p: ({ children }) => (
            <p className="text-muted-foreground leading-7 mb-4">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-7">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-muted/30 rounded-r-lg text-muted-foreground">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes('language-');
            const codeString = String(children).replace(/\n$/, '');
            
            if (isBlock) {
              return <CodeBlock className={className}>{codeString}</CodeBlock>;
            }
            
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => {
            // Just pass through - the code component handles the pre styling
            return <>{children}</>;
          },
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6 rounded-xl border border-border">
              <table className="w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border px-4 py-3 text-muted-foreground">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="border-border my-8" />
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-xl border border-border shadow-lg my-6 max-w-full"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
