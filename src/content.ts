/**
 * Every string on the page, in both languages.
 *
 * HONEST-COPY RULE — inherited from the previous system and unchanged. Nothing
 * here is invented. Each figure was measured from the IntelliPath repository or
 * its database; change it here, never in a component. Images are Vinh's own files
 * in /public/art — no generated stand-in art is ever shipped in their place.
 *
 * The drawings side was removed: the hobby was competing for attention with the
 * one thing a hiring reader is here to assess. The image files stay in
 * /public/art in case it comes back.
 *
 * VOICE — rewritten in this pass; the facts were not. The previous copy was
 * manifesto-shaped: clipped fragments, stacked negation, an aphorism at the end of
 * each block telling the reader what to conclude. It read as argument. This one
 * states and stops, and lets the measured figures do the arguing.
 */

export type Lang = "vi" | "en";

export const LINKS = {
  github: "https://github.com/dpvinh30092005",
  linkedin: "https://www.linkedin.com/in/vinhdpse2005/",
  email: "dpvinh30092005@gmail.com",
  project: "https://github.com/InteliRoadMap",
  demo: "https://intelipath.online",
} as const;

export const PORTRAIT = "/art/portrait.jpg";

/**
 * Sheet references for the three sides.
 *
 * The old system marked each side with a kanji. This one addresses them the way a
 * drawing set does — a number and a rule — because the page is now a sheet.
 */
export const SIDE_REF = { home: "01", project: "02" } as const;

/** The project's three stages, in travel order. */
export const STAGES = [
  { id: "problem", no: "1.0" },
  { id: "build", no: "2.0" },
  { id: "proof", no: "3.0" },
] as const;
export type StageId = (typeof STAGES)[number]["id"];

export const STACK = [
  "Java 21",
  "Spring Boot 3.5",
  "Spring Security",
  "Spring Data JPA",
  "PostgreSQL 16",
  "Flyway",
  "Docker",
  "JWT / OAuth2",
] as const;

/* ------------------------------------------------------------------ copy - */

type Copy = {
  sideName: { home: string; project: string };
  stageName: Record<StageId, string>;
  hud: { lang: string; skip: string; back: string; sides: string };
  home: {
    role: string;
    place: string;
    open: string;
    name: string;
    intro: string[];
    stackLabel: string;
    reachLabel: string;
    sidesLabel: string;
    sides: { project: { t: string; d: string } };
    cta: string;
  };
  project: {
    lede: string;
    problem: { h: string; body: string[]; pull: string };
    build: { h: string; body: string; stackLabel: string; partsLabel: string; parts: { n: string; d: string }[]; cta: string };
    proof: { h: string; lede: string; note: string; stats: { n: string; label: string; how: string }[] };
    scroll: string;
  };
  colophon: string;
};

const vi: Copy = {
  sideName: { home: "Hồ sơ", project: "Dự án" },
  stageName: { problem: "Vấn đề", build: "Cách dựng", proof: "Số đo" },
  hud: { lang: "Ngôn ngữ", skip: "Bỏ qua điều hướng", back: "Về hồ sơ", sides: "Các trang" },
  home: {
    role: "Backend Developer",
    place: "Kỹ thuật phần mềm · ĐH FPT TP.HCM · 2023 — nay",
    open: "Đang tìm thực tập OJT · toàn thời gian 3 tháng",
    name: "Đặng Phước Vinh",
    intro: [
      "Tôi làm backend bằng Java và Spring Boot, dữ liệu để trên PostgreSQL. Phần tôi quan tâm là chỗ hệ thống phải trả lời đúng: mô hình dữ liệu chịu được thay đổi, truy vấn không phình ra theo số bản ghi, và khi có lỗi thì log chỉ được ra chỗ hỏng.",
      "Sản phẩm tôi đang chạy là IntelliPath — một nền tảng lộ trình nghề nghiệp. Tôi phụ trách backend và làm trưởng nhóm bốn người. Nó đang chạy thật trên một VPS Linux, không phải bản demo dựng để chụp màn hình.",
    ],
    stackLabel: "Đang dùng",
    reachLabel: "Liên hệ",
    sidesLabel: "Xem tiếp",
    sides: {
      project: { t: "Dự án", d: "IntelliPath — lộ trình học dựng từ repo có commit thật và tin tuyển dụng đang mở." },
    },
    cta: "Gửi email",
  },
  project: {
    lede: "IntelliPath · 2026 · backend và trưởng nhóm",
    problem: {
      h: "Sinh viên năm nhất và năm cuối mở cùng một roadmap Java, và thấy giống hệt nhau",
      body: [
        "Cả hai đều nhận đúng 71 mục như nhau. Không mục nào biết người đọc đã làm được gì, và không mục nào biết thị trường đang tuyển cái gì.",
        "IntelliPath dựng lộ trình từ dữ liệu của từng người: repo GitHub mà họ thật sự có commit, kỹ năng tự khai, và một bài kiểm tra sinh ra từ chính những kỹ năng đó. Kết quả được đối chiếu với tin tuyển dụng đang mở.",
      ],
      pull: "Hệ thống kiểm tra commit trên GitHub trước khi tính một repo là bằng chứng.",
    },
    build: {
      h: "Ba dịch vụ, một cơ sở dữ liệu, không có bước thủ công nào ở giữa",
      body:
        "Backend giữ toàn bộ quyết định. Dịch vụ Python chỉ đọc và trích xuất, không kết luận. Frontend vẽ lại đúng cái backend đã tính, nên khi một kết quả sai thì chỉ có một chỗ để mở ra xem.",
      stackLabel: "Công nghệ",
      partsLabel: "Các mảnh chính",
      parts: [
        { n: "Xác thực quyền tác giả", d: "Đối chiếu commit của sinh viên với danh sách contributor của repo. Kết quả có ba giá trị chứ không phải hai, để một lần GitHub lỗi không bị đọc thành khai gian." },
        { n: "Trích xuất kỹ năng bằng LLM", d: "Đọc mô tả tin tuyển dụng, rút ra tên kỹ năng, rồi khớp mỗi tên về đúng một mục trong catalog." },
        { n: "Danh tính kỹ năng", d: "Một hàm chuẩn hoá dùng chung cho cả ba luồng ghi, nên `Fast API` và `FastAPI` không thành hai kỹ năng khác nhau." },
        { n: "Lộ trình theo bậc", d: "Nút nào mở và nút nào khoá được tính từ bậc năng lực đo được, không phải từ vị trí trong cây." },
      ],
      cta: "Xem mã nguồn",
    },
    proof: {
      h: "Số đo được",
      lede: "Hệ thống này dựng lên để nói rằng bằng chứng đáng tin hơn lời khai, nên trang của nó cũng chỉ ghi những gì đếm được.",
      note: "Mỗi con số đọc trực tiếp từ repo và cơ sở dữ liệu, không làm tròn.",
      stats: [
        { n: "325", label: "test backend xanh", how: "./mvnw test — 0 failure, 0 error" },
        { n: "913", label: "tin tuyển dụng đã đọc bằng LLM", how: "913/913, không bỏ tin nào" },
        { n: "4.177", label: "nút kỹ năng trong catalog", how: "bảng skill_nodes" },
        { n: "5.660", label: "liên kết kỹ năng ↔ tin", how: "bảng recruitment_skills" },
      ],
    },
    scroll: "Cuộn để đi tiếp",
  },
  colophon:
    "Dựng bằng React, TypeScript và GSAP. Chữ Space Grotesk, Be Vietnam Pro và JetBrains Mono. Lưới trên nền là các đường gióng từ chính cạnh của mỗi khối, vẽ bằng canvas.",
};

