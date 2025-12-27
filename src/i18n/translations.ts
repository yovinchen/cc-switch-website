export type Language = 'zh' | 'en' | 'ja';

export const translations = {
  zh: {
    // Navbar
    nav: {
      home: '首页',
      features: '功能',
      pricing: '定价',
      docs: '文档',
      changelog: '更新日志',
      download: '免费下载',
    },
    // Hero Section
    hero: {
      versionBadge: '正式发布',
      title: '统一管理你的',
      titleHighlight: 'AI CLI 配置',
      subtitle: '一个应用，管理 Claude Code、Codex 和 Gemini CLI。',
      subtitleLine2: '内置代理服务器，支持多 Provider 自动故障转移。',
      downloadBtn: '免费下载',
      docsBtn: '查看文档',
      platforms: '支持 macOS 12+ · Windows 10+ · Linux',
      stars: 'Stars',
      downloads: '下载',
      supportedCli: '支持 CLI',
    },
    // Features Section
    features: {
      title: '为什么选择 CC Switch?',
      subtitle: '一个应用解决所有 AI CLI 配置管理难题',
      items: [
        {
          title: '统一管理三大 CLI',
          description: '一个界面管理 Claude Code、Codex 和 Gemini CLI 的所有配置，无需频繁切换终端和配置文件。',
        },
        {
          title: '自动故障转移',
          description: '内置熔断器机制，当主 Provider 失败时自动切换到备用 Provider，保障服务高可用。',
        },
        {
          title: '成本追踪',
          description: '实时统计 Token 使用量和成本，支持自定义成本倍率，帮助开发者精确控制预算。',
        },
        {
          title: '安全本地存储',
          description: '所有配置和 API Key 安全存储在本地 SQLite 数据库，支持完整的 Schema 迁移。',
        },
        {
          title: 'MCP/Skills 管理',
          description: '可视化管理 MCP 服务器、Skills 和 Prompts 配置，无需手动编辑 JSON 文件。',
        },
        {
          title: '开源免费',
          description: '基于 MIT 协议开源，完全免费使用。社区驱动开发，欢迎贡献代码和反馈。',
        },
      ],
    },
    // Tech Section
    tech: {
      badge: '开发者友好',
      title: '零配置，开箱即用',
      description: '无需修改代码，只需开启按钮自动代理地址，即可享受多 Provider 故障转移、成本追踪等高级功能。',
      features: [
        {
          title: 'SQLite 数据持久化',
          description: '所有配置存储在本地 SQLite 数据库，安全可靠，支持完整的 Schema 迁移。',
        },
        {
          title: 'Rust 后端 + React 前端',
          description: '基于 Tauri 2.x 构建，结合 Rust 的性能和 React 的灵活性。',
        },
        {
          title: '智能成本追踪',
          description: '实时监控 Token 消耗与费用，按 Provider 分类统计分析。',
        },
      ],
    },
    // Provider Card
    provider: {
      inUse: '使用中',
      enable: '启用',
      used: '已使用',
      remaining: '剩余',
      minutesAgo: '分钟前',
    },
    // Demo Section
    demo: {
      title: '直观的操作界面',
      subtitle: '所见即所得，零学习成本',
      tabs: {
        provider: 'Provider 管理',
        proxy: '代理服务器',
        stats: '使用统计',
      },
      proxy: {
        localProxy: '本地代理',
        proxyDescription: '控制代理服务开关、查看状态与端口信息',
        running: '运行中',
        stopped: '已停止',
        serviceAddress: '服务地址',
        copy: '复制',
        addressNote: '修改监听地址/端口需要先停止代理服务',
        currentProvider: '当前 Provider',
        waitingRequest: '等待首次请求...',
        proxyEnable: '代理启用',
        enableLogging: '启用日志记录',
        loggingNote: '记录所有代理请求，便于排查问题',
        failoverQueue: '故障转移队列',
        normal: '正常',
        activeConnections: '活跃连接',
        totalRequests: '总请求数',
        successRate: '成功率',
        uptime: '运行时间',
      },
      stats: {
        title: '使用统计',
        subtitle: '查看 AI 模型的使用情况和成本统计',
        periods: {
          hours24: '24小时',
          days7: '7天',
          days30: '30天',
        },
        totalRequests: '总请求数',
        totalCost: '总成本',
        totalTokens: '总 Token 数',
        cacheTokens: '缓存 Token',
        trend: '使用趋势',
        past: '过去',
        requests: '请求数',
        cost: '成本',
        inputToken: '输入Token',
        outputToken: '输出Token',
        writeCache: '写缓存',
        hitCache: '命中缓存',
      },
    },
    // Pricing Section
    pricing: {
      title: '简单透明的定价',
      subtitle: '开源免费，永久无限制使用',
      recommended: '推荐',
      planName: '开源免费',
      price: '$0',
      priceNote: '永久免费，无隐藏费用',
      downloadBtn: '立即下载',
      enterprise: '需要企业级支持？',
      contactUs: '联系我们',
      features: [
        '无限 Provider 配置',
        '本地代理服务器',
        '自动故障转移',
        '使用统计与成本追踪',
        'MCP/Skills/Prompts 管理',
        '跨平台支持 (macOS/Win/Linux)',
        '社区支持',
        '开源代码访问',
      ],
    },
    // FAQ Section
    faq: {
      title: '常见问题',
      subtitle: '有疑问？我们来解答',
      items: [
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
      ],
    },
    // Testimonials Section
    testimonials: {
      title: '用户怎么说',
      subtitle: '来自开发者社区的真实反馈',
      items: [
        {
          content: 'CC Switch 彻底改变了我的 AI 开发工作流。多 Provider 故障转移功能让我再也不用担心 API 限流问题，成本追踪功能帮我节省了 30% 的开支。',
          author: '张伟',
          role: '全栈开发工程师 @某科技公司',
        },
        {
          content: '作为一个重度使用 Claude Code 的开发者，CC Switch 的 MCP 配置管理功能太好用了。可视化界面让复杂的配置变得简单直观。',
          author: '李明',
          role: '独立开发者',
        },
        {
          content: '开源免费还这么强大，感谢作者的无私奉献！代理服务器功能稳定可靠，团队里每个人都在用。',
          author: '王芳',
          role: 'AI 产品经理 @创业公司',
        },
      ],
    },
    // CTA Section
    cta: {
      title: '准备好体验更高效的',
      titleLine2: 'AI 工作流了吗?',
      subtitle: '下载 CC Switch，开启统一管理 AI CLI 配置的新方式',
      downloadBtn: '立即下载',
      githubBtn: '查看 GitHub',
      platforms: '支持 macOS · Windows · Linux',
    },
    // Footer
    footer: {
      tagline: '统一管理你的 AI CLI 配置',
      product: {
        title: '产品',
        features: '功能',
        download: '下载',
        changelog: '更新日志',
        roadmap: '路线图',
      },
      resources: {
        title: '资源',
        docs: '文档',
        changelog: '更新日志',
        api: 'API 参考',
        examples: '示例',
      },
      community: {
        title: '社区',
        github: 'GitHub',
        discord: 'Discord',
        contributing: '贡献指南',
        issues: '问题反馈',
      },
      legal: {
        title: '法律',
        privacy: '隐私政策',
        terms: '服务条款',
        license: 'MIT 许可证',
      },
      copyright: '© 2025 CC Switch. 基于 MIT 协议开源。',
      madeWith: 'Made with ❤️ by CC Switch Team',
    },
    // Changelog Page
    changelog: {
      title: '更新日志',
      description: 'CC Switch 的所有重要更新都将记录在这里。了解最新的功能、改进和错误修复。',
      loading: '正在加载更新日志...',
      error: '加载失败',
      versions: '版本列表',
      inVersion: '在 v{version} 中',
      betaRelease: 'Beta 版本',
    },
  },
  en: {
    // Navbar
    nav: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      docs: 'Docs',
      changelog: 'Changelog',
      download: 'Download Free',
    },
    // Hero Section
    hero: {
      versionBadge: 'Released',
      title: 'Unified Management for Your',
      titleHighlight: 'AI CLI Configuration',
      subtitle: 'One app to manage Claude Code, Codex, and Gemini CLI.',
      subtitleLine2: 'Built-in proxy server with automatic multi-provider failover.',
      downloadBtn: 'Download Free',
      docsBtn: 'View Docs',
      platforms: 'macOS 12+ · Windows 10+ · Linux',
      stars: 'Stars',
      downloads: 'Downloads',
      supportedCli: 'CLI Supported',
    },
    // Features Section
    features: {
      title: 'Why Choose CC Switch?',
      subtitle: 'One app to solve all AI CLI configuration challenges',
      items: [
        {
          title: 'Unified CLI Management',
          description: 'Manage all configurations for Claude Code, Codex, and Gemini CLI in one interface, no more switching between terminals.',
        },
        {
          title: 'Automatic Failover',
          description: 'Built-in circuit breaker automatically switches to backup providers when the primary fails, ensuring high availability.',
        },
        {
          title: 'Cost Tracking',
          description: 'Real-time token usage and cost statistics with custom cost multipliers to help developers control budgets precisely.',
        },
        {
          title: 'Secure Local Storage',
          description: 'All configurations and API keys are securely stored in a local SQLite database with full schema migration support.',
        },
        {
          title: 'MCP/Skills Management',
          description: 'Visual management for MCP servers, Skills, and Prompts configuration without manual JSON editing.',
        },
        {
          title: 'Open Source & Free',
          description: 'Open source under MIT license, completely free. Community-driven development, contributions welcome.',
        },
      ],
    },
    // Tech Section
    tech: {
      badge: 'Developer Friendly',
      title: 'Zero Configuration, Ready to Use',
      description: 'No code changes required. Simply enable the auto-proxy button to enjoy multi-provider failover, cost tracking, and more advanced features.',
      features: [
        {
          title: 'SQLite Data Persistence',
          description: 'All configurations stored in local SQLite database, secure and reliable with full schema migration support.',
        },
        {
          title: 'Rust Backend + React Frontend',
          description: 'Built on Tauri 2.x, combining Rust performance with React flexibility.',
        },
        {
          title: 'Smart Cost Tracking',
          description: 'Real-time monitoring of token consumption and costs, with per-provider analytics.',
        },
      ],
    },
    // Provider Card
    provider: {
      inUse: 'In Use',
      enable: 'Enable',
      used: 'Used',
      remaining: 'Remaining',
      minutesAgo: 'min ago',
    },
    // Demo Section
    demo: {
      title: 'Intuitive Interface',
      subtitle: 'What you see is what you get, zero learning curve',
      tabs: {
        provider: 'Provider Management',
        proxy: 'Proxy Server',
        stats: 'Usage Stats',
      },
      proxy: {
        localProxy: 'Local Proxy',
        proxyDescription: 'Control proxy service toggle, view status and port info',
        running: 'Running',
        stopped: 'Stopped',
        serviceAddress: 'Service Address',
        copy: 'Copy',
        addressNote: 'Stop proxy service before modifying address/port',
        currentProvider: 'Current Provider',
        waitingRequest: 'Waiting for first request...',
        proxyEnable: 'Proxy Enable',
        enableLogging: 'Enable Logging',
        loggingNote: 'Log all proxy requests for troubleshooting',
        failoverQueue: 'Failover Queue',
        normal: 'Normal',
        activeConnections: 'Active Connections',
        totalRequests: 'Total Requests',
        successRate: 'Success Rate',
        uptime: 'Uptime',
      },
      stats: {
        title: 'Usage Statistics',
        subtitle: 'View AI model usage and cost statistics',
        periods: {
          hours24: '24 Hours',
          days7: '7 Days',
          days30: '30 Days',
        },
        totalRequests: 'Total Requests',
        totalCost: 'Total Cost',
        totalTokens: 'Total Tokens',
        cacheTokens: 'Cache Tokens',
        trend: 'Usage Trend',
        past: 'Last',
        requests: 'Requests',
        cost: 'Cost',
        inputToken: 'Input Token',
        outputToken: 'Output Token',
        writeCache: 'Write Cache',
        hitCache: 'Hit Cache',
      },
    },
    // Pricing Section
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Open source and free, unlimited usage forever',
      recommended: 'Recommended',
      planName: 'Open Source Free',
      price: '$0',
      priceNote: 'Free forever, no hidden fees',
      downloadBtn: 'Download Now',
      enterprise: 'Need enterprise support?',
      contactUs: 'Contact Us',
      features: [
        'Unlimited Provider Configurations',
        'Local Proxy Server',
        'Automatic Failover',
        'Usage Statistics & Cost Tracking',
        'MCP/Skills/Prompts Management',
        'Cross-platform (macOS/Win/Linux)',
        'Community Support',
        'Open Source Access',
      ],
    },
    // FAQ Section
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: "Got questions? We've got answers",
      items: [
        {
          question: 'Is CC Switch free?',
          answer: 'Yes, CC Switch is completely free and open source. Released under MIT license, you can freely use, modify, and distribute it.',
        },
        {
          question: 'Which AI CLI tools are supported?',
          answer: 'Currently supports Claude Code, OpenAI Codex CLI, and Google Gemini CLI. We are actively developing support for more CLI tools.',
        },
        {
          question: 'Is my API Key secure?',
          answer: 'Absolutely. All API keys and configurations are stored in your local SQLite database and are never uploaded to any server.',
        },
        {
          question: 'Does the proxy server affect request speed?',
          answer: 'Negligibly. The proxy server is built with Rust for high performance, typically adding less than 1ms of latency.',
        },
        {
          question: 'How can I contribute?',
          answer: 'We welcome Issues and Pull Requests on GitHub. We have detailed contribution guidelines to help you get started.',
        },
        {
          question: 'How do I get help?',
          answer: 'You can report issues via GitHub Issues or join our Discord community to connect with other users.',
        },
      ],
    },
    // Testimonials Section
    testimonials: {
      title: 'What Users Say',
      subtitle: 'Real feedback from the developer community',
      items: [
        {
          content: "CC Switch completely transformed my AI development workflow. The multi-provider failover means I never worry about API rate limits, and cost tracking saved me 30% on expenses.",
          author: 'Wei Zhang',
          role: 'Full Stack Engineer @Tech Corp',
        },
        {
          content: "As a heavy Claude Code user, CC Switch's MCP configuration management is amazing. The visual interface makes complex configs simple and intuitive.",
          author: 'Ming Li',
          role: 'Independent Developer',
        },
        {
          content: "Open source, free, and this powerful - thanks to the author's generous contribution! The proxy server is stable and reliable, everyone on our team uses it.",
          author: 'Fang Wang',
          role: 'AI Product Manager @Startup',
        },
      ],
    },
    // CTA Section
    cta: {
      title: 'Ready to Experience',
      titleLine2: 'a More Efficient AI Workflow?',
      subtitle: 'Download CC Switch and start managing your AI CLI configuration the unified way',
      downloadBtn: 'Download Now',
      githubBtn: 'View GitHub',
      platforms: 'macOS · Windows · Linux',
    },
    // Footer
    footer: {
      tagline: 'Unified management for your AI CLI configuration',
      product: {
        title: 'Product',
        features: 'Features',
        download: 'Download',
        changelog: 'Changelog',
        roadmap: 'Roadmap',
      },
      resources: {
        title: 'Resources',
        docs: 'Documentation',
        changelog: 'Changelog',
        api: 'API Reference',
        examples: 'Examples',
      },
      community: {
        title: 'Community',
        github: 'GitHub',
        discord: 'Discord',
        contributing: 'Contributing',
        issues: 'Issue Tracker',
      },
      legal: {
        title: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        license: 'MIT License',
      },
      copyright: '© 2025 CC Switch. Open source under MIT license.',
      madeWith: 'Made with ❤️ by CC Switch Team',
    },
    // Changelog Page
    changelog: {
      title: 'Changelog',
      description: 'All notable changes to CC Switch will be documented here. Stay up to date with the latest features, improvements, and bug fixes.',
      loading: 'Loading changelog...',
      error: 'Failed to load',
      versions: 'Versions',
      inVersion: 'In v{version}',
      betaRelease: 'Beta Release',
    },
  },
  ja: {
    // Navbar
    nav: {
      home: 'ホーム',
      features: '機能',
      pricing: '価格',
      docs: 'ドキュメント',
      changelog: '更新履歴',
      download: '無料ダウンロード',
    },
    // Hero Section
    hero: {
      versionBadge: '正式リリース',
      title: '統一管理する',
      titleHighlight: 'AI CLI 設定',
      subtitle: '1つのアプリで Claude Code、Codex、Gemini CLI を管理。',
      subtitleLine2: '組み込みプロキシサーバーで、マルチプロバイダー自動フェイルオーバーをサポート。',
      downloadBtn: '無料ダウンロード',
      docsBtn: 'ドキュメントを見る',
      platforms: 'macOS 12+ · Windows 10+ · Linux 対応',
      stars: 'Stars',
      downloads: 'ダウンロード',
      supportedCli: '対応 CLI',
    },
    // Features Section
    features: {
      title: 'なぜ CC Switch を選ぶのか？',
      subtitle: '1つのアプリで全ての AI CLI 設定管理の課題を解決',
      items: [
        {
          title: '3大 CLI を統一管理',
          description: '1つのインターフェースで Claude Code、Codex、Gemini CLI の全設定を管理。ターミナルの切り替えが不要に。',
        },
        {
          title: '自動フェイルオーバー',
          description: '組み込みサーキットブレーカーで、プライマリプロバイダーが失敗した際に自動的にバックアップに切り替え、高可用性を実現。',
        },
        {
          title: 'コスト追跡',
          description: 'リアルタイムのトークン使用量とコスト統計。カスタム料金倍率で開発者の予算管理を正確にサポート。',
        },
        {
          title: 'セキュアなローカルストレージ',
          description: '全ての設定と API キーはローカル SQLite データベースに安全に保存。完全なスキーママイグレーションをサポート。',
        },
        {
          title: 'MCP/Skills 管理',
          description: 'MCP サーバー、Skills、Prompts の設定を視覚的に管理。手動での JSON 編集が不要に。',
        },
        {
          title: 'オープンソース＆無料',
          description: 'MIT ライセンスでオープンソース、完全無料。コミュニティ主導の開発、貢献歓迎。',
        },
      ],
    },
    // Tech Section
    tech: {
      badge: '開発者フレンドリー',
      title: 'ゼロ設定、すぐに使える',
      description: 'コード変更不要。自動プロキシボタンをオンにするだけで、マルチプロバイダーフェイルオーバー、コスト追跡などの高度な機能を利用できます。',
      features: [
        {
          title: 'SQLite データ永続化',
          description: 'すべての設定はローカル SQLite データベースに保存され、安全で信頼性が高く、完全なスキーママイグレーションをサポート。',
        },
        {
          title: 'Rust バックエンド + React フロントエンド',
          description: 'Tauri 2.x をベースに構築され、Rust のパフォーマンスと React の柔軟性を組み合わせ。',
        },
        {
          title: 'スマートコスト追跡',
          description: 'トークン消費とコストをリアルタイム監視し、プロバイダーごとの分析をサポート。',
        },
      ],
    },
    // Provider Card
    provider: {
      inUse: '使用中',
      enable: '有効化',
      used: '使用済み',
      remaining: '残り',
      minutesAgo: '分前',
    },
    // Demo Section
    demo: {
      title: '直感的なインターフェース',
      subtitle: '見たままを操作、学習コストゼロ',
      tabs: {
        provider: 'プロバイダー管理',
        proxy: 'プロキシサーバー',
        stats: '使用統計',
      },
      proxy: {
        localProxy: 'ローカルプロキシ',
        proxyDescription: 'プロキシサービスの切り替え、ステータスとポート情報の確認',
        running: '実行中',
        stopped: '停止中',
        serviceAddress: 'サービスアドレス',
        copy: 'コピー',
        addressNote: 'アドレス/ポートを変更する前にプロキシサービスを停止してください',
        currentProvider: '現在のプロバイダー',
        waitingRequest: '最初のリクエストを待機中...',
        proxyEnable: 'プロキシ有効化',
        enableLogging: 'ログ記録を有効化',
        loggingNote: 'トラブルシューティングのために全てのプロキシリクエストを記録',
        failoverQueue: 'フェイルオーバーキュー',
        normal: '正常',
        activeConnections: 'アクティブ接続',
        totalRequests: '総リクエスト数',
        successRate: '成功率',
        uptime: '稼働時間',
      },
      stats: {
        title: '使用統計',
        subtitle: 'AIモデルの使用状況とコスト統計を確認',
        periods: {
          hours24: '24時間',
          days7: '7日間',
          days30: '30日間',
        },
        totalRequests: '総リクエスト数',
        totalCost: '総コスト',
        totalTokens: '総トークン数',
        cacheTokens: 'キャッシュトークン',
        trend: '使用傾向',
        past: '過去',
        requests: 'リクエスト数',
        cost: 'コスト',
        inputToken: '入力トークン',
        outputToken: '出力トークン',
        writeCache: '書込キャッシュ',
        hitCache: 'ヒットキャッシュ',
      },
    },
    // Pricing Section
    pricing: {
      title: 'シンプルで透明な価格設定',
      subtitle: 'オープンソースで無料、無制限で永久使用可能',
      recommended: 'おすすめ',
      planName: 'オープンソース無料',
      price: '$0',
      priceNote: '永久無料、隠れた料金なし',
      downloadBtn: '今すぐダウンロード',
      enterprise: 'エンタープライズサポートが必要ですか？',
      contactUs: 'お問い合わせ',
      features: [
        '無制限のプロバイダー設定',
        'ローカルプロキシサーバー',
        '自動フェイルオーバー',
        '使用統計＆コスト追跡',
        'MCP/Skills/Prompts 管理',
        'クロスプラットフォーム対応 (macOS/Win/Linux)',
        'コミュニティサポート',
        'オープンソースへのアクセス',
      ],
    },
    // FAQ Section
    faq: {
      title: 'よくある質問',
      subtitle: 'ご質問にお答えします',
      items: [
        {
          question: 'CC Switch は無料ですか？',
          answer: 'はい、CC Switch は完全に無料でオープンソースです。MIT ライセンスで公開されており、自由に使用、修正、配布できます。',
        },
        {
          question: 'どの AI CLI ツールに対応していますか？',
          answer: '現在、Claude Code、OpenAI Codex CLI、Google Gemini CLI をサポートしています。より多くの CLI ツールへの対応を積極的に開発中です。',
        },
        {
          question: 'API キーは安全ですか？',
          answer: '絶対に安全です。全ての API キーと設定はローカルの SQLite データベースに保存され、サーバーにアップロードされることはありません。',
        },
        {
          question: 'プロキシサーバーはリクエスト速度に影響しますか？',
          answer: 'ほとんど影響しません。プロキシサーバーは Rust で構築されており、通常 1ms 未満の遅延しか追加されません。',
        },
        {
          question: 'どうすれば貢献できますか？',
          answer: 'GitHub での Issue や Pull Request を歓迎します。詳細な貢献ガイドラインがあり、すぐに始められます。',
        },
        {
          question: '問題が発生した場合、どのようにヘルプを得られますか？',
          answer: 'GitHub Issues で問題を報告するか、Discord コミュニティに参加して他のユーザーと交流できます。',
        },
      ],
    },
    // Testimonials Section
    testimonials: {
      title: 'ユーザーの声',
      subtitle: '開発者コミュニティからのリアルなフィードバック',
      items: [
        {
          content: 'CC Switch は私の AI 開発ワークフローを完全に変えました。マルチプロバイダーフェイルオーバーで API レート制限の心配がなくなり、コスト追跡で 30% の経費削減ができました。',
          author: '張偉',
          role: 'フルスタックエンジニア @テック企業',
        },
        {
          content: 'Claude Code のヘビーユーザーとして、CC Switch の MCP 設定管理は素晴らしいです。ビジュアルインターフェースで複雑な設定がシンプルで直感的になりました。',
          author: '李明',
          role: '独立開発者',
        },
        {
          content: 'オープンソースで無料なのにこれほど強力 - 作者の寛大な貢献に感謝！プロキシサーバーは安定して信頼性が高く、チーム全員が使っています。',
          author: '王芳',
          role: 'AI プロダクトマネージャー @スタートアップ',
        },
      ],
    },
    // CTA Section
    cta: {
      title: 'より効率的な',
      titleLine2: 'AI ワークフローを体験する準備はできましたか？',
      subtitle: 'CC Switch をダウンロードして、AI CLI 設定の統一管理を始めましょう',
      downloadBtn: '今すぐダウンロード',
      githubBtn: 'GitHub を見る',
      platforms: 'macOS · Windows · Linux',
    },
    // Footer
    footer: {
      tagline: 'AI CLI 設定を統一管理',
      product: {
        title: '製品',
        features: '機能',
        download: 'ダウンロード',
        changelog: '更新履歴',
        roadmap: 'ロードマップ',
      },
      resources: {
        title: 'リソース',
        docs: 'ドキュメント',
        changelog: '更新履歴',
        api: 'API リファレンス',
        examples: 'サンプル',
      },
      community: {
        title: 'コミュニティ',
        github: 'GitHub',
        discord: 'Discord',
        contributing: '貢献ガイド',
        issues: '問題報告',
      },
      legal: {
        title: '法的情報',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        license: 'MIT ライセンス',
      },
      copyright: '© 2025 CC Switch. MIT ライセンスでオープンソース。',
      madeWith: 'Made with ❤️ by CC Switch Team',
    },
    // Changelog Page
    changelog: {
      title: '更新履歴',
      description: 'CC Switch の全ての重要な変更がここに記録されます。最新の機能、改善、バグ修正をご確認ください。',
      loading: '更新履歴を読み込み中...',
      error: '読み込みに失敗しました',
      versions: 'バージョン一覧',
      inVersion: 'v{version} の内容',
      betaRelease: 'ベータリリース',
    },
  },
} as const;

export type TranslationKey = typeof translations['zh'];
