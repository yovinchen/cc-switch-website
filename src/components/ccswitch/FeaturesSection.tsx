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
import { useLanguage } from '@/i18n/LanguageContext';

const featureIcons: LucideIcon[] = [Layers, Zap, DollarSign, Shield, Settings, GitBranch];

const featureStyles = [
  {
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    iconBg: 'bg-blue-500',
  },
  {
    gradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    iconBg: 'bg-purple-500',
  },
  {
    gradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    iconBg: 'bg-green-500',
  },
  {
    gradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    iconBg: 'bg-orange-500',
  },
  {
    gradient: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
    iconBg: 'bg-pink-500',
  },
  {
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
  const { t } = useLanguage();

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
            {t.features.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.features.subtitle}
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
          {t.features.items.map((feature, index) => {
            const Icon = featureIcons[index];
            const style = featureStyles[index];
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${style.gradient} border border-border/50 hover:shadow-xl transition-all duration-300`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${style.iconBg} text-white flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
