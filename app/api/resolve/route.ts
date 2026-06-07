// 特定のる０とに対するカスタムリクエストハンドラーを作成
// 参考：https://nextjsjp.org/docs/app/api-reference/file-conventions/route

import { NextRequest, NextResponse } from 'next/server';
import { OdesliResponse } from '@/types/odesli';

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);

    // Spotify
    if (parsed.hostname === 'open.spotify.com') {
      parsed.pathname = parsed.pathname.replace('/intl-ja', '');
      parsed.search = '';
    }

    // Apple Music
    if (parsed.hostname === 'music.apple.com') {
      const trackId = parsed.searchParams.get('i');
      parsed.search = '';
      if (trackId) {
        parsed.searchParams.set('i', trackId);
      }
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  // URLが入力されていない場合
  if (!url) {
    return NextResponse.json({ error: 'URLが指定されていません' }, { status: 400 });
  }

  const normalizedUrl = normalizeUrl(url);

  const res = await fetch(
    `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(normalizedUrl)}&userCountry=JP&songIfSingle=true`,
    { next: { revalidate: 86400 } }
  );

  // Odesliから取得を失敗した場合
  if (!res.ok) {
    return NextResponse.json({ error: '楽曲情報の取得に失敗しました' }, { status: res.status }); // HTTPステータスをそのまま返す
  }

  const data: OdesliResponse = await res.json();
  return NextResponse.json(data);
}
