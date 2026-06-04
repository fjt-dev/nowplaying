// サービス名
export type Platform = 'spotify' | 'appleMusic' | 'itunes' | 'youtubeMusic' | 'amazonMusic';

// 取得先
export type APIProvider = 'spotify' | 'itunes' | 'youtube' | 'amazon';

// 楽曲・アルバムメタデータ
export type OdesliEntry = {
  id: string;
  type: 'song' | 'album';
  artistName?: string;
  thumbnaiUrl?: string;
  thumbnaiWidth?: string;
  thumbnaiHeight?: string;
  apiProvider: APIProvider;
  platforms: Platform[];
};

// 各サービスへのリンク
export type OdesliPlatformLink = {
  entityUniqueId: string;
  url: string;
  nativeAppUriMobile?: string;
  nativeAppUriDesktop?: string;
};

// APIレスポンス型
export type OdesliResponse = {
  entityUniqueId: string;
  userCountry: string;
  pageUrl: string;
  linksByPlatform: Partial<Record<Platform, OdesliPlatformLink>>; // OdesliPlatformLink
  entitiesByUniqueId: Record<string, OdesliEntry>; // OdesliEntry
};
