"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRightLeft, Copy, FileText, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);

  // --- 核心邏輯：UTF-8 安全的轉換 ---
  const handleConvert = (text: string, currentMode: "encode" | "decode") => {
    setInput(text);
    setError(null);

    if (!text) {
      setOutput("");
      return;
    }

    try {
      if (currentMode === "encode") {
        // UTF-8 Encode: Text -> Base64
        const encoded = btoa(
          encodeURIComponent(text).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
              return String.fromCharCode(parseInt(p1, 16));
            })
        );
        setOutput(encoded);
      } else {
        // UTF-8 Decode: Base64 -> Text
        const decoded = decodeURIComponent(
          atob(text)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        setOutput(decoded);
      }
    } catch (err) {
      console.error(err); // 用於 debug
      // 只有在 Decode 模式下才報錯，Encode 通常不會失敗
      if (currentMode === "decode") {
        setError("無效的 Base64 格式");
      }
    }
  };

  // 切換模式時清空或交換
  const handleModeChange = (val: string) => {
    setMode(val as "encode" | "decode");
    setInput("");
    setOutput("");
    setError(null);
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("已複製結果");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="encode" onValueChange={handleModeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
          <TabsTrigger value="encode">編碼 (Encode)</TabsTrigger>
          <TabsTrigger value="decode">解碼 (Decode)</TabsTrigger>
        </TabsList>

        {/* 這裡只用一個主要的 Content 區塊，透過 State 控制邏輯，減少重複代碼 */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* 輸入區 */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {mode === "encode" ? "輸入純文字 (UTF-8 支援)" : "輸入 Base64 字串"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={mode === "encode" ? "輸入要編碼的內容..." : "貼上 Base64 代碼..."}
                className="min-h-[300px] font-mono text-sm bg-zinc-950 border-zinc-800 focus:border-blue-500/50 resize-none"
                value={input}
                onChange={(e) => handleConvert(e.target.value, mode)}
              />
              <div className="mt-2 flex justify-between text-xs text-zinc-500">
                <span>{input.length} chars</span>
                <Button variant="ghost" size="sm" onClick={clearAll} className="h-6 px-2 hover:bg-zinc-800 hover:text-red-400">
                  <Trash2 className="w-3 h-3 mr-1" /> 清空
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 輸出區 */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                {mode === "encode" ? "Base64 結果" : "解碼結果"}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-7 border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                <Copy className="mr-2 h-3 w-3" /> 複製
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  readOnly
                  value={error ? error : output}
                  className={`min-h-[300px] font-mono text-sm bg-zinc-950 border-zinc-800 focus-visible:ring-0 resize-none ${
                    error ? "text-red-500 border-red-900/50" : "text-zinc-300"
                  }`}
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </Tabs>
    </div>
  );
}
