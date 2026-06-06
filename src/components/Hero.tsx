"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [tickerPrice, setTickerPrice] = useState("103,420.50");
  const [tickerColor, setTickerColor] = useState("text-brand-green");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    let chart: any;
    let interval: NodeJS.Timeout;
    let resizeObserver: ResizeObserver;
    const container = chartContainerRef.current;

    const initChart = async () => {
      // If container has no width yet, wait and try again
      if (container.clientWidth === 0) {
        setTimeout(initChart, 100);
        return;
      }

      const { createChart, ColorType, CandlestickSeries, LineSeries, LineStyle, createSeriesMarkers } = await import("lightweight-charts");

      chart = createChart(container, {
        layout: {
          background: { type: ColorType.Solid, color: "#FAFAF7" },
          textColor: "#6B6B6B",
          fontFamily: "var(--font-mono)",
        },
        grid: {
          vertLines: { color: "rgba(27, 58, 92, 0.05)" },
          horzLines: { color: "rgba(27, 58, 92, 0.05)" },
        },
        width: container.clientWidth,
        height: 380,
        rightPriceScale: {
          borderVisible: false,
          scaleMargins: {
            top: 0.15,
            bottom: 0.15,
          },
        },
        timeScale: {
          borderVisible: false,
          timeVisible: true,
          secondsVisible: false,
        },
        handleScale: false,
        handleScroll: false,
      });

      // Candlestick Series using lightweight-charts v5 unified API
      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: "#2D7D4F",
        downColor: "#ef4444",
        borderDownColor: "#ef4444",
        borderUpColor: "#2D7D4F",
        wickDownColor: "#ef4444",
        wickUpColor: "#2D7D4F",
      });

      // EMA Lines using lightweight-charts v5 unified API
      const ema50Series = chart.addSeries(LineSeries, {
        color: "#C9A84C",
        lineWidth: 1.5,
        title: "EMA 50",
      });

      const ema200Series = chart.addSeries(LineSeries, {
        color: "#1B3A5C",
        lineWidth: 2,
        title: "EMA 200",
      });

      // Trailing Stop Line using lightweight-charts v5 unified API
      const trailingStopSeries = chart.addSeries(LineSeries, {
        color: "#ef4444",
        lineWidth: 1.2,
        lineStyle: LineStyle.Dashed,
        title: "Trailing Stop",
      });

      // Seed data generating logic
      const baseTime = Math.floor(Date.now() / 1000) - 3600 * 24 * 15; // 15 days ago
      const data = [];
      const ema50Data = [];
      const ema200Data = [];
      const trailingStopData = [];

      let currentClose = 101000;
      let ema50 = 100800;
      let ema200 = 100200;
      let stopLoss = 99800;

      for (let i = 0; i < 50; i++) {
        const time = (baseTime + i * 3600 * 4) as any; // 4 hour candles
        const open = currentClose + (Math.random() - 0.5) * 800;
        const high = open + Math.random() * 600;
        const low = open - Math.random() * 600;
        const close = (high + low + open) / 3 + (Math.random() - 0.5) * 300;
        currentClose = close;

        data.push({ time, open, high, low, close });

        // Calculate simple EMA values
        ema50 = ema50 * 0.94 + close * 0.06;
        ema200 = ema200 * 0.98 + close * 0.02;
        ema50Data.push({ time, value: ema50 });
        ema200Data.push({ time, value: ema200 });

        // Calculate stop loss
        if (close > ema200 && open > ema50) {
          stopLoss = Math.max(stopLoss, close - 1200);
        } else {
          stopLoss = close - 1200;
        }
        trailingStopData.push({ time, value: stopLoss });
      }

      candlestickSeries.setData(data);
      ema50Series.setData(ema50Data);
      ema200Series.setData(ema200Data);
      trailingStopSeries.setData(trailingStopData);

      // Add Entry/Exit markers (Triangles) using lightweight-charts v5 plugin function
      const markers = [
        {
          time: data[15].time,
          position: "belowBar" as const,
          color: "#2D7D4F",
          shape: "arrowUp" as const,
          text: "BUY ENTRY",
        },
        {
          time: data[30].time,
          position: "aboveBar" as const,
          color: "#ef4444",
          shape: "arrowDown" as const,
          text: "SELL EXIT",
        },
        {
          time: data[42].time,
          position: "belowBar" as const,
          color: "#2D7D4F",
          shape: "arrowUp" as const,
          text: "BUY ENTRY",
        },
      ];
      createSeriesMarkers(candlestickSeries, markers);

      // Fit timescale content to prevent a blank chart display
      chart.timeScale().fitContent();

      // Setup Resize Observer for responsive width
      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width } = entry.contentRect;
          if (width > 0 && chart) {
            chart.applyOptions({ width });
          }
        }
      });
      resizeObserver.observe(container);

      // Real-time animation logic
      let lastCandle = { ...data[data.length - 1] };
      let lastEma50 = ema50Data[ema50Data.length - 1].value;
      let lastEma200 = ema200Data[ema200Data.length - 1].value;
      let lastStopLoss = trailingStopData[trailingStopData.length - 1].value;
      let tickCount = 0;

      interval = setInterval(() => {
        tickCount++;

        if (tickCount >= 15) {
          // Open a new candle after 15 ticks
          tickCount = 0;
          const nextTime = (lastCandle.time as number) + 3600 * 4;
          lastCandle = {
            time: nextTime,
            open: lastCandle.close,
            high: lastCandle.close,
            low: lastCandle.close,
            close: lastCandle.close,
          };
        } else {
          // Update the current candle
          const tickDir = Math.random() > 0.49 ? 1 : -1;
          const tickVal = Math.random() * 90 * tickDir;
          lastCandle.close = lastCandle.close + tickVal;

          if (lastCandle.close > lastCandle.high) lastCandle.high = lastCandle.close;
          if (lastCandle.close < lastCandle.low) lastCandle.low = lastCandle.close;
        }

        // Extract correct timestamp after opening/updating the candle
        const time = lastCandle.time;

        candlestickSeries.update({ ...lastCandle });

        // Update the EMAs
        lastEma50 = lastEma50 * 0.97 + lastCandle.close * 0.03;
        lastEma200 = lastEma200 * 0.992 + lastCandle.close * 0.008;
        ema50Series.update({ time, value: lastEma50 });
        ema200Series.update({ time, value: lastEma200 });

        // Animate Trailing Stop upward only
        if (lastCandle.close > lastCandle.open && lastCandle.close - 1000 > lastStopLoss) {
          lastStopLoss = lastCandle.close - 1000;
        }
        trailingStopSeries.update({ time, value: lastStopLoss });

        // Update ticker values
        setTickerPrice(
          lastCandle.close.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        setTickerColor(lastCandle.close >= lastCandle.open ? "text-brand-green" : "text-red-500");
      }, 1000);
    };

    initChart();

    return () => {
      if (chart) chart.remove();
      if (interval) clearInterval(interval);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // Framer Motion staggered animation configurations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-[95vh] pt-36 pb-20 flex items-center bg-brand-cream bg-graph-pattern overflow-hidden">
      
      {/* Centered Delta Watermark behind text with exactly 4% opacity */}
      <div 
        className="absolute inset-0 flex items-center justify-start pointer-events-none select-none z-0 px-6 md:px-12 max-w-7xl mx-auto"
        style={{ opacity: 0.04 }}
      >
        <span className="font-serif text-[50vw] text-brand-navy leading-none font-bold translate-y-[-10%] select-none">
          Δ
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left column: Staggered text load */}
        <motion.div 
          className="lg:col-span-6 flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtle Tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-navy/5 border border-brand-navy/10 rounded-full text-[10px] font-mono uppercase tracking-wider text-brand-navy mb-6"
          >
            <Activity size={12} className="text-brand-gold animate-pulse" />
            Quant & script trading
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-serif text-5xl md:text-6xl lg:text-[64px] leading-[1.08] text-brand-charcoal font-bold tracking-tight mb-6"
          >
            Precision tools for traders who think in{" "}
            <span className="italic text-brand-gold font-normal">Greeks.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="font-sans text-lg md:text-xl text-brand-muted mb-8 max-w-xl leading-relaxed"
          >
            Custom TradingView indicators, autonomous trading bots, and market tools — built by a trader with 4 years of skin in the game.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-brand-cream rounded-full hover:bg-brand-gold/90 transition-all duration-300 font-sans text-sm font-semibold tracking-wider uppercase shadow-md hover:translate-y-[-1px]"
            >
              Explore Services
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center px-8 py-4 border border-brand-border text-brand-charcoal bg-brand-cream/50 backdrop-blur-sm rounded-full hover:bg-brand-parchment hover:border-brand-charcoal transition-all duration-300 font-sans text-sm font-semibold tracking-wider uppercase"
            >
              See My Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Right column: Interactive Candlestick Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" as const }}
          className="lg:col-span-6 w-full mt-8 lg:mt-0"
        >
          <div className="bg-brand-cream border border-brand-border rounded-xl shadow-xl overflow-hidden p-5 flex flex-col">
            
            {/* Chart Widget Header */}
            <div className="flex justify-between items-center border-b border-brand-border pb-3.5 mb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-brand-cream bg-brand-navy px-2 py-0.5 rounded uppercase tracking-wider">
                  BTC/USD perp
                </span>
                <span className="font-mono text-[10px] text-brand-muted">
                  4H · Live simulation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brand-green rounded-full animate-pulse"></span>
                <span className={`font-mono text-sm font-bold ${tickerColor} transition-colors duration-200`}>
                  ${tickerPrice}
                </span>
              </div>
            </div>

            {/* Chart Container */}
            <div ref={chartContainerRef} className="w-full relative" style={{ minHeight: "380px" }}></div>

            {/* Bottom Details */}
            <div className="flex justify-between items-center border-t border-brand-border pt-3.5 mt-2 font-mono text-[10px] text-brand-muted">
              <div>Strategy: Shiva Sniper v10</div>
              <div className="flex gap-4">
                <span>ADX: 28.4</span>
                <span className="text-brand-green font-bold">Regime: Bullish</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
