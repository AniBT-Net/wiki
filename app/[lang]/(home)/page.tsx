import { localizedPath } from '@/lib/i18n';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const copy = {
  'zh-CN': {
    enter: '进入 Wiki',
    site: '回到 AniBT',
  },
  'zh-Hant': {
    enter: '進入 Wiki',
    site: '回到 AniBT',
  },
  en: {
    enter: 'Enter Wiki',
    site: 'Back to AniBT',
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
    <main className="anibt-home">
      <div className="anibt-home-bg" aria-hidden="true">
        <div className="anibt-home-grid" />
        <div className="anibt-home-glow anibt-home-glow-a" />
        <div className="anibt-home-glow anibt-home-glow-b" />
        <div className="anibt-home-ring" />
      </div>

      <div className="anibt-home-stage">
        <h1 className="anibt-home-title">
          <span>Ani</span>
          <em>BT</em>
          <span>Wiki</span>
          <i className="anibt-home-title-dot" aria-hidden="true" />
        </h1>

        <div className="anibt-home-actions">
          <Link
            href={localizedPath(lang, '/docs')}
            className="anibt-home-btn anibt-home-btn-primary"
          >
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
    </main>
  );
}
