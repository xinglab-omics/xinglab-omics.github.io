"use client";

import { useEffect } from "react";

// Smooth, damped differential depth-parallax exit across the full hero height.
// Replaces the abrupt 190px zoom/blur snap with subtle vertical parallax and gentle opacity recess.
export function HeroScrollAnimation() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-scroll]");
    if (!hero) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = 0;
    let range = 1;
    let current = 0;
    let target = 0;

    const applyVars = (p: number) => {
      // Smooth ease-out curve for calm deceleration
      const eased = 1 - Math.pow(1 - p, 2.2);

      // Copy glides softly upward with gentle fade; stays readable throughout
      hero.style.setProperty("--hero-copy-y", `${(-eased * 26).toFixed(2)}px`);
      hero.style.setProperty("--hero-copy-opacity", `${(1 - eased * 0.72).toFixed(3)}`);

      // Scientific artwork recedes subtly into depth at a slightly faster parallax rate (no harsh blur)
      hero.style.setProperty("--hero-art-x", "0px");
      hero.style.setProperty("--hero-art-y", `${(-eased * 44).toFixed(2)}px`);
      hero.style.setProperty("--hero-art-scale", `${(1 - eased * 0.035).toFixed(4)}`);
      hero.style.setProperty("--hero-art-opacity", `${(1 - eased * 0.78).toFixed(3)}`);
    };

    const tick = () => {
      frame = 0;
      if (reduceMotion.matches) {
        current = 0;
        target = 0;
        applyVars(0);
        return;
      }

      const diff = target - current;
      if (Math.abs(diff) < 0.001) {
        current = target;
        applyVars(current);
        return;
      }

      current += diff * 0.16;
      applyVars(current);
      frame = window.requestAnimationFrame(tick);
    };

    const syncTarget = () => {
      target = reduceMotion.matches
        ? 0
        : Math.min(Math.max((window.scrollY - start) / range, 0), 1);

      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const measure = () => {
      start = Math.max(hero.offsetTop - 80, 0);
      range = Math.max(260, hero.offsetHeight * 0.85);
      syncTarget();
    };

    measure();
    window.addEventListener("scroll", syncTarget, { passive: true });
    window.addEventListener("resize", measure);
    reduceMotion.addEventListener("change", syncTarget);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncTarget);
      window.removeEventListener("resize", syncTarget);
      reduceMotion.removeEventListener("change", syncTarget);
    };
  }, []);

  return null;
}
