"use client";

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Phone, XCircle } from "lucide-react"
import { useMemo, useState } from "react"

interface AreaCode {
  code: string;
  region: string;
  lengths: number[];
}

const AREA_CODES: AreaCode[] = [
  { code: "0826", region: "烏坵", lengths: [4] },
  { code: "0836", region: "馬祖", lengths: [5] },
  { code: "037", region: "苗栗", lengths: [6] },
  { code: "049", region: "南投", lengths: [6, 7] },
  { code: "089", region: "台東", lengths: [6] },
  { code: "082", region: "金門", lengths: [5, 6] },
  { code: "02", region: "台北/新北/基隆", lengths: [7, 8] },
  { code: "03", region: "桃園/新竹/宜蘭/花蓮", lengths: [7, 8] },
  { code: "04", region: "台中/彰化", lengths: [7, 8] },
  { code: "05", region: "雲林/嘉義", lengths: [7] },
  { code: "06", region: "台南/澎湖", lengths: [7] },
  { code: "07", region: "高雄", lengths: [7, 8] },
  { code: "08", region: "屏東", lengths: [7] },
].sort((a, b) => b.code.length - a.code.length);

export type PhoneResult =
  | { kind: "mobile"; valid: true }
  | { kind: "landline"; valid: true; region: string }
  | { kind: "unknown"; valid: false };

export function checkPhone(raw: string): PhoneResult {
  const digits = raw.replace(/[^\d]/g, "");

  if (/^09\d{8}$/.test(digits)) {
    return { kind: "mobile", valid: true };
  }

  for (const area of AREA_CODES) {
    if (digits.startsWith(area.code)) {
      const rest = digits.slice(area.code.length);
      if (area.lengths.includes(rest.length)) {
        return { kind: "landline", valid: true, region: area.region };
      }
    }
  }

  return { kind: "unknown", valid: false };
}

export default function PhoneValidator() {
  const [value, setValue] = useState("");

  const result = useMemo(() => (value ? checkPhone(value) : null), [value]);

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-3 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            輸入手機或市話號碼
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="例如: 0912345678 或 02-12345678"
            className="font-mono text-lg h-12 bg-zinc-950 border-zinc-800 tracking-wide"
          />

          {result && (
            result.valid ? (
              result.kind === "mobile" ? (
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 有效手機門號格式
                </Badge>
              ) : (
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 有效市話格式（{result.region}）
                </Badge>
              )
            ) : (
              <Badge className="bg-red-600 hover:bg-red-700 text-white border-none gap-1.5">
                <XCircle className="w-3.5 h-3.5" /> 無法辨識的號碼格式
              </Badge>
            )
          )}

          <p className="text-xs text-zinc-500">
            僅檢查號碼「格式」是否符合台灣電信編碼規則，非即時號碼資料庫查詢，無法判斷該號碼是否確實已被使用。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
