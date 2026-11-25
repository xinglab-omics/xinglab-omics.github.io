import { researchPracticeGuideContentZh } from "@/lib/content/guide";
import { GuidePageClient } from "@/app/guide/GuidePageClient";

ResearchPracticeGuideZhPage.metadata = {
  title: "科研实践 | Xing Lab Guide",
  description:
    "Xing Lab 关于数据管理、文档与代码、LLM 规范使用、合作与作者署名、论文写作、科研绘图、论文审阅与核心阅读资源的中文科研实践指南。"
};

export default function ResearchPracticeGuideZhPage() {
  return <GuidePageClient content={researchPracticeGuideContentZh} />;
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };
