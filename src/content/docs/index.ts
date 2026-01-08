// Documentation file path mapping
const docPathMap: Record<string, Record<string, string>> = {
  'getting-started': {
    default: '/docs/1-getting-started/1.1-introduction.md',
    introduction: '/docs/1-getting-started/1.1-introduction.md',
    installation: '/docs/1-getting-started/1.2-installation.md',
    interface: '/docs/1-getting-started/1.3-interface.md',
    quickstart: '/docs/1-getting-started/1.4-quickstart.md',
    settings: '/docs/1-getting-started/1.5-settings.md',
  },
  providers: {
    default: '/docs/2-providers/2.1-add.md',
    add: '/docs/2-providers/2.1-add.md',
    switch: '/docs/2-providers/2.2-switch.md',
    edit: '/docs/2-providers/2.3-edit.md',
    'sort-duplicate': '/docs/2-providers/2.4-sort-duplicate.md',
    'usage-query': '/docs/2-providers/2.5-usage-query.md',
  },
  extensions: {
    default: '/docs/3-extensions/3.1-mcp.md',
    mcp: '/docs/3-extensions/3.1-mcp.md',
    prompts: '/docs/3-extensions/3.2-prompts.md',
    skills: '/docs/3-extensions/3.3-skills.md',
  },
  proxy: {
    default: '/docs/4-proxy/4.1-service.md',
    service: '/docs/4-proxy/4.1-service.md',
    takeover: '/docs/4-proxy/4.2-takeover.md',
    failover: '/docs/4-proxy/4.3-failover.md',
    usage: '/docs/4-proxy/4.4-usage.md',
    'model-test': '/docs/4-proxy/4.5-model-test.md',
  },
  faq: {
    default: '/docs/5-faq/5.2-questions.md',
    'config-files': '/docs/5-faq/5.1-config-files.md',
    questions: '/docs/5-faq/5.2-questions.md',
    deeplink: '/docs/5-faq/5.3-deeplink.md',
    'env-conflict': '/docs/5-faq/5.4-env-conflict.md',
  },
};

// Cache for loaded documents
const docCache: Record<string, string> = {};

export function getDocFilePath(sectionId: string, itemId?: string): string | null {
  const section = docPathMap[sectionId];
  if (!section) return null;

  if (itemId && section[itemId]) {
    return section[itemId];
  }

  return section.default || null;
}

export async function fetchDocContent(sectionId: string, itemId?: string): Promise<string> {
  const filePath = getDocFilePath(sectionId, itemId);

  if (!filePath) {
    return `# 页面未找到\n\n请求的文档页面不存在。`;
  }

  // Check cache
  const cacheKey = `${sectionId}-${itemId || 'default'}`;
  if (docCache[cacheKey]) {
    return docCache[cacheKey];
  }

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text();

    // Process image paths - convert relative paths to absolute
    const processedContent = content.replace(
      /!\[([^\]]*)\]\(\.\.\/assets\/([^)]+)\)/g,
      '![$1](/docs/assets/$2)'
    );

    // Cache the result
    docCache[cacheKey] = processedContent;

    return processedContent;
  } catch (error) {
    console.error('Failed to load document:', error);
    return `# 加载失败\n\n无法加载文档内容，请稍后重试。`;
  }
}

// Synchronous version for backward compatibility (returns placeholder)
export function getDocContent(sectionId: string, itemId?: string): string {
  const cacheKey = `${sectionId}-${itemId || 'default'}`;
  if (docCache[cacheKey]) {
    return docCache[cacheKey];
  }
  return '# 加载中...\n\n正在加载文档内容...';
}
