# Witte Davis · Interactive Proposal Walkthrough

A nine-section narrative walkthrough Tony narrates over Zoom for Witte Davis Law (Ned, Heather, Kathleen). Designed for a 1920×1080 screen share, arrow-key driven, no auto-progression.

## Quick start

    npm install
    npm run dev          # http://localhost:5187
    npm run build
    npm run lint:emdash  # brand rule check, fails on any U+2014 in src/

## Stack

- React 18 + Vite 5
- Tailwind CSS v4 (`@tailwindcss/vite`, theme tokens in `src/index.css`, no PostCSS)
- Framer Motion 12 for orchestrated transitions and micro-animations
- Recharts (available, not yet used)
- lucide-react for iconography
- Type: Fraunces (headlines), Inter (UI), JetBrains Mono (labels), via Google Fonts

## Section order (live)

| # | Label             | Surface | Steps | Role                                                |
|---|-------------------|---------|------:|-----------------------------------------------------|
| 1 | Cold Open         | dark    |     0 | Title page, narrative anchor, three friction cards  |
| 2 | The Firm          | cream   |     3 | Ned and Heather credentials, Venn framing           |
| 3 | Engagement        | cream   |     3 | Three pillars: Recovered Time, Aplora Legal, Brand  |
| 4 | 90-Day Plan       | cream   |     3 | Foundation, Build, Scale, revealed sequentially     |
| 5 | Aplora Demo       | dark    |     2 | Single-trigger orchestrated AI query simulation     |
| 6 | Year 1 Value      | cream   |     3 | Quantifies the three pillars, aggregates to ~$380k  |
| 7 | A Year From Now   | dark    |     5 | Future-state scene cards (mirrors §1 visually)      |
| 8 | Investment        | cream   |     1 | $36k pricing card                                   |
| 9 | Thank You         | dark    |     0 | Thank you + Aplora.ai · PerformanceLabs.ai          |

## Navigation

- Right arrow, space, PageDown advance (within a section's steps, then to next section)
- Left arrow, PageUp reverse
- Home, End jump to first or last section
- Section-map icon top-right opens a jump menu
- Click-to-advance is intentionally disabled

## Project structure

    src/
      App.jsx                       deck wiring + section registry
      main.jsx
      index.css                     Tailwind v4 theme tokens + global styles
      hooks/useDeckState.js         keyboard nav + step/section state
      components/
        sections/                   Section1ColdOpen ... Section9Close
        shared/                     BackgroundLayers, ProgressDots, SectionMap,
                                    Typewriter, Wordmark
        animations/                 Email/Note/Time vignettes for §1
      data/
        aploraDemoQuery.js          §5 simulated query + response
        credentials.js              §2 Ned + Heather credential lists
        quantifiedBenefits.js       §6 inputs and pillar definitions
        timelineData.js             §4 phases
    public/                         logos (witte-davis-logo.png in active use)
    scripts/lint-emdash.js          brand-standard linter

Filename note: `Section7Investment.jsx` and `Section8WhatThisBuys.jsx` swapped deck slots during iteration. The filename did not change; slot is determined by the SECTIONS array in `App.jsx`.

## Brand and copy rules (enforced)

- **No em dashes (U+2014) anywhere in `src/`.** `npm run lint:emdash` fails on any. Use periods, commas, semicolons, or parentheses.
- No "leverage / synergy / solutions / ecosystem" or other consultantese.
- Use real specifics: PFAS, CERCLA §121, WDNR NR 720, ASTM AC417, CA SB 253/261, EU CSRD.
- Palette tokens live in `src/index.css` under `@theme`. Use Tailwind classes (`bg-forest`, `text-copper`, etc.), never inline hex.
- Easing token: `cubic-bezier(0.22, 1, 0.36, 1)`, exposed as the utility class `.ease-deliberate`.

## Implementation notes

The current build differs from the original brief in several deliberate ways:

- **Section order swapped (§7 ↔ §8).** The deck now goes Quantified Value (§6) → Future-State scenes (§7) → Investment (§8) → Thank You (§9), so the price lands against both a felt and quantified value anchor.
- **§6 redesigned around three pillars** matching §3's promises (Recovered Time, Aplora Legal, Brand and Engine), with a four-act sequence ending in an aggregate Year 1 capacity number. Sliders moved into a per-pillar drawer.
- **§7 "A Year From Now"** replaces the original concept-card treatment with five future-state scene cards on a dark forest surface, mirroring §1 tonally as a structural bookend.
- **§5 plays as a single-trigger orchestrated sequence.** Arrow into step 1 fires the full ~15-second AI experience (query types, three thinking lines stagger in, synthesizing pulses, response streams in via requestAnimationFrame).
- **No partner logos in the deck.** Aplora and PerformanceLabs are credited typographically only on the Thank You slide as `Aplora.ai · PerformanceLabs.ai`.
- **Cold open vignettes** share a unified visual grammar (dark transparent shell, copper-mono eyebrow, big serif primary number, three colored-dot status bullets) rather than the original chaos-then-resolution animation sequence.

The original build brief is preserved in git history at commit `a885702`. Retrieve via `git show a885702:README.md`.

## Acceptance bar

- 60fps over Zoom screen share on a typical MacBook Pro
- All sections navigable via keyboard, no reloads
- `npm run lint:emdash` passes
- `npm run build` passes
- Tony can navigate the full walkthrough without consulting notes
