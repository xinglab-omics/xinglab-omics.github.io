import { contactInfoZh } from "@/lib/content";
import { ContactPageView } from "@/app/contact/ContactPageView";

ContactZhPage.metadata = {
  title: "加入我们 | Xing Lab",
  description: "Xing Lab 博士后、研究生、本科生和科研助理申请说明。"
};

export default function ContactZhPage() {
  return (
    <ContactPageView
      content={contactInfoZh}
      copy={{
        htmlLang: "zh-CN",
        eyebrow: "加入我们",
        title: "联系 Xing Lab",
        description:
          "实验室长期招收博士后、研究生、本科生及科研助理。如果你对我们的研究方向感兴趣，欢迎随时联系。",
        applyTitle: "申请方式",
        subjectLabel: "邮件主题格式",
        examplePrefix: "示例：",
        copyLabel: "复制",
        copiedLabel: "已复制",
        includeTitle: "邮件建议包含",
        roleNotesTitle: "不同岗位补充说明",
        contactTitle: "联系方式",
        emailLabel: "邮箱",
        locationLabel: "地址",
        emailCtaLabel: "发送申请邮件",
        exploreTitle: "联系前不妨先了解",
        exploreDescription: "提前了解我们的研究方向、团队成员与实验室日常。",
        exploreLinks: [
          { label: "研究方向", href: "/research" },
          { label: "实验室生活与文化", href: "/guide/lab-life/zh" },
          { label: "实验室成员", href: "/team" }
        ],
        alternateHref: "/contact"
      }}
    />
  );
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };
