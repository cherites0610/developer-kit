"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoremIpsum } from "lorem-ipsum"
import { AlignLeft, Copy, FileCode, FileText, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function LoremGenerator() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [lengthMode, setLengthMode] = useState<"short" | "medium" | "long">("medium");
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [output, setOutput] = useState<string[]>([]);

  // --- 核心生成邏輯 ---
  const generateText = () => {
    // 設定每段的句子數量範圍
    let sentenceBounds = { min: 4, max: 8 }; // medium
    if (lengthMode === "short") sentenceBounds = { min: 2, max: 5 };
    if (lengthMode === "long") sentenceBounds = { min: 8, max: 15 };

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: sentenceBounds.max,
        min: sentenceBounds.min
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });

    let generated = lorem.generateParagraphs(paragraphs).split("\n");

    // 處理 "Start with Lorem ipsum"
    if (startWithLorem && generated.length > 0) {
      const firstPara = generated[0];
      if (!firstPara.startsWith("Lorem ipsum")) {
        // 簡單替換開頭，確保語意通順比較難，這裡採用強制替換前幾個字
        const words = firstPara.split(" ");
        words.splice(0, 2, "Lorem", "ipsum", "dolor", "sit", "amet,");
        generated[0] = words.join(" ");
      }
    }

    setOutput(generated);
  };

  // 當參數改變時自動重新生成
  useEffect(() => {
    generateText();
  }, [paragraphs, lengthMode, startWithLorem]);

  // --- 複製功能 ---
  const copyToClipboard = (asHtml: boolean) => {
    let textToCopy = "";
    if (asHtml) {
      textToCopy = output.map(p => `<p>${p}</p>`).join("\n");
    } else {
      textToCopy = output.join("\n\n");
    }
    navigator.clipboard.writeText(textToCopy);
    toast.success(asHtml ? "HTML 代碼已複製" : "純文字已複製");
  };

  return (
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

          {/* 段落數量 */}
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

          {/* 段落長度 */}
          <div className="space-y-3">
            <Label>段落長度 (Length)</Label>
            <RadioGroup
                defaultValue="medium"
                value={lengthMode}
                onValueChange={(v: any) => setLengthMode(v)}
                className="grid grid-cols-3 gap-2"
            >
              <div>
                <RadioGroupItem value="short" id="short" className="peer sr-only" />
                <Label
                  htmlFor="short"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-2 hover:bg-zinc-900 hover:text-white peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:text-blue-500 cursor-pointer text-xs"
                >
                  Short
                </Label>
              </div>
              <div>
                <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                <Label
                  htmlFor="medium"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-2 hover:bg-zinc-900 hover:text-white peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:text-blue-500 cursor-pointer text-xs"
                >
                  Medium
                </Label>
              </div>
              <div>
                <RadioGroupItem value="long" id="long" className="peer sr-only" />
                <Label
                  htmlFor="long"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-2 hover:bg-zinc-900 hover:text-white peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:text-blue-500 cursor-pointer text-xs"
                >
                  Long
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* 開頭選項 */}
          <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-3">
            <Label htmlFor="start-lorem" className="text-sm cursor-pointer">
              以 "Lorem ipsum..." 開頭
            </Label>
            <Switch
              id="start-lorem"
              checked={startWithLorem}
              onCheckedChange={setStartWithLorem}
            />
          </div>

          <Button onClick={generateText} variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800">
             <RefreshCw className="mr-2 h-4 w-4" /> 重新生成
          </Button>

        </CardContent>
      </Card>

      {/* 右側：輸出結果 */}
      <div className="lg:col-span-2">
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

            {/* Plain Text Mode */}
            <TabsContent value="text" className="flex-1 mt-0">
                <Card className="border-zinc-800 bg-[#1e1e1e] h-full min-h-125 flex flex-col relative group">
                    <CardContent className="p-6 font-serif text-lg text-zinc-300 leading-relaxed space-y-4 flex-1 overflow-y-auto max-h-[70vh]">
                        {output.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </CardContent>
                    <Button
                        onClick={() => copyToClipboard(false)}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Copy className="mr-2 h-4 w-4" /> 複製文字
                    </Button>
                </Card>
            </TabsContent>

            {/* HTML Mode */}
            <TabsContent value="html" className="flex-1 mt-0">
                <Card className="border-zinc-800 bg-[#1e1e1e] h-full min-h-125 flex flex-col relative group">
                    <CardContent className="p-6 font-mono text-sm text-blue-200 leading-relaxed space-y-2 flex-1 overflow-y-auto max-h-[70vh]">
                        {output.map((para, i) => (
                            <div key={i}>
                                <span className="text-zinc-500">&lt;p&gt;</span>
                                <span className="text-zinc-300">{para}</span>
                                <span className="text-zinc-500">&lt;/p&gt;</span>
                            </div>
                        ))}
                    </CardContent>
                    <Button
                        onClick={() => copyToClipboard(true)}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Copy className="mr-2 h-4 w-4" /> 複製 HTML
                    </Button>
                </Card>
            </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
