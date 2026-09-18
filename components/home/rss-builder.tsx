'use client';

import { CopyIconButton } from '@/components/home/copy-button';
import type { HomeCopy, RssKind } from '@/lib/home';
import Link from 'next/link';
import { Fragment, useState } from 'react';

const BASE = 'https://anibt.net';
const SAMPLE_BGM_ID = '646464';

type Segment = { text: string; accent?: boolean };

function buildFeed(kind: RssKind, slug: string | null): Segment[] {
  if (kind === 'group') {
    return [
      { text: `${BASE}/rss/group/` },
      { text: slug ?? '', accent: true },
      { text: '.xml' },
    ];
  }

  if (kind === 'all') return [{ text: `${BASE}/rss/magnets.xml` }];
  if (kind === 'mine') return [{ text: `${BASE}/rss/subscriptions.xml` }];

  const segments: Segment[] = [
    { text: `${BASE}/rss/anime.xml?bgmId=` },
    { text: SAMPLE_BGM_ID, accent: true },
  ];

  if (slug) {
    segments.push({ text: '&groupSlug=' }, { text: slug, accent: true });
  }

  return segments;
}

export function RssBuilder({
  t,
  copyLabel,
  copiedLabel,
  docsHref,
  clientHref,
}: {
  t: HomeCopy['rssPanel'];
  copyLabel: string;
  copiedLabel: string;
  docsHref: string;
  clientHref: string;
}) {
  const [kind, setKind] = useState<RssKind>('anime');
  const [slug, setSlug] = useState<string | null>(t.groups[0].slug);

  const groupsDisabled = kind === 'all' || kind === 'mine';
  const fallbackSlug = t.groups.find((group) => group.slug)?.slug ?? null;
  const effectiveSlug = kind === 'group' ? (slug ?? fallbackSlug) : slug;
  const segments = buildFeed(kind, effectiveSlug);
  const url = segments.map((segment) => segment.text).join('');

  return (
    <div className="rssb">
      <div className="row" role="group" aria-label={t.kindLabel}>
        <b>{t.kindLabel}</b>
        {t.kinds.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`chip${option.id === kind ? ' on' : ''}`}
            aria-pressed={option.id === kind}
            onClick={() => setKind(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="row" role="group" aria-label={t.groupLabel}>
        <b>{t.groupLabel}</b>
        {t.groups.map((group) => {
          const disabled =
            groupsDisabled || (kind === 'group' && group.slug === null);

          return (
            <button
              key={group.label}
              type="button"
              className={`chip${!disabled && group.slug === effectiveSlug ? ' on' : ''}`}
              aria-pressed={!disabled && group.slug === effectiveSlug}
              disabled={disabled}
              onClick={() => setSlug(group.slug)}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <div className="out">
        <code>
          {segments.map((segment, index) =>
            segment.accent ? (
              <var key={index}>{segment.text}</var>
            ) : (
              <Fragment key={index}>{segment.text}</Fragment>
            ),
          )}
        </code>
        <CopyIconButton
          value={url}
          label={copyLabel}
          copiedLabel={copiedLabel}
        />
      </div>

      <div className="row">
        <Link className="btn sm pri" href={docsHref}>
          {t.docsCta}
        </Link>
        <Link className="btn sm" href={clientHref}>
          {t.clientCta}
        </Link>
      </div>
    </div>
  );
}
