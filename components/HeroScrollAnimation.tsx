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

    const update = () => {
      frame = 0;

      if (reduceMotion.matches) {
        hero.style.setProperty("--hero-art-x", "0px");
        hero.style.setProperty("--hero-art-y", "0px");
        hero.style.setProperty("--hero-art-scale", "1");
        hero.style.setProperty("--hero-art-opacity", "1");
        hero.style.setProperty("--hero-art-blur", "0px");
        hero.style.setProperty("--hero-art-rotate", "0deg");
        hero.style.setProperty("--hero-copy-y", "0px");
        hero.style.setProperty("--hero-copy-opacity", "1");
        return;
      }

      const start = Math.max(hero.offsetTop - 84, 0);
      const range = Math.min(window.innerHeight * 0.24, 190);
      const progress = Math.min(Math.max((window.scrollY - start) / range, 0), 1);
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

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return null;
}
