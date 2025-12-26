import { Github, Twitter, MessageCircle } from 'lucide-react';
import ccSwitchLogo from '@/assets/cc-switch-logo.png';

const footerLinks = {
  product: {
    title: '产品',
    links: [
      { label: '功能', href: '#features' },
      { label: '下载', href: '#download' },
      { label: '更新日志', href: '#changelog' },
      { label: '路线图', href: '#roadmap' },
    ],
  },
  resources: {
    title: '资源',
    links: [
      { label: '文档', href: '#docs' },
      { label: '博客', href: '#blog' },
      { label: 'API 参考', href: '#api' },
      { label: '示例', href: '#examples' },
    ],
  },
  community: {
    title: '社区',
    links: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Discord', href: '#discord' },
      { label: '贡献指南', href: '#contributing' },
      { label: '问题反馈', href: '#issues' },
    ],
  },
  legal: {
    title: '法律',
    links: [
      { label: '隐私政策', href: '#privacy' },
      { label: '服务条款', href: '#terms' },
      { label: 'MIT 许可证', href: '#license' },
    ],
  },
};

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: MessageCircle, href: '#discord', label: 'Discord' },
];

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={ccSwitchLogo} alt="CC-Switch Logo" className="w-8 h-8" />
              <span className="font-bold text-lg">CC-Switch</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              统一管理你的 AI CLI 配置
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-background transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-background mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-background transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-muted-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 CC-Switch. 基于 MIT 协议开源。
          </p>
          <p className="text-muted-foreground text-sm">
            Made with ❤️ by CC-Switch Team
          </p>
        </div>
      </div>
    </footer>
  );
}
