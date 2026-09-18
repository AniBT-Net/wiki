import { NavTitle } from '@/components/brand-logo';
import { i18n, localizedPath } from '@/lib/i18n';
import { zhCN } from '@fumadocs/language/zh-cn';
import { zhTW } from '@fumadocs/language/zh-tw';
import { openapiTranslations } from 'fumadocs-openapi/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .extend(openapiTranslations())
  .preset('zh-CN', zhCN())
  .preset('zh-Hant', zhTW())
  .add({
    en: {
      displayName: 'English',
    },
    'zh-CN': {
      displayName: '简体中文',
      'Search(search trigger)': '搜索文档',
      'Search(search dialog)': '搜索文档',
      'Prop(type table)': '字段',
      'Back to Home(404 page)': '返回首页',
      'Page Not Found(404 page)': '页面不存在',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
        '你访问的页面可能已被移动、重命名或暂时不可用。',
    },
    'zh-Hant': {
      displayName: '繁體中文',
      'Search(search trigger)': '搜尋文件',
      'Search(search dialog)': '搜尋文件',
      'Prop(type table)': '欄位',
      'Back to Home(404 page)': '返回首頁',
      'Page Not Found(404 page)': '頁面不存在',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
        '你訪問的頁面可能已被移動、重新命名或暫時無法使用。',
    },
  });

const labels = {
  'zh-CN': {
    docs: '文档',
    api: '公开 API',
    site: '主站',
  },
  'zh-Hant': {
    docs: '文件',
    api: '公開 API',
    site: '主站',
  },
  en: {
    docs: 'Docs',
    api: 'Open API',
    site: 'AniBT',
  },
} as const;

export function baseOptions(locale: string): BaseLayoutProps {
  const t =
    labels[locale as keyof typeof labels] ?? labels['zh-CN'];

  return {
    i18n: true,
    githubUrl: 'https://github.com/AniBT-Net/wiki',
    nav: {
      title: <NavTitle />,
      url: localizedPath(locale, '/'),
      transparentMode: 'top',
    },
    links: [
      {
        text: t.docs,
        url: localizedPath(locale, '/docs'),
        active: 'nested-url',
      },
      {
        text: t.api,
        url: localizedPath(locale, '/docs/open-api'),
        active: 'nested-url',
      },
      {
        text: t.site,
        url: 'https://anibt.net',
        external: true,
      },
    ],
  };
}
