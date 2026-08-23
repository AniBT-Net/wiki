import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/', destination: '/docs', permanent: true },
      { source: '/en', destination: '/en/docs', permanent: true },
      { source: '/zh-Hant', destination: '/zh-Hant/docs', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/docs/:path*.md',
        destination: '/llms.mdx/:lang/docs/:path*',
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(config);
