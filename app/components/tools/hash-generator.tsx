"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import CryptoJS from "crypto-js"
import { Copy, FileText, Fingerprint, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type Algorithm = "MD5" | "SHA1" | "SHA256" | "SHA512" | "RIPEMD160";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [algo, setAlgo] = useState<Algorithm>("SHA256");
  const [uppercase, setUppercase] = useState(false);

  // --- 核心邏輯 ---
  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    let result: any;
    switch (algo) {
      case "MD5":
        result = CryptoJS.MD5(input);
        break;
      case "SHA1":
        result = CryptoJS.SHA1(input);
        break;
      case "SHA256":
        result = CryptoJS.SHA256(input);
        break;
      case "SHA512":
        result = CryptoJS.SHA512(input);
        break;
      case "RIPEMD160":
        result = CryptoJS.RIPEMD160(input);
        break;
      default:
        result = CryptoJS.SHA256(input);
    }

    let hashString = result.toString(CryptoJS.enc.Hex);
    if (uppercase) hashString = hashString.toUpperCase();

    setOutput(hashString);
  }, [input, algo, uppercase]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Hash 已複製", {
        description: `${algo}: ${output.substring(0, 10)}...`
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* 左側：控制與輸入 */}
      <Card className="lg:col-span-2 border-zinc-800 bg-zinc-900/50 flex flex-col">
        <CardHeader className="pb-4 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <FileText className="w-4 h-4" />
               輸入原始內容 (Plain Text)
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-green-500 border-green-900/50 bg-green-900/10 text-[10px] px-2 py-0.5">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Client-Side Only
                </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <Textarea
            placeholder="輸入要進行雜湊的文字..."
            className="min-h-[250px] h-full border-0 bg-transparent resize-none focus-visible:ring-0 p-6 font-mono text-base leading-relaxed text-zinc-200 placeholder:text-zinc-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </CardContent>
        {/* 底部資訊列 */}
        <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-500 flex justify-between items-center">
            <span>Length: {input.length} chars</span>
            <span>Encoding: UTF-8</span>
        </div>
      </Card>

      {/* 右側：設定與結果 */}
      <div className="space-y-6">

        {/* 設定面板 */}
        <Card className="border-zinc-800 bg-[#1e1e1e]">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm text-zinc-400">配置 (Configuration)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs">雜湊演算法 (Algorithm)</Label>
                    <Select value={algo} onValueChange={(v: Algorithm) => setAlgo(v)}>
                        <SelectTrigger className="bg-zinc-950 border-zinc-800">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MD5">MD5 (128-bit)</SelectItem>
                            <SelectItem value="SHA1">SHA-1 (160-bit)</SelectItem>
                            <SelectItem value="SHA256">SHA-256 (256-bit)</SelectItem>
                            <SelectItem value="SHA512">SHA-512 (512-bit)</SelectItem>
                            <SelectItem value="RIPEMD160">RIPEMD-160</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                    <Label htmlFor="uppercase-mode" className="text-xs cursor-pointer">大寫輸出 (Uppercase)</Label>
                    <Switch
                        id="uppercase-mode"
                        checked={uppercase}
                        onCheckedChange={setUppercase}
                        className="scale-75"
                    />
                </div>
            </CardContent>
        </Card>

        {/* 結果面板 */}
        <Card className="border-zinc-800 bg-[#1e1e1e] border-t-4 border-t-blue-500">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm text-zinc-400 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-400">
                        <Fingerprint className="w-4 h-4" />
                        雜湊值 (Result)
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
                <div className="relative group">
                    <div className="min-h-[80px] w-full rounded-md border border-zinc-800 bg-zinc-950 p-3 font-mono text-sm break-all text-zinc-300">
                        {output || <span className="text-zinc-700 italic">等待輸入...</span>}
                    </div>
                    {output && (
                        <Button
                            size="icon"
                            variant="secondary"
                            className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                            onClick={copyToClipboard}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* 演算法小知識 */}
                <div className="text-[10px] text-zinc-500 text-center">
                    {algo === "MD5" && "MD5 已不再安全，建議僅用於校驗而非加密。"}
                    {algo === "SHA1" && "SHA-1 已被證明存在碰撞風險，請謹慎使用。"}
                    {algo === "SHA256" && "SHA-256 是目前最通用的安全雜湊標準。"}
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
