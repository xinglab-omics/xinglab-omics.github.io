import { piProfile } from "./profile";
import type { Member } from "./types";

export const members: Member[] = [
  {
    name: piProfile.name,
    chineseName: piProfile.chineseName,
    role: piProfile.title,
    group: "Principal Investigator",
    bio: "",
    email: piProfile.email,
    image: piProfile.image
  },
  // {
  //   name: "FIRST LAST",
  //   chineseName: "姓名",
  //   role: "Postdoctoral Researcher",
  //   group: "Postdocs",
  //   bio: "Profile details will be added after confirmation.",
  //   email: "first.last.postdoc1@example.com",
  //   links: [
  //     { label: "GitHub", href: "https://example.com/github/first-last-postdoc1" },
  //     { label: "ORCID", href: "https://example.com/orcid/first-last-postdoc1" }
  //   ]
  // },
  {
    name: "Open Positions",
    role: "Postdoctoral Researchers",
    group: "Postdocs",
    bio:
      "We welcome postdoctoral researchers interested in metabolomics, bioinformatics, microbiology, AI or data science.",
    email: piProfile.email,
    links: [{ label: "Join Us", href: "/contact" }]
  },
  {
    name: "Open Positions",
    role: "Master's and PhD Students",
    group: "Graduate Students",
    bio:
      "We welcome graduate students who want to develop computational or experimental approaches for metabolomics and xenobiotic metabolism.",
    email: piProfile.email,
    links: [{ label: "Join Us", href: "/contact" }]
  },
  {
    name: "Open Positions",
    role: "Undergraduate Researchers",
    group: "Undergraduate Students",
    bio:
      "We welcome all motivated undergraduate students who are curious about science.",
    email: piProfile.email,
    links: [{ label: "Join Us", href: "/contact" }]
  }
];
