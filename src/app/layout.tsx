import type { Metadata } from "next";
import { Playfair_Display, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Greeks — Custom Trading Indicators & Bots | Sani Roy",
  description: "Custom TradingView indicators, autonomous trading bots, and market tools built by Sani Roy — trader and developer with 4 years of real market experience. Based in India.",
  keywords: [
    "custom tradingview indicator india",
    "pine script developer india",
    "trading bot developer india",
    "delta exchange trading bot",
    "nifty banknifty indicator pine script",
    "options greeks",
    "sani roy"
  ],
  authors: [{ name: "Sani Roy" }],
  openGraph: {
    title: "The Greeks — Custom Trading Indicators & Bots | Sani Roy",
    description: "Custom TradingView indicators, autonomous trading bots, and market tools built by Sani Roy. Based in India.",
    type: "website",
    locale: "en_IN",
    url: "https://thegreks.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Greeks — Custom Trading Indicators & Bots | Sani Roy",
    description: "Custom TradingView indicators, autonomous trading bots, and market tools built by Sani Roy.",
  },
  verification: {
    google: "google-site-verification-placeholder-key",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${figtree.variable} ${jetbrains.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-brand-cream text-brand-charcoal font-sans antialiased min-h-screen flex flex-col overflow-x-hidden selection:bg-brand-gold/20 selection:text-brand-charcoal">
        {children}
      </body>
    </html>
  );
}
