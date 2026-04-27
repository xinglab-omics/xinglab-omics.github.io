import { publications } from "./publications";
import type { PaperSpotlight } from "./types";

const spotlightPublicationTitle = "Navigating the conjugated metabolome";
const spotlightPublication =
  publications.find((publication) => publication.title.toLowerCase() === spotlightPublicationTitle.toLowerCase()) ??
  publications[0];

export const paperSpotlight: PaperSpotlight = {
  publication: spotlightPublication,
  figure: {
    image: "/images/spotlight_paper.png",
    alt: "Representative figure for the latest paper spotlight."
  }
};
