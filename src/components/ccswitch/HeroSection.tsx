import { motion } from 'framer-motion';
import { Download, ArrowRight, Star, Users, Terminal, Settings, Wifi, Key, Monitor, Server, Plus, RefreshCw, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ccSwitchLogo from '@/assets/cc-switch-logo.png';

function AppPreview() {
  const providers = [
    {
      icon: '⚡',
      iconBg: 'bg-emerald-500/20',
      name: 'PackyCode AWS',
      subtitle: 'AWSQ',
      status: '正常',
      priority: 'P1',
      time: '刚刚',
      used: '672.87',
      remaining: '616.96',
    },
    {
      icon: '⚡',
      iconBg: 'bg-emerald-500/20',
      name: 'PackyCode',
      subtitle: 'Packy awsq',
      status: '正常',
      priority: 'P2',
      time: '1 分钟前',
      used: '33.56',
      remaining: '1026.44',
    },
    {
      icon: '📊',
      iconBg: 'bg-blue-500/20',
      name: '跑路公益',
      subtitle: 'https://runanytime.hxi.me',
      isUrl: true,
    },
    {
      icon: 'D',
      iconBg: 'bg-muted',
      name: 'Duck',
      subtitle: 'https://free.duckcoding.com',
      isUrl: true,
      isText: true,
    },
  ];

  return (
    <div className="relative bg-card/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
      {/* macOS Window Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      
      {/* App Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <img src={ccSwitchLogo} alt="CC-Switch" className="w-6 h-6" />
          <span className="text-sm font-bold text-foreground">CC-Switch</span>
          <Settings className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-3">
          {/* Proxy Toggle */}
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Proxy</span>
            <div className="w-9 h-5 bg-emerald-500 rounded-full flex items-center px-0.5">
              <div className="w-4 h-4 bg-white rounded-full ml-auto" />
            </div>
          </div>
          
          {/* CLI Tabs */}
          <div className="flex items-center bg-muted rounded-md p-0.5">
            <div className="px-2 py-1 bg-background rounded text-xs font-medium flex items-center gap-1">
              <span className="text-orange-500">✳</span> Claude
            </div>
            <div className="px-2 py-1 text-xs text-muted-foreground flex items-center gap-1">
              <span>◎</span> Codex
            </div>
            <div className="px-2 py-1 text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-blue-400">◆</span> Gemini
            </div>
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-muted-foreground" />
            <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
            <Server className="w-3.5 h-3.5 text-muted-foreground" />
            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Provider List */}
      <div className="p-3 space-y-2 bg-gradient-to-b from-card to-background">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="flex items-center gap-2 p-2.5 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
          >
            <GripVertical className="w-3.5 h-3.5 text-muted-foreground/50" />
            
            <div className={`w-8 h-8 rounded-lg ${provider.iconBg} flex items-center justify-center`}>
              {provider.isText ? (
                <span className="text-xs font-medium text-muted-foreground">{provider.icon}</span>
              ) : (
                <span className="text-sm">{provider.icon}</span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-foreground text-sm">{provider.name}</span>
                {provider.status && (
                  <>
                    <span className="flex items-center gap-0.5 text-[10px] text-emerald-500">
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                      {provider.status}
                    </span>
                    <span className="px-1 py-0.5 text-[10px] bg-blue-500/20 text-blue-400 rounded">
                      {provider.priority}
                    </span>
                  </>
                )}
              </div>
              <div className={`text-xs ${provider.isUrl ? 'text-emerald-500' : 'text-muted-foreground'} truncate`}>
                {provider.subtitle}
              </div>
            </div>
            
            {provider.used && (
              <div className="text-right text-xs hidden sm:block">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="text-[10px]">⏱ {provider.time}</span>
                  <RefreshCw className="w-2.5 h-2.5" />
                </div>
                <div className="text-muted-foreground text-[10px]">
                  已使用: {provider.used} 剩余: <span className="text-emerald-500 font-medium">{provider.remaining}</span> USD
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
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
      <div className="relative z-10 container px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 mb-6"
            >
              <span className="text-foreground text-sm font-medium">🎉 v3.9.0 正式发布</span>
            </motion.div>
            
            {/* Main Title with Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <img src={ccSwitchLogo} alt="CC-Switch" className="w-12 h-12 md:w-16 md:h-16" />
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">CC-Switch</span>
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
                <span className="font-semibold">3.2k</span>
                <span className="text-muted-foreground">Stars</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold">500+</span>
                <span className="text-muted-foreground">用户</span>
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
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-purple/20 rounded-3xl blur-2xl" />
              
              <AppPreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
