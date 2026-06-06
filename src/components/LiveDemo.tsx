"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Shield, Play, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogLine {
  time: string;
  text: string;
  type: "info" | "success" | "action" | "warn";
}

interface TimelineItem {
  log: LogLine;
  delay: number;
  candlesToDraw: number;
  drawBuy: boolean;
  slStage: number; // 0: none, 1: initial, 2: trail 1, 3: trail 2, 4: exit
}

const logsTimeline: TimelineItem[] = [
  {
    log: { time: "10:32:10", text: "Initializing Shiva Sniper v10 engine...", type: "info" },
    delay: 1000,
    candlesToDraw: 6,
    drawBuy: false,
    slStage: 0
  },
  {
    log: { time: "10:32:12", text: "Connecting to Delta Exchange API... Connected.", type: "success" },
    delay: 1000,
    candlesToDraw: 6,
    drawBuy: false,
    slStage: 0
  },
  {
    log: { time: "10:32:13", text: "Scanning market regimes. Nifty: Neutral. BTC: Bullish Trend.", type: "info" },
    delay: 1200,
    candlesToDraw: 6,
    drawBuy: false,
    slStage: 0
  },
  {
    log: { time: "10:32:14", text: "✓ Signal detected: ADX=28.4 > 25", type: "success" },
    delay: 1500,
    candlesToDraw: 7,
    drawBuy: false,
    slStage: 0
  },
  {
    log: { time: "10:32:14", text: "✓ EMA filter: Price (103,420) above EMA200 (102,800)", type: "success" },
    delay: 1500,
    candlesToDraw: 7,
    drawBuy: true,
    slStage: 0
  },
  {
    log: { time: "10:32:15", text: "→ Placing LONG order @ 103,420", type: "action" },
    delay: 1500,
    candlesToDraw: 8,
    drawBuy: true,
    slStage: 0
  },
  {
    log: { time: "10:32:16", text: "✓ Order filled. SL set @ 102,980", type: "success" },
    delay: 1800,
    candlesToDraw: 8,
    drawBuy: true,
    slStage: 1
  },
  {
    log: { time: "10:32:18", text: "↑ Trailing stop updated → 103,100", type: "info" },
    delay: 1800,
    candlesToDraw: 9,
    drawBuy: true,
    slStage: 2
  },
  {
    log: { time: "10:32:45", text: "↑ Trailing stop updated → 103,380", type: "info" },
    delay: 2000,
    candlesToDraw: 10,
    drawBuy: true,
    slStage: 3
  },
  {
    log: { time: "10:33:12", text: "✓ Exit triggered @ 104,260. PnL: +₹4,200 (+2.3%)", type: "success" },
    delay: 5000,
    candlesToDraw: 11,
    drawBuy: true,
    slStage: 4
  }
];

