"use client";

import { useEffect, useRef, useState } from "react";
import { QuizHeading } from "@/components/QuizHeading";

type Quiz = typeof import("./MoleculeQuiz").default;

export function DeferredMoleculeQuiz({ question, questionZh }: { question: string; questionZh: string }) {
  const section = useRef<HTMLElement>(null);
  const [Game, setGame] = useState<Quiz | null>(null);
  const [failed, setFailed] = useState(false);

  function loadQuiz() {
    setFailed(false);
    import("./MoleculeQuiz").then(
      ({ default: QuizGame }) => setGame(() => QuizGame),
      () => setFailed(true)
    );
  }

  useEffect(() => {
    if (!section.current || !("IntersectionObserver" in window)) {
      loadQuiz();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        loadQuiz();
      }
    }, { rootMargin: "400px" });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="molecule-quiz"
      ref={section}
      className="mt-3 scroll-mt-24 border-t-2 border-sage"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-sage) 12%, var(--color-paper))",
        backgroundImage: "radial-gradient(color-mix(in srgb, var(--color-sage) 28%, transparent) 1px, transparent 1px)",
        backgroundSize: "18px 18px"
      }}
    >
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-4 sm:px-8 sm:pt-5 lg:pb-12">
        {Game ? <Game /> : (
          <div className="min-h-[45rem] lg:min-h-[30rem]">
            <QuizHeading />
            <h3 className="mt-6 text-lg font-semibold text-ink">{question}</h3>
            <p lang="zh-Hans" className="font-cjk mt-1 text-base text-muted">{questionZh}</p>
            {failed && <button className="mt-4 font-semibold text-fudan" onClick={loadQuiz}>Retry loading quiz</button>}
          </div>
        )}
      </div>
    </section>
  );
}
