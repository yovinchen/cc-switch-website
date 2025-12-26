import { motion } from 'framer-motion';
import { Download, ArrowRight, Star, Users, Terminal, Settings, Wifi, Key, Monitor, Server, Plus, RefreshCw, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    {
      icon: '📈',
      iconBg: 'bg-orange-500/20',
      name: 'AnyRouter',
      subtitle: 'https://anyrouter.top',
      isUrl: true,
    },
  ];

  return (
    <div className="relative bg-card/95 backdrop-blur-2xl rounded-t-2xl border border-white/30 shadow-2xl overflow-hidden">
      {/* macOS Window Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      
      {/* App Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-foreground">CC-Switch</span>
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-4">
          {/* Proxy Toggle */}
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Proxy</span>
            <div className="w-11 h-6 bg-emerald-500 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full ml-auto" />
            </div>
          </div>
          
          {/* CLI Tabs */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <div className="px-3 py-1.5 bg-background rounded-md text-sm font-medium flex items-center gap-1.5">
              <span className="text-orange-500">✳</span> Claude
            </div>
            <div className="px-3 py-1.5 text-sm text-muted-foreground flex items-center gap-1.5">
              <span>◎</span> Codex
            </div>
            <div className="px-3 py-1.5 text-sm text-muted-foreground flex items-center gap-1.5">
              <span className="text-blue-400">◆</span> Gemini
            </div>
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-muted-foreground" />
            <Monitor className="w-4 h-4 text-muted-foreground" />
            <Server className="w-4 h-4 text-muted-foreground" />
            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Provider List */}
      <div className="p-4 space-y-2 h-[280px] overflow-hidden bg-gradient-to-b from-card to-background">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground/50" />
            
            <div className={`w-10 h-10 rounded-xl ${provider.iconBg} flex items-center justify-center`}>
              {provider.isText ? (
                <span className="text-sm font-medium text-muted-foreground">{provider.icon}</span>
              ) : (
                <span className="text-lg">{provider.icon}</span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{provider.name}</span>
                {provider.status && (
                  <>
                    <span className="flex items-center gap-1 text-xs text-emerald-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {provider.status}
                    </span>
                    <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">
                      {provider.priority}
                    </span>
                  </>
                )}
              </div>
              <div className={`text-sm ${provider.isUrl ? 'text-emerald-500' : 'text-muted-foreground'} truncate`}>
                {provider.subtitle}
              </div>
            </div>
            
            {provider.used && (
              <div className="text-right text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs">⏱ {provider.time}</span>
                  <RefreshCw className="w-3 h-3" />
                </div>
                <div className="text-muted-foreground">
                  已使用: {provider.used} 剩余: <span className="text-emerald-500 font-medium">{provider.remaining}</span> USD
                </div>
              </div>
            )}
          </motion.div>
        ))}
        
        {/* Empty slot placeholder */}
        <div className="h-12 bg-muted/20 rounded-xl border border-dashed border-border/30" />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-400/30 rounded-full blur-3xl"
      />
      
      {/* Content */}
      <div className="relative z-10 container text-center px-4 py-12 md:py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 md:mb-8"
        >
          <span className="text-white/90 text-sm font-medium">🎉 v3.9.0 正式发布</span>
        </motion.div>
        
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
        >
          统一管理你的
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-300">
            AI CLI 配置
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4"
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
          className="flex flex-col sm:flex-row gap-4 justify-center px-4"
        >
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold gap-2"
          >
            <Download className="w-5 h-5" />
            免费下载 macOS
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold gap-2"
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
          className="mt-6 md:mt-8 text-white/60 text-sm"
        >
          支持 macOS 12+ · Windows 10+ · Linux
        </motion.p>
        
        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-12"
        >
          <div className="flex items-center gap-2 text-white/80">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">3.2k</span>
            <span className="text-white/60">Stars</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Users className="w-5 h-5" />
            <span className="font-semibold">500+</span>
            <span className="text-white/60">用户</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Terminal className="w-5 h-5" />
            <span className="font-semibold">3</span>
            <span className="text-white/60">支持 CLI</span>
          </div>
        </motion.div>
      </div>
      
      {/* App Preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1200px] hidden lg:block"
      >
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl blur-xl" />
          
          <AppPreview />
        </div>
      </motion.div>
    </section>
  );
}
