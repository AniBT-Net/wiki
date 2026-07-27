import { localizedPath } from '@/lib/i18n';
import {
  ArrowUpRight,
  BookOpen,
  ImageIcon,
  Radio,
  Rss,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const copy = {
  'zh-CN': {
    badge: '面向动漫与字幕组的公共 BT 站文档',
    title: (
      <>
        写清楚怎么发、
        <br className="max-md:hidden" />
        怎么追、怎么接 <span className="text-[var(--anibt-brand)]">API</span>。
      </>
    ),
    intro: (
      <>
        <span className="font-medium text-[var(--anibt-brand)]">AniBT Wiki</span>{' '}
        是字幕组发布、站点同步、Tracker 与 Open API 的使用说明。按你的角色挑一条线读即可。
      </>
    ),
    enter: '开始阅读',
    site: '打开 AniBT',
    sectionsLabel: '从这里开始',
    features: [
      {
        title: '字幕组入驻',
        desc: '申请流程、身份审核与发布权限。',
        href: '/docs/apply',
        icon: Users,
      },
      {
        title: '站点同步',
        desc: 'Nyaa、萌番组、末日站、Mikan、ACG.rip 一键分发。',
        href: '/docs/site-sync',
        icon: Radio,
      },
      {
        title: 'Open API & RSS',
        desc: '发布接口、单番剧 RSS、订阅 feed 与集成示例。',
        href: '/docs/open-api',
        icon: Rss,
      },
      {
        title: '字幕组图床',
        desc: 'Web 上传，直出加速链接与 BBCode / Markdown / HTML。',
        href: '/docs/image-host',
        icon: ImageIcon,
      },
    ],
    docs: '完整文档',
    docsDesc: '入驻、Tracker、账号会话、LLM 对接与更新日志。',
    contact: '需要帮助？',
    contactDesc: '发邮件到 support@anibt.net',
  },
  'zh-Hant': {
    badge: '面向動漫與字幕組的公共 BT 站文件',
    title: (
      <>
        寫清楚怎麼發、
        <br className="max-md:hidden" />
        怎麼追、怎麼接 <span className="text-[var(--anibt-brand)]">API</span>。
      </>
    ),
    intro: (
      <>
        <span className="font-medium text-[var(--anibt-brand)]">AniBT Wiki</span>{' '}
        是字幕組發布、站點同步、Tracker 與 Open API 的使用說明。依你的角色挑一條線讀即可。
      </>
    ),
    enter: '開始閱讀',
    site: '開啟 AniBT',
    sectionsLabel: '從這裡開始',
    features: [
      {
        title: '字幕組入駐',
        desc: '申請流程、身分審核與發布權限。',
        href: '/docs/apply',
        icon: Users,
      },
      {
        title: '站點同步',
        desc: 'Nyaa、萌番組、末日站、Mikan、ACG.rip 一鍵分發。',
        href: '/docs/site-sync',
        icon: Radio,
      },
      {
        title: 'Open API & RSS',
        desc: '發布介面、單番劇 RSS、訂閱 feed 與整合範例。',
        href: '/docs/open-api',
        icon: Rss,
      },
      {
        title: '字幕組圖床',
        desc: 'Web 上傳，直出加速連結與 BBCode / Markdown / HTML。',
        href: '/docs/image-host',
        icon: ImageIcon,
      },
    ],
    docs: '完整文件',
    docsDesc: '入駐、Tracker、帳號工作階段、LLM 對接與更新日誌。',
    contact: '需要幫助？',
    contactDesc: '寄信到 support@anibt.net',
  },
  en: {
    badge: 'Docs for anime fansub groups & consumers',
    title: (
      <>
        Publish, track, and
        <br className="max-md:hidden" />
        integrate — with clear{' '}
        <span className="text-[var(--anibt-brand)]">docs</span>.
      </>
    ),
    intro: (
      <>
        <span className="font-medium text-[var(--anibt-brand)]">AniBT Wiki</span>{' '}
        covers group publishing, multi-site sync, Tracker, and Open API. Pick the
        path that matches your role.
      </>
    ),
    enter: 'Get started',
    site: 'Open AniBT',
    sectionsLabel: 'Start here',
    features: [
      {
        title: 'Group onboarding',
        desc: 'Application flow, review, and publish permissions.',
        href: '/docs/apply',
        icon: Users,
      },
      {
        title: 'Site sync',
        desc: 'Distribute to Nyaa, Bangumi, ACGNX, Mikan, and ACG.rip.',
        href: '/docs/site-sync',
        icon: Radio,
      },
      {
        title: 'Open API & RSS',
        desc: 'Publish endpoints, anime RSS, private feeds, and examples.',
        href: '/docs/open-api',
        icon: Rss,
      },
      {
        title: 'Image host',
        desc: 'Web upload with CDN links, BBCode, Markdown, and HTML.',
        href: '/docs/image-host',
        icon: ImageIcon,
      },
    ],
    docs: 'Full documentation',
    docsDesc: 'Onboarding, Tracker, auth sessions, LLM surfaces, and changelog.',
    contact: 'Need help?',
    contactDesc: 'Email support@anibt.net',
  },
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = copy[lang as keyof typeof copy] ?? copy['zh-CN'];

  return (
    <main className="pt-4 pb-10 text-fd-foreground md:pb-16">
      {/* Hero — Fumadocs-style bordered panel */}
      <div className="relative mx-4 flex min-h-[min(70vh,560px)] w-[calc(100%-2rem)] max-w-[1400px] overflow-hidden rounded-2xl border bg-fd-card/40 bg-origin-border max-md:min-h-[480px] lg:mx-auto">
        <div
          className="pointer-events-none absolute inset-0 -z-1"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,color-mix(in_srgb,var(--anibt-brand)_18%,transparent),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_20%,color-mix(in_srgb,var(--anibt-brand-2)_14%,transparent),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,var(--color-fd-background))] dark:bg-[linear-gradient(to_bottom,transparent_30%,var(--color-fd-background))]" />
        </div>

        <div className="z-2 flex size-full flex-col px-6 py-10 max-md:items-center max-md:text-center md:p-12">
          <p className="mt-2 w-fit rounded-full border border-[color-mix(in_srgb,var(--anibt-brand)_50%,transparent)] p-2 text-xs font-medium text-[var(--anibt-brand)]">
            {t.badge}
          </p>

          <h1 className="my-8 max-w-3xl text-4xl leading-[1.12] font-medium tracking-tight xl:mb-10 xl:text-5xl">
            {t.title}
          </h1>

          <div className="flex w-fit flex-row flex-wrap items-center justify-center gap-3">
            <Link
              href={localizedPath(lang, '/docs')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--anibt-brand)] px-5 py-3 text-sm font-medium tracking-tight text-[var(--anibt-brand-foreground)] transition-colors hover:bg-[var(--anibt-brand-hover)] max-sm:text-sm"
            >
              <BookOpen className="size-4" aria-hidden="true" />
              {t.enter}
            </Link>
            <a
              href="https://anibt.net"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full border bg-fd-secondary px-5 py-3 text-sm font-medium tracking-tight text-fd-secondary-foreground transition-colors hover:bg-fd-accent max-sm:text-sm"
            >
              {t.site}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mx-auto mt-12 grid w-full max-w-[1400px] grid-cols-1 gap-6 px-6 md:mt-16 md:grid-cols-2 md:gap-8 md:px-12 lg:grid-cols-2">
        <p className="col-span-full max-w-4xl text-2xl leading-snug font-light tracking-tight text-fd-muted-foreground md:text-3xl">
          {t.intro}
        </p>

        <div className="col-span-full mt-2 flex items-center gap-3">
          <h2 className="text-sm font-medium tracking-tight text-fd-foreground">
            {t.sectionsLabel}
          </h2>
          <div className="h-px flex-1 bg-fd-border" />
        </div>

        {t.features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.href}
              href={localizedPath(lang, feature.href)}
              className="group rounded-2xl border bg-fd-card p-6 text-sm shadow-lg transition-colors hover:bg-fd-accent/40"
            >
              <Icon
                className="mb-4 size-5 text-[var(--anibt-brand)]"
                aria-hidden="true"
              />
              <h3 className="mb-2 text-xl font-medium tracking-tight lg:text-2xl">
                {feature.title}
              </h3>
              <p className="mb-4 text-fd-muted-foreground">{feature.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--anibt-brand)] opacity-80 transition-opacity group-hover:opacity-100">
                {t.enter}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          );
        })}

        <Link
          href={localizedPath(lang, '/docs')}
          className="group rounded-2xl border bg-fd-card p-6 text-sm shadow-lg transition-colors hover:bg-fd-accent/40 md:col-span-1"
        >
          <BookOpen
            className="mb-4 size-5 text-[var(--anibt-brand)]"
            aria-hidden="true"
          />
          <h3 className="mb-2 text-xl font-medium tracking-tight lg:text-2xl">
            {t.docs}
          </h3>
          <p className="text-fd-muted-foreground">{t.docsDesc}</p>
        </Link>

        <a
          href="mailto:support@anibt.net"
          className="group rounded-2xl border bg-fd-card p-6 text-sm shadow-lg transition-colors hover:bg-fd-accent/40"
        >
          <h3 className="mb-2 text-xl font-medium tracking-tight lg:text-2xl">
            {t.contact}
          </h3>
          <p className="text-fd-muted-foreground">{t.contactDesc}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--anibt-brand)]">
            support@anibt.net
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </a>
      </div>
    </main>
  );
}
