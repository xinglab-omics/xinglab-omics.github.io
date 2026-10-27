export type ResearchArea = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  relatedPublicationTitles?: string[];
  image: string;
};

export type ProfileEntry = {
  period: string;
  title: string;
  institution: string;
  location?: string;
  detail?: string;
  detailLinks?: ProfileLink[];
};

export type ProfileLink = {
  label: string;
  href: string;
};

export type ProfileHonor = {
  year: string;
  title: string;
  chineseTitle?: string;
  highlight?: boolean;
};

export type Member = {
  name: string;
  chineseName?: string;
  role?: string;
  group:
    | "Principal Investigator"
    | "Postdocs"
    | "PhD Students"
    | "Master's Students"
    | "Undergraduate Students"
    | "Researchers"
    | "Alumni";
  bio: string;
  email?: string;
  image?: string;
  joinedDate?: string;
  joinedLabel?: string;
  links?: ProfileLink[];
  careerSummary?: ProfileEntry[];
  profileHref?: string;
  isOpenPosition?: boolean;
  favoriteMolecule?: FavoriteMolecule;
  hometown?: Hometown;
};

export type FavoriteMolecule = {
  name: string;
  structure: string;
};

export type Hometown = {
  city: string;
  cityZh: string;
  lat: number;
  lon: number;
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url?: string;
  coFirstAuthors?: string[];
  correspondingAuthors?: string[];
  preprint: boolean;
  highlighted: boolean;
};

export type PaperSpotlight = {
  publication: Publication;
  image: string;
};

export type QuizOption = {
  name: string;
  nameZh: string;
  structure?: string;
};

export type QuizImage = {
  src: string;
  alt: string;
  credit?: { text: string; url: string };
};

export type QuizQuestion = {
  question: string;
  questionZh: string;
  image: QuizImage;
  options: QuizOption[];
  answer: string;
  explanation: string;
  citation: {
    authors: string;
    title: string;
    venue: string;
    year: number;
    url: string;
  };
  fromLab?: boolean;
};

export type NewsItem = {
  title: string;
  date: string;
  summary: string;
  category: "Lab" | "Publication" | "Opening" | "Conference" | "Award";
  link?: string;
  image?: string;
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
