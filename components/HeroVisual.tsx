"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { withBasePath } from "@/lib/site-paths";

// Organic, borderless scientific motion SVG with full vertical balance (560 x 456),
// tight optical label-to-icon alignment, balanced icon scales, quiet muted palette,
// smooth zone hover highlighting (without clickable boxes), and pointer-reactive molecular network nodes.

type ZoneId = "mining" | "lcms" | "dl" | "spectra" | "network" | "metabolism";

function buildSharpXicPath(
  width: number,
  baselineY: number,
  peaks: Array<{ cx: number; h: number; sL: number; sR: number }>
) {
  const steps = 140;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = (i / steps) * width;
    let yVal = 0;
    for (const p of peaks) {
      const dx = x - p.cx;
      const sigma = dx < 0 ? p.sL : p.sR;
      const z = dx / sigma;
      if (Math.abs(z) < 5.5) {
        yVal += p.h * Math.exp(-0.5 * z * z);
      }
    }
    const y = baselineY - yVal;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const stroke = pts.join(" ");
  const fill = `${stroke} L${width},${baselineY} L0,${baselineY} Z`;
  return { stroke, fill };
}

const XIC_TRACES = [
  {
    id: "xic-1",
    color: "#6b857c",
    fillId: "hv-xic-sage",
    baselineY: 23,
    ...buildSharpXicPath(118, 23, [
      { cx: 32, h: 18, sL: 1.8, sR: 2.6 },
      { cx: 86, h: 9, sL: 1.7, sR: 2.3 }
    ])
  },
  {
    id: "xic-2",
    color: "#557194",
    fillId: "hv-xic-orbit",
    baselineY: 48,
    ...buildSharpXicPath(118, 48, [
      { cx: 66, h: 22, sL: 1.9, sR: 2.8 }
    ])
  },
  {
    id: "xic-3",
    color: "#a84a4f",
    fillId: "hv-xic-crimson",
    baselineY: 73,
    ...buildSharpXicPath(118, 73, [
      { cx: 46, h: 23, sL: 1.8, sR: 2.7 },
      { cx: 95, h: 15, sL: 1.7, sR: 2.5 }
    ])
  }
];

const PEAK_XS = [0.08, 0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88];
const SPECTRA_LAYERS: Array<{ heights: number[]; color: string; opacity: number }> = [
  { heights: [0.16, 0.44, 0.0, 0.76, 0.24, 0.58, 0.84, 0.30, 0.48], color: "#9da7a2", opacity: 0.58 },
  { heights: [0.0, 0.28, 0.68, 0.0, 0.80, 0.20, 0.56, 0.88, 0.22], color: "#557194", opacity: 0.68 },
  { heights: [0.22, 0.0, 0.48, 0.88, 0.0, 0.74, 0.26, 0.94, 0.44], color: "#a84a4f", opacity: 0.84 }
];

const MIRROR_PEAKS = [
  { x: 10, top: 8, bot: 6, match: false },
  { x: 21, top: 21, bot: 19, match: true },
  { x: 33, top: 14, bot: 13, match: true },
  { x: 45, top: 7, bot: 0, match: false },
  { x: 56, top: 24, bot: 22, match: true },
  { x: 69, top: 15, bot: 14, match: true },
  { x: 80, top: 11, bot: 8, match: false }
];

const ENCODER_LAYERS = [
  [
    { x: 10, y: 18 },
    { x: 10, y: 37 },
    { x: 10, y: 56 }
  ],
  [
    { x: 45, y: 10 },
    { x: 45, y: 28 },
    { x: 45, y: 46 },
    { x: 45, y: 64 }
  ],
  [
    { x: 78, y: 25 },
    { x: 78, y: 49 }
  ]
];

const ENCODER_PULSES = [
  { d: "M10,18 L45,28 L78,25", color: "#a84a4f", dur: 5.0, begin: 0.0 },
  { d: "M10,37 L45,46 L78,49", color: "#557194", dur: 5.6, begin: 2.2 }
];

const EMBEDDING_VECTOR = [
  { color: "#a84a4f", op: 0.74 },
  { color: "#557194", op: 0.36 },
  { color: "#a84a4f", op: 0.24 },
  { color: "#557194", op: 0.78 },
  { color: "#6b857c", op: 0.64 },
  { color: "#6b857c", op: 0.30 }
];

