import type { Metadata } from "next";
import { researchPracticeGuideContent } from "@/lib/content/guide";
import { GuidePageClient } from "../GuidePageClient";

export const metadata: Metadata = {
  title: "Research Practice | Xing Lab Guide",
  description:
    "Xing Lab research practice guide for manuscripts, figures, documentation, data, code, LLM use, reviewing, and shared resources."
};

export default function ResearchPracticeGuidePage() {
  return <GuidePageClient content={researchPracticeGuideContent} />;
}
