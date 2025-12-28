import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup, Reorder, useDragControls } from "framer-motion";
import { RefreshCw, Play, Check, Copy, Pencil, BarChart3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

// Import provider icons as URLs
import packyCodeIcon from "@/assets/icons/packycode.svg";
import anthropicIcon from "@/assets/icons/anthropic.svg";
import openRouterIcon from "@/assets/icons/openrouter.svg";
import zhipuIcon from "@/assets/icons/zhipu.svg";
import geminiIcon from "@/assets/icons/gemini-2.svg";
import openaiIcon from "@/assets/icons/openai.svg";

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
  isSvgUrl?: boolean;
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
  animationKey = "default",
}: ProviderCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dragControls = useDragControls();
  const { t } = useLanguage();

  const getBorderColor = () => {
    if (!isSelected) return "border-border/50";
    return proxyEnabled ? "border-emerald-500" : "border-blue-500";
  };

  const timeLabel = (() => {
    if (!provider.time) return "";
    const minutes = parseInt(String(provider.time).replace(/[^0-9]/g, ""), 10);
    if (Number.isFinite(minutes) && !Number.isNaN(minutes)) return `${minutes} ${t.provider.minutesAgo}`;
    return String(provider.time);
  })();

  return (
    <Reorder.Item
      value={provider}
      dragListener={false}
      dragControls={dragControls}
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        layout: { duration: 0.28 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className={cn(
        "relative flex items-center gap-3 bg-muted/30 rounded-xl border-2 cursor-pointer transition-colors hover:bg-muted/50",
        getBorderColor(),
        compact ? "p-2.5" : "p-4",
      )}
    >
      {/* Drag Handle - 6 dots */}
      <div
        className="flex flex-col gap-0.5 cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          e.stopPropagation();
          dragControls.start(e);
        }}
      >
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
      <div
        className={cn(
          "rounded-xl flex items-center justify-center shrink-0",
          provider.iconBg,
          compact ? "w-8 h-8" : "w-10 h-10",
        )}
      >
        {provider.isSvgUrl ? (
          <img 
            src={provider.icon} 
            alt={provider.name} 
            className={cn("text-foreground", compact ? "w-4 h-4" : "w-5 h-5")} 
          />
        ) : provider.isText ? (
          <span className={cn("font-medium text-muted-foreground", compact ? "text-xs" : "text-sm")}>
            {provider.icon}
          </span>
        ) : (
          <span className={compact ? "text-sm" : "text-lg"}>{provider.icon}</span>
        )}
      </div>

      {/* Provider Info */}
      <div className="flex-1 min-w-0">
        <div className={cn("font-semibold text-foreground", compact ? "text-sm" : "text-base")}>{provider.name}</div>
        <div
          className={cn(
            "truncate",
            provider.isUrl ? "text-emerald-500" : "text-muted-foreground",
            compact ? "text-xs" : "text-sm",
          )}
        >
          {provider.subtitle}
        </div>
      </div>

  {/* Usage Stats - with smooth layout animation */}
      {provider.used && (
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={cn("text-right hidden sm:block shrink-0", compact ? "text-[10px]" : "text-xs")}
        >
          <motion.div layout className="flex items-center gap-2 text-muted-foreground mb-0.5">
            <span>⏱ {timeLabel}</span>
            <RefreshCw className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
          </motion.div>
          <motion.div layout className="text-muted-foreground">
            {t.provider.used}: {provider.used} {t.provider.remaining}: <span className="text-emerald-500 font-semibold">{provider.remaining}</span>{" "}
            USD
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 shrink-0"
          >
            {/* Status/Action Button with layout animation */}
            <motion.div layout>
              {isActive ? (
                <motion.div
                  layoutId={`active-badge-${animationKey}`}
                  className={cn(
                    "flex items-center gap-1.5 bg-muted rounded-lg text-muted-foreground",
                    compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
                  )}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <Check className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
                  {t.provider.inUse}
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium transition-colors",
                    compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
                  )}
                >
                  <Play className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
                  {t.provider.enable}
                </motion.button>
              )}
            </motion.div>

            {/* Action Icons with staggered animation */}
            <div className="flex items-center gap-0.5">
              {[Copy, Pencil, BarChart3, Trash2].map((Icon, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.15 }}
                  whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--muted))" }}
                  whileTap={{ scale: 0.9 }}
                  className={cn("rounded-md transition-colors", compact ? "p-1" : "p-1.5")}
                >
                  <Icon className={cn("text-muted-foreground", compact ? "w-3 h-3" : "w-4 h-4")} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reorder.Item>
  );
}

