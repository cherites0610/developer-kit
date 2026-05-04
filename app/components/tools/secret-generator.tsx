"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Copy, RefreshCw } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

const randomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
};

const toHex = (bytes: Uint8Array): string =>
  Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");

const toBase64Url = (bytes: Uint8Array): string =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

const CHARSET = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const API_KEY_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function OutputRow({ value, onCopy, onRegenerate }: { value: string; onCopy: () => void; onRegenerate: () => void }) {
  return (
    <div className="space-y-2">
      <div
        className="w-full font-mono text-sm text-zinc-200 bg-zinc-950 border border-zinc-700 rounded-md px-3 py-3 break-all select-all cursor-text min-h-[48px] leading-relaxed"
      >
        {value}
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-zinc-100 text-zinc-900 hover:bg-white"
          onClick={onCopy}
        >
          <Copy className="w-4 h-4 mr-2" /> 複製並重新生成
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onRegenerate}
          className="border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
          title="重新生成"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function copyAndRegenerate(value: string, regenerate: () => void) {
  navigator.clipboard.writeText(value);
  toast.success("已複製到剪貼簿", { duration: 2000 });
  regenerate();
}

// === JWT Secret ===
function JwtSecretCard() {
  const [bits, setBits] = useState<"256" | "384" | "512">("256");
  const [format, setFormat] = useState<"hex" | "base64url">("hex");
  const [value, setValue] = useState("");

  const generate = useCallback(() => {
    const bytes = randomBytes(parseInt(bits) / 8);
    setValue(format === "hex" ? toHex(bytes) : toBase64Url(bytes));
  }, [bits, format]);

  useEffect(() => { generate(); }, [generate]);

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-zinc-100">JWT Secret</CardTitle>
        <p className="text-xs text-zinc-500">用於 HMAC 簽署 (HS256 / HS384 / HS512)</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-zinc-500">位元長度</Label>
            <RadioGroup value={bits} onValueChange={(v) => setBits(v as typeof bits)} className="flex gap-3">
              {(["256", "384", "512"] as const).map(b => (
                <div key={b} className="flex items-center gap-1.5">
                  <RadioGroupItem value={b} id={`jwt-${b}`} className="border-zinc-600" />
                  <Label htmlFor={`jwt-${b}`} className="text-xs text-zinc-300 cursor-pointer">{b}-bit</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-zinc-500">輸出格式</Label>
            <RadioGroup value={format} onValueChange={(v) => setFormat(v as typeof format)} className="flex gap-3">
              {(["hex", "base64url"] as const).map(f => (
                <div key={f} className="flex items-center gap-1.5">
                  <RadioGroupItem value={f} id={`jwt-fmt-${f}`} className="border-zinc-600" />
                  <Label htmlFor={`jwt-fmt-${f}`} className="text-xs text-zinc-300 cursor-pointer">{f}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <OutputRow value={value} onRegenerate={generate} onCopy={() => copyAndRegenerate(value, generate)} />
      </CardContent>
    </Card>
  );
}

// === API Key ===
function ApiKeyCard() {
  const [length, setLength] = useState(32);
  const [prefix, setPrefix] = useState("");
  const [value, setValue] = useState("");

  const generate = useCallback(() => {
    const bytes = randomBytes(length);
    const key = Array.from(bytes).map(b => API_KEY_CHARSET[b % API_KEY_CHARSET.length]).join("");
    setValue(prefix ? `${prefix}_${key}` : key);
  }, [length, prefix]);

  useEffect(() => { generate(); }, [generate]);

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-zinc-100">API Key</CardTitle>
        <p className="text-xs text-zinc-500">英數字隨機鍵，可加入服務前綴</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs text-zinc-500">長度</Label>
              <span className="text-xs font-mono text-zinc-400">{length}</span>
            </div>
            <Slider value={[length]} onValueChange={v => setLength(v[0])} min={16} max={64} step={4} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-zinc-500">前綴 (選填)</Label>
            <Input
              value={prefix}
              onChange={e => setPrefix(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
              placeholder="sk, pk, app..."
              className="h-8 text-xs bg-zinc-900 border-zinc-600 hover:border-zinc-400 focus:border-blue-500 transition-colors font-mono"
            />
          </div>
        </div>
        <OutputRow value={value} onRegenerate={generate} onCopy={() => copyAndRegenerate(value, generate)} />
      </CardContent>
    </Card>
  );
}

// === Password ===
function PasswordCard() {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [value, setValue] = useState("");

  const generate = useCallback(() => {
    const charset = [
      opts.upper ? CHARSET.upper : "",
      opts.lower ? CHARSET.lower : "",
      opts.numbers ? CHARSET.numbers : "",
      opts.symbols ? CHARSET.symbols : "",
    ].join("");

    if (!charset) { setValue(""); return; }

    const bytes = randomBytes(length);
    setValue(Array.from(bytes).map(b => charset[b % charset.length]).join(""));
  }, [length, opts]);

  useEffect(() => { generate(); }, [generate]);

  const toggle = (key: keyof typeof opts) => {
    const next = { ...opts, [key]: !opts[key] };
    if (!Object.values(next).some(Boolean)) return;
    setOpts(next);
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-zinc-100">隨機密碼</CardTitle>
        <p className="text-xs text-zinc-500">符合複雜度要求的高強度密碼</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-xs text-zinc-500">長度</Label>
            <span className="text-xs font-mono text-zinc-400">{length}</span>
          </div>
          <Slider value={[length]} onValueChange={v => setLength(v[0])} min={8} max={64} step={1} />
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {([
            ["upper", "大寫 A-Z"],
            ["lower", "小寫 a-z"],
            ["numbers", "數字 0-9"],
            ["symbols", "符號 !@#..."],
          ] as const).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`pw-${key}`} className="text-xs text-zinc-400 cursor-pointer">{label}</Label>
              <Switch id={`pw-${key}`} checked={opts[key]} onCheckedChange={() => toggle(key)} />
            </div>
          ))}
        </div>
        <OutputRow value={value} onRegenerate={generate} onCopy={() => copyAndRegenerate(value, generate)} />
      </CardContent>
    </Card>
  );
}

// === AES Key ===
function AesKeyCard() {
  const [bits, setBits] = useState<"128" | "192" | "256">("256");
  const [value, setValue] = useState("");

  const generate = useCallback(() => {
    setValue(toHex(randomBytes(parseInt(bits) / 8)));
  }, [bits]);

  useEffect(() => { generate(); }, [generate]);

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-zinc-100">AES 金鑰</CardTitle>
        <p className="text-xs text-zinc-500">對稱加密金鑰，十六進位格式輸出</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label className="text-xs text-zinc-500">金鑰長度</Label>
          <RadioGroup value={bits} onValueChange={(v) => setBits(v as typeof bits)} className="flex gap-4">
            {(["128", "192", "256"] as const).map(b => (
              <div key={b} className="flex items-center gap-1.5">
                <RadioGroupItem value={b} id={`aes-${b}`} className="border-zinc-600" />
                <Label htmlFor={`aes-${b}`} className="text-xs text-zinc-300 cursor-pointer">AES-{b}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <OutputRow value={value} onRegenerate={generate} onCopy={() => copyAndRegenerate(value, generate)} />
      </CardContent>
    </Card>
  );
}

export default function SecretGenerator() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <JwtSecretCard />
      <ApiKeyCard />
      <PasswordCard />
      <AesKeyCard />
    </div>
  );
}
