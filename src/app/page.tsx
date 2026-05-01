"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/sections/Hero";
import StoryIntro from "@/components/sections/StoryIntro";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import HorizontalScroll from "@/components/sections/HorizontalScroll";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Stats from "@/components/sections/Stats";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <SmoothScroll>
          <ParticleBackground />
          <Navbar />
          <main className="flex flex-col relative z-10 w-full">
            <Hero />
            <StoryIntro />
            <About />
            <Services />
            <ProjectShowcase />
            <HorizontalScroll />
            <Process />
            <TechStack />
            <Stats />
            <CallToAction />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </>
  );
}
