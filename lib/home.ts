import { localizedPath } from '@/lib/i18n';

export type StatementPart = {
  text: string;
  accent?: boolean;
};

export type FontScale = {
  min: string;
  vw: string;
  vwSm: string;
  max: string;
};

export type SyncRow = {
  name: string;
  slug: string;
  domain: string;
};

export type RssKind = 'anime' | 'group' | 'all' | 'mine';

export type RssGroupOption = {
  label: string;
  slug: string | null;
};

export type KitTile = {
  title: string;
  note: string;
  href: string;
  external?: boolean;
};

export type LlmLine = {
  comment: string;
  path: string;
};

export type HomeCopy = {
  htmlTitle: string;
  htmlDescription: string;
  heroPill: string;
  heroTitle: string;
  heroLead: string;
  heroPrimary: string;
  heroSecondary: string;
  h1Scale: FontScale;
  h2Scale: Omit<FontScale, 'vwSm'>;
  shot: {
    search: string;
    section: string;
    nav: string[];
    title: string;
    description: string;
    acts: string[];
    heading: string;
    tocTitle: string;
    toc: string[];
  };
  statement: StatementPart[];
  copyLabel: string;
  copiedLabel: string;
  tryPanel: {
    tag: string;
    command: string;
    tabs: string[];
    readNoAuth: string;
    oneFeed: string;
    qbSubscribe: string;
    qbRule: string;
    otherFeeds: string;
    feedAll: string;
    feedGroup: string;
    feedMine: string;
    publishNeedsKey: string;
    checkSync: string;
  };
  syncPanel: {
    title: string;
    lead: string;
    rows: SyncRow[];
  };
  rssPanel: {
    title: string;
    lead: string;
    kindLabel: string;
    groupLabel: string;
    kinds: { id: RssKind; label: string }[];
    groups: RssGroupOption[];
    docsCta: string;
    clientCta: string;
  };
  trackerPanel: {
    title: string;
    lead: string;
    copyCta: string;
    docsCta: string;
  };
  llmPanel: {
    title: string;
    lead: string;
    lines: LlmLine[];
    cta: string;
  };
  kitPanel: {
    title: string;
    lead: string;
    tiles: KitTile[];
  };
  changelogPanel: {
    title: string;
    lead: string;
    cta: string;
  };
  closing: {
    title: string;
    primary: string;
    apply: string;
    contact: string;
  };
};

const CJK_H1: FontScale = {
  min: '19px',
  vw: '3.55vw',
  vwSm: '5vw',
  max: '52px',
};

const CJK_H2 = { min: '22px', vw: '3.6vw', max: '44px' };

const SYNC_DOMAINS: Record<string, string> = {
  bangumi: 'bangumi.moe',
  mikan: 'mikanani.me',
  dmhy: 'share.dmhy.org',
  acgnx: 'share.acgnx.se',
  acgrip: 'acg.rip',
  nyaa: 'nyaa.si',
};

