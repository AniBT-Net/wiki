import { i18n, localizedPath } from '@/lib/i18n';
import { zhCN } from '@fumadocs/language/zh-cn';
import { zhTW } from '@fumadocs/language/zh-tw';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
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
      'Back to Home(404 page)': '返回文档',
      'Page Not Found(404 page)': '页面不存在',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
        '你访问的页面可能已被移动、重命名或暂时不可用。',
    },
    'zh-Hant': {
      displayName: '繁體中文',
      'Search(search trigger)': '搜尋文件',
      'Search(search dialog)': '搜尋文件',
      'Prop(type table)': '欄位',
      'Back to Home(404 page)': '返回文件',
      'Page Not Found(404 page)': '頁面不存在',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
        '你訪問的頁面可能已被移動、重新命名或暫時無法使用。',
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  const docsLabel =
    locale === 'zh-CN' ? '文档' : locale === 'zh-Hant' ? '文件' : 'Docs';

  return {
    i18n: true,
    githubUrl: 'https://github.com/AniBT-Net/wiki',
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <img
            src="/favicon.png"
            alt=""
            className="size-5"
            aria-hidden="true"
          />
          <span>AniBT Wiki</span>
        </span>
      ),
      url: localizedPath(locale, '/docs'),
    },
    links: [
      {
        text: docsLabel,
        url: localizedPath(locale, '/docs'),
        active: 'nested-url',
      },
    ],
  };
}
