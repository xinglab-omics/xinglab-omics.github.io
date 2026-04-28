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
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio: "Profile details will be added after confirmation."
  },
  {
    name: "FIRST LAST",
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio: "Profile details will be added after confirmation."
  },
  {
    name: "FIRST LAST",
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio: "Profile details will be added after confirmation."
  },
  {
    name: "FIRST LAST",
    role: "PhD Student",
    group: "Graduate Students",
    bio: "Profile details will be added after confirmation."
  },
  {
    name: "FIRST LAST",
    role: "PhD Student",
    group: "Graduate Students",
    bio: "Profile details will be added after confirmation."
  },
  {
    name: "FIRST LAST",
    role: "Master Student",
    group: "Graduate Students",
    bio: "Profile details will be added after confirmation."
  },
  {
    name: "FIRST LAST",
    role: "Master Student",
    group: "Graduate Students",
    bio: "Profile details will be added after confirmation."
  },
  {
    name: "Open Positions",
    chineseName: "开放岗位",
    role: "Postdocs and students",
    group: "Researchers",
    bio:
      "We welcome candidates with backgrounds in chemistry, biology, microbiology, data science, computer science, or related fields.",
    email: "philipxsp@hotmail.com",
    links: [{ label: "Join Us", href: "/contact" }]
  }
];
