"use client";

import { ArrowRight, ArrowUpRight, Check, RotateCcw, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { MoleculeCritters } from "@/components/MoleculeCritters";
import type { QuizQuestion } from "@/lib/content";
import { withBasePath } from "@/lib/site-paths";

type MoleculeQuizProps = {
  questions: QuizQuestion[];
};

const optionLetters = ["A", "B", "C", "D", "E", "F"];

const pillClassName =
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan";

function shuffledIndices(length: number) {
  const indices = Array.from({ length }, (_, index) => index);

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [indices[index], indices[swapIndex]] = [indices[swapIndex], indices[index]];
  }

  return indices;
}

function scoreMessage(score: number, total: number) {
  if (score === total) {
    return "Perfect score. You think like a metabolomics researcher, so come explore molecules with us.";
  }

  if (score >= total * 0.7) {
    return "Impressive. You know your molecules.";
  }

  if (score >= total * 0.4) {
    return "Not bad. Every one of these molecules was found or explained with metabolomics.";
  }

  return "Small molecules are full of surprises. That is exactly why we study them.";
}

function nextButtonClassName(isAnswered: boolean) {
  return isAnswered
    ? "border-fudan bg-fudan text-white hover:bg-[color-mix(in_srgb,var(--color-fudan)_85%,black)]"
    : "cursor-not-allowed border-line bg-white text-muted opacity-60";
}

function optionClassName(option: string, question: QuizQuestion, selected: string | null) {
  if (selected === null) {
    return "border-line bg-white hover:-translate-y-0.5 hover:border-fudan hover:shadow-soft";
  }

  if (option === question.answer) {
    return "cursor-default border-sage bg-[color-mix(in_srgb,var(--color-sage)_14%,white)]";
  }

  if (option === selected) {
    return "cursor-default border-fudan bg-[color-mix(in_srgb,var(--color-fudan)_7%,white)]";
  }

  return "cursor-default border-line bg-white opacity-55";
}

