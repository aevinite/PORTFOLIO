"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import ProductsIntro from "@/components/sections/ProductsIntro";
import ProductStory from "@/components/sections/ProductStory";
import { productById } from "@/data/products";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Stats from "@/components/sections/Stats";
import CallToAction from "@/components/sections/CallToAction";

// Order = the story a visitor should leave with: who we are (hero) → what we do (marquee) → our
// two products side by side, then each one's full story with its film (Aevidine, Campus
// Conveyance) → how we work → services → client work → numbers → the ask.
export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative w-full">
        <Hero />
        <Marquee />
        <ProductsIntro />
        <ProductStory p={productById("aevidine")} />
        <ProductStory p={productById("campus")} flip />
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
