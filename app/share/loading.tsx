import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Spinner className="size-12 text-muted-foreground" />
      <p className="text-muted-foreground text-sm">楽曲情報を取得中…</p>
    </div>
  );
}
