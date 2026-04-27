"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

const nodes = [
  // Cluster A: fudan red
  { x: 870, y: 310, r: 22, fill: "#ad464b" },
  { x: 782, y: 244, r: 16, fill: "#ad464b" },
  { x: 961, y: 240, r: 14, fill: "#ad464b" },
  { x: 958, y: 392, r: 13, fill: "#ad464b" },
  { x: 848, y: 400, r: 11, fill: "#ad464b" },
  { x: 892, y: 162, r: 12, fill: "#ad464b" },
  { x: 1022, y: 335, r: 17, fill: "#ad464b" },
  // Cluster B: sage green
  { x: 1102, y: 290, r: 15, fill: "#78958c" },
  { x: 1182, y: 232, r: 11, fill: "#78958c" },
  { x: 1162, y: 372, r: 13, fill: "#78958c" },
  { x: 1082, y: 443, r: 10, fill: "#78958c" },
  { x: 1233, y: 311, r: 9,  fill: "#78958c" },
  { x: 1122, y: 168, r: 10, fill: "#78958c" },
  // Cluster C: muted gray
  { x: 700,  y: 332, r: 11, fill: "#7a7872" },
  { x: 650,  y: 245, r: 9,  fill: "#7a7872" },
  { x: 723,  y: 178, r: 8,  fill: "#7a7872" },
  { x: 741,  y: 421, r: 8,  fill: "#7a7872" },
] as const;

type NodePosition = {
  x: number;
  y: number;
  r: number;
  fill: string;
};

type HeroModule = "dataMining" | "molecular" | "lcms" | "spectra";

const edges: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 5], [3, 6], [0, 6],
  [7, 8], [7, 9], [7, 10], [7, 11], [8, 12], [9, 10],
  [13, 14], [13, 15], [13, 16], [14, 15],
  [0, 13], [6, 7], [1, 14], [7, 12],
];

// 15 shared m/z fractions — three files with different intensities
const peakXs = [0.05, 0.11, 0.18, 0.24, 0.31, 0.37, 0.44, 0.50, 0.57, 0.63, 0.70, 0.77, 0.84, 0.90, 0.96];

// [heights, color, opacity] — index 0 = back, index 2 = front
const fileHeights: [number[], string, number][] = [
  [[0.07, 0.28, 0.0, 0.15, 0.72, 0.0, 0.44, 0.58, 0.88, 0.28, 0.02, 0.58, 0.0, 0.02, 0.0], "#9ea09c", 0.65],
  [[0.09, 0.0, 0.59, 0.0, 0.78, 0.0, 0.48, 0.05, 0.92, 0.0, 0.0, 0.62, 0.20, 0.0, 0.07], "#58766c", 0.65],
  [[0.0, 0.18, 0.34, 0.0, 0.85, 0.0, 0.0, 0.71, 0.00, 0.20, 0.0, 0, 0.05, 0.43, 0.0], "#8f1d22", 0.90],
];

// Base position of the front (fi=2) spectrum panel
const specX = 1100, specY = 435, specW = 110, specH = 60;
// Per-step offset: each step "back" shifts right and up
const stepX = 18, stepY = -13;
const dataMiningX = 995, dataMiningY = 148;
const dataMiningIconScale = 0.80;
const databaseScaleX = 0.35 * dataMiningIconScale;
const databaseScaleY = 0.40 * dataMiningIconScale;
const viewBoxWidth = 1440;
const viewBoxHeight = 760;
const heroVisualOffsetX = -64;
const networkOffsetY = 34;
const nodeReactionRadius = 210;
const nodeMaxDrift = 18;
const nodeMaxScale = 0.2;

function moduleStyle(active: boolean, muted: boolean, reduceMotion: boolean): CSSProperties {
  if (reduceMotion) {
    return {};
  }

  return {
    cursor: "default",
    filter: active ? "drop-shadow(0 10px 10px rgba(32, 32, 29, 0.16)) saturate(1.08)" : "none",
    opacity: muted ? 0.82 : 1,
    transform: active ? "translateY(-9px) scale(1.06)" : "translateY(0) scale(1)",
    transformBox: "fill-box",
    transformOrigin: "center",
    transition: "transform 180ms ease, filter 180ms ease, opacity 180ms ease"
  };
}

