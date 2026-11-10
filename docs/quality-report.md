# Quality report

Measured on a production build (`pnpm build && pnpm start`) with `USE_MOCK_DATA=true`, Lighthouse
mobile emulation with simulated slow-4G throttling, one run per page, on a development laptop.
"Before" is commit `844c238` (the site before the redesign, with the same mock data).

## Lighthouse (mobile)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` before | 81 | 94 | 88 | 91 | 5.0 s | 0 | 20 ms |
| `/` after | 86 | 100 | 100 | 100 | 4.3 s | 0 | 10 ms |
| `/news` before | 90 | 92 | 88 | 100 | 3.5 s | 0 | 10 ms |
| `/news` after | 91 | 100 | 100 | 100 | 3.4 s | 0 | 10 ms |
| `/events` before | 87 | 93 | 88 | 100 | 3.9 s | 0 | 10 ms |
| `/events` after | 91 | 100 | 100 | 100 | 3.4 s | 0 | 10 ms |
| `/admission/fees` before | 99 | 91 | 92 | 100 | 1.7 s | 0 | 10 ms |
| `/admission/fees` after | 100 | 100 | 100 | 100 | 0.9 s | 0 | 0 ms |
| `/contact` before | 99 | 96 | 92 | 100 | 1.7 s | 0 | 10 ms |
| `/contact` after | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| `/achievements/alumni` before | 99 | 92 | 92 | 100 | 1.7 s | 0 | 10 ms |
| `/achievements/alumni` after | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |

Targets met: Performance at least 85, Accessibility, Best practices and SEO at least 95, CLS under 0.1
on every page measured. TBT (the lab stand-in for INP) is 10 ms or less.

Target not met: LCP under 2.5 s on `/`, `/news` and `/events`. The simulated figure is 3.4 to 4.3 s;
the LCP observed in the same runs without throttling was about 1.3 s on `/`. On `/news` and
`/events` the LCP element is the first story/event photograph, served from Unsplash through the
Next.js image optimiser. Real photographs hosted on Cloudinary at the right size should bring
this down; it needs re-measuring on the deployed site.

Not done: the `web-perf` skill expects the Chrome DevTools MCP server, which is not configured in
this environment, so traces were not recorded. Lighthouse was used instead. INP was not
measured in the field.

## What was changed for performance

- Fonts: preloaded payload cut from 224 KB to 95 KB (Latin subset only, one variable axis less).
- Favicon: 154 KB `.ico` replaced with a 10 KB PNG.
- The 3D code is one lazily loaded chunk of 238 KB gzip (three.js, React Three Fiber, two drei
  helpers). It is requested only on screens 768 px and wider, without reduced motion, with more
  than 4 GB of device memory and WebGL, and only when a scene scrolls near the viewport. Phones
  never download it.
- Home page data is fetched in parallel in Server Components; client JavaScript is limited to
  the navbar, tabs, carousel, lightbox, count-up and scroll reveals.

## Checks

- `pnpm lint`: 0 errors. 119 warnings remain, all in the admin dashboard and `lib/auth/auth.ts`,
  whose logic was deliberately left alone.
- `pnpm build`: passes with no Firebase credentials.
- Screenshots: 25 pages at 390 px and 1440 px, light and dark, in `docs/screenshots/`
  (`<page>-<width>-<theme>.jpg`), plus three `home-3d-*.png` captures of the WebGL scenes.
  The capture script reported no console errors and no horizontal overflow.
- Not checked by hand: widths 360, 768, 1024, 1280 and 1536; a screen reader pass; Safari and Firefox.
