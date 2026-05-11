export type NavigationItem = {
  label: string;
  href?: string;
  children?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
  { label: "HOME", href: "/" },
  { label: "RESEARCH", href: "/research" },
  {
    label: "OUR TEAM",
    children: [
      { label: "ALL MEMBERS", href: "/team" },
      { label: "PROF. XING", href: "/shipei-xing" }
    ]
  },
  { label: "PUBLICATIONS", href: "/publications" },
  { label: "NEWS", href: "/news" },
  {
    label: "LAB GUIDE",
    children: [
      { label: "LAB LIFE", href: "/guide/lab-life" },
      { label: "RESEARCH PRACTICE", href: "/guide/research-practice" }
    ]
  },
  { label: "JOIN US", href: "/contact" }
];
