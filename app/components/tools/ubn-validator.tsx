"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, CheckCircle2, Copy, Dices, XCircle } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

const WEIGHTS = [1, 2, 1, 2, 1, 2, 4, 1];

function digitSum(n: number): number {
  return Math.floor(n / 10) + (n % 10);
}

export function isValidUBN(raw: string): boolean {
  if (!/^\d{8}$/.test(raw)) return false;
  const digits = raw.split("").map(Number);
  const products = digits.map((d, i) => d * WEIGHTS[i]);

  if (digits[6] === 7) {
    let base = 0;
    for (let i = 0; i < 8; i++) {
      if (i === 6) continue;
      base += digitSum(products[i]);
    }
    return base % 5 === 0 || (base + 1) % 5 === 0;
  }

  const sum = products.reduce((acc, p) => acc + digitSum(p), 0);
  return sum % 5 === 0;
}

function generateUBN(): string {
  for (; ;) {
    const first7 = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join("");
    for (let last = 0; last < 10; last++) {
      const candidate = first7 + last;
      if (isValidUBN(candidate)) return candidate;
    }
  }
}

export default function UbnValidator() {
  const [value, setValue] = useState("");

  const digitsOnly = value.replace(/\D/g, "").slice(0, 8);
  const isComplete = digitsOnly.length === 8;
  const isValid = useMemo(() => (isComplete ? isValidUBN(digitsOnly) : null), [digitsOnly, isComplete]);

  const handleChange = (v: string) => {
    setValue(v.replace(/\D/g, "").slice(0, 8));
  };

  const handleGenerate = () => {
    setValue(generateUBN());
  };

  const copyToClipboard = () => {
    if (!digitsOnly) return;
    navigator.clipboard.writeText(digitsOnly);
    toast.success("已複製統一編號");
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-3 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            輸入 8 碼統一編號
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Input
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="例如: 04595257"
            inputMode="numeric"
            className="font-mono text-lg h-12 bg-zinc-950 border-zinc-800 tracking-widest"
          />

          <div className="flex items-center justify-between">
            <div>
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
                  {value.length > 0 ? `已輸入 ${digitsOnly.length}/8 碼` : "請輸入 8 位數字"}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleGenerate} className="h-8 text-xs border-zinc-700 bg-zinc-800 hover:bg-zinc-700">
                <Dices className="w-3.5 h-3.5 mr-1.5" /> 隨機產生合法編號
              </Button>
              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!digitsOnly} className="h-8 text-xs border-zinc-700 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30">
                <Copy className="w-3.5 h-3.5 mr-1.5" /> 複製
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
