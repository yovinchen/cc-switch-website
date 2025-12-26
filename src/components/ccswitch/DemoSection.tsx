import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Server, BarChart3, Settings, Wifi, 
  Key, Monitor, Plus, Copy, ChevronUp, 
  Activity, Clock, TrendingUp, ListOrdered, DollarSign, Database
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { ProviderList, claudeProviders, codexProviders, geminiProviders, Provider } from './ProviderCard';

// Import CLI tab icons
import claudeIcon from '@/assets/icons/claude.svg';
import openaiIcon from '@/assets/icons/openai.svg';
import geminiIcon from '@/assets/icons/gemini.svg';

const tabs = [
  { id: 'provider', label: 'Provider 管理', icon: Layers },
  { id: 'proxy', label: '代理服务器', icon: Server },
  { id: 'stats', label: '使用统计', icon: BarChart3 },
];

// Provider management tab content
export function ProviderContent() {
  const [proxyEnabled, setProxyEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'claude' | 'codex' | 'gemini'>('claude');
  const [activeProvider, setActiveProvider] = useState(0);
  
  // Separate state for each CLI tab
  const [claudeList, setClaudeList] = useState<Provider[]>(claudeProviders);
  const [codexList, setCodexList] = useState<Provider[]>(codexProviders);
  const [geminiList, setGeminiList] = useState<Provider[]>(geminiProviders);

  const cliTabs = [
    { id: 'claude' as const, label: 'Claude', icon: claudeIcon, color: 'text-orange-500' },
    { id: 'codex' as const, label: 'Codex', icon: openaiIcon, color: 'text-emerald-500' },
    { id: 'gemini' as const, label: 'Gemini', icon: geminiIcon, color: 'text-blue-500' },
  ];

  const handleTabChange = (tabId: 'claude' | 'codex' | 'gemini') => {
    setActiveTab(tabId);
    setActiveProvider(0); // Reset to first provider on tab change
  };

  // Get current providers based on active tab
  const getCurrentProviders = () => {
    switch (activeTab) {
      case 'claude': return claudeList;
      case 'codex': return codexList;
      case 'gemini': return geminiList;
    }
  };

  // Set current providers based on active tab
  const setCurrentProviders = (providers: Provider[]) => {
    switch (activeTab) {
      case 'claude': setClaudeList(providers); break;
      case 'codex': setCodexList(providers); break;
      case 'gemini': setGeminiList(providers); break;
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* App Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-emerald-500">CC Switch</span>
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3">
          {/* Proxy Toggle */}
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Proxy</span>
            <button
              onClick={() => setProxyEnabled(!proxyEnabled)}
              className={cn(
                "w-10 h-[22px] rounded-full flex items-center px-0.5 transition-colors",
                proxyEnabled ? "bg-emerald-500" : "bg-muted-foreground/30"
              )}
            >
              <motion.div
                animate={{ x: proxyEnabled ? 18 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-[18px] h-[18px] bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          {/* CLI Tabs */}
          <div className="flex items-center bg-muted/80 rounded-lg p-0.5">
            {cliTabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors",
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="demo-tab-bg"
                    className="absolute inset-0 bg-card rounded-md shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <img src={tab.icon} alt={tab.label} className="relative z-10 w-4 h-4" />
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 bg-muted/80 rounded-lg px-3.5 py-2">
              <motion.div whileHover={{ scale: 1.15, color: 'hsl(var(--primary))' }} className="cursor-pointer">
                <Key className="w-4 h-4 text-muted-foreground transition-colors" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.15, color: 'hsl(var(--primary))' }} className="cursor-pointer">
                <Monitor className="w-4 h-4 text-muted-foreground transition-colors" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.15, color: 'hsl(var(--primary))' }} className="cursor-pointer">
                <Server className="w-4 h-4 text-muted-foreground transition-colors" />
              </motion.div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Provider List */}
      <div>
        <ProviderList
          providers={getCurrentProviders()}
          activeProvider={activeProvider}
          proxyEnabled={proxyEnabled}
          onSelectProvider={setActiveProvider}
          onReorderProviders={setCurrentProviders}
          compact={false}
          animationKey={`demo-${activeTab}`}
        />
      </div>
    </div>
  );
}

