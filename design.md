# Design — portfolio-vinh

Locked design system. Every page reads this file before emitting code. Extend or
amend it when the system needs to grow; do not regenerate it per page.

Replaces the previous system (atmospheric · studied-DNA from Vinh's ink drawings ·
Split Studio / Long Document / Catalogue). That system is retired, not paused.

## Genre

modern-minimal — technical, instrument-panel register.

## The idea

**Giấy ô li** — the quadrille paper every Vietnamese student writes on. The page is
drawn *on* that paper: an 8 px minor cell, a 40 px major rule every fifth cell,
faint blue like real notebook grid. Content does not sit on top of the grid; it
occupies cells. Cells that hold something wake up. Cells that hold nothing stay
faint.

The reference is a drafting sheet, not a dashboard. Everything aligns to the cell,
including the places where alignment is deliberately broken.

Pixel comes from the grid and from drawn marks — square bullets, stepped rules,
block cursors, corner ticks. **It does not come from a pixel typeface.** No pixel
face on Google Fonts carries Vietnamese diacritics; `ề`, `ữ` and `ậ` break or fall
back mid-line. Verified against the Google Fonts API, the same way the previous
system rejected Cinzel and Zen Old Mincho.

## Macrostructure family

Three sides, three shapes. A single shape reused three times would make them read
as tabs.

- **Profile (`home`)** — 19 · Map / Diagram. The person laid out as a system map on
  the sheet, addressed by coordinate rather than stacked in a column.
- **Project (`project`)** — 14 · Narrative Workflow. The three rooms become numbered
  stages `1.0 → 2.0 → 3.0`. Sequential content gets a sequential shape.
- **Drawings (`art`)** — 08 · Photographic. One drawing per fold, full bleed against
  the sheet. Type is annotation, never headline. No titles, no dates — see the
  content rule below.

## Nav and footer

- **Nav — N3 side-rail.** A vertical rail pinned to the left gutter carrying the
  three sides plus the language toggle. Sides are addressed like sheet references
  (`01 / 02 / 03`). Collapses to a top bar under 768 px.
- **Footer — Ft5 Statement.** One closing line, hairline rule above, colophon small.

## Theme — custom · "Ô li"

Paper band **light** · display style **grotesk-sans** · accent hue **warm (32°)**.

The vermilion survives the rebuild. It was read from Vinh's own drawings and is the
only part of the old system that is *his* rather than the genre's; dropping it would
trade a fingerprint for a stock accent. On light paper it is the seal mark, used at
under 3 % of any viewport.

```
--color-paper      oklch(97.6% 0.005 95)    warm notebook white
--color-paper-2    oklch(94.8% 0.007 95)    raised cell
--color-paper-3    oklch(91.5% 0.009 95)    plate bed
--color-ink        oklch(21% 0.011 250)     near-black, faint blue cast
--color-ink-2      oklch(47% 0.011 250)
--color-ink-3      oklch(64% 0.009 250)
--color-grid       oklch(72% 0.055 245)     the ô li line, used at low alpha
--color-accent     oklch(52% 0.190 32)      朱 vermilion, carried over
--color-accent-ink oklch(98% 0.004 95)
--color-focus      oklch(45% 0.160 250)     deliberately not the accent
```

## Typography

Verified for the `vietnamese` subset against the Google Fonts API before selection.

- **Display** — Space Grotesk 700, tracking `-0.02em`. Roman, never italic.
- **Body** — Be Vietnam Pro 400/500. Drawn for Vietnamese diacritics.
- **Mono** — JetBrains Mono 400/500. Coordinates, labels, stage numbers, figures.
- Type scale anchor: `--text-display: clamp(2.25rem, 5.5vw, 4.5rem)`.

## Spacing

4-point scale in `tokens.css`. **Every vertical rhythm value is a multiple of the
8 px cell** — the grid is load-bearing, so spacing that ignores it shows.

## Motion

GSAP, already a project dependency. Exactly three primitives:

1. **`cell-wake`** — grid cells around entering content raise opacity, then settle.
   The sheet draws itself as the reader descends.
2. **`stage-advance`** — the project's stage number counts up as its section takes
   the viewport.
3. **`plate-reveal`** — a drawing wipes in cell-by-cell from its top-left corner.

Easings: `--ease-out cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in-out
cubic-bezier(0.65, 0, 0.35, 1)`. No overshoot on UI state.

**Reduced motion** — all three collapse to a ≤150 ms opacity crossfade. The grid
renders at its resting opacity and never animates.

## Microinteractions stance

- Silent success. No toasts.
- Hover tooltips delay 800 ms; focus tooltips 0 ms.
- Focus rings appear instantly and are never animated.
- Hover on a cell-bounded element shifts its background one paper step. It does not
  lift, scale, or glow.

## CTA voice

- **Primary** — filled ink, square corners, mono label, one cell of padding on the
  short axis. Vermilion is reserved for the single most important action per side.
- **Secondary** — hairline box, ink text, same geometry. Never a pill; pills are
  round and this system has no radius.

## Copy rule — inherited, non-negotiable

`src/content.ts` carries an HONEST-COPY rule from the previous system and it stands:
**every figure is measured from the IntelliPath repository or its database.** Voice
may be rewritten; numbers may not. Images stay Vinh's own files in `/public/art`.

The drawings carry no titles, no medium lines, no dates, on purpose. Captioning a
hobby turns it into a portfolio piece being sold.

## Voice

Rewritten in this pass. The previous copy was manifesto-shaped: clipped fragments,
stacked negation (*"Không phải dự án, không bán, chỉ treo ở đây"*), aphorisms
(*"dựng cho đúng trước, đẹp tính sau"*), and a closing move that told the reader what
to conclude.

The new voice is an engineer describing a system: full sentences, one claim each, no
aphorism, no summary line telling the reader what they just read. Where the old copy
argued, the new copy states and lets the measured figures argue.

Both languages carry the same voice. Vietnamese is the primary; English is a
translation of it, not a separate register.

## What pages MUST share

Grid geometry (8 px cell / 40 px major). Type pairing. Accent placement (≤ 3 %).
Side-rail nav. CTA geometry. The `cell-wake` reveal.

## What pages MAY differ on

Macrostructure within the family above. Whether a fold is full-bleed. Density —
the profile is sparse, the project is dense, the drawings are almost empty.

## Exports

### tokens.css

Source of truth is `src/tokens.css`. It carries every `--color-*`, `--font-*`,
`--space-*`, `--text-*`, `--ease-*`, `--dur-*`, `--cell-*` and `--rule-*` token used
in the build. Page CSS references tokens by name and never inlines a raw value.
