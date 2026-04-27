import type { ProfileEntry, ProfileHonor } from "./types";

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
      detail: "Supervisor: Pieter C. Dorrestein (Founder of the GNPS ecosystem & Molecular networking)",
      detailLinks: [
        { label: "Pieter C. Dorrestein", href: "https://dorresteinlab.ucsd.edu" },
        { label: "GNPS ecosystem", href: "https://gnps.ucsd.edu" }
      ]
    }
  ] satisfies ProfileEntry[],
  education: [
    {
      period: "2019.1 - 2023.4",
      title: "PhD in Chemistry",
      institution: "The University of British Columbia",
      detail: "Supervisor: Tao Huan",
      detailLinks: [{ label: "Tao Huan", href: "https://huan.chem.ubc.ca/" }]
    },
    {
      period: "2014.9 - 2018.6",
      title: "BSc in Chemistry, Chu Kochen Honors College",
      institution: "Zhejiang University",
      detail: "Supervisor: Zhan Lu, Feihe Huang"
    }
  ] satisfies ProfileEntry[],
  honors: [
    {
      year: "2025",
      title: "Excellent Young Scientists Fund (Overseas), National Natural Science Foundation of China",
      chineseTitle: "国家高层次青年人才（海外），国家自然科学基金委员会",
      highlight: true
    },
    {
      year: "2022",
      title: "Canadian Society of Mass Spectrometry Lake Louise Travel Award (sponsored by Thermo)"
    },
    {
      year: "2022",
      title: "Pei-Huang Tung and Tan-Wen Tung Graduate Fellowship, University of British Columbia"
    },
    {
      year: "2022",
      title: "Gladys Estella Laird Research Fellowship, University of British Columbia"
    },
    {
      year: "2022",
      title: "C L Wang Memorial Scholarship, University of British Columbia"
    },
    {
      year: "2021",
      title: "Sandra Morris and Richard Tillyer Scholarship in Chemistry, University of British Columbia"
    },
    {
      year: "2018",
      title: "Outstanding Thesis Award, Zhejiang University"
    }
  ] satisfies ProfileHonor[],
  service: [
    "Reviewer: Nature, Cell, Nature Machine Intelligence, Nature Microbiology, Nature Communications, Analytical Chemistry, Environmental Pollution, BMC Bioinformatics, Analytica Chimica Acta, Journal of Cheminformatics, etc.",
    "Editorial Board Member: BMC Chemistry"
  ]
};
