# NowPlaying

日本語 | [English](./README.en.md)

**URL**: [nowplaying.fjtd.dev](https://nowplaying.fjtd.dev/)

> [!WARNING]
> 本プロジェクトで使用している [Odesli API (v1-alpha.1)](https://linktree.notion.site/API-d0ebe08a5e304a55928405eb682f6741)は、2026年7月31日に廃止予定です。<br />
> 今後は各サービスのAPIとLLMを使用し、継続して利用できるように改善中です。

SpotifyなどのURLを貼ることで、複数サービスへのリンクをまとめて表示、シェアできるWebアプリです。<br />
Apple MusicのリンクをTwitterでシェアした際にOGPが表示されない問題も解決します。

---

## 制作背景

Apple MusicのリンクをTwitterで共有する際、プレビューが表示されません。一方、Spotifyは曲名・アーティスト・アルバムアートが綺麗に表示されます。<br />
Apple MusicのリンクはSpotifyユーザーには開けず、その逆も同様という問題があります。<br />
お気に入りの曲を紹介しても、サービスの違いによって聴いてもらえないというもどかしさを感じたことが、開発のきっかけです。<br />
この2つの問題を解決するため、複数サービスのリンクをまとめて表示し、Twitterでのシェア体験を向上させるツールを作成しました。<br />
UI設計の参考として NexTone Linkがあります。同サービスはアルバムアートをもとにしたCSSグラデーションを背景に使用していますが、本アプリではアルバムアート自体をCSSでぼかして背景に用いています。

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS / shadcn/ui
- **API:** Odesli API
- **Deploy**: Vercel

## 設計上の判断

### Route Handlerの使用

Odesli APIの呼び出しを`app/api/resolve/route.ts`に集約しています。フロントエンドは`/api/resolve`を叩くだけなので、将来APIを変更する際もRoute Handlerのみの変更で対応できます。現在はOdesli APIを使用していますが、廃止後も該当ファイルのみの修正で別のAPIへの移行が可能です。

### クエリパラメータの使用

シェアページのURLにクエリパラメータ方式を採用しています。DBを使用しないシンプルな設計が実現できるだけでなく、将来的なブラウザ拡張機能への対応も視野に入れた設計です。

### URLの正規化

SpotifyのURL（`intl-ja`パラメータ・`si`パラメータ）やApple MusicのURL（余分なクエリパラメータ）を正規化してからAPIに渡すことで、様々な形式のURLに対応しています。

---

## 今後の展望

- **Odesli API廃止への対応・API移行**
  - Spotify Web API + Apple Music API + YouTube Data APIの組み合わせを検討
  - Amazon Musicはクローズドベータ版のAPIのみ提供されており個人開発者は利用できないため、対応サービスからの削除を検討
- **LLMを使用した検索精度の向上**
  - 現在の設計では、対応サービスすべてのURLが表示されないことがあるため、LLMを使用し検索結果の精度向上を図る
- ブラウザ拡張機能・Apple ショートカットアプリへの対応
- 対応サービスの拡充
