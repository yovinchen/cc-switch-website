import { motion } from 'framer-motion';
import { 
  Layers, 
  Zap, 
  DollarSign, 
  Shield, 
  Settings, 
  GitBranch,
  type LucideIcon
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
}

const features: Feature[] = [
  {
    icon: Layers,
    title: '统一管理三大 CLI',
    description: '一个界面管理 Claude Code、Codex 和 Gemini CLI 的所有配置，无需频繁切换终端和配置文件。',
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    iconBg: 'bg-blue-500',
  },
  {
    icon: Zap,
    title: '自动故障转移',
    description: '内置熔断器机制，当主 Provider 失败时自动切换到备用 Provider，保障服务高可用。',
    gradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    iconBg: 'bg-purple-500',
  },
  {
    icon: DollarSign,
    title: '成本追踪',
    description: '实时统计 Token 使用量和成本，支持自定义成本倍率，帮助开发者精确控制预算。',
    gradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    iconBg: 'bg-green-500',
  },
  {
    icon: Shield,
    title: '安全本地存储',
    description: '所有配置和 API Key 安全存储在本地 SQLite 数据库，支持完整的 Schema 迁移。',
    gradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    iconBg: 'bg-orange-500',
  },
  {
    icon: Settings,
    title: 'MCP/Skills 管理',
    description: '可视化管理 MCP 服务器、Skills 和 Prompts 配置，无需手动编辑 JSON 文件。',
    gradient: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
    iconBg: 'bg-pink-500',
  },
  {
    icon: GitBranch,
    title: '开源免费',
    description: '基于 MIT 协议开源，完全免费使用。社区驱动开发，欢迎贡献代码和反馈。',
    gradient: 'from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20',
    iconBg: 'bg-cyan-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-display-md text-foreground mb-4 md:mb-6">
            为什么选择 CC Switch?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            一个应用解决所有 AI CLI 配置管理难题
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-border/50 hover:shadow-xl transition-all duration-300`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${feature.iconBg} text-white flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
