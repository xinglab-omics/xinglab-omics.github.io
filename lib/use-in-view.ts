"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// True once the element has scrolled (mostly) into view; used to start draw-in animations.
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// The element's current width, kept up to date as it resizes.
export function useWidth(ref: RefObject<Element | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);

    return () => observer.disconnect();
  }, [ref]);

  return width;
}
