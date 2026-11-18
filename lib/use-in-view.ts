"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// Mount the chart shortly before it scrolls into view and pause it offscreen.
export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

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
