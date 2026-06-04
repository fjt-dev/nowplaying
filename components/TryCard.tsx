'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const SAMPLE_URL = 'https://open.spotify.com/track/7Cd17G3oNQ34OWUwS8ZxfR';
const SAMPLE_TITLE = 'Lemon - 米津玄師';

export default function TryCard() {
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_URL);
  };

  const handleTry = () => {
    router.push(`/share?url=${encodeURIComponent(SAMPLE_URL)}`);
  };

  return (
    <Card size="sm" className="mx-auto w-full">
      <CardHeader>
        <CardTitle>試してみる</CardTitle>
        <CardDescription>URLを持っていなくても機能を試すことができます</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{SAMPLE_TITLE}</p>
        <div className="flex gap-2">
          <Input readOnly value={SAMPLE_URL} className="text-xs text-muted-foreground" />
          <Button
            onClick={() => {
              handleCopy();
              toast('コピーしました', { position: 'bottom-left' });
            }}
          >
            コピー
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleTry} className="w-full">
          直接試す
        </Button>
      </CardFooter>
    </Card>
  );
}
