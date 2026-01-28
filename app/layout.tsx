import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://kit.cherites.org"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "n9X7iLzzJRzxTYr_2GU9sO1La8ldYk7TpcNpvTVd9UM",
  },
  title: {
    default: "DevTools | 開發者工具箱",
    template: "%s | DevTools", // 子頁面會自動變成 "UUID 生成器 | DevTools"
  },
  description: "極速、純淨、無廣告的開發者線上工具箱。提供 UUID 生成、JSON 格式化、Base64 編碼等高頻工具，專為程式設計師打造。",
  keywords: ["開發者工具", "UUID生成器", "JSON格式化", "Base64解碼", "線上工具", "DevTools"],
  authors: [{ name: "DevTools Team" }],
  creator: "DevTools Team",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: SITE_URL,
    title: "DevTools | 開發者工具箱",
    description: "極速、純淨、無廣告。專為開發者打造的高性能 Web Tools。",
    siteName: "DevTools",
    // 之後我們可以做一張帥氣的 OG Image 放在 public/og.png
    // images: [
    //   {
    //     url: "/og.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "DevTools Preview",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools | 開發者工具箱",
    description: "極速、純淨、無廣告。專為開發者打造的高性能 Web Tools。",
    // images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="dark">
      {/* 1. lang="zh-TW": 設定中文
        2. className="dark": 強制開啟 Dark Mode
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50 min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}
