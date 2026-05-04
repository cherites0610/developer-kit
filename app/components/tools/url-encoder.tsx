"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowRightLeft, Copy, Link as LinkIcon, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encodeAll, setEncodeAll] = useState(true); // true: encodeURIComponent, false: encodeURI
  const [error, setError] = useState<string | null>(null);

  // --- 核心轉換邏輯 ---
  const handleConvert = (text: string, currentMode: "encode" | "decode", isStrict: boolean) => {
    setInput(text);
    setError(null);

    if (!text) {
      setOutput("");
      return;
    }

    try {
      if (currentMode === "encode") {
        // Encode
        if (isStrict) {
          // encodeURIComponent: 編碼所有特殊字符 (適用於參數值)
          setOutput(encodeURIComponent(text));
        } else {
          // encodeURI: 保留 :// ? & 等字符 (適用於完整網址)
          setOutput(encodeURI(text));
        }
      } else {
        // Decode
        // decodeURIComponent 可以處理 encodeURI 的結果，反之則不一定
        setOutput(decodeURIComponent(text));
      }
    } catch (err) {
      if (currentMode === "decode") {
        setError("無效的 URL 編碼格式 (Malformated URI sequence)");
      } else {
        setError("編碼失敗");
      }
    }
  };

  // encodeAll 切換時重新計算
  useEffect(() => {
    handleConvert(input, mode, encodeAll);
  }, [encodeAll]);

  const handleModeChange = (val: string) => {
    const newMode = val as "encode" | "decode";
    setMode(newMode);
    setError(null);
    if (output && !error) {
      handleConvert(output, newMode, encodeAll);
    } else {
      setInput("");
      setOutput("");
    }
  };

  const swapContent = () => {
    if (!output || error) return;
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setError(null);
    handleConvert(output, newMode, encodeAll);
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
      <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
          <TabsTrigger value="encode">編碼 (Encode)</TabsTrigger>
          <TabsTrigger value="decode">解碼 (Decode)</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* === 輸入區 === */}
          <Card className="border-zinc-800 bg-zinc-900/50 flex flex-col">
            <CardHeader className="pb-3 border-b border-zinc-800/50">
              <CardTitle className="text-sm font-medium text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <LinkIcon className="w-4 h-4" />
                   {mode === "encode" ? "輸入原始字串" : "輸入已編碼 URL"}
                </div>

                {/* 僅在編碼模式顯示選項 */}
                {mode === "encode" && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="strict-mode" className="text-xs text-zinc-500 font-normal">
                      {encodeAll ? "編碼所有字符 (Component)" : "保留網址結構 (URI)"}
                    </Label>
                    <Switch
                      id="strict-mode"
                      checked={encodeAll}
                      onCheckedChange={setEncodeAll}
                      className="scale-75 origin-right"
                    />
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Textarea
                placeholder={mode === "encode" ? "例如: https://example.com?q=你好" : "例如: https%3A%2F%2Fexample.com%3Fq%3D%E4%BD%A0%E5%A5%BD"}
                className="min-h-75 h-full border-0 bg-transparent resize-none focus-visible:ring-0 p-4 font-mono text-sm leading-relaxed"
                value={input}
                onChange={(e) => handleConvert(e.target.value, mode, encodeAll)}
              />
              <div className="flex justify-between items-center px-4 py-2 border-t border-zinc-800/50 bg-zinc-900/30">
                <span className="text-xs text-zinc-500">{input.length} chars</span>
                <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 text-xs text-zinc-400 hover:text-red-400">
                  <Trash2 className="w-3 h-3 mr-1" /> 清空
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* === 輸出區 === */}
          <Card className={`border-zinc-800 bg-zinc-900/50 flex flex-col ${error ? "border-red-900/50" : ""}`}>
            <CardHeader className="pb-3 border-b border-zinc-800/50">
              <CardTitle className="text-sm font-medium text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <ArrowRightLeft className="w-4 h-4" />
                   {error ? <span className="text-red-400">轉換錯誤</span> : "轉換結果"}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={swapContent}
                    disabled={!output || !!error}
                    className="h-7 text-xs border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white disabled:opacity-30"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 mr-1.5" /> 互換
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-7 text-xs border-zinc-700 bg-zinc-800 hover:bg-zinc-700">
                    <Copy className="mr-2 h-3 w-3" /> 複製結果
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative">
               {error ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 p-4 text-center">
                    <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                    <p className="font-medium">無法解析</p>
                    <p className="text-xs opacity-70 mt-1">{error}</p>
                 </div>
               ) : (
                 <Textarea
                    readOnly
                    className="min-h-75 h-full border-0 bg-zinc-950/50 resize-none focus-visible:ring-0 p-4 font-mono text-sm text-zinc-300 leading-relaxed"
                    value={output}
                 />
               )}
            </CardContent>
          </Card>

        </div>
      </Tabs>
    </div>
  );
}
