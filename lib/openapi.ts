import spec from '../openapi/anibt.json';
import type { Document } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: {
    './openapi/anibt.yaml': spec as unknown as Document,
  },
  proxyUrl: '/api/proxy',
});
