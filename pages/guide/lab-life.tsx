import { labLifeGuideContent } from "@/lib/content/guide";
import { GuidePageClient } from "@/app/guide/GuidePageClient";

LabLifeGuidePage.metadata = {
  title: "Lab Life | Xing Lab Guide",
  description:
    "Xing Lab expectations, communication norms, meeting routines, well-being, collaboration, and authorship."
};

export default function LabLifeGuidePage() {
  return <GuidePageClient content={labLifeGuideContent} />;
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };
