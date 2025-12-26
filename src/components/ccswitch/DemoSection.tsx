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
import { useLanguage } from '@/i18n/LanguageContext';

// Import CLI tab icons
import claudeIcon from '@/assets/icons/claude.svg';
import openaiIcon from '@/assets/icons/openai.svg';
import geminiIcon from '@/assets/icons/gemini.svg';

const tabIcons = {
  provider: Layers,
  proxy: Server,
  stats: BarChart3,
};

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
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={cn(
                "w-4 h-4 transition-colors",
                proxyEnabled ? "text-emerald-500 animate-pulse" : "text-muted-foreground"
              )}
            >
              <path d="M16.247 7.761a6 6 0 0 1 0 8.478" />
              <path d="M19.075 4.933a10 10 0 0 1 0 14.134" />
              <path d="M4.925 19.067a10 10 0 0 1 0-14.134" />
              <path d="M7.753 16.239a6 6 0 0 1 0-8.478" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span className={cn(
              "text-sm transition-colors",
              proxyEnabled ? "text-emerald-500" : "text-muted-foreground"
            )}>Proxy</span>
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
  const { t } = useLanguage();
  const [proxyRunning, setProxyRunning] = useState(true);
  const [claudeEnabled, setClaudeEnabled] = useState(true);
  const [codexEnabled, setCodexEnabled] = useState(true);
  const [geminiEnabled, setGeminiEnabled] = useState(false);
  const [logEnabled, setLogEnabled] = useState(true);

  // Use providers from Claude and Gemini for failover queues
  const failoverQueues = {
    Claude: [
      { rank: 1, name: claudeProviders[0].name, subtitle: claudeProviders[0].subtitle, status: t.demo.proxy.normal },
      { rank: 2, name: claudeProviders[1].name, subtitle: claudeProviders[1].subtitle, status: t.demo.proxy.normal },
    ],
    Gemini: [
      { rank: 1, name: geminiProviders[0].name, subtitle: geminiProviders[0].subtitle, status: t.demo.proxy.normal },
      { rank: 2, name: geminiProviders[1].name, subtitle: geminiProviders[1].subtitle, status: t.demo.proxy.normal },
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

  const stats = [
    { icon: Activity, label: t.demo.proxy.activeConnections, value: '12' },
    { icon: TrendingUp, label: t.demo.proxy.totalRequests, value: '1,847' },
    { icon: Clock, label: t.demo.proxy.successRate, value: '99.6%', highlight: true },
    { icon: Clock, label: t.demo.proxy.uptime, value: '2h 37m' },
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
            <h3 className="font-semibold text-foreground">{t.demo.proxy.localProxy}</h3>
            <p className="text-sm text-muted-foreground">{t.demo.proxy.proxyDescription}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
          <span className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5",
            proxyRunning ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            <Activity className="w-3 h-3" /> {proxyRunning ? t.demo.proxy.running : t.demo.proxy.stopped}
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
        <div className="text-sm text-muted-foreground mb-2">{t.demo.proxy.serviceAddress}</div>
        <div className="flex items-center justify-between">
          <code className="text-lg font-mono text-foreground">http://127.0.0.1:15721</code>
          <button className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            {t.demo.proxy.copy}
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{t.demo.proxy.addressNote}</p>
      </div>

      {/* Usage Status */}
      <div className="mb-6 pb-4 border-b border-border">
        <div className="text-sm text-muted-foreground mb-1">{t.provider.inUse}</div>
        <p className={proxyRunning ? "text-emerald-500" : "text-amber-500"}>
          {proxyRunning ? `${t.demo.proxy.currentProvider}：PackyCode (Claude Opus 4.5)` : `${t.demo.proxy.currentProvider}：${t.demo.proxy.waitingRequest}`}
        </p>
      </div>

      {/* Proxy Enable */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-3">{t.demo.proxy.proxyEnable}</div>
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
          <div className="font-medium text-foreground">{t.demo.proxy.enableLogging}</div>
          <div className="text-sm text-muted-foreground">{t.demo.proxy.loggingNote}</div>
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
          {t.demo.proxy.failoverQueue}
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
        {stats.map((stat) => (
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
  
  // Different data sets for each time period - scaled to match real totals
  // 7天 totals: requests=10352, cost=$283.95, inputToken=40210.5k, outputToken=1101.2k, writeCache=23880.8k, hitCache=102008.1k
  const chartDataSets = {
    '24小时': [
      { date: '00:00', requests: 28, cost: 0.82, inputToken: 980, outputToken: 28, writeCache: 620, hitCache: 2850 },
      { date: '01:00', requests: 22, cost: 0.65, inputToken: 780, outputToken: 22, writeCache: 580, hitCache: 2680 },
      { date: '02:00', requests: 15, cost: 0.42, inputToken: 520, outputToken: 15, writeCache: 520, hitCache: 2450 },
      { date: '03:00', requests: 12, cost: 0.35, inputToken: 420, outputToken: 12, writeCache: 480, hitCache: 2280 },
      { date: '04:00', requests: 8, cost: 0.22, inputToken: 280, outputToken: 8, writeCache: 450, hitCache: 2150 },
      { date: '05:00', requests: 15, cost: 0.38, inputToken: 480, outputToken: 12, writeCache: 520, hitCache: 2380 },
      { date: '06:00', requests: 35, cost: 0.92, inputToken: 1250, outputToken: 32, writeCache: 680, hitCache: 2850 },
      { date: '07:00', requests: 68, cost: 1.85, inputToken: 2580, outputToken: 68, writeCache: 850, hitCache: 3520 },
      { date: '08:00', requests: 125, cost: 3.42, inputToken: 4850, outputToken: 128, writeCache: 1080, hitCache: 4580 },
      { date: '09:00', requests: 185, cost: 5.12, inputToken: 7250, outputToken: 195, writeCache: 1250, hitCache: 5680 },
      { date: '10:00', requests: 228, cost: 6.35, inputToken: 8920, outputToken: 242, writeCache: 1120, hitCache: 6250 },
      { date: '11:00', requests: 265, cost: 7.28, inputToken: 10350, outputToken: 285, writeCache: 980, hitCache: 6850 },
      { date: '12:00', requests: 248, cost: 6.85, inputToken: 9680, outputToken: 268, writeCache: 850, hitCache: 7120 },
      { date: '13:00', requests: 225, cost: 6.18, inputToken: 8780, outputToken: 245, writeCache: 780, hitCache: 7380 },
      { date: '14:00', requests: 198, cost: 5.45, inputToken: 7720, outputToken: 215, writeCache: 720, hitCache: 7580 },
      { date: '15:00', requests: 218, cost: 5.98, inputToken: 8520, outputToken: 238, writeCache: 850, hitCache: 7250 },
      { date: '16:00', requests: 245, cost: 6.72, inputToken: 9580, outputToken: 268, writeCache: 980, hitCache: 6850 },
      { date: '17:00', requests: 232, cost: 6.38, inputToken: 9080, outputToken: 255, writeCache: 1120, hitCache: 6380 },
      { date: '18:00', requests: 198, cost: 5.45, inputToken: 7750, outputToken: 218, writeCache: 1250, hitCache: 5850 },
      { date: '19:00', requests: 165, cost: 4.52, inputToken: 6450, outputToken: 182, writeCache: 1380, hitCache: 5280 },
      { date: '20:00', requests: 135, cost: 3.68, inputToken: 5280, outputToken: 148, writeCache: 1180, hitCache: 4650 },
      { date: '21:00', requests: 98, cost: 2.68, inputToken: 3820, outputToken: 108, writeCache: 950, hitCache: 3980 },
      { date: '22:00', requests: 65, cost: 1.78, inputToken: 2520, outputToken: 72, writeCache: 780, hitCache: 3350 },
      { date: '23:00', requests: 42, cost: 1.15, inputToken: 1650, outputToken: 46, writeCache: 650, hitCache: 2920 },
    ],
    '7天': [
      { date: '12/20 00', requests: 285, cost: 7.85, inputToken: 1120000, outputToken: 32500, writeCache: 720000, hitCache: 3250000 },
      { date: '12/20 06', requests: 385, cost: 10.52, inputToken: 1520000, outputToken: 38200, writeCache: 850000, hitCache: 3580000 },
      { date: '12/20 12', requests: 520, cost: 14.25, inputToken: 2050000, outputToken: 48500, writeCache: 680000, hitCache: 4120000 },
      { date: '12/20 18', requests: 465, cost: 12.75, inputToken: 1850000, outputToken: 52800, writeCache: 580000, hitCache: 4580000 },
      { date: '12/21 00', requests: 395, cost: 10.85, inputToken: 1580000, outputToken: 45200, writeCache: 520000, hitCache: 4850000 },
      { date: '12/21 06', requests: 445, cost: 12.18, inputToken: 1780000, outputToken: 48800, writeCache: 620000, hitCache: 5120000 },
      { date: '12/21 12', requests: 585, cost: 16.02, inputToken: 2350000, outputToken: 58200, writeCache: 750000, hitCache: 5450000 },
      { date: '12/21 18', requests: 545, cost: 14.92, inputToken: 2180000, outputToken: 55500, writeCache: 880000, hitCache: 5180000 },
      { date: '12/22 00', requests: 425, cost: 11.65, inputToken: 1720000, outputToken: 48200, writeCache: 980000, hitCache: 4650000 },
      { date: '12/22 06', requests: 365, cost: 10.02, inputToken: 1480000, outputToken: 42500, writeCache: 1120000, hitCache: 4150000 },
      { date: '12/22 12', requests: 445, cost: 12.18, inputToken: 1780000, outputToken: 45800, writeCache: 1250000, hitCache: 3850000 },
      { date: '12/22 18', requests: 485, cost: 13.28, inputToken: 1950000, outputToken: 48500, writeCache: 1380000, hitCache: 3520000 },
      { date: '12/23 00', requests: 395, cost: 10.82, inputToken: 1580000, outputToken: 42200, writeCache: 1180000, hitCache: 3180000 },
      { date: '12/23 06', requests: 335, cost: 9.18, inputToken: 1350000, outputToken: 38500, writeCache: 980000, hitCache: 2950000 },
      { date: '12/23 12', requests: 425, cost: 11.65, inputToken: 1720000, outputToken: 45200, writeCache: 850000, hitCache: 3280000 },
      { date: '12/23 18', requests: 478, cost: 13.08, inputToken: 1920000, outputToken: 50500, writeCache: 720000, hitCache: 3650000 },
      { date: '12/24 00', requests: 385, cost: 10.55, inputToken: 1550000, outputToken: 42800, writeCache: 650000, hitCache: 3950000 },
      { date: '12/24 06', requests: 312, cost: 8.55, inputToken: 1280000, outputToken: 36500, writeCache: 580000, hitCache: 4180000 },
      { date: '12/24 12', requests: 365, cost: 10.02, inputToken: 1480000, outputToken: 42200, writeCache: 680000, hitCache: 4380000 },
      { date: '12/24 18', requests: 285, cost: 7.82, inputToken: 1150000, outputToken: 35800, writeCache: 780000, hitCache: 4120000 },
      { date: '12/25 00', requests: 218, cost: 5.98, inputToken: 880000, outputToken: 28500, writeCache: 920000, hitCache: 3650000 },
      { date: '12/25 06', requests: 165, cost: 4.52, inputToken: 680000, outputToken: 22800, writeCache: 1050000, hitCache: 3120000 },
      { date: '12/25 12', requests: 142, cost: 3.88, inputToken: 580000, outputToken: 18500, writeCache: 1180000, hitCache: 2680000 },
      { date: '12/25 18', requests: 115, cost: 3.15, inputToken: 475000, outputToken: 15200, writeCache: 1020000, hitCache: 2280000 },
      { date: '12/26 00', requests: 95, cost: 2.62, inputToken: 395000, outputToken: 12800, writeCache: 850000, hitCache: 1920000 },
      { date: '12/26 06', requests: 78, cost: 2.15, inputToken: 325000, outputToken: 10500, writeCache: 720000, hitCache: 1580000 },
      { date: '12/26 12', requests: 98, cost: 2.68, inputToken: 405000, outputToken: 12200, writeCache: 620000, hitCache: 1350000 },
      { date: '12/26 18', requests: 68, cost: 1.85, inputToken: 280000, outputToken: 9200, writeCache: 520000, hitCache: 1120000 },
    ],
    '30天': [
      { date: '11/27', requests: 2850, cost: 62.5, inputToken: 8850000, outputToken: 185000, writeCache: 5250000, hitCache: 22500000 },
      { date: '11/28', requests: 3120, cost: 68.2, inputToken: 9680000, outputToken: 205000, writeCache: 5850000, hitCache: 24800000 },
      { date: '11/29', requests: 3450, cost: 75.5, inputToken: 10720000, outputToken: 228000, writeCache: 5120000, hitCache: 27500000 },
      { date: '11/30', requests: 3280, cost: 71.8, inputToken: 10180000, outputToken: 245000, writeCache: 4580000, hitCache: 29800000 },
      { date: '12/01', requests: 3680, cost: 80.5, inputToken: 11420000, outputToken: 268000, writeCache: 4120000, hitCache: 32500000 },
      { date: '12/02', requests: 3920, cost: 85.8, inputToken: 12180000, outputToken: 285000, writeCache: 3750000, hitCache: 35200000 },
      { date: '12/03', requests: 4150, cost: 90.8, inputToken: 12880000, outputToken: 298000, writeCache: 3450000, hitCache: 37800000 },
      { date: '12/04', requests: 3850, cost: 84.2, inputToken: 11950000, outputToken: 312000, writeCache: 3850000, hitCache: 36500000 },
      { date: '12/05', requests: 3980, cost: 87.1, inputToken: 12350000, outputToken: 328000, writeCache: 4250000, hitCache: 34200000 },
      { date: '12/06', requests: 3620, cost: 79.2, inputToken: 11250000, outputToken: 345000, writeCache: 4680000, hitCache: 31800000 },
      { date: '12/07', requests: 3450, cost: 75.5, inputToken: 10720000, outputToken: 358000, writeCache: 5120000, hitCache: 29500000 },
      { date: '12/08', requests: 3280, cost: 71.8, inputToken: 10180000, outputToken: 342000, writeCache: 5580000, hitCache: 27200000 },
      { date: '12/09', requests: 3580, cost: 78.3, inputToken: 11120000, outputToken: 325000, writeCache: 6050000, hitCache: 29800000 },
      { date: '12/10', requests: 3850, cost: 84.2, inputToken: 11950000, outputToken: 308000, writeCache: 6520000, hitCache: 32500000 },
      { date: '12/11', requests: 4080, cost: 89.3, inputToken: 12680000, outputToken: 292000, writeCache: 6950000, hitCache: 35200000 },
      { date: '12/12', requests: 4320, cost: 94.5, inputToken: 13420000, outputToken: 275000, writeCache: 6580000, hitCache: 37800000 },
      { date: '12/13', requests: 4520, cost: 98.9, inputToken: 14050000, outputToken: 258000, writeCache: 6120000, hitCache: 40500000 },
      { date: '12/14', requests: 4680, cost: 102.4, inputToken: 14550000, outputToken: 242000, writeCache: 5650000, hitCache: 42800000 },
      { date: '12/15', requests: 4750, cost: 103.9, inputToken: 14780000, outputToken: 228000, writeCache: 5180000, hitCache: 41500000 },
      { date: '12/16', requests: 4520, cost: 98.9, inputToken: 14050000, outputToken: 215000, writeCache: 4750000, hitCache: 38200000 },
      { date: '12/17', requests: 4280, cost: 93.6, inputToken: 13280000, outputToken: 205000, writeCache: 4380000, hitCache: 34800000 },
      { date: '12/18', requests: 3980, cost: 87.1, inputToken: 12350000, outputToken: 195000, writeCache: 4050000, hitCache: 31500000 },
      { date: '12/19', requests: 3680, cost: 80.5, inputToken: 11420000, outputToken: 182000, writeCache: 3720000, hitCache: 28500000 },
      { date: '12/20', requests: 3380, cost: 73.9, inputToken: 10480000, outputToken: 172000, writeCache: 3450000, hitCache: 25800000 },
      { date: '12/21', requests: 3120, cost: 68.2, inputToken: 9680000, outputToken: 165000, writeCache: 3180000, hitCache: 23200000 },
      { date: '12/22', requests: 2850, cost: 62.3, inputToken: 8850000, outputToken: 158000, writeCache: 2920000, hitCache: 20800000 },
      { date: '12/23', requests: 2580, cost: 56.4, inputToken: 8020000, outputToken: 148000, writeCache: 2680000, hitCache: 18500000 },
      { date: '12/24', requests: 2320, cost: 50.8, inputToken: 7220000, outputToken: 138000, writeCache: 2450000, hitCache: 16200000 },
      { date: '12/25', requests: 2050, cost: 44.8, inputToken: 6380000, outputToken: 128000, writeCache: 2220000, hitCache: 14200000 },
      { date: '12/26', requests: 1780, cost: 38.9, inputToken: 5520000, outputToken: 118000, writeCache: 1980000, hitCache: 12500000 },
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

  // Format large numbers with M/k suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString();
  };

  const totalTokens = totals.inputToken + totals.outputToken;
  const totalCache = totals.writeCache + totals.hitCache;

  const stats = [
    { icon: Activity, label: '总请求数', value: totals.requests.toLocaleString(), color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { icon: DollarSign, label: '总成本', value: `$${totals.cost.toFixed(2)}`, color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    { icon: Layers, label: '总 Token 数', value: formatNumber(totalTokens), subStats: [{ label: 'Input', value: formatNumber(totals.inputToken) }, { label: 'Output', value: formatNumber(totals.outputToken) }], color: 'text-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { icon: Database, label: '缓存 Token', value: formatNumber(totalCache), subStats: [{ label: 'Write', value: formatNumber(totals.writeCache) }, { label: 'Read', value: formatNumber(totals.hitCache) }], color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
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
                      <span className="font-medium text-foreground">{hoveredPoint.data.requests.toLocaleString()}</span>
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
                      <span className="font-medium text-foreground">
                        {hoveredPoint.data.inputToken >= 1000000 
                          ? (hoveredPoint.data.inputToken / 1000000).toFixed(2) + 'M'
                          : (hoveredPoint.data.inputToken / 1000).toFixed(1) + 'k'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f97316' }} />
                        输出Token
                      </span>
                      <span className="font-medium text-foreground">
                        {hoveredPoint.data.outputToken >= 1000000 
                          ? (hoveredPoint.data.outputToken / 1000000).toFixed(2) + 'M'
                          : (hoveredPoint.data.outputToken / 1000).toFixed(1) + 'k'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#06b6d4' }} />
                        写缓存
                      </span>
                      <span className="font-medium text-foreground">
                        {hoveredPoint.data.writeCache >= 1000000 
                          ? (hoveredPoint.data.writeCache / 1000000).toFixed(2) + 'M'
                          : (hoveredPoint.data.writeCache / 1000).toFixed(1) + 'k'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ec4899' }} />
                        命中缓存
                      </span>
                      <span className="font-medium text-foreground">
                        {hoveredPoint.data.hitCache >= 1000000 
                          ? (hoveredPoint.data.hitCache / 1000000).toFixed(2) + 'M'
                          : (hoveredPoint.data.hitCache / 1000).toFixed(1) + 'k'}
                      </span>
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
  const { t } = useLanguage();

  const tabs = [
    { id: 'provider', label: t.demo.tabs.provider, icon: tabIcons.provider },
    { id: 'proxy', label: t.demo.tabs.proxy, icon: tabIcons.proxy },
    { id: 'stats', label: t.demo.tabs.stats, icon: tabIcons.stats },
  ];

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
            {t.demo.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t.demo.subtitle}
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
