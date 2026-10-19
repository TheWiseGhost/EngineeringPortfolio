"use client";

import { useMemo, useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Html } from "@react-three/drei";
import * as THREE from "three";

const ORANGE = "#ff6b1a";

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function useGeometries() {
  return useMemo(() => {
    const rimShape = roundedRect(0.62, 0.46, 0.19);
    rimShape.holes.push(roundedRect(0.52, 0.36, 0.14) as unknown as THREE.Path);
    const rim = new THREE.ExtrudeGeometry(rimShape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.01,
      bevelSegments: 3,
      curveSegments: 24,
    });
    rim.translate(0, 0, -0.025);

    const lens = new THREE.ShapeGeometry(roundedRect(0.53, 0.37, 0.145), 24);

    const bridge = new THREE.TubeGeometry(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.075, 0.07, 0),
        new THREE.Vector3(0, 0.16, 0.01),
        new THREE.Vector3(0.075, 0.07, 0)
      ),
      20,
      0.022,
      12
    );

    const brow = new THREE.ExtrudeGeometry(roundedRect(1.38, 0.07, 0.03), {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    });
    brow.translate(0, 0, -0.04);

    return { rim, lens, bridge, brow };
  }, []);
}

type PartProps = {
  explode: MutableRefObject<number>;
  dir: [number, number, number];
  children: ReactNode;
  label?: string;
  sub?: string;
  labelOffset?: [number, number, number];
  showLabels?: boolean;
};

// A sub-assembly that slides along `dir` as explode goes 0 → 1.
function Part({ explode, dir, children, label, sub, labelOffset = [0, 0.08, 0], showLabels }: PartProps) {
  const ref = useRef<THREE.Group>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  useFrame(() => {
    const e = explode.current;
    ref.current?.position.set(dir[0] * e, dir[1] * e, dir[2] * e);
    if (labelRef.current) {
      const o = THREE.MathUtils.clamp((e - 0.55) * 2.5, 0, 1);
      labelRef.current.style.opacity = String(o);
      labelRef.current.style.transform = `translateY(${(1 - o) * 6}px)`;
    }
  });
  return (
    <group ref={ref}>
      {children}
      {label && showLabels && (
        <Html position={labelOffset} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div ref={labelRef} style={{ opacity: 0 }} className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-500 shadow-[0_0_10px_#ff6b1a]" />
            <span className="rounded-md border border-white/15 bg-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
              {label}
              {sub && <span className="ml-1.5 text-ember-400">{sub}</span>}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

const beamVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const beamFragment = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float along = vUv.y;               // 1 at the emitter, 0 at the far end
    float base = pow(along, 2.6) * 0.16;
    float band = smoothstep(0.06, 0.0, abs(fract(vUv.y + uTime * 0.45) - 0.5)) * 0.22 * along;
    float stripes = step(0.5, fract(vUv.x * 48.0)) * 0.05 * along;
    gl_FragColor = vec4(uColor, (base + band + stripes) * uIntensity);
  }
`;

function Beam({
  position,
  rotation,
  length = 2.6,
  radius = 0.55,
  intensity,
  speed = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  length?: number;
  radius?: number;
  intensity: MutableRefObject<number>;
  speed?: number;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uIntensity: { value: 1 }, uColor: { value: new THREE.Color(ORANGE) } }),
    []
  );
  useFrame((s) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = s.clock.elapsedTime * speed;
    mat.current.uniforms.uIntensity.value = intensity.current;
  });
  return (
    <group position={position} rotation={rotation}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, length / 2]}>
        <coneGeometry args={[radius, length, 48, 1, true]} />
        <shaderMaterial
          ref={mat}
          vertexShader={beamVertex}
          fragmentShader={beamFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export type GlassesModelProps = {
  explode: MutableRefObject<number>;
  beams: MutableRefObject<number>;
  showLabels?: boolean;
};

export default function GlassesModel({ explode, beams, showLabels = false }: GlassesModelProps) {
  const g = useGeometries();

  const frameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#151515", metalness: 0.55, roughness: 0.32 }),
    []
  );
  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0b0b0b", metalness: 0.3, roughness: 0.5 }),
    []
  );
  const greyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#3a3a3a", metalness: 0.8, roughness: 0.25 }),
    []
  );
  const emissive = useMemo(
    () => new THREE.MeshStandardMaterial({ color: ORANGE, emissive: ORANGE, emissiveIntensity: 2.2, toneMapped: false }),
    []
  );
  const lensMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#202020",
        metalness: 0,
        roughness: 0.05,
        transparent: true,
        opacity: 0.35,
        clearcoat: 1,
        side: THREE.DoubleSide,
      }),
    []
  );

  const edge = "#5a5a5a";
  const edgeHot = ORANGE;

  return (
    <group>
      {/* Front frame: rims + bridge */}
      <Part explode={explode} dir={[0, 0, 0]} showLabels={showLabels} label="Frame" labelOffset={[-0.37, -0.32, 0]}>
        {[-0.37, 0.37].map((x) => (
          <mesh key={x} geometry={g.rim} material={frameMat} position={[x, 0, 0]}>
            <Edges threshold={20} color={edge} />
          </mesh>
        ))}
        <mesh geometry={g.bridge} material={frameMat} />
        {/* nose pads */}
        {[-0.1, 0.1].map((x) => (
          <mesh key={x} position={[x, -0.07, -0.05]} rotation={[0.4, 0, x > 0 ? -0.3 : 0.3]} material={greyMat}>
            <capsuleGeometry args={[0.018, 0.05, 4, 10]} />
          </mesh>
        ))}
      </Part>

      {/* Lenses */}
      <Part explode={explode} dir={[0, -0.05, 0.55]} showLabels={showLabels} label="Lens" labelOffset={[0.55, -0.18, 0]}>
        {[-0.37, 0.37].map((x) => (
          <mesh key={x} geometry={g.lens} material={lensMat} position={[x, 0, 0.004]} />
        ))}
      </Part>

      {/* Brow bar (sensor housing) */}
      <Part explode={explode} dir={[0, 0.32, 0]} showLabels={showLabels} label="Sensor housing" labelOffset={[-0.75, 0.12, 0]}>
        <mesh geometry={g.brow} material={darkMat} position={[0, 0.215, 0.005]}>
          <Edges threshold={20} color={edge} />
        </mesh>
      </Part>

      {/* LiDAR / ToF module */}
      <Part explode={explode} dir={[0, 0.62, 0.55]} showLabels={showLabels} label="LiDAR ToF" sub="4 m" labelOffset={[0, 0.12, 0]}>
        <group position={[0, 0.215, 0.06]}>
          <mesh material={greyMat}>
            <boxGeometry args={[0.16, 0.056, 0.03]} />
            <Edges color={edgeHot} />
          </mesh>
          <mesh material={emissive} position={[-0.035, 0, 0.016]}>
            <boxGeometry args={[0.04, 0.022, 0.004]} />
          </mesh>
          <mesh material={darkMat} position={[0.035, 0, 0.016]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 0.006, 20]} />
          </mesh>
        </group>
      </Part>

      {/* Ultrasonic transducers */}
      {[-1, 1].map((s) => (
        <Part
          key={s}
          explode={explode}
          dir={[s * 0.25, 0.45, 0.75]}
          showLabels={showLabels && s === 1}
          label="Ultrasonic ×2"
          sub="drop-off"
          labelOffset={[0.5, 0.32, 0]}
        >
          <group position={[s * 0.5, 0.215, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh material={greyMat}>
              <cylinderGeometry args={[0.042, 0.042, 0.035, 32]} />
              <Edges threshold={30} color={edgeHot} />
            </mesh>
            <mesh material={darkMat} position={[0, 0.019, 0]}>
              <cylinderGeometry args={[0.032, 0.032, 0.004, 32]} />
            </mesh>
            <mesh material={emissive} position={[0, 0.0215, 0]}>
              <torusGeometry args={[0.02, 0.0025, 8, 32]} />
            </mesh>
          </group>
        </Part>
      ))}

      {/* Camera */}
      <Part explode={explode} dir={[-0.15, 0.55, 0.65]} showLabels={showLabels} label="Camera" sub="RGB" labelOffset={[-0.22, 0.32, 0]}>
        <group position={[-0.22, 0.215, 0.055]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={greyMat}>
            <cylinderGeometry args={[0.022, 0.026, 0.03, 24]} />
          </mesh>
          <mesh material={lensMat} position={[0, 0.016, 0]}>
            <sphereGeometry args={[0.016, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
        </group>
      </Part>

      {/* Temples */}
      {[-1, 1].map((s) => (
        <Part key={`t${s}`} explode={explode} dir={[s * 0.45, 0, -0.1]} showLabels={showLabels && s === -1} label="Temple arm" labelOffset={[-0.72, 0.02, -1.45]}>
          <group position={[s * 0.705, 0.13, 0]}>
            <mesh material={frameMat} position={[0, 0, -0.06]}>
              <boxGeometry args={[0.07, 0.1, 0.1]} />
              <Edges threshold={20} color={edge} />
            </mesh>
            <mesh material={frameMat} position={[0, 0, -0.75]}>
              <boxGeometry args={[0.035, 0.055, 1.3]} />
              <Edges threshold={20} color={edge} />
            </mesh>
            <mesh material={frameMat} position={[0, -0.12, -1.48]} rotation={[-0.75, 0, 0]}>
              <boxGeometry args={[0.035, 0.05, 0.34]} />
              <Edges threshold={20} color={edge} />
            </mesh>
          </group>
        </Part>
      ))}

      {/* Electronics pods: left = battery, right = MCU + IMU */}
      <Part explode={explode} dir={[-0.85, -0.15, 0]} showLabels={showLabels} label="Battery" sub="16 h target" labelOffset={[-0.75, -0.06, -0.42]}>
        <mesh material={darkMat} position={[-0.705, 0.13, -0.42]}>
          <boxGeometry args={[0.075, 0.11, 0.42]} />
          <Edges threshold={20} color={edgeHot} />
        </mesh>
      </Part>
      <Part explode={explode} dir={[0.85, -0.15, 0]} showLabels={showLabels} label="MCU + IMU" labelOffset={[0.75, -0.06, -0.42]}>
        <group position={[0.705, 0.13, -0.42]}>
          <mesh material={darkMat}>
            <boxGeometry args={[0.075, 0.11, 0.42]} />
            <Edges threshold={20} color={edgeHot} />
          </mesh>
          <mesh material={emissive} position={[0.039, 0.025, 0.14]}>
            <boxGeometry args={[0.002, 0.012, 0.012]} />
          </mesh>
        </group>
      </Part>

      {/* Haptic motors */}
      {[-1, 1].map((s) => (
        <Part
          key={`h${s}`}
          explode={explode}
          dir={[s * 0.35, -0.42, -0.1]}
          showLabels={showLabels && s === 1}
          label="Haptic motors ×2"
          labelOffset={[0.68, -0.08, -0.95]}
        >
          <mesh material={greyMat} position={[s * 0.68, 0.11, -0.95]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.032, 0.032, 0.035, 24]} />
            <Edges threshold={30} color={edgeHot} />
          </mesh>
        </Part>
      ))}

      {/* Sensing beams (angled slightly down to catch drop-offs) */}
      <Beam position={[0, 0.215, 0.08]} rotation={[0.22, 0, 0]} intensity={beams} length={2.4} radius={0.5} />
      <Beam position={[-0.5, 0.215, 0.08]} rotation={[0.55, -0.12, 0]} intensity={beams} length={1.25} radius={0.22} speed={1.4} />
      <Beam position={[0.5, 0.215, 0.08]} rotation={[0.55, 0.12, 0]} intensity={beams} length={1.25} radius={0.22} speed={1.4} />
    </group>
  );
}
