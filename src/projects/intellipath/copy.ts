import type { Lang } from "../../content";

/**
 * IntelliPath, in both languages.
 *
 * Moved here from `content.ts` when the project side became a list: a project
 * is now a folder holding its own copy and its own page, so adding the next one
 * never means editing the file the other projects live in.
 *
 * HONEST-COPY RULE, unchanged. Every figure was measured from the IntelliPath
 * repository or its database; change it here, never in the page.
 */
export type IntelliPathCopy = {
  lede: string;
  problem: { h: string; body: string[]; pull: string };
  build: { h: string; body: string; stackLabel: string; partsLabel: string; parts: { n: string; d: string }[]; cta: string };
  proof: { h: string; lede: string; note: string; stats: { n: string; label: string; how: string }[] };
};

const vi: IntelliPathCopy = {
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
  };

const en: IntelliPathCopy = {
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
  };

export const COPY: Record<Lang, IntelliPathCopy> = { vi, en };
