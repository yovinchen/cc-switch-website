// Documentation content organized by section and item

export const docsContent: Record<string, Record<string, string>> = {
  introduction: {
    default: `
# CC Switch 使用指南

CC Switch 是一款强大的桌面应用，帮助开发者统一管理多个 AI CLI 工具（Claude Code、Codex、Gemini CLI）的配置。一个应用，管理所有 AI 编程助手。

## 核心功能

- **统一管理**：一个界面管理 Claude Code、Codex 和 Gemini CLI 的所有配置
- **自动故障转移**：内置熔断器机制，当主 Provider 失败时自动切换到备用 Provider
- **成本追踪**：实时统计 Token 使用量和成本，精确控制预算
- **安全本地存储**：所有配置和 API Key 安全存储在本地 SQLite 数据库
- **MCP/Skills 管理**：可视化管理 MCP 服务器、Skills 和 Prompts 配置
- **跨平台支持**：支持 macOS、Windows 和 Linux

## 为什么选择 CC Switch？

现代开发者经常使用多个 AI 编程助手来完成不同的任务。CC Switch 消除了在这些工具之间切换的摩擦，让你专注于最重要的事情：编写优秀的代码。
`,
    'what-is-ccswitch': `
# 什么是 CC Switch？

CC Switch 是一个轻量级、开源的桌面应用，作为管理多个 AI CLI 工具的中央枢纽。

## 核心理念

无需在多个浏览器标签页或应用程序之间切换，CC Switch 提供：

1. **单窗口访问**：在一个窗口中访问所有 AI 助手配置
2. **托盘快捷操作**：通过系统托盘菜单快速切换 Provider
3. **安全存储**：API Key 加密存储在本地
4. **配置同步**：支持云盘同步配置目录

## 系统要求

| 平台 | 最低版本 |
|------|---------|
| macOS | 12+ |
| Windows | 10+ |
| Linux | Ubuntu 18.04+ |
`,
    'why-ccswitch': `
# 为什么选择 CC Switch？

## 痛点

随着 AI 编程助手成为必不可少的开发工具，开发者面临新的挑战：

- **工具碎片化**：不同的项目或任务可能需要不同的 AI Provider
- **配置繁琐**：手动编辑各种配置文件容易出错
- **API Key 管理**：跟踪多个 API Key 非常麻烦
- **成本不透明**：难以追踪各个 Provider 的使用成本

## 解决方案

CC Switch 通过以下功能解决这些痛点：

### 1. 统一界面

> "一个界面，掌控所有"

所有 AI Provider 都可以通过同一个简洁、一致的 UI 访问和管理。

### 2. 自动故障转移

当主 Provider 不可用时，自动切换到备用 Provider，保障服务高可用。

### 3. 安全可靠

您的 API Key：
- 使用行业标准加密存储
- 保存在本地机器上
- 永不传输到任何服务器

### 4. 开源免费

CC Switch 完全开源，您可以：
- 审计代码
- 贡献改进
- Fork 和自定义
`,
  },
  'getting-started': {
    default: `
# 快速开始

用最少步骤开始使用 CC Switch。

## 首日 5 步

1. **启动应用**：首次会自动导入本机现有 Claude/Codex/Gemini 配置
2. **添加供应商**：点击"添加供应商" → 选预设或自定义，填 API Key/端点，保存
3. **测速排序**：拖拽排序后点"测速"，挑一条可用线路
4. **启用配置**：在卡片点"启用"或托盘选择同名项
   - Claude/Codex 通常需重启终端/客户端
   - Gemini CLI 会自动重写 \`~/.gemini/.env\`
5. **托盘切换**：常用切换场景直接用托盘菜单

## 下载安装

### macOS

\`\`\`bash
# 使用 Homebrew
brew install cc-switch

# 或直接下载 .dmg 文件
# https://github.com/farion1231/cc-switch/releases
\`\`\`

### Windows

\`\`\`bash
# 使用 Chocolatey
choco install cc-switch

# 或下载 .exe 安装包
\`\`\`

### Linux

\`\`\`bash
# AppImage (通用)
wget https://github.com/farion1231/cc-switch/releases/latest/download/cc-switch.AppImage
chmod +x cc-switch.AppImage
./cc-switch.AppImage

# Arch Linux (AUR)
paru -S cc-switch-bin
\`\`\`
`,
    installation: `
# 安装指南

## macOS 安装

### 使用 Homebrew（推荐）

\`\`\`bash
brew install cc-switch
\`\`\`

### 直接下载

1. 从 [GitHub Releases](https://github.com/farion1231/cc-switch/releases) 下载最新的 \`.dmg\` 文件
2. 打开 \`.dmg\` 文件
3. 将 CC Switch 拖到 Applications 文件夹
4. 从 Applications 启动 CC Switch

## Windows 安装

### 使用 Chocolatey

\`\`\`bash
choco install cc-switch
\`\`\`

### 直接下载

1. 从 [GitHub Releases](https://github.com/farion1231/cc-switch/releases) 下载最新的 \`.exe\` 安装包
2. 运行安装程序
3. 按照安装向导完成安装
4. 从开始菜单启动 CC Switch

## Linux 安装

### AppImage（通用）

\`\`\`bash
wget https://github.com/farion1231/cc-switch/releases/latest/download/cc-switch.AppImage
chmod +x cc-switch.AppImage
./cc-switch.AppImage
\`\`\`

### Debian/Ubuntu

\`\`\`bash
sudo dpkg -i cc-switch_latest_amd64.deb
\`\`\`

### Arch Linux (AUR)

\`\`\`bash
paru -S cc-switch-bin
\`\`\`
`,
    'quick-start': `
# 快速入门

5 分钟掌握 CC Switch 核心操作。

## 步骤 1：启动 CC Switch

安装后启动 CC Switch，首次会自动导入本机现有配置。

## 步骤 2：添加供应商

1. 点击主界面"添加供应商"
2. 选择预设或自定义
3. 填写 API Key 和端点
4. 点击"保存"

## 步骤 3：测速并启用

1. 拖拽卡片排序
2. 点击"测速"查看延迟
3. 在卡片点"启用"或通过托盘菜单切换

## 步骤 4：验证生效

- **Claude/Codex**：重启终端或客户端
- **Gemini CLI**：检查 \`~/.gemini/.env\` 是否已更新

## 完成！

你现在已经掌握了基础操作。继续探索文档了解更多高级功能。
`,
    'first-project': `
# 功能操作详解

## 供应商管理

- **入口**：主界面"添加供应商"
- **新建/复制**：选预设或复制已有条目再改；支持备注与模型字段
- **启用**：卡片"启用"或托盘点击；坏线路可暂不启用
- **测速**：卡片"测速"查看延迟

## MCP 管理

- **入口**：右上角"MCP"
- **添加**：模板或自定义（stdio/http/sse）
- **控制**：按应用开关，分别同步到 Claude/Codex/Gemini 的 live 配置

## Skills 管理

- **入口**：右上角"Skills"
- **扫描**：内置预设仓库，支持自定义仓库/子目录
- **安装/卸载**：一键操作，技能存放 \`~/.claude/skills/\`

## Prompts 管理

- **入口**：右上角"Prompts"
- **创建/编辑**：用 Markdown 写系统提示词，可多条预设
- **激活**：点击"激活"后同步到对应配置文件
  - Claude: \`~/.claude/CLAUDE.md\`
  - Codex: \`~/.codex/AGENTS.md\`
  - Gemini: \`~/.gemini/GEMINI.md\`
  - 切换前会自动备份当前内容
`,
  },
  configuration: {
    default: `
# 配置管理

CC Switch 提供灵活的配置选项。

## 配置目录

CC Switch 的配置存储位置：

- **macOS**: \`~/.cc-switch/\`
- **Windows**: \`%APPDATA%\\cc-switch\\\`
- **Linux**: \`~/.cc-switch/\`

## 数据备份与迁移

设置 → "高级" → "数据管理"：
- 导出/导入 SQL 备份（仅支持本应用导出文件）
- 自动在 \`~/.cc-switch/backups/\` 保留最近 10 个轮换备份

## 配置目录与云同步

设置 → "高级" → "配置目录"：
- 为 Claude/Codex/Gemini 或 CC Switch 本身选择存储路径
- 可指向云盘（iCloud、OneDrive、Google Drive 等）
- 修改后需要重启生效
`,
    providers: `
# 供应商配置

CC Switch 支持多种 AI 供应商。

## 支持的供应商

| 供应商 | 支持状态 |
|--------|----------|
| Anthropic (Claude) | ✅ 完全支持 |
| OpenAI (GPT) | ✅ 完全支持 |
| Google (Gemini) | ✅ 完全支持 |
| OpenRouter | ✅ 完全支持 |
| 自定义端点 | ✅ 完全支持 |

## 添加供应商

1. 点击主界面"添加供应商"
2. 选择预设或自定义
3. 填写 API Key、端点等信息
4. 可选：添加备注和指定模型
5. 点击"保存"

## 供应商操作

### 启用/禁用

- 卡片右侧点击"启用"按钮
- 或通过系统托盘菜单选择

### 测速

点击卡片上的"测速"按钮查看延迟。

### 排序

拖拽卡片调整顺序，故障转移时按此顺序切换。
`,
    'api-keys': `
# API Key 管理

安全管理您的 API Key。

## 安全保障

您的 API Key：
- **加密存储**：使用行业标准加密
- **本地保存**：仅存储在您的机器上
- **不会传输**：永不发送到外部服务器

## 获取 API Key

### Anthropic (Claude)

1. 访问 [console.anthropic.com](https://console.anthropic.com)
2. 进入 API Keys 页面
3. 创建新的 API Key
4. 复制并添加到 CC Switch

### OpenAI (GPT)

1. 访问 [platform.openai.com](https://platform.openai.com)
2. 进入 API Keys 部分
3. 生成新的 Key
4. 复制并添加到 CC Switch

### Google (Gemini)

1. 访问 [makersuite.google.com](https://makersuite.google.com)
2. 获取 API Key
3. 复制并添加到 CC Switch

## Key 轮换

建议定期轮换 API Key：

1. 从供应商处生成新 Key
2. 在 CC Switch 中更新
3. 验证新 Key 可用
4. 从供应商处删除旧 Key
`,
    preferences: `
# 偏好设置

自定义 CC Switch 以匹配您的工作流程。

## 外观设置

### 主题

选择：
- **浅色**：明亮清爽的界面
- **深色**：适合长时间编程的护眼模式
- **跟随系统**：自动跟随操作系统偏好

## 代理与故障转移

### 代理服务器

- **入口**：右上角"Proxy"
- **启动**：点"启动代理"（默认 127.0.0.1:15721）
- **接管**：为 Claude/Codex/Gemini 分别开关，让流量走本地代理

### 故障转移

- 同一应用准备多个供应商
- 故障时自动切到下一个
- 按卡片顺序进行切换

### 停止代理

点"停止代理"，原始配置自动恢复。
`,
  },
  usage: {
    default: `
# Usage Guide

Master CC Switch with these tips and techniques.

## Basic Operations

### Starting a Conversation

1. Press \`⌘ + N\` for a new conversation
2. Select your AI provider
3. Type your message
4. Press Enter to send

### Switching Providers

Use number shortcuts to switch:
- \`⌘ + 1\`: First provider (usually Claude)
- \`⌘ + 2\`: Second provider (usually GPT)
- \`⌘ + 3\`: Third provider (usually Gemini)

### Managing Conversations

- **Save**: \`⌘ + S\`
- **Export**: \`⌘ + Shift + E\`
- **Delete**: \`⌘ + Backspace\`
`,
    'basic-usage': `
# Basic Usage

Learn the fundamentals of CC Switch.

## The Main Interface

\`\`\`
┌───────────────────────────────────────────────┐
│ [Provider Tabs]  [Search]  [Settings]         │
├───────────────────────────────────────────────┤
│                                               │
│  Conversation History                         │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ You: How do I...                        │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ AI: Here's how...                       │  │
│  └─────────────────────────────────────────┘  │
│                                               │
├───────────────────────────────────────────────┤
│ [Input Field]                        [Send]   │
└───────────────────────────────────────────────┘
\`\`\`

## Sending Messages

1. Type your message in the input field
2. Press **Enter** to send
3. Press **Shift + Enter** for new line

## Code Blocks

When the AI returns code:
- **Copy**: Click the copy button
- **Insert**: Insert directly into your editor (if connected)
- **Run**: Execute in the integrated terminal

## Conversation Management

### Save Conversation

\`\`\`bash
# Automatically saved to:
~/.cc-switch/conversations/
\`\`\`

### Export Options

- **Markdown**: Great for documentation
- **JSON**: For programmatic access
- **PDF**: For sharing
`,
    shortcuts: `
# Keyboard Shortcuts

CC Switch is designed for keyboard-first navigation.

## Global Shortcuts

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Show/Hide App | ⌘ + Space | Ctrl + Space |
| New Conversation | ⌘ + N | Ctrl + N |
| Close Conversation | ⌘ + W | Ctrl + W |
| Settings | ⌘ + , | Ctrl + , |

## Navigation

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Search | ⌘ + K | Ctrl + K |
| Previous Conversation | ⌘ + [ | Ctrl + [ |
| Next Conversation | ⌘ + ] | Ctrl + ] |

## Provider Switching

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Provider 1 (Claude) | ⌘ + 1 | Ctrl + 1 |
| Provider 2 (GPT) | ⌘ + 2 | Ctrl + 2 |
| Provider 3 (Gemini) | ⌘ + 3 | Ctrl + 3 |
| Provider 4+ | ⌘ + 4-9 | Ctrl + 4-9 |

## Editing

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Copy Code Block | ⌘ + Shift + C | Ctrl + Shift + C |
| Clear Input | ⌘ + L | Ctrl + L |
| Regenerate | ⌘ + R | Ctrl + R |

## Custom Shortcuts

You can customize any shortcut in Settings > Keyboard.
`,
    advanced: `
# Advanced Features

Unlock the full potential of CC Switch.

## Context Sharing

Share context between different AI providers:

1. Start a conversation with Claude
2. Get a response
3. Switch to GPT (\`⌘ + 2\`)
4. The context is preserved!

## Templates

Create reusable templates:

\`\`\`json
{
  "templates": [
    {
      "name": "Code Review",
      "prompt": "Review this code for bugs and improvements:\\n\\n{{code}}"
    },
    {
      "name": "Explain",
      "prompt": "Explain this code as if I'm a junior developer:\\n\\n{{code}}"
    }
  ]
}
\`\`\`

## API Integration

Use CC Switch programmatically:

\`\`\`bash
# Send a message via CLI
cc-switch send "Explain async/await in JavaScript"

# Get response as JSON
cc-switch send "..." --format json
\`\`\`

## Plugins

Extend CC Switch with plugins:

\`\`\`bash
# Install a plugin
cc-switch plugin install syntax-highlighter

# List installed plugins
cc-switch plugin list
\`\`\`

## Automation

Create automated workflows:

\`\`\`javascript
// workflow.js
const ccswitch = require('cc-switch');

async function codeReview(file) {
  const code = await fs.readFile(file);
  
  // Get review from Claude
  const review = await ccswitch.send('claude', \`Review: \${code}\`);
  
  // Get fixes from GPT
  const fixes = await ccswitch.send('gpt', \`Fix issues: \${review}\`);
  
  return fixes;
}
\`\`\`
`,
  },
  integrations: {
    default: `
# Integrations

Connect CC Switch with your favorite tools.

## IDE Integrations

- **Cursor**: First-class support
- **VS Code**: Extension available
- **JetBrains**: Plugin available
- **Vim/Neovim**: CLI integration

## Other Integrations

- **Git**: Commit message generation
- **Terminal**: Direct CLI access
- **Raycast**: Quick launcher extension
- **Alfred**: Workflow available
`,
    cursor: `
# Cursor IDE Integration

CC Switch integrates seamlessly with Cursor IDE.

## Installation

1. Open Cursor
2. Go to Extensions
3. Search for "CC Switch"
4. Install the extension

## Usage

### Quick Switch

Use \`⌘ + Shift + A\` to open CC Switch sidebar in Cursor.

### Code Actions

Right-click on any code to:
- Explain with AI
- Refactor with AI
- Generate tests
- Add documentation

### Inline Completion

CC Switch provides inline completions:

\`\`\`javascript
// Type your code, and CC Switch suggests completions
function calculateTotal(items) {
  // CC Switch: return items.reduce((sum, item) => sum + item.price, 0);
}
\`\`\`

## Configuration

In Cursor settings:

\`\`\`json
{
  "ccswitch.defaultProvider": "claude",
  "ccswitch.inlineCompletion": true,
  "ccswitch.autoContext": true
}
\`\`\`
`,
    vscode: `
# VS Code Integration

Use CC Switch within Visual Studio Code.

## Installation

\`\`\`bash
# Via command palette
Ctrl+P > ext install cc-switch.vscode

# Or search in Extensions marketplace
\`\`\`

## Features

### Sidebar Panel

Access CC Switch conversations in the sidebar:

1. Click the CC Switch icon in the activity bar
2. Start or continue conversations
3. Insert code directly into your editor

### Code Lens

CC Switch adds code lens above functions:

\`\`\`javascript
// Explain | Refactor | Test | Document
function processData(input) {
  // ...
}
\`\`\`

### Command Palette

Available commands:

- \`CC Switch: New Conversation\`
- \`CC Switch: Switch Provider\`
- \`CC Switch: Explain Selection\`
- \`CC Switch: Refactor Selection\`

## Keybindings

Add to your \`keybindings.json\`:

\`\`\`json
[
  {
    "key": "ctrl+shift+a",
    "command": "ccswitch.openSidebar"
  },
  {
    "key": "ctrl+shift+e",
    "command": "ccswitch.explainSelection"
  }
]
\`\`\`
`,
    'other-ides': `
# Other IDE Integrations

CC Switch works with many development environments.

## JetBrains IDEs

### Installation

1. Open your JetBrains IDE (IntelliJ, PyCharm, WebStorm, etc.)
2. Go to Settings > Plugins
3. Search for "CC Switch"
4. Install and restart

### Usage

- **Tool Window**: View > Tool Windows > CC Switch
- **Shortcut**: \`Alt + A\` to toggle

## Vim / Neovim

### Plugin Installation

\`\`\`lua
-- Using lazy.nvim
{
  'cc-switch/ccswitch.nvim',
  config = function()
    require('ccswitch').setup({
      default_provider = 'claude',
    })
  end
}
\`\`\`

### Commands

\`\`\`vim
:CCSwitchChat        " Open chat window
:CCSwitchExplain     " Explain visual selection
:CCSwitchProvider    " Switch provider
\`\`\`

## Sublime Text

Install via Package Control:

1. \`Cmd + Shift + P\`
2. "Package Control: Install Package"
3. Search "CC Switch"

## Terminal (CLI)

Works in any terminal:

\`\`\`bash
# Start interactive mode
cc-switch chat

# Single message
cc-switch send "Explain recursion"

# Pipe input
cat code.py | cc-switch explain
\`\`\`
`,
  },
  faq: {
    default: `
# Frequently Asked Questions

## General

### Is CC Switch free?

Yes! CC Switch is completely free and open source. However, you'll need API keys from AI providers (Anthropic, OpenAI, etc.) which may have their own pricing.

### What platforms are supported?

CC Switch runs on:
- macOS 10.15+
- Windows 10+
- Linux (Ubuntu 18.04+, Fedora, Arch)

### Is my data secure?

Absolutely. CC Switch:
- Stores API keys encrypted locally
- Never transmits data to our servers
- All communication goes directly to AI providers

## API Keys

### Where do I get API keys?

- **Claude**: [console.anthropic.com](https://console.anthropic.com)
- **GPT**: [platform.openai.com](https://platform.openai.com)
- **Gemini**: [makersuite.google.com](https://makersuite.google.com)

### Are my API keys shared?

No. API keys are stored locally on your machine and encrypted. They're never sent to CC Switch servers.

## Usage

### How do I switch between providers?

Use keyboard shortcuts:
- \`⌘/Ctrl + 1\` for Claude
- \`⌘/Ctrl + 2\` for GPT
- \`⌘/Ctrl + 3\` for Gemini

### Can I use local LLMs?

Yes! CC Switch supports Ollama and LM Studio. See the [Local LLMs guide](/docs/configuration/local-llms).

### How do I export conversations?

1. Open the conversation
2. Press \`⌘/Ctrl + Shift + E\`
3. Choose format (Markdown, JSON, PDF)

## Troubleshooting

### CC Switch won't start

Try these steps:
1. Restart your computer
2. Reinstall CC Switch
3. Check for conflicting applications

### API errors

Common fixes:
1. Verify your API key is correct
2. Check your API provider's status page
3. Ensure you have sufficient credits

## Contributing

### How can I contribute?

We welcome contributions! See our [Contributing Guide](https://github.com/farion1231/cc-switch/blob/main/CONTRIBUTING.md).

### How do I report bugs?

Open an issue on [GitHub](https://github.com/farion1231/cc-switch/issues).
`,
  },
};

export function getDocContent(sectionId: string, itemId?: string): string {
  const section = docsContent[sectionId];
  if (!section) {
    return `# Page Not Found\n\nThe requested documentation page was not found.`;
  }
  
  if (itemId && section[itemId]) {
    return section[itemId];
  }
  
  return section.default || `# ${sectionId}\n\nContent coming soon...`;
}
