import { IBM_Plex_Mono, IBM_Plex_Sans, Noto_Sans_SC } from 'next/font/google';

export const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-anibt-sans',
  display: 'swap',
});

export const cjk = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-anibt-cjk',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-anibt-mono',
  display: 'swap',
});
