import NextImage from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type Props = {
  thumbnailUrl?: string;
  title?: string;
  artistName?: string;
};

export default function SongCard({ thumbnailUrl, title, artistName }: Props) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <CardHeader>
        {thumbnailUrl && <NextImage src={thumbnailUrl} alt={title ?? 'アルバムアート'} width={300} height={300} />}
        <CardTitle>{title ?? 'タイトル不明'}</CardTitle>
        <CardDescription>{artistName ?? 'アーティスト不明'}</CardDescription>
      </CardHeader>
    </Card>
  );
}
