import type { ResearchArea } from "./types";

export const researchDirectionsIntro =
  "Our research links open-data mining, computational method development, and experimental metabolomics to understand how small molecules are measured, annotated, and transformed. These directions work together to turn complex mass spectrometry data into reusable biological and chemical insight.";

export const researchAreas: ResearchArea[] = [
  {
    slug: "public-metabolomics-data-mining",
    title: "Data Mining of Public Metabolomics Repositories",
    shortDescription:
      "We turn open metabolomics datasets into reusable discovery resources by harmonizing metadata, reanalyzing spectra, and linking public MS data to new biological and environmental questions.",
    longDescription:
      "Public metabolomics repositories contain thousands of experiments that can answer questions beyond their original designs. We develop workflows for repository-scale reanalysis, metadata harmonization, spectral search, and library propagation so open MS data can reveal recurring molecular signatures, exposure patterns, and unknown chemistry.",
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
    image: "/images/hero/LCMS.svg"
  },
  {
    slug: "mass-spectrometry-informatics",
    title: "Mass Spectrometry Informatics",
    shortDescription:
      "We build algorithms and workflows that make complex MS/MS data more interpretable, scalable, and useful for confident metabolite annotation.",
    longDescription:
      "Mass spectra encode rich structural information, but much of it remains difficult to translate into molecular knowledge. We develop computational methods for MS/MS interpretation, molecular formula discovery, reverse spectral search, molecular networking, and AI-assisted pattern recognition to improve annotation of known and unknown metabolites at scale.",
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
    image: "/images/hero/LCMS.svg"
  },
  {
    slug: "microbial-xenobiotic-metabolism",
    title: "Microbial Metabolism of Xenobiotics",
    shortDescription:
      "We use metabolomics and informatics to discover how microbes transform xenobiotics and shape molecular exposures.",
    longDescription:
      "Microbes transform dietary compounds, drugs, pollutants, and other xenobiotics into products that can alter exposure, activity, and biological response. We combine controlled metabolism experiments, comparative metabolomics, and pathway inference to identify these products and connect them to microbial mechanisms.",
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
    image: "/images/hero/tomatidine-PEA.svg"
  }
];
