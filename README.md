# DevTools — 開發者工具箱

極速、純淨、無廣告的線上開發者工具集。所有工具皆在瀏覽器端執行，資料不會傳送至伺服器。

**Live Site：** [https://kit.cherites.org](https://kit.cherites.org)

---

## 工具清單

| 工具 | 路由 | 說明 |
|------|------|------|
| UUID 生成器 | `/tools/uuid-generator` | 批量生成 UUID v1/v4，支援大小寫、移除連字號 |
| Base64 編碼/解碼 | `/tools/base64-encoder` | UTF-8 安全的 Base64 互轉，支援一鍵互換 |
| JSON 格式化/校驗 | `/tools/json-formatter` | 美化、壓縮、語法高亮，Monaco Editor 驅動 |
| Unix 時間戳轉換 | `/tools/timestamp-converter` | Timestamp ↔ 日期時間雙向互轉，秒/毫秒切換 |
| 時區轉換 | `/tools/timezone-converter` | UTC ↔ 本地時間即時對照，ISO 8601 轉換 |
| URL 編碼/解碼 | `/tools/url-encoder` | encodeURIComponent / encodeURI 模式，支援一鍵互換 |
| Hash 生成器 | `/tools/hash-generator` | MD5、SHA-1、SHA-256 雜湊值計算 |
| 亂數假文生成 | `/tools/lorem-ipsum` | Lorem Ipsum 假文，指定段落/句子/字數 |
| JWT 解碼器 | `/tools/jwt-decoder` | 解析 JWT Header、Payload 結構 |
| JWT 生成器 | `/tools/jwt-encoder` | 自訂 Payload 並簽署 JWT Token |
| Secret 生成器 | `/tools/secret-generator` | JWT Secret、API Key、隨機密碼、AES 金鑰 |

---

## 技術棧

- **Framework：** Next.js 16 (App Router)
- **Language：** TypeScript
- **Styling：** Tailwind CSS v4
- **UI Components：** shadcn/ui (Radix UI)
- **Icons：** lucide-react
- **Editor：** Monaco Editor (`@monaco-editor/react`)
- **Fonts：** Geist Sans / Geist Mono

---

## 本地開發

**安裝依賴**

```bash
pnpm install
```

**啟動開發伺服器**

```bash
pnpm dev
```

開啟 [http://localhost:3000](http://localhost:3000) 即可預覽。

**建置生產版本**

```bash
pnpm build
pnpm start
```

---

## 新增工具

所有工具統一在 `app/config/site.tsx` 的 `TOOLS_CONFIG` 陣列中登錄，這是唯一的維護點。

### 步驟

**1. 登錄工具設定**

在 `app/config/site.tsx` 的 `TOOLS_CONFIG` 新增一筆：

```ts
{
  slug: "my-tool",          // 對應路由 /tools/my-tool
  title: "工具名稱",
  description: "簡短說明，顯示於首頁卡片。",
  icon: SomeLucideIcon,
  status: "new",            // "new" | "hot" | "beta" | "stable" | "coming-soon"
  tags: ["Tag1", "Tag2"],
}
```

**2. 建立頁面（Server Component）**

新增 `app/tools/my-tool/page.tsx`：

```tsx
import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import MyTool from '../../components/tools/my-tool'

export const metadata: Metadata = {
  title: "工具名稱 | 簡短描述",
  description: "...",
  alternates: { canonical: "/tools/my-tool" },
};

export default function MyToolPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <JsonLd data={{ /* schema.org JSON-LD */ }} />
      <section className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">工具名稱</h1>
        <p className="text-lg text-muted-foreground">工具說明</p>
      </section>
      <section className="mb-20">
        <MyTool />
      </section>
    </main>
  );
}
```

**3. 建立元件（Client Component）**

新增 `app/components/tools/my-tool.tsx`：

```tsx
"use client";

export default function MyTool() {
  // 互動邏輯
}
```

---

## 專案結構

```
app/
├── config/site.tsx           # 工具設定（唯一維護點）
├── layout.tsx                # Root layout
├── page.tsx                  # 首頁
├── globals.css
├── components/
│   ├── layout/
│   │   ├── app-shell.tsx     # 版面容器（Sidebar 顯示邏輯）
│   │   └── sidebar.tsx       # DesktopSidebar + MobileNav
│   ├── seo/
│   │   └── json-ld.tsx       # JSON-LD 結構化資料注入
│   └── tools/                # 各工具的 Client Component
└── tools/
    └── <slug>/page.tsx       # 各工具頁面（Server Component）

components/
└── ui/                       # shadcn/ui 原始元件

lib/
└── utils.ts                  # cn() 工具函式
```

---

## License

MIT © 2026 廖柏安