const zhCN: HomeCopy = {
  htmlTitle: '使用指南与文档',
  htmlDescription:
    'AniBT 官方文档：字幕组入驻与发布、多站同步配置、Tracker 说明、全站 RSS 订阅与开放 API。',
  heroPill: 'AniBT 官方文档',
  heroTitle: '发布、同步、订阅，都写在这里。',
  heroLead:
    '字幕组怎么入驻和发布，观众怎么用 RSS 自动追番，开发者怎么调接口。每一篇都对着线上实际行为写。',
  heroPrimary: '开始阅读',
  heroSecondary: '公开 API',
  h1Scale: CJK_H1,
  h2Scale: CJK_H2,
  shot: {
    search: '搜索文档',
    section: '字幕组',
    nav: ['申请入驻', '站点同步', '专属图床'],
    title: '申请入驻',
    description: '字幕组入驻 AniBT 的申请流程、邮件模板与权限开通说明。',
    acts: ['复制 Markdown', '打开方式'],
    heading: '入驻流程',
    tocTitle: '本页内容',
    toc: ['入驻流程', '邮件模板', '权限开通', '常见问题'],
  },
  statement: [
    { text: 'AniBT Wiki 写给三种人：要把资源发出去的' },
    { text: '字幕组', accent: true },
    { text: '，想让下载器自己追番的' },
    { text: '观众', accent: true },
    { text: '，还有要把 AniBT 接进脚本的' },
    { text: '开发者', accent: true },
    { text: '。功能改了，文档跟着改；更新日志按天记。' },
  ],
  copyLabel: '复制',
  copiedLabel: '已复制',
  tryPanel: {
    tag: '试一下',
    command: 'curl https://anibt.net/api/seasons/anime',
    tabs: ['本季番剧', '订阅一部番', '发布一条资源'],
    readNoAuth: '读接口不用鉴权',
    oneFeed: '一部番、一个字幕组，一条 RSS',
    qbSubscribe: 'qBittorrent：打开 RSS 标签页，新建订阅，粘贴上面的地址',
    qbRule: '再建一条下载规则，新一集出来自动开始下',
    otherFeeds: '其他 RSS',
    feedAll: '全站最新',
    feedGroup: '一个字幕组的全部发布',
    feedMine: '我订阅的所有番',
    publishNeedsKey: '发布要字幕组的 API Key，而且必须带种子',
    checkSync: '发完查六个外站各自同步到哪一步',
  },
  syncPanel: {
    title: '一次发布，六站同步',
    lead: '每个外站的凭据怎么配、失败了怎么看，各有一篇。',
    rows: [
      { name: '萌番组', slug: 'bangumi', domain: SYNC_DOMAINS.bangumi },
      { name: '蜜柑计划', slug: 'mikan', domain: SYNC_DOMAINS.mikan },
      { name: '动漫花园', slug: 'dmhy', domain: SYNC_DOMAINS.dmhy },
      { name: '末日动漫', slug: 'acgnx', domain: SYNC_DOMAINS.acgnx },
      { name: 'ACG.rip', slug: 'acgrip', domain: SYNC_DOMAINS.acgrip },
      { name: 'Nyaa', slug: 'nyaa', domain: SYNC_DOMAINS.nyaa },
    ],
  },
  rssPanel: {
    title: '订一次，追到完结',
    lead: '按番剧、按字幕组、全站，或者登录后一条拿全部。',
    kindLabel: '订什么',
    groupLabel: '只要这组',
    kinds: [
      { id: 'anime', label: '一部番' },
      { id: 'group', label: '一个字幕组' },
      { id: 'all', label: '全站最新' },
      { id: 'mine', label: '我的订阅' },
    ],
    groups: [
      { label: 'LoliHouse', slug: 'lolihouse' },
      { label: '桜都字幕组', slug: 'sakurato' },
      { label: '不限', slug: null },
    ],
    docsCta: 'RSS 文档',
    clientCta: 'qBittorrent 怎么配',
  },
  trackerPanel: {
    title: '公开 Tracker',
    lead: '制种时加上它。发布在 AniBT 的资源自动进白名单。',
    copyCta: '复制地址',
    docsCta: 'Tracker 规范',
  },
  llmPanel: {
    title: '给 LLM 和 Agent',
    lead: '纯文本入口，直接喂给模型。',
    lines: [
      { comment: '索引', path: '/llms.txt' },
      { comment: '全文', path: '/llms-full.txt' },
      { comment: '单篇 Markdown', path: '/llms.mdx/zh-CN/docs/apply' },
      { comment: '接口契约', path: '/openapi.yaml' },
    ],
    cta: 'LLM 对接说明',
  },
  kitPanel: {
    title: '字幕组工具箱',
    lead: '发布之外还用得上的东西。',
    tiles: [
      {
        title: '专属图床',
        note: '发布说明配图，自带宽高不跳版',
        href: '/docs/image-host',
      },
      {
        title: 'Nyaa 代发',
        note: '没有海外账号也能发',
        href: '/docs/nyaa-proxy',
      },
      {
        title: 'API Key',
        note: '按权限分发，接进压制脚本',
        href: '/docs/open-api/reference',
      },
      {
        title: 'FontInAss',
        note: '字幕字体子集化',
        href: 'https://font.anibt.net',
        external: true,
      },
      {
        title: 'AniBT-Speed',
        note: '自动做种脚本',
        href: 'https://github.com/Yuri-NagaSaki/AniBT-Speed',
        external: true,
      },
      {
        title: 'Torrent Parser',
        note: '浏览器里查看、编辑种子',
        href: 'https://parser.anibt.net/',
        external: true,
      },
    ],
  },
  changelogPanel: {
    title: '最近更新',
    lead: '按天记，面向用户和字幕组。',
    cta: '全部更新日志',
  },
  closing: {
    title: '从「开始使用」读起',
    primary: '开始阅读',
    apply: '申请入驻',
    contact: '联系我们',
  },
};

