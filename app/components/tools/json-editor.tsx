"use client";

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Editor from "@monaco-editor/react"
import { AlertCircle, Check, Copy, FileJson, Maximize2, Minimize2, Trash2 } from "lucide-react"
import { useCallback, useState } from "react"
import { toast } from "sonner"

// 預設範例數據
const SAMPLE_JSON = `{
  "project": "DevTools",
  "version": 1.0,
  "features": ["UUID", "Base64", "JSON"],
  "active": true,
  "meta": { "author": "Cherites", "year": 2026 }
}`;

export default function JsonEditor() {
  const [input, setInput] = useState<string>(SAMPLE_JSON);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"format" | "minify">("format");

  // --- 核心邏輯 ---
  const processJson = useCallback((raw: string, currentMode: "format" | "minify") => {
    if (!raw.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (currentMode === "format") {
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        setOutput(JSON.stringify(parsed));
      }
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const handleInputChange = (value: string | undefined) => {
    const newVal = value || "";
    setInput(newVal);
    // 即時處理，保持當前模式
    processJson(newVal, mode);
  };

  const handleModeChange = (newMode: "format" | "minify") => {
    setMode(newMode);
    processJson(input, newMode);
    if (!error && input.trim()) {
      toast.success(newMode === "format" ? "已切換為格式化模式" : "已切換為壓縮模式");
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("已複製結果");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    processJson(SAMPLE_JSON, mode);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[75vh]">

      {/* === 左側面板：輸入區 === */}
      <div className="flex flex-col rounded-xl overflow-hidden border border-zinc-800 bg-[#1e1e1e] shadow-sm">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-zinc-900/50 border-b border-zinc-800 px-3 py-2 h-12">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-300">INPUT</span>
            <span className="text-xs text-zinc-500 font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
              {input.length} chars
            </span>
          </div>

          {/* 左側操作按鈕群 */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={loadSample}
              className="h-8 px-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              title="載入範例"
            >
              <FileJson className="w-4 h-4 mr-1.5" /> 範例
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-8 px-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
              title="清空內容"
            >
              <Trash2 className="w-4 h-4 mr-1.5" /> 清空
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 pt-2">
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="vs-dark"
            value={input}
            onChange={handleInputChange}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              formatOnPaste: true,
              padding: { top: 10 }
            }}
          />
        </div>
      </div>

      {/* === 右側面板：輸出區 === */}
      <div className={cn(
        "flex flex-col rounded-xl overflow-hidden border bg-[#1e1e1e] shadow-sm transition-colors duration-300",
        error ? "border-red-900/50" : "border-zinc-800"
      )}>
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-zinc-900/50 border-b border-zinc-800 px-3 py-2 h-12">
          <div className="flex items-center gap-2 overflow-hidden">
             {/* 狀態指示標題 */}
             {error ? (
                <div className="flex items-center text-red-400 text-sm font-medium animate-pulse">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  語法錯誤 (Syntax Error)
                </div>
             ) : (
                <div className="flex items-center text-green-400 text-sm font-medium">
                   <Check className="w-4 h-4 mr-2" />
                   OUTPUT
                </div>
             )}
          </div>

          {/* 右側操作按鈕群 */}
          <div className="flex items-center gap-1">
            {/* 模式切換 (Tabs 風格) */}
            <div className="flex bg-zinc-950 rounded-lg p-0.5 border border-zinc-800 mr-2">
              <button
                onClick={() => handleModeChange("minify")}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center",
                  mode === "minify"
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Minimize2 className="w-3 h-3 mr-1.5" /> 壓縮
              </button>
              <button
                onClick={() => handleModeChange("format")}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center",
                  mode === "format"
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Maximize2 className="w-3 h-3 mr-1.5" /> 格式化
              </button>
            </div>

            <Button
              size="sm"
              onClick={copyOutput}
              className="h-8 bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              <Copy className="w-3 h-3 mr-1.5" /> 複製
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 pt-2 relative">
           {/* 如果有錯誤，可以在這裡顯示詳細訊息，或者只依賴 Monaco 的紅線 */}
           {error && (
             <div className="absolute top-0 left-0 right-0 z-10 bg-red-950/90 text-red-200 text-xs px-4 py-1 border-b border-red-900/50 backdrop-blur-sm">
               {error}
             </div>
           )}
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="vs-dark"
            value={output}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 10 }
            }}
          />
        </div>
      </div>

    </div>
  );
}
