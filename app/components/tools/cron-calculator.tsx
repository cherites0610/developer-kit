"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CronExpressionParser } from "cron-parser"
import cronstrue from "cronstrue/i18n"
import { format, formatDistanceToNow } from "date-fns"
import { zhTW } from "date-fns/locale"
import { CalendarClock, CheckCircle2, Copy, ListChecks, RefreshCw, Wand2, XCircle } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

interface FieldHint {
  label: string;
  value: string;
}

interface FieldDef {
  key: string;
  label: string;
  hints: FieldHint[];
}

const FIELD_DEFS: FieldDef[] = [
  {
    key: "minute",
    label: "分鐘",
    hints: [
      { label: "每分鐘", value: "*" },
      { label: "整點 (0分)", value: "0" },
      { label: "每 15 分", value: "*/15" },
      { label: "每 30 分", value: "*/30" },
    ],
  },
  {
    key: "hour",
    label: "小時",
    hints: [
      { label: "每小時", value: "*" },
      { label: "凌晨 0 點", value: "0" },
      { label: "上午 9 點", value: "9" },
      { label: "每 6 小時", value: "*/6" },
    ],
  },
  {
    key: "day",
    label: "日 (每月)",
    hints: [
      { label: "每天", value: "*" },
      { label: "1 號", value: "1" },
      { label: "15 號", value: "15" },
    ],
  },
  {
    key: "month",
    label: "月",
    hints: [
      { label: "每月", value: "*" },
      { label: "1 月", value: "1" },
      { label: "每季 (1,4,7,10)", value: "1,4,7,10" },
    ],
  },
  {
    key: "weekday",
    label: "星期",
    hints: [
      { label: "每天", value: "*" },
      { label: "工作日 (一~五)", value: "1-5" },
      { label: "週末", value: "0,6" },
      { label: "每週一", value: "1" },
    ],
  },
];

const PRESETS = [
  { label: "每分鐘", expr: "* * * * *" },
  { label: "每小時整點", expr: "0 * * * *" },
  { label: "每天午夜", expr: "0 0 * * *" },
  { label: "每天早上 9 點", expr: "0 9 * * *" },
  { label: "工作日早上 9 點", expr: "0 9 * * 1-5" },
  { label: "每月 1 號凌晨", expr: "0 0 1 * *" },
  { label: "工作日每 15 分鐘", expr: "*/15 9-18 * * 1-5" },
  { label: "每年 1/1", expr: "0 0 1 1 *" },
];

const TIMEZONES = [
  "Asia/Taipei",
  "Asia/Hong_Kong",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Singapore",
  "UTC",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
];

const NEXT_RUN_COUNTS = [5, 10, 20];

