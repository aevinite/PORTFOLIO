"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Logo3D() {
  const meshRef = useRef<THREE.Group>(null!);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 768 ? 0.6 : 1);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef} scale={scale}>
      {/* Central Core */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#000" metalness={0.9} roughness={0.1} />
        <meshBasicMaterial color="#00f0ff" wireframe />
      </mesh>
      
      {/* Outer Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Text content slides up and fades out as user scrolls away from hero
  const textOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.38], [0, -70]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Logo Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00f0ff" intensity={2} />
          <Logo3D />
        </Canvas>
      </motion.div>

      {/* Content — scrolls out upward as user leaves hero */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Eyebrow — the key line, sitting on top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex items-center gap-4 mb-6 md:mb-8"
        >
          <span className="hidden sm:block h-px w-10 bg-neon-blue/60 box-glow" />
          <span className="text-[11px] md:text-sm uppercase tracking-[0.35em] text-neon-cyan font-medium">
            The beginning with no end.
          </span>
          <span className="hidden sm:block h-px w-10 bg-neon-blue/60 box-glow" />
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] text-white text-glow"
        >
          AEVINITE
        </motion.h1>

        {/* Supporting subtitle — kept after the wordmark */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
          className="mt-6 text-sm md:text-base lg:text-lg text-white/55 font-light tracking-wide max-w-xl"
        >
          We build systems that move businesses forward.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          }
          className="interactive group relative mt-10 px-8 py-4 bg-transparent border border-neon-blue rounded-full overflow-hidden hover:box-glow transition-all duration-300"
        >
          <div className="absolute inset-0 w-full h-full bg-neon-blue/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10 text-white uppercase tracking-widest text-sm font-bold group-hover:text-glow">
            View Our Work
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-neon-blue rounded-full box-glow"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
