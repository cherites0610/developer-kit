import { FileJson, Hash, LayoutGrid, Lock, LucideIcon } from "lucide-react"

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
  {
    slug: "uuid-generator",
    title: "UUID 生成器",
    description: "批量生成 UUID v1/v4，支援大小寫轉換與移除連字號，極速響應。",
    icon: Hash,
    status: "new",
    tags: ["Generator", "GUID"],
  },
  {
    slug: "base64-encoder",
    title: "Base64 編碼/解碼",
    description: "支援 UTF-8 中文的 Base64 轉換器，極速處理文字編解碼。",
    icon: Lock,
    status: "hot",
    tags: ["Encoder", "Security"],
  },
  {
    slug: "json-formatter",
    title: "JSON 格式化",
    description: "美化 JSON 數據，語法高亮與錯誤檢測，支援壓縮模式。",
    icon: FileJson,
    status: "coming-soon",
    tags: ["Formatter", "Dev"],
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
