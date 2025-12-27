import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw, ExternalLink } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const CHANGELOG_URL = 'https://raw.githubusercontent.com/farion1231/cc-switch/main/CHANGELOG.md';

interface ChangelogViewerProps {
  className?: string;
}

export function ChangelogViewer({ className }: ChangelogViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const fetchChangelog = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(CHANGELOG_URL, {
        cache: 'no-cache',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch changelog: ${response.status}`);
      }
      
      const text = await response.text();
      setContent(text);
    } catch (err) {
      console.error('Error fetching changelog:', err);
      setError(
        language === 'zh' 
          ? '无法加载更新日志，请稍后重试' 
          : language === 'ja'
          ? '変更履歴を読み込めません。後でもう一度お試しください'
          : 'Failed to load changelog. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChangelog();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">
          {language === 'zh' ? '加载更新日志...' : language === 'ja' ? '変更履歴を読み込み中...' : 'Loading changelog...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center mb-6">
          <p className="text-destructive mb-2">{error}</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={fetchChangelog} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {language === 'zh' ? '重试' : language === 'ja' ? '再試行' : 'Retry'}
          </Button>
          <a
            href="https://github.com/farion1231/cc-switch/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              {language === 'zh' ? '在 GitHub 查看' : language === 'ja' ? 'GitHubで表示' : 'View on GitHub'}
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {language === 'zh' ? '更新日志' : language === 'ja' ? '変更履歴' : 'Changelog'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === 'zh' 
              ? '查看 CC Switch 的所有版本更新记录' 
              : language === 'ja'
              ? 'CC Switch のすべてのバージョン更新履歴を確認'
              : 'View all version updates for CC Switch'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchChangelog} variant="ghost" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">
              {language === 'zh' ? '刷新' : language === 'ja' ? '更新' : 'Refresh'}
            </span>
          </Button>
          <a
            href="https://github.com/farion1231/cc-switch/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Changelog content */}
      <MarkdownRenderer content={content} />
    </motion.div>
  );
}