const zhHant: HomeCopy = {
  htmlTitle: '使用指南與文件',
  htmlDescription:
    'AniBT 官方文件：字幕組入駐與釋出、多站同步設定、Tracker 說明、全站 RSS 訂閱與開放 API。',
  heroPill: 'AniBT 官方文件',
  heroTitle: '釋出、同步、訂閱，都寫在這裡。',
  heroLead:
    '字幕組怎麼入駐和釋出，觀眾怎麼用 RSS 自動追番，開發者怎麼呼叫 API。每一篇都對著線上實際行為寫。',
  heroPrimary: '開始閱讀',
  heroSecondary: '公開 API',
  h1Scale: CJK_H1,
  h2Scale: CJK_H2,
  shot: {
    search: '搜尋文件',
    section: '字幕組',
    nav: ['申請入駐', '站點同步', '專屬圖床'],
    title: '申請入駐',
    description: '字幕組入駐 AniBT 的申請流程、郵件範本與權限開通說明。',
    acts: ['複製 Markdown', '開啟方式'],
    heading: '入駐流程',
    tocTitle: '本頁內容',
    toc: ['入駐流程', '郵件範本', '權限開通', '常見問題'],
  },
  statement: [
    { text: 'AniBT Wiki 寫給三種人：要把資源釋出的' },
    { text: '字幕組', accent: true },
    { text: '，想讓下載器自己追番的' },
    { text: '觀眾', accent: true },
    { text: '，還有要把 AniBT 接進腳本的' },
    { text: '開發者', accent: true },
    { text: '。功能改了，文件跟著改；更新日誌按天記。' },
  ],
  copyLabel: '複製',
  copiedLabel: '已複製',
  tryPanel: {
    tag: '試一下',
    command: 'curl https://anibt.net/api/seasons/anime',
    tabs: ['本季番劇', '訂閱一部番', '釋出一條資源'],
    readNoAuth: '讀取介面不用鑑權',
    oneFeed: '一部番、一個字幕組，一條 RSS',
    qbSubscribe: 'qBittorrent：開啟 RSS 標籤頁，新建訂閱，貼上上面的位址',
    qbRule: '再建一條下載規則，新一集出來自動開始下',
    otherFeeds: '其他 RSS',
    feedAll: '全站最新',
    feedGroup: '一個字幕組的全部釋出',
    feedMine: '我訂閱的所有番',
    publishNeedsKey: '釋出要字幕組的 API Key，而且必須帶種子',
    checkSync: '釋出後查六個外站各自同步到哪一步',
  },
  syncPanel: {
    title: '一次釋出，六站同步',
    lead: '每個外站的憑據怎麼設定、失敗了怎麼看，各有一篇。',
    rows: [
      { name: '萌番組', slug: 'bangumi', domain: SYNC_DOMAINS.bangumi },
      { name: '蜜柑計畫', slug: 'mikan', domain: SYNC_DOMAINS.mikan },
      { name: '動漫花園', slug: 'dmhy', domain: SYNC_DOMAINS.dmhy },
      { name: '末日動漫', slug: 'acgnx', domain: SYNC_DOMAINS.acgnx },
      { name: 'ACG.rip', slug: 'acgrip', domain: SYNC_DOMAINS.acgrip },
      { name: 'Nyaa', slug: 'nyaa', domain: SYNC_DOMAINS.nyaa },
    ],
  },
  rssPanel: {
    title: '訂一次，追到完結',
    lead: '按番劇、按字幕組、全站，或者登入後一條拿全部。',
    kindLabel: '訂什麼',
    groupLabel: '只要這組',
    kinds: [
      { id: 'anime', label: '一部番' },
      { id: 'group', label: '一個字幕組' },
      { id: 'all', label: '全站最新' },
      { id: 'mine', label: '我的訂閱' },
    ],
    groups: [
      { label: 'LoliHouse', slug: 'lolihouse' },
      { label: '櫻都字幕組', slug: 'sakurato' },
      { label: '不限', slug: null },
    ],
    docsCta: 'RSS 文件',
    clientCta: 'qBittorrent 怎麼設定',
  },
  trackerPanel: {
    title: '公開 Tracker',
    lead: '製種時加上它。釋出在 AniBT 的資源自動進白名單。',
    copyCta: '複製位址',
    docsCta: 'Tracker 規範',
  },
  llmPanel: {
    title: '給 LLM 和 Agent',
    lead: '純文字入口，直接餵給模型。',
    lines: [
      { comment: '索引', path: '/llms.txt' },
      { comment: '全文（簡體）', path: '/llms-full.txt' },
      { comment: '單篇 Markdown', path: '/llms.mdx/zh-Hant/docs/apply' },
      { comment: '介面契約', path: '/openapi.yaml' },
    ],
    cta: 'LLM 對接說明',
  },
  kitPanel: {
    title: '字幕組工具箱',
    lead: '釋出之外還用得上的東西。',
    tiles: [
      {
        title: '專屬圖床',
        note: '釋出說明配圖，自帶寬高不跳版',
        href: '/docs/image-host',
      },
      {
        title: 'Nyaa 代發',
        note: '沒有海外帳號也能發',
        href: '/docs/nyaa-proxy',
      },
      {
        title: 'API Key',
        note: '按權限分發，接進壓制腳本',
        href: '/docs/open-api/reference',
      },
      {
        title: 'FontInAss',
        note: '字幕字體子集化',
        href: 'https://font.anibt.net',
        external: true,
      },
      {
        title: 'AniBT-Speed',
        note: '自動做種腳本',
        href: 'https://github.com/Yuri-NagaSaki/AniBT-Speed',
        external: true,
      },
      {
        title: 'Torrent Parser',
        note: '瀏覽器裡檢視、編輯種子',
        href: 'https://parser.anibt.net/',
        external: true,
      },
    ],
  },
  changelogPanel: {
    title: '最近更新',
    lead: '按天記，面向使用者和字幕組。',
    cta: '全部更新日誌',
  },
  closing: {
    title: '從「開始使用」讀起',
    primary: '開始閱讀',
    apply: '申請入駐',
    contact: '聯絡我們',
  },
};

