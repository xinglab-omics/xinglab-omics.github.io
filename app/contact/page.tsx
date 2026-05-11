import type { Metadata } from "next";
import { contactInfo } from "@/lib/content";
import { ContactPageView } from "./ContactPageView";

export const metadata: Metadata = {
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
          "We are actively recruiting at all levels — postdocs, graduate students, and undergraduates. If our research resonates with you, we'd love to hear from you.",
        applyTitle: "How to Apply",
        contactTitle: "Contact",
        emailLabel: "Email",
        alternateHref: "/contact/zh"
      }}
    />
  );
}
