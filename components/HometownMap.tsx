"use client";

import { useEffect, useRef, useState } from "react";
import { PersonAvatar } from "@/components/PersonAvatar";
import type { Hometown } from "@/lib/content";
import { withBasePath } from "@/lib/site-paths";

export type Traveler = {
  name: string;
  chineseName?: string;
  image?: string;
  hometown: Hometown;
};

// Tianditu (天地图), the national map service, through its WebGL API (TMap GL, vector tiles,
// sharp on high-DPI screens). The logo it draws in the corner carries the map's 审图号 and must
// stay visible. Without a key the section shows only the list.
const tiandituKey = process.env.NEXT_PUBLIC_TIANDITU_KEY ?? "";

const fudan = { lat: 31.2989, lon: 121.5015 };
const earthRadiusKm = 6371;
// Hometowns closer than this count as local.
const localKm = 30;
const pinSize = 40;

type LngLat = [number, number];
type TMapGLMarker = {
  setLngLat(lngLat: LngLat): TMapGLMarker;
  addTo(map: TMapGLMap): TMapGLMarker;
};
type TMapGLMap = {
  project(lngLat: LngLat): { x: number; y: number };
  addControl(control: object, position?: string): void;
  remove(): void;
  touchZoomRotate: { disableRotation(): void };
};
type TMapGL = {
  Map: new (container: HTMLElement, options: object) => TMapGLMap;
  Marker: new (options: { element: HTMLElement; offset: LngLat }) => TMapGLMarker;
  NavigationControl: new (options: { showCompass: boolean }) => object;
};

declare global {
  interface Window {
    TMapGL?: TMapGL;
  }
}

let tmapGLReady: Promise<TMapGL> | null = null;

function loadTMapGL() {
  tmapGLReady ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://api.tianditu.gov.cn/api/v5/js?tk=${encodeURIComponent(tiandituKey)}`;
    script.onload = () => (window.TMapGL ? resolve(window.TMapGL) : reject(new Error("Tianditu failed to load")));
    script.onerror = () => reject(new Error("Tianditu failed to load"));
    document.head.appendChild(script);
  });

  return tmapGLReady;
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function distanceToFudan({ lat, lon }: { lat: number; lon: number }) {
  const fromLat = toRadians(fudan.lat);
  const toLat = toRadians(lat);
  const a =
    Math.sin((toLat - fromLat) / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(toRadians(lon - fudan.lon) / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(a));
}

function formatKm(km: number) {
  return km < localKm ? "Local" : `${Math.round(km).toLocaleString("en-US")} km`;
}

function initialsPin(name: string) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#f6f8f7"/><text x="20" y="25" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="600" fill="#8f1d22">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Pins that would overlap at the starting zoom are fanned out around their shared centre,
// keeping their order around it. Returns a pixel offset per pin.
function spreadPins(points: { x: number; y: number }[], gap: number) {
  const offsets = points.map(() => ({ x: 0, y: 0 }));
  const parent = points.map((_, index) => index);
  const root = (index: number): number => (parent[index] === index ? index : (parent[index] = root(parent[index])));

  points.forEach((a, i) =>
    points.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < gap) {
        parent[root(i)] = root(j);
      }
    })
  );

  const groups = new Map<number, number[]>();
  points.forEach((_, index) => groups.set(root(index), [...(groups.get(root(index)) ?? []), index]));

  for (const members of groups.values()) {
    if (members.length < 2) {
      continue;
    }

    const centerX = members.reduce((sum, index) => sum + points[index].x, 0) / members.length;
    const centerY = members.reduce((sum, index) => sum + points[index].y, 0) / members.length;
    const angleOf = (index: number) => Math.atan2(points[index].y - centerY, points[index].x - centerX);
    const ordered = [...members].sort((a, b) => angleOf(a) - angleOf(b));
    const radius = gap / (2 * Math.sin(Math.PI / members.length));
    const start = angleOf(ordered[0]);

    ordered.forEach((index, slot) => {
      const angle = start + (2 * Math.PI * slot) / members.length;
      offsets[index] = {
        x: centerX + radius * Math.cos(angle) - points[index].x,
        y: centerY + radius * Math.sin(angle) - points[index].y
      };
    });
  }

  return offsets;
}

