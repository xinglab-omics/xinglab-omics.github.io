import type { ResearchArea } from "./types";

export const researchDirectionsQuestion =
  "When you eat an apple, which molecules become you, which fuel you, which feed your microbes, and which leave you?";

export const researchDirectionsIntro =
  "To answer this question, our lab combines computational methods, repository-scale data mining, and experimental metabolomics to annotate known metabolites, uncover uncharacterized small molecules, and map xenobiotic metabolism. Together, these directions turn complex mass spectrometry data into durable biochemical insight.";

export const researchAreas: ResearchArea[] = [
  {
    slug: "mass-spectrometry-informatics",
    title: "Mass Spectrometry Informatics",
    shortDescription:
      "We build algorithms and workflows for MS/MS interpretation, molecular annotation, and scalable discovery across complex metabolomics datasets.",
    longDescription:
      "Tandem mass spectra encode rich structural information, yet most signals in untargeted metabolomics remain unannotated. We develop algorithms and machine learning workflows for MS/MS interpretation, spectral search, and molecular formula and structure discovery—turning raw spectra into reliable chemical insight at scale.",
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
      "We turn public metabolomics repositories into reusable discovery resources by reanalyzing open spectra and linking chemical patterns to biological and environmental questions.",
    longDescription:
      "Public metabolomics repositories hold thousands of studies, millions of LC-MS files, and billions of spectra that can answer questions far beyond their original experimental designs. We develop scalable workflows for repository-wide reanalysis, spectral search, and library propagation to uncover recurring molecular signatures, human and environmental exposure patterns, and previously unrecognized chemistry.",
    relatedPublicationTitles: [
      "Navigating the conjugated metabolome",
      "Charting the undiscovered metabolome with synthetic multiplexing implicates ibuprofen-carnitine in myotoxicity"
    ],
    image: "/images/research/public-metabolomics-data-mining.png"
  },
  {
    slug: "microbial-xenobiotic-metabolism",
    title: "Microbial Metabolism of Xenobiotics",
    shortDescription:
      "We integrate metabolomics and informatics to chart how microbes chemically transform dietary compounds, drugs, and environmental exposures.",
    longDescription:
      "Host and microbial enzymes transform dietary compounds, pharmaceuticals, and environmental pollutants into diverse downstream products that can reshape bioactivity, toxicity, and biological response. A single parent compound can give rise to dozens or hundreds of derivatized metabolites—most still uncatalogued. Mapping this chemical landscape is our foundation for studying mechanism, function, and health impact.",
    relatedPublicationTitles: [
      "Navigating the conjugated metabolome",
      "Charting the undiscovered metabolome with synthetic multiplexing implicates ibuprofen-carnitine in myotoxicity"
    ],
    image: "/images/research/microbial-xenobiotic-metabolism.png"
  }
];
