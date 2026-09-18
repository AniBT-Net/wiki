'use client';

import { BrandLogo } from '@/components/brand-logo';
import { homeCopy, homeHref, type HomeCopy } from '@/lib/home';
import { Check, Copy, ExternalLink, Radio, Sparkles, Terminal, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const TRACKER_ANNOUNCE = 'https://tracker.anibt.net/announce';

export function HomePage({ locale }: { locale: string }) {
  const t = homeCopy(locale);

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,_#fbe4ec_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,_#3a1a2b_0%,_transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-12 sm:py-20">
        <Hero t={t} locale={locale} />
        <TrackerBar t={t} />
        <Roles t={t} locale={locale} />
        <Features t={t} />
        <Start t={t} locale={locale} />
      </div>
    </div>
  );
}

function Hero({ t, locale }: { t: HomeCopy; locale: string }) {
  return (
    <section className="flex flex-col items-start gap-6 pt-4">
      <div className="flex items-center gap-3">
        <BrandLogo heightClassName="h-14 sm:h-18" />
        <span className="rounded-full bg-fd-primary/10 px-3 py-1 text-xs font-semibold text-fd-primary dark:bg-fd-primary/20">
          Wiki & Docs
        </span>
      </div>

      <div className="flex max-w-3xl flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl lg:text-5xl lg:leading-tight">
          {t.title}
        </h1>
        <p className="text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
          {t.lead}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href={homeHref(locale, '/docs')}
          className="inline-flex h-10 items-center rounded-lg bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground shadow-md transition hover:opacity-90 active:scale-[0.99]"
        >
          {t.primaryCta}
        </Link>
        <Link
          href={homeHref(locale, '/docs/open-api')}
          className="inline-flex h-10 items-center rounded-lg border border-fd-border bg-fd-card px-5 text-sm font-medium text-fd-foreground shadow-sm transition hover:bg-fd-accent"
        >
          {t.secondaryCta}
        </Link>
        <a
          href="https://anibt.net"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-1.5 px-3 text-sm font-medium text-fd-muted-foreground transition hover:text-fd-foreground"
        >
          {t.siteCta}
        </a>
      </div>
    </section>
  );
}

function TrackerBar({ t }: { t: HomeCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TRACKER_ANNOUNCE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-fd-border/80 bg-fd-card/70 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
          <Radio className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xs font-medium text-fd-muted-foreground">
            {t.trackerTitle}
          </div>
          <code className="text-sm font-semibold tracking-tight text-fd-foreground font-mono">
            {TRACKER_ANNOUNCE}
          </code>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center">
        <span className="hidden text-xs text-fd-muted-foreground lg:inline">
          {t.trackerHelp}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 text-xs font-medium text-fd-foreground transition hover:bg-fd-accent"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>{t.trackerCopied}</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>复制地址</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Roles({ t, locale }: { t: HomeCopy; locale: string }) {
  const roleIcons = [
    <Users key="sub" className="h-5 w-5 text-fd-primary" />,
    <Radio key="rss" className="h-5 w-5 text-sky-500" />,
    <Terminal key="api" className="h-5 w-5 text-emerald-500" />,
  ];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-fd-foreground sm:text-2xl">
          {t.rolesHeading}
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {t.roles.map((role, idx) => (
          <Link
            key={role.title}
            href={homeHref(locale, role.href)}
            className="group relative flex flex-col justify-between rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm transition hover:border-fd-primary/50 hover:shadow-md"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fd-muted">
                  {roleIcons[idx] ?? <Sparkles className="h-5 w-5" />}
                </span>
                <span className="rounded-md bg-fd-muted/80 px-2 py-0.5 text-xs font-medium text-fd-muted-foreground">
                  {role.tag}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                  {role.body}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1 text-sm font-medium text-fd-primary">
              <span>{role.link}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Features({ t }: { t: HomeCopy }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-bold tracking-tight text-fd-foreground sm:text-2xl">
        {t.featuresHeading}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.map((feat) => (
          <div
            key={feat.title}
            className="flex flex-col gap-2 rounded-xl border border-fd-border/70 bg-fd-card/50 p-5"
          >
            <div className="font-semibold text-fd-foreground text-base">
              {feat.title}
            </div>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Start({ t, locale }: { t: HomeCopy; locale: string }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-bold tracking-tight text-fd-foreground sm:text-2xl">
        {t.startHeading}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {t.start.map((item) => (
          <Link
            key={item.title}
            href={homeHref(locale, item.href)}
            className="group flex flex-col justify-between rounded-xl border border-fd-border bg-fd-card/60 p-4 transition hover:bg-fd-accent hover:border-fd-primary/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors">
                  {item.title}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-1 text-xs leading-normal text-fd-muted-foreground">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
