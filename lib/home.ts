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
  trackerTitle: string;
  trackerHelp: string;
  trackerCopied: string;
  rolesHeading: string;
  roles: {
    tag: string;
    title: string;
    body: string;
    href: string;
    link: string;
  }[];
  featuresHeading: string;
  features: {
    title: string;
    description: string;
  }[];
  startHeading: string;
  start: {
    title: string;
    description: string;
    href: string;
  }[];
};

const zhCN: HomeCopy = {
  htmlTitle: 'AniBT 使用指南与文档',
  htmlDescription:
    'AniBT 官方文档：字幕组入驻与发布、多站同步配置、Tracker 说明、全站 RSS 订阅与开放 API。',
  kicker: 'AniBT 官方使用指南',
  title: '动漫 BT 发布、多站自动同步与 RSS 追番订阅',
  lead: '为动漫爱好者与字幕组打造的 BT 分发与索引平台。从字幕组一处发布同步全网，到观众直接下载种子、用 RSS 丢进下载器自动追番，这里都有清晰实在的操作指引。',
  primaryCta: '开始使用',
  secondaryCta: '开放 API',
  siteCta: '前往主站 anibt.net ↗',
  trackerTitle: 'AniBT 公开 Tracker',
  trackerHelp:
    '制种时加入该 announce。发布在 AniBT 的资源会自动加入通信白名单。',
  trackerCopied: '已复制 Tracker 地址',
  rolesHeading: '根据你的身份，直接前往对应指引',
  roles: [
    {
      tag: '字幕组',
      title: '资源分发与多站同步',
      body: '申请入驻开通发布权限，后台支持一键自动同步到萌番组、蜜柑、花园、末日站、ACG.rip 与 Nyaa，并享有专属图床与发布 API。',
      href: '/docs/apply',
      link: '字幕组入驻与发布指南 →',
    },
    {
      tag: '追番党',
      title: '找片与 RSS 自动追番',
      body: '无需注册即可自由浏览、搜索与下载种子或磁力。按番剧或字幕组快速生成 RSS 订阅源，直接导入 qBittorrent 开启自动追番。',
      href: '/docs/open-api/rss-anime',
      link: 'RSS 追番与使用指南 →',
    },
    {
      tag: '开发者',
      title: '开放 API 与脚本集成',
      body: '全站公开 REST API 与规范 OpenAPI 契约。读接口全量免鉴权并支持 304 缓存协商，开箱即用的交互式 Try-it 方便直接调试。',
      href: '/docs/open-api',
      link: '查看开放 API 总览 →',
    },
  ],
  featuresHeading: 'AniBT 能为你做什么',
  features: [
    {
      title: '多站一键同步',
      description:
        '在 AniBT 提交一次资源，后台自动推送到萌番组、蜜柑、花园、末日站、ACG.rip 及 Nyaa，免除重复发帖繁琐流程。',
    },
    {
      title: '智能元数据识别',
      description:
        '自动从种子文件名和发布标题中解析剧集序号、分辨率、字幕语言与封装格式，发布更省心。',
    },
    {
      title: '白名单 Nyaa 代发',
      description:
        '针对有分发需求但受限于网络环境的字幕组，平台官方提供合规代发服务，无需自备代理与账号。',
    },
    {
      title: '字幕组专属图床',
      description:
        '支持 10MB 大图托管，自动预解析图片宽高并生成防抖 HTML/Markdown，杜绝详情页排版跳动。',
    },
    {
      title: '纯净标准 RSS',
      description:
        '规范支持 RFC / BEP 36 扩展，完美兼容 qBittorrent、Sonarr 等主流下载工具，轮询友好省流量。',
    },
    {
      title: '开放透明的接口',
      description:
        '所有公开番剧与磁力数据完全开放读取，提供完整 OpenAPI 规范，方便社区编写自动化工具。',
    },
  ],
  startHeading: '常用功能速查',
  start: [
    {
      title: '站点同步设置',
      description: '萌番组、蜜柑计划、动漫花园、末日站、ACG.rip、Nyaa 凭据配置',
      href: '/docs/site-sync',
    },
    {
      title: 'Tracker 说明',
      description: 'https://tracker.anibt.net/announce 制种与通信说明',
      href: '/docs/tracker',
    },
    {
      title: '账号与权限',
      description: '注册、邮箱验证码登录与个人设置',
      href: '/docs/account-auth',
    },
    {
      title: '字幕组图床',
      description: '发布截图托管、外链格式与删除规范',
      href: '/docs/image-host',
    },
    {
      title: '生态工具',
      description: 'FontInAss 字体子集化与 AniBT-Speed 自动做种脚本',
      href: '/docs/projects',
    },
    {
      title: '联系与反馈',
      description: '申请入驻、问题排查或版权事宜：support@anibt.net',
      href: '/docs/contact',
    },
  ],
};

