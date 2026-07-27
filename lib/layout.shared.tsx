import { i18n, localizedPath } from '@/lib/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add('ui', {
    'zh-CN': {
      displayName: '简体中文',
      search: '搜索文档',
      searchNoResult: '没有找到结果',
      searchOpen: '打开搜索',
      searchClose: '关闭搜索',
      toc: '本页目录',
      tocNoHeadings: '没有标题',
      tocInline: '目录',
      lastUpdate: '最后更新于',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      chooseTheme: '主题',
      editOnGithub: '在 GitHub 编辑',
      themeToggle: '切换主题',
      themeLight: '浅色',
      themeDark: '深色',
      themeSystem: '跟随系统',
      codeBlockCopy: '复制文本',
      codeBlockCopied: '已复制',
      accordionCopyAnchor: '复制链接',
      headingCopyAnchor: '复制标题链接',
      bannerClose: '关闭提示',
      menuToggle: '打开菜单',
      pageActionsCopyMarkdown: '复制 Markdown',
      pageActionsOpen: '打开',
      pageActionsOpenGitHub: '在 GitHub 打开',
      pageActionsViewMarkdown: '查看 Markdown',
      pageActionsOpenScira: '在 Scira AI 打开',
      pageActionsOpenChatGPT: '在 ChatGPT 打开',
      pageActionsOpenClaude: '在 Claude 打开',
      pageActionsOpenCursor: '在 Cursor 打开',
      pageActionsOpenInLLMPrompt: '阅读 {url}，我想基于它提问。',
      sidebarOpen: '打开侧边栏',
      sidebarCollapse: '折叠侧边栏',
      typeTableProp: '属性',
      typeTableType: '类型',
      typeTableDefault: '默认值',
      typeTableParameters: '参数',
      typeTableReturns: '返回值',
      notFoundTitle: '页面不存在',
      notFoundDescription: '你访问的页面可能已被移动、重命名或暂时不可用。',
      notFoundLink: '返回首页',
    },
    en: {
      displayName: 'English',
    },
    'zh-Hant': {
      displayName: '繁體中文',
      search: '搜尋文件',
      searchNoResult: '沒有找到結果',
      searchOpen: '開啟搜尋',
      searchClose: '關閉搜尋',
      toc: '本頁目錄',
      tocNoHeadings: '沒有標題',
      tocInline: '目錄',
      lastUpdate: '最後更新於',
      chooseLanguage: '選擇語言',
      nextPage: '下一頁',
      previousPage: '上一頁',
      chooseTheme: '主題',
      editOnGithub: '在 GitHub 編輯',
      themeToggle: '切換主題',
      themeLight: '淺色',
      themeDark: '深色',
      themeSystem: '跟隨系統',
      codeBlockCopy: '複製文字',
      codeBlockCopied: '已複製',
      accordionCopyAnchor: '複製連結',
      headingCopyAnchor: '複製標題連結',
      bannerClose: '關閉提示',
      menuToggle: '開啟選單',
      pageActionsCopyMarkdown: '複製 Markdown',
      pageActionsOpen: '開啟',
      pageActionsOpenGitHub: '在 GitHub 開啟',
      pageActionsViewMarkdown: '檢視 Markdown',
      pageActionsOpenScira: '在 Scira AI 開啟',
      pageActionsOpenChatGPT: '在 ChatGPT 開啟',
      pageActionsOpenClaude: '在 Claude 開啟',
      pageActionsOpenCursor: '在 Cursor 開啟',
      pageActionsOpenInLLMPrompt: '閱讀 {url}，我想基於它提問。',
      sidebarOpen: '開啟側邊欄',
      sidebarCollapse: '摺疊側邊欄',
      typeTableProp: '屬性',
      typeTableType: '型別',
      typeTableDefault: '預設值',
      typeTableParameters: '參數',
      typeTableReturns: '回傳值',
      notFoundTitle: '頁面不存在',
      notFoundDescription: '你訪問的頁面可能已被移動、重新命名或暫時無法使用。',
      notFoundLink: '返回首頁',
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
        <span className="inline-flex items-center gap-2 font-semibold">
          <img
            src="/favicon.png"
            alt=""
            className="size-5 rounded-sm"
            aria-hidden="true"
          />
          <span className="bg-gradient-to-r from-[var(--anibt-accent-primary)] to-[var(--anibt-accent-secondary)] bg-clip-text font-serif font-black text-transparent">
            AniBT Wiki
          </span>
        </span>
      ),
      url: localizedPath(locale, '/'),
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
