import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    content: 'CC Switch 彻底改变了我的 AI 开发工作流。多 Provider 故障转移功能让我再也不用担心 API 限流问题，成本追踪功能帮我节省了 30% 的开支。',
    author: '张伟',
    role: '全栈开发工程师 @某科技公司',
    avatar: 'Z',
    avatarBg: 'bg-blue-500',
  },
  {
    content: '作为一个重度使用 Claude Code 的开发者，CC Switch 的 MCP 配置管理功能太好用了。可视化界面让复杂的配置变得简单直观。',
    author: '李明',
    role: '独立开发者',
    avatar: 'L',
    avatarBg: 'bg-purple-500',
  },
  {
    content: '开源免费还这么强大，感谢作者的无私奉献！代理服务器功能稳定可靠，团队里每个人都在用。',
    author: '王芳',
    role: 'AI 产品经理 @创业公司',
    avatar: 'W',
    avatarBg: 'bg-green-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-display-md text-foreground mb-4 md:mb-6">
            用户怎么说
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            来自开发者社区的真实反馈
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={itemVariants}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${testimonial.avatarBg} text-white flex items-center justify-center font-bold text-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
