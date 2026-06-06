"use client";

import React from "react";
import { MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-brand-cream border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          
          {/* Left Column: Quote, Bio & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">
                About Sani Roy
              </span>
              <h2 className="font-serif text-3xl md:text-[40px] italic leading-tight text-brand-navy">
                "I don't sell signals. I build the engine that generates them."
              </h2>
            </div>

            {/* Sani Roy's Actual Biography from Brief */}
            <p className="font-sans text-base md:text-lg text-brand-muted leading-relaxed max-w-2xl">
              I've spent 4 years studying how markets move — not just reading charts, but building the systems that act on them. I trade Nifty, BankNifty, and BTC/USD perpetuals. I write Pine Script by hand and deploy live trading bots on real capital. The Greeks is where I turn that experience into tools, code, and strategies — for investors and traders who are serious about the edge.
            </p>

            {/* Stats Row - Styled to be highly visible */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-brand-border">
              <div className="space-y-1">
                <div className="font-serif text-3xl font-bold text-brand-charcoal">4 Years</div>
                <div className="font-sans text-[10px] uppercase tracking-wider text-brand-gold font-bold">
                  Trading Exp
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-serif text-3xl font-bold text-brand-charcoal">40+</div>
                <div className="font-sans text-[10px] uppercase tracking-wider text-brand-gold font-bold">
                  Scripts Written
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-serif text-3xl font-bold text-brand-charcoal">₹ Live</div>
                <div className="font-sans text-[10px] uppercase tracking-wider text-brand-gold font-bold">
                  Capital Deployed
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-serif text-3xl font-bold text-brand-charcoal">2</div>
                <div className="font-sans text-[10px] uppercase tracking-wider text-brand-gold font-bold">
                  Exchanges
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Delta Badge & Bio Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-brand-parchment/50 border border-brand-border rounded-xl p-8 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
              
              {/* Subtle background graphics */}
              <div className="absolute inset-0 bg-graph-pattern opacity-40 pointer-events-none"></div>

              {/* Minimalist Gold Delta Graphic box in place of photo */}
              <div className="w-48 h-48 bg-brand-cream border border-brand-gold/30 rounded-lg flex items-center justify-center shadow-inner mb-6 relative group transition-all duration-300 hover:border-brand-gold">
                <div className="absolute inset-2 border border-dashed border-brand-border rounded"></div>
                <span className="font-serif text-[120px] text-brand-gold leading-none select-none font-bold transition-transform duration-500 group-hover:scale-105">
                  Δ
                </span>
              </div>

              {/* Profile Details */}
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-1">
                Sani Roy
              </h3>
              <p className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-gold mb-3">
                Trader · Developer · Bot Builder
              </p>
              
              <div className="flex items-center gap-1.5 text-brand-muted text-xs font-medium mb-6">
                <MapPin size={14} className="text-brand-navy" />
                <span>Kolkata, West Bengal, India</span>
              </div>

              {/* Social links (X, Github, TradingView) */}
              <div className="flex gap-4">
                <a
                  href="https://tradingview.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-brand-cream hover:bg-brand-gold hover:text-brand-cream border border-brand-border text-brand-navy rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
                  title="TradingView Profile"
                >
                  <TrendingUp size={16} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-brand-cream hover:bg-brand-gold hover:text-brand-cream border border-brand-border text-brand-navy rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
                  title="GitHub Profile"
                >
                  <svg className="w-4.5 h-4.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-brand-cream hover:bg-brand-gold hover:text-brand-cream border border-brand-border text-brand-navy rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
                  title="Twitter/X Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
