import type { ComponentProps } from 'react';

type BrandLogoProps = {
  className?: string;
  heightClassName?: string;
} & Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'alt' | 'width' | 'height'>;

export function BrandLogo({
  className,
  heightClassName = 'h-9 sm:h-10',
  ...props
}: BrandLogoProps) {
  return (
    <img
      src="/brand/anibt-logo.webp"
      srcSet="/brand/anibt-logo.webp 1x, /brand/anibt-logo@2x.webp 2x"
      alt="AniBT"
      width={480}
      height={244}
      decoding="async"
      className={`w-auto ${heightClassName} ${className ?? ''}`}
      {...props}
    />
  );
}

/** 顶栏左侧：鲸鱼少女贴纸 logo + 一张倾斜的「Wiki」小贴纸。 */
export function NavTitle() {
  return (
    <span className="a-brand-lockup inline-flex items-center gap-2">
      <BrandLogo heightClassName="h-8 lg:h-10" />
      <span className="a-sticker a-brand-sticker">Wiki</span>
    </span>
  );
}
