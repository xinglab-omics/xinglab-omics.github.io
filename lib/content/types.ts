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

export type NewsItem = {
  title: string;
  date: string;
  dateLabel?: string;
  summary: string;
  category: "Lab" | "Publication" | "Opening" | "Conference" | "Award";
  link?: string;
  image?: string;
  imageVariant?: "wide" | "side";
};

export type RoleNote = {
  role: string;
  note: string;
};

export type ContactInfo = {
  institution: string;
  address: string;
  email: string;
  subjectFormat: string;
  subjectExample: string;
  applyIntro: string;
  sharedChecklist: string[];
  roleNotes: RoleNote[];
};
