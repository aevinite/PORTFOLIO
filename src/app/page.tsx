"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/sections/Hero";
import StoryIntro from "@/components/sections/StoryIntro";
import About from "@/components/sections/About";
import Services from "@/components/sections/ServicesC";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import HorizontalScroll from "@/components/sections/HorizontalScroll";
import TechStack from "@/components/sections/TechStack";
import Stats from "@/components/sections/Stats";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
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
        <TechStack />
        <Stats />
        <CallToAction />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
