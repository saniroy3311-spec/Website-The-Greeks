"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  // States for Card 2 (Bot Dashboard)
  const [tradesToday, setTradesToday] = useState(3);
  const [lastTradePnL, setLastTradePnL] = useState("+2.3%");

  // States for Card 3 (Position Sizer)
  const [capital, setCapital] = useState(500000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopLossPoints, setStopLossPoints] = useState(50);

  useEffect(() => {
    // Simulate bot updates
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setTradesToday((prev) => prev + 1);
        const pnl = (Math.random() * 4 - 1.5).toFixed(1);
        setLastTradePnL((parseFloat(pnl) >= 0 ? "+" : "") + pnl + "%");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Position sizer calculation
  const riskAmount = (capital * riskPercent) / 100;
  const quantity = stopLossPoints > 0 ? Math.floor(riskAmount / stopLossPoints) : 0;
  const calculatedLots = (quantity / 75).toFixed(1);

  // Framer Motion card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section id="services" className="py-24 bg-brand-cream border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal font-bold tracking-tight mb-4">
            What I build for you
          </h2>
          <p className="font-sans text-lg text-brand-muted">
            Quantitative, clean, and reliable trading infrastructure designed to capture edges in Indian and global markets.
          </p>
        </div>

        {/* 2x2 Bento Grid - Explicitly grid-cols-1 collapsing on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Card 1: Custom Indicators */}
          <motion.div 
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-brand-parchment/40 border border-brand-border rounded-xl p-8 flex flex-col justify-between hover:border-brand-gold/50 hover:shadow-md transition-all duration-300 group"
          >
            <div>
              {/* Greek-themed Icon: Chart overlaying Delta Δ */}
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-lg flex items-center justify-center mb-6 border border-brand-gold/20">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {/* Delta symbol backdrop */}
                  <path d="M12,4 L20,18 L4,18 Z" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.4" />
                  {/* Candlestick / chart lines */}
                  <line x1="8" y1="10" x2="8" y2="15" stroke="currentColor" strokeWidth="2" />
                  <line x1="16" y1="7" x2="16" y2="13" stroke="currentColor" strokeWidth="2" />
                  <path d="M4,14 L12,9 L20,11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">
                Custom Indicators for TradingView
              </h3>
              <p className="font-sans text-sm text-brand-muted mb-6 leading-relaxed">
                You describe your idea — a regime filter, a multi-timeframe signal, a trailing stop engine — I write it in Pine Script v5. Delivered with alerts, documentation, and your logic built to spec.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {["Pine Script v5", "Multi-timeframe", "Alerts"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-cream border border-brand-border rounded text-[10px] font-mono uppercase tracking-wider text-brand-gold font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pine Script Preview Widget */}
            <div className="mt-4 bg-brand-cream border border-brand-border rounded-lg p-4 font-mono text-[11px] leading-relaxed text-brand-charcoal/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
              </div>
              <div className="text-[10px] text-brand-muted border-b border-brand-border pb-2 mb-2 uppercase tracking-wider font-semibold">
                shiva_sniper.pine (Pine v5)
              </div>
              <pre className="overflow-x-auto">
{`//@version=5
strategy("The Greeks — Shiva Sniper", overlay=true)
atr = ta.atr(14)
adx = ta.dmi(14, 14)
ema200 = ta.ema(close, 200)
// Regime filter: only trade above EMA200 in trend
inUptrend = close > ema200 and adx[0] > 25`}
              </pre>
            </div>
            
            <Link
              href="#book-a-call"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-gold uppercase mt-6 group-hover:text-brand-navy transition-colors duration-200"
            >
              See indicator samples
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Card 2: Autonomous Trading Bots */}
          <motion.div 
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-brand-parchment/40 border border-brand-border rounded-xl p-8 flex flex-col justify-between hover:border-brand-gold/50 hover:shadow-md transition-all duration-300 group"
          >
            <div>
              {/* Greek-themed Icon: Processor Chip + Gamma Γ */}
              <div className="w-12 h-12 bg-brand-navy/10 text-brand-navy rounded-lg flex items-center justify-center mb-6 border border-brand-navy/20">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {/* Gamma symbol backdrop */}
                  <path d="M8,6 L16,6 L16,18" stroke="#1B3A5C" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />
                  {/* Processor Nodes */}
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">
                Autonomous Trading Bots
              </h3>
              <p className="font-sans text-sm text-brand-muted mb-6 leading-relaxed">
                A Python bot connected to your broker — Delta Exchange, Zerodha, or Binance — that executes your strategy 24/7. Deployed on a cloud VPS, managed with PM2, with Telegram trade alerts.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {["Python", "Delta Exchange", "Zerodha", "Telegram Alerts"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-cream border border-brand-border rounded text-[10px] font-mono uppercase tracking-wider text-brand-gold font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Bot Dashboard Widget */}
            <div className="mt-4 bg-brand-navy text-brand-cream border border-brand-navy/80 rounded-lg p-5 font-mono text-xs shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-brand-cream/10 pb-3 mb-3">
                <span className="text-[10px] text-brand-cream/50 uppercase tracking-widest font-semibold">
                  Bot Status Dashboard
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-green/20 text-brand-green border border-brand-green/35 rounded-full text-[9px] font-bold">
                  {/* Fixed smooth pulsing dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                  LIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[9px] text-brand-cream/45 uppercase">Last Trade</div>
                  <div className="font-bold text-brand-cream/95 text-[11px] truncate">
                    BTC/USD · {lastTradePnL}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-brand-cream/45 uppercase">Uptime</div>
                  <div className="font-bold text-brand-cream/95 text-[11px]">99.8%</div>
                </div>
                <div>
                  <div className="text-[9px] text-brand-cream/45 uppercase">Trades Today</div>
                  <div className="font-bold text-brand-cream/95 text-[11px]">{tradesToday}</div>
                </div>
                <div>
                  <div className="text-[9px] text-brand-cream/45 uppercase">API Latency</div>
                  <div className="font-bold text-brand-cream/95 text-[11px]">18ms</div>
                </div>
              </div>
            </div>
            
            <Link
              href="#book-a-call"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-gold uppercase mt-6 group-hover:text-brand-navy transition-colors duration-200"
            >
              See bot architecture
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Card 3: Position Sizer */}
          <motion.div 
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-brand-parchment/40 border border-brand-border rounded-xl p-8 flex flex-col justify-between hover:border-brand-gold/50 hover:shadow-md transition-all duration-300 group"
          >
            <div>
              {/* Greek-themed Icon: Dial/Scales + Theta Θ */}
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-lg flex items-center justify-center mb-6 border border-brand-gold/20">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {/* Theta symbol backdrop */}
                  <circle cx="12" cy="12" r="6" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.4" />
                  <line x1="8" y1="12" x2="16" y2="12" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.4" />
                  {/* Balance / sizer dial */}
                  <path d="M12,4 L12,12" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5,16 C5,16 9,20 12,20 C15,20 19,16 19,16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">
                Custom Tools for Investors & Traders
              </h3>
              <p className="font-sans text-sm text-brand-muted mb-6 leading-relaxed">
                F&O position sizers, option chain scanners, portfolio trackers, risk dashboards — built for Indian markets. Web-based or exportable to Excel/Google Sheets.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {["Nifty", "BankNifty", "F&O", "Options Greeks"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-cream border border-brand-border rounded text-[10px] font-mono uppercase tracking-wider text-brand-gold font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Functional Position Sizer Widget - Fixed interactivity & colors */}
            <div className="mt-4 bg-brand-cream border border-brand-border rounded-lg p-5 font-sans text-xs text-brand-charcoal shadow-sm relative z-10">
              <div className="text-[10px] text-brand-muted font-mono uppercase tracking-wider border-b border-brand-border pb-2 mb-3 font-semibold">
                F&O Position Sizer (NIFTY 50)
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center relative z-10">
                  <label className="text-brand-muted">Capital (₹)</label>
                  <input
                    type="number"
                    value={capital}
                    onChange={(e) => setCapital(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-28 px-2 py-1 bg-brand-cream border border-brand-border rounded text-right font-mono text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold relative z-10"
                  />
                </div>
                
                <div className="space-y-1 relative z-10">
                  <div className="flex justify-between text-brand-muted">
                    <span>Risk (%)</span>
                    <span className="font-mono font-bold text-brand-charcoal">{riskPercent}% (₹{riskAmount.toLocaleString("en-IN")})</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
                    className="w-full accent-brand-gold cursor-pointer relative z-10"
                  />
                </div>

                <div className="flex justify-between items-center relative z-10">
                  <label className="text-brand-muted">Stop Loss (Points)</label>
                  <input
                    type="number"
                    value={stopLossPoints}
                    onChange={(e) => setStopLossPoints(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-2 py-1 bg-brand-cream border border-brand-border rounded text-right font-mono text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold relative z-10"
                  />
                </div>

                <div className="border-t border-brand-border pt-2.5 mt-2.5 flex justify-between items-center font-mono">
                  <span className="font-semibold text-brand-charcoal/70">Recommended:</span>
                  <div className="text-right">
                    <div className="font-bold text-brand-navy text-[13px]">{quantity} Qty</div>
                    <div className="text-[10px] text-brand-muted">~{calculatedLots} Lots (75 size)</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Link
              href="#book-a-call"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-gold uppercase mt-6 group-hover:text-brand-navy transition-colors duration-200"
            >
              See tool samples
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Card 4: Strategy Audit & Backtest */}
          <motion.div 
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-brand-parchment/40 border border-brand-border rounded-xl p-8 flex flex-col justify-between hover:border-brand-gold/50 hover:shadow-md transition-all duration-300 group"
          >
            <div>
              {/* Greek-themed Icon: Document/Magnifying Glass + Sigma σ */}
              <div className="w-12 h-12 bg-brand-navy/10 text-brand-navy rounded-lg flex items-center justify-center mb-6 border border-brand-navy/20">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {/* Sigma symbol backdrop */}
                  <path d="M7,6 L17,6 L12,12 L17,18 L7,18" stroke="#1B3A5C" strokeWidth="1.2" strokeOpacity="0.4" strokeLinejoin="round" />
                  {/* Search / audit outline */}
                  <circle cx="15" cy="11" r="4" />
                  <path d="M18,14 L21,17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M4,6 L4,18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">
                Strategy Audit & Backtest
              </h3>
              <p className="font-sans text-sm text-brand-muted mb-6 leading-relaxed">
                Send me your Pine Script or describe your strategy. I'll run a full backtest, analyze drawdown, win rate, expectancy, and deliver a structured PDF report.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {["Backtesting", "Win Rate", "Drawdown", "expectancy"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-cream border border-brand-border rounded text-[10px] font-mono uppercase tracking-wider text-brand-gold font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Backtest Stats & Animated SVG sparkline */}
            <div className="mt-4 bg-brand-cream border border-brand-border rounded-lg p-5 font-mono text-xs text-brand-charcoal shadow-sm">
              <div className="text-[10px] text-brand-muted uppercase tracking-wider border-b border-brand-border pb-2 mb-3 font-semibold">
                Strategy Backtest: Shiva Sniper
              </div>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Win Rate:</span>
                  <span className="font-bold text-brand-green">61.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Avg R:R:</span>
                  <span className="font-bold">1:2.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Max DD:</span>
                  <span className="font-bold text-red-500">-8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Trades:</span>
                  <span className="font-bold">214</span>
                </div>
              </div>
              
              {/* Animated Sparkline SVG using Framer Motion */}
              <div className="h-10 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 200 40">
                  <motion.path
                    d="M0,35 Q15,30 25,32 T50,25 T75,20 T100,24 T125,12 T150,15 T175,5 T200,2"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <path
                    d="M0,35 Q15,30 25,32 T50,25 T75,20 T100,24 T125,12 T150,15 T175,5 T200,2 L200,40 L0,40 Z"
                    fill="url(#grad)"
                    opacity="0.1"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C9A84C" />
                      <stop offset="100%" stopColor="#FAFAF7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            <Link
              href="#book-a-call"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-gold uppercase mt-6 group-hover:text-brand-navy transition-colors duration-200"
            >
              See a sample report
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>

        {/* 5th Card: Full Width Bespoke Work */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-brand-navy text-brand-cream border border-brand-navy rounded-xl p-8 md:p-10 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              {/* Greek-themed Icon: Crest with Greeks symbols */}
              <div className="w-12 h-12 bg-brand-cream/10 text-brand-gold rounded-lg flex items-center justify-center mb-6 border border-brand-cream/20">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {/* Delta & Theta shapes */}
                  <path d="M12,22 C17.5,22 22,17.5 22,12 C22,6.5 17.5,2 12,2 C6.5,2 2,6.5 2,12 C2,17.5 6.5,22 12,22 Z" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.3" />
                  <path d="M12,6 L17,14 L7,14 Z" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="13" r="2.5" />
                </svg>
              </div>
              <h3 className="font-serif text-3xl font-bold text-brand-cream mb-4">
                Bespoke Quantitative Systems
              </h3>
              <p className="font-sans text-sm md:text-base text-brand-cream/70 leading-relaxed">
                Need something highly specialized? I design custom data streaming layers, execute websocket broker API integrations, write multi-broker copy trading engines, and construct bespoke desktop dashboard utilities. Tell me your workflow, and I will engineer the code.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="#book-a-call"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-brand-cream rounded-full hover:bg-brand-gold/90 hover:translate-y-[-1px] transition-all duration-300 font-sans text-xs uppercase tracking-widest font-semibold"
              >
                Request Custom Build
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
