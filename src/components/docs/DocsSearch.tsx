import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Hash, ArrowRight, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { docsContent } from '@/content/docs';
import { defaultDocSections, DocSection } from './DocsSidebar';

interface SearchResult {
  sectionId: string;
  itemId?: string;
  title: string;
  content: string;
  type: 'section' | 'heading' | 'content';
}

interface DocsSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string, itemId?: string) => void;
}

export function DocsSearch({ isOpen, onClose, onNavigate }: DocsSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Build searchable index
  const searchIndex = useMemo(() => {
    const results: SearchResult[] = [];
    
    defaultDocSections.forEach(section => {
      // Add section
      results.push({
        sectionId: section.id,
        title: section.title,
        content: '',
        type: 'section',
      });
      
      // Add items
      section.items?.forEach(item => {
        const content = docsContent[section.id]?.[item.id] || '';
        results.push({
          sectionId: section.id,
          itemId: item.id,
          title: item.title,
          content: content.slice(0, 500),
          type: 'section',
        });
      });
    });
    
    return results;
  }, []);

  // Filter results
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return searchIndex.slice(0, 8);
    }
    
    const lowerQuery = query.toLowerCase();
    return searchIndex
      .filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8);
  }, [query, searchIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredResults.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredResults[selectedIndex]) {
            const result = filteredResults[selectedIndex];
            onNavigate(result.sectionId, result.itemId);
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onNavigate, onClose]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleSelect = (result: SearchResult) => {
    onNavigate(result.sectionId, result.itemId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded border border-border text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {filteredResults.length > 0 ? (
                  <div className="space-y-1">
                    {filteredResults.map((result, index) => (
                      <button
                        key={`${result.sectionId}-${result.itemId}`}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                          selectedIndex === index
                            ? 'bg-primary/10 text-foreground'
                            : 'text-muted-foreground hover:bg-muted'
                        )}
                      >
                        <FileText className="w-4 h-4 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{result.title}</div>
                          {result.itemId && (
                            <div className="text-xs text-muted-foreground capitalize">
                              {result.sectionId.replace(/-/g, ' ')}
                            </div>
                          )}
                        </div>
                        <ArrowRight className={cn(
                          'w-4 h-4 shrink-0 transition-opacity',
                          selectedIndex === index ? 'opacity-100' : 'opacity-0'
                        )} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>No results found for "{query}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↵</kbd>
                    to select
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Search trigger button component
interface SearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export function SearchTrigger({ onClick, className }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg border border-border/50 text-muted-foreground hover:text-foreground transition-colors min-w-[200px]',
        className
      )}
    >
      <Search className="w-4 h-4" />
      <span className="text-sm">Search docs...</span>
      <kbd className="ml-auto flex items-center gap-0.5 text-xs bg-background px-1.5 py-0.5 rounded border border-border">
        <Command className="w-3 h-3" />K
      </kbd>
    </button>
  );
}
