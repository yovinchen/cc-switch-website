import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const avatarStyles = [
  { avatar: 'Z', avatarBg: 'bg-blue-500' },
  { avatar: 'L', avatarBg: 'bg-purple-500' },
  { avatar: 'W', avatarBg: 'bg-green-500' },
  { avatar: 'C', avatarBg: 'bg-orange-500' },
  { avatar: 'H', avatarBg: 'bg-pink-500' },
  { avatar: 'Y', avatarBg: 'bg-cyan-500' },
];

function TestimonialCard({ testimonial, style }: {
  testimonial: { content: string; author: string; role: string };
  style: { avatar: string; avatarBg: string };
}) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[360px] p-5 rounded-2xl bg-card border border-border shadow-lg">
      {/* Quote Icon */}
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Quote className="w-4 h-4 text-primary" />
      </div>

      {/* Content */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${style.avatarBg} text-white flex items-center justify-center font-bold text-sm`}>
          {style.avatar}
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm">
            {testimonial.author}
          </div>
          <div className="text-xs text-muted-foreground">
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollRow({ items, direction, offset = 0 }: {
  items: { content: string; author: string; role: string }[];
  direction: 'left' | 'right';
  offset?: number;
}) {
  // 复制足够多的内容确保无缝
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];
  const gap = 20; // 统一间距 20px

  return (
    <div
      className="flex overflow-hidden"
      style={{ paddingLeft: offset }}
    >
      {/* 第一组 */}
      <div
        className={`flex shrink-0 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ gap: `${gap}px` }}
      >
        {duplicatedItems.map((testimonial, index) => (
          <TestimonialCard
            key={`a-${index}`}
            testimonial={testimonial}
            style={avatarStyles[index % avatarStyles.length]}
          />
        ))}
      </div>
      {/* 间隔 */}
      <div style={{ width: `${gap}px` }} className="shrink-0" />
      {/* 第二组 - 紧跟第一组实现无缝 */}
      <div
        className={`flex shrink-0 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ gap: `${gap}px` }}
      >
        {duplicatedItems.map((testimonial, index) => (
          <TestimonialCard
            key={`b-${index}`}
            testimonial={testimonial}
            style={avatarStyles[index % avatarStyles.length]}
          />
        ))}
      </div>
      <div style={{ width: `${gap}px` }} className="shrink-0" />
    </div>
  );
}

export function TestimonialsSection() {
  const { t } = useLanguage();
  const items = t.testimonials.items;

  return (
    <section className="py-20 md:py-32 bg-muted/30 overflow-hidden">
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
            {t.testimonials.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t.testimonials.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Scrolling Rows Container */}
      <div className="space-y-6">
        {/* Top Row - 向左滚动 */}
        <ScrollRow items={items} direction="left" />

        {/* Bottom Row - 向右滚动，错开位置 */}
        <ScrollRow items={items} direction="right" offset={180} />
      </div>

      {/* CSS Keyframes for smooth infinite scroll */}
      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 120s linear infinite;
          will-change: transform;
        }

        .animate-marquee-right {
          animation: marquee-right 130s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
