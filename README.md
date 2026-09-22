# portfolio-vinh

Personal site for **Đặng Phước Vinh** — backend developer, Software Engineering at FPT University HCMC.

```
React 19 · TypeScript · Vite · GSAP
```

## The idea

The grid behind the page is not a backdrop. **Every content block projects its four edges across the sheet**, the way a drafting sheet projects an object's edges out to its margins — so the cells you see are consequences of the layout, and there is no line on the page that isn't the edge of something. Move a block and its lines move with it.

Two earlier attempts are named in [`src/Grid.tsx`](src/Grid.tsx) so nobody re-proposes them: an 8px quadrille mesh (notebook paper — it competed with the type instead of measuring it) and a 12-column guide set (correct, and borrowed from every framework that ships one).

## Structure

| Path | What it is |
|---|---|
| [`src/Grid.tsx`](src/Grid.tsx) | The canvas that draws the projections, and the `useCellWake` hook blocks register with |
| [`src/content.ts`](src/content.ts) | Every string, in Vietnamese and English. **Facts live here, never in a component.** |
| [`src/pages/Home.tsx`](src/pages/Home.tsx) | Profile, laid out as a system map rather than a column |
| [`src/pages/Project.tsx`](src/pages/Project.tsx) | The project side: the index at `#/project`, one project at `#/project/<id>` |
| [`src/projects/registry.ts`](src/projects/registry.ts) | The list of projects. The index, the profile and the next-project link all read it |
| [`src/projects/Stage.tsx`](src/projects/Stage.tsx) | The three numbered stages every project page is built from |
| `src/projects/<id>/` | One project: `copy.ts` (words and figures, both languages) and `Page.tsx` |
| [`src/tokens.css`](src/tokens.css) | Colour, type and spacing tokens |
| [`design.md`](design.md) | The locked design system. Read it before changing the visual layer. |

## Two rules this repo keeps

**Honest copy.** Every figure was measured from the repository of the project it describes — [IntelliPath](https://github.com/InteliRoadMap), [jev-1000-com-tam](https://github.com/dpvinh30092005/jev-1000-com-tam) — and carries a note saying where. Change a number in that project's `copy.ts`, never in a component.

**Motion never decides whether content exists.** Each animated thing rests in its *visible* state and the tween plays it back in. A reveal that has not run — reduced motion, a throttled tab, GSAP failing to load — leaves the content on screen rather than hiding it. Three separate bugs during the build came from getting this backwards.

## Adding a project

1. Create `src/projects/<id>/copy.ts` — every string in `vi` and `en`, and a note at the top saying where each figure was measured.
2. Create `src/projects/<id>/Page.tsx` — `ProjectHead`, then `Stage` 1.0 / 2.0 / 3.0 from `../Stage`. Figures reuse the notes side's marks (`Fig`, `Defs`, `Limit` and the `.d-*` classes) and spend vermilion on one mark each.
3. Add one entry to `PROJECTS` in `src/projects/registry.ts`: `id` (the URL segment), `no` (the next `02.n`), `name`, `role`, `blurb`, `tags`, and `Page: lazy(() => import("./<id>/Page"))`.

Nothing else changes: the index, the profile's "go on" cards and the next-project link all read the registry, and each page is its own chunk.

## Running it

```bash
npm install && npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

Type checking runs as part of `build` (`tsc -b`).

## Accessibility and responsiveness

Verified at 320 / 375 / 414 / 768 px: no horizontal scroll, no two-line clickable text, and touch targets on the rail are at least 44px. `prefers-reduced-motion` collapses every reveal to an opacity crossfade and the grid renders at rest.
