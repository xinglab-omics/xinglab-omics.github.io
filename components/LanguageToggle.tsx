import { withBasePath } from "@/lib/site-paths";

type LanguageToggleProps = {
  isChinese: boolean;
  href: string;
};

export function LanguageToggle({ isChinese, href }: LanguageToggleProps) {
  return (
    <a
      href={withBasePath(href)}
      aria-label={isChinese ? "Switch to English" : "切换到中文"}
      className="inline-grid grid-cols-2 rounded-full border border-line bg-paper p-1 text-xs font-semibold text-muted transition hover:border-fudan"
    >
      <span
        aria-current={!isChinese ? "page" : undefined}
        className={`rounded-full px-3 py-1.5 text-center transition ${
          !isChinese ? "bg-fudan text-white shadow-sm" : "hover:text-fudan"
        }`}
      >
        English
      </span>
      <span
        aria-current={isChinese ? "page" : undefined}
        className={`rounded-full px-3 py-1.5 text-center transition ${
          isChinese ? "bg-fudan text-white shadow-sm" : "hover:text-fudan"
        }`}
      >
        中文
      </span>
    </a>
  );
}
