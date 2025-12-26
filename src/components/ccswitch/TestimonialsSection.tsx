import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const avatarStyles = [
  { avatar: 'Z', avatarBg: 'bg-blue-500' },
  { avatar: 'L', avatarBg: 'bg-purple-500' },
  { avatar: 'W', avatarBg: 'bg-green-500' },
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
  const { t } = useLanguage();

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
            {t.testimonials.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t.testimonials.subtitle}
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
          {t.testimonials.items.map((testimonial, index) => {
            const style = avatarStyles[index];
            
            return (
              <motion.div
                key={index}
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
                  <div className={`w-12 h-12 rounded-full ${style.avatarBg} text-white flex items-center justify-center font-bold text-lg`}>
                    {style.avatar}
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
