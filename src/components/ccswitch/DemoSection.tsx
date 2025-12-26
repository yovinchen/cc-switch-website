import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Server, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'provider', label: 'Provider 管理', icon: Layers },
  { id: 'proxy', label: '代理服务器', icon: Server },
  { id: 'stats', label: '使用统计', icon: BarChart3 },
];

const demoContent = {
  provider: (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Provider 配置</h3>
        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium">3 个活跃</span>
      </div>
      <div className="space-y-3">
        {['OpenAI', 'Anthropic', 'Google AI'].map((provider, i) => (
          <div key={provider} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white',
              i === 0 ? 'bg-green-500' : i === 1 ? 'bg-orange-500' : 'bg-blue-500'
            )}>
              {provider[0]}
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{provider}</div>
              <div className="text-sm text-muted-foreground">已配置 · 优先级 {i + 1}</div>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        ))}
      </div>
    </div>
  ),
  proxy: (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">代理服务器状态</h3>
        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium">运行中</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
          <div className="text-2xl font-bold text-foreground">127.0.0.1</div>
          <div className="text-sm text-muted-foreground">监听地址</div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
          <div className="text-2xl font-bold text-primary">15721</div>
          <div className="text-sm text-muted-foreground">端口</div>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <code className="text-sm text-foreground font-mono">
          export OPENAI_BASE_URL=http://127.0.0.1:15721
        </code>
      </div>
    </div>
  ),
  stats: (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">本月使用统计</h3>
        <span className="text-sm text-muted-foreground">2025年1月</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center">
          <div className="text-2xl font-bold text-foreground">1.2M</div>
          <div className="text-sm text-muted-foreground">Token 使用</div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center">
          <div className="text-2xl font-bold text-green-500">$24.50</div>
          <div className="text-sm text-muted-foreground">预估成本</div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary">856</div>
          <div className="text-sm text-muted-foreground">API 调用</div>
        </div>
      </div>
      <div className="h-32 rounded-xl bg-muted/30 flex items-end justify-around p-4 gap-2">
        {[40, 65, 45, 80, 60, 75, 50].map((h, i) => (
          <div key={i} className="flex-1 bg-primary/60 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  ),
};

export function DemoSection() {
  const [activeTab, setActiveTab] = useState('provider');

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-display-md text-foreground mb-4 md:mb-6">
            直观的操作界面
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            所见即所得，零学习成本
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <div className="inline-flex gap-1 md:gap-2 p-1.5 md:p-2 rounded-xl bg-card border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all text-sm md:text-base',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Demo Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow Background */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple/20 rounded-3xl blur-3xl opacity-50" />

          {/* Window */}
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
            {/* macOS Window Bar */}
            <div className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 bg-muted/50 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="ml-4 text-sm text-muted-foreground">
                CC Switch - {tabs.find(t => t.id === activeTab)?.label}
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px] md:min-h-[400px]"
              >
                {demoContent[activeTab as keyof typeof demoContent]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
