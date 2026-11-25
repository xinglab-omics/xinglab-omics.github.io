export type GuideTextPart =
  | string
  | {
      label: string;
      href: string;
    }
  | {
      text: string;
      strong: true;
    };

type GuideText = string | GuideTextPart[];

type GuideBlock = {
  title: string;
  body?: GuideText;
  bullets?: GuideText[];
  subblocks?: GuideBlock[];
};

type GuideResource = GuideBlock & {
  id: string;
  status?: string;
  href?: string;
  actionLabel?: string;
};

export type GuideSection = {
  id: string;
  title: string;
  unnumbered?: boolean;
  deck?: string;
  paragraphs?: GuideText[];
  bullets?: GuideText[];
  blocks?: GuideBlock[];
  resources?: GuideResource[];
};

export type GuideContent = {
  eyebrow: string;
  title: string;
  description: string;
  tocTitle: string;
  notice?: GuideText;
  htmlLang?: string;
  alternateHref?: string;
  alternateLabel?: string;
  sections: GuideSection[];
};

export type GuidePageSummary = {
  label: string;
  title: string;
  description: string;
  href: string;
};

export const guideContent: GuideContent = {
  eyebrow: "Lab Guide",
  title: "Xing Lab Guide",
  description:
    "Shared expectations, practical routines, and reusable resources for doing careful, reproducible science together.",
  tocTitle: "Contents",
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "This guide is meant to make lab life easier to navigate. It describes our shared values, how we communicate and run meetings, how we protect time away and well-being, and how we support mentoring and career growth.",
        "We want to do impactful, ambitious research, but never at the expense of the well-being, happiness, or long-term growth of the people doing the work.",
        [
          "If you need help with research, career development, or something affecting your life in or outside the lab, you are always welcome to reach out to the PI. For standards on data, documentation, code, LLMs, collaboration and authorship, manuscripts, figures, peer review, and key literature, see the ",
          {
            label: "Research Practice",
            href: "/guide/research-practice"
          },
          " guide."
        ]
      ]
    },
    {
      id: "values-expectations",
      title: "Values & Expectations",
      deck:
        "We want the lab to be a place where people can do careful, ambitious work while feeling respected, supported, and able to grow.",
      bullets: [
        "Do rigorous science with generosity: be careful with data, claims, and interpretation; document clearly; and challenge ideas in ways that strengthen the work.",
        "Be honest about mistakes and negative results: failed experiments, unexpected controls, and honest errors are a normal part of science. Bring them up early so we can learn and troubleshoot together; hiding or massaging data is never acceptable.",
        "Treat people with respect: excellence is not determined by background, title, language, or seniority. Everyone should feel comfortable asking questions, raising concerns, and contributing ideas.",
        "Be reliable with each other: take ownership of your work, keep collaborators informed, and raise blockers before they slow the project.",
        "Stay aware of the lab's work: learn about one another's projects and look for collaboration opportunities.",
        "Keep learning: no one arrives knowing every method, instrument, coding practice, or writing convention. Asking for help is part of doing good research."
      ]
    },
    {
      id: "communication-meetings",
      title: "Communication & Meetings",
      blocks: [
        {
          title: "Communication",
          bullets: [
            "Use our lab chat tool for quick questions and day-to-day coordination; use email for formal requests, external communication, documents, and deadline-sensitive items.",
            [
              { text: "Evening or weekend responses are not expected", strong: true },
              " for non-urgent messages. If the PI or a colleague sends a message outside working hours, you are not expected to reply until the next working day."
            ],
            "If something is urgent, state the deadline clearly.",
            "If you need a recommendation letter, contact the PI at least 3 weeks before the deadline and share your CV, the list of programs and deadlines, and a brief summary of key accomplishments or points you would like highlighted."
          ]
        },
        {
          title: "One-on-one meetings",
          bullets: [
            "One-on-one meetings usually happen weekly, or every other week when appropriate.",
            "Bring a short agenda, recent results, and specific questions whenever possible.",
            [
              "Do not wait for the next scheduled meeting if a blocker is slowing the project; ",
              { text: "reach out to the PI as soon as possible", strong: true },
              "."
            ]
          ]
        },
        {
          title: "Lab meetings",
          body:
            "Lab meetings are a shared space to learn science, practice presentation skills, build research judgment, and stay connected with work across the group. Everyone is expected to attend lab meetings unless they have a class, travel, illness, or other conflicts; please inform the PI in advance. Journal club and code review rotate through this meeting rhythm rather than becoming extra standing meetings.",
          subblocks: [
            {
              title: "General weekly lab meetings",
              bullets: [
                "Members rotate through in-progress updates, problem-solving discussions, and occasional planning talks so the lab can give feedback while projects are still flexible.",
                "Research updates should briefly reestablish the project context, summarize recent progress (including any setbacks), identify current challenges, and propose next steps."
              ]
            },
            {
              title: "Journal club",
              bullets: [
                "Presenters should rotate. The presenter should choose 1–2 papers and share them with the lab at least 2–3 days in advance so everyone has time to read.",
                "Journal club is for deeper discussion of important papers and methods. The goal is to build shared scientific judgment, not just collect links. Bring specific questions, concerns, or discussion points to the meeting."
              ]
            },
            {
              title: "Code review",
              bullets: [
                "We use code review to improve reproducibility, readability, testing, documentation, and responsible use of LLM-generated code.",
                "The goal is collaborative improvement, not fault-finding. Briefly frame the scientific question before walking through the code so members from both experimental and computational backgrounds can engage, and bring a focused question or part of the workflow you want others to inspect."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "time-away-wellbeing",
      title: "Time Away & Well-being",
      paragraphs: [
        "Academic work offers flexibility, and we should use that flexibility to build a healthy, sustainable rhythm. More time spent working does not automatically mean better science.",
        "People do their best work when they can rest, think, recover, and keep a life outside the lab. Planning ahead helps the lab support that."
      ],
      bullets: [
        "Normal working rhythms may look different across people and project stages, but communication and reliability matter. Keep collaborators informed when your availability affects shared work.",
        "Plan longer absences in advance and communicate them to the PI and to people who depend on your work.",
        "Short breaks, sick days, medical appointments, family responsibilities, and personal emergencies are part of life. Communicate what others need to know, but you do not need to share private details.",
        "Respect other people's time away. Avoid creating unnecessary urgency during evenings, weekends, holidays, or vacations unless there is a true deadline or safety issue.",
        "When deadlines require unusual intensity, communicate expectations clearly and return to a sustainable rhythm afterward."
      ]
    },
    {
      id: "mentoring-career",
      title: "Mentoring & Career Development",
      paragraphs: [
        "Good training goes beyond finishing the current project. We want every lab member to leave with stronger scientific judgment, independent skills, and a clear next step—whether in academia, industry, or another path."
      ],
      bullets: [
        "In addition to regular project meetings, we hold periodic big-picture check-ins to discuss research progress, thesis or training milestones, skill development, and long-term career plans.",
        "Lab members are encouraged to apply for fellowships, scholarships, and awards, and to present their work at conferences and seminars.",
        "Think ahead about your career goals and tell the PI what kinds of training, writing, mentoring, or networking opportunities would help you grow.",
        "Mentoring also happens across the group: senior members are encouraged to support newer students thoughtfully, and newer members should never hesitate to ask questions."
      ]
    },
    {
      id: "data",
      title: "Data",
      deck:
        "Raw data are part of the scientific record. They should be preserved, organized, backed up, documented, and shared openly when published.",
      blocks: [
        {
          title: "Preserve raw data",
          bullets: [
            [
              "Preserve ",
              { text: "all", strong: true },
              " raw data, including exploratory runs, failed experiments, controls, samples, and files that are not used in the final publication. ",
              { text: "Do not overwrite original files.", strong: true }
            ],
            "Keep original vendor raw files (for example, .raw, .d, or .wiff) untouched and separate from converted open formats (such as .mzML), processed data, cleaned tables, exported figures, and analysis outputs. Record the conversion tool and version (for example, MSConvert) used.",
            "If data need to be excluded from an analysis, document the reason instead of deleting the files."
          ]
        },
        {
          title: "Organize project data",
          bullets: [
            "Keep raw data, processed data, sample metadata, and analysis outputs in clearly named directories, with processing steps, key parameters, and quality-control decisions documented.",
            "Use descriptive, dated names for files and folders so that versions and progress can be reconstructed later.",
            "Make sure collaborators and future lab members can quickly locate key files and tell which version was used for each result."
          ]
        },
        {
          title: "Backups",
          bullets: [
            [
              { text: "Back up data early and often.", strong: true },
              " When possible, keep important project data in ",
              { text: "more than one place", strong: true },
              ", such as an external hard drive plus lab NAS, approved institutional storage, or approved cloud storage."
            ],
            [
              "Mac users can use ",
              {
                label: "Time Machine",
                href: "https://support.apple.com/guide/mac-help/mh35860/mac"
              },
              " with an external drive or network storage. Windows users can use ",
              {
                label: "File History",
                href: "https://support.microsoft.com/en-us/windows/backup-and-restore-with-file-history-7bf065bf-f1ea-0a78-c1cf-7dcf51cc8bfc"
              },
              " to back up selected folders to an external drive or network location; make sure project folders outside the default libraries are included."
            ],
            "Periodically confirm that backups can actually be restored, especially before major cleanups, computer changes, manuscript submission, or public data release."
          ]
        },
        {
          title: "Public data & spectral sharing",
          bullets: [
            "Upon publication (or preprint release when appropriate), deposit raw LC-MS/MS datasets in public metabolomics repositories such as MassIVE/GNPS, MetaboLights, or Metabolomics Workbench, and include accession IDs in the manuscript.",
            "Curate complete, standardized sample metadata (for example, in ReDU-compatible format) so public datasets can be meaningfully reused by the broader community.",
            "Deposit newly verified reference MS/MS spectra to public libraries (such as GNPS) and record Universal Spectrum Identifiers (USIs) for key spectra when applicable."
          ]
        }
      ]
    },
    {
      id: "documentation-data-code",
      title: "Documentation & Code",
      deck: "Future you, future lab members, collaborators, and reviewers should be able to understand what was done and why.",
      blocks: [
        {
          title: "Working records",
          bullets: [
            "Everyone is expected to keep research notes for experiments and analyses, either electronically or in a handwritten notebook, with enough detail that the work can be understood and revisited months later.",
            "Record why important choices were made (such as parameter settings, filtering thresholds, or experimental adjustments), not only what was done.",
            "Link notes clearly to the corresponding raw data folders, scripts, slides, or manuscript drafts so decisions and outputs stay connected."
          ]
        },
        {
          title: "Code and reproducible workflows",
          bullets: [
            "Use version control (such as Git) for code-based projects whenever possible.",
            "Organize scripts and notebooks so the main analysis path is understandable without relying on memory. Keep notebooks runnable top-to-bottom, and move reusable logic into standalone scripts or modules.",
            "Include a README with the folder structure, main scripts, expected inputs and outputs, and the order in which scripts should be run.",
            "Document the software environment, package versions (for example, conda environment.yml, pyproject.toml/requirements.txt, or renv), operating system or server, and external tools needed to rerun the work.",
            "Before making code public, check carefully for private data, credentials, hardcoded machine-specific paths, unpublished collaborator materials, and licensing issues."
          ]
        }
      ]
    },
    {
      id: "llms",
      title: "Large Language Models (LLMs)",
      deck: "LLMs are useful research tools, and we should embrace them thoughtfully.",
      paragraphs: [
        "LLMs and AI-powered assistants can help with coding, documentation, literature triage, outlining, editing, brainstorming, data-analysis planning, presentation preparation, and learning unfamiliar tools or concepts. They are most useful when they make us faster, clearer, and more careful, not when they replace our understanding."
      ],
      blocks: [
        {
          title: "Responsibility and verification",
          bullets: [
            [
              {
                text: "It is your responsibility to understand every line of code that you commit. You are also responsible for every analysis and claim that you submit. Never accept LLM output without understanding it and verifying it with tests, inspection, source checks, and code review. We will use code review to help ensure this standard is met.",
                strong: true
              }
            ],
            "LLMs are usually strongest on common programming and writing tasks. They can be unreliable for specialized predictions, unpublished facts, or highly domain-specific scientific claims.",
            "Do not outsource scientific judgment or novelty. Use these tools to accelerate execution and clarify thinking, while developing your own ideas and expertise.",
            "Never use LLMs to fabricate data, analysis results, figures, or references. Verify every citation directly against the original source, and follow target journals' policies on disclosing AI-assisted writing or coding."
          ]
        },
        {
          title: "Context and privacy",
          bullets: [
            "Good results require good context: provide the relevant codebase, expected inputs and outputs, and clear instructions for the task.",
            [
              "Never upload ",
              { text: "manuscripts under confidential peer review", strong: true },
              " to external or cloud LLM tools. Likewise, do not paste sensitive data, private manuscripts, confidential code, unpublished collaborator information, credentials, or proprietary material into cloud tools without appropriate approval."
            ]
          ]
        }
      ]
    },
    {
      id: "collaboration-authorship",
      title: "Collaboration & Authorship",
      paragraphs: [
        "Authorship and collaboration expectations should be discussed early and revisited as contributions evolve. This avoids surprises when a project becomes a manuscript, talk, poster, or public dataset."
      ],
      bullets: [
        "The lead author (typically the first author) is usually responsible for driving the project, organizing the evidence, and preparing the first complete manuscript draft.",
        [
          { text: "All", strong: true },
          " coauthors should make clear intellectual, experimental, computational, analytical, or writing contributions. Authorship order—including shared first authorship when contributions are genuinely equal—reflects substantive scientific contribution; routine technical help or standard reagent/instrument support without intellectual contribution belongs in Acknowledgments."
        ],
        "If a member graduates or leaves the lab before a project is completed and another member takes over to finish the work, authorship and author order will be revisited fairly based on total contribution.",
        [
          { text: "All", strong: true },
          " coauthors should be kept informed before major decisions, submissions, public releases, or conference abstracts."
        ],
        [
          "No abstract, poster, manuscript, dataset, or code release should be submitted publicly without review and approval from ",
          { text: "all", strong: true },
          " coauthors and the ",
          { text: "PI", strong: true },
          "."
        ]
      ]
    },
    {
      id: "manuscripts",
      title: "Manuscripts",
      blocks: [
        {
          title: "Start with the story",
          bullets: [
            "A manuscript outline should make the paper's logic visible before the prose is polished: what problem matters, what gap remains, what evidence we have, and why the result changes how readers should think or work.",
            "Build the outline around figures and tables. Each major result should correspond to a figure, table, or clearly described analysis."
          ]
        },
        {
          title: "Outline components",
          bullets: [
            "Abstract: a concise 5-10 sentence summary of the whole paper, including context, gap, approach, main result, and significance.",
            "Introduction: a paragraph-level plan explaining the broad problem, the specific question, what has been done before, why this work is different or better, and the main contributions.",
            "Results: a list of key figures and tables. Draft captions early so each figure has a clear standalone message.",
            "Discussion: key interpretations, important limitations, broader conclusions supported by the data, and future directions.",
            "Methods and supporting information: experiments, controls, ablations, datasets, method details, supplementary figures, and anything needed for reproducibility but too detailed for the main text."
          ]
        },
        {
          title: "Drafting and revision",
          bullets: [
            "Draft early enough that revisions can improve the science, not only the wording.",
            "Calibrate claims carefully: always distinguish experimentally confirmed identifications (for example, authentic standards / MSI Level 1) from putative spectral library matches, molecular networking analogs, or computational predictions.",
            "Use a reference manager (such as Zotero) from the first draft rather than formatting citations manually.",
            "Use comments and tracked changes as a learning process rather than a checklist to accept mechanically.",
            "When sending a manuscript draft to the PI, use a clear file name with the project name, your name initials, and date, for example: ProjectName_SX_20260901.docx."
          ]
        },
        {
          title: "Supplementary information",
          bullets: [
            "Supplementary information is usually prepared as two files: one Word document for supplementary figures and supplementary notes (if applicable), and one Excel file for supplementary tables.",
            "Nature journals usually also require a separate Excel file for source data."
          ]
        }
      ],
      resources: [
        {
          id: "resource-manuscript-template",
          title: "Manuscript Template",
          href: "/resources/manuscript_template_SX.docx",
          actionLabel: "Download Word template",
          bullets: [
            "Manuscript format may vary by journal; check the author guidelines when preparing the final version."
          ]
        }
      ]
    },
    {
      id: "figures",
      title: "Figures",
      blocks: [
        {
          title: "Minimum standard for every figure",
          bullets: [
            "Figures should look clean and professional in all contexts: lab meetings, manuscript drafts, posters, and final submissions.",
            "For an internal draft, clean and professional means the audience can understand what is plotted, what is being compared, and what conclusion the figure supports without guessing.",
            [
              "At any stage, axes must have clear ",
              { text: "labels", strong: true },
              " and ",
              { text: "units", strong: true },
              " when applicable; legends or direct labels must explain groups, colors, symbols, and abbreviations."
            ]
          ]
        },
        {
          title: "Publication and submission standards",
          bullets: [
            [
              "Avoid unnecessary chart borders, heavy gridlines, decorative effects, or hard-to-distinguish color combinations; use colorblind-friendly palettes (for example, avoid red–green contrasts). ",
              { text: "Less is more.", strong: true }
            ],
            "Use Arial (or Helvetica) throughout the figure, including labels, legends, annotations, and panel letters (a, b, c...).",
            "At the final printed size, most text should be 4-10 pt.",
            "Use consistent font size, line width, marker size, color palette, panel labels, and chemical structure style across all panels.",
            "Captions should state what is shown, the sample size, how summary statistics and error bars are defined (for example, mean ± s.d. or median and IQR), the statistical test, and exact p-values if applicable."
          ]
        },
        {
          title: "Figure assembly",
          bullets: [
            "Use a tool that supports vector editing, such as Adobe Illustrator, Inkscape, or PowerPoint.",
            "Save vector formats whenever possible, such as SVG or PDF, unless the journal requires a specific format.",
            "If a vector file becomes too large or impractical (for example, with large UMAP plots), export a lossless raster image such as PNG or TIFF at no less than 600 DPI rather than lossy JPEG.",
            "When assembling multipanel figures, export plots at the intended final figure or poster size to avoid awkward resizing later.",
            "If panels are generated separately, keep axis sizes, label positions, fonts, and line widths consistent across panels."
          ]
        },
        {
          title: "Chemical structures",
          bullets: [
            "Chemical structures should usually be drawn in ChemDraw, using Nature or ACS style.",
            "On macOS, export ChemDraw structures as SVG files. On Windows, copying and pasting into PowerPoint should preserve vector quality."
          ]
        },
        {
          title: "Plots and reproducibility",
          bullets: [
            "Generate quantitative plots programmatically in Python or R whenever possible (we generally prefer Python). Programmatic plotting matters because data may update, analyses may need to be rerun, and figures often need to be reproduced during revision. Avoid making plots manually in Excel or Prism.",
            "Keep plotting code, processed data, and exported figure files together.",
            [
              "For a practical introduction to data visualization, this is a great resource: ",
              {
                label: "From Data to Viz",
                href: "https://www.data-to-viz.com/"
              },
              "."
            ]
          ]
        }
      ],
      resources: [
        {
          id: "resource-figure-template",
          title: "Figure Template",
          href: "/resources/figures_template.pptx",
          actionLabel: "Download PowerPoint template",
          bullets: [
            "Use this template as a starting point for assembling clean, consistent manuscript and presentation figures."
          ]
        }
      ]
    },
    {
      id: "reviewing-manuscripts",
      title: "Reviewing Manuscripts",
      bullets: [
        [
          "Use a clear ",
          { text: "structure", strong: true },
          ": (1) a brief summary paragraph in your own words, (2) major points that affect conclusions or rigor, and (3) minor points such as clarity, formatting, or typos."
        ],
        [
          "Be ",
          { text: "kind", strong: true },
          ". Write the review as if you are helping real people improve work they care about."
        ],
        [
          "Start with the major ",
          { text: "strengths", strong: true },
          " when possible, especially if the work has clear value. This helps the authors and editor understand what is worth preserving."
        ],
        [
          "Separate ",
          { text: "technical correctness", strong: true },
          " from ",
          { text: "novelty or significance", strong: true },
          ". A correct paper can still have limited impact; a potentially important paper can still need stronger evidence."
        ],
        "When claims are overstated, identify the specific claim and explain what the data do and do not support.",
        [
          "For each major concern, try to ",
          { text: "propose a solution", strong: true },
          ", even if it is not perfect. This is more helpful than only saying that something is wrong or missing."
        ],
        [
          "Treat manuscripts under review as ",
          { text: "strictly confidential", strong: true },
          ": do not share them outside authorized co-reviewers, and never upload them to external or cloud LLM tools."
        ],
        "Flag potential conflicts of interest early, respect review deadlines, and ensure any co-reviewing with the PI is disclosed to the editor in line with journal policy."
      ]
    },
    {
      id: "reading-list-key-papers",
      title: "Reading List & Key Papers",
      paragraphs: [
        "These are key papers and tools that all lab members are expected to read and become familiar with. The goal is not to memorize every detail, but to understand what each paper contributes, what each tool is used for, when it is relevant, and how it connects to our work."
      ],
      blocks: [
        {
          title: "Xing Lab Core Papers",
          body: "Foundational methods and studies from our group covering MS/MS interpretation, spectral search, and repository-scale metabolite discovery.",
          bullets: [
            [
              { label: "BUDDY", href: "https://www.nature.com/articles/s41592-023-01850-x" },
              " — bottom-up MS/MS interrogation for molecular formula discovery."
            ],
            [
              { label: "Reverse spectral search", href: "https://doi.org/10.1021/acs.analchem.5c02047" },
              " — reimagined reverse spectral search for annotating chimeric MS/MS spectra."
            ],
            [
              {
                label: "Navigating the conjugated metabolome",
                href: "https://www.biorxiv.org/content/10.64898/2026.02.06.704496v1"
              },
              " — repository-scale exploration of conjugated metabolites across public LC-MS/MS datasets."
            ]
          ]
        },
        {
          title: "Key Research and Tool Papers",
          body: "Core research papers and method/tool papers that define important ideas, workflows, and resources for the lab.",
          subblocks: [
            {
              title: "Key research papers",
              bullets: [
                [
                  { label: "Bile acid paper", href: "https://www.cell.com/cell/fulltext/S0092-8674(24)00185-5" },
                  " — uncovers the underappreciated diversity of microbial bile acid modifications."
                ],
                [
                  { label: "N-acyl lipid paper", href: "https://www.cell.com/cell/fulltext/S0092-8674(25)00565-3" },
                  " — charts microbial N-acyl lipids and their biological distributions across metabolomics datasets."
                ],
                [
                  { label: "Reverse metabolomics", href: "https://www.nature.com/articles/s41586-023-06906-8" },
                  " — synthesizes candidate molecules and searches public MS/MS repositories to reveal biological associations."
                ],
                [
                  {
                    label: "LLM-assisted metabolite discovery",
                    href: "https://www.nature.com/articles/s41586-025-09969-x"
                  },
                  " — illustrates how language models can support literature-grounded metabolite discovery."
                ]
              ]
            },
            {
              title: "Tool papers",
              bullets: [
                [
                  { label: "MZmine", href: "https://www.nature.com/articles/s41587-023-01690-2" },
                  " — modular platform for LC-MS feature detection, alignment, and preprocessing."
                ],
                [
                  { label: "USI", href: "https://www.biorxiv.org/content/10.1101/2020.05.09.086066v2" },
                  " — Universal Spectrum Identifier standard for referencing and resolving individual metabolomics spectra."
                ],
                [
                  { label: "FBMN", href: "https://www.nature.com/articles/s41592-020-0933-6" },
                  " — Feature-Based Molecular Networking linking quantitative LC-MS feature tables with MS/MS spectral networks."
                ],
                [
                  { label: "ReDU", href: "https://www.nature.com/articles/s41592-020-0916-7" },
                  " — standardized sample metadata framework enabling repository-scale reanalysis of public metabolomics data."
                ],
                [
                  { label: "Pan-ReDU", href: "https://www.nature.com/articles/s41467-025-60067-y" },
                  " — extends standardized metadata reanalysis across multiple major public metabolomics repositories."
                ],
                [
                  { label: "MassQL", href: "https://www.nature.com/articles/s41592-025-02660-z" },
                  " — mass spectrometry query language for searching spectra by fragments, neutral losses, and chromatographic patterns."
                ],
                [
                  { label: "MASST", href: "https://www.nature.com/articles/s41587-019-0375-9" },
                  " — Mass Spectrometry Search Tool for querying a single MS/MS spectrum against public repositories."
                ],
                [
                  { label: "microbeMASST", href: "https://www.nature.com/articles/s41564-023-01575-9" },
                  " — taxonomically informed MS/MS spectral search across cultured microbial isolates."
                ],
                [
                  { label: "StructureMASST", href: "https://www.nature.com/articles/s41587-026-03082-8" },
                  " — structure-centric searching to map chemical structures across the public metabolome."
                ]
              ]
            }
          ]
        },
        {
          title: "Commonly Used Tool Links",
          body:
            "Lab members should know what these online resources are used for and when they are the right place to start.",
          bullets: [
            [
              { label: "GNPS library", href: "https://external.gnps2.org/gnpslibrary" },
              " — browse and query community-curated public MS/MS reference spectral libraries."
            ],
            [
              { label: "Pan-ReDU", href: "https://redu.gnps2.org/" },
              " — filter and co-analyze public metabolomics files by standardized sample metadata."
            ],
            [
              { label: "USI resolver", href: "https://metabolomics-usi.gnps2.org/" },
              " — inspect, visualize, and generate mirror plots for MS/MS spectra directly from USIs."
            ],
            [
              { label: "Fast MASST", href: "https://fasst.gnps2.org/fastsearch/" },
              " — rapid MS/MS spectral search across public metabolomics repositories."
            ],
            [
              { label: "microbeMASST", href: "https://masst.gnps2.org/microbemasst/" },
              " — map MS/MS spectra onto microbial taxonomy across cultured isolates."
            ],
            [
              { label: "microbiomeMASST", href: "https://masst.gnps2.org/microbiomemasst/" },
              " — search MS/MS spectra across microbiome-associated public datasets."
            ],
            [
              { label: "plantMASST", href: "https://masst.gnps2.org/plantmasst/" },
              " — explore plant chemotaxonomic distributions of MS/MS spectra."
            ],
            [
              { label: "StructureMASST", href: "https://structure-masst.gnps2.org/" },
              " — query public metabolomics repositories starting from a chemical structure."
            ],
            [
              { label: "GNPS dashboard", href: "https://dashboard.gnps2.org/" },
              " — interactive browser for inspecting raw LC-MS chromatograms and spectra online."
            ]
          ]
        }
      ]
    },
    {
      id: "acknowledgment",
      title: "Acknowledgment",
      unnumbered: true,
      paragraphs: [
        [
          "This guide is inspired in part by publicly shared lab guides and resource documents from the ",
          {
            label: "Coley Research Group @ MIT",
            href: "https://coley.mit.edu/"
          },
          " and the ",
          {
            label: "Wang Bioinformatics Lab @ UC Riverside",
            href: "https://www.cs.ucr.edu/~mingxunw/"
          },
          ". We thank these groups for making their materials available to the broader research community."
        ]
      ]
    }
  ]
};

function getGuideSections(sectionIds: string[]) {
  return sectionIds
    .map((sectionId) => guideContent.sections.find((section) => section.id === sectionId))
    .filter((section): section is GuideSection => Boolean(section));
}

export const guidePages: GuidePageSummary[] = [
  {
    label: "LAB LIFE",
    title: "Lab Life",
    description:
      "Values, communication norms, meeting routines, time away and well-being, and mentoring.",
    href: "/guide/lab-life"
  },
  {
    label: "RESEARCH PRACTICE",
    title: "Research Practice",
    description:
      "Data, documentation, code, LLM use, collaboration and authorship, manuscripts, figures, reviewing, and key literature.",
    href: "/guide/research-practice"
  }
];

export const labLifeGuideContent: GuideContent = {
  eyebrow: "Lab Guide",
  title: "Lab Life",
  description:
    "Shared expectations, practical routines, and norms for working together in a healthy, thoughtful, and reliable lab environment.",
  tocTitle: "Lab Life Contents",
  alternateHref: "/guide/lab-life/zh",
  alternateLabel: "中文",
  sections: getGuideSections([
    "overview",
    "values-expectations",
    "communication-meetings",
    "time-away-wellbeing",
    "mentoring-career",
    "acknowledgment"
  ])
};

const researchPracticeOverviewSection: GuideSection = {
  id: "overview",
  title: "Overview",
  paragraphs: [
    "Research practice covers the habits that make our scientific work clear, reusable, and trustworthy. This page gathers expectations for data, documentation, code, responsible use of LLMs, collaboration and authorship, manuscripts, figures, peer review, and key literature.",
    [
      "The common thread is reproducibility: future you, lab members, collaborators, reviewers, and readers should be able to understand what was done, why it was done, and how conclusions were supported. For lab culture, communication norms, meetings, well-being, and mentoring, see the ",
      {
        label: "Lab Life",
        href: "/guide/lab-life"
      },
      " guide."
    ]
  ]
};

export const researchPracticeGuideContent: GuideContent = {
  eyebrow: "Lab Guide",
  title: "Research Practice",
  description:
    "Practical standards and reusable resources for data management, documentation, code, LLMs, collaboration and authorship, manuscripts, figures, peer review, and key literature.",
  tocTitle: "Research Practice Contents",
  alternateHref: "/guide/research-practice/zh",
  alternateLabel: "中文",
  sections: [
    researchPracticeOverviewSection,
    ...getGuideSections([
      "data",
      "documentation-data-code",
      "llms",
      "collaboration-authorship",
      "manuscripts",
      "figures",
      "reviewing-manuscripts",
      "reading-list-key-papers",
      "acknowledgment"
    ])
  ]
};

const translationNoticeZh: GuideText = [
  { text: "翻译说明：", strong: true },
  "本中文版本由 AI 辅助翻译并经人工润色，若个别表述与英文版存在细微差异，请以英文版为准；也欢迎随时告诉我们需要修订的地方。"
];

const acknowledgmentSectionZh: GuideSection = {
  id: "acknowledgment",
  title: "致谢",
  unnumbered: true,
  paragraphs: [
    [
      "本指南部分参考了 ",
      {
        label: "Coley Research Group @ MIT",
        href: "https://coley.mit.edu/"
      },
      " 与 ",
      {
        label: "Wang Bioinformatics Lab @ UC Riverside",
        href: "https://www.cs.ucr.edu/~mingxunw/"
      },
      " 公开分享的实验室指南与资源。感谢这些课题组向科研界慷慨分享这些宝贵资料。"
    ]
  ]
};

const labLifeOverviewSectionZh: GuideSection = {
  id: "overview",
  title: "概览",
  paragraphs: [
    "这份指南旨在帮助大家更顺畅地融入实验室生活，介绍我们的核心价值观、日常沟通与组会方式、休假与身心健康原则，以及学术指导与职业发展支持。",
    "我们追求有影响力的科研，但绝不以牺牲成员的身心健康、生活幸福或长期成长为代价。",
    [
      "无论在科研进展、职业发展还是生活中遇到困难，都欢迎随时与导师沟通。关于数据管理、文档与代码、LLM 规范使用、合作与作者署名、论文写作、科研绘图、论文审阅及核心阅读资源，请查阅",
      {
        label: "科研实践",
        href: "/guide/research-practice/zh"
      },
      "指南。"
    ]
  ]
};

const valuesExpectationsSectionZh: GuideSection = {
  id: "values-expectations",
  title: "价值观与期待",
  deck:
    "我们希望实验室既是一个潜心钻研的地方，也是一个让每个人感到受尊重、有支持、能持续成长的集体。",
  bullets: [
    "严谨治学、友善交流：审慎对待数据、论断与解读，做好清晰记录，以建设性的方式探讨和质疑观点。",
    "坦诚面对失误与阴性结果：实验失败、异常对照与无心之失都是科研的常态，请尽早沟通以便共同排查和改进；隐瞒或刻意修饰数据是绝对不可接受的。",
    "尊重每一位成员：优秀与否不取决于背景、头衔、语言或资历。每个人都应能够安心提问、表达顾虑并贡献想法。",
    "彼此可靠：对自己的工作负责，及时与合作者同步进展，在问题拖慢项目前主动沟通。",
    "主动了解组内工作：关注彼此的课题，积极寻找交流与合作的机会。",
    "保持学习：没有人一开始就掌握所有实验方法、仪器操作、编程习惯或写作规范。主动寻求帮助本身就是做好科研的一部分。"
  ]
};

const communicationMeetingsSectionZh: GuideSection = {
  id: "communication-meetings",
  title: "沟通与会议",
  blocks: [
    {
      title: "沟通",
      bullets: [
        "日常快速沟通与事务协调请使用实验室即时通讯群；正式申请、对外联系、文件往来以及有明确截止时间的事项，请使用电子邮件。",
        [
          { text: "非紧急消息无需在晚上或周末回复", strong: true },
          "。即使导师或同事在工作时间之外发送了消息，也无需立即回复，等到下一个工作日处理即可。"
        ],
        "如有紧急事项，请在消息中直接注明截止时间。",
        "如需推荐信，请至少提前 3 周联系导师，并附上最新简历、申请项目与截止日期清单，以及希望重点突出的成果或经历简介。"
      ]
    },
    {
      title: "一对一交流",
      bullets: [
        "一对一交流通常每周一次，也可根据项目阶段调整为每两周一次。",
        "参会时尽量带上简短议程、近期结果以及需要讨论的具体问题。",
        [
          "遇到拖慢项目进度的卡点时，不要等到下一次固定会议；请",
          { text: "尽快联系导师", strong: true },
          "。"
        ]
      ]
    },
    {
      title: "组会",
      body:
        "组会是大家共同学习前沿进展、锻炼学术表达、培养科研判断力并了解组内各项工作的重要平台。除上课、出差、生病或其他日程冲突外，成员均应按时参加；如需缺席，请提前告知导师。文献讨论和代码审查轮流融入常规组会，不另设额外固定会议。",
      subblocks: [
        {
          title: "每周常规组会",
          bullets: [
            "成员轮流进行阶段性进展汇报、难题研讨及不定期的课题规划交流，以便项目仍有调整空间时就能集思广益。",
            "进展汇报建议简明回顾课题背景，梳理近期进展（包括不顺利的尝试），指出当前难点并提出下一步计划。"
          ]
        },
        {
          title: "文献讨论",
          bullets: [
            "报告人轮流担任，每次选择 1–2 篇代表性论文，并至少提前 2–3 天分享给组内成员，方便大家提前阅读。",
            "文献讨论重在深入剖析重要成果与方法、共同培养科研判断力，而不仅是转发链接。请带着具体问题、思考或质疑参与讨论。"
          ]
        },
        {
          title: "代码审查",
          bullets: [
            "代码审查旨在提升代码的可重复性、可读性、测试覆盖与文档质量，也帮助大家更负责任地使用 LLM 辅助生成的代码。",
            "目的是共同精进，而非挑刺。展示代码前请先简要交代科学问题与分析背景，方便实验与计算背景的成员共同参与，并带着具体问题或希望重点审阅的代码片段前来交流。"
          ]
        }
      ]
    }
  ]
};

const timeAwayWellbeingSectionZh: GuideSection = {
  id: "time-away-wellbeing",
  title: "休假与身心健康",
  paragraphs: [
    "学术工作具备一定弹性，我们应善用这份弹性，建立健康、可持续的节奏。工作时长并不等同于科研质量。",
    "劳逸结合、留出思考与恢复的时间，并保有实验室之外的生活，才更有利于长期做出好研究。提前做好安排，也便于团队彼此支持。"
  ],
  bullets: [
    "不同成员、不同项目阶段的日常节奏可以有所不同，但沟通与可靠性始终重要。若你的时间安排会影响协作，请提前告知合作者。",
    "较长时间的离校或休假请提前规划，并告知导师及依赖你工作的合作成员。",
    "短暂休整、病假、就医、家庭事务和个人突发情况都是生活的一部分。告知团队必要安排即可，无需透露个人隐私细节。",
    "尊重他人的休息时间。除非遇到明确的截止日期或安全问题，请避免在晚上、周末、节假日或休假期间发出不必要的催促。",
    "临近重要截止日期时可能会出现阶段性高强度工作，请提前沟通清楚预期，并在结束后及时回归可持续的节奏。"
  ]
};

const mentoringCareerSectionZh: GuideSection = {
  id: "mentoring-career",
  title: "指导与职业发展",
  paragraphs: [
    "良好的科研训练不只是完成眼前的课题。无论你未来计划走向学术界、产业界还是其他方向，我们都希望每位成员离开实验室时，都具备更扎实的科学判断力、独立研究能力和清晰的下一步规划。"
  ],
  bullets: [
    "除日常课题讨论外，我们还会定期进行阶段性回顾，专门交流研究进展、学位或培养节点、能力拓展与长期职业规划。",
    "鼓励组员积极申请各类奖学金、基金与学术奖项，并在学术会议和研讨会上展示自己的工作。",
    "欢迎提前思考个人发展目标，主动告诉导师你希望获得哪些科研训练、写作指导、带教经验或学术交流机会。",
    "学术指导同样发生在团队成员之间：鼓励高年级成员友善地帮助新成员上手，新成员也无需顾虑，随时提问。"
  ]
};

export const labLifeGuideContentZh: GuideContent = {
  eyebrow: "实验室指南",
  title: "实验室生活",
  description:
    "关于实验室文化、日常沟通、组会节奏、身心健康与职业成长的共同约定。",
  tocTitle: "实验室生活目录",
  notice: translationNoticeZh,
  htmlLang: "zh-CN",
  alternateHref: "/guide/lab-life",
  alternateLabel: "English",
  sections: [
    labLifeOverviewSectionZh,
    valuesExpectationsSectionZh,
    communicationMeetingsSectionZh,
    timeAwayWellbeingSectionZh,
    mentoringCareerSectionZh,
    acknowledgmentSectionZh
  ]
};

const researchPracticeOverviewSectionZh: GuideSection = {
  id: "overview",
  title: "概览",
  paragraphs: [
    "科研实践总结了帮助我们把研究做得清晰、可复用且值得信赖的日常习惯。本页汇总了数据管理、文档与代码、大语言模型（LLM）规范使用、合作与作者署名、论文写作、科研绘图、论文审阅以及核心阅读资源等方面的要求。",
    [
      "贯穿一切的核心原则是可重复性：未来的自己、组内同事、合作者、审稿人和读者，都应能够看清我们做了什么、为何这样做，以及证据如何支撑结论。关于实验室文化、沟通与组会、休假与身心健康以及职业发展，请查阅",
      {
        label: "实验室生活",
        href: "/guide/lab-life/zh"
      },
      "指南。"
    ]
  ]
};

const dataSectionZh: GuideSection = {
  id: "data",
  title: "数据管理",
  deck:
    "原始数据是科研记录的基石。无论最终是否出现在论文中，都应妥善保存、规范整理、及时备份、完整记录，并在发表时规范共享。",
  blocks: [
    {
      title: "保存原始数据",
      bullets: [
        [
          "完整保存",
          { text: "所有", strong: true },
          "原始数据，包括探索性测试、失败实验、对照样本以及最终论文未采用的文件。",
          { text: "切勿覆盖原始文件。", strong: true }
        ],
        "将仪器原始格式文件（如 .raw、.d、.wiff）原样保留，并与转换后的开放格式（如 .mzML）、处理后数据、整理表格、导出图表及分析输出分开存放，同时记录转换工具与版本号（如 MSConvert）。",
        "如某部分数据需要在分析中排除，请记录原因，不要直接删除原始文件。"
      ]
    },
    {
      title: "规范整理项目数据",
      bullets: [
        "原始数据、处理后数据、样本元数据与分析输出应存放在命名清晰的目录中，并同步记录处理步骤、关键参数及质控决策。",
        "文件和文件夹命名请包含清晰的日期与含义，便于日后追溯版本与研究过程。",
        "确保合作者与后续接手的组员能迅速定位关键文件，并明确每项结果对应的数据版本。"
      ]
    },
    {
      title: "数据备份",
      bullets: [
        [
          { text: "尽早备份、定期备份。", strong: true },
          "重要项目数据应尽量保存在",
          { text: "两个以上位置", strong: true },
          "，例如外置硬盘配合实验室 NAS、学校认可的存储空间或合规云存储。"
        ],
        [
          "macOS 用户可使用 ",
          {
            label: "Time Machine",
            href: "https://support.apple.com/guide/mac-help/mh35860/mac"
          },
          " 配合外置硬盘或网络存储；Windows 用户可使用文件历史记录（",
          {
            label: "File History",
            href: "https://support.microsoft.com/en-us/windows/backup-and-restore-with-file-history-7bf065bf-f1ea-0a78-c1cf-7dcf51cc8bfc"
          },
          "）备份至外置硬盘或网络存储，并确认默认库之外的项目文件夹也已纳入备份。"
        ],
        "定期检查备份是否能正常恢复，尤其是在大规模清理文件、更换电脑、论文投稿或公开数据前。"
      ]
    },
    {
      title: "公开数据与谱图共享",
      bullets: [
        "论文发表时（或在条件合适发布预印本时），应将原始 LC-MS/MS 数据集上传至 MassIVE/GNPS、MetaboLights 或 Metabolomics Workbench 等公共代谢组学数据库，并在论文中注明数据编号。",
        "整理完整、规范的样本元数据（例如采用兼容 ReDU 的标准格式），让公开数据能够真正被学术界复用。",
        "将新验证的参考二级质谱图（MS/MS）上传至公共谱库（如 GNPS），并在适用时为关键谱图记录通用谱图标识符（USI）。"
      ]
    }
  ]
};

const documentationCodeSectionZh: GuideSection = {
  id: "documentation-data-code",
  title: "文档与代码",
  deck:
    "未来的自己、组内同事、合作者和审稿人，都应能够看清我们做了什么，以及为什么这样做。",
  blocks: [
    {
      title: "科研记录",
      bullets: [
        "每位成员都应做好实验与分析记录（电子记录或纸质实验本均可），详略程度应足以在数月后完整回溯。",
        "不仅记录做了什么，更要记下做出关键选择的原因（如参数设置、过滤阈值或实验调整依据）。",
        "将实验与分析记录同对应的原始数据目录、脚本、汇报材料和论文草稿清晰关联，确保决策与产出可相互追溯。"
      ]
    },
    {
      title: "代码与可重复工作流",
      bullets: [
        "代码类项目尽量全程使用版本控制（如 Git）。",
        "合理组织脚本与 notebook，使核心分析流程不依赖个人记忆也能一目了然；确保 notebook 可从头到尾顺序运行，并将可复用逻辑整理为独立脚本或模块。",
        "编写 README，写明目录结构、核心脚本、预期输入输出以及运行顺序。",
        "记录软件环境、关键依赖包版本（如 conda 的 environment.yml、pyproject.toml/requirements.txt 或 renv）、运行平台（操作系统或服务器）以及重现所需的外部工具。",
        "公开发布代码前，请仔细排查敏感数据、账号密钥、硬编码的本机路径、合作者未发表材料以及开源协议问题。"
      ]
    }
  ]
};

const llmsSectionZh: GuideSection = {
  id: "llms",
  title: "大语言模型（LLMs）",
  deck: "大语言模型是有力的科研辅助工具，我们鼓励积极善用，同时坚持严格核验。",
  paragraphs: [
    "大语言模型（LLM）和 AI 助手可以辅助代码编写、文档整理、文献初筛、提纲构思、文字润色、头脑风暴、分析方案设计、报告准备以及学习新工具或陌生概念。它们最有价值的用法是帮我们更快、更清晰、更严谨地工作，而不是替代思考与理解。"
  ],
  blocks: [
    {
      title: "责任与核验",
      bullets: [
        [
          {
            text: "你有责任理解自己提交的每一行代码，并对每一项分析结果与科学论断负责。切勿在未充分理解与验证的情况下直接采纳 LLM 输出；请通过测试、逐行检查、溯源核对和代码审查加以确认。",
            strong: true
          }
        ],
        "LLM 通常擅长通用编程与语言润色，但在高度专业化的预测、尚未发表的事实或细分的领域科学判断上仍可能出错或产生幻觉。",
        "切勿将科学判断力与学术创新外包给工具。让工具加速执行、梳理思路，同时持续打磨自己的独立判断与专业功底。",
        "严禁使用 LLM 编造数据、分析结果、图表或参考文献。所有引用文献均须核对原始出处，并遵循目标期刊关于 AI 辅助写作或编程的披露规定。"
      ]
    },
    {
      title: "上下文与数据隐私",
      bullets: [
        "高质量输出依赖清晰的上下文：请提供相关代码上下文、预期输入输出以及明确的任务要求。",
        [
          "严禁将",
          { text: "处于保密同行评议阶段的审稿手稿", strong: true },
          "上传至外部或云端 LLM 工具。同样，未经适当批准，切勿将敏感数据、未发表手稿、保密代码、合作者未公开信息、账号密钥或专有资料粘贴至外部云端工具。"
        ]
      ]
    }
  ]
};

const collaborationAuthorshipSectionZh: GuideSection = {
  id: "collaboration-authorship",
  title: "合作与作者署名",
  paragraphs: [
    "合作分工与作者署名应尽早商议，并随着贡献的变化及时沟通确认，避免在整理论文、学术报告、海报或公开数据集时产生误解。"
  ],
  bullets: [
    "主要负责作者（通常为第一作者）负责推进课题、整理证据链，并完成第一版完整论文初稿。",
    [
      { text: "所有", strong: true },
      "共同作者都应有实质性的学术思路、实验、计算、分析或写作贡献。作者排序（包括贡献相当时的共同第一作者）应客观反映实质性科学贡献；不含学术或分析贡献的常规技术协助、试剂提供或仪器维护应在致谢（Acknowledgments）中体现。"
    ],
    "如某位成员在课题完成前毕业或离开实验室，由其他成员接手推进并完成后续工作，作者名单与署名排序将根据最终总贡献公平重新评估。",
    [
      { text: "所有", strong: true },
      "共同作者在重大决策、论文投稿、数据/代码公开发布或提交会议摘要前，都应被及时知会。"
    ],
    [
      "任何摘要、海报、论文、数据集或代码在公开发布或提交前，均须经",
      { text: "所有", strong: true },
      "共同作者及",
      { text: "导师", strong: true },
      "审阅并同意。"
    ]
  ]
};

const manuscriptsSectionZh: GuideSection = {
  id: "manuscripts",
  title: "论文写作",
  blocks: [
    {
      title: "先理清科学故事",
      bullets: [
        "在雕琢措辞之前，论文大纲应先把核心逻辑立住：问题为何重要、研究空白在哪里、我们掌握了哪些证据，以及结果为何会改变读者的认知或工作方式。",
        "围绕图表搭建大纲，每一项主要结论都应有对应的图、表或清晰呈现的分析作为支撑。"
      ]
    },
    {
      title: "大纲组成",
      bullets: [
        "摘要：用 5–10 句话精炼概括研究背景、科学空白、研究方法、核心发现与意义。",
        "引言：按段落规划，依次讲清宏观背景、具体问题、前人进展、本研究的独特之处以及核心贡献。",
        "结果：列出关键图与表，并尽早起草图注，让每张图都能独立传达明确信息。",
        "讨论：梳理核心解读、重要局限性、有数据充分支撑的延伸结论以及未来改进方向。",
        "方法与补充材料：涵盖实验细节、对照与消融实验、数据集、补充图表，以及确保可重复性所需但不宜放入正文的内容。"
      ]
    },
    {
      title: "起草与修改",
      bullets: [
        "尽早动笔，让修改不仅停留在润色文字，更能反过来完善科学论证与实验设计。",
        "审慎把握论断边界：始终清晰区分经标准品实验确证的鉴定结果（如 MSI Level 1）与基于谱库匹配、分子网络推演或计算预测的推测性注释。",
        "从初稿阶段即使用文献管理软件（如 Zotero），避免手动编排参考文献。",
        "将批注和修订视作学习与提升的过程，而非机械地逐条接受修改。",
        "将论文草稿发送给导师时，请使用清晰的文件名，包含项目名、姓名缩写与日期，例如：ProjectName_SX_20260901.docx。"
      ]
    },
    {
      title: "补充材料",
      bullets: [
        "补充材料通常整理为两个文件：一个 Word 文档存放补充图与补充说明（如适用），一个 Excel 文件存放补充表格。",
        "Nature 系列期刊通常还要求单独提交 Source Data Excel 文件。"
      ]
    }
  ],
  resources: [
    {
      id: "resource-manuscript-template",
      title: "论文模板",
      href: "/resources/manuscript_template_SX.docx",
      actionLabel: "下载 Word 模板",
      bullets: [
        "不同期刊的排版要求各有差异，准备终稿时请以目标期刊的作者指南为准。"
      ]
    }
  ]
};

const figuresSectionZh: GuideSection = {
  id: "figures",
  title: "科研绘图",
  blocks: [
    {
      title: "每张图的基本要求",
      bullets: [
        "无论是组会汇报、论文初稿、学术海报还是最终投稿，图表都应保持清晰、整洁与专业。",
        "即使是内部讨论草稿，也应让读者无需猜测就能看懂：图中画了什么、在比较什么，以及支撑什么结论。",
        [
          "任何阶段，坐标轴都应标注清晰的",
          { text: "名称", strong: true },
          "与",
          { text: "单位", strong: true },
          "（如适用）；图例或直接标注须清楚说明分组、配色、符号与缩写。"
        ]
      ]
    },
    {
      title: "发表与投稿标准",
      bullets: [
        [
          "避免多余的边框、厚重网格线、花哨装饰效果及难以区分的配色，优先选用色盲友好配色方案（如避免红绿对比）。",
          { text: "少即是多（Less is more）。", strong: true }
        ],
        "整张图统一使用 Arial（或 Helvetica）字体，包括坐标轴标签、图例、注释与子图编号（a, b, c…）。",
        "在最终印刷尺寸下，大多数文字字号应控制在 4–10 pt。",
        "同一组图中的所有子图（panel）应保持字号、线宽、点大小、配色方案、编号样式与化学结构风格一致。",
        "图注应写明展示内容、样本量、统计汇总量与误差棒定义（如均值 ± 标准差或中位数与四分位距）、统计检验方法，并在适用时给出精确 p 值。"
      ]
    },
    {
      title: "图表组装",
      bullets: [
        "选用支持矢量编辑的工具进行拼图与排版，如 Adobe Illustrator、Inkscape 或 PowerPoint。",
        "除非期刊另有规定，优先保存为 SVG 或 PDF 等矢量格式。",
        "若矢量文件过于庞大或不便编辑（如含大量散点的 UMAP 图），请导出不低于 600 DPI 的 PNG 或 TIFF 无损位图，避免使用有损压缩的 JPEG。",
        "组装多子图大图时，尽量按最终论文或海报的实际物理尺寸导出单图，避免后期反复缩放失真。",
        "分别生成的子图在拼接时，请保持坐标轴比例、标签位置、字体及线宽一致。"
      ]
    },
    {
      title: "化学结构",
      bullets: [
        "化学结构通常使用 ChemDraw 绘制，推荐采用 Nature 或 ACS 风格。",
        "macOS 上建议从 ChemDraw 导出为 SVG 文件；Windows 上直接复制粘贴到 PowerPoint 通常也可保留矢量清晰度。"
      ]
    },
    {
      title: "脚本绘图与可重复性",
      bullets: [
        "定量图表尽量使用 Python 或 R 编写脚本绘制（实验室默认推荐 Python），以便在数据更新、重跑分析或审稿修改时快速复现；避免手动在 Excel 或 Prism 中作图。",
        "请将绘图脚本、处理后的数据以及导出的图件归档在同一目录下。",
        [
          "数据可视化选型与入门可参考：",
          {
            label: "From Data to Viz",
            href: "https://www.data-to-viz.com/"
          },
          "。"
        ]
      ]
    }
  ],
  resources: [
    {
      id: "resource-figure-template",
      title: "科研绘图模板",
      href: "/resources/figures_template.pptx",
      actionLabel: "下载 PowerPoint 模板",
      bullets: [
        "可以此模板为起点，快速组装风格统一、整洁规范的论文与汇报图表。"
      ]
    }
  ]
};

const reviewingManuscriptsSectionZh: GuideSection = {
  id: "reviewing-manuscripts",
  title: "论文审阅",
  bullets: [
    [
      "采用清晰的",
      { text: "审稿结构", strong: true },
      "：（1）用自己的话简述文章核心内容的总结段；（2）影响结论或严谨性的主要意见（major points）；（3）涉及表述清晰度、图表规范或笔误的次要意见（minor points）。"
    ],
    [
      "保持",
      { text: "善意", strong: true },
      "。撰写审稿意见时，请记得对方同样是潜心做研究的学者，把审稿视作帮助同行完善工作的过程。"
    ],
    [
      "在合适的情况下，先肯定文章的主要",
      { text: "亮点与价值", strong: true },
      "，帮助作者和编辑明确哪些内容值得保留。"
    ],
    [
      "区分",
      { text: "技术严谨性", strong: true },
      "与",
      { text: "创新性或影响力", strong: true },
      "。技术无误的工作可能影响力有限，而颇具潜力的发现也可能仍需更扎实的证据支撑。"
    ],
    "若文中存在过度推断，请明确指出具体论断，并说明现有数据支持什么、不支持什么。",
    [
      "针对每一项主要意见，尽量",
      { text: "给出建设性修改建议", strong: true },
      "（哪怕并非十全十美），这比单纯指出缺陷更有帮助。"
    ],
    [
      "严格恪守",
      { text: "审稿保密原则", strong: true },
      "：不得向未获授权的人员转发审稿手稿，严禁将手稿上传至外部或云端 LLM 工具。"
    ],
    "如存在潜在利益冲突请尽早声明，按时提交审稿意见；若与导师联合审稿，须按期刊政策向编辑如实披露。"
  ]
};

const readingListSectionZh: GuideSection = {
  id: "reading-list-key-papers",
  title: "阅读清单与关键论文",
  paragraphs: [
    "以下核心论文与工具建议所有组员逐步熟悉。重点不在于死记硬背细节，而在于理解每项工作的核心贡献、每个工具的适用场景，以及它们如何与我们的研究方向相衔接。"
  ],
  blocks: [
    {
      title: "实验室核心论文",
      body: "课题组在 MS/MS 谱图解析、谱库检索及公共代谢组大数据挖掘方面的代表性方法与研究工作。",
      bullets: [
        [
          { label: "BUDDY", href: "https://www.nature.com/articles/s41592-023-01850-x" },
          " — 基于自下而上 MS/MS 碎片解析的分子式发现方法。"
        ],
        [
          { label: "Reverse spectral search", href: "https://doi.org/10.1021/acs.analchem.5c02047" },
          " — 重新审视反向谱图检索，用于嵌合（chimeric）MS/MS 谱图注释。"
        ],
        [
          {
            label: "Navigating the conjugated metabolome",
            href: "https://www.biorxiv.org/content/10.64898/2026.02.06.704496v1"
          },
          " — 在公共 LC-MS/MS 数据库尺度上系统探索结合态代谢组。"
        ]
      ]
    },
    {
      title: "核心研究论文与工具论文",
      body: "这些论文奠定了实验室常用的核心思路、分析工作流与公共资源基础。",
      subblocks: [
        {
          title: "关键研究论文",
          bullets: [
            [
              { label: "Bile acid paper", href: "https://www.cell.com/cell/fulltext/S0092-8674(24)00185-5" },
              " — 揭示微生物胆汁酸修饰的广泛化学多样性。"
            ],
            [
              { label: "N-acyl lipid paper", href: "https://www.cell.com/cell/fulltext/S0092-8674(25)00565-3" },
              " — 系统描绘微生物 N-酰基脂质在人体与环境代谢组中的分布规律。"
            ],
            [
              { label: "Reverse metabolomics", href: "https://www.nature.com/articles/s41586-023-06906-8" },
              " — 通过合成候选分子并检索公共 MS/MS 仓库来发现新的生物学关联。"
            ],
            [
              {
                label: "LLM-assisted metabolite discovery",
                href: "https://www.nature.com/articles/s41586-025-09969-x"
              },
              " — 展示大语言模型结合文献知识辅助代谢物发现的研究范式。"
            ]
          ]
        },
        {
          title: "工具论文",
          bullets: [
            [
              { label: "MZmine", href: "https://www.nature.com/articles/s41587-023-01690-2" },
              " — 模块化的 LC-MS 特征峰提取、对齐与数据预处理平台。"
            ],
            [
              { label: "USI", href: "https://www.biorxiv.org/content/10.1101/2020.05.09.086066v2" },
              " — 通用谱图标识符（Universal Spectrum Identifier）标准，用于精准引用与定位单张代谢组谱图。"
            ],
            [
              { label: "FBMN", href: "https://www.nature.com/articles/s41592-020-0933-6" },
              " — 基于特征峰的分子网络（Feature-Based Molecular Networking），将定量特征表与 MS/MS 分子网络相结合。"
            ],
            [
              { label: "ReDU", href: "https://www.nature.com/articles/s41592-020-0916-7" },
              " — 标准化样本元数据框架，支持公共代谢组数据的仓库级再分析。"
            ],
            [
              { label: "Pan-ReDU", href: "https://www.nature.com/articles/s41467-025-60067-y" },
              " — 将标准化元数据扩展至多个主流公共代谢组仓库，实现跨库联合挖掘。"
            ],
            [
              { label: "MassQL", href: "https://www.nature.com/articles/s41592-025-02660-z" },
              " — 质谱查询语言，可按特征碎片、中性丢失与色谱特征检索质谱数据。"
            ],
            [
              { label: "MASST", href: "https://www.nature.com/articles/s41587-019-0375-9" },
              " — 质谱搜索引擎，用于将单张 MS/MS 谱图在公共数据库中快速检索比对。"
            ],
            [
              { label: "microbeMASST", href: "https://www.nature.com/articles/s41564-023-01575-9" },
              " — 面向纯培养微生物谱库的分类学关联 MS/MS 检索工具。"
            ],
            [
              { label: "StructureMASST", href: "https://www.nature.com/articles/s41587-026-03082-8" },
              " — 以化学结构为起点，在公共代谢组数据库中全局检索相关谱图。"
            ]
          ]
        }
      ]
    },
    {
      title: "常用工具链接",
      body:
        "建议逐步熟悉以下在线资源的用途，了解何时最适合从它们入手开展分析。",
      bullets: [
        [
          { label: "GNPS library", href: "https://external.gnps2.org/gnpslibrary" },
          " — 浏览和检索社区维护的公共 MS/MS 参考谱图库。"
        ],
        [
          { label: "Pan-ReDU", href: "https://redu.gnps2.org/" },
          " — 按标准化样本元数据筛选并联合分析公共代谢组文件。"
        ],
        [
          { label: "USI resolver", href: "https://metabolomics-usi.gnps2.org/" },
          " — 通过 USI 直接查看、可视化并绘制 MS/MS 镜像对比图。"
        ],
        [
          { label: "Fast MASST", href: "https://fasst.gnps2.org/fastsearch/" },
          " — 在公共代谢组数据库中高速检索相似 MS/MS 谱图。"
        ],
        [
          { label: "microbeMASST", href: "https://masst.gnps2.org/microbemasst/" },
          " — 将 MS/MS 谱图映射至纯培养微生物系统发育树。"
        ],
        [
          { label: "microbiomeMASST", href: "https://masst.gnps2.org/microbiomemasst/" },
          " — 在微生物组相关公共数据集中检索目标 MS/MS 谱图。"
        ],
        [
          { label: "plantMASST", href: "https://masst.gnps2.org/plantmasst/" },
          " — 探索 MS/MS 谱图在植物化学分类学中的分布。"
        ],
        [
          { label: "StructureMASST", href: "https://structure-masst.gnps2.org/" },
          " — 从化学结构出发检索公共代谢组数据库。"
        ],
        [
          { label: "GNPS dashboard", href: "https://dashboard.gnps2.org/" },
          " — 在线交互式浏览原始 LC-MS 色谱图与质谱图。"
        ]
      ]
    }
  ]
};

export const researchPracticeGuideContentZh: GuideContent = {
  eyebrow: "实验室指南",
  title: "科研实践",
  description:
    "关于数据管理、文档与代码、LLM 规范使用、合作与作者署名、论文写作、科研绘图、论文审阅与核心阅读资源的实践指南。",
  tocTitle: "科研实践目录",
  notice: translationNoticeZh,
  htmlLang: "zh-CN",
  alternateHref: "/guide/research-practice",
  alternateLabel: "English",
  sections: [
    researchPracticeOverviewSectionZh,
    dataSectionZh,
    documentationCodeSectionZh,
    llmsSectionZh,
    collaborationAuthorshipSectionZh,
    manuscriptsSectionZh,
    figuresSectionZh,
    reviewingManuscriptsSectionZh,
    readingListSectionZh,
    acknowledgmentSectionZh
  ]
};
