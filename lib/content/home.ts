import { publications } from "./publications";
import type { PaperSpotlight } from "./types";

const featuredPapers = [
  {
    title: "Navigating the conjugated metabolome",
    image: "/images/papers/2026_conjugate.png"
  },
  {
    title: "BUDDY: molecular formula discovery via bottom-up MS/MS interrogation",
    image: "/images/papers/2023_buddy.png"
  }
];

export const featuredPaperSpotlights: PaperSpotlight[] = featuredPapers.map((featuredPaper) => ({
  publication:
    publications.find((publication) => publication.title.toLowerCase() === featuredPaper.title.toLowerCase()) ??
    publications[0],
  image: featuredPaper.image
}));
