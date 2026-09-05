# NowPlaying

[日本語](./README.md) | English

**Public URL**: [nowplaying.fjtd.dev](https://nowplaying.fjtd.dev/)

> [!WARNING]
> NowPlaying has ended its service, development, and updates.
> The source code remains publicly available as a creation record.

This is a web app that allows you to paste URLs from services like Spotify to display and share links to multiple services all in one place.
It also solves the issue where OGP is not displayed when sharing an Apple Music link on Twitter.

---

## Service Termination

This service used the Odesli API to retrieve links for multiple music streaming services. With the discontinuation of that API, it became difficult to continue operating the service under its conventional architecture.

We considered migrating to individual music service APIs or alternative link conversion APIs, but due to constraints such as terms of use, ongoing costs, and rate limits, we were unable to establish an architecture that could be sustainably maintained as an independent solo project.

We also considered redesigning it as a portfolio project for an infrastructure engineer, but securing a means to retrieve music data as a prerequisite required extensive consideration. Taking into account the infrastructure design and operations we want to focus on going forward, alongside the burden of development and maintenance, we decided to conclude this project and move on to new endeavors.

Thank you very much for using NowPlaying.

## Background

At the time of development, sharing an Apple Music link on Twitter did not display a preview, making it difficult to convey song information. In addition, if the recipient used a different music streaming service, they had to search for the song again on their own platform.

The frustration of wanting to introduce favorite songs, only for them to be difficult to listen to due to service differences, sparked this development. By providing a shareable page equipped with links to multiple services and OGP, the goal was to reduce this friction.

For the UI design, we referenced NexTone Link. The background uses a CSS-blurred version of the album art itself.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS / shadcn/ui
- **API**: Odesli API
- **Hosting**: Vercel

## Architectural Decisions

### Consolidating API Calls into Route Handlers

Calls to the Odesli API were consolidated into `app/api/resolve/route.ts`, allowing both the share page and OGP generation processes to utilize it via `/api/resolve`.

While external API access logic was centralized, the returned data maintained the original Odesli format as-is. Consequently, migrating to a different API would have required not only updating the call logic but also revising type definitions and data references on the frontend.

### Shareable URLs Using Query Parameters

The input source music service's URL was included as a query parameter in the share page URL, enabling sharing without the need for a database. We also envisioned use cases where URLs could be passed from browser extensions.

### URL Normalization

Spotify URLs were normalized by removing `/intl-ja` and query parameters, while Apple Music URLs retained the `i` parameter used to identify individual tracks. This standardized the format of URLs passed to the API by stripping away extraneous information added during sharing.

---

## Considered Improvements

To ensure service continuation and strengthen the infrastructure, we explored the following potential improvements. All of these remained in the conceptual and research phases and were never implemented.

- **Migration of Music APIs**  
  We explored combinations of the Spotify Web API, Apple Music API, and YouTube Data API, as well as alternative link conversion APIs. We also considered reviewing the scope of supported services based on each platform's terms of use, costs, and rate limits.

- **Improvement of Search and Matching Accuracy**  
  We considered matching using ISRC, track names, and artist names, along with comparing candidates using an LLM. Regarding the LLM, restrictions on the AI usage of retrieved data prevented its adoption.

- **Revising Share URLs and Data Storage**  
  We looked into a method of saving conversion results and referencing them via a share ID. The goal was to build an architecture where share pages and OGP could still be displayed from cached information even if external APIs experienced outages.

- **Enhancement of Infrastructure and Operational Foundations**  
  We investigated decoupling API processing, implementing caching, rate limiting, monitoring, CI/CD, and Infrastructure as Code.

- **Expansion of Use Cases and Supported Services**  
  We conceptualized support for browser extensions and Apple Shortcuts, as well as the addition of more music streaming services.