interface ProviderListProps {
  providers: Provider[];
  activeProvider: number;
  proxyEnabled: boolean;
  onSelectProvider: (index: number) => void;
  onReorderProviders: (providers: Provider[]) => void;
  compact?: boolean;
  animationKey?: string;
}

export function ProviderList({
  providers,
  activeProvider,
  proxyEnabled,
  onSelectProvider,
  onReorderProviders,
  compact = false,
  animationKey = "default",
}: ProviderListProps) {
  return (
    <LayoutGroup id={animationKey}>
      <Reorder.Group
        axis="y"
        values={providers}
        onReorder={onReorderProviders}
        className={cn("space-y-2", compact ? "space-y-2" : "space-y-3")}
      >
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
      </Reorder.Group>
    </LayoutGroup>
  );
}

// Claude providers
export const claudeProviders: Provider[] = [
  {
    icon: packyCodeIcon,
    iconBg: "bg-emerald-500/20",
    name: "PackyCode",
    subtitle: "https://www.packyapi.com",
    time: "10",
    used: "672",
    remaining: "66",
    isSvgUrl: true,
  },
  {
    icon: anthropicIcon,
    iconBg: "bg-blue-500/20",
    name: "Anthropic",
    subtitle: "Claude Opus 4.5",
    isUrl: true,
    isSvgUrl: true,
  },
  {
    icon: openRouterIcon,
    iconBg: "bg-orange-500/20",
    name: "OpenRouter",
    subtitle: "Claude Sonnet 4.5",
    isUrl: true,
    isSvgUrl: true,
  },
  {
    icon: zhipuIcon,
    iconBg: "bg-blue-500/20",
    name: "zAi",
    subtitle: "GLM-4.7",
    isUrl: true,
    isSvgUrl: true,
  },
];

// Codex providers
export const codexProviders: Provider[] = [
  {
    icon: packyCodeIcon,
    iconBg: "bg-emerald-500/20",
    name: "PackyCode",
    subtitle: "https://www.packyapi.com",
    time: "5",
    used: "128",
    remaining: "372",
    isSvgUrl: true,
  },
  {
    icon: openRouterIcon,
    iconBg: "bg-orange-500/20",
    name: "OpenRouter",
    subtitle: "GPT-5.1-Codex-Max",
    isUrl: true,
    isSvgUrl: true,
  },
  {
    icon: openaiIcon,
    iconBg: "bg-slate-500/20",
    name: "OpenAI",
    subtitle: "GPT-5.2",
    isUrl: true,
    isSvgUrl: true,
  },
];

// Gemini providers
export const geminiProviders: Provider[] = [
  {
    icon: packyCodeIcon,
    iconBg: "bg-emerald-500/20",
    name: "PackyCode",
    subtitle: "https://www.packyapi.com",
    time: "2",
    used: "256",
    remaining: "744",
    isSvgUrl: true,
  },
  {
    icon: geminiIcon,
    iconBg: "bg-blue-500/20",
    name: "Google AI",
    subtitle: "Gemini 3 Flash Preview",
    isUrl: true,
    isSvgUrl: true,
  },
  {
    icon: openRouterIcon,
    iconBg: "bg-orange-500/20",
    name: "OpenRouter",
    subtitle: "Gemini 3 Pro Preview",
    isUrl: true,
    isSvgUrl: true,
  },
];

// Default providers (for backward compatibility)
export const defaultProviders = claudeProviders;
