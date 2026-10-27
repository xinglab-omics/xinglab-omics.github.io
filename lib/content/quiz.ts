import { structure } from "./structures";
import type { QuizQuestion } from "./types";

const photo = (slug: string) => `/images/quiz/photos/${slug}.jpg`;

export const quizQuestions: QuizQuestion[] = [
  {
    question: "After a hard workout, which molecule surges in your blood and can curb your appetite?",
    questionZh: "剧烈运动后，哪种分子会在血液中大量升高，还能抑制食欲？",
    image: {
      src: photo("sprint"),
      alt: "A sprinter pushing off from the start on a red running track",
      credit: { text: "Tom Morbey / Unsplash", url: "https://unsplash.com/photos/runner-starting-sprint-on-red-track-6PujGXV5kyc" }
    },
    options: [
      { name: "Creatine", nameZh: "肌酸", structure: structure("creatine") },
      { name: "N-lactoyl-phenylalanine", nameZh: "N-乳酰苯丙氨酸", structure: structure("lac-phe") },
      { name: "Melatonin", nameZh: "褪黑素", structure: structure("melatonin") },
      { name: "Taurine", nameZh: "牛磺酸", structure: structure("taurine") }
    ],
    answer: "N-lactoyl-phenylalanine",
    explanation:
      "N-lactoyl-phenylalanine (Lac-Phe) is stitched together from lactate, which builds up during intense exercise, and the amino acid phenylalanine. Its blood levels rise sharply after activity in mice, racehorses, and humans. In obese mice, raising Lac-Phe reduced food intake and body weight without changing how much they moved.",
    citation: {
      authors: "Li VL, He Y, Contrepois K, et al.",
      title: "An exercise-inducible metabolite that suppresses feeding and obesity",
      venue: "Nature",
      year: 2022,
      url: "https://doi.org/10.1038/s41586-022-04828-5"
    }
  },
  {
    question:
      "Gut bacteria break down choline from foods like eggs and meat, and your liver turns the product into a molecule linked to heart disease. Which one?",
    questionZh: "肠道细菌会分解鸡蛋、肉类等食物中的胆碱，其产物经肝脏转化后，生成一种与心血管疾病相关的分子。是哪一种？",
    image: {
      src: photo("eggs-and-meat"),
      alt: "A plate of fried eggs and a beef patty with mushrooms and potatoes",
      credit: { text: "Orkun Orcan / Unsplash", url: "https://unsplash.com/photos/a-white-plate-topped-with-meat-and-eggs-6QAhC4Val74" }
    },
    options: [
      { name: "Cholesterol", nameZh: "胆固醇", structure: structure("cholesterol") },
      { name: "Uric acid", nameZh: "尿酸", structure: structure("uric-acid") },
      { name: "TMAO (trimethylamine N-oxide)", nameZh: "氧化三甲胺", structure: structure("tmao") },
      { name: "Homocysteine", nameZh: "同型半胱氨酸", structure: structure("homocysteine") }
    ],
    answer: "TMAO (trimethylamine N-oxide)",
    explanation:
      "Gut bacteria turn dietary choline into trimethylamine, which liver enzymes (flavin monooxygenases) oxidize into TMAO. An untargeted metabolomics screen of plasma found that TMAO predicted cardiovascular risk, and feeding mice choline or TMAO promoted atherosclerosis. Germ-free mice confirmed that gut bacteria are essential for making it.",
    citation: {
      authors: "Wang Z, Klipfell E, Bennett BJ, et al.",
      title: "Gut flora metabolism of phosphatidylcholine promotes cardiovascular disease",
      venue: "Nature",
      year: 2011,
      url: "https://doi.org/10.1038/nature09922"
    }
  },
  {
    question:
      "Pomegranates, walnuts, and berries contain ellagitannins, which gut microbes turn into a molecule that helps cells clear out worn-out mitochondria. Which one?",
    questionZh: "石榴、核桃和浆果中含有鞣花单宁，肠道微生物能把它转化为一种帮助细胞清除受损线粒体的分子。是哪一种？",
    image: {
      src: photo("pomegranate-walnuts"),
      alt: "Split pomegranates and walnuts on a wooden board",
      credit: { text: "Roberto Patti / Unsplash", url: "https://unsplash.com/photos/brown-walnuts-beside-pomegranate-fruit-on-board-weravkagvgE" }
    },
    options: [
      { name: "Urolithin A", nameZh: "尿石素A", structure: structure("urolithin-a") },
      { name: "Resveratrol", nameZh: "白藜芦醇", structure: structure("resveratrol") },
      { name: "Quercetin", nameZh: "槲皮素", structure: structure("quercetin") },
      { name: "Capsaicin", nameZh: "辣椒素", structure: structure("capsaicin") }
    ],
    answer: "Urolithin A",
    explanation:
      "Urolithin A switches on mitophagy, the cell's recycling program for damaged mitochondria. It extended lifespan in worms (C. elegans) and improved exercise capacity in aging mice and young rats. Not everyone's gut microbes can make it from ellagitannins.",
    citation: {
      authors: "Ryu D, Mouchiroud L, Andreux PA, et al.",
      title: "Urolithin A induces mitophagy and prolongs lifespan in C. elegans and increases muscle function in rodents",
      venue: "Nature Medicine",
      year: 2016,
      url: "https://doi.org/10.1038/nm.4132"
    }
  },
  {
    question:
      "Gut bacteria can turn a Parkinson's disease drug into dopamine in the gut, before it ever reaches the brain. Which drug?",
    questionZh: "肠道细菌能在药物到达大脑之前，就在肠道里把一种帕金森病药物转化成多巴胺。是哪种药物？",
    image: {
      src: photo("pills"),
      alt: "A pile of white tablets",
      credit: { text: "James Yarema / Unsplash", url: "https://unsplash.com/photos/white-medication-pills-on-brown-surface-kdgiNc0sDeI" }
    },
    options: [
      { name: "Metformin", nameZh: "二甲双胍", structure: structure("metformin") },
      { name: "Aspirin", nameZh: "阿司匹林", structure: structure("aspirin") },
      { name: "Ibuprofen", nameZh: "布洛芬", structure: structure("ibuprofen") },
      { name: "Levodopa (L-dopa)", nameZh: "左旋多巴", structure: structure("levodopa") }
    ],
    answer: "Levodopa (L-dopa)",
    explanation:
      "An enzyme from Enterococcus faecalis converts levodopa into dopamine, and Eggerthella lenta then turns dopamine into m-tyramine. Carbidopa, the drug given with levodopa to block this conversion in the body, does not stop the bacterial enzyme. The researchers found a compound that does, and it increased levodopa availability in mice.",
    citation: {
      authors: "Maini Rekdal V, Bess EN, Bisanz JE, Turnbaugh PJ, Balskus EP.",
      title: "Discovery and inhibition of an interspecies gut bacterial pathway for Levodopa metabolism",
      venue: "Science",
      year: 2019,
      url: "https://doi.org/10.1126/science.aau6323"
    }
  },
  {
    question:
      "When you fast, your liver makes a fuel molecule that also acts as a signal, switching on genes that protect cells from oxidative stress. Which one?",
    questionZh: "禁食时，肝脏会产生一种“燃料”分子，它同时也是信号分子，能开启保护细胞免受氧化应激的基因。是哪一种？",
    image: {
      src: photo("empty-plate"),
      alt: "An empty plate with a knife and fork",
      credit: { text: "Jonathan Greenaway / Unsplash", url: "https://unsplash.com/photos/a-plate-with-a-fork-and-knife-on-it-_2KiLVROy-c" }
    },
    options: [
      { name: "Glucose", nameZh: "葡萄糖", structure: structure("glucose") },
      { name: "β-Hydroxybutyrate", nameZh: "β-羟基丁酸", structure: structure("beta-hydroxybutyrate") },
      { name: "Alanine", nameZh: "丙氨酸", structure: structure("alanine") },
      { name: "Palmitic acid", nameZh: "棕榈酸", structure: structure("palmitic-acid") }
    ],
    answer: "β-Hydroxybutyrate",
    explanation:
      "β-Hydroxybutyrate is a ketone body that fuels the brain and other tissues when food is scarce. It also inhibits class I histone deacetylases (HDACs), raising histone acetylation and turning on protective genes like FOXO3A and MT2. In mice, β-hydroxybutyrate treatment gave substantial protection against oxidative stress.",
    citation: {
      authors: "Shimazu T, Hirschey MD, Newman J, et al.",
      title: "Suppression of oxidative stress by β-hydroxybutyrate, an endogenous histone deacetylase inhibitor",
      venue: "Science",
      year: 2013,
      url: "https://doi.org/10.1126/science.1227166"
    }
  }
];
