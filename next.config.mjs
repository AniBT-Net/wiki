import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
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
