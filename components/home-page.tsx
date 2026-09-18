import { BrandLogo } from '@/components/brand-logo';
import { homeCopy, homeHref, type HomeCopy } from '@/lib/home';
import Link from 'next/link';

export function HomePage({ locale }: { locale: string }) {
  const t = homeCopy(locale);

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,_#fbe4ec_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,_#3a2030_0%,_transparent_70%)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16 sm:py-24">
        <Hero t={t} locale={locale} />
        <Roles t={t} locale={locale} />
        <Start t={t} locale={locale} />
      </div>
    </div>
  );
}

function Hero({ t, locale }: { t: HomeCopy; locale: string }) {
  return (
    <section className="flex flex-col items-start gap-8">
      <BrandLogo heightClassName="h-16 sm:h-20" />
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-fd-primary text-sm font-medium tracking-wide">
          {t.kicker}
        </p>
        <h1 className="text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-4xl">
          {t.title}
        </h1>
        <p className="text-fd-muted-foreground text-base leading-relaxed sm:text-lg">
          {t.lead}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={homeHref(locale, '/docs')}
          className="bg-fd-primary text-fd-primary-foreground inline-flex h-10 items-center rounded-full px-5 text-sm font-medium shadow-[0_14px_34px_#3a102033] transition-opacity hover:opacity-90"
        >
          {t.primaryCta}
        </Link>
        <Link
          href={homeHref(locale, '/docs/open-api')}
          className="border-fd-border bg-fd-background text-fd-foreground inline-flex h-10 items-center rounded-full border px-5 text-sm font-medium hover:bg-fd-accent"
        >
          {t.secondaryCta}
        </Link>
        <a
          href="https://anibt.net"
          className="text-fd-muted-foreground hover:text-fd-foreground inline-flex h-10 items-center px-2 text-sm font-medium"
        >
          {t.siteCta}
        </a>
      </div>
    </section>
  );
}

function Roles({ t, locale }: { t: HomeCopy; locale: string }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold">{t.rolesHeading}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {t.roles.map((role) => (
          <Link
            key={role.title}
            href={homeHref(locale, role.href)}
            className="border-fd-border bg-fd-card hover:border-fd-primary/40 group flex flex-col gap-3 rounded-2xl border p-5 shadow-[0_14px_34px_#3a102014] transition-colors"
          >
            <h3 className="font-semibold">{role.title}</h3>
            <p className="text-fd-muted-foreground text-sm leading-relaxed">
              {role.body}
            </p>
            <span className="text-fd-primary mt-auto text-sm font-medium group-hover:underline">
              {role.link}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Start({ t, locale }: { t: HomeCopy; locale: string }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold">{t.startHeading}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {t.start.map((item) => (
          <Link
            key={item.title}
            href={homeHref(locale, item.href)}
            className="border-fd-border hover:bg-fd-accent/60 flex items-start justify-between gap-4 rounded-xl border px-4 py-3"
          >
            <span>
              <span className="block text-sm font-medium">{item.title}</span>
              <span className="text-fd-muted-foreground mt-1 block text-sm">
                {item.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
