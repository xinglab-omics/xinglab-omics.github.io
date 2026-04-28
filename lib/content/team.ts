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
  {
    name: "FIRST LAST",
    chineseName: "姓名",
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio: "Profile details will be added after confirmation.",
    email: "first.last.postdoc1@example.com",
    links: [
      { label: "GitHub", href: "https://example.com/github/first-last-postdoc1" },
      { label: "ORCID", href: "https://example.com/orcid/first-last-postdoc1" }
    ]
  },
  {
    name: "FIRST LAST",
    chineseName: "姓名",
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio: "Profile details will be added after confirmation.",
    email: "first.last.postdoc2@example.com",
    links: [
      { label: "GitHub", href: "https://example.com/github/first-last-postdoc2" },
      { label: "ORCID", href: "https://example.com/orcid/first-last-postdoc2" }
    ]
  },
  {
    name: "FIRST LAST",
    chineseName: "姓名",
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio: "Profile details will be added after confirmation.",
    email: "first.last.postdoc3@example.com",
    links: [
      { label: "GitHub", href: "https://example.com/github/first-last-postdoc3" },
      { label: "ORCID", href: "https://example.com/orcid/first-last-postdoc3" }
    ]
  },
  {
    name: "FIRST LAST",
    chineseName: "姓名",
    role: "PhD Student",
    group: "Graduate Students",
    bio: "Profile details will be added after confirmation.",
    email: "first.last.phd1@example.com",
    links: [
      { label: "GitHub", href: "https://example.com/github/first-last-phd1" },
      { label: "ORCID", href: "https://example.com/orcid/first-last-phd1" }
    ]
  },
  {
    name: "FIRST LAST",
    chineseName: "姓名",
    role: "PhD Student",
    group: "Graduate Students",
    bio: "Profile details will be added after confirmation.",
    email: "first.last.phd2@example.com",
    links: [
      { label: "GitHub", href: "https://example.com/github/first-last-phd2" },
      { label: "ORCID", href: "https://example.com/orcid/first-last-phd2" }
    ]
  },
  {
    name: "FIRST LAST",
    chineseName: "姓名",
    role: "Master Student",
    group: "Graduate Students",
    bio: "Profile details will be added after confirmation.",
    email: "first.last.master1@example.com",
    links: [
      { label: "GitHub", href: "https://example.com/github/first-last-master1" },
      { label: "ORCID", href: "https://example.com/orcid/first-last-master1" }
    ]
  },
  {
    name: "FIRST LAST",
    chineseName: "姓名",
    role: "Master Student",
    group: "Graduate Students",
    bio: "Profile details will be added after confirmation.",
    email: "first.last.master2@example.com",
    links: [
      { label: "GitHub", href: "https://example.com/github/first-last-master2" },
      { label: "ORCID", href: "https://example.com/orcid/first-last-master2" }
    ]
  },
  {
    name: "Open Positions",
    role: "Postdocs and students",
    group: "Researchers",
    bio:
      "We welcome candidates with backgrounds in chemistry, biology, microbiology, data science, computer science, or related fields.",
    email: "philipxsp@hotmail.com",
    links: [{ label: "Join Us", href: "/contact" }]
  }
];
