import { localizedPath } from '@/lib/i18n';
import { permanentRedirect } from 'next/navigation';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  permanentRedirect(localizedPath(lang, '/docs'));
}
