import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'CC Switch 是免费的吗？',
    answer: '是的，CC Switch 完全免费且开源。基于 MIT 协议发布，您可以自由使用、修改和分发。',
  },
  {
    question: '支持哪些 AI CLI 工具？',
    answer: '目前支持 Claude Code、OpenAI Codex CLI 和 Google Gemini CLI。我们正在积极开发对更多 CLI 工具的支持。',
  },
  {
    question: '我的 API Key 安全吗？',
    answer: '绝对安全。所有 API Key 和配置信息都存储在您本地的 SQLite 数据库中，不会上传到任何服务器。',
  },
  {
    question: '代理服务器会影响请求速度吗？',
    answer: '影响微乎其微。代理服务器基于 Rust 构建，性能极高，通常只会增加不到 1ms 的延迟。',
  },
  {
    question: '如何参与贡献？',
    answer: '欢迎通过 GitHub 提交 Issue 和 Pull Request。我们有详细的贡献指南，帮助您快速上手。',
  },
  {
    question: '遇到问题如何获取帮助？',
    answer: '您可以通过 GitHub Issues 反馈问题，或者加入我们的 Discord 社区与其他用户交流。',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-display-md text-foreground mb-4 md:mb-6">
            常见问题
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            有疑问？我们来解答
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