const zhHant: HomeCopy = {
  htmlTitle: 'AniBT 使用指南與文件',
  htmlDescription:
    'AniBT 官方文件：字幕組入駐與釋出、多站同步設定、Tracker 說明、全站 RSS 訂閱與開放 API。',
  kicker: 'AniBT 官方使用指南',
  title: '動漫 BT 釋出、多站自動同步與 RSS 追番訂閱',
  lead: '為動漫愛好者與字幕組打造的 BT 分發與索引平台。從字幕組一處釋出同步全網，到觀眾直接下載種子、用 RSS 丟進下載器自動追番，這裡都有清晰實在的操作指引。',
  primaryCta: '開始使用',
  secondaryCta: '開放 API',
  siteCta: '前往主站 anibt.net ↗',
  trackerTitle: 'AniBT 公開 Tracker',
  trackerHelp:
    '製種時加入該 announce。釋出在 AniBT 的資源會自動加入通訊白名單。',
  trackerCopied: '已複製 Tracker 位址',
  rolesHeading: '根據你的身份，直接前往對應指引',
  roles: [
    {
      tag: '字幕組',
      title: '資源分發與多站同步',
      body: '申請入駐開通釋出權限，後台支援一鍵自動同步到萌番組、蜜柑、花園、末日站、ACG.rip 與 Nyaa，並享有專屬圖床與釋出 API。',
      href: '/docs/apply',
      link: '字幕組入駐與釋出指南 →',
    },
    {
      tag: '追番黨',
      title: '找片與 RSS 自動追番',
      body: '無需註冊即可自由瀏覽、搜尋與下載種子或磁力。按番劇或字幕組快速產生 RSS 訂閱源，直接匯入 qBittorrent 開啟自動追番。',
      href: '/docs/open-api/rss-anime',
      link: 'RSS 追番與使用指南 →',
    },
    {
      tag: '開發者',
      title: '開放 API 與腳本整合',
      body: '全站公開 REST API 與規範 OpenAPI 契約。讀介面全量免鑑權並支援 304 快取協商，開箱即用的互動式 Try-it 方便直接偵錯。',
      href: '/docs/open-api',
      link: '查看開放 API 總覽 →',
    },
  ],
  featuresHeading: 'AniBT 能為你做什麼',
  features: [
    {
      title: '多站一鍵同步',
      description:
        '在 AniBT 提交一次資源，後台自動推送到萌番組、蜜柑、花園、末日站、ACG.rip 及 Nyaa，免除重複發文繁瑣流程。',
    },
    {
      title: '智慧元數據識別',
      description:
        '自動從種子檔案名和釋出標題中解析劇集序號、解析度、字幕語言與封裝格式，釋出更省心。',
    },
    {
      title: '白名單 Nyaa 代發',
      description:
        '針對有分發需求但受限於網路環境的字幕組，平台官方提供合規代發服務，無需自備代理與帳號。',
    },
    {
      title: '字幕組專屬圖床',
      description:
        '支援 10MB 大圖託管，自動預解析圖片寬高並產生防抖 HTML/Markdown，杜絕詳情頁排版跳動。',
    },
    {
      title: '純淨標準 RSS',
      description:
        '規範支援 RFC / BEP 36 擴充，完美相容 qBittorrent、Sonarr 等主流下載工具，輪詢友善省流量。',
    },
    {
      title: '開放透明的介面',
      description:
        '所有公開番劇與磁力數據完全開放讀取，提供完整 OpenAPI 規範，方便社群撰寫自動化工具。',
    },
  ],
  startHeading: '常用功能速查',
  start: [
    {
      title: '站點同步設定',
      description: '萌番組、蜜柑計畫、動漫花園、末日站、ACG.rip、Nyaa 憑據設定',
      href: '/docs/site-sync',
    },
    {
      title: 'Tracker 說明',
      description: 'https://tracker.anibt.net/announce 製種與通訊說明',
      href: '/docs/tracker',
    },
    {
      title: '帳號與權限',
      description: '註冊、信箱驗證碼登入與個人設定',
      href: '/docs/account-auth',
    },
    {
      title: '字幕組圖床',
      description: '釋出截圖託管、外鏈格式與刪除規範',
      href: '/docs/image-host',
    },
    {
      title: '生態工具',
      description: 'FontInAss 字體子集化與 AniBT-Speed 自動做種腳本',
      href: '/docs/projects',
    },
    {
      title: '聯絡與回饋',
      description: '申請入駐、問題排查或版權事宜：support@anibt.net',
      href: '/docs/contact',
    },
  ],
};

