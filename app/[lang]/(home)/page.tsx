import { localizedPath } from '@/lib/i18n';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const copy = {
  'zh-CN': {
    kicker: '字幕组手册 · 公开接口',
    enter: '进入文档',
    site: 'AniBT 主站',
  },
  'zh-Hant': {
    kicker: '字幕組手冊 · 公開介面',
    enter: '進入文件',
    site: 'AniBT 主站',
  },
  en: {
    kicker: 'Group handbook · Public API',
    enter: 'Open docs',
    site: 'AniBT',
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
        <div className="anibt-home-grain" />
        <div className="anibt-home-glow anibt-home-glow-a" />
        <div className="anibt-home-glow anibt-home-glow-b" />
      </div>

      <div className="anibt-home-stage">
        <p className="anibt-home-kicker">{t.kicker}</p>
        <h1 className="anibt-home-title">
          <span>Ani</span>
          <em>BT</em>
          <span>Wiki</span>
        </h1>
        <i className="anibt-home-rule" aria-hidden="true" />

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
