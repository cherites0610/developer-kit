"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CalendarRange } from "lucide-react"
import { useState } from "react"

const ROC_OFFSET = 1911;

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function RocYearConverter() {
  const today = new Date();
  const [gYear, setGYear] = useState(String(today.getFullYear()));
  const [gMonth, setGMonth] = useState(String(today.getMonth() + 1));
  const [gDay, setGDay] = useState(String(today.getDate()));

  const [rYear, setRYear] = useState(String(today.getFullYear() - ROC_OFFSET));
  const [rMonth, setRMonth] = useState(String(today.getMonth() + 1));
  const [rDay, setRDay] = useState(String(today.getDate()));

  const syncFromGregorian = (y: string, m: string, d: string) => {
    setGYear(y); setGMonth(m); setGDay(d);
    const yn = Number(y);
    if (Number.isFinite(yn) && y !== "") {
      setRYear(String(yn - ROC_OFFSET));
      setRMonth(m);
      setRDay(d);
    }
  };

  const syncFromRoc = (y: string, m: string, d: string) => {
    setRYear(y); setRMonth(m); setRDay(d);
    const yn = Number(y);
    if (Number.isFinite(yn) && y !== "") {
      setGYear(String(yn + ROC_OFFSET));
      setGMonth(m);
      setGDay(d);
    }
  };

  const gYearNum = Number(gYear);
  const rYearNum = Number(rYear);
  const gValid = Number.isFinite(gYearNum) && gYear !== "";
  const rValid = Number.isFinite(rYearNum) && rYear !== "";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-3 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <CalendarRange className="w-4 h-4" />
            西元年
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <Input value={gYear} onChange={(e) => syncFromGregorian(e.target.value.replace(/\D/g, ""), gMonth, gDay)} placeholder="年" className="font-mono h-11 bg-zinc-950 border-zinc-800" />
            <Input value={gMonth} onChange={(e) => syncFromGregorian(gYear, e.target.value.replace(/\D/g, "").slice(0, 2), gDay)} placeholder="月" className="font-mono h-11 bg-zinc-950 border-zinc-800" />
            <Input value={gDay} onChange={(e) => syncFromGregorian(gYear, gMonth, e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="日" className="font-mono h-11 bg-zinc-950 border-zinc-800" />
          </div>
          {gValid && (
            <p className="text-sm text-zinc-500">
              {gYear}/{pad2(Number(gMonth) || 1)}/{pad2(Number(gDay) || 1)}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-3 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <CalendarRange className="w-4 h-4" />
            民國年
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <Input value={rYear} onChange={(e) => syncFromRoc(e.target.value.replace(/\D/g, ""), rMonth, rDay)} placeholder="年" className="font-mono h-11 bg-zinc-950 border-zinc-800" />
            <Input value={rMonth} onChange={(e) => syncFromRoc(rYear, e.target.value.replace(/\D/g, "").slice(0, 2), rDay)} placeholder="月" className="font-mono h-11 bg-zinc-950 border-zinc-800" />
            <Input value={rDay} onChange={(e) => syncFromRoc(rYear, rMonth, e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="日" className="font-mono h-11 bg-zinc-950 border-zinc-800" />
          </div>
          {rValid && (
            <p className="text-sm text-zinc-500">
              民國 {rYear}/{pad2(Number(rMonth) || 1)}/{pad2(Number(rDay) || 1)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
