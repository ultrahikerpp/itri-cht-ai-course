// ── Mock questions for local dev (when VITE_GAS_URL is empty) ──
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "台灣最高的山是哪一座？",
    A: "玉山",
    B: "雪山",
    C: "合歡山",
    D: "秀姑巒山",
    answer: "A",
  },
  {
    id: 2,
    question: "下列哪個不是程式語言？",
    A: "Python",
    B: "Cobra",
    C: "Ruby",
    D: "Swift",
    answer: "B",
  },
  {
    id: 3,
    question: "HTTP 狀態碼 404 代表？",
    A: "伺服器錯誤",
    B: "授權失敗",
    C: "找不到資源",
    D: "請求超時",
    answer: "C",
  },
  {
    id: 4,
    question: "React 的核心概念是？",
    A: "雙向繫結",
    B: "組件化 + 虛擬 DOM",
    C: "類別繼承",
    D: "直接操作 DOM",
    answer: "B",
  },
  {
    id: 5,
    question: "CSS Flexbox 中，讓主軸排列方向變為縱向的屬性值是？",
    A: "flex-direction: row",
    B: "flex-direction: column",
    C: "align-items: center",
    D: "justify-content: flex-end",
    answer: "B",
  },
  {
    id: 6,
    question: "Git 中，回退到上一次 commit 的指令是？",
    A: "git revert",
    B: "git reset HEAD~1",
    C: "git undo",
    D: "git pop",
    answer: "B",
  },
  {
    id: 7,
    question: "JSON 全名是？",
    A: "Java Script Object Notation",
    B: "JavaScript Standard Object Notation",
    C: "Java Serialized Object Notation",
    D: "JavaScript Online Notation",
    answer: "A",
  },
  {
    id: 8,
    question: "SQL 中，刪除資料表的指令是？",
    A: "DELETE TABLE",
    B: "REMOVE TABLE",
    C: "DROP TABLE",
    D: "CLEAR TABLE",
    answer: "C",
  },
  {
    id: 9,
    question: "下列哪個是非同步 JS 的解法？",
    A: "Callback Hell",
    B: "Promise",
    C: "async/await",
    D: "以上皆是",
    answer: "D",
  },
  {
    id: 10,
    question: "Big O(n²) 最常見於哪種演算法？",
    A: "二分搜尋",
    B: "氣泡排序",
    C: "合併排序",
    D: "快速查找表",
    answer: "B",
  },
  // ── AI 課程題目 ──
  {
    id: 11,
    question: 'GPT 中的 "T" 代表什麼？',
    A: "Transformer",
    B: "Training",
    C: "Tokenizer",
    D: "Transfer",
    answer: "A",
  },
  {
    id: 12,
    question: "下列哪個是大型語言模型（LLM）的代表？",
    A: "ResNet",
    B: "YOLO",
    C: "GPT-4",
    D: "AlexNet",
    answer: "C",
  },
  {
    id: 13,
    question: "Prompt Engineering 的主要目的是？",
    A: "訓練新模型",
    B: "透過設計輸入提示來引導 AI 輸出",
    C: "壓縮模型大小",
    D: "加快推論速度",
    answer: "B",
  },
  {
    id: 14,
    question: "RAG 全名是？",
    A: "Recurrent AI Generation",
    B: "Retrieval-Augmented Generation",
    C: "Recursive Attention Graph",
    D: "Real-time AI Gateway",
    answer: "B",
  },
  {
    id: 15,
    question: "AI 幻覺（Hallucination）指的是？",
    A: "AI 運算速度太慢",
    B: "AI 產生看似合理但錯誤的內容",
    C: "AI 無法辨識圖片",
    D: "AI 記憶體不足",
    answer: "B",
  },
  {
    id: 16,
    question: "向量資料庫（Vector DB）在 AI 應用中主要用來做什麼？",
    A: "儲存圖片",
    B: "執行 SQL 查詢",
    C: "儲存並搜尋語意相近的嵌入向量",
    D: "管理使用者帳號",
    answer: "C",
  },
  {
    id: 17,
    question: "Fine-tuning（微調）與 Prompt Engineering 的主要差異是？",
    A: "Fine-tuning 不需要資料",
    B: "Fine-tuning 會更新模型權重，Prompt Engineering 不會",
    C: "兩者完全相同",
    D: "Prompt Engineering 需要 GPU",
    answer: "B",
  },
  {
    id: 18,
    question: "ChatGPT 底層使用的核心架構是？",
    A: "RNN",
    B: "CNN",
    C: "Transformer",
    D: "SVM",
    answer: "C",
  },
  {
    id: 19,
    question: "Token 在 LLM 中代表什麼？",
    A: "一個完整句子",
    B: "模型的參數",
    C: "文字被切分的最小單位",
    D: "一個段落",
    answer: "C",
  },
  {
    id: 20,
    question: "下列哪種技術可以讓 AI 模型「記住」過去的對話脈絡？",
    A: "Zero-shot prompting",
    B: "Conversation history / Memory",
    C: "Batch normalization",
    D: "Dropout",
    answer: "B",
  },
];

const GAS_URL = import.meta.env.VITE_GAS_URL;
const QUESTION_COUNT = parseInt(
  import.meta.env.VITE_QUESTION_COUNT || "10",
  10,
);

/**
 * Fetch N random questions from GAS (no 解答 column returned).
 * Falls back to mock data when VITE_GAS_URL is not configured.
 */
export async function fetchQuestions() {
  if (!GAS_URL) {
    // Mock mode — shuffle and pick
    const shuffled = [...MOCK_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, QUESTION_COUNT);
  }

  const url = new URL(GAS_URL);
  url.searchParams.set("action", "getQuestions");
  url.searchParams.set("count", QUESTION_COUNT);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`GAS error: ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.questions;
}

/**
 * Submit the player's result to GAS.
 * @param {string} playerId
 * @param {number} score
 * @param {number} total
 * @param {boolean} passed
 */
export async function submitScore(playerId, score, total, passed) {
  if (!GAS_URL) {
    console.info("[mock] submitScore", { playerId, score, total, passed });
    return { success: true };
  }

  // Use GET + query params — GAS doesn't support CORS preflight (triggered by
  // POST with Content-Type: application/json), so POST never actually reaches doPost.
  const url = new URL(GAS_URL);
  url.searchParams.set("action", "submitScore");
  url.searchParams.set("playerId", playerId);
  url.searchParams.set("score", score);
  url.searchParams.set("total", total);
  url.searchParams.set("passed", passed ? "1" : "0");

  // Plain GET — GAS sets Access-Control-Allow-Origin: * on doGet responses,
  // so we don't need no-cors and can actually read errors.
  const res = await fetch(url.toString());
  const data = await res.json().catch(() => ({}));
  if (data.error) console.error("[GAS submitScore error]", data.error);
  return { success: true };
}
