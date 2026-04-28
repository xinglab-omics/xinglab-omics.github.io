import type { ResearchArea } from "./types";

export const researchDirectionsQuestion = "What molecular changes occur in your body after you eat an apple?";

export const researchDirectionsIntro =
  "To answer this question, our lab links open-data mining, computational method development, and experimental metabolomics to annotate and discover small molecules, with a focus on understanding xenobiotic metabolism. Together, these directions turn complex mass spectrometry data into reusable biochemical insight.";

export const researchAreas: ResearchArea[] = [
  {
    slug: "public-metabolomics-data-mining",
    title: "Data Mining of Public Metabolomics Repositories",
    shortDescription:
      "We turn public metabolomics repositories into reusable discovery resources by reanalyzing spectra, and linking them to new biological and environmental questions.",
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
      "We develop algorithms and workflows that make complex mass spectrometry data more interpretable, scalable, and useful for molecular discovery and downstream biochemical interpretation.",
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
      "We use metabolomics and informatics to understand how microbes transform xenobiotics and shape molecular exposures.",
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
