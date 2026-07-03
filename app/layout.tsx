import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Github } from "lucide-react"
import Link from "next/link"
import { AppShell } from './components/layout/app-shell'
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
  authors: [{ name: "廖柏安", url: "https://github.com/cherites0610" }],
  creator: "廖柏安",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: SITE_URL,
    title: "DevTools | 開發者工具箱",
    description: "極速、純淨、無廣告。專為開發者打造的高性能 Web Tools。",
    siteName: "DevTools",
    // 之後我們可以做一張帥氣的 OG Image 放在 public/og.png
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DevTools Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools | 開發者工具箱",
    description: "極速、純淨、無廣告。專為開發者打造的高性能 Web Tools。",
    images: ["/og.png"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />

        {/* 使用 AppShell 包裹內容，它會自動處理 Sidebar 的顯示與隱藏 */}
        <AppShell>
          {children}
        </AppShell>

        <Link
          href="https://github.com/cherites0610/developer-kit"
          target="_blank"
          rel="noreferrer"
          aria-label="View source on GitHub"
          className="fixed top-0 right-0 z-50 group"
        >
          <div className="w-20 h-20 [clip-path:polygon(0_0,100%_0,100%_100%)] bg-zinc-100 group-hover:bg-white transition-colors flex items-start justify-end p-3">
            <Github className="w-5 h-5 text-zinc-900" />
          </div>
        </Link>

        <Toaster />
      </body>
    </html>
  );
}
