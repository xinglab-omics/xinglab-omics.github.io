"use client";

import { useEffect, type RefObject } from "react";

// Rotate visible content only while the page is active and the visitor allows motion.
export function useAutoAdvance(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  delay: number,
  advance: () => void
) {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: number | undefined;

    function sync() {
      window.clearInterval(timer);
      if (visible && !document.hidden && !motion.matches) {
        timer = window.setInterval(advance, delay);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref, enabled, delay, advance]);
}
