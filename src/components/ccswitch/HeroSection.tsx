import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, Star, Terminal, Settings, Wifi, Key, Monitor, Server, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ccSwitchLogo from '@/assets/cc-switch-logo.png';
import { ProviderList, defaultProviders, type Provider } from './ProviderCard';
import { useGitHubStats } from '@/hooks/useGitHubStars';

function AppPreview() {
  const [proxyEnabled, setProxyEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'claude' | 'codex' | 'gemini'>('claude');
  const [activeProvider, setActiveProvider] = useState(0);

  const initialProviders = useMemo(() => defaultProviders.slice(0, 4), []);
  const [providers, setProviders] = useState<Provider[]>(initialProviders);

  const tabs = [
    { id: 'claude' as const, label: 'Claude', icon: '✳', color: 'text-orange-500' },
    { id: 'codex' as const, label: 'Codex', icon: '◎', color: 'text-emerald-500' },
    { id: 'gemini' as const, label: 'Gemini', icon: '◆', color: 'text-blue-500' },
  ];

  const handleTabChange = (tabId: 'claude' | 'codex' | 'gemini') => {
    setActiveTab(tabId);
    setActiveProvider(0);
  };

  return (
    <div className="relative bg-card/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden origin-top-left scale-[0.85] xl:scale-90 2xl:scale-100">
      {/* macOS Window Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      
      {/* App Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 gap-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-sm font-bold text-emerald-500 whitespace-nowrap">CC Switch</span>
          <Settings className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-2.5">
          {/* Proxy Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">Proxy</span>
            <button
              onClick={() => setProxyEnabled(!proxyEnabled)}
              className={cn(
                "w-9 h-5 rounded-full flex items-center px-0.5 transition-colors shrink-0",
                proxyEnabled ? "bg-emerald-500" : "bg-muted-foreground/30"
              )}
            >
              <motion.div
                animate={{ x: proxyEnabled ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>
          
          {/* CLI Tabs */}
          <div className="flex items-center bg-muted/80 rounded-lg p-0.5 shrink-0">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="hero-tab-bg"
                    className="absolute inset-0 bg-background rounded-md shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className={cn("relative z-10 text-xs", tab.color)}>{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2.5 bg-muted/80 rounded-lg px-3 py-1.5">
              <motion.div whileHover={{ scale: 1.15, color: 'hsl(var(--primary))' }} className="cursor-pointer">
                <Key className="w-3.5 h-3.5 text-muted-foreground transition-colors" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.15, color: 'hsl(var(--primary))' }} className="cursor-pointer">
                <Monitor className="w-3.5 h-3.5 text-muted-foreground transition-colors" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.15, color: 'hsl(var(--primary))' }} className="cursor-pointer">
                <Server className="w-3.5 h-3.5 text-muted-foreground transition-colors" />
              </motion.div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Provider List - Compact version */}
      <div className="p-4 bg-gradient-to-b from-card to-background min-w-[520px]">
        <ProviderList
          providers={providers}
          activeProvider={activeProvider}
          proxyEnabled={proxyEnabled}
          onSelectProvider={setActiveProvider}
          onReorderProviders={setProviders}
          compact={true}
          animationKey={`hero-${activeTab}`}
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  const { formattedStars, formattedDownloads, version } = useGitHubStats();
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12 lg:pb-0">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple/10 dark:from-primary/20 dark:via-background dark:to-purple/15" />
      
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary/20 via-transparent to-transparent dark:from-primary/30"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-purple/20 via-transparent to-transparent dark:from-purple/30"
        />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-20" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/6 w-32 h-32 md:w-64 md:h-64 bg-primary/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/3 right-1/6 w-40 h-40 md:w-80 md:h-80 bg-purple/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-1/2 w-24 h-24 md:w-48 md:h-48 bg-success/20 rounded-full blur-3xl"
      />
      
      {/* Content */}
      <div className="relative z-10 container px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6"
            >
              {/* Version Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-foreground text-sm font-medium">
                🎉 v{version || '...'} 正式发布
              </span>
              {/* Platform Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground text-xs font-medium">
                Windows | macOS | Linux
              </span>
              {/* Tauri Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium">
                Built with Tauri 2
              </span>
            </motion.div>
            
            {/* Main Title with Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <img src={ccSwitchLogo} alt="CC Switch" className="w-12 h-12 md:w-16 md:h-16" />
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">CC Switch</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                统一管理你的
                <span className="block gradient-text">
                  AI CLI 配置
                </span>
              </h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              一个应用，管理 Claude Code、Codex 和 Gemini CLI。
              <br className="hidden sm:block" />
              内置代理服务器，支持多 Provider 自动故障转移。
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="hero-gradient text-white hover:opacity-90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold gap-2"
              >
                <Download className="w-5 h-5" />
                免费下载
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-background/50 backdrop-blur-sm hover:bg-accent px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold gap-2"
              >
                查看文档
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
            
            {/* Supported Platforms */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-muted-foreground text-sm"
            >
              支持 macOS 12+ · Windows 10+ · Linux
            </motion.p>
            
            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6"
            >
              <div className="flex items-center gap-2 text-foreground">
                <Star className="w-5 h-5 text-warning" />
                <span className="font-semibold">{formattedStars}</span>
                <span className="text-muted-foreground">Stars</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Download className="w-5 h-5 text-primary" />
                <span className="font-semibold">{formattedDownloads}</span>
                <span className="text-muted-foreground">下载</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Terminal className="w-5 h-5 text-success" />
                <span className="font-semibold">3</span>
                <span className="text-muted-foreground">支持 CLI</span>
              </div>
            </motion.div>
          </div>
          
          {/* Right: App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 to-purple/20 rounded-3xl blur-2xl" />
              
              <AppPreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