export default function LiveDemo() {
  const [activeTab, setActiveTab] = useState<"bot" | "indicator">("bot");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [simStep, setSimStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs container directly (does not affect page viewport scroll)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs]);

  // Canvas drawing logic for the bot chart simulation
  useEffect(() => {
    if (activeTab !== "bot" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const candles = [
      { open: 140, high: 120, low: 160, close: 130 },
      { open: 130, high: 110, low: 140, close: 125 },
      { open: 125, high: 105, low: 135, close: 115 },
      { open: 115, high: 110, low: 140, close: 135 },
      { open: 135, high: 125, low: 155, close: 145 },
      { open: 145, high: 130, low: 160, close: 138 }, // Base candles end here
      { open: 138, high: 118, low: 145, close: 122 }, // Signal candle
      { open: 122, high: 100, low: 130, close: 108 }, // Buy entry
      { open: 108, high: 90, low: 115, close: 95 },   // Trend up
      { open: 95, high: 75, low: 100, close: 82 },    // Trend up 2
      { open: 82, high: 65, low: 90, close: 72 },     // Exit candle
      { open: 72, high: 70, low: 98, close: 90 },     // Pullback
    ];

    const currentItem = logsTimeline[Math.min(simStep, logsTimeline.length - 1)];
    const drawBuy = currentItem ? currentItem.drawBuy : false;
    const candlesToDraw = currentItem ? currentItem.candlesToDraw : 6;
    const slStage = currentItem ? currentItem.slStage : 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint background grid
      ctx.strokeStyle = "rgba(224, 221, 214, 0.4)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw EMA 200 (thick navy)
      ctx.strokeStyle = "#1B3A5C";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 180);
      ctx.quadraticCurveTo(150, 175, 450, 140);
      ctx.stroke();
      ctx.fillStyle = "#1B3A5C";
      ctx.font = "9px var(--font-mono)";
      ctx.fillText("EMA 200", 20, 175);

      // Draw EMA 50 (thinner gold)
      ctx.strokeStyle = "#C9A84C";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(10, 150);
      ctx.quadraticCurveTo(150, 130, 450, 105);
      ctx.stroke();
      ctx.fillStyle = "#C9A84C";
      ctx.fillText("EMA 50", 20, 138);

      // Draw candles based on timeline step
      const candleWidth = 24;
      const gap = 16;
      const startX = 40;

      for (let i = 0; i < candlesToDraw; i++) {
        const c = candles[i];
        const x = startX + i * (candleWidth + gap);
        const isUp = c.close < c.open;

        ctx.strokeStyle = isUp ? "#2D7D4F" : "#ef4444";
        ctx.fillStyle = isUp ? "#2D7D4F" : "#ef4444";
        ctx.lineWidth = 1.5;

        // Wick
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, c.high);
        ctx.lineTo(x + candleWidth / 2, c.low);
        ctx.stroke();

        // Body
        ctx.fillRect(
          x,
          Math.min(c.open, c.close),
          candleWidth,
          Math.max(1, Math.abs(c.open - c.close))
        );
      }

      // Draw BUY Entry Marker
      if (drawBuy) {
        const targetCandleIndex = 7;
        const x = startX + targetCandleIndex * (candleWidth + gap) + candleWidth / 2;
        const y = candles[targetCandleIndex].low + 15;

        ctx.fillStyle = "#2D7D4F";
        ctx.beginPath();
        ctx.moveTo(x, y - 8);
        ctx.lineTo(x - 6, y + 4);
        ctx.lineTo(x + 6, y + 4);
        ctx.closePath();
        ctx.fill();

        ctx.font = "bold 8px var(--font-sans)";
        ctx.textAlign = "center";
        ctx.fillText("BUY ENTRY", x, y + 13);
      }

      // Draw Trailing Stop Line based on SL stage
      if (slStage >= 1) {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();

        let stopY = candles[7].close + 25; // initial stop
        let endX = startX + 7 * (candleWidth + gap) + candleWidth / 2;
        ctx.moveTo(endX, stopY);

        if (slStage >= 2) {
          const x1 = startX + 8 * (candleWidth + gap) + candleWidth / 2;
          stopY = candles[8].close + 20;
          ctx.lineTo(x1, stopY);
          endX = x1;
        }
        if (slStage >= 3) {
          const x2 = startX + 9 * (candleWidth + gap) + candleWidth / 2;
          stopY = candles[9].close + 15;
          ctx.lineTo(x2, stopY);
          endX = x2;
        }
        if (slStage >= 4) {
          const x3 = startX + 10 * (candleWidth + gap) + candleWidth / 2;
          stopY = candles[10].close + 10;
          ctx.lineTo(x3, stopY);
          endX = x3;

          // Draw SELL EXIT Marker
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.moveTo(x3, candles[10].close - 10);
          ctx.lineTo(x3 - 6, candles[10].close - 22);
          ctx.lineTo(x3 + 6, candles[10].close - 22);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = "#ef4444";
          ctx.font = "bold 8px var(--font-sans)";
          ctx.textAlign = "center";
          ctx.fillText("SELL EXIT", x3, candles[10].close - 26);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Label SL line
        ctx.fillStyle = "#ef4444";
        ctx.font = "8px var(--font-mono)";
        ctx.textAlign = "left";
        ctx.fillText("Trailing SL", endX + 8, stopY + 3);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [activeTab, simStep]);

  // Timeline Step Loop
  useEffect(() => {
    if (activeTab !== "bot") return;

    let timer: NodeJS.Timeout;

    const runStep = () => {
      if (simStep < logsTimeline.length) {
        const item = logsTimeline[simStep];
        setLogs((prev) => [...prev, item.log]);
        
        timer = setTimeout(() => {
          setSimStep((prev) => prev + 1);
        }, item.delay);
      } else {
        // Pause at the end, then clear and restart
        timer = setTimeout(() => {
          setLogs([]);
          setSimStep(0);
        }, 5000);
      }
    };

    runStep();

    return () => clearTimeout(timer);
  }, [activeTab, simStep]);

  return (
    <section id="demo" className="py-24 bg-brand-cream/60 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal font-bold tracking-tight mb-4">
            Real systems. Actually working.
          </h2>
          <p className="font-sans text-lg text-brand-muted">
            Not static wireframes or stock code templates. Watch the live-simulated logic and execution in real time.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-brand-parchment border border-brand-border rounded-full shadow-inner">
            <button
              onClick={() => {
                setActiveTab("bot");
                setLogs([]);
                setSimStep(0);
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "bot"
                  ? "bg-brand-cream text-brand-navy border border-brand-border shadow-sm font-bold"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              <Play size={14} className={activeTab === "bot" ? "text-brand-gold animate-pulse" : ""} />
              Trading Bot in Action
            </button>
            <button
              onClick={() => setActiveTab("indicator")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "indicator"
                  ? "bg-brand-cream text-brand-navy border border-brand-border shadow-sm font-bold"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              <Shield size={14} />
              Indicator on TradingView
            </button>
          </div>
        </div>

        {/* Tab Content 1: Trading Bot Simulator */}
        {activeTab === "bot" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Candlestick Canvas Chart */}
            <div className="lg:col-span-7 bg-brand-cream border border-brand-border rounded-xl shadow-lg p-6 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex justify-between items-center border-b border-brand-border pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-brand-cream bg-brand-navy px-2 py-0.5 rounded uppercase">
                      BTC/USD Perp
                    </span>
                    <span className="font-mono text-[10px] text-brand-muted">
                      30M · Strategy Simulator
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-brand-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
                    <span>Bot feeding data</span>
                  </div>
                </div>

                <div className="relative w-full flex items-center justify-center overflow-x-auto">
                  <canvas
                    ref={canvasRef}
                    width={520}
                    height={260}
                    className="max-w-full"
                    style={{ minWidth: "520px" }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-brand-border pt-4 mt-6 font-mono text-[10px] text-brand-muted">
                <div>Strategy: Shiva Sniper v10</div>
                <div className="flex gap-4">
                  <span>ATR (14): 480</span>
                  <span className="font-bold text-brand-green">State: Active</span>
                </div>
              </div>
            </div>

            {/* Right: VPS PM2 Bot Logs with Framer Motion item stream */}
            <div className="lg:col-span-5 bg-zinc-950 text-zinc-200 border border-zinc-900 rounded-xl shadow-lg p-6 flex flex-col font-mono text-xs">
              
              {/* Terminal Title Bar */}
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Terminal size={14} className="text-brand-gold" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    root@thegreeks-vps: ~pm2 logs 0
                  </span>
                </div>
                <button
                  onClick={() => {
                    setLogs([]);
                    setSimStep(0);
                  }}
                  className="p-1 hover:text-brand-gold text-zinc-500 transition-colors"
                  title="Reset Simulation"
                >
                  <RotateCcw size={12} />
                </button>
              </div>

              {/* Logs Content - Animating items one by one */}
              <div 
                ref={terminalContainerRef} 
                className="flex-1 space-y-3 overflow-y-auto max-h-[280px] min-h-[220px] pr-2 scrollbar-zinc"
              >
                <AnimatePresence mode="popLayout">
                  {logs.map((log, index) => {
                    let colorClass = "text-zinc-400";
                    if (log.type === "success") colorClass = "text-brand-green font-semibold";
                    if (log.type === "action") colorClass = "text-amber-400 font-semibold";
                    if (log.type === "warn") colorClass = "text-red-400";

                    return (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -10, y: 5 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-2.5 items-start leading-relaxed"
                      >
                        <span className="text-zinc-600 flex-shrink-0">[{log.time}]</span>
                        <span className={colorClass}>{log.text}</span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Terminal Bottom Info */}
              <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-between items-center text-[9px] text-zinc-500">
                <span>VPS: Debian 12 (2vCPU / 4GB)</span>
                <span>Active process: pm2 (node)</span>
              </div>
            </div>

          </div>
        )}

        {/* Tab Content 2: TradingView Screenshot Mockup */}
        {activeTab === "indicator" && (
          <div className="bg-brand-cream border border-brand-border rounded-xl shadow-xl overflow-hidden p-6">
            <div className="relative w-full max-w-5xl mx-auto border border-brand-border rounded-lg overflow-hidden bg-[#FAFAF8] shadow-md flex flex-col">
              
              {/* TradingView Chrome Header Mockup */}
              <div className="bg-brand-parchment/60 border-b border-brand-border py-2 px-4 flex justify-between items-center text-[10px] font-mono text-brand-charcoal/80">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-brand-navy">BTCUSDT.P</span>
                  <span className="bg-brand-gold/15 text-brand-gold px-1.5 py-0.5 rounded font-semibold text-[9px]">30m</span>
                  <span className="text-brand-muted">Binance · Delta Exchange India Connected</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-brand-muted">
                  <span>EMA (200, 50)</span>
                  <span>Shiva Sniper (V10)</span>
                  <span>ADX Trend Regime</span>
                </div>
              </div>

              {/* Vector SVG TradingView Chart Mockup */}
              <div className="relative p-2 select-none overflow-x-auto">
                <svg className="w-full min-w-[800px] h-[340px]" viewBox="0 0 900 340" fill="none">
                  {/* Grid Lines */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`v-${i}`} x1={100 * i} y1={0} x2={100 * i} y2={340} stroke="#EBE9E2" strokeWidth="0.8" />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={`h-${i}`} x1={0} y1={60 * i} x2={900} y2={60 * i} stroke="#EBE9E2" strokeWidth="0.8" />
                  ))}

                  {/* EMA 200 */}
                  <path d="M0,240 C150,225 300,200 450,170 C600,140 750,150 900,130" fill="none" stroke="#1B3A5C" strokeWidth="2.5" />
                  {/* EMA 50 */}
                  <path d="M0,210 C150,180 300,165 450,120 C600,80 750,105 900,85" fill="none" stroke="#C9A84C" strokeWidth="1.8" />

                  {/* Draw mock candlesticks */}
                  {[
                    { x: 50, o: 210, h: 180, l: 230, c: 190, up: true },
                    { x: 100, o: 190, h: 160, l: 200, c: 175, up: true },
                    { x: 150, o: 175, h: 170, l: 195, c: 185, up: false },
                    { x: 200, o: 185, h: 150, l: 190, c: 160, up: true },
                    { x: 250, o: 160, h: 140, l: 170, c: 150, up: true },
                    { x: 300, o: 150, h: 155, l: 185, c: 170, up: false },
                    { x: 350, o: 170, h: 140, l: 175, c: 145, up: true },
                    { x: 400, o: 145, h: 110, l: 155, c: 120, up: true },
                    { x: 450, o: 120, h: 100, l: 130, c: 105, up: true },
                    { x: 500, o: 105, h: 95, l: 125, c: 118, up: false },
                    { x: 550, o: 118, h: 80, l: 125, c: 90, up: true },
                    { x: 600, o: 90, h: 70, l: 100, c: 75, up: true },
                    { x: 650, o: 75, h: 70, l: 95, c: 85, up: false },
                    { x: 700, o: 85, h: 60, l: 90, c: 65, up: true },
                    { x: 750, o: 65, h: 65, l: 100, c: 92, up: false },
                    { x: 800, o: 92, h: 80, l: 110, c: 85, up: true },
                    { x: 850, o: 85, h: 70, l: 95, c: 75, up: true },
                  ].map((c, index) => (
                    <g key={index}>
                      <line x1={c.x + 10} y1={c.h} x2={c.x + 10} y2={c.l} stroke={c.up ? "#2D7D4F" : "#ef4444"} strokeWidth="1.5" />
                      <rect x={c.x} y={Math.min(c.o, c.c)} width="20" height={Math.max(1, Math.abs(c.o - c.c))} fill={c.up ? "#2D7D4F" : "#ef4444"} />
                    </g>
                  ))}

                  {/* Indicator Oscillator Panel Below */}
                  <rect x="0" y="270" width="900" height="70" fill="#FAFAF8" stroke="#EBE9E2" strokeWidth="1" />
                  <text x="10" y="285" fill="#6B6B6B" fontSize="8" fontFamily="var(--font-mono)">ADX Regime (14): 28.4 (Bullish Strength)</text>
                  <path d="M0,320 C100,310 200,330 300,315 C400,285 500,290 600,310 C700,325 800,300 900,290" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
                  <line x1="0" y1="300" x2="900" y2="300" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3,3" />

                  {/* Custom Indicator Marks */}
                  <circle cx="410" cy="170" r="4" fill="#2D7D4F" />
                  <text x="410" y="182" fill="#2D7D4F" fontSize="7" fontWeight="bold" textAnchor="middle">BUY</text>
                  
                  <circle cx="710" cy="50" r="4" fill="#ef4444" />
                  <text x="710" y="42" fill="#ef4444" fontSize="7" fontWeight="bold" textAnchor="middle">SELL</text>
                </svg>

                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-3.5 py-1.5 rounded-full font-sans text-[10px] uppercase font-bold tracking-wider shadow-sm">
                  Currently live on Delta Exchange India
                </div>
              </div>
              
              {/* Caption */}
              <div className="bg-brand-parchment/30 border-t border-brand-border py-4 px-6 text-center font-sans text-xs text-brand-muted">
                Shiva Sniper Indicator — Pine Script v5 · 30-min BTC · ADX + EMA regime filter + 5-stage trailing stop
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
