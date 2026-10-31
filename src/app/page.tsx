"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import AevidineSection from "@/components/sections/AevidineSection";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Stats from "@/components/sections/Stats";
import CallToAction from "@/components/sections/CallToAction";

// Order = the story a visitor should leave with: who we are (hero) → what we do (marquee) → the
// proof we build real products (Aevidine, with its films) → how we work → services → client work
// → numbers → the ask.
export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative w-full">
        <Hero />
        <Marquee />
        <AevidineSection />
        <Process />
        <Services />
        <Work />
        <Stats />
        <CallToAction />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
