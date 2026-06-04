import { OdesliResponse } from '@/types/odesli';
import SongCard from '@/components/SongCard';
import PlayCard from '@/components/PlayCard';
import ShareButton from '@/components/ShareButton';

type Props = {
  searchParams: Promise<{ url?: string }>; // プロパティの型定義
  // searchParams：NextJS 15から非同期
};

export default async function SharePage({ searchParams }: Props) {
  const { url } = await searchParams;

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

  return (
    <div>
      <SongCard thumbnailUrl={entity.thumbnailUrl} title={entity.title} artistName={entity.artistName} />
      <PlayCard linksByPlatform={data.linksByPlatform} />
      <ShareButton title={entity.title} artistName={entity.artistName} pageUrl={data.pageUrl} />
    </div>
  );
}
