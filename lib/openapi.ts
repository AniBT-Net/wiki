import spec from '../openapi/anibt.json';
import type { Document } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: {
    // Fumadocs upgrades its input in place. Keep its private representation
    // separate from the canonical document used by Markdown and contract checks.
    './openapi/anibt.yaml': structuredClone(spec) as unknown as Document,
  },
  proxyUrl: '/api/proxy',
});
