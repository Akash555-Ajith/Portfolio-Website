import type { Metadata } from "next";
import localFont from "next/font/local";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";
import "./singularity.css";

// Space Grotesk sets the whole page; JetBrains Mono is the telemetry face —
// the stage bar, chapter eyebrows and every readout in the HUD.
const grotesk = localFont({
  src: "./fonts/space-grotesk.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-grotesk",
});

const jetbrains = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Akash Ajith | Portfolio",
  description: "Akash Ajith — third-year B.Tech Computer Science student at CUSAT. Web development experience at Tatos and Ariussoft.",
  icons: { icon: "/akash-icon.svg" },
  openGraph: {
    title: "Akash Ajith | Portfolio",
    description: "Computer Science at CUSAT · Web Development · Currently learning DevOps",
    siteName: "Akash Ajith's Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: some browser extensions inject attributes onto
    // <html>/<body> (e.g. data-__host_prefix_..._-filters-channel) before React
    // hydrates, which otherwise trips a hydration mismatch. This only tolerates
    // attribute diffs on these root elements — it does not affect the app UI.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${grotesk.variable} ${jetbrains.variable}`}
        suppressHydrationWarning
      >
        {children}
        <SpeedInsights />
        <Analytics />
        {/* Only load analytics in production */}
        {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
        )}
      </body>
    </html>
  );
}
