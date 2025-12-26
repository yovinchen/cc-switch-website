import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Server, BarChart3, Settings, Wifi, 
  Key, Monitor, Plus, Copy, ChevronUp, 
  Activity, Clock, TrendingUp, ListOrdered, DollarSign, Database
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { ProviderList, defaultProviders } from './ProviderCard';

const tabs = [
  { id: 'provider', label: 'Provider 管理', icon: Layers },
  { id: 'proxy', label: '代理服务器', icon: Server },
  { id: 'stats', label: '使用统计', icon: BarChart3 },
];

// Provider management tab content
function ProviderContent() {
  const [proxyEnabled, setProxyEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'claude' | 'codex' | 'gemini'>('claude');
  const [activeProvider, setActiveProvider] = useState(0);

  const cliTabs = [
    { id: 'claude' as const, label: 'Claude', icon: '✳', color: 'text-orange-500' },
    { id: 'codex' as const, label: 'Codex', icon: '◎', color: 'text-emerald-500' },
    { id: 'gemini' as const, label: 'Gemini', icon: '◆', color: 'text-blue-500' },
  ];

  const handleTabChange = (tabId: 'claude' | 'codex' | 'gemini') => {
    setActiveTab(tabId);
    setActiveProvider(0); // Reset to first provider on tab change
  };

  return (
    <div className="p-4 md:p-6">
      {/* App Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-emerald-500">CC Switch</span>
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-4">
          {/* Proxy Toggle */}
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Proxy</span>
            <button
              onClick={() => setProxyEnabled(!proxyEnabled)}
              className={cn(
                "w-11 h-6 rounded-full flex items-center px-0.5 transition-colors",
                proxyEnabled ? "bg-emerald-500" : "bg-muted-foreground/30"
              )}
            >
              <motion.div
                animate={{ x: proxyEnabled ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          {/* CLI Tabs */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {cliTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "relative px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors",
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="demo-tab-bg"
                    className="absolute inset-0 bg-card rounded-md shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={cn("relative z-10", tab.color)}>{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-muted-foreground" />
            <Monitor className="w-4 h-4 text-muted-foreground" />
            <Server className="w-4 h-4 text-muted-foreground" />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Provider List with animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ProviderList
            providers={defaultProviders}
            activeProvider={activeProvider}
            proxyEnabled={proxyEnabled}
            onSelectProvider={setActiveProvider}
            compact={false}
            animationKey={`demo-${activeTab}`}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Proxy server tab content
function ProxyContent() {
  const failoverQueues = {
    Claude: [
      { rank: 1, name: 'PackyCode AWS', status: '正常' },
      { rank: 2, name: 'PackyCode', status: '正常' },
    ],
    Codex: [
      { rank: 1, name: 'right.codes', status: '正常' },
      { rank: 2, name: 'DMXAPI', status: '正常' },
    ],
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Server className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">本地代理</h3>
            <p className="text-sm text-muted-foreground">控制代理服务开关、查看状态与端口信息</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
          <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-1.5">
            <Activity className="w-3 h-3" /> 运行中
          </span>
          <Switch checked className="data-[state=checked]:bg-primary" />
        </div>
      </div>

      {/* Service Address */}
      <div className="p-5 rounded-xl border border-border bg-card mb-6">
        <div className="text-sm text-muted-foreground mb-2">服务地址</div>
        <div className="flex items-center justify-between">
          <code className="text-lg font-mono text-foreground">http://127.0.0.1:15721</code>
          <button className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            复制
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">修改监听地址/端口需要先停止代理服务</p>
      </div>

      {/* Usage Status */}
      <div className="mb-6 pb-4 border-b border-border">
        <div className="text-sm text-muted-foreground mb-1">使用中</div>
        <p className="text-amber-500">当前 Provider：等待首次请求...</p>
      </div>

      {/* Proxy Enable */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-3">代理启用</div>
        <div className="flex gap-4">
          {['Claude', 'Codex', 'Gemini'].map((name) => (
            <div key={name} className="flex-1 flex items-center justify-between p-3 rounded-xl border border-border bg-card">
              <span className="font-medium text-foreground">{name}</span>
              <Switch checked className="data-[state=checked]:bg-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Log Enable */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 mb-6 flex items-center justify-between">
        <div>
          <div className="font-medium text-foreground">启用日志记录</div>
          <div className="text-sm text-muted-foreground">记录所有代理请求，便于排查问题</div>
        </div>
        <Switch checked className="data-[state=checked]:bg-primary" />
      </div>

      {/* Failover Queue */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <ListOrdered className="w-4 h-4" />
          故障转移队列
        </div>
        
        {Object.entries(failoverQueues).map(([category, items]) => (
          <div key={category} className="mb-4">
            <div className="text-sm text-muted-foreground mb-2 pl-2 border-l-2 border-border">{category}</div>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {item.rank}
                  </span>
                  <span className="flex-1 font-medium text-foreground">{item.name}</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Activity, label: '活跃连接', value: '0' },
          { icon: TrendingUp, label: '总请求数', value: '0' },
          { icon: Clock, label: '成功率', value: '0.0%', highlight: true },
          { icon: Clock, label: '运行时间', value: '37m 14s' },
        ].map((stat) => (
          <div 
            key={stat.label} 
            className={cn(
              "p-4 rounded-xl border",
              stat.highlight ? "border-primary/30 bg-primary/5" : "border-border bg-card"
            )}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <stat.icon className="w-4 h-4" />
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Statistics tab content
function StatsContent() {
  const [period, setPeriod] = useState('7天');
  
  const stats = [
    { icon: Activity, label: '总请求数', value: '1,639', color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { icon: DollarSign, label: '总成本', value: '$64.0068', color: 'text-purple-500', bgColor: 'bg-purple-100' },
    { icon: Layers, label: '总 Token 数', value: '21,986,302', subStats: [{ label: 'Input', value: '21655.6k' }, { label: 'Output', value: '330.7k' }], color: 'text-purple-500', bgColor: 'bg-purple-100' },
    { icon: Database, label: '缓存 Token', value: '13,902,134', subStats: [{ label: 'Write', value: '2394.6k' }, { label: 'Read', value: '11507.5k' }], color: 'text-orange-500', bgColor: 'bg-orange-100' },
  ];

  // Chart data points
  const chartData = [
    { date: '12/20', input: 1000, output: 100, cost: 2 },
    { date: '12/21', input: 9000, output: 200, cost: 22 },
    { date: '12/22', input: 1500, output: 100, cost: 3 },
    { date: '12/23', input: 3000, output: 150, cost: 6 },
    { date: '12/24', input: 3200, output: 200, cost: 17 },
    { date: '12/25', input: 2800, output: 180, cost: 6 },
    { date: '12/26', input: 500, output: 50, cost: 1 },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">使用统计</h3>
          <p className="text-sm text-muted-foreground">查看 AI 模型的使用情况和成本统计</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
          {['24小时', '7天', '30天'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                period === p 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.bgColor)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            {stat.subStats && (
              <div className="flex gap-4 text-sm text-muted-foreground">
                {stat.subStats.map((sub) => (
                  <span key={sub.label}>{sub.label} <span className="text-foreground">{sub.value}</span></span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-semibold text-foreground">使用趋势</h4>
          <span className="text-sm text-muted-foreground">过去 7 天</span>
        </div>
        
        {/* Chart Area */}
        <div className="relative h-48">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-muted-foreground">
            <span>10000k</span>
            <span>7500k</span>
            <span>5000k</span>
            <span>2500k</span>
            <span>0k</span>
          </div>
          <div className="absolute right-0 top-0 bottom-8 flex flex-col justify-between text-xs text-muted-foreground">
            <span>$24</span>
            <span>$18</span>
            <span>$12</span>
            <span>$6</span>
            <span>$0</span>
          </div>
          
          {/* Chart content */}
          <div className="absolute left-12 right-12 top-0 bottom-0">
            <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
              {/* Input area fill */}
              <path
                d="M 0 180 L 0 160 Q 50 160, 100 20 Q 150 10, 200 170 Q 250 175, 300 120 Q 350 110, 400 100 Q 450 100, 500 110 Q 550 120, 600 170 L 700 180 Z"
                fill="hsl(var(--primary) / 0.2)"
              />
              {/* Input line */}
              <path
                d="M 0 160 Q 50 160, 100 20 Q 150 10, 200 170 Q 250 175, 300 120 Q 350 110, 400 100 Q 450 100, 500 110 Q 550 120, 600 170 L 700 180"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
              {/* Cost dashed line */}
              <path
                d="M 0 175 Q 50 175, 100 30 Q 150 20, 200 170 Q 250 175, 300 140 Q 350 130, 400 60 Q 450 55, 500 140 Q 550 150, 600 175 L 700 178"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              {/* Output line */}
              <path
                d="M 0 178 L 100 176 L 200 178 L 300 176 L 400 175 L 500 176 L 600 178 L 700 179"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="absolute left-12 right-12 bottom-0 flex justify-between text-xs text-muted-foreground">
            {chartData.map((d) => (
              <span key={d.date}>{d.date}</span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-red-500" style={{ borderStyle: 'dashed' }} /> 成本
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-primary" /> 输入
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-green-500" /> 输出
          </span>
        </div>
      </div>
    </div>
  );
}

const demoContent = {
  provider: <ProviderContent />,
  proxy: <ProxyContent />,
  stats: <StatsContent />,
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
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow Background */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple/20 rounded-3xl blur-3xl opacity-50" />

          {/* Window */}
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
            {/* macOS Window Bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
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
                className="min-h-[500px] md:min-h-[600px] overflow-auto"
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