export function HometownMap({ travelers }: { travelers: Traveler[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const pinsRef = useRef(new Map<string, HTMLElement>());
  const [active, setActive] = useState<string | null>(null);
  const [mapFailed, setMapFailed] = useState(false);

  const people = travelers
    .map((traveler) => ({ ...traveler, km: distanceToFudan(traveler.hometown) }))
    .sort((a, b) => b.km - a.km);
  const activePerson = people.find((person) => person.name === active);
  const showMap = Boolean(tiandituKey) && !mapFailed;

  // The map script is large, so it loads only when the map is about to scroll into view.
  useEffect(() => {
    const container = mapRef.current;

    if (!tiandituKey || !container) {
      return;
    }

    let cancelled = false;
    let map: TMapGLMap | null = null;
    const pinElements = pinsRef.current;

    const build = (TMapGL: TMapGL) => {
      const pins = [
        {
          key: "Fudan",
          lngLat: [fudan.lon, fudan.lat] as LngLat,
          iconUrl: withBasePath("/images/branding/fudan-footer.png"),
          title: "Fudan University 复旦大学",
          className: "hometown-pin is-fudan"
        },
        ...people.map((person) => ({
          key: person.name,
          lngLat: [person.hometown.lon, person.hometown.lat] as LngLat,
          iconUrl: person.image ? withBasePath(person.image) : initialsPin(person.name),
          title: `${person.name} · ${person.hometown.city} ${person.hometown.cityZh} · ${formatKm(person.km)}`,
          className: "hometown-pin"
        }))
      ];
      const lons = pins.map((pin) => pin.lngLat[0]);
      const lats = pins.map((pin) => pin.lngLat[1]);

      const builtMap = new TMapGL.Map(container, {
        bounds: [
          [Math.min(...lons), Math.min(...lats)],
          [Math.max(...lons), Math.max(...lats)]
        ],
        // Extra room at the bottom keeps pins off the Tianditu logo and 审图号.
        fitBoundsOptions: { padding: { top: pinSize, right: pinSize, bottom: pinSize + 32, left: pinSize } },
        // Page scroll and one-finger swipes keep scrolling the page; zooming needs Ctrl or two fingers.
        cooperativeGestures: true,
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false
      });
      map = builtMap;
      builtMap.touchZoomRotate.disableRotation();
      builtMap.addControl(new TMapGL.NavigationControl({ showCompass: false }), "top-left");

      const offsets = spreadPins(
        pins.map((pin) => builtMap.project(pin.lngLat)),
        pinSize + 6
      );

      pins.forEach((pin, index) => {
        const photo = document.createElement("img");
        photo.src = pin.iconUrl;
        photo.alt = pin.title;
        photo.width = pinSize;
        photo.height = pinSize;
        photo.className = pin.className;

        const element = document.createElement("div");
        element.className = "hometown-pin-anchor";
        element.title = pin.title;
        element.appendChild(photo);
        element.addEventListener("click", () => setActive(pin.key === "Fudan" ? null : pin.key));
        pinElements.set(pin.key, element);

        new TMapGL.Marker({ element, offset: [offsets[index].x, offsets[index].y] }).setLngLat(pin.lngLat).addTo(builtMap);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        loadTMapGL()
          .then((TMapGL) => {
            if (!cancelled) {
              build(TMapGL);
            }
          })
          .catch(() => {
            if (!cancelled) {
              setMapFailed(true);
            }
          });
      },
      { rootMargin: "400px" }
    );
    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      pinElements.clear();
      map?.remove();
    };
    // The team list is static content, so the map is built once.
  }, []);

  useEffect(() => {
    pinsRef.current.forEach((element, key) => element.classList.toggle("is-active", key === active));
  }, [active]);

  const highlight = (name: string) => ({
    onMouseEnter: () => setActive(name),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(name),
    onBlur: () => setActive(null),
    onClick: () => setActive(name)
  });

  const list = (
    <ul className={`grid gap-1 sm:grid-cols-2 ${showMap ? "lg:grid-cols-1" : "lg:grid-cols-3"}`}>
      {people.map((person) => (
        <li key={person.name}>
          <button
            type="button"
            {...highlight(person.name)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan ${
              active === person.name ? "bg-paper ring-1 ring-fudan" : "hover:bg-paper"
            }`}
          >
            <PersonAvatar name={person.name} image={person.image} size="xs" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold leading-5 text-ink">
                {person.name}{" "}
                {person.chineseName ? (
                  <span lang="zh-Hans" className="font-cjk font-normal text-muted">
                    {person.chineseName}
                  </span>
                ) : null}
              </span>
              <span className="block text-xs leading-5 text-muted">
                {person.hometown.city}{" "}
                <span lang="zh-Hans" className="font-cjk">
                  {person.hometown.cityZh}
                </span>
              </span>
            </span>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-fudan">{formatKm(person.km)}</span>
          </button>
        </li>
      ))}
    </ul>
  );

  if (!showMap) {
    return list;
  }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
      <div className="relative">
        <div ref={mapRef} className="h-80 overflow-hidden rounded-xl bg-paper ring-1 ring-line sm:h-[32rem]" />
        {activePerson ? (
          <p className="pointer-events-none absolute right-3 top-3 z-10 rounded-lg bg-white/95 px-3 py-2 text-xs text-ink shadow-soft">
            <span className="font-semibold">{activePerson.name}</span>
            <span className="text-muted">
              {" "}
              · {activePerson.hometown.city} {activePerson.hometown.cityZh} · {formatKm(activePerson.km)}
            </span>
          </p>
        ) : null}
      </div>
      {list}
    </div>
  );
}
