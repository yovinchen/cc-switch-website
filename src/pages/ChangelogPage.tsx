import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SiteNavbar } from '@/components/ccswitch/SiteNavbar';
import { SiteFooter } from '@/components/ccswitch/SiteFooter';
import { MarkdownRenderer } from '@/components/docs/MarkdownRenderer';
import { SEOHead } from '@/components/SEOHead';
import { useLanguage } from '@/i18n/LanguageContext';
import { CHANGELOG_MARKDOWN } from '@/content/changelog';

interface VersionEntry {
  version: string;
  date: string;
  content: string;
  isPreRelease: boolean;
}

export default function ChangelogPage() {
  const { t } = useLanguage();
  const [activeVersion, setActiveVersion] = useState<string>('');
  const [expandedVersions, setExpandedVersions] = useState<string[]>([]);

  // Parse changelog into version entries
  const versions = useMemo(() => {
    const entries: VersionEntry[] = [];
    // Match version headers like ## [3.9.0-1] - 2025-12-18
    const versionRegex = /^## \[([^\]]+)\]\s*-\s*(\d{4}-\d{2}-\d{2})/gm;
    const parts = CHANGELOG_MARKDOWN.split(versionRegex);

    // Skip the first part (content before first version)
    for (let i = 1; i < parts.length; i += 3) {
      const version = parts[i];
      const date = parts[i + 1];
      const content = parts[i + 2]?.trim() || '';
      
      if (version && date) {
        entries.push({
          version,
          date,
          content: `## [${version}] - ${date}\n\n${content}`,
          isPreRelease: version.includes('-') || version.includes('beta') || version.includes('alpha'),
        });
      }
    }

    return entries;
  }, []);

  // Set first version as active and expanded by default
  useEffect(() => {
    if (versions.length > 0 && !activeVersion) {
      setActiveVersion(versions[0].version);
      setExpandedVersions([versions[0].version]);
    }
  }, [versions, activeVersion]);

  const handleVersionClick = (version: string) => {
    setActiveVersion(version);
    setExpandedVersions(prev => 
      prev.includes(version) ? prev : [...prev, version]
    );
    
    // Scroll to version section
    const element = document.getElementById(`version-${version}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Track scroll position to highlight active version
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const version of versions) {
        const element = document.getElementById(`version-${version.version}`);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveVersion(version.version);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [versions]);

  const activeVersionData = versions.find(v => v.version === activeVersion);

  return (
    <>
      <SEOHead
        title={`${t.changelog.title} - CC Switch`}
        description={t.changelog.description}
      />
      <div className="min-h-screen bg-background">
        <SiteNavbar />
        
        <main className="pt-20 md:pt-24">
          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {(
              <div className="flex gap-8">
                {/* Version Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0">
                  <nav className="sticky top-24 space-y-1">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      {t.changelog.versions}
                    </h4>
                    <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                      {versions.map((entry) => (
                        <button
                          key={entry.version}
                          onClick={() => handleVersionClick(entry.version)}
                          className={cn(
                            'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all duration-200',
                            activeVersion === entry.version
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          )}
                        >
                          <ChevronRight className={cn(
                            'w-3 h-3 transition-transform',
                            activeVersion === entry.version && 'rotate-90'
                          )} />
                          <span className="flex-1">v{entry.version}</span>
                          {entry.isPreRelease && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                              beta
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  {/* Mobile Version Selector */}
                  <div className="lg:hidden mb-6">
                    <select
                      value={activeVersion}
                      onChange={(e) => handleVersionClick(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                    >
                      {versions.map((entry) => (
                        <option key={entry.version} value={entry.version}>
                          v{entry.version} - {entry.date}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Version Cards */}
                  <div className="space-y-8">
                    {versions.map((entry, index) => (
                      <motion.div
                        key={entry.version}
                        id={`version-${entry.version}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className={cn(
                          'border border-border rounded-xl overflow-hidden transition-all duration-300',
                          activeVersion === entry.version
                            ? 'ring-2 ring-primary/30 shadow-lg shadow-primary/5'
                            : 'hover:border-primary/30'
                        )}
                      >
                        {/* Version Header */}
                        <div className={cn(
                          'px-6 py-4 border-b border-border flex items-center justify-between',
                          entry.isPreRelease ? 'bg-amber-500/5' : 'bg-muted/50'
                        )}>
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              'text-xl font-bold',
                              entry.isPreRelease ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'
                            )}>
                              v{entry.version}
                            </span>
                            {entry.isPreRelease && (
                              <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium">
                                {t.changelog.betaRelease}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{entry.date}</span>
                          </div>
                        </div>

                        {/* Version Content */}
                        <div className="p-6">
                          <MarkdownRenderer 
                            content={entry.content.replace(/^## \[[^\]]+\]\s*-\s*\d{4}-\d{2}-\d{2}\s*\n*/m, '')} 
                            className="changelog-content"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Table of Contents for active version */}
                {activeVersionData && (
                  <aside className="hidden xl:block w-56 shrink-0">
                    <div className="sticky top-24">
                      <h4 className="font-semibold text-foreground mb-4 text-sm">
                        {t.changelog.inVersion.replace('{version}', activeVersion)}
                      </h4>
                      <VersionToc content={activeVersionData.content} />
                    </div>
                  </aside>
                )}
              </div>
            )}
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}

// Simple TOC for version sections
function VersionToc({ content }: { content: string }) {
  const headings = useMemo(() => {
    const regex = /^### (.+)$/gm;
    const items: { text: string; id: string }[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      items.push({ text, id });
    }

    return items;
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <ul className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.id}>
          <span className="text-muted-foreground hover:text-foreground transition-colors cursor-default">
            {heading.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
