import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Book, Rocket, Settings, Code, Puzzle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DocSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  items?: {
    id: string;
    title: string;
  }[];
}

interface DocsSidebarProps {
  sections: DocSection[];
  activeSection: string;
  activeItem?: string;
  onNavigate: (sectionId: string, itemId?: string) => void;
}

export function DocsSidebar({ sections, activeSection, activeItem, onNavigate }: DocsSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([activeSection]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSectionClick = (sectionId: string) => {
    toggleSection(sectionId);
    onNavigate(sectionId);
  };

  const handleItemClick = (sectionId: string, itemId: string) => {
    onNavigate(sectionId, itemId);
  };

  return (
    <aside className="w-64 lg:w-72 shrink-0">
      <nav className="sticky top-24 space-y-1">
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const isActive = activeSection === section.id;
          const hasItems = section.items && section.items.length > 0;

          return (
            <div key={section.id}>
              <button
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200',
                  isActive && !activeItem
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {section.icon && (
                  <span className="text-primary/70">{section.icon}</span>
                )}
                <span className="flex-1 text-sm">{section.title}</span>
                {hasItems && (
                  <motion.span
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.span>
                )}
              </button>

              <AnimatePresence>
                {hasItems && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-1 space-y-0.5 border-l border-border pl-3">
                      {section.items?.map((item) => {
                        const isItemActive = activeSection === section.id && activeItem === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleItemClick(section.id, item.id)}
                            className={cn(
                              'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200',
                              isItemActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                          >
                            {item.title}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// Default sections with icons
export const defaultDocSections: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: <Book className="w-4 h-4" />,
    items: [
      { id: 'what-is-ccswitch', title: 'What is CC Switch?' },
      { id: 'why-ccswitch', title: 'Why CC Switch?' },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <Rocket className="w-4 h-4" />,
    items: [
      { id: 'installation', title: 'Installation' },
      { id: 'quick-start', title: 'Quick Start' },
      { id: 'first-project', title: 'First Project' },
    ],
  },
  {
    id: 'configuration',
    title: 'Configuration',
    icon: <Settings className="w-4 h-4" />,
    items: [
      { id: 'providers', title: 'AI Providers' },
      { id: 'api-keys', title: 'API Keys' },
      { id: 'preferences', title: 'Preferences' },
    ],
  },
  {
    id: 'usage',
    title: 'Usage Guide',
    icon: <Code className="w-4 h-4" />,
    items: [
      { id: 'basic-usage', title: 'Basic Usage' },
      { id: 'shortcuts', title: 'Keyboard Shortcuts' },
      { id: 'advanced', title: 'Advanced Features' },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: <Puzzle className="w-4 h-4" />,
    items: [
      { id: 'cursor', title: 'Cursor IDE' },
      { id: 'vscode', title: 'VS Code' },
      { id: 'other-ides', title: 'Other IDEs' },
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: <HelpCircle className="w-4 h-4" />,
  },
];

type DocNavTranslations = {
  docs?: {
    nav?: {
      sections?: Record<string, string>;
      items?: Record<string, string>;
    };
  };
};

export function getDocSections(t: DocNavTranslations): DocSection[] {
  const sectionTitles = t.docs?.nav?.sections ?? {};
  const itemTitles = t.docs?.nav?.items ?? {};

  return defaultDocSections.map((section) => ({
    ...section,
    title: sectionTitles[section.id] ?? section.title,
    items: section.items?.map((item) => ({
      ...item,
      title: itemTitles[item.id] ?? item.title,
    })),
  }));
}
