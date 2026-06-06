"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkGallery() {
  return (
    <section id="work" className="py-24 bg-brand-cream border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">
            Portfolio
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal font-bold tracking-tight mt-2 mb-4">
            A sample of the work
          </h2>
          <p className="font-sans text-lg text-brand-muted">
            Every build is customized to a trader's specific edge. Here is a glance at the systems, pipelines, and tools I deliver.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Indicator Mockup (7 cols) */}
          <div className="md:col-span-7 bg-brand-parchment/40 border border-brand-border rounded-xl p-6 flex flex-col justify-between hover:border-brand-gold/50 transition-all duration-300">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-gold/10 text-brand-gold rounded text-[9px] font-mono uppercase font-bold tracking-wider mb-3">
                Indicator
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-1">
                Multi-regime ADX + EMA Indicator
              </h3>
              <p className="font-sans text-xs text-brand-muted">
                Pine Script v5 system showcasing dynamic bands, moving stops, and regime state indicators on TradingView.
              </p>
            </div>
            
            {/* SVG Candlestick Graphic */}
            <div className="bg-brand-cream border border-brand-border rounded-lg p-3 overflow-hidden shadow-sm">
              <svg className="w-full h-40" viewBox="0 0 400 160" fill="none">
                <line x1="0" y1="40" x2="400" y2="40" stroke="#F2F0EB" strokeWidth="1" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="#F2F0EB" strokeWidth="1" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="#F2F0EB" strokeWidth="1" />
                
                <path d="M0,70 Q50,60 100,80 T200,90 T300,50 T400,60 L400,90 T300,80 T200,120 T100,100 T0,90 Z" fill="#C9A84C" fillOpacity="0.06" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2,2" />
                
                {[
                  { x: 30, o: 70, c: 60, h: 55, l: 80, up: true },
                  { x: 70, o: 60, c: 85, h: 50, l: 90, up: false },
                  { x: 110, o: 85, c: 75, h: 70, l: 95, up: true },
                  { x: 150, o: 75, c: 90, h: 70, l: 100, up: false },
                  { x: 190, o: 90, c: 105, h: 80, l: 115, up: false },
                  { x: 230, o: 105, c: 80, h: 75, l: 110, up: true },
                  { x: 270, o: 80, c: 50, h: 45, l: 90, up: true },
                  { x: 310, o: 50, c: 62, h: 40, l: 70, up: false },
                  { x: 350, o: 62, c: 45, h: 40, l: 65, up: true },
                ].map((c, i) => (
                  <g key={i}>
                    <line x1={c.x + 8} y1={c.h} x2={c.x + 8} y2={c.l} stroke={c.up ? "#2D7D4F" : "#ef4444"} strokeWidth="1.2" />
                    <rect x={c.x} y={Math.min(c.o, c.c)} width="16" height={Math.max(1, Math.abs(c.o - c.c))} fill={c.up ? "#2D7D4F" : "#ef4444"} />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Card 2: Bot Flowchart (5 cols) */}
          <div className="md:col-span-5 bg-brand-parchment/40 border border-brand-border rounded-xl p-6 flex flex-col justify-between hover:border-brand-gold/50 transition-all duration-300">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-navy/10 text-brand-navy rounded text-[9px] font-mono uppercase font-bold tracking-wider mb-3">
                Pipeline
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-1">
                Bot Architecture Diagram
              </h3>
              <p className="font-sans text-xs text-brand-muted">
                Execution pipeline connecting TradingView webhook signals to active API orders.
              </p>
            </div>

            {/* SVG Flowchart */}
            <div className="bg-brand-cream border border-brand-border rounded-lg p-4 flex items-center justify-center shadow-sm">
              <svg className="w-full h-40" viewBox="0 0 280 160" fill="none">
                <rect x="10" y="10" width="70" height="30" rx="4" fill="#FAFAF7" stroke="#C9A84C" strokeWidth="1.2" />
                <text x="45" y="28" fill="#1A1A1A" fontSize="8" fontFamily="var(--font-sans)" fontWeight="bold" textAnchor="middle">TradingView</text>
                
                <rect x="10" y="110" width="70" height="30" rx="4" fill="#FAFAF7" stroke="#1B3A5C" strokeWidth="1.2" />
                <text x="45" y="128" fill="#1A1A1A" fontSize="8" fontFamily="var(--font-sans)" fontWeight="bold" textAnchor="middle">Webhook API</text>

                <rect x="105" y="60" width="70" height="30" rx="4" fill="#1B3A5C" stroke="#1B3A5C" strokeWidth="1" />
                <text x="140" y="78" fill="#FAFAF7" fontSize="8" fontFamily="var(--font-sans)" fontWeight="bold" textAnchor="middle">Python Bot</text>

                <rect x="200" y="10" width="70" height="30" rx="4" fill="#FAFAF7" stroke="#E0DDD6" strokeWidth="1.2" />
                <text x="235" y="28" fill="#1A1A1A" fontSize="8" fontFamily="var(--font-sans)" fontWeight="bold" textAnchor="middle">Delta API</text>

                <rect x="200" y="110" width="70" height="30" rx="4" fill="#FAFAF7" stroke="#E0DDD6" strokeWidth="1.2" />
                <text x="235" y="128" fill="#1A1A1A" fontSize="8" fontFamily="var(--font-sans)" fontWeight="bold" textAnchor="middle">Telegram Alert</text>

                <path d="M45,40 L45,110" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M80,125 L105,75" stroke="#1B3A5C" strokeWidth="1" />
                <path d="M80,25 L105,75" stroke="#1B3A5C" strokeWidth="1" />
                <path d="M175,75 L200,25" stroke="#1B3A5C" strokeWidth="1" />
                <path d="M175,75 L200,125" stroke="#1B3A5C" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Card 3: Backtest Curve (4 cols) - Framer Motion Line Draw */}
          <div className="md:col-span-4 bg-brand-parchment/40 border border-brand-border rounded-xl p-6 flex flex-col justify-between hover:border-brand-gold/50 transition-all duration-300">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-gold/10 text-brand-gold rounded text-[9px] font-mono uppercase font-bold tracking-wider mb-3">
                Metrics
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-1">
                Backtest Equity Curve
              </h3>
              <p className="font-sans text-xs text-brand-muted">
                1-Year performance simulation on Nifty futures options.
              </p>
            </div>

            {/* Dynamic Equity Curve SVG */}
            <div className="bg-brand-cream border border-brand-border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center text-[10px] font-mono text-brand-muted mb-2">
                <span>PnL: +64.2%</span>
                <span className="text-brand-green font-bold">Sharpe: 2.14</span>
              </div>
              <svg className="w-full h-24" viewBox="0 0 160 80">
                <motion.path
                  d="M0,75 L20,70 L40,73 L60,62 L80,55 L100,58 L120,40 L140,22 L160,10"
                  fill="none"
                  stroke="#2D7D4F"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <path
                  d="M0,75 L20,70 L40,73 L60,62 L80,55 L100,58 L120,40 L140,22 L160,10 L160,80 L0,80 Z"
                  fill="#2D7D4F"
                  fillOpacity="0.05"
                />
              </svg>
            </div>
          </div>

          {/* Card 4: PM2 Bot Terminal Output (4 cols) */}
          <div className="md:col-span-4 bg-zinc-950 text-zinc-300 border border-zinc-900 rounded-xl p-6 flex flex-col justify-between hover:border-brand-gold/50 transition-all duration-300">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 text-zinc-400 rounded text-[9px] font-mono uppercase font-bold tracking-wider">
                  VPS Log
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-100 mb-1">
                PM2 Execution Logs
              </h3>
              <p className="font-sans text-xs text-zinc-500">
                Active logs displaying order verification, trade placement, and api replies.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-850 rounded-lg p-3 font-mono text-[9px] text-zinc-400 space-y-1.5">
              <div>[14:12:02] verify websocket connection... OK</div>
              <div className="text-amber-400">[14:12:05] signal long nifty limit 23400</div>
              <div className="text-brand-green">[14:12:06] filled order id 981273 - qty 150</div>
              <div className="text-zinc-500">[14:12:08] update trailing stop to 23350</div>
            </div>
          </div>

          {/* Card 5: Lot Sizer tool screenshot mockup (4 cols) */}
          <div className="md:col-span-4 bg-brand-parchment/40 border border-brand-border rounded-xl p-6 flex flex-col justify-between hover:border-brand-gold/50 transition-all duration-300">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-navy/10 text-brand-navy rounded text-[9px] font-mono uppercase font-bold tracking-wider mb-3">
                Trading tool
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-1">
                F&O Position Sizer
              </h3>
              <p className="font-sans text-xs text-brand-muted">
                Exportable risk management dashboard built to calculate optimal lot size for options.
              </p>
            </div>

            <div className="bg-brand-cream border border-brand-border rounded-lg p-4 font-mono text-[10px] text-brand-charcoal shadow-sm space-y-2">
              <div className="flex justify-between border-b border-brand-border pb-1 text-brand-muted uppercase text-[8px] font-bold">
                <span>Metric</span>
                <span>Value</span>
              </div>
              <div className="flex justify-between">
                <span>Account Equity:</span>
                <span>₹10,00,000</span>
              </div>
              <div className="flex justify-between text-brand-gold font-bold">
                <span>Allowed Risk (2%):</span>
                <span>₹20,000</span>
              </div>
              <div className="flex justify-between">
                <span>Stop Loss points:</span>
                <span>40 pts</span>
              </div>
              <div className="flex justify-between border-t border-brand-border pt-1.5 text-brand-navy font-bold">
                <span>Lot Qty Recommendation:</span>
                <span>500 (10 Lots Nifty)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
