import { piProfile } from "./profile";
import type { ContactInfo } from "./types";

export const contactInfo: ContactInfo = {
  institution: "Department of Environmental Science & Engineering, Fudan University",
  address: "Shanghai, China",
  email: piProfile.email,
  joinText:
    `Please directly email me at ${piProfile.email} with a brief introduction, the opportunity you are interested in, and how your interests connect to our work. Use the email subject format "Xing Lab application - [Opportunity] - [Your Name]"; for example, "Xing Lab application - PhD student - Daxing Pai 派大星". Attach supporting files as needed; PDFs are preferred.`,
  applicationSections: [
    {
      title: "Postdoctoral Researchers",
      description:
        "In your email, please cover the points below and attach the relevant supporting files.",
      materials: [
        "Briefly describe your research interests, motivation, proposed postdoctoral direction, and future career development plan.",
        "Include contact information for 2-3 references.",
        "Attach your curriculum vitae.",
        "Attach up to 3 representative papers or manuscripts, if available.",
        "(Optional) Attach any other materials you consider important."
      ]
    },
    {
      title: "Graduate Students",
      description:
        "Prospective master's and PhD students should follow the official Fudan University admissions process and are welcome to contact the lab in advance.",
      materials: [
        "In your email, briefly describe your current program, research interests, motivation, and why you are interested in our lab.",
        "Attach your curriculum vitae.",
        "(Optional) Attach academic transcripts and English test scores, if available.",
        "(Optional) Attach representative materials such as papers, thesis work, posters, code repositories, or project reports, if available."
      ]
    },
    {
      title: "Undergraduate Students",
      description:
        "Undergraduate students interested in research training, thesis projects, or internships are welcome to contact the lab.",
      materials: [
        "In your email, briefly describe your current year and major, research interests, and expected availability.",
        "Attach your curriculum vitae, if available.",
        "(Optional) Attach academic transcripts and English test scores, if available.",
        "(Optional) Attach representative materials such as posters, code repositories, course projects, or research reports, if available."
      ]
    },
    {
      title: "Research Assistants",
      description:
        "Research assistant applicants should send a concise email and attach supporting files as needed.",
      materials: [
        "In your email, briefly describe your background, relevant skills, research interests, expected start date and availability.",
        "Attach your curriculum vitae.",
        "(Optional) Attach representative materials such as papers, thesis work, posters, code repositories, or project reports, if available."
      ]
    },
  ]
};
