/**
 * Every string on the page, in both languages.
 *
 * HONEST-COPY RULE — inherited from the previous system and unchanged. Nothing
 * here is invented. Each figure was measured from the IntelliPath repository or
 * its database; change it here, never in a component. Images are Vinh's own files
 * in /public/art — no generated stand-in art is ever shipped in their place.
 *
 * Project copy is not here. Each project keeps its own words and figures in
 * `projects/<id>/copy.ts` under the same rule, measured from that project's own
 * repository; this file holds only the chrome around them.
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
export const SIDE_REF = { home: "01", project: "02", notes: "03" } as const;

/**
 * The plates on the notes side, in reading order.
 *
 * A plate is one mechanism, one drawing. The id keys both the copy in this file
 * and the figure in `pages/Notes.tsx`, so a plate cannot exist with a drawing and
 * no explanation, or the reverse.
 */
export const PLATES = [
  { id: "chain", no: "P.01" },
  { id: "layers", no: "P.02" },
  { id: "nplus1", no: "P.03" },
  { id: "catalog", no: "P.04" },
  { id: "oauth", no: "P.05" },
  { id: "cipher", no: "P.06" },
] as const;
export type PlateId = (typeof PLATES)[number]["id"];

/** A project's three stages, in travel order. Every project page uses the same three. */
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

type Plate = {
  /** What the drawing shows. One claim. */
  t: string;
  /** The mechanism in prose. The drawing carries the shape; this carries the why. */
  body: string;
  /** Sits under the figure. States what the reader is looking at. */
  fig: string;
  /**
   * The limit of what was built. Every plate has one, on purpose: a note that
   * only says what works is advertising, and the reader can tell.
   */
  limit: string;
};

type Copy = {
  sideName: { home: string; project: string; notes: string };
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
    demo: string;
    cta: string;
  };
  /** Chrome for the project side. The projects themselves live in `projects/`. */
  projects: {
    h: string;
    intro: string;
    open: string;
    all: string;
    next: string;
    loading: string;
  };
  notes: {
    lede: string;
    h: string;
    intro: string;
    /** Page 00 has its own opening — the notebook's does not describe it. */
    systemLede: string;
    systemIntro: string;
    figLabel: string;
    limitLabel: string;
    plates: Record<PlateId, Plate>;
  };
  colophon: string;
};

const vi: Copy = {
  sideName: { home: "Hồ sơ", project: "Dự án", notes: "Ghi chú" },
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
    demo: "Bản đang chạy thật. Mở thử được ngay.",
    cta: "Gửi email",
  },
  projects: {
    h: "Những thứ tôi đã dựng, kèm số đo được",
    intro: "Mỗi dự án kể theo ba bước: vấn đề, cách dựng, và những gì đo được. Con số nào cũng ghi rõ lấy từ đâu.",
    open: "Mở dự án",
    all: "Tất cả dự án",
    next: "Dự án tiếp theo",
    loading: "đang mở dự án…",
  },
  notes: {
    lede: "Ghi chú kỹ thuật · backend Java",
    h: "Sổ ghi chép của một người đang dựng hệ thống",
    intro:
      "Mười hai trang, mỗi trang một mảng tôi phải hiểu để dựng và giữ IntelliPath chạy. Trang 00 là hệ thống của tôi; các trang còn lại là nền tảng bên dưới nó. Chỗ nào cơ chế là một chuyển động thì có hình chạy được từng bước, và mỗi mục đều kết bằng chỗ nó dừng lại.",
    systemLede: "Ghi chú kỹ thuật · IntelliPath · backend",
    systemIntro:
      "Mỗi bản vẽ dưới đây là một cơ chế tôi phải tự quyết trong lúc dựng backend, kèm lý do chọn và chỗ nó chưa làm được. Con số trong ghi chú đọc trực tiếp từ mã nguồn, cùng nguồn với trang dự án.",
    figLabel: "Bản vẽ",
    limitLabel: "Chưa làm được",
    plates: {
      chain: {
        t: "Hai bộ giới hạn tần suất, đặt ở hai phía của bộ lọc xác thực",
        body:
          "Đường đăng nhập bị giới hạn theo địa chỉ IP, vì lúc đó chưa biết người gọi là ai. Đường AI bị giới hạn theo tài khoản, vì đăng nhập bằng Google hoặc GitHub tự tạo tài khoản mới, nên giới hạn theo IP chỉ cần một tài khoản khác là vượt qua. Ràng buộc đó quyết định thứ tự: bộ lọc AI phải nằm sau bộ lọc JWT để đọc được danh tính, còn bộ lọc đăng nhập phải nằm trước.",
        fig:
          "Một request đi qua ba bộ lọc. Danh tính chỉ tồn tại từ sau bộ lọc JWT, và đó là ranh giới chia hai cách đếm.",
        limit:
          "Bộ đếm nằm trong bộ nhớ của tiến trình. Chạy hai bản sau cân bằng tải thì mỗi bản đếm riêng, và giới hạn thật thành gấp đôi. Muốn đúng thì phải chuyển sang một kho dùng chung.",
      },
      layers: {
        t: "181 lớp dữ liệu đứng giữa 42 bảng và API",
        body:
          "Bảng dữ liệu không bao giờ đi thẳng ra ngoài. Mỗi endpoint nhận và trả một lớp riêng, nên đổi tên một cột không làm vỡ hợp đồng API, và những trường như mã băm mật khẩu hay token đã mã hoá không có đường ra. Cái giá là 181 file phải viết và phải giữ đồng bộ.",
        fig:
          "Bốn tầng và một ranh giới. Chỗ cắt nằm giữa tầng dịch vụ và tầng điều khiển, không phải ở tận cùng.",
        limit:
          "Chuyển đổi giữa hai lớp hiện viết tay. Với 42 bảng thì việc này lặp lại nhiều và dễ sót một trường khi thêm cột mới.",
      },
      nplus1: {
        t: "Một truy vấn lấy danh sách, rồi thêm một truy vấn cho mỗi dòng",
        body:
          "Duyệt qua các nút lộ trình và chạm vào quan hệ được nạp lười khiến Hibernate bắn thêm một câu lệnh cho từng nút. Trên máy phát triển với hai mươi dòng dữ liệu thì không ai thấy gì. Sửa bằng cách nạp kèm quan hệ ngay trong câu truy vấn đầu.",
        fig:
          "Cùng một kết quả, hai cách lấy. Sự khác nhau nằm ở số lần đi lại cơ sở dữ liệu, không nằm ở dữ liệu trả về.",
        limit:
          "Cách này không ghép được với phân trang: nạp kèm một tập con rồi giới hạn số dòng thì cơ sở dữ liệu không cắt trang đúng được, và Hibernate phải kéo hết về bộ nhớ rồi mới cắt.",
      },
      catalog: {
        t: "Fast API và FastAPI từng là hai kỹ năng khác nhau",
        body:
          "Ba luồng cùng ghi vào danh mục kỹ năng, và cách duy nhất để nhận ra hai tên là một chỉ là so chuỗi bỏ qua hoa thường. Danh mục chẻ đôi theo, và vì nó là mẫu số tính độ sẵn sàng nên kết quả của sinh viên bị chia sai. Cách sửa là một hàm chuẩn hoá duy nhất mà cả ba luồng đều đi qua, cộng một lần nạp cả danh mục vào bộ nhớ thay vì hỏi cơ sở dữ liệu từng cái tên.",
        fig:
          "Bốn bước biến một tên hiển thị thành một khoá so khớp. Hai cách viết khác nhau gặp nhau ở bước bỏ khoảng trắng.",
        limit:
          "Việc tra vẫn phải hỏi cơ sở dữ liệu khi trượt, vì bản chụp trong bộ nhớ không thấy hàng vừa được tạo trong cùng lượt chạy. Và hàm này cố ý không gộp `Go` với `Golang` bằng chuẩn hoá — cặp đó đi qua một bảng khai báo tay, vì gộp nhầm hai kỹ năng là hỏng vĩnh viễn.",
      },
      oauth: {
        t: "Mã uỷ quyền đi qua trình duyệt, token thì không",
        body:
          "GitHub trả về một mã dùng một lần qua thanh địa chỉ, rồi máy chủ mới đổi mã đó lấy token bằng một lời gọi từ phía sau, kèm khoá bí mật. Nhờ vậy thứ đi qua trình duyệt — nơi mọi giá trị đều nằm lại trong lịch sử và log — là thứ vô dụng nếu không có khoá.",
        fig:
          "Năm bước. Chỉ bước thứ tư là máy chủ nói chuyện trực tiếp với GitHub, và đó là bước duy nhất token xuất hiện.",
        limit:
          "Hệ thống không giữ phiên, nên yêu cầu uỷ quyền phải cất vào cookie thay vì bộ nhớ máy chủ. Cookie nằm trong tay người dùng, nên nó phải được mã hoá — xem bản vẽ kế bên.",
      },
      cipher: {
        t: "Token của GitHub được mã hoá trước khi chạm vào cơ sở dữ liệu",
        body:
          "Token phải đọc lại được sau này nên không thể băm, phải mã hoá hai chiều. Chế độ được chọn vừa mã hoá vừa xác thực, nên bản mã bị sửa một bit là hỏng thẻ kiểm tra và bị loại trước khi có ai đọc nội dung. Vector khởi tạo sinh mới cho từng lần gọi rồi ghép vào trước bản mã.",
        fig:
          "Vector khởi tạo không cần bí mật, nó chỉ cần không bao giờ lặp lại. Dùng lại nó với cùng một khoá là hỏng toàn bộ.",
        limit:
          "Không cấu hình khoá thì hệ thống tắt hẳn việc lưu token chứ không lưu dạng thô. Đổi khoá thì mọi token đang lưu thành không giải mã được, và hiện chưa có quy trình xoay khoá.",
      },
    },
  },
  colophon:
    "Dựng bằng React, TypeScript và GSAP. Chữ Space Grotesk, Be Vietnam Pro và JetBrains Mono. Lưới trên nền là các đường gióng từ chính cạnh của mỗi khối, vẽ bằng canvas.",
};