const en: Copy = {
  sideName: { home: "Profile", project: "Project" },
  stageName: { problem: "The problem", build: "The build", proof: "Measured" },
  hud: { lang: "Language", skip: "Skip to content", back: "Back to profile", sides: "Sides" },
  home: {
    role: "Backend Developer",
    place: "Software Engineering · FPT University HCMC · 2023 — now",
    open: "Looking for an OJT internship · full-time, 3 months",
    name: "Đặng Phước Vinh",
    intro: [
      "I build backends in Java and Spring Boot, with the data on PostgreSQL. The part I care about is where the system has to answer correctly: a data model that survives change, queries that don't grow with the row count, and errors that say where they broke.",
      "The product I run is IntelliPath, a career roadmap platform. I own the backend and lead a team of four. It runs in production on a Linux VPS — not a demo built to be screenshotted.",
    ],
    stackLabel: "Working with",
    reachLabel: "Reach me",
    sidesLabel: "Go on",
    sides: {
      project: { t: "Project", d: "IntelliPath — a learning path built from repositories you actually committed to and postings open right now." },
    },
    cta: "Send an email",
  },
  project: {
    lede: "IntelliPath · 2026 · backend and team lead",
    problem: {
      h: "A first-year and a final-year student open the same Java roadmap and see the same thing",
      body: [
        "Both get the same 71 items. Nothing there knows what the reader has already done, and nothing knows what the market is currently hiring for.",
        "IntelliPath builds the path from one person's own data: GitHub repositories they actually committed to, declared skills, and a quiz generated from those same skills. The result is held against postings that are open right now.",
      ],
      pull: "The system checks your commits on GitHub before a repository counts as evidence.",
    },
    build: {
      h: "Three services, one database, no manual step in between",
      body:
        "The backend owns every decision. The Python service reads and extracts; it concludes nothing. The frontend redraws what the backend computed, so when a result is wrong there is exactly one place to open.",
      stackLabel: "Stack",
      partsLabel: "Key pieces",
      parts: [
        { n: "Authorship verification", d: "Checks the student's commits against the repository's contributor list. The verdict has three values rather than two, so a GitHub outage is never read as a false claim." },
        { n: "LLM skill extraction", d: "Reads job descriptions, pulls out skill names, then resolves each name to exactly one catalog entry." },
        { n: "Skill identity", d: "One canonicalisation function shared by all three write paths, so `Fast API` and `FastAPI` never become two skills." },
        { n: "Tiered path", d: "Which nodes open and which stay locked is computed from measured ability, not from position in the tree." },
      ],
      cta: "View the source",
    },
    proof: {
      h: "Measured",
      lede: "This system was built to argue that evidence beats self-report, so its own page lists only what can be counted.",
      note: "Every figure was read straight from the repository and the database. Nothing is rounded.",
      stats: [
        { n: "325", label: "backend tests passing", how: "./mvnw test — 0 failures, 0 errors" },
        { n: "913", label: "job postings read by the LLM", how: "913 of 913, none skipped" },
        { n: "4,177", label: "skill nodes in the catalog", how: "skill_nodes table" },
        { n: "5,660", label: "skill ↔ posting links", how: "recruitment_skills table" },
      ],
    },
    scroll: "Scroll to continue",
  },
  colophon:
    "Built with React, TypeScript and GSAP. Set in Space Grotesk, Be Vietnam Pro and JetBrains Mono. The grid behind the page is projected from the edges of the blocks themselves, drawn on canvas.",
};

export const COPY: Record<Lang, Copy> = { vi, en };
