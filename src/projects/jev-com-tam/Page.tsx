import { COPY as SITE, STAGES, type Lang } from "../../content";
import { Defs, Fig, Limit } from "../../notes/parts";
import { ProjectHead, Stage } from "../Stage";
import { COPY, LATENCY_BINS, LATENCY_MS, MATRIX, REPO, STACK, type JevCopy } from "./copy";

/**
 * Jev × 1000 quán cơm tấm.
 *
 * Same three stages as every project. The figures are hand-drawn SVG on the 8 px
 * cell like the notes plates, and each spends vermilion on exactly one mark: the
 * path the answers take around the model, the one cell holding every error, and
 * the latency the vendor published.
 */
export default function JevComTam({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const names = SITE[lang].stageName;

  return (
    <>
      <Defs />
      <ProjectHead label={t.label} h={t.h} lede={t.lede} lang={lang} />

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

        <Pipeline f={t.build.fig} />

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
          <a className="btn btn--ghost" href={REPO} target="_blank" rel="noreferrer">
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

        <div className="fig-narrow">
          <Matrix m={t.proof.matrix} />
        </div>
        <div className="stage-body stage-after">
          <p>{t.proof.gate}</p>
        </div>

        <Latency l={t.proof.latency} />
        <p className="note">{t.proof.note}</p>
        <div className="stage-limit">
          <Limit>{t.proof.limit}</Limit>
        </div>
      </Stage>
    </>
  );
}

/* ---- figures --------------------------------------------------------------- */

/** Four boxes left to right, and the answers' own path underneath them. */
function Pipeline({ f }: { f: JevCopy["build"]["fig"] }) {
  const box = (x: number, w: number, lines: string[]) => (
    <g>
      <rect className="d-box" x={x} y={40} width={w} height={96} />
      <text className="d-m" x={x + 16} y={72}>
        {lines[0]}
      </text>
      {lines.slice(1).map((l, i) => (
        <text className="d-b" key={l} x={x + 16} y={96 + i * 24}>
          {l}
        </text>
      ))}
    </g>
  );
  return (
    <Fig viewBox="0 0 880 216" aria={f.aria} caption={f.caption}>
      {box(8, 176, f.gen)}
      {box(240, 200, f.jev)}
      {box(496, 168, f.sort)}
      {box(720, 152, f.score)}
      <line className="d-l" x1={184} y1={88} x2={238} y2={88} markerEnd="url(#pa)" />
      <line className="d-l" x1={440} y1={88} x2={494} y2={88} markerEnd="url(#pa)" />
      <line className="d-l" x1={664} y1={88} x2={718} y2={88} markerEnd="url(#pa)" />
      <path className="d-l-a" d="M96 136 V176 H796 V138" markerEnd="url(#pa-a)" />
      <text className="d-a" x={248} y={200}>
        {f.bypass}
      </text>
    </Fig>
  );
}

/** Three by three. The only accented cell is the only cell with errors in it. */
function Matrix({ m }: { m: JevCopy["proof"]["matrix"] }) {
  const cx = [176, 304, 432];
  const ry = [48, 144, 240];
  return (
    <Fig viewBox="0 0 560 336" aria={m.aria} caption={m.caption}>
      {m.rice.map((r, c) => (
        <text className="d-m" key={`h${r}`} x={cx[c] + 60} y={32} textAnchor="middle">
          Jev: {r}
        </text>
      ))}
      {m.rice.map((r, row) => (
        <text className="d-m" key={`r${r}`} x={8} y={ry[row] + 48}>
          {m.truth}: {r}
        </text>
      ))}
      {MATRIX.map((cells, row) =>
        cells.map((n, c) => {
          const wrong = row !== c && n > 0;
          const cls = wrong ? "d-box-a" : n > 0 ? "d-box-fill" : "d-box";
          return (
            <g key={`${row}-${c}`}>
              <rect className={cls} x={cx[c]} y={ry[row]} width={120} height={88} />
              <text
                className={wrong ? "d-n d-n-a" : n > 0 ? "d-n" : "d-n d-n-q"}
                x={cx[c] + 60}
                y={ry[row] + (wrong ? 48 : 52)}
                textAnchor="middle"
              >
                {n}
              </text>
              {wrong && (
                <text className="d-a" x={cx[c] + 60} y={ry[row] + 72} textAnchor="middle">
                  {m.wrong}
                </text>
              )}
            </g>
          );
        }),
      )}
    </Fig>
  );
}

/**
 * 250 ms bins on a 48 px pitch, so one bin is six cells. Bar heights are the
 * data and are not snapped to the cell; everything else is.
 */
function Latency({ l }: { l: JevCopy["proof"]["latency"] }) {
  const x0 = 48;
  const pitch = 48;
  const base = 232;
  const tall = 192;
  const peak = Math.max(...LATENCY_BINS);
  const at = (ms: number) => x0 + (ms / 250) * pitch;
  const peakI = LATENCY_BINS.indexOf(peak);
  const last = LATENCY_BINS.length - 1;

  return (
    <Fig viewBox="0 0 880 288" aria={l.aria} caption={l.caption}>
      {LATENCY_BINS.map((n, i) => {
        if (n === 0) return null;
        const h = Math.max(2, Math.round((n / peak) * tall));
        return <rect className="d-box-fill" key={i} x={x0 + i * pitch} y={base - h} width={40} height={h} />;
      })}
      <text className="d-m" x={x0 + peakI * pitch + 20} y={58} textAnchor="middle">
        {peak}
      </text>
      <text className="d-s" x={x0 + last * pitch + 20} y={base - 10} textAnchor="middle">
        {l.slowest}
      </text>

      <line className="d-l" x1={x0} y1={base} x2={x0 + LATENCY_BINS.length * pitch} y2={base} />
      {l.ticks.map((tk, i) => (
        <text className="d-s" key={tk} x={x0 + i * 4 * pitch} y={base + 20}>
          {tk}
        </text>
      ))}
      <text className="d-s" x={x0} y={base + 44}>
        {l.axis}
      </text>

      <line className="d-l-a" x1={at(LATENCY_MS.claim)} y1={40} x2={at(LATENCY_MS.claim)} y2={base} />
      <text className="d-a" x={at(LATENCY_MS.claim) + 6} y={28}>
        {l.claim}
      </text>
      <line className="d-l" x1={at(LATENCY_MS.p50)} y1={40} x2={at(LATENCY_MS.p50)} y2={base} />
      <text className="d-m" x={at(LATENCY_MS.p50) + 6} y={28}>
        {l.p50}
      </text>
      <line className="d-l-q" x1={at(LATENCY_MS.p95)} y1={40} x2={at(LATENCY_MS.p95)} y2={base} />
      <text className="d-m" x={at(LATENCY_MS.p95) + 6} y={28}>
        {l.p95}
      </text>
    </Fig>
  );
}
