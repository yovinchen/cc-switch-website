import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  RefreshCw, Play, Check, ExternalLink, Copy, Pencil, BarChart3, Trash2 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Provider {
  icon: string;
  iconBg: string;
  name: string;
  subtitle: string;
  time?: string;
  used?: string;
  remaining?: string;
  isUrl?: boolean;
  isText?: boolean;
}

interface ProviderCardProps {
  provider: Provider;
  index: number;
  isActive: boolean;
  isSelected: boolean;
  proxyEnabled: boolean;
  onSelect: () => void;
  compact?: boolean;
  animationKey?: string;
}

export function ProviderCard({
  provider,
  index,
  isActive,
  isSelected,
  proxyEnabled,
  onSelect,
  compact = false,
  animationKey = 'default',
}: ProviderCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getBorderColor = () => {
    if (!isSelected) return 'border-border/50';
    return proxyEnabled ? 'border-emerald-500' : 'border-primary';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        layout: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className={cn(
        "relative flex items-center gap-3 bg-muted/30 rounded-xl border-2 cursor-pointer transition-colors hover:bg-muted/50",
        getBorderColor(),
        compact ? "p-2.5" : "p-4"
      )}
    >
      {/* Drag Handle - 6 dots */}
      <div className="flex flex-col gap-0.5 cursor-grab active:cursor-grabbing">
        <div className="flex gap-0.5">
          <div className={cn("rounded-full bg-muted-foreground/40", compact ? "w-0.5 h-0.5" : "w-1 h-1")} />
          <div className={cn("rounded-full bg-muted-foreground/40", compact ? "w-0.5 h-0.5" : "w-1 h-1")} />
        </div>
        <div className="flex gap-0.5">
          <div className={cn("rounded-full bg-muted-foreground/40", compact ? "w-0.5 h-0.5" : "w-1 h-1")} />
          <div className={cn("rounded-full bg-muted-foreground/40", compact ? "w-0.5 h-0.5" : "w-1 h-1")} />
        </div>
        <div className="flex gap-0.5">
          <div className={cn("rounded-full bg-muted-foreground/40", compact ? "w-0.5 h-0.5" : "w-1 h-1")} />
          <div className={cn("rounded-full bg-muted-foreground/40", compact ? "w-0.5 h-0.5" : "w-1 h-1")} />
        </div>
      </div>
      
      {/* Provider Icon */}
      <div className={cn(
        "rounded-xl flex items-center justify-center shrink-0",
        provider.iconBg,
        compact ? "w-8 h-8" : "w-10 h-10"
      )}>
        {provider.isText ? (
          <span className={cn("font-medium text-muted-foreground", compact ? "text-xs" : "text-sm")}>{provider.icon}</span>
        ) : (
          <span className={compact ? "text-sm" : "text-lg"}>{provider.icon}</span>
        )}
      </div>
      
      {/* Provider Info */}
      <div className="flex-1 min-w-0">
        <div className={cn("font-semibold text-foreground", compact ? "text-sm" : "text-base")}>{provider.name}</div>
        <div className={cn(
          "truncate",
          provider.isUrl ? 'text-emerald-500' : 'text-muted-foreground',
          compact ? "text-xs" : "text-sm"
        )}>
          {provider.subtitle}
        </div>
      </div>
      
      {/* Usage Stats - with smooth layout animation */}
      {provider.used && (
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={cn("text-right hidden sm:block shrink-0", compact ? "text-[10px]" : "text-xs")}
        >
          <motion.div 
            layout
            className="flex items-center gap-2 text-muted-foreground mb-0.5"
          >
            <span>⏱ {provider.time}</span>
            <RefreshCw className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
          </motion.div>
          <motion.div layout className="text-muted-foreground">
            已使用: {provider.used} 剩余: <span className="text-emerald-500 font-semibold">{provider.remaining}</span> USD
          </motion.div>
        </motion.div>
      )}
      
      {/* Action Button & Icons - Show on hover with smooth animation */}
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center gap-2 shrink-0"
          >
            {/* Status/Action Button with layout animation */}
            <motion.div layout>
              {isActive ? (
                <motion.div
                  layoutId={`active-badge-${animationKey}`}
                  className={cn(
                    "flex items-center gap-1.5 bg-muted rounded-lg text-muted-foreground",
                    compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
                  )}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <Check className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
                  使用中
                </motion.div>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium transition-colors",
                    compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
                  )}
                >
                  <Play className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
                  启用
                </motion.button>
              )}
            </motion.div>
            
            {/* Action Icons with staggered animation */}
            <div className="flex items-center gap-0.5">
              {[ExternalLink, Copy, Pencil, BarChart3, Trash2].map((Icon, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.15 }}
                  whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--muted))' }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "rounded-md transition-colors",
                    compact ? "p-1" : "p-1.5"
                  )}
                >
                  <Icon className={cn("text-muted-foreground", compact ? "w-3 h-3" : "w-4 h-4")} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface ProviderListProps {
  providers: Provider[];
  activeProvider: number;
  proxyEnabled: boolean;
  onSelectProvider: (index: number) => void;
  compact?: boolean;
  animationKey?: string;
}

export function ProviderList({
  providers,
  activeProvider,
  proxyEnabled,
  onSelectProvider,
  compact = false,
  animationKey = 'default',
}: ProviderListProps) {
  return (
    <LayoutGroup id={animationKey}>
      <AnimatePresence mode="popLayout">
        <div className={cn("space-y-2", compact ? "space-y-2" : "space-y-3")}>
          {providers.map((provider, index) => (
            <ProviderCard
              key={`${animationKey}-${provider.name}`}
              provider={provider}
              index={index}
              isActive={index === activeProvider}
              isSelected={index === activeProvider}
              proxyEnabled={proxyEnabled}
              onSelect={() => onSelectProvider(index)}
              compact={compact}
              animationKey={animationKey}
            />
          ))}
        </div>
      </AnimatePresence>
    </LayoutGroup>
  );
}

export const defaultProviders: Provider[] = [
  {
    icon: '⚡',
    iconBg: 'bg-emerald-500/20',
    name: 'PackyCode AWS',
    subtitle: 'AWSQ',
    time: '10 分钟前',
    used: '672.88',
    remaining: '616.95',
  },
  {
    icon: '⚡',
    iconBg: 'bg-emerald-500/20',
    name: 'PackyCode',
    subtitle: 'Packy awsq',
    time: '10 分钟前',
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
    icon: '🔀',
    iconBg: 'bg-orange-500/20',
    name: 'AnyRouter',
    subtitle: 'https://anyrouter.top',
    isUrl: true,
  },
];
