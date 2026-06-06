"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        backgroundColor: isScrolled ? "rgba(250, 250, 247, 0.85)" : "transparent",
        borderBottomColor: isScrolled ? "#E0DDD6" : "transparent",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
        isScrolled ? "py-4 shadow-sm" : "py-6 shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-semibold tracking-tight text-brand-charcoal">
            The Greeks
          </span>
          <span className="bg-brand-gold/10 text-brand-gold w-6 h-6 rounded flex items-center justify-center font-serif text-sm font-bold border border-brand-gold/20 transition-transform group-hover:scale-105">
            Δ
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium tracking-wide">
          <Link
            href="/#services"
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            href="/#work"
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors duration-200"
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href="/#book-a-call"
            className="px-5 py-2 border border-brand-gold text-brand-gold rounded-full hover:bg-brand-gold hover:text-brand-cream transition-all duration-300 font-sans text-xs uppercase tracking-widest font-semibold"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-brand-charcoal hover:text-brand-gold transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-border transition-all duration-300 origin-top overflow-hidden ${
          isOpen ? "max-h-[300px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 font-sans text-base font-semibold">
          <Link
            href="/#services"
            onClick={() => setIsOpen(false)}
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#work"
            onClick={() => setIsOpen(false)}
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
          >
            Work
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/#book-a-call"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2.5 border border-brand-gold text-brand-gold rounded-full hover:bg-brand-gold hover:text-brand-cream transition-colors text-xs uppercase tracking-widest"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </nav>
  );
}
