import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/site-paths";

type ResearchIntroPanelProps = {
  intro: string;
  question: string;
  showExploreLink?: boolean;
};

export function ResearchIntroPanel({ intro, question, showExploreLink = false }: ResearchIntroPanelProps) {
  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-md bg-paper">
      <Image
        src={withBasePath("/images/research/apple-metabolism-illustration.png")}
        alt="Scientific illustration of apple-derived molecules moving through digestion and microbial metabolism."
        fill
        sizes="(min-width: 1280px) 1152px, 100vw"
        className="object-contain object-right"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--color-paper) 98%, transparent) 0%, color-mix(in srgb, var(--color-paper) 92%, transparent) 42%, color-mix(in srgb, var(--color-paper) 38%, transparent) 76%)"
        }}
      />
      <div className="relative z-10 flex min-h-[330px] flex-col justify-between gap-8 p-5 sm:p-6 lg:max-w-3xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-fudan">Research directions</p>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-7 text-ink sm:text-2xl sm:leading-8">
            {question}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{intro}</p>
        </div>
        {showExploreLink ? (
          <Link
            href="/research"
            className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan"
          >
            Explore more
            <ArrowRight aria-hidden="true" size={14} />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
