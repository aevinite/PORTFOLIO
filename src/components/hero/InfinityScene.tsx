"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

// The Aevinite mark as a real object: an infinity ribbon (the logo's shape) with light flowing
// around it like work moving through a business. Drag it and it spins with your hand's momentum;
// let go and it eases back to a slow idle turn.
//
// Cost: three.js is loaded only on the home page, after the text has painted (next/dynamic,
// ssr:false), and the canvas stops rendering whenever it is off-screen or the tab is hidden.

class Lemniscate extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = t * Math.PI * 2;
    const s = Math.sin(a);
    const d = 1 + s * s;
    // Bernoulli's lemniscate, lifted in z so the two loops pass over/under each other like the logo.
    return target.set((2.2 * Math.cos(a)) / d, (2.2 * Math.sin(a) * Math.cos(a)) / d, 0.45 * s);
  }
}

const FLOW = 220;

// Animation state lives outside React (it changes 60 times a second and must never re-render):
// the particles' places along the curve, their positions buffer, and the drag momentum.
// One hero per page, so one copy is enough.
function makeFlow() {
  let seed = 7; // seeded: every visit draws the same stream
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: FLOW }, () => ({ u: rnd(), r: 0.18 + rnd() * 0.22, a: rnd() * Math.PI * 2, v: 0.6 + rnd() * 0.8 }));
}
const OFFSETS = makeFlow();
const POSITIONS = new Float32Array(FLOW * 3);
const DRAG = { vel: 0, down: false, lastX: 0, lastT: 0 };
const TMP = new THREE.Vector3();

function Ribbon({ dark, reduced }: { dark: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const pts = useRef<THREE.Points>(null!);
  const spin = useRef(0);
  const curve = useMemo(() => new Lemniscate(), []);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 420, 0.16, 40, true), [curve]);
  // Fit the ribbon (4.4 units wide) to narrow screens instead of cropping its loops.
  const vw = useThree((st) => st.viewport.width);
  const fit = Math.min(1, (vw * 0.9) / 4.6);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    // Momentum: the drag sets a velocity, friction bleeds it off, idle turn underneath.
    if (!DRAG.down) DRAG.vel *= Math.pow(0.04, dt);
    spin.current += (reduced ? 0 : 0.12) * dt + DRAG.vel * dt;
    g.rotation.y = spin.current;
    // Lean toward the pointer (critically damped follow).
    const tx = reduced ? 0 : state.pointer.y * -0.25;
    const tz = reduced ? 0 : state.pointer.x * 0.12;
    g.rotation.x += (tx - g.rotation.x) * Math.min(1, dt * 3);
    g.rotation.z += (tz - g.rotation.z) * Math.min(1, dt * 3);

    const speed = reduced ? 0 : 0.05 + Math.min(Math.abs(DRAG.vel) * 0.02, 0.25);
    for (let i = 0; i < FLOW; i++) {
      const o = OFFSETS[i];
      o.u = (o.u + dt * speed * o.v) % 1;
      curve.getPointAt(o.u, TMP);
      const ang = o.a + o.u * 30;
      POSITIONS[i * 3] = TMP.x + Math.cos(ang) * o.r * 0.6;
      POSITIONS[i * 3 + 1] = TMP.y + Math.sin(ang) * o.r;
      POSITIONS[i * 3 + 2] = TMP.z + Math.sin(ang * 0.7) * o.r * 0.6;
    }
    pts.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={[0.25, 0, 0]} scale={fit}>
      <mesh geometry={tube}>
        {dark ? (
          <meshPhysicalMaterial
            color="#0a1838"
            metalness={0.9}
            roughness={0.12}
            clearcoat={1}
            emissive="#1c4fe0"
            emissiveIntensity={0.35}
            envMapIntensity={2.2}
          />
        ) : (
          <meshPhysicalMaterial color="#2c63f0" metalness={0.92} roughness={0.14} clearcoat={1} clearcoatRoughness={0.08} envMapIntensity={1.15} />
        )}
      </mesh>
      <points ref={pts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={dark ? 0.07 : 0.045}
          color={dark ? "#9cc4ff" : "#1d4ed8"}
          transparent
          opacity={dark ? 0.95 : 0.7}
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function InfinityScene() {
  const theme = useTheme();
  const dark = theme === "dark";
  const wrap = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(true);
  // Client-only component (loaded with ssr:false), so reading the setting at first render is safe.
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setLive(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
      onPointerDown={(e) => {
        DRAG.down = true;
        DRAG.lastX = e.clientX;
        DRAG.lastT = performance.now();
      }}
      onPointerMove={(e) => {
        const d = DRAG;
        if (!d.down) return;
        const now = performance.now();
        const dx = e.clientX - d.lastX;
        const dtm = Math.max(now - d.lastT, 8);
        // px/ms → radians/s, carried straight into the spin (velocity hand-off).
        d.vel = THREE.MathUtils.clamp((dx / dtm) * 6, -14, 14);
        d.lastX = e.clientX;
        d.lastT = now;
      }}
      onPointerUp={() => (DRAG.down = false)}
      onPointerLeave={() => (DRAG.down = false)}
      onPointerCancel={() => (DRAG.down = false)}
    >
      <Canvas
        frameloop={live ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8.6], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        aria-hidden="true"
      >
        <ambientLight intensity={dark ? 0.2 : 0.6} />
        <directionalLight position={[3, 4, 5]} intensity={dark ? 0.6 : 1.4} />
        <Ribbon dark={dark} reduced={reduced} />
        {/* Studio reflections built from shapes, not a downloaded photo: no outside request. */}
        <Environment resolution={256}>
          {/* Light mode: a bright studio, so the metal reads as chrome-blue like the logo, not black. */}
          <color attach="background" args={[dark ? "#02040a" : "#c9d6f2"]} />
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={dark ? 2 : 4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="ring" color={dark ? "#3b7bff" : "#9fc0ff"} intensity={dark ? 10 : 5} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={4} />
            <Lightformer form="rect" intensity={dark ? 2 : 4} position={[10, 0, 0]} scale={[10, 2, 1]} rotation-y={-Math.PI / 2} />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}
