import { OdesliResponse } from '@/types/odesli';
import NextImage from 'next/image';

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

  const SUPPORTED_PLATFORMS = ['spotify', 'appleMusic', 'youtubeMusic', 'amazonMusic'] as const;

  return (
    <div>
      {entity.thumbnailUrl && (
        <NextImage src={entity.thumbnailUrl} alt={entity.title ?? 'アルバムアート'} width={300} height={300} />
      )}
      <h1>{entity.title}</h1>
      <p>{entity.artistName}</p>
      <ul>
        {SUPPORTED_PLATFORMS.map((platform) => {
          const link = data.linksByPlatform[platform]; // リンク情報の取り出し，存在しない場合：undefined
          if (!link) return null; // リンクが存在しない場合何も表示しない
          return (
            // リンクが存在する場合
            <li key={platform}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {platform}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
