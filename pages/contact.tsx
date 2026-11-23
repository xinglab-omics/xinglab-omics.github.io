import { contactInfo } from "@/lib/content";
import { ContactPageView } from "@/app/contact/ContactPageView";

ContactPage.metadata = {
  title: "Join Us | Xing Lab",
  description:
    "Apply to Xing Lab as a postdoctoral researcher, graduate student, undergraduate student, or research assistant."
};

export default function ContactPage() {
  return (
    <ContactPageView
      content={contactInfo}
      copy={{
        htmlLang: "en",
        eyebrow: "Join Us",
        title: "Connect with Xing Lab",
        description:
          "We are actively recruiting postdocs, graduate students, undergraduates, and research assistants. If our research resonates with you, we'd love to hear from you.",
        applyTitle: "How to Apply",
        subjectLabel: "Email subject format",
        examplePrefix: "Example:",
        copyLabel: "Copy",
        copiedLabel: "Copied",
        includeTitle: "What to include",
        roleNotesTitle: "Position-Specific Notes",
        contactTitle: "Contact",
        emailLabel: "Email",
        locationLabel: "Location",
        emailCtaLabel: "Send application email",
        exploreTitle: "Before You Reach Out",
        exploreDescription: "Learn more about our science, our people, and how we work together.",
        exploreLinks: [
          { label: "Research Directions", href: "/research" },
          { label: "Lab Life & Culture", href: "/guide/lab-life" },
          { label: "Meet the Team", href: "/team" }
        ],
        alternateHref: "/contact/zh"
      }}
    />
  );
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };
