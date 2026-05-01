"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parent is interactive
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants: import("framer-motion").Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "2px solid rgba(51, 187, 255, 0.5)",
      boxShadow: "0 0 10px rgba(51, 187, 255, 0.5)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(51, 187, 255, 0.1)",
      border: "2px solid rgba(51, 187, 255, 0.8)",
      boxShadow: "0 0 20px rgba(51, 187, 255, 0.8)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 bg-neon-blue rounded-full pointer-events-none z-[9999]"
        style={{ width: 8, height: 8 }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
}
