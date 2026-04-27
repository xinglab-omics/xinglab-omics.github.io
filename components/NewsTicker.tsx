"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/content";

type NewsTickerProps = {
  items: NewsItem[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export function NewsTicker({ items }: NewsTickerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const onChange = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (items.length <= 1 || paused || reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [items.length, paused, reduceMotion]);

  if (items.length === 0) {
    return null;
  }

  const item = items[activeIndex];

  return (
    <section
      className="border-b border-line bg-white"
      aria-label="Latest news"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto grid h-[204px] max-w-7xl gap-4 overflow-hidden px-5 py-5 sm:px-8 lg:h-[116px] lg:grid-cols-[160px_minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-fudan">Latest News</p>
          <p className="mt-1 text-xs text-muted">{formatDate(item.date)}</p>
        </div>

        <div className="min-w-0 overflow-hidden">
          <p className="h-6 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-6 text-ink">
            <Link href={`/news#${item.slug}`} className="transition hover:text-fudan">
              {item.title}
            </Link>
          </p>
          <p className="mt-1 h-12 overflow-hidden text-sm leading-6 text-muted">{item.summary}</p>
        </div>

        <div className="flex items-center gap-2 lg:justify-end">
          {items.map((newsItem, index) => (
            <button
              key={`${newsItem.date}-${newsItem.title}`}
              type="button"
              className={`size-2.5 rounded-full transition ${
                index === activeIndex ? "bg-fudan" : "bg-line hover:bg-muted"
              }`}
              aria-label={`Show news item ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
