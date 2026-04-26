import { publications } from "./publications";
import type { PaperSpotlight } from "./types";

export const paperSpotlight: PaperSpotlight = {
  publication: publications[0],
  figure: {
    image: "/images/spotlight_paper.png",
    alt: "Representative figure for the latest paper spotlight."
  }
};
