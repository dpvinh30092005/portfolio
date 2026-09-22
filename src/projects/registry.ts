import { lazy } from "react";
import type { Lang } from "../content";
import type { Tx } from "../notes/i18n";

/**
 * Every project on the project side, in the order they are listed.
 *
 * ## Adding a project
 *
 * 1. Make a folder `projects/<id>/` holding `copy.ts` (every string and figure,
 *    both languages, each figure saying where it was measured) and `Page.tsx`
 *    (the three stages, built from `Stage` and `ProjectHead` in `../Stage`).
 * 2. Add one entry below. The index, the profile's "go on" block and the
 *    next-project link all read this list; nothing else needs touching.
 *
 * The entry is plain data plus a lazy page, the same split the notes side uses:
 * the index renders every card without loading a single project page, so a
 * reader who opens one project downloads only that one.
 *
 * An entry appears here only when its page exists. A card pointing at a stub
 * promises content and delivers an empty sheet, which is worse than a shorter list.
 */
export type ProjectEntry = {
  /** URL segment: `#/project/<id>`. Lowercase and hyphens; it is a link people share. */
  id: string;
  /** Sheet reference. The project side is sheet 02, so its projects are 02.1, 02.2 … */
  no: string;
  name: Tx;
  /** Year and role, one line. */
  role: Tx;
  /** One or two sentences, shown on the index and on the profile. */
  blurb: Tx;
  /** Three or four, language-neutral. The full stack belongs on the page. */
  tags: readonly string[];
  Page: React.LazyExoticComponent<(p: { lang: Lang }) => React.JSX.Element>;
};

export const PROJECTS: ProjectEntry[] = [
  {
    id: "intellipath",
    no: "02.1",
    name: { vi: "IntelliPath", en: "IntelliPath" },
    role: { vi: "2026 · backend và trưởng nhóm", en: "2026 · backend and team lead" },
    blurb: {
      vi: "Lộ trình học dựng từ repo có commit thật và tin tuyển dụng đang mở. Đang chạy thật trên một VPS Linux.",
      en: "A learning path built from repositories you actually committed to and postings open right now. Running in production on a Linux VPS.",
    },
    tags: ["Java 21", "Spring Boot 3.5", "PostgreSQL 16"],
    Page: lazy(() => import("./intellipath/Page")),
  },
  {
    id: "jev-com-tam",
    no: "02.2",
    name: { vi: "Jev × 1000 quán cơm tấm", en: "Jev × 1,000 com tam shops" },
    role: { vi: "2026 · thiết kế bài test và harness", en: "2026 · test design and harness" },
    blurb: {
      vi: "Kiểm tra một model chỉ trả về quyết định có kiểu, bằng một câu hỏi bẫy và 1000 quán giả lập có đáp án giấu sẵn.",
      en: "Testing a model that only returns typed decisions, with a trick question and 1,000 synthetic shops whose answers are hidden in the data.",
    },
    tags: ["Python", "TypeSafe API", "LLM eval"],
    Page: lazy(() => import("./jev-com-tam/Page")),
  },
];

/** `null` for an unknown id: the caller shows the index, which is a real place, rather than guessing. */
export function findProject(id: string | null): ProjectEntry | null {
  return PROJECTS.find((p) => p.id === id) ?? null;
}

/** The project after this one, wrapping to the first. `null` when there is only one. */
export function nextProject(id: string): ProjectEntry | null {
  if (PROJECTS.length < 2) return null;
  const i = PROJECTS.findIndex((p) => p.id === id);
  return PROJECTS[(i + 1) % PROJECTS.length];
}
