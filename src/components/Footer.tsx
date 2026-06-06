"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-brand-border pt-20 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-brand-border">
          
          {/* Column 1: Branding */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <span className="font-serif text-2xl font-semibold tracking-tight text-brand-charcoal">
                The Greeks
              </span>
              <span className="bg-brand-gold/10 text-brand-gold w-6 h-6 rounded flex items-center justify-center font-serif text-sm font-bold border border-brand-gold/20">
                Δ
              </span>
            </Link>
            
            <p className="font-sans text-xs text-brand-muted max-w-sm leading-relaxed">
              Precision quantitative trading tools, custom TradingView indicators, and live execution bots. Built by a practitioner with skin in the game.
            </p>
            
            <div className="flex items-center gap-2 text-brand-muted text-xs">
              <MapPin size={14} className="text-brand-gold" />
              <span>West Bengal, India</span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="md:col-span-2.5 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-navy">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-brand-muted font-medium">
              <li>
                <Link href="/#services" className="hover:text-brand-gold transition-colors">
                  Custom Indicators
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand-gold transition-colors">
                  Autonomous Bots
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand-gold transition-colors">
                  Investor Tools
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand-gold transition-colors">
                  Strategy Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="md:col-span-2.5 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-navy">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-brand-muted font-medium">
              <li>
                <Link href="/blog" className="hover:text-brand-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-brand-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#work" className="hover:text-brand-gold transition-colors">
                  Work Samples
                </Link>
              </li>
              <li>
                <Link href="/#book-a-call" className="hover:text-brand-gold transition-colors">
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-navy">
              Get in Touch
            </h4>
            
            <a
              href="mailto:sani@thegreks.in"
              className="inline-flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-brand-gold transition-colors"
            >
              <Mail size={14} className="text-brand-gold" />
              <span>sani@thegreks.in</span>
            </a>
            
            <div className="flex gap-3 pt-2">
              <a
                href="https://tradingview.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-brand-parchment hover:bg-brand-gold hover:text-brand-cream border border-brand-border text-brand-navy rounded-full flex items-center justify-center transition-all duration-200"
                title="TradingView"
              >
                <TrendingUp size={14} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-brand-parchment hover:bg-brand-gold hover:text-brand-cream border border-brand-border text-brand-navy rounded-full flex items-center justify-center transition-all duration-200"
                title="GitHub"
              >
                <svg className="w-3.5 h-3.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-brand-parchment hover:bg-brand-gold hover:text-brand-cream border border-brand-border text-brand-navy rounded-full flex items-center justify-center transition-all duration-200"
                title="Twitter/X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] font-mono text-brand-muted uppercase tracking-wider">
          <div>© 2025–2026 The Greeks — Sani Roy. All rights reserved.</div>
          <div>Precision tools · Built by a trader</div>
        </div>

      </div>
    </footer>
  );
}
