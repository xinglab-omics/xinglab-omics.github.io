import { piProfile } from "./profile";
import type { ContactInfo } from "./types";

export const contactInfo: ContactInfo = {
  institution: "Department of Environmental Science & Engineering, Fudan University",
  address: "Shanghai, China",
  email: piProfile.email,
  subjectFormat: "XingLab Application - [Position] - [Your Name]",
  subjectExample: "XingLab Application - PhD student - Daxing Pai 派大星",
  applyIntro: `Please email ${piProfile.email} directly with a short note and supporting files (PDF preferred). Every application follows the same simple format:`,
  sharedChecklist: [
    "A brief introduction covering your background, the position you are interested in, how your interests connect to our research, and your expected start date or availability.",
    "Your CV (PDF preferred).",
    "Optional supporting materials — such as papers, thesis work, posters, code repositories, transcripts, or English test scores."
  ],
  roleNotes: [
    {
      role: "Postdoctoral Researchers",
      note: "Please also outline your proposed research direction and career plan, and attach 2–3 reference letters (or referee contacts) and up to 3 representative papers or manuscripts."
    },
    {
      role: "Graduate Students (PhD & Master's)",
      note: "Prospective master's and PhD students should follow Fudan University's official admissions process and are very welcome to contact the lab in advance."
    },
    {
      role: "Undergraduate Students",
      note: "Welcome for research training, thesis projects, or internships. We especially value students who can commit continuously over multiple semesters."
    },
    {
      role: "Research Assistants",
      note: "Highlight relevant experimental or computational skills along with your expected start date and availability."
    }
  ]
};

export const contactInfoZh: ContactInfo = {
  institution: "复旦大学环境科学与工程系",
  address: "中国上海",
  email: piProfile.email,
  subjectFormat: "XingLab Application - [Position] - [Your Name]",
  subjectExample: "XingLab Application - PhD student - Daxing Pai 派大星",
  applyIntro: `请直接发送邮件至 ${piProfile.email}，附上简短自我介绍与相关支持材料（附件优先使用 PDF 格式）。所有岗位均采用相同的申请方式：`,
  sharedChecklist: [
    "在邮件正文中简要介绍你的教育或科研背景、意向岗位、研究兴趣与实验室方向的契合点，以及预计开始时间或可投入时间。",
    "个人简历（优先 PDF 格式）。",
    "可选补充材料：如代表性论文、毕业论文工作、海报、代码仓库、成绩单或英语考试成绩等。"
  ],
  roleNotes: [
    {
      role: "博士后研究人员",
      note: "请补充说明拟开展的研究方向与职业规划，并附上 2–3 封推荐信（或推荐人联系方式）及最多 3 篇代表性论文或手稿。"
    },
    {
      role: "研究生（硕士 / 博士）",
      note: "有意申请硕士或博士项目的同学请遵循复旦大学官方招生流程，也非常欢迎提前联系实验室交流。"
    },
    {
      role: "本科生",
      note: "欢迎对科研训练、毕业论文或实习感兴趣的同学联系；我们尤其欢迎能够在多个学期持续、稳定参与科研的同学。"
    },
    {
      role: "科研助理",
      note: "请在邮件中重点说明相关实验或计算技能、预计入职时间及可投入时间。"
    }
  ]
};
