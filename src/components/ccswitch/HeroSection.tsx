import { motion } from 'framer-motion';
import { Download, ArrowRight, Star, Users, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          
          {/* App Window */}
          <div className="relative bg-card/95 backdrop-blur-2xl rounded-t-2xl border border-white/30 shadow-2xl overflow-hidden">
            {/* macOS Window Bar */}
            <div className="flex items-center gap-2 px-6 py-4 bg-muted/50 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="ml-4 text-sm text-muted-foreground">
                CC Switch - Provider 管理
              </div>
            </div>
            
            {/* App Content Preview */}
            <div className="p-6 h-[300px] bg-gradient-to-b from-card to-background">
              <div className="grid grid-cols-3 gap-4 h-full">
                <div className="col-span-1 bg-muted/30 rounded-xl p-4 space-y-3">
                  <div className="h-3 w-3/4 bg-muted rounded" />
                  <div className="h-8 bg-primary/20 rounded-lg" />
                  <div className="h-8 bg-muted/50 rounded-lg" />
                  <div className="h-8 bg-muted/50 rounded-lg" />
                </div>
                <div className="col-span-2 bg-muted/20 rounded-xl p-4 space-y-3">
                  <div className="h-4 w-1/4 bg-muted rounded" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 bg-primary/10 rounded-lg border border-primary/20" />
                    <div className="h-20 bg-purple/10 rounded-lg border border-purple/20" />
                  </div>
                  <div className="h-3 w-1/2 bg-muted rounded mt-4" />
                  <div className="h-12 bg-muted/30 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