const en: Copy = {
  sideName: { home: "Profile", project: "Project", notes: "Notes" },
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
    demo: "The running system. Open it and try it.",
    cta: "Send an email",
  },
  projects: {
    h: "Things I have built, with what was measured",
    intro: "Each project is told in three steps: the problem, the build, and what was measured. Every figure says where it came from.",
    open: "Open project",
    all: "All projects",
    next: "Next project",
    loading: "opening the project…",
  },
  notes: {
    lede: "Engineering notes · Java backend",
    h: "The notebook of someone building a system",
    intro:
      "Twelve pages, each one an area I had to understand to build IntelliPath and keep it running. Page 00 is my system; the rest is the ground underneath it. Where a mechanism is a movement it has a figure you can step through, and every section ends with where it stops.",
    systemLede: "Engineering notes · IntelliPath · backend",
    systemIntro:
      "Each plate below is a mechanism I had to decide on while building the backend, with the reason for the choice and the place it falls short. Every figure is read straight from the source, the same way the project side is.",
    figLabel: "Plate",
    limitLabel: "Where it stops",
    plates: {
      chain: {
        t: "Two rate limits, one on each side of the authentication filter",
        body:
          "The login path is limited per IP address, because at that point nobody knows who is calling. The AI path is limited per account, because signing in with Google or GitHub provisions a new account, so an IP limit is bypassed by making another one. That constraint fixes the order: the AI filter has to sit after the JWT filter to read an identity, and the login filter has to sit before it.",
        fig:
          "One request through three filters. An identity only exists after the JWT filter, and that boundary is what splits the two ways of counting.",
        limit:
          "The counters live in process memory. Run two instances behind a load balancer and each counts on its own, so the real limit doubles. Getting it right means moving the window into a shared store.",
      },
      layers: {
        t: "181 data classes standing between 42 tables and the API",
        body:
          "A table never travels outward as itself. Each endpoint takes and returns its own class, so renaming a column does not break the API contract, and fields like the password hash or the encrypted token have no route out. The cost is 181 files to write and keep in step.",
        fig:
          "Four layers and one boundary. The cut sits between the service and the controller, not at the very edge.",
        limit:
          "The mapping between the two is written by hand. Across 42 tables that repeats often, and it is easy to miss a field when a column is added.",
      },
      nplus1: {
        t: "One query for the list, then one more for every row in it",
        body:
          "Walking the roadmap nodes and touching a lazily loaded relation makes Hibernate issue a further statement per node. On a development machine holding twenty rows nobody sees anything. The fix is to load the relation inside the first query.",
        fig:
          "The same result, fetched two ways. The difference is the number of round trips, not the data that comes back.",
        limit:
          "This does not combine with pagination: fetching a collection and limiting rows leaves the database unable to page correctly, so Hibernate pulls everything into memory and slices it there.",
      },
      catalog: {
        t: "Fast API and FastAPI used to be two different skills",
        body:
          "Three writers fed the skill catalog, and the only way any of them recognised two names as one was a case-insensitive string comparison. The catalog forked along that seam, and because it is the denominator for readiness, students were measured against the wrong number. The fix is a single normalising function every writer goes through, plus one load of the whole catalog into memory instead of asking the database per name.",
        fig:
          "Four steps turning a display name into a matching key. Two spellings meet at the step that removes spaces.",
        limit:
          "A lookup still reaches the database on a miss, because the in-memory snapshot cannot see a row created during the same run. And the function deliberately does not merge `Go` with `Golang` by normalisation — that pair goes through a hand-written table, because merging two real skills by mistake is permanent.",
      },
      oauth: {
        t: "The authorization code crosses the browser; the token does not",
        body:
          "GitHub hands back a single-use code through the address bar, and only then does the server exchange it for a token over a call of its own, carrying the client secret. What crosses the browser — where every value survives in history and logs — is the thing that is useless without the secret.",
        fig:
          "Five steps. Only the fourth is the server talking to GitHub directly, and it is the only one where a token exists.",
        limit:
          "The system holds no session, so the authorization request goes into a cookie rather than server memory. A cookie is in the user's hands, which is why it has to be encrypted — see the next plate.",
      },
      cipher: {
        t: "The GitHub token is encrypted before it reaches the database",
        body:
          "The token has to be readable again later, so it cannot be hashed; it has to be encrypted both ways. The mode chosen both encrypts and authenticates, so a ciphertext altered by one bit fails its tag and is rejected before anything reads the contents. A fresh initialisation vector is generated per call and prepended to the ciphertext.",
        fig:
          "The initialisation vector does not need to be secret. It needs to never repeat. Reusing one under the same key breaks the whole scheme.",
        limit:
          "With no key configured the system disables token storage rather than falling back to plaintext. Changing the key leaves every stored token undecryptable, and there is no rotation procedure yet.",
      },
    },
  },
  colophon:
    "Built with React, TypeScript and GSAP. Set in Space Grotesk, Be Vietnam Pro and JetBrains Mono. The grid behind the page is projected from the edges of the blocks themselves, drawn on canvas.",
};

export const COPY: Record<Lang, Copy> = { vi, en };
