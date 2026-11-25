import { labLifeGuideContentZh } from "@/lib/content/guide";
import { GuidePageClient } from "@/app/guide/GuidePageClient";

LabLifeGuideZhPage.metadata = {
  title: "实验室生活 | Xing Lab Guide",
  description: "Xing Lab 关于实验室文化、沟通与会议、休假与身心健康、指导与职业发展的中文指南。"
};

export default function LabLifeGuideZhPage() {
  return <GuidePageClient content={labLifeGuideContentZh} />;
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };
