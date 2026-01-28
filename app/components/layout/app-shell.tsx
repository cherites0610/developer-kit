"use client";

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { DesktopSidebar, MobileNav } from './sidebar'

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // 判斷是否為首頁
  const isHomePage = pathname === "/";

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* 如果不是首頁，才顯示導航列
        (MobileNav 和 DesktopSidebar 都包在條件裡)
      */}
      {!isHomePage && (
        <>
          <MobileNav />
          <DesktopSidebar />
        </>
      )}

      {/* 主要內容區域
        如果是首頁：不加左邊距 (w-full)
        如果不是首頁：加上 md:pl-64 留出側邊欄空間
      */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          !isHomePage && "md:pl-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
