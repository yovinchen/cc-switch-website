import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Rocket, Users, Puzzle, Server, HelpCircle } from 'lucide-react';
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
    id: 'getting-started',
    title: '快速入门',
    icon: <Rocket className="w-4 h-4" />,
    items: [
      { id: 'introduction', title: '软件介绍' },
      { id: 'installation', title: '安装指南' },
      { id: 'interface', title: '界面概览' },
      { id: 'quickstart', title: '快速上手' },
      { id: 'settings', title: '个性化配置' },
    ],
  },
  {
    id: 'providers',
    title: '供应商管理',
    icon: <Users className="w-4 h-4" />,
    items: [
      { id: 'add', title: '添加供应商' },
      { id: 'switch', title: '切换供应商' },
      { id: 'edit', title: '编辑供应商' },
      { id: 'sort-duplicate', title: '排序与复制' },
      { id: 'usage-query', title: '用量查询' },
    ],
  },
  {
    id: 'extensions',
    title: '扩展功能',
    icon: <Puzzle className="w-4 h-4" />,
    items: [
      { id: 'mcp', title: 'MCP 服务器' },
      { id: 'prompts', title: 'Prompts 提示词' },
      { id: 'skills', title: 'Skills 技能' },
    ],
  },
  {
    id: 'proxy',
    title: '代理与高可用',
    icon: <Server className="w-4 h-4" />,
    items: [
      { id: 'service', title: '代理服务' },
      { id: 'takeover', title: '应用接管' },
      { id: 'failover', title: '故障转移' },
      { id: 'usage', title: '用量统计' },
      { id: 'model-test', title: '模型检查' },
    ],
  },
  {
    id: 'faq',
    title: '常见问题',
    icon: <HelpCircle className="w-4 h-4" />,
    items: [
      { id: 'config-files', title: '配置文件说明' },
      { id: 'questions', title: 'FAQ' },
      { id: 'deeplink', title: '深度链接协议' },
      { id: 'env-conflict', title: '环境变量冲突' },
    ],
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
