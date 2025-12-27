import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Moon, Sun, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageSwitcher } from '@/components/ccswitch/LanguageSwitcher';
import ccSwitchLogo from '@/assets/cc-switch-logo.png';
import { Link } from 'react-router-dom';

interface DocsNavbarProps {
  onSearchClick?: () => void;
}

export function DocsNavbar({ onSearchClick }: DocsNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-background/60 backdrop-blur-lg border-b border-border/50'
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Left: Back + Logo */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-6 bg-border" />
            <Link to="/docs" className="flex items-center gap-2">
              <img src={ccSwitchLogo} alt="CC Switch Logo" className="w-7 h-7" />
              <span className="font-semibold text-foreground">Docs</span>
            </Link>
          </div>

          {/* Center: Search */}
          <button
            onClick={onSearchClick}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg border border-border/50 text-muted-foreground hover:text-foreground transition-colors min-w-[240px]"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search docs...</span>
            <kbd className="ml-auto text-xs bg-background px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
          </button>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-muted/80 hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-foreground" />
                    ) : (
                      <Moon className="w-4 h-4 text-foreground" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}

            <a
              href="https://github.com/farion1231/cc-switch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
