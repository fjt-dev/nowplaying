# NowPlaying

[日本語](./README.md) | English

This README was machine-translated from Japanese. The original Japanese version takes precedence in case of any inconsistency.

**URL**: [nowplaying.fjtd.dev](https://nowplaying.fjtd.dev/)

> [!WARNING]
> The [Odesli API (v1-alpha.1)](https://linktree.notion.site/API-d0ebe08a5e304a55928405eb682f6741) used in this project is scheduled to be deprecated on July 31, 2026.<br />
> We are currently improving the service to use individual service APIs and LLMs to ensure continued availability.

A web application that allows you to aggregate and share links to multiple services by pasting a URL from Spotify or other platforms.<br />
It also solves the issue where OGP is not displayed when sharing Apple Music links on Twitter.

---

## Background

When sharing Apple Music links on Twitter, no preview is displayed. On the other hand, Spotify beautifully displays the song title, artist, and album art.<br />
There is also the problem that Apple Music links cannot be opened by Spotify users, and vice versa.<br />
The development of this tool was inspired by the frustration of wanting to introduce favorite songs, but having them go unheard due to differences in services.<br />
To solve these two problems, I created a tool that aggregates links from multiple services and improves the sharing experience on Twitter.<br />
NexTone Link served as a reference for the UI design. While that service uses a CSS gradient based on the album art for the background, this app blurs the album art itself with CSS to use as the background.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS / shadcn/ui
- API: Odesli API
- Deploy: Vercel

## Design Decisions

### Use of Route Handler

Odesli API calls are centralized in `app/api/resolve/route.ts`. Since the front-end only calls `/api/resolve`, future changes to the API can be handled by modifying only the Route Handler. Although I am currently using the Odesli API, I can switch to a different API after its deprecation by modifying only that specific file.

### Use of Query Parameters

I adopted a query parameter approach for the share page URLs. This not only enables a simple design without the need for a database, but also keeps future support for browser extensions in mind.

### URL Normalization

By normalizing Spotify URLs (removing `intl-ja` and `si` parameters) and Apple Music URLs (removing extra query parameters) before passing them to the API, the app supports various URL formats.

---

## Future Plans

- **Response to Odesli API deprecation / API migration**
  - Considering a combination of Spotify Web API, Apple Music API, and YouTube Data API
  - Considering removing Amazon Music from supported services, as its API is only available in closed beta and not accessible to individual developers.
- **Improving search accuracy using LLMs**
  - Currently, URLs for all supported services may not always be displayed, so I plan to use an LLM to improve the accuracy of search results
- Support for browser extensions and Apple Shortcuts
- Expanding supported services
