import { source } from '@/lib/source';
import { getOperationDocument } from '@/lib/openapi-document';

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');
  if (page.slugs[0] === 'open-api') {
    // Keep the localized page text and append a language-neutral machine
    // contract. Human descriptions are stripped from the schema so English
    // and Traditional LLM routes never receive the source Chinese prose.
    const document = getOperationDocument(page.slugs.at(-1) ?? '', { machineOnly: true });
    if (document) {
      return `# ${page.data.title} (${page.url})\n\n${processed}\n\n## Machine-readable contract\n\n\`\`\`json\n${JSON.stringify(document, null, 2)}\n\`\`\``;
    }
  }

  return `# ${page.data.title} (${page.url})

${processed}`;
}
