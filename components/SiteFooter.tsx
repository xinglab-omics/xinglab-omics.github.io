import { contactInfo } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 text-xs leading-5 text-muted sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-ink">Xing Lab</span>
          <span className="mx-2 text-line">|</span>
          <span>© {new Date().getFullYear()}</span>
        </p>
        <p className="md:text-right">
          {contactInfo.institution}, {contactInfo.address}
        </p>
      </div>
    </footer>
  );
}
