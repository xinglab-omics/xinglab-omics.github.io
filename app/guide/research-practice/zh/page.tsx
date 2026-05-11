import type { Metadata } from "next";
import { researchPracticeGuideContentZh } from "@/lib/content/guide";
import { GuidePageClient } from "../../GuidePageClient";

export const metadata: Metadata = {
  title: "科研实践 | Xing Lab Guide",
  description: "Xing Lab 关于数据、论文、图件、文档、代码、LLM 使用和审稿的中文科研实践指南。"
};

export default function ResearchPracticeGuideZhPage() {
  return <GuidePageClient content={researchPracticeGuideContentZh} />;
}
