"use client";

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, IdCard, XCircle } from "lucide-react"
import { useMemo, useState } from "react"

const LETTER_MAP: Record<string, number> = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34, J: 18,
  K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25, S: 26, T: 27,
  U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33,
};

const DIGIT_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 1];

export function isValidTaiwanId(raw: string): boolean {
  const id = raw.trim().toUpperCase();
  if (!/^[A-Z]\d{9}$/.test(id)) return false;

  const letterValue = LETTER_MAP[id[0]];
  const x1 = Math.floor(letterValue / 10);
  const x2 = letterValue % 10;
  const digits = id.slice(1).split("").map(Number);

  let sum = x1 + x2 * 9;
  for (let i = 0; i < 8; i++) sum += digits[i] * DIGIT_WEIGHTS[i];
  sum += digits[8];

  return sum % 10 === 0;
}

function genderLabel(id: string): string | null {
  if (!/^[A-Z]\d{9}$/.test(id.toUpperCase())) return null;
  const g = id[1];
  if (g === "1") return "男性";
  if (g === "2") return "女性";
  if (g === "8" || g === "9") return "新式戶籍整合證號（無性別區分）";
  return null;
}

export default function IdNumberValidator() {
  const [value, setValue] = useState("");

  const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 10);
  const isComplete = /^[A-Z]\d{9}$/.test(cleaned);
  const isValid = useMemo(() => (isComplete ? isValidTaiwanId(cleaned) : null), [cleaned, isComplete]);
  const gender = isComplete ? genderLabel(cleaned) : null;

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-3 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <IdCard className="w-4 h-4" />
            輸入身分證字號
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, 10))}
            placeholder="例如: F121955337"
            className="font-mono text-lg h-12 bg-zinc-950 border-zinc-800 tracking-widest uppercase"
          />

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {isComplete ? (
                isValid ? (
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 檢查碼正確
                  </Badge>
                ) : (
                  <Badge className="bg-red-600 hover:bg-red-700 text-white border-none gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> 檢查碼錯誤
                  </Badge>
                )
              ) : (
                <span className="text-xs text-zinc-500">
                  {value.length > 0 ? "格式須為 1 個英文字母 + 9 位數字" : "請輸入 10 碼身分證字號"}
                </span>
              )}
              {isValid && gender && (
                <span className="text-xs text-zinc-500">性別碼：{gender}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
