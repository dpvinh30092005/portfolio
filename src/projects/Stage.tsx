import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Lang } from "../content";
import { useCellWake } from "../Grid";

gsap.registerPlugin(ScrollTrigger);

/**
 * 14 · Narrative Workflow — the shape every project page shares.
 *
 * The three rooms become numbered stages, 1.0 → 2.0 → 3.0. The content was
 * already sequential — a problem, a build, a set of measurements — and the
 * previous system's continuous-prose shape hid that ordering behind paragraphs.
 *
 * The number is sticky beside its own stage rather than fixed to the page, so
 * the reader always knows which stage they're inside without a progress bar.
 *
 * Lives outside any one project so the next project gets the same stages, the
 * same count-up and the same grid projection by importing one component.
 */

/** stage-advance — the stage number counts up as its section takes the viewport. */
function useStageAdvance(ref: React.RefObject<HTMLElement | null>, to: number, deps: unknown[]) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = to.toFixed(1);
      return;
    }
    // Resting state is the CORRECT number, and the tween counts up TO it.
    // The other way round — start low, wait for the trigger — leaves a stage
    // labelled "0.0" whenever the trigger never fires, which is exactly what
    // happens to a section already past its start point on first paint. A
    // decoration must never be what makes a figure right.
    el.textContent = to.toFixed(1);
    const n = { v: to };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        n.v = Math.max(0, to - 1);
        gsap.to(n, {
          v: to,
          duration: 0.7,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = n.v.toFixed(1);
          },
          onComplete: () => {
            el.textContent = to.toFixed(1);
          },
        });
      },
    });
    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function Stage({
  no,
  name,
  children,
  lang,
}: {
  no: string;
  name: string;
  children: React.ReactNode;
  lang: Lang;
}) {
  const root = useRef<HTMLElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  useCellWake(root, [lang]);
  useStageAdvance(num, parseFloat(no), [lang]);

  return (
    <section className="stage" ref={root}>
      <div className="stage-mark">
        <span className="stage-no" ref={num}>
          {no}
        </span>
        <span className="stage-name">{name}</span>
      </div>
      <div>{children}</div>
    </section>
  );
}

/** The opening block of a project page: what it is, the claim, and the role line. */
export function ProjectHead({ label, h, lede, lang }: { label: string; h: string; lede: string; lang: Lang }) {
  const head = useRef<HTMLDivElement>(null);
  useCellWake(head, [lang]);
  return (
    <div className="flow-head" ref={head}>
      <p className="label">{label}</p>
      <h1 className="stage-h">{h}</h1>
      <p className="flow-lede">{lede}</p>
    </div>
  );
}
