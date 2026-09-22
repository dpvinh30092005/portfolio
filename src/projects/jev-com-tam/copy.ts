import type { Lang } from "../../content";

/**
 * Jev × 1000 quán cơm tấm, in both languages.
 *
 * HONEST-COPY RULE. Every figure below is read from the run of 22/09/2026 in
 * github.com/dpvinh30092005/jev-1000-com-tam — `results/summary_jev.json`,
 * `results/report.md` and `results/results.csv` — and rounded only to the digits
 * shown. The one number not measured here, "~100 ms", is TypeSafe's own published
 * claim and is labelled as theirs wherever it appears.
 *
 * Vietnamese copy writes decimals with a comma and thousands with a dot, the way
 * the IntelliPath copy already writes 4.177; English uses the reverse.
 */

export const REPO = "https://github.com/dpvinh30092005/jev-1000-com-tam";

export const STACK = [
  "Python 3.11",
  "urllib · stdlib",
  "ThreadPoolExecutor",
  "TypeSafe System One API",
  "jev-1.13.0",
  "anthropic SDK",
] as const;

/** Latency histogram, 250 ms bins from 0 to 4 s plus one overflow bin. From results.csv. */
export const LATENCY_BINS: readonly number[] = [0, 0, 0, 16, 227, 403, 231, 61, 36, 11, 5, 5, 0, 2, 1, 1, 1];
export const LATENCY_MS = { p50: 1412.9, p95: 2061.7, claim: 100, slowest: 7188.2 } as const;

/** Confusion matrix, rows = truth, columns = Jev, both in the order tam / regular / unclear. */
export const MATRIX = [
  [618, 0, 0],
  [0, 254, 0],
  [63, 0, 65],
] as const;

export type JevCopy = {
  label: string;
  h: string;
  lede: string;
  problem: { body: string[]; pull: string };
  build: {
    h: string;
    body: string;
    stackLabel: string;
    partsLabel: string;
    parts: { n: string; d: string }[];
    cta: string;
    fig: {
      aria: string;
      caption: string;
      gen: [string, string];
      jev: [string, string, string];
      sort: [string, string];
      score: [string, string];
      bypass: string;
    };
  };
  proof: {
    h: string;
    lede: string;
    stats: { n: string; label: string; how: string }[];
    matrix: { aria: string; caption: string; rice: [string, string, string]; truth: string; wrong: string };
    gate: string;
    latency: { aria: string; caption: string; claim: string; p50: string; p95: string; slowest: string; axis: string; ticks: string[] };
    note: string;
    limit: string;
  };
};

