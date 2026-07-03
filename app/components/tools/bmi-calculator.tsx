"use client";

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Activity } from "lucide-react"
import { useMemo, useState } from "react"

function whoCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "體重過輕", color: "bg-sky-600 hover:bg-sky-700" };
  if (bmi < 24) return { label: "正常範圍", color: "bg-emerald-600 hover:bg-emerald-700" };
  if (bmi < 27) return { label: "過重", color: "bg-amber-600 hover:bg-amber-700" };
  if (bmi < 30) return { label: "輕度肥胖", color: "bg-orange-600 hover:bg-orange-700" };
  if (bmi < 35) return { label: "中度肥胖", color: "bg-red-600 hover:bg-red-700" };
  return { label: "重度肥胖", color: "bg-red-700 hover:bg-red-800" };
}

function militaryCategory(bmi: number): string {
  if (bmi < 15 || bmi > 35) return "體位判定可能為「免役」";
  if ((bmi >= 15 && bmi < 16.5) || (bmi > 32 && bmi <= 35)) return "體位判定可能為「替代役」";
  return "體位判定可能為「常備役」";
}

export default function BmiCalculator() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");

  const bmi = useMemo(() => {
    const h = Number(height) / 100;
    const w = Number(weight);
    if (!h || !w || h <= 0 || w <= 0) return null;
    return Math.round((w / (h * h)) * 10) / 10;
  }, [height, weight]);

  const who = bmi !== null ? whoCategory(bmi) : null;

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-3 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            輸入身高體重
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500">身高（公分）</label>
              <Input value={height} onChange={(e) => setHeight(e.target.value.replace(/[^\d.]/g, ""))} className="font-mono h-11 bg-zinc-950 border-zinc-800" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500">體重（公斤）</label>
              <Input value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^\d.]/g, ""))} className="font-mono h-11 bg-zinc-950 border-zinc-800" />
            </div>
          </div>

          {bmi !== null && who && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-zinc-100 font-mono">{bmi}</span>
                <Badge className={`${who.color} text-white border-none`}>{who.label}</Badge>
              </div>
              <p className="text-sm text-zinc-400">{militaryCategory(bmi)}</p>
            </div>
          )}

          <p className="text-xs text-zinc-500 border-t border-zinc-800/50 pt-3">
            兵役體位判定僅供參考，依現行「體位區分標準」（112 年 5 月 30 日修正生效）之 BMI 門檻換算，
            實際體位另需綜合身高、血壓等其他體檢項目，且國防部已於 2025 年底預告修正草案（如免役門檻擬調整為 BMI &gt; 45），
            正式結果請以體檢現場鑑測及役政司最新公告為準。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
