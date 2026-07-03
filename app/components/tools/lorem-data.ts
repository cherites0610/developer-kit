const CHINESE_WORD_POOL = [
  "我們", "系統", "資料", "設計", "功能", "使用者", "介面", "體驗", "開發", "測試",
  "效能", "品質", "團隊", "專案", "流程", "分析", "需求", "討論", "決定", "方案",
  "執行", "完成", "檢查", "優化", "調整", "更新", "版本", "發布", "部署", "環境",
  "伺服器", "資料庫", "網路", "安全", "效率", "速度", "穩定", "準確", "清楚", "簡單",
  "複雜", "重要", "關鍵", "核心", "基礎", "進階", "未來", "目標", "計畫", "策略",
  "方向", "內容", "訊息", "溝通", "合作", "支援", "服務", "客戶", "市場", "產品",
  "品牌", "創新", "技術", "工具", "平台", "應用", "行動", "網站", "頁面", "元件",
  "模組", "架構", "邏輯", "演算法", "效果", "呈現", "視覺", "風格", "排版", "文字",
  "圖片", "色彩", "動畫", "互動", "空間", "時間", "數量", "比例", "層次", "結構",
];

const SENTENCE_PAUSE_INTERVAL_MIN = 4;
const SENTENCE_PAUSE_INTERVAL_MAX = 6;

const SURNAMES = ["陳", "林", "黃", "張", "李", "王", "吳", "劉", "蔡", "楊", "許", "鄭", "謝", "郭", "洪", "曾", "邱", "廖", "賴", "徐"];
const GIVEN_NAMES = [
  "家豪", "俊傑", "思穎", "雅婷", "冠宇", "怡君", "建宏", "淑芬", "志明", "春嬌",
  "佳蓉", "柏翰", "詩涵", "宗翰", "佩珊", "彥廷", "苡瑄", "承翰", "妍希", "育誠",
];

const PRODUCTS = [
  "無線滑鼠", "機械鍵盤", "藍牙耳機", "行動電源", "USB Type-C 傳輸線",
  "筆電支架", "螢幕保護貼", "無線充電盤", "藍牙喇叭", "智慧手錶",
  "相機腳架", "電競椅", "人體工學滑鼠墊", "4K 螢幕", "隨身碟",
  "電競耳機麥克風", "遊戲手把", "網路攝影機", "桌上型麥克風", "智慧插座",
];

const ORDER_STATUSES = ["待付款", "已付款", "備貨中", "已出貨", "已完成", "已取消"];

export type NumberDataType = "phone" | "taxId" | "creditCard" | "orderNo" | "random";

export interface OrderRecord {
  orderNo: string;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  date: string;
  status: string;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function randomDigits(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) out += randomInt(0, 9);
  return out;
}

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

export function generateChineseParagraphs(
  paragraphs: number,
  sentenceBounds: { min: number; max: number }
): string[] {
  const result: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const sentenceCount = randomInt(sentenceBounds.min, sentenceBounds.max);
    const sentences: string[] = [];
    for (let s = 0; s < sentenceCount; s++) {
      const wordCount = randomInt(6, 14);
      let sentence = "";
      let sinceLastPause = 0;
      for (let w = 0; w < wordCount; w++) {
        sentence += pick(CHINESE_WORD_POOL);
        sinceLastPause++;
        const pauseThreshold = randomInt(SENTENCE_PAUSE_INTERVAL_MIN, SENTENCE_PAUSE_INTERVAL_MAX);
        if (sinceLastPause >= pauseThreshold && w < wordCount - 1) {
          sentence += "，";
          sinceLastPause = 0;
        }
      }
      sentences.push(sentence + "。");
    }
    result.push(sentences.join(""));
  }
  return result;
}

export function generateRandomName(): string {
  return pick(SURNAMES) + pick(GIVEN_NAMES);
}

export function generatePhoneNumber(): string {
  return `09${randomDigits(2)}-${randomDigits(3)}-${randomDigits(3)}`;
}

export function generateTaxId(): string {
  return randomDigits(8);
}

export function generateCreditCard(): string {
  return `${randomDigits(4)} ${randomDigits(4)} ${randomDigits(4)} ${randomDigits(4)}`;
}

export function generateOrderNo(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `ORD${y}${m}${d}${randomDigits(4)}`;
}

export function generateNumberData(type: NumberDataType, count: number, digitLength: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    switch (type) {
      case "phone":
        result.push(generatePhoneNumber());
        break;
      case "taxId":
        result.push(generateTaxId());
        break;
      case "creditCard":
        result.push(generateCreditCard());
        break;
      case "orderNo":
        result.push(generateOrderNo());
        break;
      case "random":
        result.push(randomDigits(digitLength));
        break;
    }
  }
  return result;
}

export function generateOrders(count: number): OrderRecord[] {
  const orders: OrderRecord[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const quantity = randomInt(1, 5);
    const unitPrice = randomInt(1, 30) * 100;
    const daysAgo = randomInt(0, 30);
    const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000);
    orders.push({
      orderNo: generateOrderNo(date),
      customer: generateRandomName(),
      product: pick(PRODUCTS),
      quantity,
      unitPrice,
      subtotal: quantity * unitPrice,
      date: `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`,
      status: pick(ORDER_STATUSES),
    });
  }
  return orders;
}
