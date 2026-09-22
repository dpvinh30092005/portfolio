import { Suspense, useRef } from "react";
import { COPY, SIDE_REF, type Lang } from "../content";
import { useCellWake } from "../Grid";
import { LangProvider } from "../notes/i18n";
import { PROJECTS, findProject, nextProject, type ProjectEntry } from "../projects/registry";

/**
 * The project side: an index of projects at `#/project`, one project at
 * `#/project/<id>`.
 *
 * Every project page keeps the 14 · Narrative Workflow shape (see
 * `projects/Stage.tsx`); the index is only the way in. Projects come from
 * `projects/registry.ts`, so adding one never touches this file.
 */

type Go = (side: "project", id?: string) => void;

export default function Project({ lang, id, go }: { lang: Lang; id: string | null; go: Go }) {
  const current = findProject(id);

  return (
    /* The provider serves the shared marks borrowed from the notes side —
       `Limit` carries its own bilingual label and reads the language from here. */
    <LangProvider value={lang}>
      <div className="side" id="main">
        {current ? <One entry={current} lang={lang} go={go} /> : <Index lang={lang} />}
      </div>
    </LangProvider>
  );
}

function Index({ lang }: { lang: Lang }) {
  const t = COPY[lang].projects;
  const head = useRef<HTMLDivElement>(null);
  useCellWake(head, [lang]);

  return (
    <>
      <div className="flow-head" ref={head}>
        <p className="label">
          {SIDE_REF.project} — {COPY[lang].sideName.project}
        </p>
        <h1 className="stage-h">{t.h}</h1>
        <p className="flow-lede">{t.intro}</p>
      </div>

      <ul className="proj-list">
        {PROJECTS.map((p) => (
          <ProjectRow key={p.id} p={p} lang={lang} />
        ))}
      </ul>
    </>
  );
}

/** A link rather than a button: a project is a place, and a reader should be able to open it in a new tab. */
function ProjectRow({ p, lang }: { p: ProjectEntry; lang: Lang }) {
  const el = useRef<HTMLLIElement>(null);
  useCellWake(el, [lang]);
  return (
    <li ref={el}>
      <a className="proj-card" href={`#/project/${p.id}`}>
        <span className="proj-no">{p.no}</span>
        <span className="proj-body">
          <span className="proj-name">{p.name[lang]}</span>
          <span className="proj-role">{p.role[lang]}</span>
          <span className="proj-blurb">{p.blurb[lang]}</span>
          <span className="proj-tags">
            {p.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </span>
        </span>
        <span className="proj-open" aria-hidden="true">
          {COPY[lang].projects.open} →
        </span>
      </a>
    </li>
  );
}

function One({ entry, lang, go }: { entry: ProjectEntry; lang: Lang; go: Go }) {
  const t = COPY[lang].projects;
  const next = nextProject(entry.id);
  const { Page } = entry;

  return (
    <>
      <nav className="proj-crumb" aria-label={t.all}>
        <button type="button" className="btn btn--ghost" onClick={() => go("project")}>
          ← {t.all}
        </button>
        <span className="proj-crumb-no">{entry.no}</span>
      </nav>

      {/* Reserves height while the page chunk loads, or the footer jumps up and
          back down on every project switch. */}
      <Suspense fallback={<div className="topic-loading" aria-live="polite">{t.loading}</div>}>
        <Page lang={lang} />
      </Suspense>

      {next && (
        <aside className="proj-next" aria-label={t.next}>
          <p className="label">{t.next}</p>
          <div className="side-cards">
            <a className="side-card" href={`#/project/${next.id}`}>
              <span className="side-card-t">
                <span className="side-card-ref">{next.no}</span>
                {next.name[lang]}
              </span>
              <span className="side-card-d">{next.blurb[lang]}</span>
            </a>
          </div>
        </aside>
      )}
    </>
  );
}
