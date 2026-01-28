import {
  Clock,
  Database,
  FileJson,
  Globe,
  Hash,
  LayoutGrid,
  Link as LinkIcon,
  Lock,
  LucideIcon,
  ShieldCheck,
  Type,
} from "lucide-react"

export interface ToolItem {
  slug: string;       // 路由路徑 (如 uuid-generator)
  title: string;      // 顯示標題
  description: string;// 短描述 (用於首頁卡片)
  icon: LucideIcon;   // 圖示組件
  status: "new" | "hot" | "beta" | "coming-soon" | "stable";
  tags: string[];     // 標籤
}

// 這裡定義所有工具，這是唯一的維護點！
export const TOOLS_CONFIG: ToolItem[] = [
  // 1. UUID (已完成)
  {
    slug: "uuid-generator",
    title: "UUID 生成器",
    description: "批量生成 UUID v1/v4，支援大小寫轉換與移除連字號，極速響應。",
    icon: Hash,
    status: "stable", // 改為 stable 代表功能穩定
    tags: ["Generator", "GUID"],
  },
  // 2. Base64 (已完成)
  {
    slug: "base64-encoder",
    title: "Base64 編碼/解碼",
    description: "支援 UTF-8 中文的 Base64 轉換器，極速處理文字編解碼。",
    icon: Lock,
    status: "stable",
    tags: ["Encoder", "Security"],
  },
  // 3. JSON (已完成)
  {
    slug: "json-formatter",
    title: "JSON 格式化/校驗",
    description: "美化 JSON 數據，語法高亮與錯誤檢測，支援壓縮模式。",
    icon: FileJson,
    status: "hot", // 剛做好的主打功能
    tags: ["Formatter", "Dev"],
  },

  // --- 以下為新增的規劃 (Coming Soon) ---

  // 4. Timestamp (高頻需求)
  {
    slug: "timestamp-converter",
    title: "Unix 時間戳轉換",
    description: "在 Unix Timestamp 與人類可讀日期之間互轉，支援秒/毫秒。",
    icon: Clock,
    status: "stable",
    tags: ["Converter", "Date"],
  },
  {
    slug: "timezone-converter",
    title: "時區轉換/偏移",
    description: "UTC 與本地時間即時對照，支援時間偏移 (Offset) 模擬測試。",
    icon: Globe,
    status: "stable",
    tags: ["Timezone", "ISO"],
  },
  // 5. URL Encode (API 除錯必備)
  {
    slug: "url-encoder",
    title: "URL 編碼/解碼",
    description: "將 URL 特殊字符轉換為百分號編碼，確保參數傳輸安全。",
    icon: LinkIcon,
    status: "new",
    tags: ["Encoder", "Web"],
  },
  // 6. SQL Formatter (可複用 Monaco Editor)
  {
    slug: "sql-formatter",
    title: "SQL 格式化工具",
    description: "美化複雜的 SQL 查詢語句，支援多種資料庫方言 (MySQL, PG)。",
    icon: Database,
    status: "coming-soon",
    tags: ["Formatter", "DB"],
  },
  // 7. Hash Generator (前端加密)
  {
    slug: "hash-generator",
    title: "Hash 雜湊生成器",
    description: "計算文字的 MD5, SHA-1, SHA-256 雜湊值 (Client-side Only)。",
    icon: ShieldCheck,
    status: "new",
    tags: ["Security", "Crypto"],
  },
  // 8. Lorem Ipsum (UI 開發必備)
  {
    slug: "lorem-ipsum",
    title: "亂數假文生成",
    description: "生成指定長度的 Lorem Ipsum 假文，排版測試專用。",
    icon: Type,
    status: "coming-soon",
    tags: ["Generator", "Design"],
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
