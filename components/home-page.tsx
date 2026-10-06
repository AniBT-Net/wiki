import { CopyTextButton } from '@/components/home/copy-button';
import { RssBuilder } from '@/components/home/rss-builder';
import { Sparkle } from '@/components/home/sparkle';
import { TryPanel } from '@/components/home/try-panel';
import type { ChangelogEntry } from '@/lib/changelog';
import { homeCopy, homeHref } from '@/lib/home';
import { llmMarkdownPath } from '@/lib/i18n';
import { navLabels } from '@/lib/layout.shared';
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  ChevronRight,
  RadioTower,
  RefreshCw,
  Rss,
  Search,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

const TRACKER_ANNOUNCE = 'https://tracker.anibt.net/announce';

/** 面板头：一枚倾斜的贴纸图标 + 16/800 标题 + 一句说明。 */
function PanelHead({
  icon,
  tone = 'pink',
  tilt = '-4deg',
  title,
  lead,
}: {
  icon: ReactNode;
  tone?: 'pink' | 'blue';
  tilt?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="ph">
      <div className="ph-row">
        <span
          className={`mark ${tone === 'blue' ? 'is-blue' : ''}`}
          style={{ '--tilt': tilt } as CSSProperties}
          aria-hidden="true"
        >
          {icon}
        </span>
        <h3>{title}</h3>
      </div>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}

export function HomePage({
  locale,
  changelog,
}: {
  locale: string;
  changelog: ChangelogEntry[];
}) {
  const t = homeCopy(locale);
  const nav = navLabels[locale as keyof typeof navLabels] ?? navLabels['zh-CN'];

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
      <div className="wrap">
        <section className="whero">
          <div className="copy">
            <span className="kick a-sticker a-sticker-candy">
              <Sparkle className="kick-spark" />
              {t.heroPill}
            </span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroLead}</p>
            <div className="cta">
              <Link
                className="a-btn a-btn-primary a-btn-lg"
                href={homeHref(locale, '/docs')}
              >
                {t.heroPrimary}
              </Link>
              <Link
                className="a-btn a-btn-lg"
                href={homeHref(locale, '/docs/open-api')}
              >
                {t.heroSecondary}
              </Link>
            </div>
          </div>

          <div className="art" aria-hidden="true">
            <img
              className="logo"
              src="/brand/anibt-logo@2x.webp"
              alt=""
              width={960}
              height={488}
              decoding="async"
              fetchPriority="high"
            />
            <Sparkle className="s1" />
            <Sparkle tone="blue" className="s2" />
            <Sparkle className="s3" />
          </div>

          {/* 文档页的缩影：与真正的文档页同一套顶栏、胶带、步骤贴纸与目录。 */}
          <div className="shot" aria-hidden="true">
            <div className="sbar">
              <img
                src="/brand/anibt-logo.webp"
                alt=""
                width={480}
                height={244}
                loading="lazy"
                decoding="async"
              />
              <span className="snav on">
                {nav.docs}
                <i className="a-tape" />
              </span>
              <span className="snav">{nav.api}</span>
              <span className="sfield">
                <Search className="i" />
                <span className="ell">{t.shot.search}</span>
                <span className="skbd">⌘K</span>
              </span>
            </div>
            <div className="sbody">
              <div className="sb">
                <small>{t.shot.section}</small>
                {t.shot.nav.map((item, index) => (
                  <span key={item} className={index === 0 ? 'item on' : 'item'}>
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
                <div className="step">
                  <span className="n">1</span>
                  <h3>{t.shot.heading}</h3>
                </div>
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
          </div>
        </section>

        <section className="state">
          <p>
            {t.statement.map((part, index) =>
              part.accent ? (
                <b key={index}>{part.text}</b>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </p>
        </section>

        <div className="bento">
          <section className="pn c12 tryp">
            <TryPanel
              t={t.tryPanel}
              copyLabel={t.copyLabel}
              copiedLabel={t.copiedLabel}
            />
          </section>

          <section className="pn c5">
            <PanelHead
              icon={<RefreshCw />}
              title={t.syncPanel.title}
              lead={t.syncPanel.lead}
            />
            <div className="srows">
              {t.syncPanel.rows.map((row) => (
                <Link
                  key={row.slug}
                  href={homeHref(locale, `/docs/site-sync/${row.slug}`)}
                >
                  <b>{row.name}</b>
                  <span className="dom">{row.domain}</span>
                  <ChevronRight className="i" />
                </Link>
              ))}
            </div>
          </section>

          <section className="pn c7">
            <PanelHead
              icon={<Rss />}
              tilt="5deg"
              title={t.rssPanel.title}
              lead={t.rssPanel.lead}
            />
            <RssBuilder
              t={t.rssPanel}
              copyLabel={t.copyLabel}
              copiedLabel={t.copiedLabel}
              docsHref={homeHref(locale, '/docs/open-api/rss-anime')}
              clientHref={homeHref(locale, '/docs/open-api/examples')}
            />
          </section>

          <section className="pn c8 ann">
            <PanelHead
              icon={<RadioTower />}
              tone="blue"
              title={t.trackerPanel.title}
            />
            <code>{TRACKER_ANNOUNCE}</code>
            <p className="lead">{t.trackerPanel.lead}</p>
            <div className="row">
              <CopyTextButton
                value={TRACKER_ANNOUNCE}
                label={t.trackerPanel.copyCta}
                copiedLabel={t.copiedLabel}
                className="a-btn a-btn-primary"
              />
              <Link className="a-btn" href={homeHref(locale, '/docs/tracker')}>
                {t.trackerPanel.docsCta}
              </Link>
            </div>
          </section>

          <section className="pn c4">
            <PanelHead
              icon={<Bot />}
              tilt="4deg"
              title={t.llmPanel.title}
              lead={t.llmPanel.lead}
            />
            <div className="llm">
              {t.llmPanel.lines.map((line) => {
                const path =
                  line.path === 'page-md' ? llmMarkdownPath(locale) : line.path;

                return (
                  <span key={path}>
                    <i># {line.comment}</i>
                    <a href={path}>{path}</a>
                  </span>
                );
              })}
            </div>
            <div className="grow" />
            <Link
              className="a-btn a-btn-sm more"
              href={homeHref(locale, '/docs/llm')}
            >
              {t.llmPanel.cta}
              <ChevronRight className="i" />
            </Link>
          </section>

          <section className="pn c6">
            <PanelHead
              icon={<Wrench />}
              title={t.kitPanel.title}
              lead={t.kitPanel.lead}
            />
            <div className="kit">
              {t.kitPanel.tiles.map((tile) =>
                tile.external ? (
                  <a
                    key={tile.title}
                    href={tile.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <b>
                      {tile.title}
                      <ArrowUpRight className="ext" aria-hidden="true" />
                    </b>
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
            <PanelHead
              icon={<CalendarDays />}
              tone="blue"
              tilt="4deg"
              title={t.changelogPanel.title}
              lead={t.changelogPanel.lead}
            />
            <div className="clogs">
              {changelog.map((entry) => (
                <div key={`${entry.date}-${entry.title}`} className="clog">
                  <time dateTime={entry.date}>{entry.date}</time>
                  <div>
                    <b>{entry.title}</b>
                    <p>{entry.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grow" />
            <Link
              className="a-btn a-btn-sm more"
              href={homeHref(locale, '/docs/changelog')}
            >
              {t.changelogPanel.cta}
              <ChevronRight className="i" />
            </Link>
          </section>
        </div>

        <section className="endp">
          <div className="peek">
            <img
              className="girl"
              src="/brand/mascot.webp"
              alt=""
              width={490}
              height={490}
              loading="lazy"
              decoding="async"
            />
            <Sparkle className="p1" />
            <Sparkle tone="blue" className="p2" />
            <div className="note">
              <h2>{t.closing.title}</h2>
              <div className="cta">
                <Link
                  className="a-btn a-btn-primary a-btn-lg"
                  href={homeHref(locale, '/docs')}
                >
                  {t.closing.primary}
                </Link>
                <Link
                  className="a-btn a-btn-lg"
                  href={homeHref(locale, '/docs/apply')}
                >
                  {t.closing.apply}
                </Link>
                <Link
                  className="a-btn a-btn-lg"
                  href={homeHref(locale, '/docs/contact')}
                >
                  {t.closing.contact}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
