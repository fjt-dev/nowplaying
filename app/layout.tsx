import { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'NowPlaying',
    template: '%s | NowPlaying'
  },
  description: '楽曲などへの自動生成スマートリンク 無料で利用できます',
  metadataBase: new URL('https://nowplaying.fjtd.dev')
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
