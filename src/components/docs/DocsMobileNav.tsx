import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { DocSection, DocsSidebar } from './DocsSidebar';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

interface DocsMobileNavProps {
  sections: DocSection[];
  activeSection: string;
  activeItem?: string;
  onNavigate: (sectionId: string, itemId?: string) => void;
}

export function DocsMobileNav({ sections, activeSection, activeItem, onNavigate }: DocsMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const handleNavigate = (sectionId: string, itemId?: string) => {
    onNavigate(sectionId, itemId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        aria-label={t.docs.aria.openNav}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-background border-r border-border shadow-xl overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-semibold text-foreground">{t.docs.title}</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label={t.docs.aria.closeNav}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <DocsSidebar
                  sections={sections}
                  activeSection={activeSection}
                  activeItem={activeItem}
                  onNavigate={handleNavigate}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
