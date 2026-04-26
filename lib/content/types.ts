export type ResearchArea = {
  slug: string;
  title: string;
  summary: string;
  methods: string[];
  questions: string[];
  image: string;
};

export type ProfileEntry = {
  period: string;
  title: string;
  institution: string;
  location?: string;
  detail?: string;
};

export type ProfileLink = {
  label: string;
  href: string;
};

export type Member = {
  name: string;
  chineseName?: string;
  role: string;
  group: "Principal Investigator" | "Postdocs" | "Graduate Students" | "Researchers" | "Alumni";
  bio: string;
  email?: string;
  image?: string;
  links?: ProfileLink[];
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  url?: string;
  coFirstAuthors?: string[];
  correspondingAuthors?: string[];
  preprint: boolean;
  highlighted: boolean;
};

export type PaperSpotlight = {
  publication: Publication;
  figure: {
    image: string;
    alt: string;
  };
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: "Lab" | "Publication" | "Opening" | "Conference" | "Award";
  link?: string;
  image?: string;
  imageAlt?: string;
  imageVariant?: "wide" | "side";
};

export type ContactInfo = {
  institution: string;
  address: string;
  email: string;
  joinText: string;
  applicationSections: {
    title: string;
    description: string;
    materials: string[];
  }[];
};