export default function CronCalculator() {
  const [expression, setExpression] = useState("0 9 * * 1-5");
  const [timezone, setTimezone] = useState<string>(() => {
    if (typeof Intl === "undefined") return "UTC";
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  });
  const [nextCount, setNextCount] = useState<number>(8);

  const trimmed = expression.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);
  const fieldValues = parts.length === 5 ? parts : null;
  const isSixField = parts.length === 6;

  const result = useMemo(() => {
    if (!trimmed) {
      return { valid: false as const, human: "", next: [] as Date[], error: "請輸入 Cron 表達式" };
    }
    try {
      const interval = CronExpressionParser.parse(trimmed, { tz: timezone, currentDate: new Date() });
      const nextDates: Date[] = [];
      for (let i = 0; i < nextCount; i++) {
        nextDates.push(interval.next().toDate());
      }
      let human = "";
      try {
        human = cronstrue.toString(trimmed, { locale: "zh_TW" });
      } catch {
        human = "";
      }
      return { valid: true as const, human, next: nextDates, error: null };
    } catch (e) {
      return {
        valid: false as const,
        human: "",
        next: [] as Date[],
        error: e instanceof Error ? e.message : "無法解析此 Cron 表達式",
      };
    }
  }, [trimmed, timezone, nextCount]);

  const updateField = (index: number, value: string) => {
    const base = fieldValues ?? ["*", "*", "*", "*", "*"];
    const next = [...base];
    next[index] = value.trim() || "*";
    setExpression(next.join(" "));
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const copyNextRuns = () => {
    const text = result.next
      .map((d) => format(d, "yyyy-MM-dd HH:mm:ss (EEEE)", { locale: zhTW }))
      .join("\n");
    copyToClipboard(text, "已複製執行時間清單");
  };

  return (
    <div className="space-y-6">
      {/* 表達式輸入 + 驗證狀態 */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-4 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-blue-500" />
            Cron 表達式
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="* * * * *"
              className="font-mono text-lg bg-zinc-950 border-zinc-800 text-white focus:border-blue-500"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800 shrink-0"
                onClick={() => copyToClipboard(trimmed, "已複製表達式")}
              >
                <Copy className="w-4 h-4 mr-2" /> 複製
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800 shrink-0"
                onClick={() => setExpression("0 9 * * 1-5")}
              >
                <RefreshCw className="w-4 h-4 mr-2" /> 重置
              </Button>
            </div>
          </div>

          {result.valid ? (
            <div className="flex items-start gap-2 p-3 rounded-lg border border-green-900/50 bg-green-900/10">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <Badge className="bg-green-600 hover:bg-green-700 text-white border-none">表達式有效</Badge>
                {result.human && (
                  <p className="text-sm text-zinc-300">
                    這代表：<span className="text-white font-medium">{result.human}</span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 p-3 rounded-lg border border-red-900/50 bg-red-900/10">
              <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <Badge variant="destructive" className="border-none">語法錯誤</Badge>
                <p className="text-sm text-red-400">{result.error}</p>
              </div>
            </div>
          )}

          {/* 常用範本 */}
          <div className="space-y-2">
            <Label className="text-xs text-zinc-500 flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5" /> 常用範本
            </Label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setExpression(preset.expr)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                    trimmed === preset.expr
                      ? "border-blue-500 bg-blue-500/10 text-blue-400"
                      : "border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 視覺化欄位編輯器 */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-4 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-purple-500" />
            視覺化欄位編輯器
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {isSixField && (
            <p className="text-xs text-yellow-500 mb-4">
              偵測到 6 欄位（含秒）格式，視覺化編輯器僅支援標準 5 欄位，請直接於上方文字框編輯。
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {FIELD_DEFS.map((field, index) => (
              <div key={field.key} className="space-y-2">
                <Label className="text-xs text-zinc-500">{field.label}</Label>
                <Input
                  value={fieldValues ? fieldValues[index] : ""}
                  onChange={(e) => updateField(index, e.target.value)}
                  placeholder="*"
                  disabled={!fieldValues}
                  className="font-mono bg-zinc-950 border-zinc-800 text-center text-white focus:border-purple-500"
                />
                <div className="flex flex-wrap gap-1">
                  {field.hints.map((hint) => (
                    <button
                      key={hint.label}
                      disabled={!fieldValues}
                      onClick={() => updateField(index, hint.value)}
                      className="text-[10px] leading-tight px-1.5 py-1 rounded border border-zinc-800 bg-zinc-950/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {hint.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 下 N 次執行時間 */}
      <Card className="border-zinc-800 bg-[#1e1e1e]">
        <CardHeader className="pb-4 border-b border-zinc-800/50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-orange-500" />
              下 {nextCount} 次執行時間
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-44 h-8 bg-zinc-950 border-zinc-800 text-xs">
                  <SelectValue placeholder="時區" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz} value={tz} className="text-xs font-mono">
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={String(nextCount)} onValueChange={(v) => setNextCount(Number(v))}>
                <SelectTrigger className="w-20 h-8 bg-zinc-950 border-zinc-800 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NEXT_RUN_COUNTS.map((c) => (
                    <SelectItem key={c} value={String(c)} className="text-xs">
                      {c} 筆
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-zinc-700 hover:bg-zinc-800 text-xs"
                onClick={copyNextRuns}
                disabled={!result.valid}
              >
                <Copy className="w-3.5 h-3.5 mr-1.5" /> 複製清單
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {result.valid ? (
            <ol className="space-y-2">
              {result.next.map((d, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-600 w-5">{i + 1}</span>
                    <span className="font-mono text-zinc-100">
                      {format(d, "yyyy-MM-dd HH:mm:ss", { locale: zhTW })}
                    </span>
                    <span className="text-xs text-zinc-500">{format(d, "EEEE", { locale: zhTW })}</span>
                  </div>
                  <span className="text-xs text-blue-400 shrink-0">
                    {formatDistanceToNow(d, { locale: zhTW, addSuffix: true })}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-zinc-500 text-center py-8">請輸入有效的 Cron 表達式以查看執行時間。</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
