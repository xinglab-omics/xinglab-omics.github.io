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
    name: "Lin Chen",
    chineseName: "陈琳",
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio:
      "Placeholder profile for a postdoc working on repository-scale metabolomics data mining and reusable informatics workflows.",
    email: "lin.chen@example.com",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/" },
      { label: "ORCID", href: "https://orcid.org/" }
    ]
  },
  {
    name: "Maya Zhang",
    chineseName: "张雅",
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio:
      "Placeholder profile for a postdoc developing AI-assisted MS/MS annotation and molecular network interpretation methods.",
    email: "maya.zhang@example.com",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/" },
      { label: "GitHub", href: "https://github.com/" }
    ]
  },
  {
    name: "Aaron Liu",
    chineseName: "刘安然",
    role: "Postdoctoral Researcher",
    group: "Postdocs",
    bio:
      "Placeholder profile for a postdoc studying microbial transformation of xenobiotics through computational metabolomics.",
    email: "aaron.liu@example.com",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/" },
      { label: "ORCID", href: "https://orcid.org/" }
    ]
  },
  {
    name: "Yue Wang",
    chineseName: "王悦",
    role: "PhD Student",
    group: "Graduate Students",
    bio:
      "Placeholder profile for a graduate student interested in public metabolomics data mining and biological metadata curation.",
    email: "yue.wang@example.com",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/" },
      { label: "GitHub", href: "https://github.com/" }
    ]
  },
  {
    name: "Ke Li",
    chineseName: "李可",
    role: "PhD Student",
    group: "Graduate Students",
    bio:
      "Placeholder profile for a graduate student building scalable tools for spectral search, molecular formula discovery, and annotation confidence.",
    email: "ke.li@example.com",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/" },
      { label: "ORCID", href: "https://orcid.org/" }
    ]
  },
  {
    name: "Minghao Chen",
    chineseName: "陈明浩",
    role: "Master Student",
    group: "Graduate Students",
    bio:
      "Placeholder profile for a graduate student exploring AI models for MS/MS spectra, molecule structures, and metabolomics pattern recognition.",
    email: "minghao.chen@example.com",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/" },
      { label: "GitHub", href: "https://github.com/" }
    ]
  },
  {
    name: "Rui Zhao",
    chineseName: "赵睿",
    role: "Master Student",
    group: "Graduate Students",
    bio:
      "Placeholder profile for a graduate student studying microbial xenobiotic metabolism with mass spectrometry informatics.",
    email: "rui.zhao@example.com",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/" },
      { label: "ORCID", href: "https://orcid.org/" }
    ]
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
