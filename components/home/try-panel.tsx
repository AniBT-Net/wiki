'use client';

import { CopyIconButton } from '@/components/home/copy-button';
import type { HomeCopy } from '@/lib/home';
import { Fragment, useRef, useState } from 'react';

type Token = { v: string; c?: 'c' | 'k' | 's' | 'u' };
type Line = Token[];

function pathCell(path: string): string {
  return path.padEnd(26, ' ');
}

function buildTabs(t: HomeCopy['tryPanel']): Line[][] {
  const season: Line[] = [
    [{ v: `# ${t.readNoAuth}`, c: 'c' }],
    [
      { v: 'curl ', c: 'k' },
      { v: 'https://anibt.net/api/seasons/anime', c: 'u' },
    ],
    [],
    [{ v: '{' }],
    [{ v: '  ' }, { v: '"ok"', c: 's' }, { v: ': true,' }],
    [{ v: '  ' }, { v: '"data"', c: 's' }, { v: ': {' }],
    [
      { v: '    ' },
      { v: '"currentSeason"', c: 's' },
      { v: ': ' },
      { v: '"2026夏"', c: 's' },
      { v: ',' },
    ],
    [{ v: '    ' }, { v: '"total"', c: 's' }, { v: ': 91,' }],
    [{ v: '    ' }, { v: '"byWeekday"', c: 's' }, { v: ': [{' }],
    [
      { v: '      ' },
      { v: '"weekdayLabel"', c: 's' },
      { v: ': ' },
      { v: '"周一"', c: 's' },
      { v: ',' },
    ],
    [
      { v: '      ' },
      { v: '"animes"', c: 's' },
      { v: ': [{ ' },
      { v: '"bgmId"', c: 's' },
      { v: ': 646464, ' },
      { v: '"hasRelease"', c: 's' },
      { v: ': true, … }]' },
    ],
    [{ v: '    }, …]' }],
    [{ v: '  }' }],
    [{ v: '}' }],
  ];

  const feeds: Line[] = [
    [{ v: `# ${t.oneFeed}`, c: 'c' }],
    [
      {
        v: 'https://anibt.net/rss/anime.xml?bgmId=646464&groupSlug=lolihouse',
        c: 'u',
      },
    ],
    [],
    [{ v: `# ${t.qbSubscribe}`, c: 'c' }],
    [{ v: `# ${t.qbRule}`, c: 'c' }],
    [],
    [{ v: `# ${t.otherFeeds}`, c: 'c' }],
    [
      { v: pathCell('/rss/magnets.xml'), c: 'u' },
      { v: t.feedAll, c: 'c' },
    ],
    [
      { v: pathCell('/rss/group/{slug}.xml'), c: 'u' },
      { v: t.feedGroup, c: 'c' },
    ],
    [
      { v: pathCell('/rss/subscriptions.xml'), c: 'u' },
      { v: t.feedMine, c: 'c' },
    ],
  ];

  const publish: Line[] = [
    [{ v: `# ${t.publishNeedsKey}`, c: 'c' }],
    [
      { v: 'curl', c: 'k' },
      { v: ' -X POST ' },
      { v: 'https://anibt.net/api/releases/publish', c: 'u' },
      { v: ' \\' },
    ],
    [
      { v: '  -H ' },
      { v: '"Authorization: Bearer $ANIBT_API_KEY"', c: 's' },
      { v: ' \\' },
    ],
    [{ v: '  -F ' }, { v: '"torrent=@ep05.torrent"', c: 's' }, { v: ' \\' }],
    [{ v: '  -F ' }, { v: '"bgmId=646464"', c: 's' }],
    [],
    [{ v: `# ${t.checkSync}`, c: 'c' }],
    [
      { v: 'curl', c: 'k' },
      { v: ' ' },
      { v: 'https://anibt.net/api/releases/{releaseId}/sync-status', c: 'u' },
      { v: ' \\' },
    ],
    [{ v: '  -H ' }, { v: '"Authorization: Bearer $ANIBT_API_KEY"', c: 's' }],
  ];

  return [season, feeds, publish];
}

export function TryPanel({
  t,
  copyLabel,
  copiedLabel,
}: {
  t: HomeCopy['tryPanel'];
  copyLabel: string;
  copiedLabel: string;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bodies = buildTabs(t);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = t.tabs.length - 1;
    let next = active;

    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;

    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="try">
      <div className="top">
        <span className="tag">{t.tag}</span>
        <div className="cmd">
          <span className="ell">{t.command}</span>
          <CopyIconButton
            value={t.command}
            label={copyLabel}
            copiedLabel={copiedLabel}
          />
        </div>
      </div>

      <div className="term">
        <div className="tabs" role="tablist" onKeyDown={onKeyDown}>
          {t.tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`wk-tab-${index}`}
              aria-selected={index === active}
              aria-controls="wk-term-body"
              tabIndex={index === active ? 0 : -1}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              onClick={() => setActive(index)}
            >
              {tab}
            </button>
          ))}
        </div>
        <pre
          id="wk-term-body"
          role="tabpanel"
          aria-labelledby={`wk-tab-${active}`}
          tabIndex={0}
        >
          {bodies[active].map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {line.map((token, tokenIndex) =>
                token.c ? (
                  <span key={tokenIndex} className={token.c}>
                    {token.v}
                  </span>
                ) : (
                  <Fragment key={tokenIndex}>{token.v}</Fragment>
                ),
              )}
              {'\n'}
            </Fragment>
          ))}
        </pre>
      </div>
    </div>
  );
}
