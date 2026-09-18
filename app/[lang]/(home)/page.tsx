import { HomePage } from '@/components/home-page';
import { homeCopy } from '@/lib/home';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = homeCopy(lang);

  return {
    description: t.htmlDescription,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <HomePage locale={lang} />;
}
