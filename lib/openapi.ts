import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: ['./openapi/anibt.yaml'],
  proxyUrl: '/api/proxy',
});
