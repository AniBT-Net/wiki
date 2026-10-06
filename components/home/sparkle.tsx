import type { CSSProperties } from 'react';

const SPARK =
  'M12 1.5c.9 5.6 4.9 9.6 10.5 10.5-5.6.9-9.6 4.9-10.5 10.5C11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5Z';

/**
 * 一颗闪烁的 ✦（A「贴纸手账」的小点缀，与主站 `Sparkle` 同形）：粉或蓝，
 * 一块区域只放两三颗，围着吉祥物或标题，不当花纹。装饰用，`aria-hidden`。
 */
export function Sparkle({
  tone = 'pink',
  className,
  style,
}: {
  tone?: 'pink' | 'blue';
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`spark ${tone === 'blue' ? 'is-blue' : ''} ${className ?? ''}`}
      style={style}
    >
      <path d={SPARK} fill="currentColor" />
    </svg>
  );
}
