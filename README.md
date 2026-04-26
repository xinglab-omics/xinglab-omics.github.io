# Xing Lab Website

Xing Lab at Fudan University, focused on mass spectrometry and metabolomics.

## Development

```bash
npm install
npm run dev
```
Open http://localhost:3000 to view the site.


## Quick Update Recipes

### New Paper

1. Add the paper to `publications.ts`.
2. Set `highlighted: true` if it should appear in highlighted publications.
3. Update `home.ts` if it should be the homepage spotlight.
4. Add a news item in `news.ts` if desired.

### New Person

1. Add the person to `team.ts`.
2. Add photo to `public/images/` if available.
3. Use one of the allowed `group` values.
4. Publications will automatically bold this person's name when the author string matches exactly.

### New Alumni

1. Move or add the person in `team.ts`.
2. Set `group: "Alumni"`.
3. Alumni section appears automatically.

### New News Post

1. Add item to `news.ts`.
2. Use a unique `slug`.
3. Add optional image to `public/images/`.
4. The homepage news ticker links to the news item automatically.

## Content Updates

For a more detailed guide on updating content, see [lib/content/README.md](lib/content/README.md) for how to update papers,
people, news, the PI profile, alumni, research directions, and contact text.
