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
  const [providers, setProviders] = useState(defaultProviders);

  const cliTabs = [
    { id: 'claude' as const, label: 'Claude', icon: claudeIcon, color: 'text-orange-500' },
    { id: 'codex' as const, label: 'Codex', icon: openaiIcon, color: 'text-emerald-500' },
    { id: 'gemini' as const, label: 'Gemini', icon: geminiIcon, color: 'text-blue-500' },
  ];

  const handleTabChange = (tabId: 'claude' | 'codex' | 'gemini') => {
    setActiveTab(tabId);
    setActiveProvider(0); // Reset to first provider on tab change
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
          providers={providers}
          activeProvider={activeProvider}
          proxyEnabled={proxyEnabled}
          onSelectProvider={setActiveProvider}
          onReorderProviders={setProviders}
          compact={false}
          animationKey={`demo-${activeTab}`}
        />
      </div>
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
          {[
            { name: 'Claude', icon: <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" fillRule="nonzero"></path></svg> },
            { name: 'Codex', icon: <svg fill="currentColor" fillRule="evenodd" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z"></path></svg> },
            { name: 'Gemini', icon: <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="gemini-fill-0" x1="7" x2="11" y1="15.5" y2="12"><stop stopColor="#08B962"></stop><stop offset="1" stopColor="#08B962" stopOpacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="gemini-fill-1" x1="8" x2="11.5" y1="5.5" y2="11"><stop stopColor="#F94543"></stop><stop offset="1" stopColor="#F94543" stopOpacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="gemini-fill-2" x1="3.5" x2="17.5" y1="13.5" y2="12"><stop stopColor="#FABC12"></stop><stop offset=".46" stopColor="#FABC12" stopOpacity="0"></stop></linearGradient></defs></svg> },
          ].map((item) => (
            <div key={item.name} className="flex-1 flex items-center justify-between p-3 rounded-xl border border-border bg-card">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </span>
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
