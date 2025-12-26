import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            准备好体验更高效的
            <br className="hidden sm:block" />
            AI 工作流了吗?
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto">
            下载 CC Switch，开启统一管理 AI CLI 配置的新方式
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all px-8 py-6 text-lg font-semibold gap-2"
              >
                <Download className="w-5 h-5" />
                立即下载
              </Button>
            </a>
            <a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold gap-2"
              >
                查看 GitHub
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Platforms */}
          <p className="mt-8 text-white/60 text-sm">
            支持 macOS · Windows · Linux
          </p>
        </motion.div>
      </div>
    </section>
  );
}
