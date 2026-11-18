import { researchPracticeGuideContent } from "@/lib/content/guide";
import { GuidePageClient } from "@/app/guide/GuidePageClient";

ResearchPracticeGuidePage.metadata = {
  title: "Research Practice | Xing Lab Guide",
  description:
    "Xing Lab research practice guide for manuscripts, figures, documentation, data, code, LLM use, reviewing, and shared resources."
};

export default function ResearchPracticeGuidePage() {
  return <GuidePageClient content={researchPracticeGuideContent} />;
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };
