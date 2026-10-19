"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Grid, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import GlassesModel from "./GlassesModel";

type Mode = "hero" | "scroll";

const ease = (t: number) => 1 - Math.pow(1 - THREE.MathUtils.clamp(t, 0, 1), 3);
const smooth = (a: number, b: number, v: number) => {
  const t = THREE.MathUtils.clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function Rig({
  mode,
  progress,
  exploded,
}: {
  mode: Mode;
  progress?: MotionValue<number>;
  exploded?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const explode = useRef(mode === "hero" ? 1.6 : 0);
  const beams = useRef(0);
  const start = useRef<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent damping

    if (mode === "hero") {
      if (start.current === null) start.current = t;
      const intro = ease((t - start.current - 0.25) / 2.4);
      const target = exploded ? 0.72 : 0;
      // Assemble from exploded parts on load, then follow the toggle.
      explode.current =
        intro < 1 ? THREE.MathUtils.lerp(1.6, 0, intro) : THREE.MathUtils.lerp(explode.current, target, k * 0.6);
      const beamTarget = intro < 1 ? Math.max(0, (intro - 0.7) / 0.3) : 1 - explode.current;
      beams.current = THREE.MathUtils.lerp(beams.current, beamTarget, k);

      const px = reduced.current ? 0 : state.pointer.x;
      const py = reduced.current ? 0 : state.pointer.y;
      const spin = (1 - intro) * 1.4;
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.55 + Math.sin(t * 0.25) * 0.28 + px * 0.35 - spin, k * 0.5);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.1 - py * 0.12, k * 0.5);
      g.position.y = Math.sin(t * 0.8) * 0.03;
      g.position.x = state.viewport.aspect > 1.2 ? 0.2 : 0;
    } else {
      const p = progress?.get() ?? 0;
      // 0–⅓ assembled, ⅓–⅔ exploded, ⅔–1 reassembled with beams sweeping.
      const e = smooth(0.1, 0.4, p) * (1 - smooth(0.66, 0.85, p));
      explode.current = THREE.MathUtils.lerp(explode.current, e, k);
      beams.current = THREE.MathUtils.lerp(beams.current, 1 - smooth(0.04, 0.18, p) + smooth(0.75, 0.9, p), k);
      const narrow = state.viewport.aspect < 1;
      g.position.x = 0;
      g.position.y = narrow ? 0.45 : 0;
      // Fit the exploded spread (~3.4 units wide incl. labels) to the canvas width.
      g.scale.setScalar(THREE.MathUtils.clamp(state.viewport.aspect / 1.55, 0.58, 1));
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.85 + Math.sin(p * Math.PI) * 0.65 + state.pointer.x * 0.1, k * 0.6);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.28 - p * 0.12, k * 0.6);
    }
  });

  return (
    <group ref={group}>
      <GlassesModel explode={explode} beams={beams} showLabels={mode === "scroll" && wide} />
    </group>
  );
}

export default function GlassesCanvas({
  mode = "hero",
  progress,
  exploded,
  className = "",
}: {
  mode?: Mode;
  progress?: MotionValue<number>;
  exploded?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: mode === "hero" ? [0, 0.55, 4.6] : [0, 0.6, 5], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <directionalLight position={[-4, 1, -3]} intensity={2.2} color="#ff6b1a" />
        <pointLight position={[0, 0.6, 1.5]} intensity={0.6} color="#ffffff" />
        <Suspense fallback={null}>
          <Environment resolution={128} frames={1}>
            <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 1, 1]} />
            <Lightformer intensity={1.5} position={[-4, 0, 0]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
            <Lightformer intensity={3} color="#ff6b1a" position={[4, -1, -2]} rotation-y={-Math.PI / 2} scale={[3, 1, 1]} />
          </Environment>
          <Rig mode={mode} progress={progress} exploded={exploded} />
        </Suspense>
        <Grid
          position={[0, -0.62, 0]}
          args={[20, 20]}
          cellSize={0.2}
          cellThickness={0.6}
          cellColor="#d6d4ce"
          sectionSize={1}
          sectionThickness={1}
          sectionColor="#f3b48c"
          fadeDistance={7}
          fadeStrength={2.2}
          infiniteGrid
        />
      </Canvas>
    </div>
  );
}