export function MoleculeQuiz({ questions }: MoleculeQuizProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [order, setOrder] = useState(() => questions.map((_, index) => index));
  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[order[position]];
  const isAnswered = selected !== null;
  const isCorrect = selected === question.answer;
  const isLastQuestion = position === order.length - 1;
  const score = results.filter(Boolean).length;
  const finalMessage = scoreMessage(score, questions.length);

  const focusHeading = () => {
    window.requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  };

  const chooseOption = (option: string) => {
    if (isAnswered) {
      return;
    }

    setSelected(option);
    setResults((current) => [...current, option === question.answer]);
    window.requestAnimationFrame(() => nextButtonRef.current?.focus({ preventScroll: true }));
  };

  const goToNext = () => {
    if (isLastQuestion) {
      setFinished(true);
    } else {
      setPosition((current) => current + 1);
      setSelected(null);
    }

    focusHeading();
  };

  const restart = () => {
    setOrder(shuffledIndices(questions.length));
    setPosition(0);
    setSelected(null);
    setResults([]);
    setFinished(false);
    focusHeading();
  };

  return (
    <section id="molecule-quiz" className="scroll-mt-24 pt-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <MoleculeCritters />
      </div>

      <div
        className="border-t-2 border-sage"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-sage) 12%, var(--color-paper))",
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--color-sage) 28%, transparent) 1px, transparent 1px)",
          backgroundSize: "18px 18px"
        }}
      >
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-5 sm:px-8 sm:pt-6 lg:pb-12">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
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
            <div className="flex gap-2 text-xs font-semibold text-muted">
              <span className="rounded-full border border-line bg-white px-3 py-1.5">
                {finished ? questions.length : position + 1} / {questions.length}
              </span>
              <span className="rounded-full border border-line bg-white px-3 py-1.5">
                Score <span className="text-ink">{score}</span>
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-line bg-white p-4 shadow-soft sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-1 gap-1" aria-hidden="true">
                {order.map((questionIndex, index) => (
                  <span
                    key={questionIndex}
                    className={`h-1.5 flex-1 rounded-full ${
                      index < results.length
                        ? results[index]
                          ? "bg-sage"
                          : "bg-fudan"
                        : index === position && !finished
                          ? "bg-muted"
                          : "bg-line"
                    }`}
                  />
                ))}
              </div>
              {finished ? null : (
                <button
                  ref={nextButtonRef}
                  type="button"
                  onClick={goToNext}
                  disabled={!isAnswered}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan ${nextButtonClassName(isAnswered)}`}
                >
                  {isLastQuestion ? "See your score" : "Next question"}
                  <ArrowRight aria-hidden="true" size={14} />
                </button>
              )}
            </div>

            {finished ? (
              <div className="py-6 text-center">
                <h3 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold text-ink focus:outline-none">
                  You got {score} / {questions.length}
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">{finalMessage}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={restart} className={pillClassName}>
                    Play again
                    <RotateCcw aria-hidden="true" size={14} />
                  </button>
                  <Link href="/team" className={pillClassName}>
                    Meet the team
                    <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Phone: stacked. Tablet: photo beside the question, choices below. Desktop: photo beside both. */}
                <div className="mt-4 grid gap-4 md:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-6 xl:grid-cols-[15rem_minmax(0,1fr)]">
                  <figure className="relative aspect-[2/1] overflow-hidden rounded-lg bg-paper md:aspect-auto md:min-h-32 xl:row-span-2">
                    <Image
                      key={question.image.src}
                      src={withBasePath(question.image.src)}
                      alt={question.image.alt}
                      fill
                      sizes="(min-width: 1280px) 240px, (min-width: 768px) 192px, 100vw"
                      className="object-cover"
                    />
                    {question.image.credit ? (
                      <figcaption className="absolute bottom-0 right-0 rounded-tl-md bg-black/45 px-1.5 py-0.5 text-[10px] leading-4 text-white">
                        <a
                          href={question.image.credit.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline-offset-2 hover:underline"
                        >
                          {question.image.credit.text}
                        </a>
                      </figcaption>
                    ) : null}
                  </figure>

                  <div>
                    <h3
                      ref={headingRef}
                      tabIndex={-1}
                      className="text-lg font-semibold leading-7 text-ink focus:outline-none sm:text-xl sm:leading-8"
                    >
                      {question.question}
                    </h3>
                    <p lang="zh-Hans" className="font-cjk mt-1 text-base leading-7 text-muted">
                      {question.questionZh}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:col-span-2 md:grid-cols-4 xl:col-span-1 xl:col-start-2">
                    {question.options.map((option, index) => {
                      const isAnswer = isAnswered && option.name === question.answer;
                      const isWrongPick = isAnswered && option.name === selected && !isCorrect;

                      return (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => chooseOption(option.name)}
                          aria-disabled={isAnswered}
                          className={`flex flex-col items-center rounded-lg border-2 p-2.5 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan ${optionClassName(option.name, question, selected)}`}
                        >
                          {option.structure ? (
                            <span className="flex h-[4.5rem] w-full items-center justify-center md:h-[5.25rem]">
                              {/* Natural size caps small molecules; larger ones shrink to fit. */}
                              <Image
                                src={withBasePath(option.structure)}
                                alt=""
                                width={320}
                                height={220}
                                className="h-auto max-h-full w-auto max-w-[88%]"
                              />
                            </span>
                          ) : null}
                          <span className="mt-2 flex flex-1 items-center justify-center gap-1.5 text-sm font-semibold leading-5 text-ink">
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                                isAnswer
                                  ? "border-sage bg-sage text-white"
                                  : isWrongPick
                                    ? "border-fudan bg-fudan text-white"
                                    : "border-line bg-white text-muted"
                              }`}
                            >
                              {isAnswer ? (
                                <Check aria-label="Correct answer" size={12} strokeWidth={3} />
                              ) : isWrongPick ? (
                                <X aria-label="Your answer" size={12} strokeWidth={3} />
                              ) : (
                                optionLetters[index]
                              )}
                            </span>
                            <span>
                              {option.name}{" "}
                              <span lang="zh-Hans" className="font-cjk whitespace-nowrap font-normal text-muted">
                                {option.nameZh}
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div aria-live="polite">
                  {isAnswered ? (
                    <div className="mt-4 rounded-lg bg-paper p-4 sm:p-5">
                      <p className={`text-sm font-semibold ${isCorrect ? "text-sage" : "text-fudan"}`}>
                        {isCorrect ? "Correct!" : `Not quite. The answer is ${question.answer}.`}
                      </p>
                      <p className="mt-2 max-w-4xl text-sm leading-7 text-muted">{question.explanation}</p>
                      <p className="mt-3 text-xs leading-5 text-muted">
                        {question.fromLab ? (
                          <span className="mr-2 inline-block rounded-full border border-fudan px-2 py-0.5 font-semibold text-fudan">
                            From our lab
                          </span>
                        ) : null}
                        {question.citation.authors}{" "}
                        <a
                          href={question.citation.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-ink transition hover:text-fudan"
                        >
                          {question.citation.title}
                          <ArrowUpRight aria-hidden="true" className="ml-0.5 inline align-[-2px]" size={13} />
                        </a>
                        . <span className="italic">{question.citation.venue}</span> ({question.citation.year}).
                      </p>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
