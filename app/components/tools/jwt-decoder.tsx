"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { jwtDecode } from "jwt-decode"
import { AlertTriangle, CheckCircle2, Clock, Copy, RotateCcw, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface DecodedPayload {
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<string | null>(null);
  const [payload, setPayload] = useState<string | null>(null);
  const [timestamps, setTimestamps] = useState<{ iat?: string; exp?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatUnixTime = (unixSeconds: number | undefined): string | undefined => {
    if (unixSeconds === undefined) return undefined;
    return new Date(unixSeconds * 1000).toLocaleString();
  };

  useEffect(() => {
    if (!token.trim()) {
      setHeader(null);
      setPayload(null);
      setTimestamps(null);
      setError(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error("無效的 JWT 格式");
      }

      const decodedHeader = jwtDecode(token, { header: true });
      setHeader(JSON.stringify(decodedHeader, null, 2));

      const decodedPayload = jwtDecode<DecodedPayload>(token);
      setPayload(JSON.stringify(decodedPayload, null, 2));

      setTimestamps({
        iat: formatUnixTime(decodedPayload.iat),
        exp: formatUnixTime(decodedPayload.exp)
      });

      setError(null);
    } catch (err) {
      setError("無法解析 Token，請檢查格式是否正確。");
      setHeader(null);
      setPayload(null);
      setTimestamps(null);
    }
  }, [token]);

  const copyToClipboard = (text: string | null, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} 已複製`);
  };

  const clearAll = () => {
    setToken("");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        <Card className="border-zinc-800 bg-zinc-900/50 flex flex-col h-full">
          <CardHeader className="pb-4 border-b border-zinc-800/50">
            <CardTitle className="text-sm font-medium text-zinc-400 flex items-center justify-between">
              <div className="flex items-center gap-2">Encoded Token</div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clearAll} className="h-6 px-2 text-xs text-zinc-500 hover:text-red-400">
                  <RotateCcw className="w-3 h-3 mr-1" /> 重置
                </Button>
                <Badge variant="outline" className="text-green-500 border-green-900/50 bg-green-900/10 text-[10px] px-2 py-0.5">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Client-Side Only
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <Textarea
              placeholder="貼上 JWT (eyJhbGci...)"
              className="min-h-100 h-full border-0 bg-transparent resize-none focus-visible:ring-0 p-6 font-mono text-base break-all text-zinc-200 placeholder:text-zinc-600 leading-relaxed"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </CardContent>
          <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-500 flex justify-between">
            <span>Status: {error ? "Invalid" : (token ? "Valid Format" : "Waiting")}</span>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="p-4 rounded-lg bg-red-950/20 border border-red-900/50 text-red-400 flex items-center gap-3 text-sm">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* 時間解析顯示區 */}
        {timestamps && (timestamps.iat || timestamps.exp) && (
          <div className="grid grid-cols-2 gap-4">
            {timestamps.iat && (
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Issued At (iat)
                </div>
                <div className="text-xs text-zinc-300 font-mono">{timestamps.iat}</div>
              </div>
            )}
            {timestamps.exp && (
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Expiration (exp)
                </div>
                <div className="text-xs text-zinc-300 font-mono">{timestamps.exp}</div>
              </div>
            )}
          </div>
        )}

        <Card className="border-red-900/30 bg-[#1e1e1e]">
          <CardHeader className="py-2 px-4 border-b border-red-900/20 bg-red-950/10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Header & Algorithm</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400/50 hover:text-red-400" onClick={() => copyToClipboard(header, "Header")}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="p-4 text-sm font-mono text-red-200 overflow-x-auto">
              {header || <span className="text-zinc-700 opacity-50">waiting for input...</span>}
            </pre>
          </CardContent>
        </Card>

        <Card className="border-purple-900/30 bg-[#1e1e1e] shadow-[0_0_15px_rgba(168,85,247,0.05)]">
          <CardHeader className="py-2 px-4 border-b border-purple-900/20 bg-purple-950/10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Payload (Data)</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-purple-400/50 hover:text-purple-400" onClick={() => copyToClipboard(payload, "Payload")}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="p-4 text-sm font-mono text-purple-200 overflow-x-auto min-h-37.5">
              {payload || <span className="text-zinc-700 opacity-50">waiting for input...</span>}
            </pre>
          </CardContent>
        </Card>

        <Card className="border-blue-900/30 bg-[#1e1e1e]">
          <CardHeader className="py-2 px-4 border-b border-blue-900/20 bg-blue-950/10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Signature</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-xs text-blue-300/70 font-mono break-all">
              {token.split('.')[2] ? (
                <>
                  HMACSHA256(<br/>
                  &nbsp;&nbsp;base64UrlEncode(header) + "." +<br/>
                  &nbsp;&nbsp;base64UrlEncode(payload),<br/>
                  &nbsp;&nbsp;<span className="text-blue-500 font-bold">your-256-bit-secret</span><br/>
                  )
                </>
              ) : <span className="text-zinc-700 opacity-50">waiting for input...</span>}
            </div>
            {token && !error && (
              <div className="mt-2 flex items-center gap-2 text-[10px] text-zinc-500">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>Format valid (Signature verification requires secret)</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
