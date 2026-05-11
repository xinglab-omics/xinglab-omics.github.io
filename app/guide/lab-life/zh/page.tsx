import type { Metadata } from "next";
import { labLifeGuideContentZh } from "@/lib/content/guide";
import { GuidePageClient } from "../../GuidePageClient";

export const metadata: Metadata = {
  title: "实验室生活 | Xing Lab Guide",
  description: "Xing Lab 关于实验室生活、沟通、会议、身心健康、合作与作者署名的中文指南。"
};

export default function LabLifeGuideZhPage() {
  return <GuidePageClient content={labLifeGuideContentZh} />;
}