const en: HomeCopy = {
  htmlTitle: 'Guides and Open API',
  htmlDescription:
    'Official AniBT documentation: fansub onboarding, multi-site sync, tracker setup, RSS feeds, and open APIs.',
  heroPill: 'AniBT Docs',
  heroTitle: 'Publish, sync, subscribe.',
  heroLead:
    'How fansub groups apply and publish, how viewers automate downloads with RSS, how developers call the API. Every page describes what production actually does.',
  heroPrimary: 'Start reading',
  heroSecondary: 'Open API',
  h1Scale: { min: '19px', vw: '3.4vw', vwSm: '5vw', max: '50px' },
  h2Scale: { min: '22px', vw: '3.2vw', max: '40px' },
  shot: {
    search: 'Search docs',
    section: 'Fansub groups',
    nav: ['Apply', 'Site sync', 'Image host'],
    title: 'Apply',
    description:
      'How a fansub group applies to AniBT: the request, the email template, the permissions.',
    acts: ['Copy Markdown', 'Open in'],
    heading: 'How to apply',
    tocTitle: 'On this page',
    toc: ['How to apply', 'Email template', 'Permissions', 'FAQ'],
  },
  statement: [
    { text: 'AniBT Wiki is written for three people: the ' },
    { text: 'fansub group', accent: true },
    { text: ' shipping a release, the ' },
    { text: 'viewer', accent: true },
    { text: ' whose downloader should keep up, and the ' },
    { text: 'developer', accent: true },
    {
      text: ' wiring AniBT into a script. When behaviour changes, the docs change; the changelog is dated.',
    },
  ],
  copyLabel: 'Copy',
  copiedLabel: 'Copied',
  tryPanel: {
    tag: 'Try it',
    command: 'curl https://anibt.net/api/seasons/anime',
    tabs: ['This season', 'Subscribe to a show', 'Publish a release'],
    readNoAuth: 'Read endpoints need no auth',
    oneFeed: 'One show, one fansub group, one feed',
    qbSubscribe:
      'qBittorrent: open the RSS tab, add a new feed, paste the URL above',
    qbRule: 'Add a download rule; new episodes start on their own',
    otherFeeds: 'Other feeds',
    feedAll: 'everything, newest first',
    feedGroup: 'every release from one group',
    feedMine: 'every show you subscribed to',
    publishNeedsKey: 'Publishing needs a fansub API key and a torrent file',
    checkSync: 'Then check how far each of the six sites got',
  },
  syncPanel: {
    title: 'Publish once, sync to six sites',
    lead: 'Credentials and failure handling: one page per site.',
    rows: [
      { name: 'Bangumi Moe', slug: 'bangumi', domain: SYNC_DOMAINS.bangumi },
      { name: 'Mikan', slug: 'mikan', domain: SYNC_DOMAINS.mikan },
      { name: 'DMHY', slug: 'dmhy', domain: SYNC_DOMAINS.dmhy },
      { name: 'ACGNX', slug: 'acgnx', domain: SYNC_DOMAINS.acgnx },
      { name: 'ACG.rip', slug: 'acgrip', domain: SYNC_DOMAINS.acgrip },
      { name: 'Nyaa', slug: 'nyaa', domain: SYNC_DOMAINS.nyaa },
    ],
  },
  rssPanel: {
    title: 'Subscribe once, follow to the end',
    lead: 'By show, by fansub group, site-wide, or everything you follow.',
    kindLabel: 'Feed',
    groupLabel: 'Group',
    kinds: [
      { id: 'anime', label: 'One show' },
      { id: 'group', label: 'One group' },
      { id: 'all', label: 'Site-wide' },
      { id: 'mine', label: 'My subscriptions' },
    ],
    groups: [
      { label: 'LoliHouse', slug: 'lolihouse' },
      { label: 'Sakurato', slug: 'sakurato' },
      { label: 'Any', slug: null },
    ],
    docsCta: 'RSS docs',
    clientCta: 'qBittorrent setup',
  },
  trackerPanel: {
    title: 'Public tracker',
    lead: 'Add it when you create the torrent. AniBT releases are whitelisted automatically.',
    copyCta: 'Copy URL',
    docsCta: 'Tracker rules',
  },
  llmPanel: {
    title: 'For LLMs and agents',
    lead: 'Plain-text entry points, ready to feed a model.',
    lines: [
      { comment: 'index', path: '/llms.txt' },
      { comment: 'full text', path: '/llms-full.en.txt' },
      { comment: 'one page as Markdown', path: '/llms.mdx/en/docs/apply' },
      { comment: 'API contract', path: '/openapi.yaml' },
    ],
    cta: 'LLM integration',
  },
  kitPanel: {
    title: 'Fansub toolbox',
    lead: 'What you need besides publishing.',
    tiles: [
      {
        title: 'Image host',
        note: 'Release screenshots with real dimensions',
        href: '/docs/image-host',
      },
      {
        title: 'Nyaa proxy',
        note: 'Publish without an overseas account',
        href: '/docs/nyaa-proxy',
      },
      {
        title: 'API key',
        note: 'Scoped keys for encoding scripts',
        href: '/docs/open-api/reference',
      },
      {
        title: 'FontInAss',
        note: 'Subtitle font subsetting',
        href: 'https://font.anibt.net',
        external: true,
      },
      {
        title: 'AniBT-Speed',
        note: 'Automated seeding script',
        href: 'https://github.com/Yuri-NagaSaki/AniBT-Speed',
        external: true,
      },
      {
        title: 'Torrent Parser',
        note: 'Inspect and edit torrents in the browser',
        href: 'https://parser.anibt.net/',
        external: true,
      },
    ],
  },
  changelogPanel: {
    title: 'Recent changes',
    lead: 'Dated entries for viewers and fansub groups.',
    cta: 'Full changelog',
  },
  closing: {
    title: 'Start with the basics.',
    primary: 'Start reading',
    apply: 'Apply',
    contact: 'Contact',
  },
};

export function homeCopy(locale: string): HomeCopy {
  if (locale === 'zh-Hant') return zhHant;
  if (locale === 'en') return en;
  return zhCN;
}

export function homeHref(locale: string, path: string): string {
  return localizedPath(locale, path);
}
