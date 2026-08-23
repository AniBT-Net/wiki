import { localizedPath } from '@/lib/i18n';
import Link from 'next/link';

const copy = {
  'zh-CN': {
    kicker: 'AniBT 文档',
    enter: '文档',
    site: '主站',
  },
  'zh-Hant': {
    kicker: 'AniBT 文件',
    enter: '文件',
    site: '主站',
  },
  en: {
    kicker: 'AniBT docs',
    enter: 'Docs',
    site: 'Site',
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
      <section className="anibt-home-panel">
        <p className="anibt-home-kicker">{t.kicker}</p>
        <h1 className="anibt-home-title">
          Ani<span>BT</span> Wiki
        </h1>
        <nav className="anibt-home-nav" aria-label={t.enter}>
          <Link href={localizedPath(lang, '/docs')} className="anibt-home-link">
            {t.enter}
          </Link>
          <a
            href="https://anibt.net"
            target="_blank"
            rel="noreferrer"
            className="anibt-home-link anibt-home-link-quiet"
          >
            {t.site}
          </a>
        </nav>
      </section>
      <aside className="anibt-home-rail" aria-hidden="true">
        <span>API</span>
        <span>RSS</span>
        <span>SYNC</span>
      </aside>
    </main>
  );
}
