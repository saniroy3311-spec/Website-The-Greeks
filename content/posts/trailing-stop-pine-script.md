---
title: "Building a 5-stage trailing stop in Pine Script v5 — the complete guide"
date: "June 2025"
category: "Pine Script"
readTime: "8 min read"
summary: "Learn how to write a robust, modular trailing stop loss engine in TradingView Pine Script v5 that scales across five levels as your position goes in-the-money."
---

In options and futures trading, protecting open profits is just as important as finding an entry. A simple fixed stop loss leaves too much money on the table, while a standard trailing stop is often too tight and triggers prematurely during noise.

The solution is a **5-stage trailing stop**. As price hits defined target thresholds, the stop loss steps up to lock in profits incrementally.

Here is how to write this logic from scratch in **Pine Script v5**.

### Setting Up the Inputs

First, we define our inputs for the stop loss thresholds and the trailing step points:

```pine
//@version=5
strategy("The Greeks — 5-Stage Trailing Stop", overlay=true)

// Stop Loss Inputs
atrLength = input.int(14, "ATR Length")
slMultiplier = input.float(1.5, "Initial SL ATR Multiplier")

// Target Levels (in Points or Percent)
t1 = input.float(1.0, "Stage 1 Target (%)")
t2 = input.float(2.0, "Stage 2 Target (%)")
t3 = input.float(3.0, "Stage 3 Target (%)")
t4 = input.float(4.0, "Stage 4 Target (%)")
t5 = input.float(5.0, "Stage 5 Target (%)")
```

### The Trailing Logic

We need to track the highest price since our entry. We can use `strategy.position_avg_price` and a persistent variable to update the stop level.

```pine
var float stopLevel = na
var float maxPrice = na

if (strategy.position_size > 0)
    maxPrice := na(maxPrice) ? high : math.max(maxPrice, high)
    
    // Calculate distance from entry
    entryPrice = strategy.position_avg_price
    pctGain = ((maxPrice - entryPrice) / entryPrice) * 100
    
    // Step stop loss up based on stage targets
    if pctGain >= t5
        stopLevel := entryPrice * (1 + 0.04) // lock 4%
    else if pctGain >= t4
        stopLevel := entryPrice * (1 + 0.03) // lock 3%
    else if pctGain >= t3
        stopLevel := entryPrice * (1 + 0.02) // lock 2%
    else if pctGain >= t2
        stopLevel := entryPrice * (1 + 0.01) // lock 1%
    else if pctGain >= t1
        stopLevel := entryPrice // breakeven
    else
        stopLevel := entryPrice - (ta.atr(atrLength) * slMultiplier)
else
    maxPrice := na
    stopLevel := na
```

### Summary of Benefits

1. **Protects Capital:** Moves to breakeven quickly after target 1 is hit.
2. **Reduces Drawdown:** Prevents double-top reversals from turning a winning trade into a loss.
3. **Automated Alerts:** Directly integrates with TradingView alerts to trigger webhook executions to python bots on Delta Exchange or Zerodha.
