import { siX, siMisskey } from 'simple-icons';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
  title?: string;
  artistName?: string;
  pageUrl: string;
};

export default function ShareButton({ title, artistName, pageUrl }: Props) {
  const shareText = `#NowPlaying ${title ?? ''} - ${artistName ?? ''}\n${pageUrl}`;

  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const misskeyUrl = `https://misskey-hub.net/share/?text=${encodeURIComponent(shareText)}&visibility=public&localOnly=0`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Share</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-2">
        <Button asChild variant="outline" className="flex-1">
          <a href={twitterUrl} target="_blank">
            <svg role="img" viewBox="0 0 24 24" width={20} height={20} fill={`#${siX.hex}`}>
              <path d={siX.path} />
            </svg>
            X (Twitter)
          </a>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <a href={misskeyUrl} target="_blank">
            <svg role="img" viewBox="0 0 24 24" width={20} height={20} fill={`#${siMisskey.hex}`}>
              <path d={siMisskey.path} />
            </svg>
            Misskey
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
