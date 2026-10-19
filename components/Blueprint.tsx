"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type SVGProps } from "react";

type DrawProps = SVGProps<SVGPathElement> & { d: string; delay?: number; duration?: number; inView: boolean };

function Draw({ d, delay = 0, duration = 1.2, inView, ...rest }: DrawProps) {
  return (
    <motion.path
      d={d}
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] }, opacity: { delay, duration: 0.01 } }}
      {...(rest as object)}
    />
  );
}

function Fade({ children, delay, inView }: { children: React.ReactNode; delay: number; inView: boolean }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay, duration: 0.5 }}>
      {children}
    </motion.g>
  );
}

const rr = (cx: number, cy: number, w: number, h: number, r: number) => {
  const x = cx - w / 2;
  const y = cy - h / 2;
  return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
};

// Horizontal dimension with arrows + extension lines.
function DimH({ x1, x2, y, label, delay, inView, ext = 0 }: { x1: number; x2: number; y: number; label: string; delay: number; inView: boolean; ext?: number }) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      {ext !== 0 && (
        <>
          <Draw inView={inView} delay={delay} duration={0.4} d={`M${x1},${y + ext} V${y - 6 * Math.sign(ext)}`} stroke="rgba(20,20,20,0.25)" strokeWidth={0.75} />
          <Draw inView={inView} delay={delay} duration={0.4} d={`M${x2},${y + ext} V${y - 6 * Math.sign(ext)}`} stroke="rgba(20,20,20,0.25)" strokeWidth={0.75} />
        </>
      )}
      <Draw inView={inView} delay={delay + 0.2} duration={0.6} d={`M${x1},${y} H${x2}`} stroke="#ff6b1a" strokeWidth={1} />
      <Draw inView={inView} delay={delay + 0.6} duration={0.2} d={`M${x1 + 8},${y - 4} L${x1},${y} L${x1 + 8},${y + 4}`} stroke="#ff6b1a" strokeWidth={1} />
      <Draw inView={inView} delay={delay + 0.6} duration={0.2} d={`M${x2 - 8},${y - 4} L${x2},${y} L${x2 - 8},${y + 4}`} stroke="#ff6b1a" strokeWidth={1} />
      <Fade inView={inView} delay={delay + 0.7}>
        <rect x={mid - 24} y={y - 9} width={48} height={18} fill="#ffffff" />
        <text x={mid} y={y + 4} textAnchor="middle" className="fill-fg font-mono" fontSize={11}>
          {label}
        </text>
      </Fade>
    </g>
  );
}

function DimV({ y1, y2, x, label, delay, inView }: { y1: number; y2: number; x: number; label: string; delay: number; inView: boolean }) {
  const mid = (y1 + y2) / 2;
  return (
    <g>
      <Draw inView={inView} delay={delay} duration={0.6} d={`M${x},${y1} V${y2}`} stroke="#ff6b1a" strokeWidth={1} />
      <Draw inView={inView} delay={delay + 0.4} duration={0.2} d={`M${x - 4},${y1 + 8} L${x},${y1} L${x + 4},${y1 + 8}`} stroke="#ff6b1a" strokeWidth={1} />
      <Draw inView={inView} delay={delay + 0.4} duration={0.2} d={`M${x - 4},${y2 - 8} L${x},${y2} L${x + 4},${y2 - 8}`} stroke="#ff6b1a" strokeWidth={1} />
      <Fade inView={inView} delay={delay + 0.6}>
        <rect x={x - 20} y={mid - 9} width={40} height={18} fill="#ffffff" />
        <text x={x} y={mid + 4} textAnchor="middle" className="fill-fg font-mono" fontSize={11}>
          {label}
        </text>
      </Fade>
    </g>
  );
}

