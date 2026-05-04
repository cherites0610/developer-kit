"use client";

import { Copy, RefreshCw } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"; // 使用 sonner 顯示通知
import { v1 as uuidv1, v4 as uuidv4 } from "uuid"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function UuidGenerator() {
  // --- 狀態管理 (State) ---
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(5);
  const [version, setVersion] = useState<"v4" | "v1">("v4");
  const [removeHyphens, setRemoveHyphens] = useState<boolean>(false);
  const [uppercase, setUppercase] = useState<boolean>(false);

  // --- 核心邏輯 (Logic) ---
  const generateUUIDs = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => {
      let id = version === "v4" ? uuidv4() : uuidv1();
      if (removeHyphens) id = id.replace(/-/g, "");
      if (uppercase) id = id.toUpperCase();
      return id;
    });
    setUuids(newUuids);
  }, [count, version, removeHyphens, uppercase]);

  // 初始加載與依賴變更時自動生成
  useEffect(() => {
    generateUUIDs();
  }, [generateUUIDs]);

  // --- 互動功能 (Actions) ---
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("已複製到剪貼簿", {
        description: text,
        duration: 2000,
    });
    generateUUIDs();
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    toast.success("已複製全部到剪貼簿", { duration: 2000 });
    generateUUIDs();
  };

  // --- 渲染 (Render) ---
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* 左側/上方：控制面板 (Control Panel) */}
      <Card className="md:col-span-1 border-zinc-800 bg-zinc-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-zinc-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
            配置參數
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* 數量控制 */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>生成數量</Label>
              <span className="text-xs font-mono text-zinc-400">{count}</span>
            </div>
            <Slider
              value={[count]}
              onValueChange={(v) => setCount(v[0])}
              max={50}
              min={1}
              step={1}
              className="py-2"
            />
          </div>

          {/* 版本選擇 (簡單的 Toggle) */}
          <div className="flex items-center justify-between">
            <Label htmlFor="version-mode">使用 UUID v1 (時間戳)</Label>
            <Switch
              id="version-mode"
              checked={version === "v1"}
              onCheckedChange={(c) => setVersion(c ? "v1" : "v4")}
            />
          </div>

          {/* 格式選項 */}
          <div className="flex items-center justify-between">
            <Label htmlFor="hyphens">移除連字號 (-)</Label>
            <Switch
              id="hyphens"
              checked={removeHyphens}
              onCheckedChange={setRemoveHyphens}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">大寫 (UPPERCASE)</Label>
            <Switch
              id="uppercase"
              checked={uppercase}
              onCheckedChange={setUppercase}
            />
          </div>

          {/* 重新生成按鈕 */}
          <Button
            onClick={generateUUIDs}
            className="w-full bg-zinc-100 text-zinc-900 hover:bg-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> 重新生成
          </Button>
        </CardContent>
      </Card>

      {/* 右側/下方：輸出結果 (Output Console) */}
      <Card className="md:col-span-2 border-zinc-800 bg-zinc-950 shadow-inner">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-mono text-zinc-400">OUTPUT_LOG</CardTitle>
          <Button variant="outline" size="sm" onClick={copyAll} className="h-8 border-zinc-800 hover:bg-zinc-900 text-zinc-300">
            <Copy className="mr-2 h-3 w-3" /> 複製全部
          </Button>
        </CardHeader>
        <CardContent>
          <div className="max-h-125 overflow-y-auto space-y-1 font-mono text-sm">
            {uuids.map((id, index) => (
              <div
                key={`${id}-${index}`}
                onClick={() => copyToClipboard(id)}
                className="group flex items-center justify-between p-2 rounded hover:bg-zinc-900/80 cursor-pointer transition-colors border border-transparent hover:border-zinc-800"
              >
                <span className="text-zinc-300 break-all">{id}</span>
                <Copy className="h-3 w-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
