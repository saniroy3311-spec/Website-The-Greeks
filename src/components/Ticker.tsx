"use client";

import React, { useEffect, useState } from "react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

const initialTickers: TickerItem[] = [
  { symbol: "NIFTY 50", price: "23,450.40", change: "+1.24%", isUp: true },
  { symbol: "BANKNIFTY", price: "49,820.15", change: "+0.85%", isUp: true },
  { symbol: "BTC/USD", price: "103,420.50", change: "+2.31%", isUp: true },
  { symbol: "GOLD", price: "72,150.00", change: "-0.42%", isUp: false },
  { symbol: "USDINR", price: "83.42", change: "+0.05%", isUp: true },
  { symbol: "SENSEX", price: "77,110.80", change: "-0.15%", isUp: false },
];

export default function Ticker() {
  const [tickers, setTickers] = useState<TickerItem[]>(initialTickers);

  // Simulate slight price updates every 3 seconds to make it look alive
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((item) => {
          const priceNum = parseFloat(item.price.replace(/,/g, ""));
          const pct = (Math.random() - 0.5) * 0.04; // small fluctuation
          const newPrice = priceNum * (1 + pct);
          const diff = newPrice - priceNum;
          const isUp = diff >= 0;
          
          let formattedPrice = newPrice.toFixed(2);
          if (item.symbol !== "USDINR") {
            formattedPrice = Math.round(newPrice).toLocaleString("en-IN") + ".00";
          }
          
          return {
            ...item,
            price: formattedPrice,
            change: (isUp ? "+" : "") + (pct * 100).toFixed(2) + "%",
            isUp,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-navy text-brand-cream border-y border-brand-navy/20 py-3.5 overflow-hidden select-none z-10 relative flex w-full">
      <div className="flex w-max flex-nowrap shrink-0">
        {[1, 2].map((loopIndex) => (
          <div
            key={loopIndex}
            className="flex gap-16 px-8 items-center text-xs font-mono tracking-wider animate-marquee whitespace-nowrap shrink-0"
            style={{ willChange: "transform" }}
          >
            {tickers.map((ticker, index) => (
              <div key={`${loopIndex}-${index}`} className="flex items-center gap-3">
                <span className="font-semibold text-brand-cream/60">{ticker.symbol}</span>
                <span className="font-bold flex items-center gap-1">
                  {ticker.price}
                  <span className={ticker.isUp ? "text-brand-green" : "text-red-500"}>
                    {ticker.isUp ? "▲" : "▼"}
                  </span>
                </span>
                <span className={`text-[10px] ${ticker.isUp ? "text-brand-green" : "text-red-500"}`}>
                  {ticker.change}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
