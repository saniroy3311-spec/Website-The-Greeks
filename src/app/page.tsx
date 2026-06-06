import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import LiveDemo from "@/components/LiveDemo";
import About from "@/components/About";
import WorkGallery from "@/components/WorkGallery";
import BookCall from "@/components/BookCall";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <Services />
        <LiveDemo />
        <About />
        <WorkGallery />
        <BookCall />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
