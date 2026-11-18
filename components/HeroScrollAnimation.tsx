"use client";

import { useEffect } from "react";

const heroArtMoveX = -260;
const heroArtMoveY = 100;

export function HeroScrollAnimation() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-scroll]");

    if (!hero) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousProgress = 0;
    let start = 0;
    let range = 1;

    const update = () => {
      frame = 0;

      const progress = reduceMotion.matches ? 0 : Math.min(Math.max((window.scrollY - start) / range, 0), 1);
      if (previousProgress === progress) return;
      previousProgress = progress;
      const eased = progress * progress * (3 - 2 * progress);

      hero.style.setProperty("--hero-art-x", `${eased * heroArtMoveX}px`);
      hero.style.setProperty("--hero-art-y", `${eased * heroArtMoveY}px`);
      hero.style.setProperty("--hero-art-scale", `${1 + eased * 0.32}`);
      hero.style.setProperty("--hero-art-opacity", `${1 - eased * 0.66}`);
      hero.style.setProperty("--hero-art-blur", `${eased * 4.8}px`);
      hero.style.setProperty("--hero-art-rotate", `${eased * -2}deg`);
      hero.style.setProperty("--hero-copy-y", `${eased * 158}px`);
      hero.style.setProperty("--hero-copy-opacity", `${1 - eased * 0.68}`);
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    const measure = () => {
      start = Math.max(hero.offsetTop - 84, 0);
      range = Math.max(1, Math.min(window.innerHeight * 0.24, 190));
      requestUpdate();
    };

    measure();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return null;
}
