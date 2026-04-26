import type { ResearchArea } from "./types";

export const researchAreas: ResearchArea[] = [
  {
    slug: "public-metabolomics-data-mining",
    title: "Data Mining of Public Metabolomics Repositories",
    summary:
      "We mine public metabolomics repositories as a discovery engine, building reusable workflows that connect open MS data to biological hypotheses, exposure records, and unknown chemistry.",
    methods: [
      "repository-scale reanalysis",
      "metadata harmonization",
      "spectral library propagation",
      "large-scale metabolomics search"
    ],
    questions: [
      "How can public metabolomics data be reused for new biological and environmental questions?",
      "Which computational strategies make repository-scale discovery reliable and interpretable?"
    ],
    image: "/images/xing-lab-informatics-hero-v4.png"
  },
  {
    slug: "mass-spectrometry-informatics",
    title: "Mass Spectrometry Informatics",
    summary:
      "We create computational methods for MS/MS interpretation, molecular formula discovery, spectral search, structural annotation, and scalable analysis of complex metabolomics data.",
    methods: [
      "MS/MS annotation",
      "molecular networking",
      "reverse spectral search",
      "AI-assisted pattern recognition"
    ],
    questions: [
      "How can algorithms extract more confident structural information from mass spectra?",
      "How can informatics improve unknown metabolite annotation at scale?"
    ],
    image: "/images/xing-lab-informatics-hero-v2.png"
  },
  {
    slug: "microbial-xenobiotic-metabolism",
    title: "Microbial Metabolism of Xenobiotics",
    summary:
      "We study how microbial metabolism transforms xenobiotics and other small molecules, using mass spectrometry informatics to discover molecular products and mechanisms.",
    methods: [
      "xenobiotic biotransformation",
      "molecule discovery",
      "metabolic pathway inference",
      "comparative metabolomics"
    ],
    questions: [
      "Which microbial transformations shape exposure, activity, and molecular fate?",
      "How can metabolomics reveal previously hidden xenobiotic products?"
    ],
    image: "/images/xing-lab-informatics-hero-v2.png"
  }
];
