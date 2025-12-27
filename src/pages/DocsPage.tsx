import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DocsNavbar } from '@/components/docs/DocsNavbar';
import { DocsSidebar, defaultDocSections } from '@/components/docs/DocsSidebar';
import { DocsMobileNav } from '@/components/docs/DocsMobileNav';
import { MarkdownRenderer } from '@/components/docs/MarkdownRenderer';
import { getDocContent } from '@/content/docs';
import { SiteFooter } from '@/components/ccswitch/SiteFooter';
import { ChevronLeft, ChevronRight, Edit, Clock } from 'lucide-react';

export default function DocsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState(searchParams.get('section') || 'introduction');
  const [activeItem, setActiveItem] = useState<string | undefined>(searchParams.get('item') || undefined);
  const [content, setContent] = useState('');

  useEffect(() => {
    const newContent = getDocContent(activeSection, activeItem);
    setContent(newContent);
    
    // Update URL
    const params = new URLSearchParams();
    params.set('section', activeSection);
    if (activeItem) {
      params.set('item', activeItem);
    }
    setSearchParams(params, { replace: true });
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [activeSection, activeItem, setSearchParams]);

  const handleNavigate = (sectionId: string, itemId?: string) => {
    setActiveSection(sectionId);
    setActiveItem(itemId);
  };

  // Find current position for prev/next navigation
  const flattenedNav = defaultDocSections.flatMap(section => {
    const items = [{ sectionId: section.id, itemId: undefined, title: section.title }];
    if (section.items) {
      section.items.forEach(item => {
        items.push({ sectionId: section.id, itemId: item.id, title: item.title });
      });
    }
    return items;
  });

  const currentIndex = flattenedNav.findIndex(
    nav => nav.sectionId === activeSection && nav.itemId === activeItem
  );
  const prevNav = currentIndex > 0 ? flattenedNav[currentIndex - 1] : null;
  const nextNav = currentIndex < flattenedNav.length - 1 ? flattenedNav[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <DocsNavbar />
      
      <div className="pt-16">
        <div className="container max-w-[1400px] mx-auto px-4">
          <div className="flex gap-8 py-8">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
              <DocsSidebar
                sections={defaultDocSections}
                activeSection={activeSection}
                activeItem={activeItem}
                onNavigate={handleNavigate}
              />
            </div>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <motion.article
                key={`${activeSection}-${activeItem}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl"
              >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <a href="/docs" className="hover:text-foreground transition-colors">Docs</a>
                  <ChevronRight className="w-4 h-4" />
                  <span className="capitalize">{activeSection.replace(/-/g, ' ')}</span>
                  {activeItem && (
                    <>
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-foreground capitalize">{activeItem.replace(/-/g, ' ')}</span>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <MarkdownRenderer content={content} />
                </div>

                {/* Page Footer */}
                <div className="border-t border-border pt-6 mt-8">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
                    <div className="flex items-center gap-4">
                      <a
                        href={`https://github.com/farion1231/cc-switch/edit/main/docs/${activeSection}/${activeItem || 'index'}.md`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit this page
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Last updated: Dec 2024
                    </div>
                  </div>

                  {/* Prev/Next Navigation */}
                  <div className="grid grid-cols-2 gap-4">
                    {prevNav ? (
                      <button
                        onClick={() => handleNavigate(prevNav.sectionId, prevNav.itemId)}
                        className="flex flex-col items-start p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-left group"
                      >
                        <span className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          Previous
                        </span>
                        <span className="font-medium text-foreground">{prevNav.title}</span>
                      </button>
                    ) : (
                      <div />
                    )}
                    
                    {nextNav ? (
                      <button
                        onClick={() => handleNavigate(nextNav.sectionId, nextNav.itemId)}
                        className="flex flex-col items-end p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-right group"
                      >
                        <span className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          Next
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="font-medium text-foreground">{nextNav.title}</span>
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </motion.article>
            </main>

            {/* Table of Contents - Desktop */}
            <div className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-24 text-sm">
                <h4 className="font-semibold text-foreground mb-3">On this page</h4>
                <div className="space-y-2 text-muted-foreground">
                  {/* This could be enhanced to parse headings from content */}
                  <a href="#" className="block hover:text-foreground transition-colors">Overview</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <DocsMobileNav
        sections={defaultDocSections}
        activeSection={activeSection}
        activeItem={activeItem}
        onNavigate={handleNavigate}
      />

      <SiteFooter />
    </div>
  );
}
