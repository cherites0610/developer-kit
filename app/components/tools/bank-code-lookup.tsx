"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Landmark } from "lucide-react"
import { useMemo, useState } from "react"

interface Bank {
  code: string;
  name: string;
}

const BANKS: Bank[] = [
  { code: "004", name: "台灣銀行" },
  { code: "005", name: "台灣土地銀行" },
  { code: "006", name: "合作金庫商業銀行" },
  { code: "007", name: "第一商業銀行" },
  { code: "008", name: "華南商業銀行" },
  { code: "009", name: "彰化商業銀行" },
  { code: "011", name: "上海商業儲蓄銀行" },
  { code: "012", name: "台北富邦商業銀行" },
  { code: "013", name: "國泰世華商業銀行" },
  { code: "016", name: "高雄銀行" },
  { code: "017", name: "兆豐國際商業銀行" },
  { code: "021", name: "花旗（台灣）商業銀行" },
  { code: "025", name: "首都銀行" },
  { code: "050", name: "台灣中小企業銀行" },
  { code: "052", name: "渣打國際商業銀行" },
  { code: "053", name: "台中商業銀行" },
  { code: "054", name: "京城商業銀行" },
  { code: "081", name: "滙豐（台灣）商業銀行" },
  { code: "101", name: "瑞興商業銀行" },
  { code: "102", name: "華泰商業銀行" },
  { code: "103", name: "台灣新光商業銀行" },
  { code: "108", name: "陽信商業銀行" },
  { code: "118", name: "板信商業銀行" },
  { code: "147", name: "三信商業銀行" },
  { code: "700", name: "中華郵政" },
  { code: "803", name: "聯邦商業銀行" },
  { code: "805", name: "遠東國際商業銀行" },
  { code: "806", name: "元大商業銀行" },
  { code: "807", name: "永豐商業銀行" },
  { code: "808", name: "玉山商業銀行" },
  { code: "809", name: "凱基商業銀行" },
  { code: "810", name: "星展（台灣）商業銀行" },
  { code: "812", name: "台新國際商業銀行" },
  { code: "815", name: "日盛國際商業銀行" },
  { code: "816", name: "安泰商業銀行" },
  { code: "822", name: "中國信託商業銀行" },
];

export default function BankCodeLookup() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BANKS;
    return BANKS.filter((b) => b.code.includes(q) || b.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="pb-3 border-b border-zinc-800/50">
          <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            搜尋銀行代碼或名稱
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="輸入代碼（如 007）或銀行名稱（如 玉山）"
            className="h-11 bg-zinc-950 border-zinc-800"
          />

          <div className="max-h-[420px] overflow-y-auto rounded-md border border-zinc-800 divide-y divide-zinc-800/60">
            {results.length === 0 ? (
              <p className="p-4 text-sm text-zinc-500">找不到符合的銀行</p>
            ) : (
              results.map((b) => (
                <div key={b.code} className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-900/60">
                  <span className="text-sm text-zinc-200">{b.name}</span>
                  <span className="font-mono text-sm text-zinc-500">{b.code}</span>
                </div>
              ))
            )}
          </div>

          <p className="text-xs text-zinc-500">
            僅收錄常見金融機構代碼，如有異動請以財金資訊公司或各銀行官網最新公告為準。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
