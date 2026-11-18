import { Sparkles } from "lucide-react";

export function QuizHeading() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-fudan bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-fudan">
          <Sparkles aria-hidden="true" size={13} />
          Quiz time
        </p>
        <h2 className="text-2xl font-semibold tracking-normal text-ink sm:text-3xl">Guess the Molecule</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">
        Each question is a real finding from the scientific literature. Can you pick the molecule behind it?
      </p>
    </div>
  );
}
