import type { ProfileEntry } from "./types";

export const piProfile = {
  name: "Shipei Xing",
  chineseName: "邢世沛",
  title: "Principal Investigator",
  current:
    "The Xing Lab develops computational mass spectrometry approaches to discover molecules, mine public metabolomics data, and understand xenobiotic metabolism.",
  email: "philipxsp@hotmail.com",
  image: "/images/shipei-xing-profile.png",
  links: [
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=en0zumcAAAAJ&hl=en"
    },
    {
      label: "ORCID",
      href: "https://orcid.org/0000-0001-6227-6959"
    },
    {
      label: "GitHub",
      href: "http://github.com/Philipbear"
    }
  ],
  experience: [
    {
      period: "2023.8 - Present",
      title: "Postdoctoral Scholar",
      institution: "University of California, San Diego",
      detail: "Supervisor: Pieter C. Dorrestein"
    }
  ] satisfies ProfileEntry[],
  education: [
    {
      period: "2019.1 - 2023.4",
      title: "PhD in Chemistry",
      institution: "University of British Columbia",
      detail: "Supervisor: Tao Huan"
    },
    {
      period: "2014.9 - 2018.6",
      title: "BSc in Chemistry, Chu Kochen Honors College",
      institution: "Zhejiang University"
    }
  ] satisfies ProfileEntry[],
  honors: [
    "Canadian Society of Mass Spectrometry Lake Louise Travel Award, 2022",
    "Affiliated Fellowship, University of British Columbia, 2022-2023",
    "Pei-Huang Tung and Tan-Wen Tung Graduate Fellowship, University of British Columbia, 2022",
    "Gladys Estella Laird Research Fellowship, University of British Columbia, 2022",
    "Outstanding Thesis Award, Zhejiang University, 2018"
  ],
  service: [
    "Reviewer: Nature, Cell, Nature Microbiology, Nature Machine Intelligence, Nature Communications, Analytical Chemistry, BMC Bioinformatics, and Journal of Cheminformatics",
    "Editorial Board Member: BMC Chemistry"
  ]
};
