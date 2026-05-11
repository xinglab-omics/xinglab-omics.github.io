import type { Metadata } from "next";
import { contactInfoZh } from "@/lib/content";
import { ContactPageView } from "../ContactPageView";

export const metadata: Metadata = {
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
          "实验室正在招收博士后、研究生和本科生。如果你对我们的研究方向感兴趣，欢迎联系。",
        applyTitle: "申请方式",
        contactTitle: "联系方式",
        emailLabel: "邮箱",
        alternateHref: "/contact"
      }}
    />
  );
}
