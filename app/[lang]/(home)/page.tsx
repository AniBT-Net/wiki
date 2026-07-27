import { localizedPath } from '@/lib/i18n';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  ImageIcon,
  Radio,
  Rss,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const copy = {
  'zh-CN': {
    badge: '面向动漫与字幕组',
    titleLead: 'Ani',
    titleMid: 'BT',
    titleTail: 'Wiki',
    tagline: '字幕组发布指南 · Tracker · 站点同步 · Open API · 图床',
    subtitle:
      '从入驻申请到一键同步多站，从 RSS 追番到 API 自动化——这里是 AniBT 的完整使用说明。',
    enter: '进入文档',
    site: '打开 AniBT',
    explore: '快速入口',
    features: [
      {
        title: '字幕组入驻',
        desc: '申请流程、身份审核与发布权限说明。',
        href: '/docs/apply',
        icon: 'users',
      },
      {
        title: '站点同步',
        desc: 'Nyaa / 萌番组 / 末日站 / Mikan / ACG.rip 一键分发。',
        href: '/docs/site-sync',
        icon: 'radio',
      },
      {
        title: 'Open API & RSS',
        desc: '发布接口、单番剧 RSS、订阅 feed 与集成示例。',
        href: '/docs/open-api',
        icon: 'rss',
      },
      {
        title: '字幕组图床',
        desc: 'Web 上传，直出全球加速链接与 BBCode / Markdown / HTML。',
        href: '/docs/image-host',
        icon: 'image',
      },
    ],
    footer: '找不到想要的？发邮件到 support@anibt.net',
  },
  'zh-Hant': {
    badge: '面向動漫與字幕組',
    titleLead: 'Ani',
    titleMid: 'BT',
    titleTail: 'Wiki',
    tagline: '字幕組發布指南 · Tracker · 站點同步 · Open API · 圖床',
    subtitle:
      '從入駐申請到一鍵同步多站，從 RSS 追番到 API 自動化——這裡是 AniBT 的完整使用說明。',
    enter: '進入文件',
    site: '開啟 AniBT',
    explore: '快速入口',
    features: [
      {
        title: '字幕組入駐',
        desc: '申請流程、身分審核與發布權限說明。',
        href: '/docs/apply',
        icon: 'users',
      },
      {
        title: '站點同步',
        desc: 'Nyaa / 萌番組 / 末日站 / Mikan / ACG.rip 一鍵分發。',
        href: '/docs/site-sync',
        icon: 'radio',
      },
      {
        title: 'Open API & RSS',
        desc: '發布介面、單番劇 RSS、訂閱 feed 與整合範例。',
        href: '/docs/open-api',
        icon: 'rss',
      },
      {
        title: '字幕組圖床',
        desc: 'Web 上傳，直出全球加速連結與 BBCode / Markdown / HTML。',
        href: '/docs/image-host',
        icon: 'image',
      },
    ],
    footer: '找不到想要的？寄信到 support@anibt.net',
  },
  en: {
    badge: 'For anime fans & fansub groups',
    titleLead: 'Ani',
    titleMid: 'BT',
    titleTail: 'Wiki',
    tagline: 'Publishing · Tracker · Site sync · Open API · Image host',
    subtitle:
      'From onboarding to multi-site sync, from RSS tracking to API automation — the complete AniBT handbook.',
    enter: 'Read the docs',
    site: 'Open AniBT',
    explore: 'Quick links',
    features: [
      {
        title: 'Group onboarding',
        desc: 'Application flow, identity review, and publish permissions.',
        href: '/docs/apply',
        icon: 'users',
      },
      {
        title: 'Site sync',
        desc: 'One-shot distribute to Nyaa, Bangumi, ACGNX, Mikan, ACG.rip.',
        href: '/docs/site-sync',
        icon: 'radio',
      },
      {
        title: 'Open API & RSS',
        desc: 'Publish endpoints, anime RSS, private feeds, and integration examples.',
        href: '/docs/open-api',
        icon: 'rss',
      },
      {
        title: 'Image host',
        desc: 'Web upload with global CDN, BBCode, Markdown, and HTML formats.',
        href: '/docs/image-host',
        icon: 'image',
      },
    ],
    footer: 'Need help? Email support@anibt.net',
  },
} as const;

type FeatureIcon = (typeof copy)['zh-CN']['features'][number]['icon'];

function FeatureGlyph({ name }: { name: FeatureIcon }) {
  const cls = 'size-5';
  switch (name) {
    case 'users':
      return <Users className={cls} aria-hidden="true" />;
    case 'radio':
      return <Radio className={cls} aria-hidden="true" />;
    case 'rss':
      return <Rss className={cls} aria-hidden="true" />;
    case 'image':
      return <ImageIcon className={cls} aria-hidden="true" />;
    default:
      return <BookOpen className={cls} aria-hidden="true" />;
  }
}

function PetalField() {
  return (
    <div className="anibt-petals" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className={`anibt-petal anibt-petal-${i + 1}`} />
      ))}
    </div>
  );
}

function StarField() {
  return (
    <div className="anibt-stars" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <i key={i} className={`anibt-star anibt-star-${i + 1}`} />
      ))}
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = copy[lang as keyof typeof copy] ?? copy['zh-CN'];

  return (
    <main className="anibt-home">
      <div className="anibt-home-bg" aria-hidden="true">
        <div className="anibt-home-aurora anibt-home-aurora-a" />
        <div className="anibt-home-aurora anibt-home-aurora-b" />
        <div className="anibt-home-aurora anibt-home-aurora-c" />
        <div className="anibt-home-mesh" />
        <div className="anibt-home-ring anibt-home-ring-outer" />
        <div className="anibt-home-ring anibt-home-ring-inner" />
        <StarField />
        <PetalField />
        <div className="anibt-home-noise" />
      </div>

      <div className="anibt-home-stage">
        <div className="anibt-home-hero">
          <div className="anibt-home-frame" aria-hidden="true">
            <span className="anibt-corner anibt-corner-tl" />
            <span className="anibt-corner anibt-corner-tr" />
            <span className="anibt-corner anibt-corner-bl" />
            <span className="anibt-corner anibt-corner-br" />
          </div>

          <div className="anibt-home-badge">
            <Sparkles className="size-3.5" aria-hidden="true" />
            <span>{t.badge}</span>
          </div>

          <h1 className="anibt-home-title">
            <span className="anibt-home-title-lead">{t.titleLead}</span>
            <em className="anibt-home-title-mid">{t.titleMid}</em>
            <span className="anibt-home-title-tail">{t.titleTail}</span>
            <i className="anibt-home-title-dot" aria-hidden="true" />
          </h1>

          <p className="anibt-home-tagline">{t.tagline}</p>
          <p className="anibt-home-subtitle">{t.subtitle}</p>

          <div className="anibt-home-actions">
            <Link
              href={localizedPath(lang, '/docs')}
              className="anibt-home-btn anibt-home-btn-primary"
            >
              <BookOpen className="size-4" aria-hidden="true" />
              {t.enter}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="https://anibt.net"
              target="_blank"
              rel="noreferrer"
              className="anibt-home-btn anibt-home-btn-ghost"
            >
              {t.site}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <section className="anibt-home-explore" aria-labelledby="home-explore">
          <div className="anibt-home-explore-head">
            <span className="anibt-home-explore-kicker" aria-hidden="true">
              ✦
            </span>
            <h2 id="home-explore" className="anibt-home-explore-title">
              {t.explore}
            </h2>
            <span className="anibt-home-explore-line" aria-hidden="true" />
          </div>

          <div className="anibt-home-cards">
            {t.features.map((feature, index) => (
              <Link
                key={feature.href}
                href={localizedPath(lang, feature.href)}
                className="anibt-home-card"
                style={{ '--card-i': index } as CSSProperties}
              >
                <span className="anibt-home-card-icon" data-tone={feature.icon}>
                  <FeatureGlyph name={feature.icon} />
                </span>
                <span className="anibt-home-card-body">
                  <span className="anibt-home-card-title">{feature.title}</span>
                  <span className="anibt-home-card-desc">{feature.desc}</span>
                </span>
                <ArrowRight
                  className="anibt-home-card-arrow size-4"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>

        <p className="anibt-home-footer">
          <a href="mailto:support@anibt.net">{t.footer}</a>
        </p>
      </div>
    </main>
  );
}
