import type { Metadata } from "next";
import { labLifeGuideContent } from "@/lib/content/guide";
import { GuidePageClient } from "../GuidePageClient";

export const metadata: Metadata = {
  title: "Lab Life | Xing Lab Guide",
  description:
    "Xing Lab expectations, communication norms, meeting routines, well-being, collaboration, and authorship."
};

export default function LabLifeGuidePage() {
  return <GuidePageClient content={labLifeGuideContent} />;
}