export function FrontBlueprint() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const line = { stroke: "rgba(20,20,20,0.85)", strokeWidth: 1.4 };
  const thin = { stroke: "rgba(20,20,20,0.35)", strokeWidth: 0.9 };

  return (
    <svg ref={ref} viewBox="0 0 800 440" className="h-auto w-full" role="img" aria-label="Front-view technical drawing of the smart glasses">
      {/* centre lines */}
      <Draw inView={inView} delay={0} duration={1} d="M400,40 V410" stroke="rgba(255,107,26,0.35)" strokeWidth={0.8} strokeDasharray="10 4 2 4" />
      <Draw inView={inView} delay={0} duration={1} d="M110,215 H690" stroke="rgba(255,107,26,0.35)" strokeWidth={0.8} strokeDasharray="10 4 2 4" />

      {/* brow bar */}
      <Draw inView={inView} delay={0.3} duration={1.4} d={rr(400, 118, 520, 30, 12)} {...line} />
      {/* rims (outer + inner) */}
      <Draw inView={inView} delay={0.5} duration={1.6} d={rr(278, 220, 226, 168, 56)} {...line} />
      <Draw inView={inView} delay={0.5} duration={1.6} d={rr(522, 220, 226, 168, 56)} {...line} />
      <Draw inView={inView} delay={0.9} duration={1.4} d={rr(278, 220, 196, 138, 42)} {...thin} />
      <Draw inView={inView} delay={0.9} duration={1.4} d={rr(522, 220, 196, 138, 42)} {...thin} />
      {/* bridge */}
      <Draw inView={inView} delay={1.2} duration={0.8} d="M391,178 Q400,160 409,178" {...line} />
      {/* hinges */}
      <Draw inView={inView} delay={1.3} duration={0.6} d="M140,128 h26 v40 h-26 z" {...thin} />
      <Draw inView={inView} delay={1.3} duration={0.6} d="M634,128 h26 v40 h-26 z" {...thin} />

      {/* sensors */}
      <Fade inView={inView} delay={1.6}>
        <circle cx={196} cy={118} r={11} fill="none" stroke="#ff6b1a" strokeWidth={1.2} />
        <circle cx={196} cy={118} r={4} fill="#ff6b1a" />
        <circle cx={604} cy={118} r={11} fill="none" stroke="#ff6b1a" strokeWidth={1.2} />
        <circle cx={604} cy={118} r={4} fill="#ff6b1a" />
        <rect x={372} y={110} width={56} height={16} rx={3} fill="none" stroke="#ff6b1a" strokeWidth={1.2} />
        <rect x={378} y={114} width={16} height={8} fill="#ff6b1a" />
        <circle cx={316} cy={118} r={6} fill="none" stroke="rgba(20,20,20,0.8)" strokeWidth={1} />
      </Fade>

      {/* callouts */}
      <Fade inView={inView} delay={2.1}>
        <path d="M196,107 L170,70 H110" fill="none" stroke="rgba(20,20,20,0.4)" strokeWidth={0.8} />
        <text x={110} y={64} className="fill-fg/70 font-mono" fontSize={10}>A · ULTRASONIC</text>
        <path d="M400,110 L430,70 H520" fill="none" stroke="rgba(20,20,20,0.4)" strokeWidth={0.8} />
        <text x={440} y={64} className="fill-fg/70 font-mono" fontSize={10}>B · LIDAR ToF</text>
        <path d="M316,112 L290,80 H230" fill="none" stroke="rgba(20,20,20,0.4)" strokeWidth={0.8} />
        <text x={230} y={74} className="fill-fg/70 font-mono" fontSize={10}>C · CAMERA</text>
        <path d="M604,107 L630,70 H690" fill="none" stroke="rgba(20,20,20,0.4)" strokeWidth={0.8} />
        <text x={640} y={64} className="fill-fg/70 font-mono" fontSize={10}>A</text>
      </Fade>

      {/* dimensions (standard eyewear 52□18-140 sizing, illustrative) */}
      <DimH inView={inView} x1={165} x2={391} y={350} label="52" delay={2.2} ext={-46} />
      <DimH inView={inView} x1={391} x2={409} y={380} label="18" delay={2.4} />
      <DimH inView={inView} x1={140} x2={660} y={410} label="140" delay={2.6} ext={-250} />
      <DimV inView={inView} y1={136} y2={304} x={100} label="38" delay={2.8} />
    </svg>
  );
}