const vi: JevCopy = {
  label: "Jev × cơm tấm",
  h: "Kiểm tra một model chỉ trả về quyết định, bằng 1000 quán cơm tấm và một câu hỏi bẫy",
  lede: "Jev của TypeSafe · 2026 · thiết kế bài test và harness",
  problem: {
    body: [
      "Câu hỏi ban đầu là: sắp xếp 1000 quán cơm tấm ở Sài Gòn và tìm quán nào làm bằng tấm chứ không phải bằng gạo. Câu này tự mâu thuẫn, vì tấm là hạt gạo vỡ trong lúc xay xát. Nó thử được một việc: model có nhận ra tiền đề sai, hay sẽ trả lời cho vừa lòng người hỏi.",
      "Jev không sinh văn bản. Mỗi request gửi một trạng thái kèm các câu hỏi có kiểu, và nhận lại một lựa chọn trong danh sách, một điểm trên thang, hoặc một xác suất có hay không. Không có chỗ để model trả về một danh sách quán tự bịa, nên bài test phải được dựng lại quanh những câu hỏi như vậy.",
    ],
    pull: "Hỏi thẳng câu bẫy, Jev cho xác suất 0,91 rằng câu hỏi tự mâu thuẫn, và 0,02 rằng nó trả lời được mà không cần dữ liệu thật.",
  },
  build: {
    h: "Dữ liệu có đáp án giấu sẵn, model chỉ chấm, code làm phần còn lại",
    body:
      "Không có danh sách 1000 quán thật nào ghi sẵn loại gạo, nên bộ dữ liệu được sinh ra, và mỗi quán mang theo đáp án đúng mà model không được thấy. Jev đọc review của từng quán và trả lời hai câu. Việc xếp hạng và chấm đúng sai do code làm, để mọi con số đều chạy lại được.",
    stackLabel: "Công nghệ",
    partsLabel: "Các mảnh chính",
    parts: [
      { n: "Dữ liệu có đáp án", d: "1000 quán giả lập sinh từ một seed cố định. Mỗi quán có loại gạo thật (tấm, gạo thường, hoặc không rõ) và điểm chất lượng thật từ 0 đến 4, chỉ lộ ra qua lời review." },
      { n: "Hai câu hỏi có kiểu", d: "Một câu Choice ba lựa chọn cho loại gạo và một câu Score năm mức cho chất lượng, gửi chung một request. 1000 quán là 1000 lời gọi, chạy 8 luồng song song." },
      { n: "Code xếp hạng, không phải model", d: "Jev trả về điểm và xác suất cho từng quán. Thứ hạng là một phép sort trong Python, nên khi kết quả sai thì chỉ có một chỗ để mở ra xem." },
      { n: "Cùng thước cho model khác", d: "Script cho Claude Opus 5 dùng lại đúng bộ dữ liệu, câu hỏi và cách tính điểm, để hai model được đo bằng cùng một thước." },
    ],
    cta: "Xem mã nguồn",
    fig: {
      aria: "Luồng của bài test: sinh dữ liệu, Jev chấm, code xếp hạng, rồi so với đáp án thật",
      caption: "Bốn bước, một chiều. Đáp án thật đi thẳng từ bước sinh dữ liệu tới bước chấm điểm và không bao giờ đi qua model.",
      gen: ["generate_data.py", "1000 quán giả lập"],
      jev: ["jev-1.13.0", "Choice · loại gạo", "Score · chất lượng 0–4"],
      sort: ["Python", "sort theo điểm Jev"],
      score: ["chấm điểm", "so với đáp án"],
      bypass: "đáp án thật không đi qua model",
    },
  },
  proof: {
    h: "Số đo được",
    lede: "Lần chạy ngày 22/09/2026, đủ 1000 quán, không có request nào lỗi. Mỗi con số đọc từ thư mục results/ trong repo của bài test.",
    stats: [
      { n: "93,7%", label: "đoán đúng loại gạo", how: "937 / 1000 quán" },
      { n: "100%", label: "recall cho quán dùng tấm", how: "618 / 618 · precision 90,8%" },
      { n: "0,938", label: "Spearman giữa điểm Jev và điểm thật", how: "lệch trung bình 0,30 trên thang 0–4" },
      { n: "$0,028", label: "chi phí cho cả 1000 quán", how: "667.913 input token · output miễn phí" },
      { n: "1,41 s", label: "latency trung vị mỗi request", how: "p95 2,06 s · tính cả mạng từ Việt Nam" },
    ],
    matrix: {
      aria: "Bảng nhầm lẫn ba nhân ba giữa loại gạo thật và loại gạo Jev chọn",
      caption: "Hàng là đáp án thật, cột là lựa chọn của Jev. Mọi lỗi nằm trong một ô: 63 quán mà review không nhắc gì tới hạt cơm, và Jev đoán là tấm — có lẽ vì tên quán nào cũng bắt đầu bằng “Cơm Tấm”.",
      rice: ["tấm", "gạo thường", "không rõ"],
      truth: "thật",
      wrong: "sai",
    },
    gate: "Jev biết lúc nào nó đang đoán. Confidence trung bình là 0,37 ở nhóm không rõ và 0,96 ở nhóm có tín hiệu. Chỉ giữ các câu trả lời có confidence từ 0,7 trở lên thì Jev đúng cả 861 trên 861 quán.",
    latency: {
      aria: "Biểu đồ phân bố latency của 1000 request, chia theo khoảng 250 mili giây",
      caption: "1000 request, chia theo khoảng 250 ms, tính cả đường mạng từ Việt Nam tới API. Vạch màu son là con số TypeSafe công bố, khoảng 100 ms; trung vị đo được là 1,41 s.",
      claim: "TypeSafe công bố ~100 ms",
      p50: "p50 1,41 s",
      p95: "p95 2,06 s",
      slowest: "7,19 s",
      axis: "latency mỗi request · khoảng 250 ms",
      ticks: ["0", "1 s", "2 s", "3 s", "≥ 4 s"],
    },
    note: "Làm tròn tới chữ số hiển thị. Số gốc nằm trong results/summary_jev.json và results.csv.",
    limit:
      "Dữ liệu sinh từ vài mẫu câu lặp lại, nên phần có tín hiệu dễ hơn review thật rất nhiều; con số 100% ở đó không nói được Jev đọc review thật tốt tới đâu. Phần so sánh với Claude Opus 5 chưa có số: script đã viết xong nhưng chưa chạy.",
  },
};

