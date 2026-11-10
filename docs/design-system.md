# IHSB design system

Audience: parents in Dhaka (Bangladeshi and expatriate) choosing a school, then students and alumni.
Job of the site: earn trust quickly, show results, and lead to an enquiry or application.

## Direction: "The Gate and the Ledger"

Two things from the school's own world shape the look.

- **The gate.** Bengal's brick mosques and old school gates share one outline, the arch. Portraits and
  feature photographs sit in an arch frame instead of a rounded rectangle.
- **The ledger.** A school is recorded in registers, mark sheets and prize lists. Statistics are set as
  large serif numerals over a thin gold rule, like a figure entered in a bound ledger.

Everything else stays quiet: ivory paper, one deep green, one gold.

### What was deliberately avoided

Purple or blue gradients, glass panels, emoji as icons, everything centred, a pill label above every
heading, a row of identical rounded cards with the same grey shadow. Motion is limited to one hero
entrance and short scroll reveals (at most 400 ms, at most 16 px of travel).

## Colour

Full 50 to 950 scales exist for each hue as CSS variables in `styles/tokens.css` (imported by
`styles/global.css`) and are mapped into Tailwind in `tailwind.config.ts`.

| Role | Token | Light | Dark |
| --- | --- | --- | --- |
| Primary, forest green (logo family) | `brand-700` | `#14523C` | solid surfaces use `brand-600` |
| Deepest green, hero and footer | `brand-900` / `brand-950` | `#0B3327` / `#06211A` | same |
| Accent, warm gold | `gold-400` / `gold-500` | `#D9AA36` / `#C08F23` | text uses `gold-300` |
| Tertiary, muted sky | `sky-500` | `#3F7CA3` | text uses `sky-300` |
| Page | `canvas` | ivory `#FBF8F1` | `#08130F` |
| Card | `paper` | `#FFFDF8` | `#0E1D17` |
| Recessed band | `sunken` | `#F4EEDF` | `#0B1813` |
| Text | `ink` / `ink-muted` / `ink-subtle` | `#18211D` / `#46524C` / `#626D67` | `#F1ECDF` / `#C0C8C0` / `#96A299` |
| Hairline | `line` / `line-strong` | `#E4DCCA` / `#C7BDA6` | `#22362D` / `#385246` |

Rules: gold is an accent, never a background for long text. Sky blue is for information only (dates,
categories, links inside notices). All text pairs meet WCAG AA (4.5:1) in both themes. Inside a dark
green band, add the class `on-dark`; the ink, line and accent tokens flip so children need no overrides.

## Type

| Role | Family | Use |
| --- | --- | --- |
| Display | Fraunces (variable: weight, optical size) | headings, numerals, pull quotes |
| Text and UI | Plus Jakarta Sans | body, navigation, forms, buttons |

Fluid scale (`clamp()`): `display-1` 40 to 84 px, `display-2` 32 to 56 px, `display-3` 26 to 36 px,
`title` 20 to 24 px, `lead` 17 to 20 px, body 16 px, small 14 px. Headings use sentence case and
`text-wrap: balance`. Line length is capped at 68 characters (`max-w-prose`).

## Tokens

- **Radius**: `sm` 6, `md` 10, `lg` 16, `xl` 24, `2xl` 36 px, plus the `arch` frame.
- **Shadow** (layered, green-tinted): `soft`, `raised`, `floating`.
- **Spacing**: `section` (64 to 120 px) and `section-sm` (40 to 64 px) vertical rhythm; container 1216 px.
- **Z-index**: `base` 0, `raised` 10, `sticky` 40, `nav` 50, `overlay` 60, `modal` 70, `toast` 80.
- **Motion**: durations `fast` 150 ms, `base` 280 ms, `slow` 400 ms; easings `out` and `in-out`.
  Everything collapses to no motion under `prefers-reduced-motion`.

## Signature details

- **Paper grain**: a fixed, very low-contrast noise layer over the page.
- **Gold rule**: a 1 px gold line that fades out; under section titles and between footer blocks.
- **Ledger numerals**: `.numeral` sets statistics in Fraunces with lining, tabular figures.
- **Link hover**: a gold underline that draws in from the left.
- **Focus ring**: 2 px gold outline with a 3 px offset on every interactive element.
- **Arch frame**: `.arch` on portraits and feature images.

## Generative pattern

Two lightweight, static SVG patterns (no canvas, no animation, so nothing to pause for reduced motion):

- `ContourLines` (`components/patterns`): seeded contour lines that bend around a few invisible
  "hills", like a survey map of the delta. Drawn once on the server. Used in the hero and page headers.
- `.tessellate`: an eight-point star (khatam) tile applied as a CSS mask, so it takes its colour from
  the tokens. Used at very low contrast on dark bands and as a section divider.

## Dark mode

Class strategy (`.dark` on `<html>`). An inline script in `<head>` applies the saved choice, or the
system preference, before first paint, so there is no flash. The toggle is in the navbar. The admin
dashboard reads the same tokens and follows the same theme.

## Components

`components/ui`: Button, Card, Section, SectionHeader, PageHeader, Badge, Tag, Tabs, Accordion, Stat,
Timeline, Avatar, Marquee, Skeleton, EmptyState, Dialog, Drawer, Carousel. Server Components by
default; only interactive leaves are client components.
