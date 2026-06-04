import NextImage from 'next/image';
import { Card, CardContent } from './ui/card';

type Props = {
  thumbnailUrl?: string;
  title?: string;
  artistName?: string;
};

export default function SongCard({ thumbnailUrl, title, artistName }: Props) {
  return (
    <Card className="w-full overflow-hidden pt-0">
      {thumbnailUrl && (
        <div className="relative w-full aspect-square">
          <NextImage
            src={thumbnailUrl}
            alt={title ?? 'アルバムアート'}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
            loading="eager"
            priority
          />
        </div>
      )}
      <CardContent className="p-4 pt-2">
        <h2 className="font-bold text-lg">{title ?? 'タイトル不明'}</h2>
        <p className="text-muted-foreground text-sm">{artistName ?? 'アーティスト不明'}</p>
      </CardContent>
    </Card>
  );
}
