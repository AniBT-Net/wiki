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

export function NavTitle() {
  return (
    <span className="inline-flex items-center gap-2">
      <BrandLogo heightClassName="h-8 sm:h-9" />
      <span className="text-fd-muted-foreground text-sm font-medium">
        Wiki
      </span>
    </span>
  );
}
