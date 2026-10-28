"use client";

import { Heart, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { FavoriteMolecule as FavoriteMoleculeData } from "@/lib/content";
import { withBasePath } from "@/lib/site-paths";

// Same sage dot grid as the homepage quiz band.
const dotGrid = {
  backgroundColor: "color-mix(in srgb, var(--color-sage) 7%, white)",
  backgroundImage: "radial-gradient(color-mix(in srgb, var(--color-sage) 24%, transparent) 1px, transparent 1px)",
  backgroundSize: "14px 14px"
};

// Ball-and-stick molecule, drawn on Lucide's 24px grid.
function MoleculeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor" aria-hidden="true" className={className}>
      <path
        d="M5 17 11.5 7.5 19 15.5M11.5 7.5 20 4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5" cy="17" r="3" />
      <circle cx="11.5" cy="7.5" r="3.5" />
      <circle cx="19" cy="15.5" r="3" />
      <circle cx="20" cy="4" r="2" />
    </svg>
  );
}

type FavoriteMoleculeProps = {
  molecule: FavoriteMoleculeData;
  owner: string;
};

// One line on the profile; the structure shows in a hover card, and a click opens it large.
export function FavoriteMolecule({ molecule, owner }: FavoriteMoleculeProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const structureSrc = withBasePath(molecule.structure);

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={`Favorite molecule: ${molecule.name}. Open its structure`}
        className="inline-flex cursor-zoom-in items-center gap-1.5 whitespace-nowrap rounded-full bg-[color-mix(in_srgb,var(--color-sage)_13%,white)] px-2.5 py-1 text-xs font-medium tracking-wide text-ink transition hover:bg-[color-mix(in_srgb,var(--color-fudan)_9%,white)] hover:text-fudan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan"
      >
        <MoleculeIcon className="text-fudan" />
        {molecule.name}
      </button>

      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-1/2 top-full z-30 mt-2 w-64 -translate-x-1/2 translate-y-1 overflow-hidden rounded-2xl bg-white opacity-0 shadow-soft ring-1 ring-line transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 sm:left-auto sm:right-0 sm:translate-x-0"
      >
        <span className="flex items-center gap-1.5 px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          <Heart size={11} className="fill-fudan text-fudan" />
          Favorite molecule
        </span>
        <span className="flex h-32 items-center justify-center px-4 py-3" style={dotGrid}>
          {/* Natural size caps small molecules; larger ones shrink to fit. */}
          <Image src={structureSrc} alt="" width={320} height={220} className="h-auto max-h-full w-auto max-w-full" />
        </span>
        <span className="block px-4 py-2 text-[11px] text-muted">Click to enlarge</span>
      </span>

      <dialog
        ref={dialogRef}
        aria-label={`${owner}'s favorite molecule: ${molecule.name}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
        className="m-auto w-[min(92vw,48rem)] overflow-hidden rounded-2xl bg-white p-0 text-ink shadow-soft backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <span className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-6">
          <span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              <Heart aria-hidden="true" size={12} className="fill-fudan text-fudan" />
              {owner}&apos;s favorite molecule
            </span>
            <span className="mt-1 block text-xl font-semibold leading-7">{molecule.name}</span>
          </span>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-paper text-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </span>
        <span className="flex h-[min(60vh,26rem)] items-center justify-center p-6 sm:p-8" style={dotGrid}>
          <Image src={structureSrc} alt={`Structure of ${molecule.name}`} width={320} height={220} className="h-auto max-h-full w-auto max-w-full" />
        </span>
      </dialog>
    </div>
  );
}
