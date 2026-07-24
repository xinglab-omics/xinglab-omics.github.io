import type { NewsItem } from "./types";

export function newsItemId(item: Pick<NewsItem, "date" | "title">) {
  const baseId = `news-${item.date}-${item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
  const matchingItems = newsItems.filter(
    (newsItem) => newsItem.date === item.date && newsItem.title === item.title
  );

  if (matchingItems.length <= 1) {
    return baseId;
  }

  const itemIndex = newsItems.indexOf(item as NewsItem);

  return itemIndex >= 0 ? `${baseId}-${itemIndex + 1}` : baseId;
}

export const newsItems: NewsItem[] = [
  {
    title: "Openings for students and postdocs",
    date: "2026-07-24",
    summary:
      "Prospective lab members interested in metabolomics, bioinformatics, computational chemistry, and data science are encouraged to get in touch.",
    category: "Opening",
    link: "/contact",
    image: "/images/news/20260724.png",
    imageVariant: "side"
  },
  {
    title: "Xing Lab website is officially open",
    date: "2026-04-26",
    summary:
      "The new Xing Lab website is now live, with information about our research directions, publications, team, and opportunities to join the lab.",
    category: "Lab",
    // link: "/",
    image: "/images/news/20260426.png",
    imageVariant: "wide"
  },
  {
    title: "Preprint: Navigating the conjugated metabolome",
    date: "2026-02-06",
    summary:
      "Our latest preprint on navigating the conjugated metabolome is now available.",
    category: "Publication",
    link: "https://www.biorxiv.org/content/10.64898/2026.02.06.704496v1",
    image: "/images/papers/2026_conjugate.png",
    imageVariant: "wide"
  },
  {
    title: "Excellent Young Scientists Fund (Overseas)",
    date: "2025-11",
    summary:
      "Shipei Xing was selected for the Excellent Young Scientists Fund (Overseas), 国家优秀青年科学基金项目（海外）.",
    category: "Award",
    // link: "/shipei-xing",
    // image: "/images/profiles/shipei-xing-profile.png",
    // imageVariant: "side"
  }
];
