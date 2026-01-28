"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import CryptoJS from "crypto-js"
import { AlertCircle, CheckCircle2, Copy, Key, RefreshCw, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

// 預設 Header
const DEFAULT_HEADER = `{
  "alg": "HS256",
  "typ": "JWT"
}`;

// 預設 Payload
const DEFAULT_PAYLOAD = `{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": ${Math.floor(Date.now() / 1000)},
  "admin": true
}`;

export default function JwtEncoder() {
  const [headerStr, setHeaderStr] = useState(DEFAULT_HEADER);
  const [payloadStr, setPayloadStr] = useState(DEFAULT_PAYLOAD);
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  // --- 輔助函數: Base64Url 編碼 ---
  // JWT 使用的是 Base64Url (不帶 padding '=', '+' 變 '-', '/' 變 '_')
  const base64UrlEncode = (source: string) => {
    const encodedWord = CryptoJS.enc.Utf8.parse(source);
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
    return encoded
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const signToken = () => {
    try {
      // 1. 驗證 JSON 格式
      JSON.parse(headerStr);
      JSON.parse(payloadStr);
      setError(null);

      // 2. 編碼 Header & Payload
      const encodedHeader = base64UrlEncode(headerStr);
      const encodedPayload = base64UrlEncode(payloadStr);

      // 3. 準備簽名內容
      const unsignedToken = `${encodedHeader}.${encodedPayload}`;

      // 4. 簽名 (HMAC SHA256)
      // 注意：這裡只實作 HS256，因為這是最常用的對稱加密
      const signature = CryptoJS.HmacSHA256(unsignedToken, secret);
      const encodedSignature = signature.toString(CryptoJS.enc.Base64)
        .replace(/=+$/, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      // 5. 組合
      setToken(`${unsignedToken}.${encodedSignature}`);
    } catch (err) {
      setError("JSON 格式錯誤，請檢查語法 (引號、逗號)");
      setToken("");
    }
  };

  // 當輸入改變時自動計算
  useEffect(() => {
    signToken();
  }, [headerStr, payloadStr, secret]);

  // 更新 Payload 時間戳
  const refreshTimestamp = () => {
    try {
      const obj = JSON.parse(payloadStr);
      obj.iat = Math.floor(Date.now() / 1000);
      setPayloadStr(JSON.stringify(obj, null, 2));
      toast.success("時間戳已更新為現在");
    } catch (e) {
      toast.error("無法更新時間戳：Payload JSON 格式錯誤");
    }
  };

  const copyToken = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    toast.success("JWT 已複製");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* === 左側：配置區 (Input) === */}
      <div className="space-y-6">

        {/* Header Input */}
        <Card className="border-red-900/30 bg-[#1e1e1e]">
          <CardHeader className="py-2 px-4 border-b border-red-900/20 bg-red-950/10 flex flex-row items-center justify-between">
             <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Header</span>
             <Badge variant="outline" className="text-[10px] border-red-900 text-red-400">JSON</Badge>
          </CardHeader>
          <CardContent className="p-0">
             <Textarea
               value={headerStr}
               onChange={(e) => setHeaderStr(e.target.value)}
               className="min-h-[100px] border-0 bg-transparent font-mono text-sm text-red-100 focus-visible:ring-0 resize-none p-4"
               spellCheck={false}
             />
          </CardContent>
        </Card>

        {/* Payload Input */}
        <Card className="border-purple-900/30 bg-[#1e1e1e] shadow-[0_0_15px_rgba(168,85,247,0.05)]">
          <CardHeader className="py-2 px-4 border-b border-purple-900/20 bg-purple-950/10 flex flex-row items-center justify-between">
             <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Payload</span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={refreshTimestamp}
                    className="h-5 w-5 text-purple-400/50 hover:text-purple-400"
                    title="更新 iat 為現在時間"
                >
                    <RefreshCw className="w-3 h-3" />
                </Button>
             </div>
             <Badge variant="outline" className="text-[10px] border-purple-900 text-purple-400">JSON</Badge>
          </CardHeader>
          <CardContent className="p-0">
             <Textarea
               value={payloadStr}
               onChange={(e) => setPayloadStr(e.target.value)}
               className="min-h-[200px] border-0 bg-transparent font-mono text-sm text-purple-100 focus-visible:ring-0 resize-none p-4"
               spellCheck={false}
             />
          </CardContent>
        </Card>

        {/* Secret Input */}
        <Card className="border-blue-900/30 bg-[#1e1e1e]">
           <CardHeader className="py-2 px-4 border-b border-blue-900/20 bg-blue-950/10">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Verify Signature</span>
           </CardHeader>
           <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-950/30 rounded border border-blue-900/30">
                    <Key className="w-4 h-4 text-blue-400" />
                 </div>
                 <Input
                   value={secret}
                   onChange={(e) => setSecret(e.target.value)}
                   className="font-mono text-sm bg-zinc-950 border-zinc-800 text-blue-100 placeholder:text-zinc-600 focus-visible:ring-blue-900/50"
                   placeholder="Enter your secret key"
                 />
              </div>
           </CardContent>
        </Card>

      </div>

      {/* === 右側：結果區 (Output) === */}
      <div className="flex flex-col h-full">
         <Card className={`border-zinc-800 bg-zinc-900/50 flex flex-col h-full ${error ? "border-red-900/50" : ""}`}>
            <CardHeader className="pb-4 border-b border-zinc-800/50">
                <CardTitle className="text-sm font-medium text-zinc-400 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        Encoded Token
                    </div>
                    {error ? (
                        <div className="flex items-center gap-2 text-red-400 text-xs animate-pulse">
                            <AlertCircle className="w-3 h-3" /> Syntax Error
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-green-500 text-xs">
                             <CheckCircle2 className="w-3 h-3" /> Ready
                        </div>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative group">
                <Textarea
                    readOnly
                    value={token}
                    className="h-full min-h-[400px] border-0 bg-transparent resize-none focus-visible:ring-0 p-6 font-mono text-base break-all text-zinc-300 leading-relaxed"
                />
                {!error && token && (
                    <Button
                        onClick={copyToken}
                        className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Copy className="mr-2 h-4 w-4" /> 複製 Token
                    </Button>
                )}
            </CardContent>
            {/* 顏色圖例 */}
            <div className="p-4 border-t border-zinc-800 flex gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Header
                </div>
                <div className="flex items-center gap-1.5 text-purple-400">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Payload
                </div>
                <div className="flex items-center gap-1.5 text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Signature
                </div>
            </div>
         </Card>
      </div>

    </div>
  );
}