function svgPointFromEvent(event: PointerEvent<SVGSVGElement>, svg: SVGSVGElement) {
  const rect = svg.getBoundingClientRect();
  const scale = Math.max(rect.width / viewBoxWidth, rect.height / viewBoxHeight);
  const renderedWidth = viewBoxWidth * scale;
  const renderedHeight = viewBoxHeight * scale;
  const offsetX = (rect.width - renderedWidth) / 2;
  const offsetY = (rect.height - renderedHeight) / 2;

  return {
    x: (event.clientX - rect.left - offsetX) / scale - heroVisualOffsetX,
    y: (event.clientY - rect.top - offsetY) / scale - networkOffsetY
  };
}

export function HeroVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [hoveredModule, setHoveredModule] = useState<HeroModule | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  const reactiveNodes = useMemo<NodePosition[]>(() => {
    if (!pointer || reduceMotion) {
      return nodes.map((node) => ({ ...node }));
    }

    return nodes.map((node) => {
      const deltaX = node.x - pointer.x;
      const deltaY = node.y - pointer.y;
      const distance = Math.hypot(deltaX, deltaY);
      const influence = Math.max(0, 1 - distance / nodeReactionRadius);
      const eased = influence * influence;
      const directionX = distance === 0 ? 0 : deltaX / distance;
      const directionY = distance === 0 ? 0 : deltaY / distance;

      return {
        ...node,
        x: node.x + directionX * eased * nodeMaxDrift,
        y: node.y + directionY * eased * nodeMaxDrift,
        r: node.r * (1 + eased * nodeMaxScale)
      };
    });
  }, [pointer, reduceMotion]);

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === "touch" || reduceMotion || !svgRef.current) {
      return;
    }

    setPointer(svgPointFromEvent(event, svgRef.current));
  };

  const handlePointerLeave = () => {
    setPointer(null);
    setHoveredModule(null);
  };

  const handleModuleEnter = (event: PointerEvent<SVGGElement>, module: HeroModule) => {
    if (event.pointerType === "touch" || reduceMotion) {
      return;
    }

    setHoveredModule(module);
  };

  const handleModuleLeave = () => {
    setHoveredModule(null);
  };

  const getModuleStyle = (module: HeroModule) => (
    moduleStyle(hoveredModule === module, hoveredModule !== null && hoveredModule !== module, reduceMotion)
  );

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <defs>
        <pattern id="hero-dot-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--color-line)" />
        </pattern>
        <marker
          id="hero-reaction-arrow"
          markerWidth="5"
          markerHeight="5"
          refX="4.5"
          refY="2.5"
          orient="auto"
        >
          <path d="M0,0 L5,2.5 L0,5 Z" fill="#58766c" />
        </marker>
      </defs>

      {/* Background */}
      <rect width={viewBoxWidth} height={viewBoxHeight} fill="var(--color-paper)" />
      <rect width={viewBoxWidth} height={viewBoxHeight} fill="url(#hero-dot-grid)" />

      <g transform={`translate(${heroVisualOffsetX} ${networkOffsetY})`}>
      {/* Network edges */}
      <g stroke="var(--color-line)" strokeWidth="1.3">
        {edges.map(([a, b], i) => (
          <line key={i} x1={reactiveNodes[a].x} y1={reactiveNodes[a].y} x2={reactiveNodes[b].x} y2={reactiveNodes[b].y} />
        ))}
      </g>

      {/* Network nodes */}
      {reactiveNodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.fill} stroke="var(--color-paper)" strokeWidth="2" />
      ))}

      {/* Data mining database icon */}
      <g transform={`translate(${dataMiningX} ${dataMiningY})`}>
        <g
          style={getModuleStyle("dataMining")}
          onPointerEnter={(event) => handleModuleEnter(event, "dataMining")}
          onPointerLeave={handleModuleLeave}
        >
        <rect x="-12" y="0" width="122" height="94" rx="10" fill="transparent" />
        <g opacity="0.90">
          <g transform="translate(39 8)">
            <g transform={`scale(${databaseScaleX} ${databaseScaleY})`}>
              <path
                d="M10 18v18c0 7.7 21.5 14 48 14s48-6.3 48-14V18c0 7.7-21.5 14-48 14S10 25.7 10 18Z"
                fill="#9ca4b5"
              />
              <path
                d="M10 36v22c0 7.7 21.5 14 48 14s48-6.3 48-14V36c0 7.7-21.5 14-48 14S10 43.7 10 36Z"
                fill="#c4c9d3"
              />
              <path
                d="M10 58v20c0 7.7 21.5 14 48 14s48-6.3 48-14V58c0 7.7-21.5 14-48 14S10 65.7 10 58Z"
                fill="#e0e3e8"
              />
              <ellipse cx="58" cy="18" rx="48" ry="14" fill="#747d97" />
            </g>
          </g>
        </g>

        <g opacity="0.90">
          <g transform="translate(5 8)">
            <g transform={`scale(${databaseScaleX} ${databaseScaleY})`}>
              <path
                d="M10 18v18c0 7.7 21.5 14 48 14s48-6.3 48-14V18c0 7.7-21.5 14-48 14S10 25.7 10 18Z"
                fill="#9ca4b5"
              />
              <path
                d="M10 36v22c0 7.7 21.5 14 48 14s48-6.3 48-14V36c0 7.7-21.5 14-48 14S10 43.7 10 36Z"
                fill="#c4c9d3"
              />
              <path
                d="M10 58v20c0 7.7 21.5 14 48 14s48-6.3 48-14V58c0 7.7-21.5 14-48 14S10 65.7 10 58Z"
                fill="#e0e3e8"
              />
              <ellipse cx="58" cy="18" rx="48" ry="14" fill="#747d97" />
            </g>
          </g>
        </g>

        <g opacity="0.90">
          <g transform="translate(22 22)">
            <g transform={`scale(${databaseScaleX} ${databaseScaleY})`}>
              <path
                d="M10 18v18c0 7.7 21.5 14 48 14s48-6.3 48-14V18c0 7.7-21.5 14-48 14S10 25.7 10 18Z"
                fill="#9ca4b5"
              />
              <path
                d="M10 36v22c0 7.7 21.5 14 48 14s48-6.3 48-14V36c0 7.7-21.5 14-48 14S10 43.7 10 36Z"
                fill="#c4c9d3"
              />
              <path
                d="M10 58v20c0 7.7 21.5 14 48 14s48-6.3 48-14V58c0 7.7-21.5 14-48 14S10 65.7 10 58Z"
                fill="#e0e3e8"
              />
              <ellipse cx="58" cy="18" rx="48" ry="14" fill="#747d97" />
            </g>
          </g>
          <circle cx="60" cy="41" r={12 * dataMiningIconScale} fill="var(--color-paper)" fillOpacity="0.05" stroke="#131212" strokeWidth={3 * dataMiningIconScale} />
          <line
            x1={60 + 9 * dataMiningIconScale}
            y1={41 + 9 * dataMiningIconScale}
            x2={60 + 21 * dataMiningIconScale}
            y2={41 + 21 * dataMiningIconScale}
            stroke="#131212"
            strokeWidth={2.5 * dataMiningIconScale}
            strokeLinecap="round"
          />
          <text
            x="41"
            y="70"
            fontSize="10"
            fill="#000000"
            fontFamily="ui-sans-serif,system-ui,sans-serif"
            letterSpacing="0"
            textAnchor="middle"
          >
            <tspan x="41" dy="0">Repository-scale</tspan>
            <tspan x="41" dy="13">data mining</tspan>
          </text>
        </g>
        </g>
      </g>

      {/* Molecular transformation */}
      <g
        style={getModuleStyle("molecular")}
        onPointerEnter={(event) => handleModuleEnter(event, "molecular")}
        onPointerLeave={handleModuleLeave}
      >
        <rect x="700" y="410" width="335" height="128" rx="10" fill="transparent" />
      <g opacity="0.99">
        <image href="/images/hero/tomatidine.svg" x="730" y="430" width="100" />
        <line
          x1="830"
          y1="460"
          x2="870"
          y2="460"
          stroke="#58766c"
          strokeWidth="1.1"
          strokeLinecap="round"
          markerEnd="url(#hero-reaction-arrow)"
        />
        <line
          x1="840"
          y1="475"
          x2="880"
          y2="475"
          stroke="#58766c"
          strokeWidth="1.1"
          strokeLinecap="round"
          markerEnd="url(#hero-reaction-arrow)"
        />
        <image href="/images/hero/tomatidine-PEA.svg" x="880" y="433" width="135" />
      </g>
      <text
        x="885"
        y="425"
        fontSize="10"
        fill="#000000"
        fontFamily="ui-sans-serif,system-ui,sans-serif"
        letterSpacing="0"
        textAnchor="middle"
      >
        Xenobiotic metabolism
      </text>
      </g>

      {/* LC-MS instrument icon */}
      <g
        style={getModuleStyle("lcms")}
        onPointerEnter={(event) => handleModuleEnter(event, "lcms")}
        onPointerLeave={handleModuleLeave}
      >
        <rect x="1126" y="148" width="178" height="140" rx="10" fill="transparent" />
        <image href="/images/hero/LCMS.svg" x="1140" y="170" width="140" opacity="1.0" />
        <text
          x="1208" y="280"
          fontSize="10" fill="#000000"
          fontFamily="ui-sans-serif,system-ui,sans-serif"
          letterSpacing="0" textAnchor="middle"
        >
          LC-MS/MS
        </text>
      </g>

      {/* MS/MS staggered spectra — drawn back to front */}
      <g
        style={getModuleStyle("spectra")}
        onPointerEnter={(event) => handleModuleEnter(event, "spectra")}
        onPointerLeave={handleModuleLeave}
      >
      <rect x="1078" y="376" width="218" height="126" rx="10" fill="transparent" />
      {fileHeights.map(([heights, color, opacity], fi) => {
        // fi=0 → back (step=2), fi=2 → front (step=0)
        const step = fileHeights.length - 1 - fi;
        const px = specX + step * stepX;
        const py = specY + step * stepY; // stepY < 0, so back panels sit higher
        const pyBottom = py + specH;

        return (
          <g key={fi}>
            {/* Panel background */}
            <rect
              x={px - 8} y={py - 6} width={specW + 16} height={specH + 6}
              fill="white" fillOpacity="0.8" rx="4"
              stroke="var(--color-line)" strokeWidth="0.8"
            />
            {/* Bottom axis */}
            <line x1={px} y1={pyBottom} x2={px + specW} y2={pyBottom} stroke="var(--color-line)" strokeWidth="0.8" />
            {/* Peaks */}
            <g opacity={opacity}>
              {peakXs.map((xf, pi) => {
                const peakX = px + xf * specW;
                const peakH = heights[pi] * (specH - 8);
                return (
                  <line
                    key={pi}
                    x1={peakX} y1={pyBottom}
                    x2={peakX} y2={pyBottom - peakH}
                    stroke={color}
                    strokeWidth={fi === 2 && heights[pi] >= 0.9 ? 2.0 : 1.4}
                  />
                );
              })}
            </g>
          </g>
        );
      })}

      {/* Label above the backmost panel */}
      <text
        x={specX + 2 * stepX} y={specY + 8}
        fontSize="10" fill="#000000"
        fontFamily="ui-sans-serif,system-ui,sans-serif"
        letterSpacing="0" textAnchor="middle"
      >
        MS/MS spectra
      </text>
      {/* m/z axis label on front panel */}
      <text
        x={specX + specW + 8} y={specY + specH + 4}
        fontSize="9" fill="#000000"
        fontFamily="ui-sans-serif,system-ui,sans-serif" fontStyle="italic"
      >
        m/z
      </text>
      </g>
      </g>
    </svg>
  );
}
