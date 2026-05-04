"use client";

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Github, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { NAV_ITEMS, TOOLS_CONFIG } from '../../config/site'
// 引入我們的配置
// 輔助函數：生成完整的路由連結
const getToolHref = (slug: string) => slug === "#" ? "#" : `/tools/${slug}`;

export function DesktopSidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 min-h-screen border-r border-zinc-800 bg-zinc-950/50 backdrop-blur hidden md:block w-64 fixed left-0 top-0 bottom-0 z-50", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center pl-3 mb-14">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              DevTools
            </h1>
          </Link>
          <div className="space-y-1">
            {/* 1. 固定選單 (導航大廳) */}
            {NAV_ITEMS.map((route) => (
               <Link
               key={route.href}
               href={route.href}
               className={cn(
                 "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-zinc-800/50 rounded-lg transition",
                 pathname === route.href ? "text-white bg-zinc-800" : "text-zinc-400"
               )}
             >
               <div className="flex items-center flex-1">
                 <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                 {route.label}
               </div>
             </Link>
            ))}

            {/* 分隔線 */}
            <div className="my-2 border-t border-zinc-800/50" />
            <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Tools</p>

            {/* 2. 動態生成工具列表 */}
            {TOOLS_CONFIG.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.status === "coming-soon" ? "#" : getToolHref(tool.slug)}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-zinc-800/50 rounded-lg transition",
                  pathname === getToolHref(tool.slug) ? "text-white bg-zinc-800" : "text-zinc-400",
                  tool.status === "coming-soon" && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center flex-1">
                  <tool.icon className={cn("h-5 w-5 mr-3", "text-zinc-400 group-hover:text-zinc-200")} />
                  {tool.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 px-3 w-full">
        <Link href="https://github.com/cherites0610/developer-kit" target="_blank">
            <Button variant="outline" className="w-full border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800">
                <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
        </Link>
      </div>
    </div>
  );
}

// MobileNav 部分也要更新 (邏輯完全一樣，只是包在 Sheet 裡)
export function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
         <Link href="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              DevTools
            </h1>
         </Link>

         <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-zinc-950 border-zinc-800 text-zinc-100">
              <SheetHeader className="p-6 text-left">
                   <SheetTitle className="text-zinc-100">選單</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full">
                  <div className="space-y-1 p-4">
                        {/* 固定選單 */}
                        {NAV_ITEMS.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-zinc-800/50 rounded-lg transition",
                                pathname === route.href ? "text-white bg-zinc-800" : "text-zinc-400"
                                )}
                            >
                                <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                                </div>
                            </Link>
                        ))}

                        <div className="my-2 border-t border-zinc-800/50" />

                        {/* 工具列表 */}
                        {TOOLS_CONFIG.map((tool) => (
                        <Link
                            key={tool.slug}
                            href={tool.status === "coming-soon" ? "#" : getToolHref(tool.slug)}
                            onClick={() => setOpen(false)}
                            className={cn(
                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-zinc-800/50 rounded-lg transition",
                            pathname === getToolHref(tool.slug) ? "text-white bg-zinc-800" : "text-zinc-400",
                            tool.status === "coming-soon" && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <div className="flex items-center flex-1">
                            <tool.icon className={cn("h-5 w-5 mr-3", "text-zinc-400")} />
                            {tool.title}
                            </div>
                        </Link>
                        ))}
                  </div>
              </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
