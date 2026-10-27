import type { ReactNode } from "react";

const ink = "#20201d";
const blush = "#f2a5b5";

type FaceProps = {
  x: number;
  y: number;
  scale?: number;
  blushColor?: string;
};

function Face({ x, y, scale = 1, blushColor = blush }: FaceProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={-6} cy={0} rx={2.4} ry={3} fill={ink} />
      <ellipse cx={6} cy={0} rx={2.4} ry={3} fill={ink} />
      <circle cx={-5.2} cy={-1.1} r={0.9} fill="#fff" />
      <circle cx={6.8} cy={-1.1} r={0.9} fill="#fff" />
      <ellipse cx={-10} cy={4.5} rx={2.6} ry={1.6} fill={blushColor} opacity={0.85} />
      <ellipse cx={10} cy={4.5} rx={2.6} ry={1.6} fill={blushColor} opacity={0.85} />
      <path d="M-2.4 3.6 Q0 6.2 2.4 3.6" fill="none" stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

const critters: { name: string; art: ReactNode }[] = [
  {
    name: "benzene",
    art: (
      <>
        <ellipse cx={24} cy={60} rx={4.5} ry={2.5} fill="#58766c" />
        <ellipse cx={40} cy={60} rx={4.5} ry={2.5} fill="#58766c" />
        <path
          d="M32 14 L51 25 L51 47 L32 58 L13 47 L13 25 Z"
          fill="#d7e6df"
          stroke="#58766c"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <path
          d="M34.5 20.5 L45 26.5 M45 44.5 L34.5 50.5 M19 44.5 L19 32"
          stroke="#58766c"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Face x={32} y={37} scale={0.95} />
      </>
    )
  },
  {
    name: "water",
    art: (
      <>
        <circle cx={11.5} cy={51} r={8} fill="#fff" stroke="#9aa8a3" strokeWidth={2} />
        <circle cx={52.5} cy={51} r={8} fill="#fff" stroke="#9aa8a3" strokeWidth={2} />
        <text x={11.5} y={54} textAnchor="middle" fontSize={8} fontWeight={700} fill="#9aa8a3">
          H
        </text>
        <text x={52.5} y={54} textAnchor="middle" fontSize={8} fontWeight={700} fill="#9aa8a3">
          H
        </text>
        <circle cx={32} cy={36} r={18} fill="#f5c9c4" stroke="#c0504a" strokeWidth={2.5} />
        <Face x={32} y={36} blushColor="#e88b97" />
      </>
    )
  },
  {
    name: "bacterium",
    art: (
      <>
        <path
          d="M45 41 q4 -5 8 -2 t9 -3 M45 53 q4 5 8 2 t9 3"
          fill="none"
          stroke="#58766c"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <rect x={4} y={34} width={42} height={26} rx={13} fill="#cfe6d6" stroke="#58766c" strokeWidth={2.5} />
        <circle cx={10.5} cy={45} r={1.5} fill="#58766c" opacity={0.5} />
        <circle cx={39.5} cy={41} r={1.3} fill="#58766c" opacity={0.5} />
        <circle cx={38} cy={53} r={1.1} fill="#58766c" opacity={0.5} />
        <Face x={25} y={46} scale={0.9} />
      </>
    )
  },
  {
    name: "apple",
    art: (
      <>
        <path d="M32 22 Q33 14 36.5 9.5" fill="none" stroke="#7a5230" strokeWidth={2.5} strokeLinecap="round" />
        <path d="M35 15 Q44 8 51 12 Q44 19 35 15 Z" fill="#7fa58f" stroke="#58766c" strokeWidth={1.5} />
        <path
          d="M32 22 C22 14 6 20 8 38 C10 54 22 62 32 58 C42 62 54 54 56 38 C58 20 42 14 32 22 Z"
          fill="#e4574f"
          stroke="#b8423b"
          strokeWidth={2}
        />
        <ellipse cx={17} cy={31} rx={2.6} ry={5} fill="#fff" opacity={0.45} transform="rotate(20 17 31)" />
        <Face x={32} y={40} blushColor="#ffc2c2" />
      </>
    )
  },
  {
    name: "peak",
    art: (
      <>
        <path
          d="M3 60 C19 60 23 12 32 12 C41 12 45 60 61 60 Z"
          fill="#e3dbf3"
          stroke="#7a64b0"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <Face x={32} y={42} scale={0.8} />
      </>
    )
  },
  {
    name: "capsule",
    art: (
      <g transform="rotate(-14 32 34)">
        <path d="M20 34 V20 a12 12 0 0 1 24 0 V34 Z" fill="#d9574f" stroke="#b8423b" strokeWidth={2.5} strokeLinejoin="round" />
        <path d="M20 34 V48 a12 12 0 0 0 24 0 V34 Z" fill="#fff" stroke="#b8423b" strokeWidth={2.5} strokeLinejoin="round" />
        <Face x={32} y={41} scale={0.72} />
      </g>
    )
  },
  {
    name: "flask",
    art: (
      <>
        <circle cx={37} cy={5} r={1.8} fill="#9cc0ea" />
        <circle cx={31} cy={1.8} r={1.2} fill="#9cc0ea" />
        <path
          d="M26 12 V25 L10 54 Q8 60 14 60 H50 Q56 60 54 54 L38 25 V12 Z"
          fill="#fff"
          stroke="#6b7f78"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <path d="M17.5 41 H46.5 L52.5 53.5 Q54 58 49.5 58 H14.5 Q10 58 11.5 53.5 Z" fill="#9cc0ea" />
        <rect x={23} y={9} width={18} height={4} rx={2} fill="#6b7f78" />
        <circle cx={41} cy={46} r={1.6} fill="#fff" opacity={0.8} />
        <Face x={32} y={49} scale={0.82} />
      </>
    )
  },
  {
    name: "lipid",
    art: (
      <>
        <path
          d="M27 52 L33 46 L39 52 L45 46 L51 52 L57 46"
          fill="none"
          stroke="#d59b2a"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={16} cy={48} r={12} fill="#f6d28b" stroke="#d59b2a" strokeWidth={2.5} />
        <Face x={16} y={48} scale={0.7} />
      </>
    )
  },
  {
    name: "droplet",
    art: (
      <>
        <path d="M32 6 C32 6 13 30 13 42 A19 19 0 0 0 51 42 C51 30 32 6 32 6 Z" fill="#cddcf0" stroke="#4a76b8" strokeWidth={2.5} />
        <ellipse cx={22} cy={36} rx={2.4} ry={4.5} fill="#fff" opacity={0.6} transform="rotate(25 22 36)" />
        <Face x={32} y={44} scale={0.9} />
      </>
    )
  }
];

export function MoleculeCritters() {
  return (
    <div aria-hidden="true" className="flex items-end justify-between gap-2 px-1">
      {critters.map((critter, index) => (
        <svg
          key={critter.name}
          viewBox="0 0 64 64"
          className={`critter h-12 w-12 shrink-0 sm:h-16 sm:w-16 ${index >= 5 ? "hidden sm:block" : ""}`}
          style={{ animationDelay: `${index * -0.35}s` }}
        >
          {critter.art}
        </svg>
      ))}
    </div>
  );
}
