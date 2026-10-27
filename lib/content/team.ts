import { piProfile } from "./profile";
import { structure } from "./structures";
import type { Member } from "./types";

export const members: Member[] = [
  {
    name: piProfile.name,
    chineseName: piProfile.chineseName,
    role: "Assistant Professor, Fudan University",
    group: "Principal Investigator",
    bio: "",
    email: piProfile.email,
    image: piProfile.image,
    links: piProfile.links.filter((link) => link.label === "Google Scholar"),
    careerSummary: [
      {
        period: "2026.8 - Present",
        title: "Assistant Professor",
        institution: "Fudan University"
      },
      {
        period: "2023.8 - 2026.7",
        title: "Postdoctoral Scholar",
        institution: "University of California, San Diego"
      },
      {
        period: "2019.1 - 2023.4",
        title: "PhD in Chemistry",
        institution: "The University of British Columbia"
      },
      {
        period: "2014.9 - 2018.6",
        title: "BSc in Chemistry",
        institution: "Zhejiang University"
      }
    ],
    profileHref: "/shipei-xing",
    favoriteMolecule: { name: "Cholesterol-phosphoethanolamine", structure: structure("cholesterol-phosphoethanolamine") },
    hometown: { city: "Dalian", cityZh: "大连", lat: 38.914, lon: 121.615 }
  },
  {
    name: "Yinjie Yu",
    chineseName: "余胤杰",
    group: "Master's Students",
    bio:
      "Yinjie received his bachelor's degree from Shandong University. His research interests lie in mass spectrometry informatics, with a focus on mining small-molecule metabolomics data.",
    email: "26210740098@m.fudan.edu.cn",
    image: "/images/profiles/Yinjie_Yu.jpg",
    joinedDate: "September 2026",
    favoriteMolecule: { name: "Perfluorobutanesulfonic acid", structure: structure("pfbs") },
    hometown: { city: "Guangzhou", cityZh: "广州", lat: 23.129, lon: 113.264 }
  },
  {
    name: "Lujie Qu",
    chineseName: "渠路捷",
    group: "Master's Students",
    bio:
      "Lujie's research focuses on mass spectrometry and small-molecule metabolism, with particular interest in the connections among the environment, microorganisms, and human metabolism.",
    email: "ljqu26@m.fudan.edu.cn",
    image: "/images/profiles/Lujie_Qu.jpg",
    joinedDate: "September 2026",
    favoriteMolecule: { name: "Oxytocin", structure: structure("oxytocin") },
    hometown: { city: "Heze", cityZh: "菏泽", lat: 35.233, lon: 115.481 }
  },
  {
    name: "Zixuan Lin",
    chineseName: "林子轩",
    group: "Master's Students",
    bio:
      "Zixuan is currently pursuing an undergraduate degree in Energy and Power Engineering. His research interests lie in machine learning and data-driven modeling, with a future focus on mass spectrometry informatics and computational analysis of small-molecule metabolomics data.",
    image: "/images/profiles/Zixuan_Lin.jpg",
    joinedLabel: "Incoming Master's Student (September 2027)",
    favoriteMolecule: { name: "Phenethyl alcohol", structure: structure("phenethyl-alcohol") },
    hometown: { city: "Kunshan", cityZh: "昆山", lat: 31.385, lon: 120.981 }
  },
  {
    name: "Ruize Tang",
    chineseName: "唐瑞泽",
    group: "Undergraduate Students",
    bio:
      "Ruize Tang is a student in the 2025 Elite Program in the Department of Environmental Science and Engineering at Fudan University.",
    email: "25300740025@m.fudan.edu.cn",
    image: "/images/profiles/Ruize_Tang.jpg",
    joinedDate: "September 2026",
    favoriteMolecule: { name: "Buckminsterfullerene", structure: structure("buckminsterfullerene") },
    hometown: { city: "Zunyi", cityZh: "遵义", lat: 27.725, lon: 106.927 }
  },
  {
    name: "Kehan Zhang",
    chineseName: "章轲涵",
    group: "Undergraduate Students",
    bio:
      "Kehan Zhang is an undergraduate student in the School of Life Sciences at Fudan University, majoring in Biological Sciences (2025 cohort).",
    email: "25340700031@m.fudan.edu.cn",
    image: "/images/profiles/Kehan_Zhang.png",
    joinedDate: "September 2026",
    favoriteMolecule: { name: "Nicotinamide adenine dinucleotide", structure: structure("nad") },
    hometown: { city: "Wenzhou", cityZh: "温州", lat: 27.994, lon: 120.699 }
  },
  {
    name: "Pengyu Xing",
    chineseName: "邢蓬宇",
    group: "Undergraduate Students",
    bio:
      "Pengyu Xing is an undergraduate student majoring in Environmental Science and Engineering at Fudan University.",
    email: "26300740003@m.fudan.edu.cn",
    image: "/images/profiles/Pengyu_Xing.jpg",
    joinedDate: "October 2026",
    favoriteMolecule: { name: "Dopamine", structure: structure("dopamine") },
    hometown: { city: "Shanghai", cityZh: "上海", lat: 31.23, lon: 121.474 }
  }
];
