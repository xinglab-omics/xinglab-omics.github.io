import type { ResearchArea } from "./types";

export const researchDirectionsQuestion = "What happens to the molecules in an apple once they're inside you?";

export const researchDirectionsIntro =
  "To answer this question, our lab links computational innovation, open-data mining, and experimental metabolomics to annotate and discover small molecules, with a focus on understanding xenobiotic metabolism. Together, these directions turn complex mass spectrometry data into reusable biochemical insight.";

export const researchAreas: ResearchArea[] = [
  {
    slug: "mass-spectrometry-informatics",
    title: "Mass Spectrometry Informatics",
    shortDescription:
      "We develop algorithms and workflows that make complex mass spectrometry data more interpretable, scalable, and useful for molecular discovery and downstream biochemical interpretation.",
    longDescription:
      "Mass spectra encode rich structural information, but much of it remains difficult to translate into chemical knowledge. We build computational workflows for MS/MS interpretation, molecular discovery, and AI-assisted pattern recognition to improve annotation of known and unknown metabolites at scale.",
    relatedPublicationTitles: [
      "BUDDY: molecular formula discovery via bottom-up MS/MS interrogation",
      "Structural annotation of full-scan MS data: A unified solution for LC-MS and MS imaging analyses",
      "Reverse spectral search reimagined: a simple but overlooked solution for chimeric spectral annotation"
    ],
    image: "/images/research/mass-spectrometry-informatics.png"
  },
  {
    slug: "public-metabolomics-data-mining",
    title: "Repository-Scale Public Data Mining",
    shortDescription:
      "We turn public metabolomics repositories into reusable discovery resources by reanalyzing spectra, and linking them to new biological and environmental questions.",
    longDescription:
      "Public metabolomics repositories contain thousands of experiments, millions of data files, and billions of mass spectra that can answer questions beyond their original designs. We develop workflows for repository-scale reanalysis, spectral search, and library propagation so open MS data can reveal recurring molecular signatures, exposure patterns, and unknown chemistry.",
    relatedPublicationTitles: ["Navigating the conjugated metabolome"],
    image: "/images/research/public-metabolomics-data-mining.png"
  },
  {
    slug: "microbial-xenobiotic-metabolism",
    title: "Microbial Metabolism of Xenobiotics",
    shortDescription:
      "We use metabolomics and informatics to understand how microbes transform xenobiotics and shape molecular exposures.",
    longDescription:
      "Microbes transform dietary compounds, drugs, pollutants, and other xenobiotics into products that can alter exposure, activity, and biological response. Yet we still know little about the full scope of xenobiotic metabolism: a single molecule can give rise to tens or hundreds of derivatized metabolites, and mapping these products is the starting point for downstream studies of mechanism, function, and health impact.",
    relatedPublicationTitles: [
      "Navigating the conjugated metabolome",
      "Charting the Undiscovered Metabolome with Synthetic Multiplexing"
    ],
    image: "/images/research/microbial-xenobiotic-metabolism.png"
  }
];
