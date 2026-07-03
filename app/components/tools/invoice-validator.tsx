"use client";

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Receipt, XCircle } from "lucide-react"
import { useMemo, useState } from "react"

export function isValidInvoiceFormat(raw: string): boolean {
  const cleaned = raw.trim().toUpperCase().replace(/-/g, "");
  return /^[A-Z]{2}\d{8}$/.test(cleaned);
}

export default function InvoiceValidator() {
  const [value, setValue] = useState("");

  const cleaned = value.trim().toUpperCase();
  const isComplete = cleaned.replace(/-/g, "").length === 10;
  const isValid = useMemo(() => (isComplete ? isValidInvoiceFormat(cleaned) : null), [cleaned, isComplete]);

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-3 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            輸入統一發票號碼
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, 11))}
            placeholder="例如: AB-12345678"
            className="font-mono text-lg h-12 bg-zinc-950 border-zinc-800 tracking-widest uppercase"
          />

          {isComplete && (
            isValid ? (
              <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 格式正確（2 碼字軌 + 8 碼數字）
              </Badge>
            ) : (
              <Badge className="bg-red-600 hover:bg-red-700 text-white border-none gap-1.5">
                <XCircle className="w-3.5 h-3.5" /> 格式錯誤
              </Badge>
            )
          )}

          <p className="text-xs text-zinc-500">
            統一發票號碼公開規格僅為「2 碼英文字軌 + 8 碼數字」，財政部未公開對外的數學檢查碼，
            本工具僅能驗證格式是否正確，無法判斷該號碼是否為財政部實際核發或已中獎，請至財政部電子發票平台核對。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
