import { navLabels } from '@/lib/layout.shared';
import { localizedPath } from '@/lib/i18n';
import Link from 'next/link';

export function HomeFooter({ locale }: { locale: string }) {
  const t =
    navLabels[locale as keyof typeof navLabels] ?? navLabels['zh-CN'];

  return (
    <footer className="mx-auto mt-auto flex w-full max-w-(--fd-layout-width) flex-wrap items-center gap-x-5 gap-y-2 px-4 py-5 text-sm text-fd-muted-foreground">
      <Link
        className="transition-colors hover:text-fd-foreground"
        href={localizedPath(locale, '/docs')}
      >
        {t.docs}
      </Link>
      <Link
        className="transition-colors hover:text-fd-foreground"
        href={localizedPath(locale, '/docs/open-api')}
      >
        {t.api}
      </Link>
      <a
        className="transition-colors hover:text-fd-foreground"
        href="https://anibt.net"
        rel="noreferrer noopener"
        target="_blank"
      >
        {t.site}
      </a>
      <a
        className="transition-colors hover:text-fd-foreground"
        href="https://github.com/AniBT-Net/wiki"
        rel="noreferrer noopener"
        target="_blank"
      >
        GitHub
      </a>
    </footer>
  );
}
