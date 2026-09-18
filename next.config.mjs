import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/docs.md',
        destination: '/llms.mdx/zh-CN/docs',
      },
      {
        source: '/docs/:path*.md',
        destination: '/llms.mdx/zh-CN/docs/:path*',
      },
      {
        source: '/:lang(en|zh-Hant|zh-CN)/docs.md',
        destination: '/llms.mdx/:lang/docs',
      },
      {
        source: '/:lang(en|zh-Hant|zh-CN)/docs/:path*.md',
        destination: '/llms.mdx/:lang/docs/:path*',
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(config);