const en: JevCopy = {
  label: "Jev × com tam",
  h: "Testing a model that only returns decisions, with 1,000 com tam shops and a trick question",
  lede: "Jev by TypeSafe · 2026 · test design and harness",
  problem: {
    body: [
      "The starting question was: sort 1,000 com tam shops in Saigon and find the ones that cook with broken rice rather than rice. It contradicts itself, because broken rice is rice — grains that cracked during milling. That makes it a test of one thing: whether the model notices the false premise or answers to please whoever asked.",
      "Jev does not generate text. Each request sends a state with typed questions and gets back a choice from a list, a position on a scale, or a yes/no probability. There is no room for the model to hand back an invented list of shops, so the test had to be rebuilt around questions of that shape.",
    ],
    pull: "Asked the trick question directly, Jev gave 0.91 probability that it contradicts itself, and 0.02 that it can be answered without real data.",
  },
  build: {
    h: "Data with the answers hidden in it; the model only judges, code does the rest",
    body:
      "No real list of 1,000 shops records which rice they cook, so the dataset is generated, and every shop carries a true answer the model never sees. Jev reads each shop's reviews and answers two questions. Ranking and grading are done in code, so every figure can be run again.",
    stackLabel: "Stack",
    partsLabel: "Key pieces",
    parts: [
      { n: "Data with answers", d: "1,000 synthetic shops from a fixed seed. Each has a true rice type (broken, regular, or unclear) and a true quality score from 0 to 4, visible only through its reviews." },
      { n: "Two typed questions", d: "A three-option Choice for rice type and a five-level Score for quality, sent in the same request. 1,000 shops is 1,000 calls, run on 8 threads." },
      { n: "Code ranks, not the model", d: "Jev returns a score and probabilities per shop. The ranking is a sort in Python, so when a result is wrong there is exactly one place to open." },
      { n: "One ruler for another model", d: "The Claude Opus 5 script reuses the same data, questions and scoring, so both models are measured with the same ruler." },
    ],
    cta: "View the source",
    fig: {
      aria: "The test's flow: generate data, Jev judges, code ranks, then compare with the true answers",
      caption: "Four steps, one direction. The true answers travel straight from data generation to scoring and never pass through the model.",
      gen: ["generate_data.py", "1,000 synthetic shops"],
      jev: ["jev-1.13.0", "Choice · rice type", "Score · quality 0–4"],
      sort: ["Python", "sort by Jev score"],
      score: ["scoring", "against truth"],
      bypass: "the true answers never pass through the model",
    },
  },
  proof: {
    h: "Measured",
    lede: "The run of 22 September 2026, all 1,000 shops, no failed requests. Every figure is read from the results/ folder in the test's repository.",
    stats: [
      { n: "93.7%", label: "rice type correct", how: "937 / 1,000 shops" },
      { n: "100%", label: "recall on broken-rice shops", how: "618 / 618 · precision 90.8%" },
      { n: "0.938", label: "Spearman between Jev's score and the truth", how: "mean error 0.30 on a 0–4 scale" },
      { n: "$0.028", label: "cost for all 1,000 shops", how: "667,913 input tokens · output is free" },
      { n: "1.41 s", label: "median latency per request", how: "p95 2.06 s · network from Vietnam included" },
    ],
    matrix: {
      aria: "Three by three confusion matrix between the true rice type and Jev's choice",
      caption: "Rows are the truth, columns are Jev's choice. Every error sits in one cell: 63 shops whose reviews never mention the grain, which Jev called broken rice — probably because every shop's name starts with “Cơm Tấm”.",
      rice: ["broken", "regular", "unclear"],
      truth: "true",
      wrong: "wrong",
    },
    gate: "Jev knows when it is guessing. Mean confidence is 0.37 on the unclear group and 0.96 where the reviews say something. Keep only answers with confidence of 0.7 or more and Jev is right on 861 of 861 shops.",
    latency: {
      aria: "Histogram of latency for 1,000 requests in 250 millisecond bins",
      caption: "1,000 requests in 250 ms bins, including the network path from Vietnam to the API. The vermilion line is TypeSafe's published figure of about 100 ms; the measured median is 1.41 s.",
      claim: "TypeSafe says ~100 ms",
      p50: "p50 1.41 s",
      p95: "p95 2.06 s",
      slowest: "7.19 s",
      axis: "latency per request · 250 ms bins",
      ticks: ["0", "1 s", "2 s", "3 s", "≥ 4 s"],
    },
    note: "Rounded to the digits shown. The raw numbers are in results/summary_jev.json and results.csv.",
    limit:
      "The data comes from a handful of repeated sentence templates, so the part with a signal is far easier than real reviews; the 100% there says nothing about how well Jev reads real ones. The comparison with Claude Opus 5 has no numbers yet: the script is written but has not been run.",
  },
};

export const COPY: Record<Lang, JevCopy> = { vi, en };
