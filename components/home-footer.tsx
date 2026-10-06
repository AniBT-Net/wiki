import { navLabels } from '@/lib/layout.shared';
import { localizedPath } from '@/lib/i18n';
import Link from 'next/link';

/** 页脚（A）：缝线下的一行，不铺纸面；左边小 logo 贴纸，右边是安静的链接。 */
export function HomeFooter({ locale }: { locale: string }) {
  const t =
    navLabels[locale as keyof typeof navLabels] ?? navLabels['zh-CN'];

  return (
    <footer className="a-foot mt-auto w-full">
      <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-wrap items-center gap-x-2 gap-y-2 px-4 py-3 md:px-6">
        <img
          className="a-foot-logo"
          src="/brand/anibt-logo.webp"
          alt="AniBT"
          width={480}
          height={244}
          loading="lazy"
          decoding="async"
        />
        <nav className="ms-auto flex flex-wrap items-center gap-1">
          <Link className="a-foot-link" href={localizedPath(locale, '/docs')}>
            {t.docs}
          </Link>
          <Link
            className="a-foot-link"
            href={localizedPath(locale, '/docs/open-api')}
          >
            {t.api}
          </Link>
          <a
            className="a-foot-link"
            href="https://anibt.net"
            rel="noreferrer noopener"
            target="_blank"
          >
            {t.site}
          </a>
          <a
            className="a-foot-link"
            href="https://github.com/AniBT-Net/wiki"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
