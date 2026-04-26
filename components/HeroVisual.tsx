const nodes = [
  // Cluster A: fudan red
  { x: 870, y: 310, r: 22, fill: "#8f1d22" },
  { x: 782, y: 244, r: 16, fill: "#8f1d22" },
  { x: 971, y: 254, r: 14, fill: "#8f1d22" },
  { x: 958, y: 392, r: 13, fill: "#8f1d22" },
  { x: 848, y: 422, r: 11, fill: "#8f1d22" },
  { x: 892, y: 162, r: 12, fill: "#8f1d22" },
  { x: 1022, y: 335, r: 17, fill: "#8f1d22" },
  // Cluster B: sage green
  { x: 1102, y: 290, r: 15, fill: "#58766c" },
  { x: 1182, y: 232, r: 11, fill: "#58766c" },
  { x: 1162, y: 372, r: 13, fill: "#58766c" },
  { x: 1082, y: 443, r: 10, fill: "#58766c" },
  { x: 1233, y: 311, r: 9,  fill: "#58766c" },
  { x: 1122, y: 168, r: 10, fill: "#58766c" },
  // Cluster C: muted gray
  { x: 700,  y: 332, r: 11, fill: "#7a7872" },
  { x: 650,  y: 245, r: 9,  fill: "#7a7872" },
  { x: 723,  y: 178, r: 8,  fill: "#7a7872" },
  { x: 741,  y: 421, r: 8,  fill: "#7a7872" },
] as const;

const edges: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 5], [3, 4], [2, 6], [3, 6], [0, 6],
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
const specX = 1100, specY = 420, specW = 130, specH = 80;
// Per-step offset: each step "back" shifts right and up
const stepX = 25, stepY = -15;

export function HeroVisual() {
  return (
    <svg
      viewBox="0 0 1440 760"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="hero-dot-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#dedbd2" />
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
      <rect width="1440" height="760" fill="#f7f6f2" />
      <rect width="1440" height="760" fill="url(#hero-dot-grid)" />

      <g transform="translate(0 34)">
      {/* Network edges */}
      <g stroke="#c8c4bc" strokeWidth="1.3">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>

      {/* Network nodes */}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.fill} stroke="#f7f6f2" strokeWidth="2" />
      ))}

      {/* Data mining database icon */}
      <g opacity="0.90">
        <g transform="translate(1035 135)">
          <g transform="scale(0.35 0.40)">
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
        <g transform="translate(995 135)">
          <g transform="scale(0.35 0.40)">
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
        <g transform="translate(1015 150)">
          <g transform="scale(0.35 0.40)">
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
        <circle cx="1055" cy="181" r="12" fill="#f7f6f2" fillOpacity="0.05" stroke="#131212" strokeWidth="3" />
        <line x1="1064" y1="190" x2="1076" y2="202" stroke="#131212" strokeWidth="2.5" strokeLinecap="round" />
        <text
          x="1040"
          y="216"
          fontSize="10"
          fill="#000000"
          fontFamily="ui-sans-serif,system-ui,sans-serif"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          <tspan x="1038" dy="0">Repository-scale</tspan>
          <tspan x="1038" dy="13">data mining</tspan>
        </text>
      </g>

      {/* Molecular transformation */}
      <g opacity="0.99">
        <image href="/images/tomatidine.svg" x="710" y="430" width="100" />
        <line
          x1="810"
          y1="460"
          x2="850"
          y2="460"
          stroke="#58766c"
          strokeWidth="1.1"
          strokeLinecap="round"
          markerEnd="url(#hero-reaction-arrow)"
        />
        <line
          x1="820"
          y1="475"
          x2="860"
          y2="475"
          stroke="#58766c"
          strokeWidth="1.1"
          strokeLinecap="round"
          markerEnd="url(#hero-reaction-arrow)"
        />
        <image href="/images/tomatidine-PEA.svg" x="860" y="433" width="135" />
      </g>

      {/* LC-MS instrument icon */}
      <image href="/images/LCMS.svg" x="1130" y="150" width="160" opacity="0.95" />
      <text
        x="1208" y="275"
        fontSize="10" fill="#000000"
        fontFamily="ui-sans-serif,system-ui,sans-serif"
        letterSpacing="0.08em" textAnchor="middle"
      >
        LC-MS/MS
      </text>

      {/* MS/MS staggered spectra — drawn back to front */}
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
              stroke="#dedbd2" strokeWidth="0.8"
            />
            {/* Bottom axis */}
            <line x1={px} y1={pyBottom} x2={px + specW} y2={pyBottom} stroke="#c4c2bc" strokeWidth="0.8" />
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
        x={specX + 2 * stepX} y={specY + 10}
        fontSize="10" fill="#000000"
        fontFamily="ui-sans-serif,system-ui,sans-serif"
        letterSpacing="0.08em" textAnchor="middle"
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
    </svg>
  );
}
