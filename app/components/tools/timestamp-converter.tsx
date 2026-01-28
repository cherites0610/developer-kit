"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, fromUnixTime, getUnixTime, isValid, parseISO } from "date-fns"
import { Copy, Pause, Play, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function TimestampConverter() {
  // --- 1. 即時時鐘 (Current Time) ---
  const [now, setNow] = useState<Date | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // 解決 Hydration Mismatch，確保在 Client 端才開始計時
    setNow(new Date());
    const timer = setInterval(() => {
      if (!isPaused) setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // --- 2. 轉換器邏輯 (Converter) ---
  const [tsInput, setTsInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");

  // 當使用者輸入「時間戳」
  const handleTsChange = (val: string) => {
    setTsInput(val);
    if (!val) {
      setDateInput("");
      return;
    }

    const num = parseInt(val);
    if (isNaN(num)) return;

    // 判斷單位並轉換
    const date = unit === "seconds" ? fromUnixTime(num) : new Date(num);

    if (isValid(date)) {
      // 格式化為 datetime-local 所需格式: YYYY-MM-DDThh:mm
      setDateInput(format(date, "yyyy-MM-dd'T'HH:mm"));
    }
  };

  // 當使用者輸入「日期」
  const handleDateChange = (val: string) => {
    setDateInput(val);
    if (!val) {
      setTsInput("");
      return;
    }

    const date = parseISO(val);
    if (isValid(date)) {
      const ts = unit === "seconds" ? getUnixTime(date) : date.getTime();
      setTsInput(ts.toString());
    }
  };

  // 輔助功能
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("已複製", { description: text });
  };

  const setInputToNow = () => {
    const n = new Date();
    const ts = unit === "seconds" ? getUnixTime(n) : n.getTime();
    setTsInput(ts.toString());
    setDateInput(format(n, "yyyy-MM-dd'T'HH:mm"));
  };

  // 初始化輸入框
  useEffect(() => {
    setInputToNow();
  }, []); // 僅在掛載時執行一次

  return (
    <div className="space-y-6">

      {/* 區塊 1: 當前時間 (Hero Card) */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Current Unix Timestamp</h3>
            <div className="text-5xl md:text-6xl font-mono font-bold text-white tabular-nums tracking-tight">
              {now ? getUnixTime(now) : "Loading..."}
            </div>
            <div className="text-zinc-500 font-mono text-sm">
              {now ? now.toISOString() : ""}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
              className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white"
              title={isPaused ? "繼續計時" : "暫停計時"}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => copyToClipboard(now ? getUnixTime(now).toString() : "")}
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
            >
              <Copy className="mr-2 h-4 w-4" /> 複製
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 區塊 2: 雙向轉換器 */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 左側：Timestamp 輸入 */}
        <Card className="border-zinc-800 bg-[#1e1e1e]">
          <CardHeader className="pb-3">
             <CardTitle className="text-sm text-zinc-400 flex items-center justify-between">
                <span>Unix Timestamp</span>
                <Select value={unit} onValueChange={(v: any) => { setUnit(v); setInputToNow(); }}>
                  <SelectTrigger className="w-[130px] h-7 text-xs bg-zinc-900 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Seconds (s)</SelectItem>
                    <SelectItem value="milliseconds">Millis (ms)</SelectItem>
                  </SelectContent>
                </Select>
             </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="relative">
                <Input
                  value={tsInput}
                  onChange={(e) => handleTsChange(e.target.value)}
                  className="font-mono text-lg h-12 bg-zinc-950 border-zinc-800 focus:border-blue-500"
                  placeholder="e.g. 1678888888"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(tsInput)}
                  className="absolute right-1 top-1 h-10 text-zinc-500 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
             </div>

             <div className="flex gap-2">
               <Button variant="secondary" size="sm" onClick={setInputToNow} className="w-full text-xs">
                 <RefreshCw className="mr-2 h-3 w-3" /> 重置為現在
               </Button>
             </div>
          </CardContent>
        </Card>

        {/* 右側：日期時間輸入 */}
        <Card className="border-zinc-800 bg-[#1e1e1e]">
          <CardHeader className="pb-3">
             <CardTitle className="text-sm text-zinc-400">Date & Time (Local)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="relative">
                {/* 使用原生 datetime-local，樣式簡單但在所有瀏覽器都原生支援 */}
                <Input
                  type="datetime-local"
                  step="1" // 允許秒數選擇
                  value={dateInput}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="font-mono text-lg h-12 bg-zinc-950 border-zinc-800 focus:border-blue-500 [color-scheme:dark]"
                />
             </div>

             {/* 顯示 UTC / ISO 預覽 */}
             <div className="p-3 rounded bg-zinc-900/50 border border-zinc-800 space-y-1">
                <div className="flex justify-between text-xs">
                   <span className="text-zinc-500">ISO 8601 (UTC):</span>
                </div>
                <div className="font-mono text-xs text-zinc-300 break-all">
                  {tsInput ? (
                      unit === "seconds"
                      ? new Date(parseInt(tsInput) * 1000).toISOString()
                      : new Date(parseInt(tsInput)).toISOString()
                  ) : "..."}
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
