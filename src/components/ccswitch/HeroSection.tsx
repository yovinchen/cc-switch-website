import { motion } from 'framer-motion';
import { Download, ArrowRight, Star, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import ccSwitchLogo from '@/assets/cc-switch-logo.png';
import { ProviderContent } from './DemoSection';
import { useGitHubStats } from '@/hooks/useGitHubStars';

function AppPreview() {
  return (
    <div className="relative bg-card/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden origin-top-left scale-[0.92] xl:scale-[0.96] 2xl:scale-100 min-w-[820px]">
      {/* macOS Window Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      
      {/* Reuse ProviderContent from DemoSection */}
      <ProviderContent />
    </div>
  );
}

export function HeroSection() {
  const { formattedStars, formattedDownloads, version } = useGitHubStats();
  const { t } = useLanguage();
  
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
      <div className="relative z-10 container px-4 py-8 md:py-12 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-[5fr,7fr] gap-6 lg:gap-4 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left lg:pl-48 xl:pl-80 lg:pr-4">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6"
            >
              {/* Version Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-foreground text-sm font-medium">
                🎉 v{version || '...'} {t.hero.versionBadge}
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
                {t.hero.title}
                <span className="block gradient-text">
                  {t.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t.hero.subtitle}
              <br className="hidden sm:block" />
              {t.hero.subtitleLine2}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-2xl"
            >
              <a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="hero-gradient text-white hover:opacity-90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t.hero.downloadBtn}
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-background/50 backdrop-blur-sm hover:bg-accent px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold gap-2"
              >
                {t.hero.docsBtn}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
            
            {/* Supported Platforms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm max-w-2xl"
            >
              <span className="text-muted-foreground">{t.hero.platforms}</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium">
                Built with Tauri 2
              </span>
            </motion.div>
            
            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-8 max-w-2xl"
            >
              <div className="flex items-center gap-2 text-foreground">
                <Star className="w-5 h-5 text-warning" />
                <span className="font-semibold">{formattedStars}</span>
                <span className="text-muted-foreground">{t.hero.stars}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Download className="w-5 h-5 text-primary" />
                <span className="font-semibold">{formattedDownloads}</span>
                <span className="text-muted-foreground">{t.hero.downloads}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Terminal className="w-5 h-5 text-success" />
                <span className="font-semibold">3</span>
                <span className="text-muted-foreground">{t.hero.supportedCli}</span>
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
              <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 to-purple/20 rounded-3xl blur-2xl" />
              
              <AppPreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
