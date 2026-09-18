import { OpenAPIPage } from '@/components/api-page';
import { getMDXComponents } from '@/components/mdx';
import { languageAlternates, localizedPath } from '@/lib/i18n';
import { openapi } from '@/lib/openapi';
import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            OpenAPIPage: async (props) => (
              <OpenAPIPage
                {...(await openapi.preloadOpenAPIPage(page))}
                {...props}
              />
            ),
            APIPage: async (props) => (
              <OpenAPIPage
                {...(await openapi.preloadOpenAPIPage(page))}
                {...props}
              />
            ),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  const path = slug?.length ? `/docs/${slug.join('/')}` : '/docs';

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: localizedPath(lang, path),
      languages: languageAlternates(path),
    },
  };
}
