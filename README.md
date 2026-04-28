# Xing Lab Website

Next.js website for Xing Lab at Fudan University. The site is built around editable content files in `lib/content/`, with layout and visual components in `app/` and `components/`.

Live site: https://philipbear.github.io/xinglab/

## Quick Start

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful checks:

```bash
npm run typecheck
npm run build
```

## Where To Edit

Most day-to-day website updates are in:

```text
lib/content/
```

For detailed content instructions, see:

```text
lib/content/README.md
```

Common non-content files:

| File | Use |
| --- | --- |
| `app/globals.css` | Main theme colors, including `--color-paper`, `--color-fudan`, and background color options |
| `app/page.tsx` | Homepage section order and major layout |
| `components/HeroVisual.tsx` | Hero SVG/network illustration, hero icons, node colors, and artwork position |
| `components/HeroScrollAnimation.tsx` | Scroll-driven hero animation settings |
| `components/FeaturedPapersRail.tsx` | Homepage featured paper carousel layout |
| `components/NewsTicker.tsx` | Homepage latest-news ticker layout |

## Image Folders

Put images under `public/images/`, organized by use:

```text
public/images/branding/   site logo and brand assets
public/images/hero/       hero SVG/image assets and reusable visual assets
public/images/papers/     featured paper figures
public/images/profiles/   profile and team photos
public/images/news/       news-specific images
```

When referencing an image in content, start the path at `/images/...`.

Example:

```ts
image: "/images/papers/2026_conjugate.png"
```

Do not include `public` in the path.

## Quick Update Recipes

### Add A Publication

1. Edit `lib/content/publications.ts`.
2. Add the publication object near the top if it is recent.
3. Set `highlighted: true` only if it should appear in the highlighted publications section.
4. Add a news item in `lib/content/news.ts` if the publication should appear as news.

### Add A Featured Lab Paper On The Homepage

1. Add the figure to `public/images/papers/`.
2. Make sure the paper exists in `lib/content/publications.ts`.
3. Add `{ title, image }` to `featuredPapers` in `lib/content/home.ts`.

All entries in `featuredPapers` are shown in the homepage carousel, in order. The title must match the publication title.

### Add A Person

1. Edit `lib/content/team.ts`.
2. Add a member object with an allowed `group`.
3. Add a photo to `public/images/profiles/` if available.
4. Use the same name spelling in publications if you want the site to bold that person's name automatically.

### Add Alumni

1. Edit the member in `lib/content/team.ts`.
2. Set `group: "Alumni"`.
3. The alumni section appears automatically when at least one alumni member exists.

### Add News

1. Edit `lib/content/news.ts`.
2. Add a unique `slug`.
3. Use date format `YYYY-MM-DD`.
4. Add an optional image to `public/images/news/` or reuse an existing image path.

The homepage news ticker links to the matching item on `/news`.

### Update Theme Colors

Edit `app/globals.css`, especially:

```css
--color-paper
--color-fudan
--color-sage
--color-line
```

The background options comment near the top of `globals.css` lists several possible `--color-paper` values.
