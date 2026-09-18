import { i18n, localizedPath } from '@/lib/i18n';
import { source } from '@/lib/source';
import type { MetadataRoute } from 'next';

const BASE = 'https://wiki.anibt.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of i18n.languages) {
    entries.push({
      url: `${BASE}${localizedPath(lang, '/')}`,
      changeFrequency: 'weekly',
      priority: lang === i18n.defaultLanguage ? 1 : 0.8,
    });

    for (const page of source.getPages(lang)) {
      entries.push({
        url: `${BASE}${page.url}`,
        changeFrequency: 'weekly',
        priority: page.url.endsWith('/docs') ? 0.9 : 0.6,
      });
    }
  }

  return entries;
}
