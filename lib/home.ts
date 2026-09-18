import { localizedPath } from '@/lib/i18n';

export type HomeCopy = {
  htmlTitle: string;
  htmlDescription: string;
  kicker: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  siteCta: string;
  rolesHeading: string;
  roles: {
    title: string;
    body: string;
    href: string;
    link: string;
  }[];
  startHeading: string;
  start: {
    title: string;
    description: string;
    href: string;
  }[];
};

const zhCN: HomeCopy = {
  htmlTitle: 'AniBT Wiki',
  htmlDescription: 'AniBT 使用文档、站点同步与公开 API。',
  kicker: 'AniBT 文档',
  title: '字幕组发布、站点同步，以及 RSS / JSON 取数。',
  lead: 'AniBT 是面向动漫的公共 BitTorrent 追踪器。字幕组从入驻走到发布；用户和开发者用 RSS 与 JSON 取数。',
  primaryCta: '阅读文档',
  secondaryCta: '打开公开 API',
  siteCta: '打开主站',
  rolesHeading: '从这里开始',
  roles: [
    {
      title: '字幕组',
      body: '申请入驻，配置站点同步与 Tracker，再用 API Key 发布。',
      href: '/docs/apply',
      link: '申请入驻',
    },
    {
      title: '用户',
      body: '用 RSS 订阅番剧或全站磁力。个人订阅需要账号。',
      href: '/docs/open-api/rss-anime',
      link: '番剧 RSS',
    },
    {
      title: '开发者',
      body: '公开读取无需鉴权。写入、删除、/me 必须带字幕组 API Key。',
      href: '/docs/open-api',
      link: '接口总览',
    },
  ],
  startHeading: '常用入口',
  start: [
    {
      title: '站点同步',
      description: 'Nyaa、萌番组、末日站、Mikan、ACG.rip',
      href: '/docs/site-sync',
    },
    {
      title: 'Tracker',
      description: 'https://tracker.anibt.net/announce',
      href: '/docs/tracker',
    },
    {
      title: '账号',
      description: '注册、登录、找回密码',
      href: '/docs/account-auth',
    },
    {
      title: '联系',
      description: 'support@anibt.net',
      href: '/docs/contact',
    },
  ],
};

const zhHant: HomeCopy = {
  htmlTitle: 'AniBT Wiki',
  htmlDescription: 'AniBT 使用文件、站點同步與公開 API。',
  kicker: 'AniBT 文件',
  title: '字幕組釋出、站點同步，以及 RSS / JSON 取數。',
  lead: 'AniBT 是面向動漫的公共 BitTorrent 追蹤器。字幕組從入駐走到釋出；使用者和開發者用 RSS 與 JSON 取數。',
  primaryCta: '閱讀文件',
  secondaryCta: '開啟公開 API',
  siteCta: '開啟主站',
  rolesHeading: '從這裡開始',
  roles: [
    {
      title: '字幕組',
      body: '申請入駐，設定站點同步與 Tracker，再用 API Key 釋出。',
      href: '/docs/apply',
      link: '申請入駐',
    },
    {
      title: '使用者',
      body: '用 RSS 訂閱番劇或全站磁力。個人訂閱需要帳號。',
      href: '/docs/open-api/rss-anime',
      link: '番劇 RSS',
    },
    {
      title: '開發者',
      body: '公開讀取無需鑑權。寫入、刪除、/me 必須帶字幕組 API Key。',
      href: '/docs/open-api',
      link: '介面總覽',
    },
  ],
  startHeading: '常用入口',
  start: [
    {
      title: '站點同步',
      description: 'Nyaa、萌番組、末日站、Mikan、ACG.rip',
      href: '/docs/site-sync',
    },
    {
      title: 'Tracker',
      description: 'https://tracker.anibt.net/announce',
      href: '/docs/tracker',
    },
    {
      title: '帳號',
      description: '註冊、登入、找回密碼',
      href: '/docs/account-auth',
    },
    {
      title: '聯絡',
      description: 'support@anibt.net',
      href: '/docs/contact',
    },
  ],
};

const en: HomeCopy = {
  htmlTitle: 'AniBT Wiki',
  htmlDescription: 'AniBT docs: publishing, site sync, and the public API.',
  kicker: 'AniBT docs',
  title: 'Publish, sync sites, and pull RSS / JSON.',
  lead: 'AniBT is a public BitTorrent tracker for anime. Subtitle groups go from admission to publish. Users and developers read RSS and JSON.',
  primaryCta: 'Read the docs',
  secondaryCta: 'Open API',
  siteCta: 'Open AniBT',
  rolesHeading: 'Start here',
  roles: [
    {
      title: 'Subtitle groups',
      body: 'Apply for admission, configure site sync and Tracker, then publish with an API Key.',
      href: '/docs/apply',
      link: 'Apply',
    },
    {
      title: 'Users',
      body: 'Subscribe to anime or site-wide magnets over RSS. Personal subscriptions need an account.',
      href: '/docs/open-api/rss-anime',
      link: 'Anime RSS',
    },
    {
      title: 'Developers',
      body: 'Public reads need no auth. Publish, delete, and /me require a subtitle-group API Key.',
      href: '/docs/open-api',
      link: 'API overview',
    },
  ],
  startHeading: 'Common pages',
  start: [
    {
      title: 'Site sync',
      description: 'Nyaa, Bangumi Moe, ACGNX, Mikan, ACG.rip',
      href: '/docs/site-sync',
    },
    {
      title: 'Tracker',
      description: 'https://tracker.anibt.net/announce',
      href: '/docs/tracker',
    },
    {
      title: 'Account',
      description: 'Register, sign in, recover password',
      href: '/docs/account-auth',
    },
    {
      title: 'Contact',
      description: 'support@anibt.net',
      href: '/docs/contact',
    },
  ],
};

export function homeCopy(locale: string): HomeCopy {
  if (locale === 'zh-Hant') return zhHant;
  if (locale === 'en') return en;
  return zhCN;
}

export function homeHref(locale: string, href: string): string {
  return localizedPath(locale, href);
}
