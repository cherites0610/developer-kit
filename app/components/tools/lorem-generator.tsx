"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoremIpsum } from "lorem-ipsum"
import { AlignLeft, Copy, FileCode, FileText, Hash, Languages, LucideIcon, RefreshCw, ShoppingCart, Type } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import {
  NumberDataType,
  generateChineseParagraphs,
  generateNumberData,
  generateOrders,
} from "./lorem-data"

type Mode = "latin" | "chinese" | "number" | "order";

const MODES: { key: Mode; label: string; icon: LucideIcon }[] = [
  { key: "latin", label: "拉丁假文", icon: Type },
  { key: "chinese", label: "中文假文", icon: Languages },
  { key: "number", label: "數字資料", icon: Hash },
  { key: "order", label: "模擬訂單", icon: ShoppingCart },
];

const NUMBER_TYPE_OPTIONS: { value: NumberDataType; label: string }[] = [
  { value: "phone", label: "手機號碼" },
  { value: "taxId", label: "統一編號" },
  { value: "creditCard", label: "信用卡號（測試用）" },
  { value: "orderNo", label: "訂單編號" },
  { value: "random", label: "純數字亂數" },
];

export default function LoremGenerator() {
  const [mode, setMode] = useState<Mode>("latin");
  const [regenSeed, setRegenSeed] = useState(0);

  // --- 拉丁 / 中文假文 共用設定 ---
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [lengthMode, setLengthMode] = useState<"short" | "medium" | "long">("medium");
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);

  // --- 數字資料設定 ---
  const [numberType, setNumberType] = useState<NumberDataType>("phone");
  const [numberCount, setNumberCount] = useState<number>(10);
  const [digitLength, setDigitLength] = useState<number>(10);

  // --- 模擬訂單設定 ---
  const [orderCount, setOrderCount] = useState<number>(10);

  const sentenceBounds = useMemo(() => {
    if (lengthMode === "short") return { min: 2, max: 5 };
    if (lengthMode === "long") return { min: 8, max: 15 };
    return { min: 4, max: 8 };
  }, [lengthMode]);

  const textOutput = useMemo(() => {
    if (mode === "latin") {
      const lorem = new LoremIpsum({
        sentencesPerParagraph: { max: sentenceBounds.max, min: sentenceBounds.min },
        wordsPerSentence: { max: 16, min: 4 },
      });
      const generated = lorem.generateParagraphs(paragraphs).split("\n");
      if (startWithLorem && generated.length > 0) {
        const firstPara = generated[0];
        if (!firstPara.startsWith("Lorem ipsum")) {
          const words = firstPara.split(" ");
          words.splice(0, 2, "Lorem", "ipsum", "dolor", "sit", "amet,");
          generated[0] = words.join(" ");
        }
      }
      return generated;
    }
    if (mode === "chinese") {
      return generateChineseParagraphs(paragraphs, sentenceBounds);
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, paragraphs, sentenceBounds, startWithLorem, regenSeed]);

  const numberOutput = useMemo(() => {
    if (mode !== "number") return [];
    return generateNumberData(numberType, numberCount, digitLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, numberType, numberCount, digitLength, regenSeed]);

  const orderOutput = useMemo(() => {
    if (mode !== "order") return [];
    return generateOrders(orderCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, orderCount, regenSeed]);

  const copyToClipboard = (text: string, message = "已複製") => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const copyTextOutput = (asHtml: boolean) => {
    const text = asHtml
      ? textOutput.map((p) => `<p>${p}</p>`).join("\n")
      : textOutput.join("\n\n");
    copyToClipboard(text, asHtml ? "HTML 代碼已複製" : "純文字已複製");
  };

  const copyNumberOutput = () => copyToClipboard(numberOutput.join("\n"), "已複製全部資料");

  const copyOrdersCsv = () => {
    const header = "訂單編號,客戶,商品,數量,單價,小計,日期,狀態";
    const rows = orderOutput.map(
      (o) => `${o.orderNo},${o.customer},${o.product},${o.quantity},${o.unitPrice},${o.subtotal},${o.date},${o.status}`
    );
    copyToClipboard([header, ...rows].join("\n"), "已複製 CSV");
  };

  const copyOrdersJson = () => copyToClipboard(JSON.stringify(orderOutput, null, 2), "已複製 JSON");

  return (
    <div className="space-y-6">
      {/* 資料類型切換 */}
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border transition-colors ${
              mode === m.key
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            <m.icon className="w-4 h-4" />
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左側：控制面板 */}
        <Card className="border-zinc-800 bg-zinc-900/50 h-fit">
          <CardHeader className="pb-4 border-b border-zinc-800/50">
            <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <AlignLeft className="w-4 h-4" />
              生成設定 (Settings)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {(mode === "latin" || mode === "chinese") && (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>段落數量 (Paragraphs)</Label>
                    <span className="text-sm font-mono text-blue-400">{paragraphs}</span>
                  </div>
                  <Slider
                    value={[paragraphs]}
                    onValueChange={(v) => setParagraphs(v[0])}
                    max={20}
                    min={1}
                    step={1}
                    className="py-2"
                  />
                </div>

                <div className="space-y-3">
                  <Label>段落長度 (Length)</Label>
                  <RadioGroup
                    value={lengthMode}
                    onValueChange={(v: string) => setLengthMode(v as "short" | "medium" | "long")}
                    className="grid grid-cols-3 gap-2"
                  >
                    {(["short", "medium", "long"] as const).map((v) => (
                      <div key={v}>
                        <RadioGroupItem value={v} id={v} className="peer sr-only" />
                        <Label
                          htmlFor={v}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-2 hover:bg-zinc-900 hover:text-white peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:text-blue-500 cursor-pointer text-xs capitalize"
                        >
                          {v}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {mode === "latin" && (
                  <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                    <Label htmlFor="start-lorem" className="text-sm cursor-pointer">
                      以 &quot;Lorem ipsum...&quot; 開頭
                    </Label>
                    <Switch id="start-lorem" checked={startWithLorem} onCheckedChange={setStartWithLorem} />
                  </div>
                )}
              </>
            )}

            {mode === "number" && (
              <>
                <div className="space-y-3">
                  <Label>資料類型</Label>
                  <RadioGroup
                    value={numberType}
                    onValueChange={(v: string) => setNumberType(v as NumberDataType)}
                    className="space-y-2"
                  >
                    {NUMBER_TYPE_OPTIONS.map((opt) => (
                      <div key={opt.value} className="flex items-center gap-2">
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value} className="cursor-pointer text-sm font-normal">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {numberType === "random" && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>位數</Label>
                      <span className="text-sm font-mono text-blue-400">{digitLength}</span>
                    </div>
                    <Slider
                      value={[digitLength]}
                      onValueChange={(v) => setDigitLength(v[0])}
                      max={20}
                      min={4}
                      step={1}
                      className="py-2"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>筆數</Label>
                    <span className="text-sm font-mono text-blue-400">{numberCount}</span>
                  </div>
                  <Slider
                    value={[numberCount]}
                    onValueChange={(v) => setNumberCount(v[0])}
                    max={50}
                    min={1}
                    step={1}
                    className="py-2"
                  />
                </div>
              </>
            )}

            {mode === "order" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>訂單筆數</Label>
                  <span className="text-sm font-mono text-blue-400">{orderCount}</span>
                </div>
                <Slider
                  value={[orderCount]}
                  onValueChange={(v) => setOrderCount(v[0])}
                  max={30}
                  min={1}
                  step={1}
                  className="py-2"
                />
              </div>
            )}

            <Button
              onClick={() => setRegenSeed((s) => s + 1)}
              variant="outline"
              className="w-full border-zinc-700 hover:bg-zinc-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> 重新生成
            </Button>
          </CardContent>
        </Card>

        {/* 右側：輸出結果 */}
        <div className="lg:col-span-2">
          {(mode === "latin" || mode === "chinese") && (
            <Tabs defaultValue="text" className="w-full h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <TabsList className="bg-zinc-900">
                  <TabsTrigger value="text" className="data-[state=active]:bg-zinc-800">
                    <FileText className="w-4 h-4 mr-2" /> Plain Text
                  </TabsTrigger>
                  <TabsTrigger value="html" className="data-[state=active]:bg-zinc-800">
                    <FileCode className="w-4 h-4 mr-2" /> HTML
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="text" className="flex-1 mt-0">
                <Card className="border-zinc-800 bg-[#1e1e1e] h-full min-h-125 flex flex-col relative group">
                  <CardContent className="p-6 font-serif text-lg text-zinc-300 leading-relaxed space-y-4 flex-1 overflow-y-auto max-h-[70vh]">
                    {textOutput.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </CardContent>
                  <Button
                    onClick={() => copyTextOutput(false)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Copy className="mr-2 h-4 w-4" /> 複製文字
                  </Button>
                </Card>
              </TabsContent>

              <TabsContent value="html" className="flex-1 mt-0">
                <Card className="border-zinc-800 bg-[#1e1e1e] h-full min-h-125 flex flex-col relative group">
                  <CardContent className="p-6 font-mono text-sm text-blue-200 leading-relaxed space-y-2 flex-1 overflow-y-auto max-h-[70vh]">
                    {textOutput.map((para, i) => (
                      <div key={i}>
                        <span className="text-zinc-500">&lt;p&gt;</span>
                        <span className="text-zinc-300">{para}</span>
                        <span className="text-zinc-500">&lt;/p&gt;</span>
                      </div>
                    ))}
                  </CardContent>
                  <Button
                    onClick={() => copyTextOutput(true)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Copy className="mr-2 h-4 w-4" /> 複製 HTML
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {mode === "number" && (
            <Card className="border-zinc-800 bg-[#1e1e1e] h-full min-h-125 flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-800/50">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  產生結果（{numberOutput.length} 筆）
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyNumberOutput}
                  className="border-zinc-700 hover:bg-zinc-800"
                >
                  <Copy className="w-4 h-4 mr-2" /> 複製全部
                </Button>
              </CardHeader>
              <CardContent className="p-4 flex-1 overflow-y-auto max-h-[70vh]">
                <div className="grid sm:grid-cols-2 gap-2">
                  {numberOutput.map((val, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 font-mono text-sm text-zinc-200"
                    >
                      <span className="truncate">{val}</span>
                      <button
                        onClick={() => copyToClipboard(val)}
                        className="text-zinc-500 hover:text-white shrink-0"
                        title="複製這筆"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {mode === "order" && (
            <Card className="border-zinc-800 bg-[#1e1e1e] h-full min-h-125 flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-800/50">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  模擬訂單（{orderOutput.length} 筆）
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyOrdersCsv}
                    className="border-zinc-700 hover:bg-zinc-800"
                  >
                    <Copy className="w-4 h-4 mr-2" /> CSV
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyOrdersJson}
                    className="border-zinc-700 hover:bg-zinc-800"
                  >
                    <Copy className="w-4 h-4 mr-2" /> JSON
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-auto max-h-[70vh]">
                <table className="w-full text-sm text-left">
                  <thead className="text-zinc-400 border-b border-zinc-800 sticky top-0 bg-[#1e1e1e]">
                    <tr>
                      <th className="py-2 px-3 font-medium">訂單編號</th>
                      <th className="py-2 px-3 font-medium">客戶</th>
                      <th className="py-2 px-3 font-medium">商品</th>
                      <th className="py-2 px-3 font-medium text-right">數量</th>
                      <th className="py-2 px-3 font-medium text-right">單價</th>
                      <th className="py-2 px-3 font-medium text-right">小計</th>
                      <th className="py-2 px-3 font-medium">日期</th>
                      <th className="py-2 px-3 font-medium">狀態</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {orderOutput.map((o, i) => (
                      <tr key={i} className="hover:bg-zinc-900/50">
                        <td className="py-2 px-3 font-mono text-blue-400 whitespace-nowrap">{o.orderNo}</td>
                        <td className="py-2 px-3 whitespace-nowrap">{o.customer}</td>
                        <td className="py-2 px-3 whitespace-nowrap">{o.product}</td>
                        <td className="py-2 px-3 text-right">{o.quantity}</td>
                        <td className="py-2 px-3 text-right font-mono">${o.unitPrice}</td>
                        <td className="py-2 px-3 text-right font-mono text-zinc-100">${o.subtotal}</td>
                        <td className="py-2 px-3 text-zinc-500 whitespace-nowrap">{o.date}</td>
                        <td className="py-2 px-3">
                          <Badge variant="outline" className="text-xs whitespace-nowrap">
                            {o.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
