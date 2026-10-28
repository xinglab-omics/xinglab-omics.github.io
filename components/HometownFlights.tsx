"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PersonAvatar } from "@/components/PersonAvatar";
import { formatKm, scaleKm, withDistances, type Traveler, type TravelerWithDistance } from "@/lib/hometowns";
import { withBasePath } from "@/lib/site-paths";
import { useInView, useWidth } from "@/lib/use-in-view";

// Wide layout: Fudan on the left, a km ruler along the bottom, arcs rising above.
const wide = { height: 300, baseline: 190, rulerY: 276, padLeft: 52, padRight: 60, minGap: 64 };
// Narrow layout (phones): Fudan at the top, hometowns down the page, arcs bulging to the left.
const narrow = { top: 28, axisX: 112, span: 470, minGap: 58, below: 560 };
// Closer than this, an arc would be too small to see: the member just sits beside Fudan.
const nearbyKm = 100;

type Placed = TravelerWithDistance & { x: number; y: number };

// Dotted flight paths from each hometown to Fudan on a true km scale, with a dot travelling home.
export function HometownFlights({ travelers }: { travelers: Traveler[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const width = useWidth(ref);
  const [active, setActive] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const people = withDistances(travelers);
  const maxKm = scaleKm(people);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const isNarrow = width > 0 && width < narrow.below;
  const origin = isNarrow ? { x: narrow.axisX, y: narrow.top } : { x: wide.padLeft, y: wide.baseline };
  const scale = isNarrow ? narrow.span / maxKm : (width - wide.padLeft - wide.padRight) / maxKm;
  const gap = isNarrow ? narrow.minGap : wide.minGap;

  // True distance, nudged apart where photos would collide.
  let previous = isNarrow ? origin.y : origin.x;
  const placed: Placed[] = people.map((person) => {
    const position = Math.max((isNarrow ? origin.y : origin.x) + person.km * scale, previous + gap);
    previous = position;
    return { ...person, x: isNarrow ? origin.x : position, y: isNarrow ? position : origin.y };
  });
  const span = (person: Placed) => (isNarrow ? person.y - origin.y : person.x - origin.x);
  const widest = Math.max(...placed.map(span));
  // Room for the arcs: above the baseline, or left of the axis on phones.
  const room = isNarrow ? narrow.axisX - 12 : wide.baseline - 18;
  const flatten = Math.min(0.62, room / (widest / 2));
  const height = isNarrow ? previous + 40 : wide.height;
  const ticks = Array.from({ length: maxKm / 500 + 1 }, (_, index) => index * 500);
  const activePerson = placed.find((person) => person.name === active);

  // Every arc is a half-ellipse of the same proportions, from Fudan to the hometown.
  const arc = (person: Placed) => {
    const half = span(person) / 2;
    return isNarrow
      ? `M ${origin.x} ${origin.y} A ${half * flatten} ${half} 0 0 0 ${person.x} ${person.y}`
      : `M ${origin.x} ${origin.y} A ${half} ${half * flatten} 0 0 1 ${person.x} ${person.y}`;
  };

  return (
    <div ref={ref} className="relative" style={{ height: width > 0 ? height : wide.height }}>
      {width > 0 ? (
        <>
          <svg aria-hidden="true" width={width} height={height} className="absolute inset-0 overflow-visible">
            {/* The 0 km line through Fudan. */}
            {isNarrow ? (
              <line x1={8} y1={origin.y} x2={width - 8} y2={origin.y} className="stroke-muted" strokeOpacity={0.45} strokeDasharray="4 5" />
            ) : (
              <line x1={origin.x} y1={8} x2={origin.x} y2={wide.rulerY} className="stroke-muted" strokeOpacity={0.45} strokeDasharray="4 5" />
            )}

            {placed
              .filter((person) => person.km >= nearbyKm)
              .map((person, index) => {
                const isActive = active === person.name;
                return (
                  <g key={person.name}>
                    <path
                      d={arc(person)}
                      className="fill-none stroke-fudan transition-[stroke-opacity,stroke-width] duration-200"
                      style={{
                        strokeOpacity: active === null ? 0.7 : isActive ? 1 : 0.15,
                        strokeWidth: active === null ? 1.8 : isActive ? 2.4 : 0.45,
                        strokeLinecap: "round",
                        strokeDasharray: "1 6"
                      }}
                    />
                    {inView && !reduceMotion ? (
                      <circle r={3.5} className="fill-fudan">
                        {/* Travels from the hometown back to Fudan. */}
                        <animateMotion
                          dur={`${2.2 + person.km / 600}s`}
                          begin={`${index * 0.35}s`}
                          repeatCount="indefinite"
                          path={arc(person)}
                          keyPoints="1;0"
                          keyTimes="0;1"
                          calcMode="linear"
                        />
                      </circle>
                    ) : null}
                  </g>
                );
              })}

            {isNarrow ? null : (
              <>
                <line x1={origin.x} y1={wide.rulerY} x2={origin.x + maxKm * scale} y2={wide.rulerY} className="stroke-line" strokeWidth={1} />
                {ticks.map((km) => (
                  <g key={km}>
                    <line x1={origin.x + km * scale} y1={wide.rulerY - 4} x2={origin.x + km * scale} y2={wide.rulerY} className="stroke-line" strokeWidth={1} />
                    <text
                      x={origin.x + km * scale}
                      y={wide.rulerY + 15}
                      textAnchor={km === maxKm ? "end" : km === 0 ? "start" : "middle"}
                      className="fill-muted text-[11px]"
                    >
                      {km === maxKm ? `${km.toLocaleString("en-US")} km` : km.toLocaleString("en-US")}
                    </text>
                  </g>
                ))}
              </>
            )}
          </svg>

          <div
            className={`absolute flex items-center ${isNarrow ? "-translate-y-1/2 gap-2.5" : "-translate-x-1/2 -translate-y-6 flex-col"}`}
            style={{ left: isNarrow ? origin.x - 24 : origin.x, top: origin.y }}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white ring-2 ring-fudan">
              <Image src={withBasePath("/images/branding/fudan-footer.png")} alt="" width={40} height={40} className="size-10" />
            </span>
            <span className={`whitespace-nowrap bg-paper px-1 text-xs font-semibold text-fudan ${isNarrow ? "" : "mt-2"}`}>
              Fudan <span lang="zh-Hans" className="font-cjk">复旦</span>
            </span>
          </div>

          {placed.map((person) => (
            <div
              key={person.name}
              title={`${person.name} · ${person.hometown.city} ${person.hometown.cityZh}`}
              className={`absolute flex items-center ${isNarrow ? "-translate-y-1/2 gap-2.5" : "-translate-x-1/2 -translate-y-[18px] flex-col"}`}
              style={{ left: isNarrow ? person.x - 18 : person.x, top: person.y }}
              onMouseEnter={() => setActive(person.name)}
              onMouseLeave={() => setActive(null)}
            >
              <span className={`shrink-0 rounded-full ring-2 transition ${active === person.name ? "scale-110 ring-fudan" : "ring-white"}`}>
                <PersonAvatar name={person.name} image={person.image} size="xs" />
              </span>
              <span className={isNarrow ? "min-w-0" : "contents"}>
                {isNarrow ? (
                  <span className="block whitespace-nowrap text-xs font-semibold leading-4 text-ink">{person.name}</span>
                ) : null}
                {/* Wide layout stacks the Chinese name under the English one so neighbours don't collide. */}
                <span className={`block whitespace-nowrap text-xs leading-4 text-ink ${isNarrow ? "" : "mt-2 text-center"}`}>
                  {person.hometown.city}
                  {isNarrow ? " " : <br />}
                  <span lang="zh-Hans" className="font-cjk">
                    {person.hometown.cityZh}
                  </span>
                </span>
                <span className="block whitespace-nowrap text-[11px] font-semibold leading-4 tabular-nums text-fudan">
                  {formatKm(person.km)}
                </span>
              </span>
            </div>
          ))}

          {activePerson && !isNarrow ? (
            <p className="pointer-events-none absolute right-0 top-0 rounded-lg bg-white/80 px-3 py-1.5 text-xs text-ink">
              <span className="font-semibold">{activePerson.name}</span>
              <span className="text-muted">
                {" "}
                · {activePerson.hometown.city} {activePerson.hometown.cityZh} · {formatKm(activePerson.km)}
              </span>
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