const en: HomeCopy = {
  htmlTitle: 'AniBT Wiki & Docs',
  htmlDescription:
    'Official AniBT documentation: fansub onboarding, multi-site sync, tracker setup, RSS feeds, and open APIs.',
  kicker: 'AniBT Documentation',
  title: 'Anime BT Publishing, Multi-Site Sync, and RSS Feeds',
  lead: 'A modern BitTorrent distribution and indexing platform built for anime fans and fansub groups. From one-click cross-publishing across major BT sites to automated RSS feeds for downloaders and open REST APIs, find all the practical guidance you need here.',
  primaryCta: 'Get Started',
  secondaryCta: 'Open API',
  siteCta: 'Visit anibt.net ↗',
  trackerTitle: 'AniBT Public Tracker',
  trackerHelp:
    'Add this announce URL when creating torrents. Torrents published on AniBT are automatically whitelisted.',
  trackerCopied: 'Tracker URL copied',
  rolesHeading: 'Choose your path',
  roles: [
    {
      tag: 'Fansub Groups',
      title: 'Release & Multi-Site Sync',
      body: 'Apply for publishing permissions, automatically cross-publish to Bangumi Moe, Mikan, DMHY, ACGNX, ACG.rip, and Nyaa, and use the dedicated image host and release APIs.',
      href: '/docs/apply',
      link: 'Fansub Onboarding Guide →',
    },
    {
      tag: 'Anime Fans',
      title: 'Browse & RSS Auto-Download',
      body: 'Browse, search, and download torrents and magnets without an account. Generate filtered RSS feeds by anime or fansub group, and plug them into qBittorrent for automated episode grabbing.',
      href: '/docs/open-api/rss-anime',
      link: 'RSS Guide for Downloaders →',
    },
    {
      tag: 'Developers',
      title: 'Open API & Automation',
      body: 'Public REST APIs and standard OpenAPI contracts. Keyless reads with HTTP 304 conditional cache support, plus an interactive Try-it console for easy debugging and scripting.',
      href: '/docs/open-api',
      link: 'Open API Overview →',
    },
  ],
  featuresHeading: 'What AniBT provides',
  features: [
    {
      title: 'Multi-Site Sync',
      description:
        'Submit once to AniBT; releases are automatically dispatched to Bangumi Moe, Mikan, DMHY, ACGNX, ACG.rip, and Nyaa in the background.',
    },
    {
      title: 'Smart Metadata Parsing',
      description:
        'Automatically extracts episode numbers, resolution, subtitle languages, and container formats from torrent filenames and release titles.',
    },
    {
      title: 'Whitelisted Nyaa Proxy',
      description:
        'Platform-assisted uploads to Nyaa for eligible fansub groups, eliminating the need for separate proxies or external accounts.',
    },
    {
      title: 'Dedicated Image Hosting',
      description:
        'Upload release screenshots up to 10MB with auto-calculated dimensions in HTML to eliminate layout shifts (CLS).',
    },
    {
      title: 'Standard-Compliant RSS',
      description:
        'RFC and BEP 36 compliant feeds compatible with qBittorrent, Sonarr, and FlexGet, supporting 304 Not Modified to minimize bandwidth.',
    },
    {
      title: 'Open & Transparent APIs',
      description:
        'All public anime and torrent metadata is open for querying with full OpenAPI 3.1 specifications.',
    },
  ],
  startHeading: 'Quick Reference',
  start: [
    {
      title: 'Site Sync Setup',
      description:
        'Configure credentials for Bangumi Moe, Mikan, DMHY, ACGNX, ACG.rip, and Nyaa',
      href: '/docs/site-sync',
    },
    {
      title: 'Tracker Announce',
      description: 'https://tracker.anibt.net/announce setup and rules',
      href: '/docs/tracker',
    },
    {
      title: 'Account & Auth',
      description: 'Registration, email OTP login, and session settings',
      href: '/docs/account-auth',
    },
    {
      title: 'Image Host',
      description: 'Screenshot hosting, link formats, and deletion policy',
      href: '/docs/image-host',
    },
    {
      title: 'Ecosystem Tools',
      description: 'FontInAss font subsetting and AniBT-Speed seeder script',
      href: '/docs/projects',
    },
    {
      title: 'Contact & Support',
      description: 'Inquiries, onboarding, or DMCA: support@anibt.net',
      href: '/docs/contact',
    },
  ],
};

export function homeCopy(locale: string): HomeCopy {
  if (locale === 'zh-Hant') return zhHant;
  if (locale === 'en') return en;
  return zhCN;
}

export function homeHref(locale: string, path: string): string {
  return localizedPath(locale, path);
}
