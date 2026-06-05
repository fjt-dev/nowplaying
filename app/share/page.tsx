import type { Metadata } from 'next';
import NextImage from 'next/image';
import Link from 'next/link';

import { OdesliResponse } from '@/types/odesli';

import { Button } from '@/components/ui/button';

import SongCard from '@/components/SongCard';
import PlayCard from '@/components/PlayCard';
import ShareButton from '@/components/ShareButton';

type Props = {
  searchParams: Promise<{ url?: string }>; // プロパティの型定義
  // searchParams：NextJS 15から非同期
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { url } = await searchParams;
  if (!url) return { title: 'NowPlaying' };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resolve?url=${encodeURIComponent(url)}`);
  if (!res.ok) return { title: 'NowPlaying' };

  const data = await res.json();
  const entity = data.entitiesByUniqueId[data.entityUniqueId];

  return {
    title: `${entity.title ?? ''} - ${entity.artistName ?? ''}`,
    openGraph: {
      title: `${entity.title ?? ''} - ${entity.artistName ?? ''}`,
      images: entity.thumbnailUrl ? [{ url: entity.thumbnailUrl }] : []
    },
    twitter: {
      card: 'summary',
      title: `${entity.title ?? ''} - ${entity.artistName ?? ''}`,
      images: entity.thumbnailUrl ? [entity.thumbnailUrl] : []
    }
  };
}

export default async function SharePage({ searchParams }: Props) {
  const params = await searchParams;
  const url = params.url;

  if (!url) {
    return <div>URLが指定されていません</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resolve?url=${encodeURIComponent(url)}`); // RouteHandlerの呼び出し
  // process.env.NEXT_PUBLIC_BASE_URL：環境変数
  // /api/resolve?url=：RouteHandlerのエンドポイント

  if (!res.ok) {
    return <div>楽曲情報の取得に失敗しました</div>;
  }

  const data: OdesliResponse = await res.json(); // RouteHandlerからのJSONをパース
  const entity = data.entitiesByUniqueId[data.entityUniqueId]; // 入力したメタデータを取り出し

  const sharePageUrl = `https://nowplaying.fjtd.dev/share?url=${encodeURIComponent(url)}`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {entity.thumbnailUrl && (
        <NextImage
          src={entity.thumbnailUrl}
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-110 blur-2xl opacity-50"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 flex flex-col items-center gap-4 px-4 py-8 max-w-md mx-auto overflow-x-hidden">
        <SongCard thumbnailUrl={entity.thumbnailUrl} title={entity.title} artistName={entity.artistName} />
        <PlayCard linksByPlatform={data.linksByPlatform} />
        <ShareButton title={entity.title} artistName={entity.artistName} pageUrl={sharePageUrl} />
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full">
            別の曲を変換する
          </Button>
        </Link>
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <p>
            Made with &#x2764; by{' '}
            <a href="https://fjtd.dev" className="underline">
              fjtd.dev
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
