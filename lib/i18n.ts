import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'zh-CN',
  languages: ['zh-CN', 'zh-Hant', 'en'],
  hideLocale: 'default-locale',
  fallbackLanguage: 'zh-CN',
});

export function localizedPath(locale: string, href: string): string {
  const clean = href.startsWith('/') ? href : `/${href}`;

  if (locale === i18n.defaultLanguage) {
    return clean;
  }

  return `/${locale}${clean}`;
}

export function languageAlternates(path: string): Record<string, string> {
  return {
    'zh-CN': localizedPath('zh-CN', path),
    'zh-Hant': localizedPath('zh-Hant', path),
    en: localizedPath('en', path),
    'x-default': localizedPath('zh-CN', path),
  };
}

/** 单篇文档的公开 Markdown 入口，例：`/docs/apply.md`。 */
export function llmMarkdownPath(locale: string, slug = 'apply'): string {
  return `${localizedPath(locale, `/docs/${slug}`)}.md`;
}
