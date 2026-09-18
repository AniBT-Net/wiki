import { HomePage } from '@/components/home-page';
import { recentChangelog } from '@/lib/changelog';
import { homeCopy } from '@/lib/home';
import { i18n } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = homeCopy(lang);

  return {
    title: t.htmlTitle,
    description: t.htmlDescription,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const changelog = await recentChangelog(lang);

  return <HomePage locale={lang} changelog={changelog} />;
}
