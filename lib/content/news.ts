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
    title: "Seven new students join Xing Lab",
    date: "2026-11",
    dateLabel: "Nov 2026",
    summary:
      "We are delighted to welcome seven new members to Xing Lab: Shaohong Xu (PhD student), Yinjie Yu and Lujie Qu (master's students), and Ruize Tang, Kehan Zhang, Pengyu Xing, and Lanxi Yin (undergraduate researchers). Welcome aboard—we look forward to building the lab and doing great science together!",
    category: "Lab"
  },
  {
    title: "Openings for students and postdocs",
    date: "2026-07-24",
    summary:
      "We are actively recruiting postdoctoral researchers, graduate students, undergraduates, and research assistants excited about mass spectrometry, metabolomics, bioinformatics, and xenobiotic metabolism. Visit our Join Us page to learn how to apply.",
    category: "Opening",
    link: "/contact",
    image: "/images/news/20260724.png",
    imageVariant: "side"
  },
  {
    title: "Xing Lab website is officially open",
    date: "2026-04-26",
    summary:
      "The Xing Lab website is now live, featuring our research directions, publications, team members, lab guide, and open positions.",
    category: "Lab",
    // link: "/",
    image: "/images/news/20260426.png",
    imageVariant: "wide"
  },
  {
    title: "Preprint: Navigating the conjugated metabolome",
    date: "2026-02-06",
    summary:
      "Our preprint on charting conjugated small molecules across public mass spectrometry repositories is now available on bioRxiv.",
    category: "Publication",
    link: "https://www.biorxiv.org/content/10.64898/2026.02.06.704496v1",
    image: "/images/papers/2026_conjugate.png",
    imageVariant: "wide"
  },
  {
    title: "Excellent Young Scientists Fund (Overseas)",
    date: "2025-11",
    summary:
      "Shipei Xing was awarded the National Natural Science Foundation of China (NSFC) Excellent Young Scientists Fund (Overseas) — 国家优秀青年科学基金项目（海外）.",
    category: "Award",
    // link: "/shipei-xing",
    // image: "/images/profiles/shipei-xing-profile.png",
    // imageVariant: "side"
  }
];