export function DetectionDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  // Side elevation: user at left, glasses at (120,120). Ground at y=330, drop-off at x=470.
  return (
    <svg ref={ref} viewBox="0 0 800 400" className="h-auto w-full" role="img" aria-label="Side-view diagram of drop-off and overhead obstacle detection">
      <defs>
        <linearGradient id="beam" x1="0" x2="1">
          <stop offset="0" stopColor="#ff6b1a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff6b1a" stopOpacity="0" />
        </linearGradient>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(20,20,20,0.15)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* ground with drop-off */}
      <Fade inView={inView} delay={0.6}>
        <path d="M20,330 H470 V372 H780 V400 H20 Z" fill="url(#hatch)" />
      </Fade>
      <Draw inView={inView} delay={0.1} duration={1.4} d="M20,330 H470 V372 H780" stroke="rgba(20,20,20,0.8)" strokeWidth={1.4} />

      {/* overhanging obstacle */}
      <Fade inView={inView} delay={0.9}>
        <rect x={560} y={20} width={220} height={70} fill="url(#hatch)" />
      </Fade>
      <Draw inView={inView} delay={0.6} duration={1.2} d="M780,90 H560 V20" stroke="rgba(20,20,20,0.8)" strokeWidth={1.4} />

      {/* person (head + glasses) */}
      <Draw inView={inView} delay={0.3} duration={1.2} d="M72,330 V205 Q72,170 105,162 Q138,170 138,205 V330" stroke="rgba(20,20,20,0.45)" strokeWidth={1.1} />
      <Draw inView={inView} delay={0.4} duration={0.9} d="M77,112 a28,34 0 1,0 56,0 a28,34 0 1,0 -56,0" stroke="rgba(20,20,20,0.55)" strokeWidth={1.1} />
      <Fade inView={inView} delay={1.1}>
        <rect x={116} y={108} width={22} height={12} rx={3} fill="#ff6b1a" />
      </Fade>

      {/* beams */}
      <Fade inView={inView} delay={1.4}>
        <path d="M138,114 L470,330 L470,300 Z" fill="url(#beam)" />
        <path d="M138,112 L560,90 L560,40 Z" fill="url(#beam)" />
      </Fade>
      <Draw inView={inView} delay={1.4} duration={1} d="M138,114 L470,330" stroke="#ff6b1a" strokeWidth={1.2} strokeDasharray="4 4" />
      <Draw inView={inView} delay={1.6} duration={1} d="M138,112 L560,70" stroke="#ff6b1a" strokeWidth={1.2} strokeDasharray="4 4" />

      {/* detection pings */}
      {inView &&
        [
          [470, 330],
          [560, 70],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={4} fill="#ff6b1a" />
            <motion.circle
              cx={cx}
              cy={cy}
              fill="none"
              stroke="#ff6b1a"
              strokeWidth={1.2}
              initial={{ r: 4, opacity: 0.9 }}
              animate={{ r: 26, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 2.4 + i * 0.6, ease: "easeOut" }}
            />
          </g>
        ))}

      {/* dimensions */}
      <DimH inView={inView} x1={130} x2={470} y={260} label="≥1 m" delay={2.2} />
      <DimV inView={inView} y1={330} y2={372} x={520} label="15cm" delay={2.4} />

      <Fade inView={inView} delay={2.6}>
        <text x={480} y={318} className="fill-ember-500 font-mono" fontSize={10}>DROP-OFF · CONTINUOUS BUZZ</text>
        <text x={570} y={110} className="fill-ember-500 font-mono" fontSize={10}>OVERHANG · SPIKE PULSE</text>
        <text x={40} y={360} className="fill-fg/40 font-mono" fontSize={10}>SIDE ELEVATION · NTS</text>
      </Fade>
    </svg>
  );
}
