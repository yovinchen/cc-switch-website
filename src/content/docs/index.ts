// Documentation content organized by section and item

export const docsContent: Record<string, Record<string, string>> = {
  introduction: {
    default: `
# Introduction to CC Switch

CC Switch is a powerful desktop application designed to help developers seamlessly switch between different AI coding assistants. Whether you're using Claude, GPT, Gemini, or other AI providers, CC Switch provides a unified interface to manage them all.

## Key Features

- **Unified Interface**: One app to manage all your AI coding assistants
- **Quick Switching**: Switch between providers with a single keyboard shortcut
- **API Key Management**: Securely store and manage your API keys
- **Cross-Platform**: Available for macOS, Windows, and Linux

## Why CC Switch?

Modern developers often use multiple AI coding assistants for different tasks. Each has its strengths:

- **Claude**: Excellent for complex reasoning and long-form code generation
- **GPT-4**: Great for general-purpose coding tasks
- **Gemini**: Strong at understanding context and documentation

CC Switch eliminates the friction of switching between these tools, letting you focus on what matters most: writing great code.
`,
    'what-is-ccswitch': `
# What is CC Switch?

CC Switch is a lightweight, open-source desktop application that serves as a central hub for managing multiple AI coding assistants.

## Core Concept

Instead of having multiple browser tabs or applications open for different AI providers, CC Switch provides:

1. **Single Window Access**: Access all your AI assistants from one window
2. **Keyboard-First Design**: Navigate and switch using intuitive shortcuts
3. **Context Preservation**: Keep your conversation context when switching
4. **Secure Storage**: Your API keys are encrypted and stored locally

## How It Works

\`\`\`
┌─────────────────────────────────────┐
│           CC Switch                 │
├─────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │  Claude │ │   GPT   │ │ Gemini │ │
│  └────┬────┘ └────┬────┘ └───┬────┘ │
│       │          │          │       │
│       └──────────┼──────────┘       │
│                  │                  │
│         ┌───────────────┐           │
│         │   Your Code   │           │
│         └───────────────┘           │
└─────────────────────────────────────┘
\`\`\`

## System Requirements

| Platform | Minimum Version |
|----------|-----------------|
| macOS    | 10.15+          |
| Windows  | Windows 10+     |
| Linux    | Ubuntu 18.04+   |
`,
    'why-ccswitch': `
# Why Choose CC Switch?

## The Problem

As AI coding assistants become essential development tools, developers face new challenges:

- **Tool Fragmentation**: Different projects or tasks may benefit from different AI providers
- **Context Switching**: Opening multiple apps or browser tabs is distracting
- **API Key Management**: Keeping track of multiple API keys is cumbersome
- **Inconsistent Experience**: Each provider has a different interface

## The Solution

CC Switch addresses these pain points with:

### 1. Unified Interface

> "One interface to rule them all"

All AI providers are accessible through the same clean, consistent UI.

### 2. Seamless Switching

Switch between providers using simple keyboard shortcuts:

- \`⌘ + 1\`: Claude
- \`⌘ + 2\`: GPT
- \`⌘ + 3\`: Gemini
- \`⌘ + 4\`: And more...

### 3. Secure by Default

Your API keys are:
- Encrypted using industry-standard AES-256
- Stored locally on your machine
- Never transmitted to our servers

### 4. Open Source

CC Switch is completely open source. You can:
- Audit the code
- Contribute improvements
- Fork and customize
`,
  },
  'getting-started': {
    default: `
# Getting Started

Get up and running with CC Switch in just a few minutes.

## Quick Install

### macOS (Homebrew)

\`\`\`bash
brew install cc-switch
\`\`\`

### Windows (Chocolatey)

\`\`\`bash
choco install cc-switch
\`\`\`

### Linux (AppImage)

\`\`\`bash
# Download from GitHub releases
wget https://github.com/farion1231/cc-switch/releases/latest/download/cc-switch.AppImage
chmod +x cc-switch.AppImage
./cc-switch.AppImage
\`\`\`

## Next Steps

1. [Configure your API keys](/docs/configuration/api-keys)
2. [Set up your preferred providers](/docs/configuration/providers)
3. [Learn the keyboard shortcuts](/docs/usage/shortcuts)
`,
    installation: `
# Installation Guide

## macOS Installation

### Using Homebrew (Recommended)

\`\`\`bash
brew install cc-switch
\`\`\`

### Direct Download

1. Download the latest \`.dmg\` file from [GitHub Releases](https://github.com/farion1231/cc-switch/releases)
2. Open the \`.dmg\` file
3. Drag CC Switch to your Applications folder
4. Launch CC Switch from Applications

## Windows Installation

### Using Chocolatey

\`\`\`bash
choco install cc-switch
\`\`\`

### Using Winget

\`\`\`bash
winget install cc-switch
\`\`\`

### Direct Download

1. Download the latest \`.exe\` installer from [GitHub Releases](https://github.com/farion1231/cc-switch/releases)
2. Run the installer
3. Follow the installation wizard
4. Launch CC Switch from the Start menu

## Linux Installation

### AppImage (Universal)

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
yay -S cc-switch
\`\`\`
`,
    'quick-start': `
# Quick Start Guide

Get productive with CC Switch in 5 minutes.

## Step 1: Launch CC Switch

After installation, launch CC Switch. You'll see the welcome screen.

## Step 2: Add Your First API Key

1. Open Settings (\`⌘ + ,\` on macOS, \`Ctrl + ,\` on Windows/Linux)
2. Navigate to "API Keys"
3. Click "Add API Key"
4. Select your provider (e.g., Claude)
5. Paste your API key
6. Click "Save"

## Step 3: Start a Conversation

1. Press \`⌘ + N\` to start a new conversation
2. Select your AI provider from the dropdown
3. Type your message and press Enter

## Step 4: Learn the Shortcuts

Essential shortcuts to remember:

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| New conversation | ⌘ + N | Ctrl + N |
| Settings | ⌘ + , | Ctrl + , |
| Switch provider | ⌘ + 1-9 | Ctrl + 1-9 |
| Search | ⌘ + K | Ctrl + K |

## You're Ready!

You now know the basics. Explore the rest of the documentation to discover advanced features.
`,
    'first-project': `
# Your First Project with CC Switch

Let's build something practical using CC Switch.

## Project: Create a REST API

We'll use multiple AI providers to build a simple REST API.

### Step 1: Planning with Claude

Claude excels at architecture and planning. Let's start there.

\`\`\`
You: I want to create a REST API for a todo application.
     What technologies would you recommend?

Claude: For a todo REST API, I'd recommend:
        - Node.js with Express or Fastify
        - PostgreSQL for the database
        - Prisma as the ORM
        ...
\`\`\`

### Step 2: Implementation with GPT-4

Switch to GPT-4 (\`⌘ + 2\`) for implementation details.

\`\`\`
You: Generate the Express route handlers for a todo API
     with CRUD operations.

GPT-4: Here's the implementation:
       [code output]
\`\`\`

### Step 3: Documentation with Gemini

Switch to Gemini (\`⌘ + 3\`) for documentation.

\`\`\`
You: Generate OpenAPI documentation for these endpoints.

Gemini: Here's your OpenAPI specification:
        [documentation output]
\`\`\`

## The Power of Switching

By using multiple AI providers, you leverage:
- Claude's planning capabilities
- GPT-4's code generation
- Gemini's documentation skills

CC Switch makes this workflow seamless.
`,
  },
  configuration: {
    default: `
# Configuration

CC Switch is highly configurable to match your workflow.

## Configuration File

CC Switch stores its configuration in:

- **macOS**: \`~/.config/cc-switch/config.json\`
- **Windows**: \`%APPDATA%\\cc-switch\\config.json\`
- **Linux**: \`~/.config/cc-switch/config.json\`

## Configuration Options

\`\`\`json
{
  "theme": "dark",
  "defaultProvider": "claude",
  "shortcuts": {
    "claude": "CommandOrControl+1",
    "gpt": "CommandOrControl+2",
    "gemini": "CommandOrControl+3"
  },
  "window": {
    "width": 1200,
    "height": 800,
    "alwaysOnTop": false
  }
}
\`\`\`
`,
    providers: `
# AI Providers Configuration

CC Switch supports a wide range of AI providers.

## Supported Providers

| Provider | Models | Status |
|----------|--------|--------|
| Anthropic (Claude) | Claude 3.5, Claude 3 | ✅ Full Support |
| OpenAI (GPT) | GPT-4, GPT-4 Turbo | ✅ Full Support |
| Google (Gemini) | Gemini Pro, Gemini Ultra | ✅ Full Support |
| OpenRouter | Various | ✅ Full Support |
| Local LLMs | Ollama, LM Studio | 🔄 Beta |

## Adding a Provider

1. Open Settings (\`⌘ + ,\`)
2. Go to "Providers"
3. Click "Add Provider"
4. Select the provider type
5. Configure the settings

## Provider-Specific Settings

### Claude

\`\`\`json
{
  "provider": "claude",
  "model": "claude-3-5-sonnet-20241022",
  "maxTokens": 4096,
  "temperature": 0.7
}
\`\`\`

### GPT-4

\`\`\`json
{
  "provider": "openai",
  "model": "gpt-4-turbo-preview",
  "maxTokens": 4096,
  "temperature": 0.7
}
\`\`\`

### Gemini

\`\`\`json
{
  "provider": "gemini",
  "model": "gemini-pro",
  "maxOutputTokens": 2048,
  "temperature": 0.7
}
\`\`\`
`,
    'api-keys': `
# API Keys Management

Securely manage your API keys in CC Switch.

## Security First

Your API keys are:
- **Encrypted** using AES-256 encryption
- **Stored locally** on your machine only
- **Never transmitted** to external servers

## Adding API Keys

### Via Settings UI

1. Open Settings (\`⌘ + ,\`)
2. Navigate to "API Keys"
3. Click "Add Key"
4. Select provider and paste your key

### Via Command Line

\`\`\`bash
cc-switch config set-key claude YOUR_API_KEY
\`\`\`

## Getting API Keys

### Anthropic (Claude)

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Navigate to API Keys
3. Create a new API key
4. Copy and add to CC Switch

### OpenAI (GPT)

1. Visit [platform.openai.com](https://platform.openai.com)
2. Go to API Keys section
3. Generate a new key
4. Copy and add to CC Switch

### Google (Gemini)

1. Visit [makersuite.google.com](https://makersuite.google.com)
2. Get your API key
3. Copy and add to CC Switch

## Key Rotation

It's good practice to rotate your API keys periodically:

1. Generate a new key from the provider
2. Add the new key to CC Switch
3. Verify it works
4. Delete the old key from the provider
`,
    preferences: `
# Preferences

Customize CC Switch to match your workflow.

## Appearance

### Theme

Choose between:
- **Light**: Clean, bright interface
- **Dark**: Easy on the eyes for long coding sessions
- **System**: Follows your OS preference

### Font Size

Adjust the editor and chat font sizes:

\`\`\`json
{
  "appearance": {
    "fontSize": 14,
    "fontFamily": "JetBrains Mono",
    "lineHeight": 1.6
  }
}
\`\`\`

## Behavior

### Window Settings

\`\`\`json
{
  "window": {
    "alwaysOnTop": false,
    "startMinimized": false,
    "minimizeToTray": true
  }
}
\`\`\`

### Conversation Settings

\`\`\`json
{
  "conversation": {
    "autosave": true,
    "saveLocation": "~/Documents/CC-Switch",
    "maxHistory": 100
  }
}
\`\`\`

## Keyboard Shortcuts

Customize any keyboard shortcut:

\`\`\`json
{
  "shortcuts": {
    "newConversation": "CommandOrControl+N",
    "settings": "CommandOrControl+,",
    "search": "CommandOrControl+K",
    "switchProvider1": "CommandOrControl+1",
    "switchProvider2": "CommandOrControl+2"
  }
}
\`\`\`
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
