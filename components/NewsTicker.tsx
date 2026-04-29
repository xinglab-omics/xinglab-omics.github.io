"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { newsItemId, type NewsItem } from "@/lib/content";

type NewsTickerProps = {
  items: NewsItem[];
};

function formatDate(date: string) {
  if (/^\d{4}-\d{2}$/.test(date)) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "numeric"
    }).format(new Date(`${date}-01T00:00:00`));
  }

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
    }, 3000);

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
      <div className="mx-auto grid min-h-[220px] max-w-7xl gap-4 overflow-hidden px-5 py-5 sm:px-8 lg:min-h-[116px] lg:grid-cols-[160px_minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-fudan">Latest News</p>
          <p className="mt-1 text-xs text-muted">{formatDate(item.date)}</p>
        </div>

        <div className="flex min-h-20 min-w-0 flex-col justify-center overflow-hidden lg:min-h-16">
          <p className="h-6 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-6 text-ink">
            <Link href={`/news#${newsItemId(item)}`} className="transition hover:text-fudan">
              {item.title}
            </Link>
          </p>
          <p className="mt-1 h-12 overflow-hidden text-sm leading-6 text-muted">{item.summary}</p>
        </div>

        <div className="flex flex-col items-center gap-3 lg:justify-self-end">
          <div className="flex items-center gap-2">
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
          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan"
          >
            View all news
            <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
