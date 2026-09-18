import { CopyTextButton } from '@/components/home/copy-button';
import {
  Deco,
  type DecoItem,
  Sea,
  SceneSprite,
  Spark,
} from '@/components/home/scene-art';
import { RssBuilder } from '@/components/home/rss-builder';
import { TryPanel } from '@/components/home/try-panel';
import type { ChangelogEntry } from '@/lib/changelog';
import { homeCopy, homeHref } from '@/lib/home';
import { ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const TRACKER_ANNOUNCE = 'https://tracker.anibt.net/announce';

const HERO_DECO: DecoItem[] = [
  { kind: 'cl', w: 230, left: '3%', top: '10%', d: '70s' },
  { kind: 'cl', w: 150, left: '38%', top: '5%', d: '55s' },
  { kind: 'cl', w: 280, right: '-40px', top: '52%', d: '80s' },
  { kind: 'cl', w: 170, left: '-30px', top: '58%', d: '64s' },
  { kind: 'sp', w: 30, left: '56%', top: '16%' },
  { kind: 'sp', w: 18, left: '61%', top: '30%', d: '2.4s' },
  { kind: 'sp', w: 22, right: '5%', top: '12%', d: '4s' },
  { kind: 'sp', w: 16, left: '30%', top: '50%', d: '2.8s' },
  { kind: 'ht', w: 26, right: '31%', top: '40%' },
  { kind: 'ht', w: 16, right: '28%', top: '33%', r: '14deg' },
  { kind: 'bb', w: 26, left: '8%', bottom: '110px' },
  { kind: 'bb', w: 14, left: '11%', bottom: '150px' },
  { kind: 'bb', w: 20, right: '7%', bottom: '120px' },
];

const TRY_DECO: DecoItem[] = [
  { kind: 'sp', w: 34, left: '5%', top: '14%' },
  { kind: 'sp', w: 18, left: '10%', top: '32%', d: '2.5s' },
  { kind: 'ht', w: 30, left: '7%', bottom: '16%' },
  { kind: 'ht', w: 22, right: '8%', top: '16%', r: '16deg' },
  { kind: 'sp', w: 28, right: '6%', bottom: '18%', d: '3.6s' },
  { kind: 'sp', w: 16, right: '12%', bottom: '34%' },
];

const RSS_DECO: DecoItem[] = [
  { kind: 'cl', w: 150, right: '12%', top: '7%', d: '50s' },
  { kind: 'cl', w: 120, left: '4%', top: '44%', d: '66s' },
  { kind: 'sp', w: 20, right: '8%', top: '12%' },
];

const TRACKER_DECO: DecoItem[] = [
  { kind: 'sp', w: 40, right: '9%', top: '16%' },
  { kind: 'sp', w: 20, right: '20%', top: '34%', d: '2.6s' },
  { kind: 'ht', w: 34, right: '12%', bottom: '18%' },
  { kind: 'sp', w: 24, right: '27%', bottom: '14%', d: '4s' },
];

const CLOSING_DECO: DecoItem[] = [
  { kind: 'cl', w: 200, left: '42%', top: '12%', d: '60s' },
  { kind: 'cl', w: 130, right: '3%', top: '48%', d: '72s' },
  { kind: 'sp', w: 24, left: '36%', top: '22%' },
  { kind: 'bb', w: 20, left: '4%', bottom: '84px' },
];

export function HomePage({
  locale,
  changelog,
}: {
  locale: string;
  changelog: ChangelogEntry[];
}) {
  const t = homeCopy(locale);

  const scale = {
    '--h1-min': t.h1Scale.min,
    '--h1-vw': t.h1Scale.vw,
    '--h1-vw-sm': t.h1Scale.vwSm,
    '--h1-max': t.h1Scale.max,
    '--h2-min': t.h2Scale.min,
    '--h2-vw': t.h2Scale.vw,
    '--h2-max': t.h2Scale.max,
  } as CSSProperties;

  return (
    <div className="wk" style={scale}>
      <SceneSprite />

      <div className="wframe">
        <section className="scene whero">
          <Deco items={HERO_DECO} />

          <div>
            <span className="pill">
              <Spark />
              {t.heroPill}
            </span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroLead}</p>
            <div className="cta">
              <Link className="btn pri" href={homeHref(locale, '/docs')}>
                {t.heroPrimary}
              </Link>
              <Link className="btn" href={homeHref(locale, '/docs/open-api')}>
                {t.heroSecondary}
              </Link>
            </div>
          </div>

          <img
            className="mascot"
            src="/brand/anibt-logo@2x.webp"
            alt="AniBT"
            width={960}
            height={488}
            decoding="async"
            fetchPriority="high"
          />

          <div className="shot" aria-hidden="true">
            <div className="sb">
              <img
                src="/brand/anibt-logo.webp"
                alt=""
                width={480}
                height={244}
                loading="lazy"
                decoding="async"
              />
              <span className="field">
                <Search className="i" />
                {t.shot.search}
                <span className="kbd" style={{ marginLeft: 'auto' }}>
                  Ctrl K
                </span>
              </span>
              <small>{t.shot.section}</small>
              {t.shot.nav.map((item, index) => (
                <span
                  key={item}
                  className={index === 0 ? 'item on' : 'item'}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="ct">
              <h2>{t.shot.title}</h2>
              <p>{t.shot.description}</p>
              <div className="acts">
                {t.shot.acts.map((act) => (
                  <span key={act} className="chip">
                    {act}
                  </span>
                ))}
              </div>
              <h3>{t.shot.heading}</h3>
            </div>
            <div className="tc">
              <b>{t.shot.tocTitle}</b>
              {t.shot.toc.map((item, index) => (
                <span key={item} className={index === 0 ? 'on' : undefined}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Sea />
        </section>
      </div>

      <section className="state">
        <div className="wrap">
          <p>
            {t.statement.map((part, index) =>
              part.accent ? (
                <b key={index}>{part.text}</b>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="bento">
          <section className="pn pink big c12">
            <Deco items={TRY_DECO} />
            <TryPanel
              t={t.tryPanel}
              copyLabel={t.copyLabel}
              copiedLabel={t.copiedLabel}
            />
          </section>

          <section className="pn c5">
            <h3>{t.syncPanel.title}</h3>
            <p>{t.syncPanel.lead}</p>
            <div className="srows">
              {t.syncPanel.rows.map((row) => (
                <Link
                  key={row.slug}
                  href={homeHref(locale, `/docs/site-sync/${row.slug}`)}
                >
                  {row.name}
                  <span>{row.domain}</span>
                </Link>
              ))}
            </div>
          </section>

          <section
            className="pn scene c7"
            style={{ '--sea-h': '56px' } as CSSProperties}
          >
            <Deco items={RSS_DECO} />
            <Sea />
            <h3>{t.rssPanel.title}</h3>
            <p>{t.rssPanel.lead}</p>
            <div className="grow" style={{ minHeight: 24 }} />
            <RssBuilder
              t={t.rssPanel}
              copyLabel={t.copyLabel}
              copiedLabel={t.copiedLabel}
              docsHref={homeHref(locale, '/docs/open-api/rss-anime')}
              clientHref={homeHref(locale, '/docs/open-api/examples')}
            />
          </section>

          <section className="pn cream c8 ann">
            <Deco items={TRACKER_DECO} />
            <h3>{t.trackerPanel.title}</h3>
            <code>{TRACKER_ANNOUNCE}</code>
            <p>{t.trackerPanel.lead}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <CopyTextButton
                value={TRACKER_ANNOUNCE}
                label={t.trackerPanel.copyCta}
                copiedLabel={t.copiedLabel}
              />
              <Link className="btn" href={homeHref(locale, '/docs/tracker')}>
                {t.trackerPanel.docsCta}
              </Link>
            </div>
          </section>

          <section className="pn c4">
            <h3>{t.llmPanel.title}</h3>
            <p>{t.llmPanel.lead}</p>
            <div className="llm">
              {t.llmPanel.lines.map((line) => (
                <span key={line.path}>
                  <i># {line.comment}</i>
                  <br />
                  <a href={line.path}>{line.path}</a>
                </span>
              ))}
            </div>
            <div className="grow" style={{ minHeight: 14 }} />
            <Link className="btn sm" href={homeHref(locale, '/docs/llm')}>
              {t.llmPanel.cta}
              <ChevronRight className="i" />
            </Link>
          </section>

          <section className="pn mint c6">
            <h3>{t.kitPanel.title}</h3>
            <p>{t.kitPanel.lead}</p>
            <div className="kit">
              {t.kitPanel.tiles.map((tile) =>
                tile.external ? (
                  <a
                    key={tile.title}
                    href={tile.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <b>{tile.title}</b>
                    <span>{tile.note}</span>
                  </a>
                ) : (
                  <Link key={tile.title} href={homeHref(locale, tile.href)}>
                    <b>{tile.title}</b>
                    <span>{tile.note}</span>
                  </Link>
                ),
              )}
            </div>
          </section>

          <section className="pn c6">
            <h3>{t.changelogPanel.title}</h3>
            <p>{t.changelogPanel.lead}</p>
            {changelog.map((entry) => (
              <div key={`${entry.date}-${entry.title}`} className="clog">
                <time dateTime={entry.date}>{entry.date}</time>
                <div>
                  <b>{entry.title}</b>
                  <p>{entry.body}</p>
                </div>
              </div>
            ))}
            <div className="grow" />
            <Link
              className="btn sm"
              href={homeHref(locale, '/docs/changelog')}
              style={{ marginTop: 14 }}
            >
              {t.changelogPanel.cta}
              <ChevronRight className="i" />
            </Link>
          </section>
        </div>
      </div>

      <section className="scene endp">
        <Deco items={CLOSING_DECO} />
        <Sea />
        <h2>{t.closing.title}</h2>
        <div className="cta">
          <Link className="btn pri" href={homeHref(locale, '/docs')}>
            {t.closing.primary}
          </Link>
          <Link className="btn" href={homeHref(locale, '/docs/apply')}>
            {t.closing.apply}
          </Link>
          <Link className="btn" href={homeHref(locale, '/docs/contact')}>
            {t.closing.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}
