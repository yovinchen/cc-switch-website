import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  '无限 Provider 配置',
  '本地代理服务器',
  '自动故障转移',
  '使用统计与成本追踪',
  'MCP/Skills/Prompts 管理',
  '跨平台支持 (macOS/Win/Linux)',
  '社区支持',
  '开源代码访问',
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-display-md text-foreground mb-4 md:mb-6">
            简单透明的定价
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            开源免费，永久无限制使用
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative p-8 md:p-10 rounded-3xl bg-card border-2 border-primary shadow-xl">
            {/* Recommended Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full hero-gradient text-white text-sm font-semibold shadow-lg">
                <Sparkles className="w-4 h-4" />
                推荐
              </span>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                开源免费
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl md:text-6xl font-bold text-foreground">$0</span>
              </div>
              <p className="text-muted-foreground mt-2">永久免费，无隐藏费用</p>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button className="w-full hero-gradient text-white hover:opacity-90 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              立即下载
            </Button>
          </div>
        </motion.div>

        {/* Enterprise Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-muted-foreground mt-8"
        >
          需要企业级支持？
          <a href="#contact" className="text-primary hover:underline ml-1">
            联系我们
          </a>
        </motion.p>
      </div>
    </section>
  );
}
