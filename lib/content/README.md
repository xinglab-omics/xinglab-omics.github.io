# Website Content Editing Guide

Most website text and updateable information lives in this folder: `lib/content/`.
The page components in `app/` read from these files and handle layout/styling.

After editing content, run:

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

## File Map

| File | What It Controls |
| --- | --- |
| `home.ts` | Homepage paper spotlight figure and selected spotlight paper |
| `profile.ts` | Shipei Xing profile page content |
| `team.ts` | Team/member cards |
| `publications.ts` | Publication list |
| `news.ts` | News page and homepage news ticker |
| `research.ts` | Research direction cards/pages |
| `contact.ts` | Join Us page, contact email, application instructions |
| `navigation.ts` | Header navigation labels and links |
| `types.ts` | Shared TypeScript data shapes; edit only when the data structure changes |
| `../content.ts` | Barrel export so app files can import from `@/lib/content` |

## Images

Put website images in:

```text
public/images/
```

Then reference them from content files with paths like:

```ts
image: "/images/example.png"
```

Do not include `public` in the image path.

## Add Or Update A Publication

Edit:

```text
lib/content/publications.ts
```

Add a new publication object near the top of the `publications` array if it is recent:

```ts
{
  title: "Paper title here",
  authors: "Author One, Author Two, Author Three",
  venue: "Journal Name",
  year: 20xx,
  doi: "10.xxxx/example",
  coFirstAuthors: ["Author One", "Author Two"],
  correspondingAuthors: ["Author Three"],
  preprint: false,
  highlighted: true
}
```

Notes:

- Use either `doi` or `url`. If both exist, the page prefers the DOI link where implemented.
- `preprint: true` shows a preprint label.
- `highlighted: true` makes the paper appear in the highlighted publications section.
- `coFirstAuthors` and `correspondingAuthors` are optional arrays.
- Lab member names are bolded automatically on the Publications page and homepage spotlight if their names match entries in `team.ts`.

## Update The Homepage Paper Spotlight

Edit:

```text
lib/content/home.ts
```

The current spotlight uses:

```ts
publication: publications[0]
```

This means it uses the first publication in `publications.ts`.

To spotlight a different paper, either reorder `publications.ts`, or select it explicitly:

```ts
publication: publications.find((paper) => paper.title === "Paper title here") ?? publications[0]
```

To update the figure:

1. Add the image file to `public/images/`.
2. Update `figure.image`.
3. Update `figure.alt`.

Example:

```ts
figure: {
  image: "/images/spotlight_paper.png",
  alt: "Representative figure for the latest paper spotlight."
}
```

The spotlight figure can be a PNG or SVG. The homepage layout fits the whole image inside the figure area.

## Add A New Team Member

Edit:

```text
lib/content/team.ts
```

Add a new object to the `members` array:

```ts
{
  name: "First Last",
  chineseName: "中文名",
  role: "PhD Student",
  group: "Graduate Students",
  bio: "Short research description.",
  email: "first.last@example.com",
  image: "/images/person-photo.png",
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/" },
    { label: "GitHub", href: "https://github.com/" }
  ]
}
```

Allowed `group` values are defined in `types.ts`:

```ts
"Principal Investigator" | "Postdocs" | "Graduate Students" | "Researchers" | "Alumni"
```

Notes:

- `chineseName`, `image`, and `links` are optional.
- If no image is provided, the site shows initials.
- Email is shown as its own line on team cards.
- To add a profile photo, put it in `public/images/` and use `image: "/images/file-name.png"`.
- The "Open Positions" card is also in `team.ts`; edit or remove it there.

## Add Alumni

Edit:

```text
lib/content/team.ts
```

Set a member's group to:

```ts
group: "Alumni"
```

Example:

```ts
{
  name: "First Last",
  role: "Former Research Assistant",
  group: "Alumni",
  bio: "Current position or short note.",
  email: "first.last@example.com"
}
```

The Alumni section is hidden when empty. It appears automatically once at least one member has `group: "Alumni"`.


## Add A News Item

Edit:

```text
lib/content/news.ts
```

Add a new item to `newsItems`:

```ts
{
  slug: "short-url-friendly-title",
  title: "News title",
  date: "2026-04-26",
  summary: "One or two sentence summary.",
  category: "Publication",
  link: "/publications",
  image: "/images/news-image.png",
  imageAlt: "Short image description.",
  imageVariant: "side"
}
```

Allowed categories:

```ts
"Lab" | "Publication" | "Opening" | "Conference" | "Award"
```

Notes:

- `slug` creates the anchor link on the News page, for example `/news#short-url-friendly-title`.
- Use date format `YYYY-MM-DD`.
- `link`, `image`, `imageAlt`, and `imageVariant` are optional.
- `imageVariant` can be `"wide"` or `"side"`.
- Homepage latest news links back to the matching item on the News page.


## Common Checks

Run TypeScript check:

```bash
npm run typecheck
```

Run production build:

```bash
npm run build
```

Start local development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```
