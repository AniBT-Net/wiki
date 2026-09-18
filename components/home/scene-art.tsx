import type { CSSProperties } from 'react';

type SpriteKind = 'cl' | 'sp' | 'ht' | 'bb';

const SYMBOL: Record<SpriteKind, string> = {
  cl: 'wk-cloud',
  sp: 'wk-spark',
  ht: 'wk-heart',
  bb: 'wk-bubble',
};

export type DecoItem = {
  kind: SpriteKind;
  w: number;
  /** 动画周期，例如 `70s` / `2.4s` */
  d?: string;
  /** 爱心的旋转角度 */
  r?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

function decoStyle(item: DecoItem): CSSProperties {
  const style: Record<string, string> = { '--w': `${item.w}px` };
  if (item.d) style['--d'] = item.d;
  if (item.r) style['--r'] = item.r;
  if (item.left) style.left = item.left;
  if (item.right) style.right = item.right;
  if (item.top) style.top = item.top;
  if (item.bottom) style.bottom = item.bottom;

  return style as CSSProperties;
}

/** 云、星、心、气泡：整页共用一份 symbol。 */
export function SceneSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
    >
      <symbol id="wk-spark" viewBox="-12 -12 24 24">
        <path
          fill="currentColor"
          d="M0-11C1.6-3.4 3.4-1.6 11 0 3.4 1.6 1.6 3.4 0 11-1.6 3.4-3.4 1.6-11 0-3.4-1.6-1.6-3.4 0-11Z"
        />
      </symbol>
      <symbol id="wk-heart" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 21C5 15.5 2 12 2 8.2 2 5.3 4.2 3 7 3c2 0 3.8 1.1 5 3 1.2-1.9 3-3 5-3 2.8 0 5 2.3 5 5.2 0 3.8-3 7.3-10 12.8Z"
        />
        <path
          fill="#fff"
          opacity=".7"
          d="M6.5 6.2c1-.9 2.3-.9 3 .1-1.3.2-2.3 1-2.7 2.2-.9-.4-1-1.6-.3-2.3Z"
        />
      </symbol>
      <symbol id="wk-bubble" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M7.5 10a5 5 0 0 1 4-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </symbol>
      <symbol id="wk-cloud" viewBox="0 0 200 90">
        <g fill="var(--cloud-sh)" transform="translate(0 8)">
          <circle cx="50" cy="52" r="28" />
          <circle cx="92" cy="40" r="38" />
          <circle cx="138" cy="48" r="30" />
          <circle cx="168" cy="60" r="20" />
          <rect x="24" y="52" width="164" height="28" rx="14" />
        </g>
        <g fill="var(--cloud)">
          <circle cx="50" cy="52" r="28" />
          <circle cx="92" cy="40" r="38" />
          <circle cx="138" cy="48" r="30" />
          <circle cx="168" cy="60" r="20" />
          <rect x="24" y="52" width="164" height="28" rx="14" />
        </g>
      </symbol>
    </svg>
  );
}

export function Deco({ items }: { items: DecoItem[] }) {
  return (
    <div className="deco" aria-hidden="true">
      {items.map((item, index) => (
        <svg
          key={`${item.kind}-${index}`}
          className={item.kind}
          style={decoStyle(item)}
        >
          <use href={`#${SYMBOL[item.kind]}`} />
        </svg>
      ))}
    </div>
  );
}

/** 三层正弦海浪，中间一层白色浪花。 */
export function Sea() {
  return (
    <div className="sea" aria-hidden="true">
      <i className="back" />
      <i className="foam" />
      <i className="front" />
    </div>
  );
}

export function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href="#wk-spark" />
    </svg>
  );
}
