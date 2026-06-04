import { siSpotify, siApplemusic, siYoutubemusic } from 'simple-icons';
import { OdesliResponse } from '@/types/odesli';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
  linksByPlatform: OdesliResponse['linksByPlatform'];
};

const SUPPORTED_PLATFORMS = [
  { id: 'spotify', label: 'Spotify', icon: siSpotify },
  { id: 'appleMusic', label: 'Apple Music', icon: siApplemusic },
  { id: 'youtubeMusic', label: 'YouTube Music', icon: siYoutubemusic },
  { id: 'amazonMusic', label: 'Amazon Music', icon: null }
] as const;

export default function PlayCard({ linksByPlatform }: Props) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Play</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {SUPPORTED_PLATFORMS.map(({ id, label, icon }) => {
          const link = linksByPlatform[id]; // リンク情報の取り出し，存在しない場合：undefined
          if (!link) return null; // リンクが存在しない場合何も表示しない
          return (
            // リンクが存在する場合
            <Button key={id} asChild variant="outline" className="w-full">
              <a href={link.url} target="_blank">
                {icon && (
                  <svg role="img" viewBox="0 0 24 24" width={20} height={20} fill={`#${icon.hex}`}>
                    <path d={icon.path} />
                  </svg>
                )}
                {label}
              </a>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
