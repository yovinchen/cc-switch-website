# CC Switch Website

CC Switch 官方网站，展示产品功能、文档和更新日志。

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Router

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── components/     # 组件
│   ├── ccswitch/   # CC Switch 专用组件
│   ├── docs/       # 文档相关组件
│   └── ui/         # shadcn/ui 组件
├── content/        # 文档内容
├── i18n/           # 国际化
├── pages/          # 页面
└── hooks/          # 自定义 Hooks
public/
└── docs/           # Markdown 文档文件
```

## 相关链接

- [CC Switch 主仓库](https://github.com/farion1231/cc-switch)
- [在线文档](https://ccswitch.lovable.app/docs)

## 许可证

[MIT](LICENSE)
