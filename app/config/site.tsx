import {
  Clock,
  Database,
  FileJson,
  Fingerprint,
  Globe,
  Hash,
  Key,
  KeyRound,
  LayoutGrid,
  Link as LinkIcon,
  Lock,
  LucideIcon,
  ShieldCheck,
  Type,
} from "lucide-react"

export interface ToolItem {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: "new" | "hot" | "beta" | "coming-soon" | "stable";
  tags: string[];
  lastModified: string;
  related: string[];
}

export const TOOLS_CONFIG: ToolItem[] = [
  {
    slug: "uuid-generator",
    title: "UUID 生成器",
    description: "批量生成 UUID v1/v4，支援大小寫轉換與移除連字號，極速響應。",
    icon: Hash,
    status: "stable",
    tags: ["Generator", "GUID"],
    lastModified: "2026-04-01",
    related: ["hash-generator", "secret-generator"],
  },
  {
    slug: "base64-encoder",
    title: "Base64 編碼/解碼",
    description: "支援 UTF-8 中文的 Base64 轉換器，極速處理文字編解碼。",
    icon: Lock,
    status: "stable",
    tags: ["Encoder", "Security"],
    lastModified: "2026-04-01",
    related: ["url-encoder", "hash-generator"],
  },
  {
    slug: "json-formatter",
    title: "JSON 格式化/校驗",
    description: "美化 JSON 數據，語法高亮與錯誤檢測，支援壓縮模式。",
    icon: FileJson,
    status: "hot",
    tags: ["Formatter", "Dev"],
    lastModified: "2026-04-01",
    related: ["jwt-decoder", "url-encoder"],
  },
  {
    slug: "timestamp-converter",
    title: "Unix 時間戳轉換",
    description: "在 Unix Timestamp 與人類可讀日期之間互轉，支援秒/毫秒。",
    icon: Clock,
    status: "stable",
    tags: ["Converter", "Date"],
    lastModified: "2026-04-01",
    related: ["timezone-converter"],
  },
  {
    slug: "timezone-converter",
    title: "時區轉換/偏移",
    description: "UTC 與本地時間即時對照，支援時間偏移 (Offset) 模擬測試。",
    icon: Globe,
    status: "stable",
    tags: ["Timezone", "ISO"],
    lastModified: "2026-04-01",
    related: ["timestamp-converter"],
  },
  {
    slug: "url-encoder",
    title: "URL 編碼/解碼",
    description: "將 URL 特殊字符轉換為百分號編碼，確保參數傳輸安全。",
    icon: LinkIcon,
    status: "stable",
    tags: ["Encoder", "Web"],
    lastModified: "2026-04-01",
    related: ["base64-encoder", "json-formatter"],
  },
  {
    slug: "sql-formatter",
    title: "SQL 格式化工具",
    description: "美化複雜的 SQL 查詢語句，支援多種資料庫方言 (MySQL, PG)。",
    icon: Database,
    status: "coming-soon",
    tags: ["Formatter", "DB"],
    lastModified: "2026-04-01",
    related: ["json-formatter"],
  },
  {
    slug: "hash-generator",
    title: "Hash 雜湊生成器",
    description: "計算文字的 MD5, SHA-1, SHA-256 雜湊值 (Client-side Only)。",
    icon: ShieldCheck,
    status: "stable",
    tags: ["Security", "Crypto"],
    lastModified: "2026-04-01",
    related: ["base64-encoder", "secret-generator"],
  },
  {
    slug: "lorem-ipsum",
    title: "亂數假文生成",
    description: "生成指定長度的 Lorem Ipsum 假文，排版測試專用。",
    icon: Type,
    status: "stable",
    tags: ["Generator", "Design"],
    lastModified: "2026-04-01",
    related: ["uuid-generator"],
  },
  {
    slug: "jwt-decoder",
    title: "JWT 解碼器",
    description: "解析 JWT Token 結構 (Header, Payload)，除錯身份驗證問題。",
    icon: KeyRound,
    status: "new",
    tags: ["Auth", "Security"],
    lastModified: "2026-04-20",
    related: ["jwt-encoder", "secret-generator"],
  },
  {
    slug: "jwt-encoder",
    title: "JWT 生成器",
    description: "自訂 Payload 並簽署 JWT Token，方便測試 API 權限。",
    icon: Key,
    status: "new",
    tags: ["Auth", "Generator"],
    lastModified: "2026-04-20",
    related: ["jwt-decoder", "secret-generator"],
  },
  {
    slug: "secret-generator",
    title: "Secret 生成器",
    description: "安全產生 JWT Secret、API Key、隨機密碼與 AES 金鑰，純瀏覽器端執行。",
    icon: Fingerprint,
    status: "new",
    tags: ["Security", "Generator"],
    lastModified: "2026-05-07",
    related: ["jwt-decoder", "jwt-encoder", "hash-generator"],
  },
];

export const NAV_ITEMS = [
  {
    label: "導航大廳",
    icon: LayoutGrid,
    href: "/",
    color: "text-sky-500",
  },
];