// Proxy server tab content
function ProxyContent() {
  const [proxyRunning, setProxyRunning] = useState(true);
  const [claudeEnabled, setClaudeEnabled] = useState(true);
  const [codexEnabled, setCodexEnabled] = useState(true);
  const [geminiEnabled, setGeminiEnabled] = useState(false);
  const [logEnabled, setLogEnabled] = useState(true);

  // Use providers from Claude and Gemini for failover queues
  const failoverQueues = {
    Claude: [
      { rank: 1, name: claudeProviders[0].name, subtitle: claudeProviders[0].subtitle, status: '正常' },
      { rank: 2, name: claudeProviders[1].name, subtitle: claudeProviders[1].subtitle, status: '正常' },
    ],
    Gemini: [
      { rank: 1, name: geminiProviders[0].name, subtitle: geminiProviders[0].subtitle, status: '正常' },
      { rank: 2, name: geminiProviders[1].name, subtitle: geminiProviders[1].subtitle, status: '正常' },
    ],
  };

  const proxyToggles = [
    { 
      name: 'Claude', 
      icon: <img src={claudeIcon} alt="Claude" className="w-5 h-5" />,
      enabled: claudeEnabled,
      setEnabled: setClaudeEnabled 
    },
    { 
      name: 'Codex', 
      icon: <img src={openaiIcon} alt="Codex" className="w-5 h-5" />,
      enabled: codexEnabled,
      setEnabled: setCodexEnabled 
    },
    { 
      name: 'Gemini', 
      icon: <img src={geminiIcon} alt="Gemini" className="w-5 h-5" />,
      enabled: geminiEnabled,
      setEnabled: setGeminiEnabled 
    },
  ];

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
          <span className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5",
            proxyRunning ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            <Activity className="w-3 h-3" /> {proxyRunning ? '运行中' : '已停止'}
          </span>
          <Switch 
            checked={proxyRunning} 
            onCheckedChange={setProxyRunning}
            className="data-[state=checked]:bg-primary" 
          />
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
        <p className={proxyRunning ? "text-emerald-500" : "text-amber-500"}>
          {proxyRunning ? '当前 Provider：PackyCode (Claude Opus 4.5)' : '当前 Provider：等待首次请求...'}
        </p>
      </div>

      {/* Proxy Enable */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-3">代理启用</div>
        <div className="flex gap-4">
          {proxyToggles.map((item) => (
            <div key={item.name} className="flex-1 flex items-center justify-between p-3 rounded-xl border border-border bg-card">
              <span className="flex items-center gap-2 font-medium text-foreground">
                {item.icon}
                {item.name}
              </span>
              <Switch 
                checked={item.enabled} 
                onCheckedChange={item.setEnabled}
                className="data-[state=checked]:bg-primary" 
              />
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
        <Switch 
          checked={logEnabled} 
          onCheckedChange={setLogEnabled}
          className="data-[state=checked]:bg-primary" 
        />
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
                  <div className="flex-1">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.subtitle}</span>
                  </div>
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
          { icon: Activity, label: '活跃连接', value: '12' },
          { icon: TrendingUp, label: '总请求数', value: '1,847' },
          { icon: Clock, label: '成功率', value: '99.6%', highlight: true },
          { icon: Clock, label: '运行时间', value: '2h 37m' },
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
  const [period, setPeriod] = useState<'24小时' | '7天' | '30天'>('7天');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: typeof chartDataSets['7天'][0] } | null>(null);
  
  // Different data sets for each time period - more data points for smoother lines
  const chartDataSets = {
    '24小时': [
      { date: '00:00', requests: 45, cost: 1.2, inputToken: 2800, outputToken: 150, writeCache: 120, hitCache: 580 },
      { date: '02:00', requests: 32, cost: 0.9, inputToken: 1900, outputToken: 95, writeCache: 85, hitCache: 420 },
      { date: '04:00', requests: 12, cost: 0.4, inputToken: 800, outputToken: 40, writeCache: 35, hitCache: 180 },
      { date: '06:00', requests: 28, cost: 0.8, inputToken: 1600, outputToken: 85, writeCache: 72, hitCache: 360 },
      { date: '08:00', requests: 89, cost: 2.8, inputToken: 5200, outputToken: 320, writeCache: 280, hitCache: 1200 },
      { date: '10:00', requests: 124, cost: 3.8, inputToken: 7200, outputToken: 420, writeCache: 365, hitCache: 1680 },
      { date: '12:00', requests: 156, cost: 4.5, inputToken: 8900, outputToken: 480, writeCache: 420, hitCache: 2100 },
      { date: '14:00', requests: 178, cost: 5.2, inputToken: 10200, outputToken: 560, writeCache: 495, hitCache: 2450 },
      { date: '16:00', requests: 203, cost: 6.2, inputToken: 12000, outputToken: 650, writeCache: 580, hitCache: 2800 },
      { date: '18:00', requests: 195, cost: 5.8, inputToken: 11200, outputToken: 595, writeCache: 530, hitCache: 2650 },
      { date: '20:00', requests: 178, cost: 5.1, inputToken: 9800, outputToken: 520, writeCache: 460, hitCache: 2400 },
      { date: '22:00', requests: 98, cost: 2.9, inputToken: 5600, outputToken: 295, writeCache: 260, hitCache: 1350 },
    ],
    '7天': [
      { date: '12/20', requests: 234, cost: 8.5, inputToken: 3200, outputToken: 280, writeCache: 340, hitCache: 1650 },
      { date: '12/20 PM', requests: 312, cost: 11.2, inputToken: 4500, outputToken: 380, writeCache: 420, hitCache: 2100 },
      { date: '12/21', requests: 456, cost: 22.3, inputToken: 9000, outputToken: 520, writeCache: 620, hitCache: 3200 },
      { date: '12/21 PM', requests: 389, cost: 18.5, inputToken: 7200, outputToken: 445, writeCache: 520, hitCache: 2750 },
      { date: '12/22', requests: 189, cost: 6.2, inputToken: 2800, outputToken: 180, writeCache: 240, hitCache: 1100 },
      { date: '12/22 PM', requests: 245, cost: 9.8, inputToken: 3600, outputToken: 265, writeCache: 310, hitCache: 1480 },
      { date: '12/23', requests: 312, cost: 12.8, inputToken: 4500, outputToken: 340, writeCache: 380, hitCache: 1850 },
      { date: '12/23 PM', requests: 298, cost: 14.2, inputToken: 4800, outputToken: 365, writeCache: 415, hitCache: 2020 },
      { date: '12/24', requests: 278, cost: 17.5, inputToken: 5200, outputToken: 420, writeCache: 480, hitCache: 2200 },
      { date: '12/24 PM', requests: 215, cost: 12.8, inputToken: 3800, outputToken: 295, writeCache: 340, hitCache: 1620 },
      { date: '12/25', requests: 145, cost: 5.8, inputToken: 2100, outputToken: 160, writeCache: 180, hitCache: 920 },
      { date: '12/25 PM', requests: 112, cost: 4.2, inputToken: 1600, outputToken: 125, writeCache: 140, hitCache: 720 },
      { date: '12/26', requests: 67, cost: 2.4, inputToken: 980, outputToken: 85, writeCache: 95, hitCache: 480 },
      { date: '12/26 PM', requests: 45, cost: 1.6, inputToken: 650, outputToken: 55, writeCache: 62, hitCache: 320 },
    ],
    '30天': [
      { date: '11/27', requests: 1234, cost: 45.2, inputToken: 18000, outputToken: 1200, writeCache: 1400, hitCache: 7200 },
      { date: '11/29', requests: 1456, cost: 52.8, inputToken: 21000, outputToken: 1420, writeCache: 1650, hitCache: 8500 },
      { date: '12/01', requests: 1890, cost: 68.5, inputToken: 28000, outputToken: 1850, writeCache: 2150, hitCache: 11000 },
      { date: '12/03', requests: 2156, cost: 78.5, inputToken: 32000, outputToken: 2100, writeCache: 2400, hitCache: 12500 },
      { date: '12/05', requests: 2050, cost: 72.3, inputToken: 29500, outputToken: 1950, writeCache: 2280, hitCache: 11800 },
      { date: '12/07', requests: 1780, cost: 64.8, inputToken: 25500, outputToken: 1680, writeCache: 1950, hitCache: 10100 },
      { date: '12/09', requests: 1890, cost: 62.3, inputToken: 26000, outputToken: 1750, writeCache: 2000, hitCache: 10200 },
      { date: '12/11', requests: 2120, cost: 78.2, inputToken: 31000, outputToken: 2050, writeCache: 2380, hitCache: 12200 },
      { date: '12/13', requests: 2340, cost: 88.5, inputToken: 35000, outputToken: 2320, writeCache: 2700, hitCache: 13800 },
      { date: '12/15', requests: 2450, cost: 95.8, inputToken: 38000, outputToken: 2600, writeCache: 3000, hitCache: 15000 },
      { date: '12/17', requests: 2280, cost: 85.2, inputToken: 33500, outputToken: 2220, writeCache: 2580, hitCache: 13200 },
      { date: '12/19', requests: 1980, cost: 72.5, inputToken: 29000, outputToken: 1920, writeCache: 2230, hitCache: 11400 },
      { date: '12/21', requests: 1678, cost: 58.2, inputToken: 24000, outputToken: 1580, writeCache: 1800, hitCache: 9200 },
      { date: '12/23', requests: 1450, cost: 52.8, inputToken: 21000, outputToken: 1380, writeCache: 1600, hitCache: 8200 },
      { date: '12/25', requests: 1120, cost: 41.2, inputToken: 16500, outputToken: 1080, writeCache: 1250, hitCache: 6400 },
      { date: '12/26', requests: 892, cost: 32.5, inputToken: 13000, outputToken: 850, writeCache: 980, hitCache: 4900 },
    ],
  };

  const handlePeriodChange = (newPeriod: '24小时' | '7天' | '30天') => {
    if (newPeriod === period) return;
    setIsTransitioning(true);
    setHoveredPoint(null);
    setTimeout(() => {
      setPeriod(newPeriod);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const currentData = chartDataSets[period];
  
  // Only show subset of labels for x-axis
  const xAxisLabels = period === '24小时' 
    ? currentData.filter((_, i) => i % 2 === 0)
    : period === '7天'
    ? currentData.filter((_, i) => i % 2 === 0)
    : currentData.filter((_, i) => i % 2 === 0);
  
  // Calculate totals based on current period
  const totals = currentData.reduce((acc, d) => ({
    requests: acc.requests + d.requests,
    cost: acc.cost + d.cost,
    inputToken: acc.inputToken + d.inputToken,
    outputToken: acc.outputToken + d.outputToken,
    writeCache: acc.writeCache + d.writeCache,
    hitCache: acc.hitCache + d.hitCache,
  }), { requests: 0, cost: 0, inputToken: 0, outputToken: 0, writeCache: 0, hitCache: 0 });

  const stats = [
    { icon: Activity, label: '总请求数', value: totals.requests.toLocaleString(), color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { icon: DollarSign, label: '总成本', value: `$${totals.cost.toFixed(2)}`, color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    { icon: Layers, label: '总 Token 数', value: ((totals.inputToken + totals.outputToken) / 1000).toFixed(1) + 'k', subStats: [{ label: 'Input', value: (totals.inputToken / 1000).toFixed(1) + 'k' }, { label: 'Output', value: (totals.outputToken / 1000).toFixed(1) + 'k' }], color: 'text-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { icon: Database, label: '缓存 Token', value: ((totals.writeCache + totals.hitCache) / 1000).toFixed(1) + 'k', subStats: [{ label: 'Write', value: (totals.writeCache / 1000).toFixed(1) + 'k' }, { label: 'Hit', value: (totals.hitCache / 1000).toFixed(1) + 'k' }], color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
  ];

  // Line definitions with colors
  const lines = [
    { key: 'requests', label: '请求数', color: '#3b82f6', dashArray: '' },
    { key: 'cost', label: '成本', color: '#a855f7', dashArray: '6 4' },
    { key: 'inputToken', label: '输入Token', color: '#22c55e', dashArray: '' },
    { key: 'outputToken', label: '输出Token', color: '#f97316', dashArray: '' },
    { key: 'writeCache', label: '写缓存', color: '#06b6d4', dashArray: '4 2' },
    { key: 'hitCache', label: '命中缓存', color: '#ec4899', dashArray: '' },
  ];

  // Calculate max values for scaling
  const maxValues = {
    requests: Math.max(...currentData.map(d => d.requests)),
    cost: Math.max(...currentData.map(d => d.cost)),
    inputToken: Math.max(...currentData.map(d => d.inputToken)),
    outputToken: Math.max(...currentData.map(d => d.outputToken)),
    writeCache: Math.max(...currentData.map(d => d.writeCache)),
    hitCache: Math.max(...currentData.map(d => d.hitCache)),
  };

  // Generate smooth bezier curve path for a line
  const generateSmoothPath = (key: keyof typeof maxValues) => {
    const max = maxValues[key] || 1;
    const width = 700;
    const height = 180;
    const padding = 20;
    const stepX = (width - padding * 2) / (currentData.length - 1);
    
    const points = currentData.map((d, i) => ({
      x: padding + i * stepX,
      y: height - padding - ((d[key] / max) * (height - padding * 2))
    }));

    if (points.length < 2) return '';

    // Generate smooth bezier curve using Catmull-Rom to Bezier conversion
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      // Control points for smooth curve
      const tension = 0.3;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };

  // Generate circle positions for hover detection
  const circlePositions = currentData.map((d, i) => {
    const width = 700;
    const padding = 20;
    const stepX = (width - padding * 2) / (currentData.length - 1);
    const x = padding + i * stepX;
    return { x, data: d };
  });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isTransitioning) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 700;
    
    // Find closest point
    let closest = circlePositions[0];
    let minDist = Math.abs(x - closest.x);
    
    for (const pos of circlePositions) {
      const dist = Math.abs(x - pos.x);
      if (dist < minDist) {
        minDist = dist;
        closest = pos;
      }
    }
    
    if (minDist < 40) {
      setHoveredPoint({ x: closest.x, y: 90, data: closest.data });
    } else {
      setHoveredPoint(null);
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">使用统计</h3>
          <p className="text-sm text-muted-foreground">查看 AI 模型的使用情况和成本统计</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
          {(['24小时', '7天', '30天'] as const).map((p) => (
            <motion.button
              key={p}
              onClick={() => handlePeriodChange(p)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative px-4 py-2 rounded-md text-sm font-medium transition-colors",
                period === p 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {period === p && (
                <motion.div
                  layoutId="stats-period-bg"
                  className="absolute inset-0 bg-card rounded-md shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{p}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label} 
            className="p-4 rounded-xl border border-border bg-card"
            initial={false}
            animate={{ opacity: isTransitioning ? 0.5 : 1, y: isTransitioning ? 5 : 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.bgColor)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </div>
            <motion.div 
              key={`${stat.label}-${period}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="text-2xl font-bold text-foreground mb-1"
            >
              {stat.value}
            </motion.div>
            {stat.subStats && (
              <div className="flex gap-4 text-sm text-muted-foreground">
                {stat.subStats.map((sub) => (
                  <span key={sub.label}>{sub.label} <span className="text-foreground">{sub.value}</span></span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-semibold text-foreground">使用趋势</h4>
          <motion.span 
            key={period}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            过去 {period}
          </motion.span>
        </div>
        
        {/* Chart Area */}
        <div className="relative h-52">
          {/* Chart content */}
          <div className="absolute inset-0">
            <motion.svg 
              className="w-full h-full cursor-crosshair" 
              viewBox="0 0 700 200" 
              preserveAspectRatio="none"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredPoint(null)}
              initial={false}
              animate={{ opacity: isTransitioning ? 0.3 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line 
                  key={i}
                  x1="20" 
                  y1={20 + i * 40} 
                  x2="680" 
                  y2={20 + i * 40}
                  stroke="currentColor"
                  strokeOpacity="0.08"
                />
              ))}
              
              {/* Animated data lines */}
              {lines.map((line, lineIndex) => (
                <motion.path
                  key={`${line.key}-${period}`}
                  d={generateSmoothPath(line.key as keyof typeof maxValues)}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={line.dashArray}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: hoveredPoint ? 0.3 : 1 
                  }}
                  transition={{ 
                    pathLength: { duration: 0.8, delay: lineIndex * 0.1, ease: "easeOut" },
                    opacity: { duration: 0.2 }
                  }}
                />
              ))}

              {/* Hover vertical line */}
              <AnimatePresence>
                {hoveredPoint && (
                  <>
                    <motion.line 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      x1={hoveredPoint.x} 
                      y1="20" 
                      x2={hoveredPoint.x} 
                      y2="180"
                      stroke="currentColor"
                      strokeDasharray="4 4"
                    />
                    {/* Highlight points on each line */}
                    {lines.map((line) => {
                      const max = maxValues[line.key as keyof typeof maxValues] || 1;
                      const value = hoveredPoint.data[line.key as keyof typeof hoveredPoint.data] as number;
                      const y = 180 - 20 - ((value / max) * 140);
                      return (
                        <motion.circle
                          key={line.key}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          cx={hoveredPoint.x}
                          cy={y}
                          r="5"
                          fill={line.color}
                          stroke="white"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </>
                )}
              </AnimatePresence>
            </motion.svg>

            {/* Hover Tooltip */}
            <AnimatePresence>
              {hoveredPoint && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="absolute z-10 p-3 rounded-lg bg-popover border border-border shadow-xl text-sm backdrop-blur-sm"
                  style={{ 
                    left: `${Math.min(Math.max((hoveredPoint.x / 700) * 100, 15), 85)}%`,
                    top: '8px',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="font-medium text-foreground mb-2 pb-2 border-b border-border">{hoveredPoint.data.date}</div>
                  <div className="space-y-1.5 min-w-[150px]">
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                        请求数
                      </span>
                      <span className="font-medium text-foreground">{hoveredPoint.data.requests}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#a855f7' }} />
                        成本
                      </span>
                      <span className="font-medium text-foreground">${hoveredPoint.data.cost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                        输入Token
                      </span>
                      <span className="font-medium text-foreground">{(hoveredPoint.data.inputToken / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f97316' }} />
                        输出Token
                      </span>
                      <span className="font-medium text-foreground">{(hoveredPoint.data.outputToken / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#06b6d4' }} />
                        写缓存
                      </span>
                      <span className="font-medium text-foreground">{(hoveredPoint.data.writeCache / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ec4899' }} />
                        命中缓存
                      </span>
                      <span className="font-medium text-foreground">{(hoveredPoint.data.hitCache / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* X-axis labels */}
          <div className="absolute left-5 right-5 bottom-0 flex justify-between text-xs text-muted-foreground">
            {xAxisLabels.map((d) => (
              <span key={d.date}>{d.date.replace(' PM', '')}</span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm">
          {lines.map((line) => (
            <span key={line.key} className="flex items-center gap-2">
              <span 
                className="w-4 h-0.5 rounded-full" 
                style={{ 
                  backgroundColor: line.color,
                  ...(line.dashArray ? { background: `repeating-linear-gradient(90deg, ${line.color} 0, ${line.color} 4px, transparent 4px, transparent 6px)` } : {})
                }} 
              />
              <span className="text-muted-foreground">{line.label}</span>
            </span>
          ))}
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
