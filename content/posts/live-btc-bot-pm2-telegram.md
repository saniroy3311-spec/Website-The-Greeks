---
title: "How I deployed a live BTC bot on Delta Exchange India with PM2 and Telegram"
date: "May 2025"
category: "Trading Bot"
readTime: "6 min read"
summary: "A step-by-step developer's guide to deploying a Python automated trade executor, managing it with PM2, and routing alerts directly to a Telegram channel."
---

Setting up backtests is the easy part. The real challenge is **execution engineering** — taking those backtested rules and putting them live on real capital, 24 hours a day, without missing a tick.

This article details the exact deployment stack I use for my clients trading on **Delta Exchange India** using a lightweight Debian VPS, PM2 daemon manager, and Telegram for real-time reporting.

### 1. The Listener Architecture

The bot uses a FastStream/FastAPI server to listen for webhook alerts from TradingView. The webhook contains a JSON payload specifying the symbol, side, price, and strategy name.

```python
import os
from fastapi import FastAPI, Request, HTTPException
from delta_client import DeltaRestClient

app = FastAPI()
client = DeltaRestClient(
    api_key=os.getenv("DELTA_API_KEY"),
    api_secret=os.getenv("DELTA_API_SECRET")
)

@app.post("/webhook")
async def handle_signal(request: Request):
    payload = await request.json()
    if payload.get("secret") != os.getenv("WEBHOOK_SECRET"):
        raise HTTPException(status_code=403, detail="Unauthorized")
        
    symbol = payload.get("symbol")
    side = payload.get("side") # "buy" or "sell"
    qty = payload.get("qty")
    
    # Send order to Delta Exchange API
    order = client.place_order(
        symbol=symbol,
        size=qty,
        side=side,
        order_type="market"
    )
    
    # Trigger telegram alert
    send_telegram_alert(symbol, side, qty, order.get("price"))
    return {"status": "filled", "order_id": order.get("id")}
```

### 2. Daemonizing with PM2

To make sure the Python script stays alive permanently, we manage it with **PM2** (Process Manager 2), which restarts it immediately if the script crashes or if the VPS restarts.

First, create a `ecosystem.config.js` in the project root:

```javascript
module.exports = {
  apps: [{
    name: 'the-greeks-btc-bot',
    script: 'main.py',
    interpreter: 'python3',
    env: {
      PORT: 8080,
      DELTA_API_KEY: 'your_api_key',
      DELTA_API_SECRET: 'your_api_secret',
      TELEGRAM_TOKEN: 'your_bot_token',
      TELEGRAM_CHAT_ID: 'your_channel_id',
      WEBHOOK_SECRET: 'super_secure_hash_here'
    }
  }]
}
```

Deploying and starting is as simple as:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Verification

Once live, PM2 logs will track the daemon's state, and Telegram will send instant receipts like:
`✓ LONG ORDER PLACED: BTC/USD Perp @ 103,420 · Quantity: 0.05 BTC`
This gives you confidence that your code has skin in the game and is running precisely.
