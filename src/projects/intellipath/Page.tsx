import { COPY as SITE, LINKS, STACK, STAGES, type Lang } from "../../content";
import { ProjectHead, Stage } from "../Stage";
import { COPY } from "./copy";

/** IntelliPath — the three stages as they stood before the project side became a list. */
export default function IntelliPath({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const names = SITE[lang].stageName;

  return (
    <>
      <ProjectHead label="IntelliPath" h={t.problem.h} lede={t.lede} lang={lang} />

      <Stage no={STAGES[0].no} name={names.problem} lang={lang}>
        <div className="stage-body">
          {t.problem.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="pull">{t.problem.pull}</p>
        </div>
      </Stage>

      <Stage no={STAGES[1].no} name={names.build} lang={lang}>
        <h2 className="stage-h">{t.build.h}</h2>
        <div className="stage-body">
          <p>{t.build.body}</p>
        </div>

        <p className="label" style={{ marginTop: "var(--space-md)" }}>
          {t.build.stackLabel}
        </p>
        <ul className="chips">
          {STACK.map((s) => (
            <li className="chip" key={s}>
              {s}
            </li>
          ))}
        </ul>

        <p className="label" style={{ marginTop: "var(--space-md)" }}>
          {t.build.partsLabel}
        </p>
        <ul className="parts">
          {t.build.parts.map((p) => (
            <li className="part" key={p.n}>
              <p className="part-n">{p.n}</p>
              <p className="part-d">{p.d}</p>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "var(--space-md)" }}>
          <a className="btn btn--ghost" href={LINKS.project} target="_blank" rel="noreferrer">
            {t.build.cta}
          </a>
        </p>
      </Stage>

      <Stage no={STAGES[2].no} name={names.proof} lang={lang}>
        <h2 className="stage-h">{t.proof.h}</h2>
        <div className="stage-body">
          <p>{t.proof.lede}</p>
        </div>
        <ul className="stats">
          {t.proof.stats.map((s) => (
            <li className="stat" key={s.label}>
              <p className="stat-n">{s.n}</p>
              <p className="stat-label">{s.label}</p>
              <p className="stat-how">{s.how}</p>
            </li>
          ))}
        </ul>
        <p className="note">{t.proof.note}</p>
      </Stage>
    </>
  );
}
