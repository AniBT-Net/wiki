import { Fraunces, IBM_Plex_Mono, Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';

export const sans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-anibt-sans',
  display: 'swap',
});

export const serif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-anibt-serif',
  display: 'swap',
});

export const display = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal'],
  variable: '--font-anibt-display',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-anibt-mono',
  display: 'swap',
});
