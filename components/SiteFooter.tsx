import { SiteImage } from "@/components/SiteImage";
import { contactInfo, contactInfoZh } from "@/lib/content";
import { labMarkSrc, staticPageHref } from "@/lib/site-paths";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-fudan bg-[#1a2220] text-white/80">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={labMarkSrc}
              alt="Xing Lab mark"
              width={72}
              height={62}
              loading="lazy"
              className="h-9 w-10 shrink-0 object-contain brightness-0 invert opacity-90"
            />
            <div>
              <p className="text-sm font-semibold tracking-[-0.01em] text-white">Xing Lab</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/55">
                Metabolomics &amp; Xenobiotic Metabolism
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 md:justify-end">
            <SiteImage
              src="/images/branding/fudan-footer.png"
              sizes="(min-width: 640px) 38px, 34px"
              alt="Fudan University seal"
              width={38}
              height={38}
              loading="lazy"
              className="size-9 shrink-0 object-contain brightness-0 invert opacity-85"
            />
            <p className="max-w-xl text-xs leading-5 text-white/75 md:text-right">
              <span className="block">
                {contactInfo.institution}, {contactInfo.address}
              </span>
              <span lang="zh-Hans" className="font-cjk mt-0.5 block text-white/60">
                {contactInfoZh.institution}，{contactInfoZh.address}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[11px] text-white/50">
          <p>© {new Date().getFullYear()} Xing Lab, Fudan University. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href={staticPageHref("/research")} className="transition hover:text-white">
              Research
            </a>
            <a href={staticPageHref("/publications")} className="transition hover:text-white">
              Publications
            </a>
            <a href={staticPageHref("/contact")} className="transition hover:text-white">
              Join Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
