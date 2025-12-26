import { motion } from 'framer-motion';
import { Check, Database, Code, TestTube } from 'lucide-react';

const techFeatures = [
  {
    icon: Database,
    title: 'SQLite 数据持久化',
    description: '所有配置存储在本地 SQLite 数据库，安全可靠，支持完整的 Schema 迁移。',
    color: 'bg-blue-500',
  },
  {
    icon: Code,
    title: 'Rust 后端 + React 前端',
    description: '基于 Tauri 2.x 构建，结合 Rust 的性能和 React 的灵活性。',
    color: 'bg-purple-500',
  },
  {
    icon: TestTube,
    title: '完整的测试覆盖',
    description: '100% Hooks 测试覆盖率，Rust 单元测试 + 集成测试。',
    color: 'bg-green-500',
  },
];

export function TechSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Code Example */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                开发者友好
              </span>
            </div>

            {/* Title */}
            <h2 className="text-display-sm text-foreground mb-4 md:mb-6">
              零配置，开箱即用
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              无需修改代码，只需开启按钮自动代理地址，即可享受多 Provider 故障转移、
              成本追踪等高级功能。
            </p>

            {/* Code Block - Always dark background */}
            <div className="rounded-xl bg-[#1a1a1a] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#252525] border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-white/50 ml-2">~/.claude/settings.json</span>
              </div>
              <pre className="p-4 md:p-6 overflow-x-auto text-xs md:text-sm">
                <code className="text-green-400 font-mono">
{`{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "PROXY_MANAGED",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:15721"
  }
}`}
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Right: Feature List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {techFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex gap-4"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${feature.color} text-white flex items-center justify-center`}>
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
