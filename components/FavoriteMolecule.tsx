import { Heart, X } from "lucide-react";
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
  const structureSrc = withBasePath(molecule.structure);

  return (
    <div className="group relative inline-flex">
      <a
        href={structureSrc}
        data-molecule={molecule.name}
        data-owner={owner}
        aria-haspopup="dialog"
        aria-label={`Favorite molecule: ${molecule.name}. Open its structure`}
        className="inline-flex cursor-zoom-in items-center gap-1.5 whitespace-nowrap rounded-full bg-[color-mix(in_srgb,var(--color-sage)_13%,white)] px-2.5 py-1 text-xs font-medium tracking-wide text-ink transition hover:bg-[color-mix(in_srgb,var(--color-fudan)_9%,white)] hover:text-fudan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan"
      >
        <MoleculeIcon />
        {molecule.name}
      </a>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden w-64 -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-line group-focus-within:block group-hover:block sm:left-auto sm:right-0 sm:translate-x-0"
      >
        <span className="flex items-center gap-1.5 px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          <Heart size={11} className="fill-fudan text-fudan" />
          Favorite molecule
        </span>
        <span className="flex h-32 items-center justify-center px-4 py-3" style={dotGrid}>
          <img src={structureSrc} loading="lazy" alt="" width={320} height={220} className="h-auto max-h-full w-auto max-w-full" />
        </span>
        <span className="block px-4 py-2 text-[11px] text-muted">Click to enlarge</span>
      </span>
    </div>
  );
}

const openStructure = `{
  const dialog = document.getElementById("favorite-molecule-dialog");
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[data-molecule]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.showModal) return;
    event.preventDefault();
    const image = dialog.querySelector("img");
    image.src = link.href;
    image.alt = "Structure of " + link.dataset.molecule;
    dialog.querySelector("[data-owner-label]").textContent = link.dataset.owner + "'s favorite molecule";
    dialog.querySelector("[data-molecule-label]").textContent = link.dataset.molecule;
    dialog.showModal();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}`;

export function MoleculeDialog() {
  return (
    <>
      <dialog
        id="favorite-molecule-dialog"
        aria-labelledby="favorite-molecule-owner favorite-molecule-name"
        className="m-auto w-[min(92vw,48rem)] overflow-hidden rounded-2xl bg-white p-0 text-ink shadow-soft backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-6">
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              <Heart aria-hidden="true" size={12} className="fill-fudan text-fudan" />
              <span id="favorite-molecule-owner" data-owner-label="" />
            </span>
            <span id="favorite-molecule-name" data-molecule-label="" className="mt-1 block text-xl font-semibold leading-7" />
          </div>
          <form method="dialog">
            <button aria-label="Close" className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-fudan">
              <X aria-hidden="true" size={18} />
            </button>
          </form>
        </div>
        <div className="flex h-[min(60vh,26rem)] items-center justify-center p-6 sm:p-8" style={dotGrid}>
          <img alt="" width={320} height={220} className="h-auto max-h-full w-auto max-w-full" />
        </div>
      </dialog>
      <script dangerouslySetInnerHTML={{ __html: openStructure }} />
    </>
  );
}