const LATENT_POINTS = [
  { x: 24, y: 20, r: 2.8, fill: "#a84a4f", vec: true },
  { x: 18, y: 25, r: 1.9, fill: "#c6787c" },
  { x: 30, y: 16, r: 1.8, fill: "#c6787c" },
  { x: 27, y: 27, r: 1.7, fill: "#c6787c" },
  { x: 68, y: 22, r: 2.8, fill: "#557194", vec: true },
  { x: 62, y: 17, r: 1.8, fill: "#7e97b6" },
  { x: 75, y: 26, r: 1.9, fill: "#7e97b6" },
  { x: 66, y: 29, r: 1.7, fill: "#7e97b6" },
  { x: 50, y: 50, r: 2.7, fill: "#6b857c", vec: true },
  { x: 42, y: 53, r: 1.8, fill: "#8ca49b" },
  { x: 57, y: 47, r: 1.8, fill: "#8ca49b" },
  { x: 52, y: 56, r: 1.7, fill: "#8ca49b" }
];

// Molecular networking cluster (global SVG coords so pointer proximity reacts smoothly!)
const NET_OFFSET_X = 356;
const NET_OFFSET_Y = 330;

const MINI_NET_NODES = [
  { x: 88, y: 50, r: 9.2, fill: "#a84a4f", hub: true },
  { x: 34, y: 26, r: 5.2, fill: "#c6787c" },
  { x: 40, y: 78, r: 5.0, fill: "#c6787c" },
  { x: 92, y: 13, r: 4.4, fill: "#c6787c" },
  { x: 146, y: 36, r: 7.8, fill: "#557194", hub: true },
  { x: 190, y: 19, r: 4.6, fill: "#7e97b6" },
  { x: 192, y: 59, r: 4.6, fill: "#7e97b6" },
  { x: 136, y: 84, r: 6.8, fill: "#6b857c", hub: true },
  { x: 92, y: 95, r: 4.2, fill: "#8ca49b" }
];

const MINI_NET_EDGES: Array<{ a: number; b: number; color: string; pulse?: { dur: number; delay: number } }> = [
  { a: 1, b: 0, color: "#a84a4f" },
  { a: 2, b: 0, color: "#a84a4f" },
  { a: 3, b: 0, color: "#a84a4f" },
  { a: 0, b: 4, color: "#557194", pulse: { dur: 5.4, delay: 0.6 } },
  { a: 4, b: 5, color: "#557194" },
  { a: 4, b: 6, color: "#557194" },
  { a: 0, b: 7, color: "#6b857c", pulse: { dur: 6.0, delay: 2.2 } },
  { a: 4, b: 7, color: "#6b857c" },
  { a: 7, b: 8, color: "#6b857c" }
];

const ORGANIC_FLOWS = [
  { d: "M 164,152 C 156,174 130,178 124,198", color: "#557194", dur: 5.0, begin: 0.0 },
  { d: "M 426,122 C 438,144 426,150 432,168", color: "#6b857c", dur: 5.4, begin: 1.6 },
  { d: "M 276,244 C 296,242 296,216 318,214", color: "#a84a4f", dur: 4.8, begin: 0.9 },
  { d: "M 134,302 C 138,324 152,332 158,354", color: "#a84a4f", dur: 5.2, begin: 2.4 },
  { d: "M 454,274 C 462,294 452,302 448,320", color: "#557194", dur: 5.2, begin: 1.3 },
  { d: "M 328,404 C 348,402 352,384 374,380", color: "#6b857c", dur: 5.6, begin: 0.5 }
];

const AMBIENT_MARKS = [
  { x: 256, y: 24, kind: "dot", r: 1.7, color: "#9ba8a3" },
  { x: 288, y: 126, kind: "cross", color: "#b6c2bd" },
  { x: 18, y: 180, kind: "dot", r: 1.8, color: "#c29295" },
  { x: 544, y: 142, kind: "dot", r: 1.6, color: "#8fa4be" },
  { x: 304, y: 312, kind: "cross", color: "#b6c2bd" },
  { x: 52, y: 326, kind: "dot", r: 1.7, color: "#96aca4" },
  { x: 538, y: 292, kind: "dot", r: 1.5, color: "#9ba8a3" },
  { x: 344, y: 438, kind: "dot", r: 1.8, color: "#8fa4be" }
];

const VIEW_W = 560;
const VIEW_H = 456;

function QuietLabel({ x, y, text, active }: { x: number | string; y: number | string; text: string; active: boolean }) {
  return (
    <text
      x={x}
      y={y}
      fontSize="10"
      fontWeight="400"
      letterSpacing="0.01em"
      fill={active ? "#48524e" : "#858e89"}
      style={{ transition: "fill 220ms ease" }}
      fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
    >
      {text}
    </text>
  );
}

