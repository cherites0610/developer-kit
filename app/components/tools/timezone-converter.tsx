"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addMinutes, format, isValid, parseISO } from "date-fns"
import { ArrowRightLeft, Clock, Globe, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"

export default function TimezoneConverter() {
  // --- State: Real-time Monitor ---
  const [now, setNow] = useState<Date | null>(null);
  const [offset, setOffset] = useState<string>("0"); // 使用 string 避免輸入空的 0 時被清空

  // --- State: Manual Converter ---
  const [inputIso, setInputIso] = useState("");
  const [manualResult, setManualResult] = useState<{ local: string; utc: string } | null>(null);

  // 1. 啟動時鐘
  useEffect(() => {
    setNow(new Date()); // 避免 Hydration Mismatch
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 計算偏移後的時間
  const getAdjustedTime = () => {
    if (!now) return new Date();
    const offsetNum = parseInt(offset) || 0;
    return addMinutes(now, offsetNum);
  };

  const adjustedTime = getAdjustedTime();

  // 2. ISO 轉換邏輯
  const handleIsoChange = (val: string) => {
    setInputIso(val);
    if (!val.trim()) {
      setManualResult(null);
      return;
    }

    try {
      const date = parseISO(val);
      if (isValid(date)) {
        setManualResult({
          local: format(date, "yyyy-MM-dd HH:mm:ss"),
          utc: date.toISOString(), // ISO 本身就是 UTC 格式 (Z結尾)
        });
      } else {
        setManualResult(null);
      }
    } catch {
      setManualResult(null);
    }
  };

  // 取得當前時區名稱 (e.g., Asia/Taipei)
  const getTimezoneName = () => {
    if (typeof Intl === "undefined") return "Local";
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  return (
    <div className="space-y-8">

      {/* === Section 1: Real-time Monitor (含偏移功能) === */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* 控制面板 */}
        <Card className="lg:col-span-1 border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              時鐘偏移模擬 (Simulation)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-zinc-500">偏移量 (分鐘)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={offset}
                  onChange={(e) => setOffset(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 font-mono text-lg text-white focus:border-blue-500"
                  placeholder="0"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setOffset("0")}
                  className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400"
                  title="重置偏移"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-zinc-500">
                輸入正數 (快) 或負數 (慢) 來模擬時間誤差。
              </p>
            </div>

            {parseInt(offset) !== 0 && (
              <Badge variant="outline" className="w-full justify-center border-yellow-900/50 text-yellow-500 bg-yellow-900/10">
                ⚠ Simulating: {parseInt(offset) > 0 ? "+" : ""}{offset} mins
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* 顯示面板 (UTC & Local) */}
        <Card className="lg:col-span-2 border-zinc-800 bg-[#1e1e1e] relative overflow-hidden">
           {/* 背景裝飾 */}
           <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

           <CardContent className="p-6 grid sm:grid-cols-2 gap-8 h-full items-center">
              {/* UTC Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-wider">
                  <Globe className="w-3 h-3" /> UTC / GMT (+0)
                </div>
                <div className="text-3xl md:text-4xl font-mono font-bold text-zinc-100 tabular-nums">
                  {now ? adjustedTime.toISOString().split('T')[1].split('.')[0] : "--:--:--"}
                </div>
                <div className="text-sm text-zinc-500 font-mono">
                  {now ? adjustedTime.toISOString().split('T')[0] : "Loading..."}
                </div>
              </div>

              {/* Local Time */}
              <div className="space-y-2 border-l border-zinc-800 pl-8 sm:border-l-0 sm:pl-0 sm:relative sm:before:absolute sm:before:left-[-1px] sm:before:top-0 sm:before:bottom-0 sm:before:w-[1px] sm:before:bg-zinc-800">
                 <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider">
                  <Clock className="w-3 h-3" /> {getTimezoneName()}
                </div>
                <div className="text-3xl md:text-4xl font-mono font-bold text-white tabular-nums">
                  {now ? format(adjustedTime, "HH:mm:ss") : "--:--:--"}
                </div>
                <div className="text-sm text-zinc-500 font-mono">
                   {now ? format(adjustedTime, "yyyy-MM-dd") : "Loading..."}
                </div>
                <div className="text-xs text-zinc-600 font-mono">
                  ISO: {now ? format(adjustedTime, "yyyy-MM-dd'T'HH:mm:ssXXX") : ""}
                </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* === Section 2: Manual ISO Converter === */}
      <Card className="border-zinc-800 bg-zinc-900/30">
        <CardHeader>
           <CardTitle className="text-lg text-white flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-green-500" />
              ISO 時間轉換器
           </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="grid gap-4">
              <div className="space-y-2">
                 <Label>輸入 ISO 8601 時間字串</Label>
                 <Input
                   placeholder="e.g. 2023-10-25T14:30:00Z"
                   value={inputIso}
                   onChange={(e) => handleIsoChange(e.target.value)}
                   className="font-mono bg-zinc-950 border-zinc-800 h-12"
                 />
              </div>

              {manualResult && (
                <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                   <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                      <div className="text-xs text-zinc-500">UTC Time (Universal)</div>
                      <div className="font-mono text-lg text-zinc-200 select-all">
                        {manualResult.utc}
                      </div>
                   </div>
                   <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                      <div className="text-xs text-blue-400">Local Time ({getTimezoneName()})</div>
                      <div className="font-mono text-lg text-white select-all">
                        {manualResult.local}
                      </div>
                   </div>
                </div>
              )}
           </div>
        </CardContent>
      </Card>

    </div>
  );
}