function zoneStyle(active: boolean, muted: boolean, reduceMotion: boolean): CSSProperties {
  if (reduceMotion) return {};
  return {
    opacity: active ? 1 : muted ? 0.56 : 0.92,
    transform: active ? "translateY(-2px)" : "translateY(0px)",
    transition: "opacity 220ms ease, transform 220ms cubic-bezier(0.23, 1, 0.32, 1)"
  };
}

export function HeroVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef(0);
  const clientPt = useRef({ x: 0, y: 0 });
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [hoveredZone, setHoveredZone] = useState<ZoneId | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Pointer-reactive molecular networking nodes (repels gently near cursor)
  const reactiveNetNodes = useMemo(() => {
    if (!pointer || reduceMotion) return MINI_NET_NODES;
    const localX = pointer.x - NET_OFFSET_X;
    const localY = pointer.y - NET_OFFSET_Y;
    const radius = 92;

    return MINI_NET_NODES.map((node) => {
      const dx = node.x - localX;
      const dy = node.y - localY;
      const dist = Math.hypot(dx, dy);
      if (dist === 0 || dist >= radius) return node;
      const t = 1 - dist / radius;
      const eased = t * t;
      return {
        ...node,
        x: node.x + (dx / dist) * eased * 11,
        y: node.y + (dy / dist) * eased * 11,
        r: node.r * (1 + eased * 0.14)
      };
    });
  }, [pointer, reduceMotion]);

  // Subtle ambient cursor parallax (+/- 3.5px) across the whole organic canvas
  const parallaxX = pointer && !reduceMotion ? ((pointer.x / VIEW_W) - 0.5) * -7 : 0;
  const parallaxY = pointer && !reduceMotion ? ((pointer.y / VIEW_H) - 0.5) * -5 : 0;

  const handlePointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === "touch" || reduceMotion || !svgRef.current) return;
    clientPt.current = { x: e.clientX, y: e.clientY };
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      setPointer({
        x: ((clientPt.current.x - rect.left) / rect.width) * VIEW_W,
        y: ((clientPt.current.y - rect.top) / rect.height) * VIEW_H
      });
    });
  };

  const handlePointerLeave = () => {
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    setPointer(null);
    setHoveredZone(null);
  };

  const onZoneEnter = (e: PointerEvent<SVGGElement>, zone: ZoneId) => {
    if (e.pointerType === "touch" || reduceMotion) return;
    setHoveredZone(zone);
  };

  const getZoneStyle = (zone: ZoneId) =>
    zoneStyle(hoveredZone === zone, hoveredZone !== null && hoveredZone !== zone, reduceMotion);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block h-auto w-full select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <style>{`
        @keyframes hv-rt-scan {
          0% { transform: translateX(0px); opacity: 0; }
          12% { opacity: 0.36; }
          88% { opacity: 0.36; }
          100% { transform: translateX(116px); opacity: 0; }
        }
        @keyframes hv-atlas-radar {
          0% { transform: scale(0.3); opacity: 0.40; }
          85% { opacity: 0.05; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes hv-vec-calm {
          0%, 100% { opacity: 0.80; }
          50% { opacity: 0.38; }
        }
        .hv-rt-scan { animation: hv-rt-scan 9.2s linear infinite; }
        .hv-atlas-radar { transform-box: fill-box; transform-origin: center; animation: hv-atlas-radar 7.2s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .hv-vec { animation: hv-vec-calm 5.0s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .hv-root * { animation: none !important; } }
      `}</style>

      <defs>
        <linearGradient id="hv-xic-sage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b857c" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#6b857c" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hv-xic-orbit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#557194" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#557194" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hv-xic-crimson" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a84a4f" stopOpacity="0.19" />
          <stop offset="100%" stopColor="#a84a4f" stopOpacity="0" />
        </linearGradient>
        <marker id="hv-arrow-sage" markerWidth="5" markerHeight="5" refX="4.2" refY="2.5" orient="auto">
          <path d="M0,0.5 L4.6,2.5 L0,4.5 Z" fill="#6b857c" />
        </marker>
      </defs>

      <g
        className="hv-root"
        opacity="0.90"
        style={{
          transform: `translate3d(${parallaxX.toFixed(1)}px, ${parallaxY.toFixed(1)}px, 0)`,
          transition: "transform 280ms cubic-bezier(0.23, 1, 0.32, 1)"
        }}
      >
        {/* Subtle ambient dispersion marks */}
        <g opacity="0.52">
          {AMBIENT_MARKS.map((m, i) =>
            m.kind === "cross" ? (
              <g key={i} stroke={m.color} strokeWidth="0.9">
                <line x1={m.x - 3} y1={m.y} x2={m.x + 3} y2={m.y} />
                <line x1={m.x} y1={m.y - 3} x2={m.x} y2={m.y + 3} />
              </g>
            ) : (
              <circle key={i} cx={m.x} cy={m.y} r={m.r} fill={m.color} />
            )
          )}
        </g>

        {/* Graceful organic curved pathways */}
        <g fill="none" strokeLinecap="round">
          {ORGANIC_FLOWS.map((p, idx) => (
            <g key={idx}>
              <path d={p.d} stroke="#cfd8d4" strokeWidth="1" strokeDasharray="3 4" />
              {!reduceMotion ? (
                <circle r="1.9" fill={p.color} fillOpacity="0.58">
                  <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" path={p.d} />
                </circle>
              ) : null}
            </g>
          ))}
        </g>

        {/* ============================================================== */}
        {/* UPPER-RIGHT: Repository-scale data mining + open Chem Atlas    */}
        {/* ============================================================== */}
        <g transform="translate(298 10)">
          <g
            style={getZoneStyle("mining")}
            onPointerEnter={(e) => onZoneEnter(e, "mining")}
            onPointerLeave={() => setHoveredZone(null)}
          >
            <rect x="-4" y="-4" width="258" height="106" fill="transparent" />
            <QuietLabel x={6} y={11} text="Repository-scale data mining" active={hoveredZone === "mining"} />

            {/* Balanced compact database stack aligned neatly to label x=6 */}
            <g transform="translate(6 26)">
              {[
                { x: 0, y: 0, op: 0.72 },
                { x: 33, y: 0, op: 0.72 },
                { x: 16.5, y: 13, op: 0.94 }
              ].map((db, idx) => (
                <g key={idx} transform={`translate(${db.x} ${db.y}) scale(0.27 0.30)`} opacity={db.op}>
                  <path d="M10 18v18c0 7.7 21.5 14 48 14s48-6.3 48-14V18c0 7.7-21.5 14-48 14S10 25.7 10 18Z" fill="#7c93b4" />
                  <path d="M10 36v22c0 7.7 21.5 14 48 14s48-6.3 48-14V36c0 7.7-21.5 14-48 14S10 43.7 10 36Z" fill="#aebed4" />
                  <path d="M10 58v20c0 7.7 21.5 14 48 14s48-6.3 48-14V58c0 7.7-21.5 14-48 14S10 65.7 10 58Z" fill="#d8e1ec" />
                  <ellipse cx="58" cy="18" rx="48" ry="14" fill="#557194" />
                </g>
              ))}
              <circle cx="51" cy="32" r="7" fill="var(--color-paper)" fillOpacity="0.78" stroke="#47535d" strokeWidth="1.55" />
              <line x1="56.5" y1="37.5" x2="64" y2="45" stroke="#47535d" strokeWidth="1.7" strokeLinecap="round" />
            </g>

            {/* Open miniature Chemical-Space Topographic Atlas */}
            <g transform="translate(96 18)">
              <g stroke="#d5deda" strokeWidth="0.6" strokeOpacity="0.75">
                <line x1="48" y1="4" x2="48" y2="74" strokeDasharray="2 3" />
                <line x1="108" y1="4" x2="108" y2="74" strokeDasharray="2 3" />
                <line x1="6" y1="39" x2="150" y2="39" strokeDasharray="2 3" />
              </g>

              <g transform="translate(44 40)">
                {[1.0, 0.70, 0.42].map((s, si) => (
                  <ellipse
                    key={si}
                    rx={24 * s}
                    ry={17 * s}
                    transform="rotate(-16)"
                    fill="#a84a4f"
                    fillOpacity={0.03 + si * 0.022}
                    stroke="#a84a4f"
                    strokeOpacity={0.16 + si * 0.11}
                    strokeWidth="0.75"
                  />
                ))}
                <circle r="20" fill="none" stroke="#a84a4f" strokeWidth="0.85" className="hv-atlas-radar" />
              </g>

              <g transform="translate(116 22)">
                {[1.0, 0.66, 0.36].map((s, si) => (
                  <ellipse
                    key={si}
                    rx={19 * s}
                    ry={13 * s}
                    transform="rotate(14)"
                    fill="#557194"
                    fillOpacity={0.03 + si * 0.022}
                    stroke="#557194"
                    strokeOpacity={0.16 + si * 0.11}
                    strokeWidth="0.75"
                  />
                ))}
              </g>

              <g transform="translate(104 58)">
                {[1.0, 0.66, 0.36].map((s, si) => (
                  <ellipse
                    key={si}
                    rx={18 * s}
                    ry={12 * s}
                    transform="rotate(-8)"
                    fill="#6b857c"
                    fillOpacity={0.03 + si * 0.022}
                    stroke="#6b857c"
                    strokeOpacity={0.16 + si * 0.11}
                    strokeWidth="0.75"
                  />
                ))}
              </g>

              <g fill="none" strokeLinecap="round">
                <path d="M 44,40 Q 78,19 116,22" stroke="#557194" strokeOpacity={hoveredZone === "mining" ? 0.56 : 0.34} strokeWidth="0.95" strokeDasharray="2.5 3" />
                <path d="M 44,40 Q 72,53 104,58" stroke="#6b857c" strokeOpacity={hoveredZone === "mining" ? 0.56 : 0.34} strokeWidth="0.95" strokeDasharray="2.5 3" />
                {!reduceMotion ? (
                  <circle r="1.9" fill="#557194" fillOpacity="0.7">
                    <animateMotion dur={hoveredZone === "mining" ? "2.6s" : "5.2s"} repeatCount="indefinite" path="M 44,40 Q 78,19 116,22" />
                  </circle>
                ) : null}
              </g>

              <circle cx="44" cy="40" r="2.8" fill="#a84a4f" stroke="var(--color-paper)" strokeWidth="1.2" />
              <circle cx="116" cy="22" r="2.4" fill="#557194" stroke="var(--color-paper)" strokeWidth="1.1" />
              <circle cx="104" cy="58" r="2.4" fill="#6b857c" stroke="var(--color-paper)" strokeWidth="1.1" />
            </g>
          </g>
        </g>

        {/* ============================================================== */}
        {/* UPPER-LEFT: LC-MS/MS (tightly aligned to instrument edge!)     */}
        {/* ============================================================== */}
        <g transform="translate(8 42)">
          <g
            style={getZoneStyle("lcms")}
            onPointerEnter={(e) => onZoneEnter(e, "lcms")}
            onPointerLeave={() => setHoveredZone(null)}
          >
            <rect x="0" y="0" width="272" height="106" fill="transparent" />
            {/* Label aligned directly to visual left & top of LCMS.svg instrument */}
            <QuietLabel x={22} y={24} text="LC-MS/MS" active={hoveredZone === "lcms"} />

            <g
              style={{
                transform: hoveredZone === "lcms" && !reduceMotion ? "scale(1.03)" : "scale(1)",
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: "transform 220ms cubic-bezier(0.23, 1, 0.32, 1)"
              }}
            >
              <image href={withBasePath("/images/hero/LCMS.svg")} x="2" y="13" width="132" height="106" opacity="0.90" />
            </g>

            {/* Quiet ion-spray stream accelerating gently on hover */}
            <g fill="none">
              <path
                d="M 112,64 C 128,64 134,50 150,50"
                stroke="#557194"
                strokeOpacity={hoveredZone === "lcms" ? 0.50 : 0.26}
                strokeWidth="1"
                strokeDasharray="2.5 3.5"
              />
              <path
                d="M 112,64 C 128,64 134,76 150,76"
                stroke="#a84a4f"
                strokeOpacity={hoveredZone === "lcms" ? 0.50 : 0.26}
                strokeWidth="1"
                strokeDasharray="2.5 3.5"
              />
              {!reduceMotion ? (
                <>
                  <circle r="1.9" fill="#557194" fillOpacity="0.65">
                    <animateMotion
                      dur={hoveredZone === "lcms" ? "2.1s" : "4.2s"}
                      repeatCount="indefinite"
                      path="M 112,64 C 128,64 134,50 150,50"
                    />
                  </circle>
                  <circle r="1.9" fill="#a84a4f" fillOpacity="0.65">
                    <animateMotion
                      dur={hoveredZone === "lcms" ? "2.3s" : "4.6s"}
                      begin="1.6s"
                      repeatCount="indefinite"
                      path="M 112,64 C 128,64 134,76 150,76"
                    />
                  </circle>
                </>
              ) : null}
            </g>

            {/* 3 sharp narrow XIC traces aligned cleanly with instrument baseline */}
            <g transform="translate(154 24)">
              {XIC_TRACES.map((tr) => (
                <g key={tr.id}>
                  <line x1="0" y1={tr.baselineY} x2="118" y2={tr.baselineY} stroke="#d5deda" strokeWidth="0.75" />
                  <path d={tr.fill} fill={`url(#${tr.fillId})`} />
                  <path
                    d={tr.stroke}
                    fill="none"
                    stroke={tr.color}
                    strokeWidth={hoveredZone === "lcms" ? 1.55 : 1.35}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              ))}
              <line x1="0" y1="4" x2="0" y2="75" stroke="#a84a4f" strokeWidth="0.9" strokeDasharray="2 2" className="hv-rt-scan" />
              <text x="118" y="83" textAnchor="end" fontSize="8.5" fontStyle="italic" fill="#858e89" fontFamily="ui-sans-serif, system-ui, sans-serif">
                RT
              </text>
            </g>
          </g>
        </g>

        {/* ============================================================== */}
        {/* MID-RIGHT: Deep learning + Embedding Vector + Latent Space     */}
        {/* ============================================================== */}
        <g transform="translate(316 168)">
          <g
            style={getZoneStyle("dl")}
            onPointerEnter={(e) => onZoneEnter(e, "dl")}
            onPointerLeave={() => setHoveredZone(null)}
          >
            <rect x="-4" y="-4" width="244" height="102" fill="transparent" />
            <QuietLabel x={8} y={11} text="Deep learning" active={hoveredZone === "dl"} />

            <g transform="translate(2 19)">
              <g stroke="#d2dbd7" strokeWidth="0.75" fill="none">
                {ENCODER_LAYERS[0].map((a, i) =>
                  ENCODER_LAYERS[1].map((b, j) => (
                    <line key={`e0-${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeOpacity="0.7" />
                  ))
                )}
                {ENCODER_LAYERS[1].map((a, i) =>
                  ENCODER_LAYERS[2].map((b, j) => (
                    <line key={`e1-${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeOpacity="0.7" />
                  ))
                )}
              </g>

              <g fill="none">
                {ENCODER_PULSES.map((hp, i) => (
                  <g key={i}>
                    <path d={hp.d} stroke={hp.color} strokeOpacity={hoveredZone === "dl" ? 0.55 : 0.32} strokeWidth="1.05" />
                    {!reduceMotion ? (
                      <circle r="1.9" fill={hp.color} fillOpacity="0.68">
                        <animateMotion
                          dur={hoveredZone === "dl" ? "2.4s" : `${hp.dur}s`}
                          begin={`${hp.begin}s`}
                          repeatCount="indefinite"
                          path={hp.d}
                        />
                      </circle>
                    ) : null}
                  </g>
                ))}
              </g>

              {ENCODER_LAYERS.map((layer, lIdx) =>
                layer.map((pt, nIdx) => {
                  const fill = lIdx === 0 ? "#6b857c" : lIdx === 1 ? "#557194" : "#a84a4f";
                  return (
                    <circle
                      key={`${lIdx}-${nIdx}`}
                      cx={pt.x}
                      cy={pt.y}
                      r={lIdx === 2 ? 3.9 : 3.3}
                      fill={fill}
                      stroke="var(--color-paper)"
                      strokeWidth="1.4"
                    />
                  );
                })
              )}
            </g>

            {/* Vertical Embedding Vector */}
            <g transform="translate(97 26)">
              <line x1="-10" y1="29" x2="-1" y2="29" stroke="#c7d1cd" strokeWidth="0.9" strokeDasharray="2 2" />
              <rect x="1" y="0" width="11.5" height="58" rx="3.5" fill="#ffffff" fillOpacity="0.64" stroke="#d1dad6" strokeWidth="0.8" />
              {EMBEDDING_VECTOR.map((cell, i) => (
                <rect
                  key={i}
                  x="3.3"
                  y={3.3 + i * 8.8}
                  width="6.8"
                  height="6.4"
                  rx="1.4"
                  fill={cell.color}
                  fillOpacity={cell.op}
                  className={i % 2 === 0 ? "hv-vec" : undefined}
                  style={i % 2 === 0 ? { animationDelay: `${i * 0.5}s` } : undefined}
                />
              ))}
              <line x1="14.5" y1="29" x2="36" y2="29" stroke="#c7d1cd" strokeWidth="0.9" strokeDasharray="2 3" />
            </g>

            {/* 2D Latent Embedding Space */}
            <g transform="translate(138 22)">
              <line x1="10" y1="58" x2="96" y2="58" stroke="#c5cfcb" strokeWidth="0.85" />
              <line x1="10" y1="58" x2="10" y2="6" stroke="#c5cfcb" strokeWidth="0.85" />
              <text x="96" y="67" textAnchor="end" fontSize="7.5" fontStyle="italic" fill="#858e89" fontFamily="ui-sans-serif, system-ui, sans-serif">
                z₁
              </text>
              <text x="6" y="11" textAnchor="end" fontSize="7.5" fontStyle="italic" fill="#858e89" fontFamily="ui-sans-serif, system-ui, sans-serif">
                z₂
              </text>

              <ellipse cx="25" cy="22" rx="13" ry="10" fill="#a84a4f" fillOpacity="0.05" stroke="#a84a4f" strokeOpacity="0.18" strokeWidth="0.7" strokeDasharray="2 2" />
              <ellipse cx="68" cy="23" rx="13" ry="10" fill="#557194" fillOpacity="0.05" stroke="#557194" strokeOpacity="0.18" strokeWidth="0.7" strokeDasharray="2 2" />
              <ellipse cx="50" cy="51" rx="14" ry="8.5" fill="#6b857c" fillOpacity="0.05" stroke="#6b857c" strokeOpacity="0.18" strokeWidth="0.7" strokeDasharray="2 2" />

              <g strokeWidth="0.9" strokeOpacity={hoveredZone === "dl" ? 0.52 : 0.26} style={{ transition: "stroke-opacity 220ms ease" }}>
                <line x1="10" y1="58" x2="24" y2="20" stroke="#a84a4f" />
                <line x1="10" y1="58" x2="68" y2="22" stroke="#557194" />
                <line x1="10" y1="58" x2="50" y2="50" stroke="#6b857c" />
              </g>

              {LATENT_POINTS.map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r={pt.r} fill={pt.fill} stroke="var(--color-paper)" strokeWidth={pt.vec ? 1.0 : 0.65} />
              ))}
            </g>
          </g>
        </g>

        {/* ============================================================== */}
        {/* MID-LEFT: MS/MS spectra + mirror match (tightly aligned!)      */}
        {/* ============================================================== */}
        <g transform="translate(22 202)">
          <g
            style={getZoneStyle("spectra")}
            onPointerEnter={(e) => onZoneEnter(e, "spectra")}
            onPointerLeave={() => setHoveredZone(null)}
          >
            <rect x="-4" y="-4" width="268" height="96" fill="transparent" />
            <QuietLabel x={4} y={11} text="MS/MS spectra" active={hoveredZone === "spectra"} />

            <g transform="translate(4 19)">
              {SPECTRA_LAYERS.map((layer, fi) => {
                const step = SPECTRA_LAYERS.length - 1 - fi;
                const px = step * 10;
                const py = 12 - step * 6;
                const w = 114;
                const h = 48;
                const bottom = py + h;
                return (
                  <g key={fi}>
                    <rect
                      x={px}
                      y={py}
                      width={w}
                      height={h + 4}
                      rx="4"
                      fill="#ffffff"
                      fillOpacity={fi === 2 ? 0.72 : 0.45}
                      stroke="#d7e0dc"
                      strokeWidth="0.8"
                    />
                    <line x1={px + 7} y1={bottom} x2={px + w - 7} y2={bottom} stroke="#cfd8d4" strokeWidth="0.8" />
                    <g opacity={layer.opacity}>
                      {PEAK_XS.map((xf, pi) => {
                        const x = px + 9 + xf * (w - 18);
                        const ph = layer.heights[pi] * (h - 9);
                        if (ph <= 1) return null;
                        return (
                          <line
                            key={pi}
                            x1={x}
                            y1={bottom}
                            x2={x}
                            y2={bottom - ph}
                            stroke={layer.color}
                            strokeWidth={fi === 2 && layer.heights[pi] >= 0.85 ? 1.65 : 1.2}
                            strokeLinecap="round"
                          />
                        );
                      })}
                    </g>
                  </g>
                );
              })}
              <text x="120" y="66" fontSize="8" fontStyle="italic" fill="#858e89" fontFamily="ui-sans-serif, system-ui, sans-serif">
                m/z
              </text>
            </g>

            <line x1="146" y1="51" x2="168" y2="51" stroke="#cfd8d4" strokeWidth="0.95" strokeDasharray="2.5 3" />

            <g transform="translate(172 19)">
              <line x1="4" y1="32" x2="86" y2="32" stroke="#bcc7c2" strokeWidth="0.85" />
              {MIRROR_PEAKS.map((pk, idx) => (
                <g key={idx}>
                  {pk.top > 0 ? (
                    <line
                      x1={pk.x}
                      y1="32"
                      x2={pk.x}
                      y2={32 - pk.top}
                      stroke={pk.match ? "#a84a4f" : "#a4aea9"}
                      strokeWidth={pk.match ? (hoveredZone === "spectra" ? 1.75 : 1.45) : 1.0}
                      strokeLinecap="round"
                    />
                  ) : null}
                  {pk.bot > 0 ? (
                    <line
                      x1={pk.x}
                      y1="32"
                      x2={pk.x}
                      y2={32 + pk.bot}
                      stroke={pk.match ? "#557194" : "#b2bcb7"}
                      strokeWidth={pk.match ? (hoveredZone === "spectra" ? 1.65 : 1.35) : 1.0}
                      strokeOpacity="0.82"
                      strokeLinecap="round"
                    />
                  ) : null}
                </g>
              ))}
            </g>
          </g>
        </g>

        {/* ============================================================== */}
        {/* BOTTOM-RIGHT: Interactive pointer-reactive Molecular networking*/}
        {/* ============================================================== */}
        <g transform={`translate(${NET_OFFSET_X} ${NET_OFFSET_Y - 14})`}>
          <g
            style={getZoneStyle("network")}
            onPointerEnter={(e) => onZoneEnter(e, "network")}
            onPointerLeave={() => setHoveredZone(null)}
          >
            <rect x="0" y="0" width="206" height="122" fill="transparent" />
            <QuietLabel x={22} y={11} text="Molecular networking" active={hoveredZone === "network"} />

            <g transform="translate(0 14)">
              <g fill="none" strokeLinecap="round">
                {MINI_NET_EDGES.map((edge, idx) => {
                  const a = reactiveNetNodes[edge.a];
                  const b = reactiveNetNodes[edge.b];
                  const d = `M${a.x.toFixed(1)},${a.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`;
                  return (
                    <g key={idx}>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={edge.color}
                        strokeOpacity={hoveredZone === "network" ? 0.50 : 0.34}
                        strokeWidth="1.25"
                      />
                      {edge.pulse && !reduceMotion ? (
                        <circle r="2" fill={edge.color} fillOpacity="0.64">
                          <animateMotion dur={`${edge.pulse.dur}s`} begin={`${edge.pulse.delay}s`} repeatCount="indefinite" path={d} />
                        </circle>
                      ) : null}
                    </g>
                  );
                })}
              </g>
              {reactiveNetNodes.map((n, idx) => (
                <g key={idx}>
                  {n.hub ? (
                    <circle cx={n.x} cy={n.y} r={n.r + 4} fill="none" stroke={n.fill} strokeOpacity="0.20" strokeWidth="0.9" />
                  ) : null}
                  <circle cx={n.x} cy={n.y} r={n.r} fill={n.fill} stroke="var(--color-paper)" strokeWidth="1.8" />
                  {n.hub ? <circle cx={n.x} cy={n.y} r="1.9" fill="#ffffff" fillOpacity="0.92" /> : null}
                </g>
              ))}
            </g>
          </g>
        </g>

        {/* ============================================================== */}
        {/* BOTTOM-LEFT: Xenobiotic metabolism (Tomatidine -> PEA)         */}
        {/* ============================================================== */}
        <g transform="translate(6 352)">
          <g
            style={getZoneStyle("metabolism")}
            onPointerEnter={(e) => onZoneEnter(e, "metabolism")}
            onPointerLeave={() => setHoveredZone(null)}
          >
            <rect x="0" y="0" width="336" height="94" fill="transparent" />
            <QuietLabel x={12} y={14} text="Xenobiotic metabolism" active={hoveredZone === "metabolism"} />

            <g transform="translate(6 17)" opacity="0.92">
              <image href={withBasePath("/images/hero/tomatidine.svg")} x="0" y="5" width="114" height="66" />

              <g>
                <line x1="122" y1="35" x2="164" y2="35" stroke="#6b857c" strokeWidth="1.2" strokeLinecap="round" markerEnd="url(#hv-arrow-sage)" />
                <line x1="129" y1="46" x2="171" y2="46" stroke="#6b857c" strokeWidth="1.2" strokeLinecap="round" markerEnd="url(#hv-arrow-sage)" />
                {!reduceMotion ? (
                  <circle r="2" fill="#a84a4f" fillOpacity="0.65">
                    <animateMotion
                      dur={hoveredZone === "metabolism" ? "2.4s" : "4.8s"}
                      repeatCount="indefinite"
                      path="M122,35 L162,35"
                    />
                  </circle>
                ) : null}
              </g>

              <image href={withBasePath("/images/hero/tomatidine-PEA.svg")} x="178" y="3" width="150" height="72" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
