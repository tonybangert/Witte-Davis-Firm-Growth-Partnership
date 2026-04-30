# Witte-Davis-Firm-Growth-Partnership
# Witte Davis Interactive Proposal Walkthrough
## Build Brief and Instruction Set

**Project Name:** witte-davis-walkthrough
**Client:** Witte Davis (PerformanceLabs / Aplora joint pitch)
**Format:** Interactive web application
**Delivery context:** Live Zoom screen share, ~30 minute walkthrough
**Stack:** React + Vite, Tailwind CSS, Framer Motion, Recharts, deployed on Vercel
**Repo target:** New repo, follows the same structure as the CK Marketing board proposal app

---

## 1. Project Context

### What This Is
An interactive, animated, narrative walkthrough application that replaces a traditional sales deck. PerformanceLabs and Aplora are pitching a 90-day embedded engagement to Witte Davis, a new boutique environmental law firm. The walkthrough will be screen-shared during a live Zoom call with all key stakeholders present.

### Audience in the Room
- **Ned Witte** - Founding partner, 35+ years environmental law, top-of-market PFAS practitioner. Senior buyer. Skeptical of vendor pitches by default. Will respond to substance and specificity.
- **Heather Davis** - Founding partner, 20+ years, multi-state, ESG and climate disclosure specialist, marketing-fluent (former gallery director, marketing background pre-law). Will respond to design quality and brand thinking.
- **Kathleen** - Legal operations. Currently does manual time entry reconstruction in Clio. Influential internal champion if the deck speaks to her operational pain.
- **Tony Bangert** - PerformanceLabs founder, leading the call.
- **Paul Gardner** - Brand and design lead, Aplora joint venture.
- **Eric Lovold** - Engineering lead, Aplora joint venture.

### Walkthrough Objective
By the end of 30 minutes, Ned and Heather should feel three things:
1. We understand their daily reality at a level that surprised them.
2. The technology and brand work is real, not vapor.
3. The partnership feels inevitable, not transactional.

### What This App Is Not
- Not a slide deck dressed up with animations
- Not a marketing site
- Not a self-service experience (Tony narrates throughout)
- Not interactive for the sake of interactive (every interaction earns its place)

---

## 2. Visual Theme and Design Direction

### Aesthetic Concept
**Architectural blueprint precision meets environmental data visualization.** The visual language should evoke the discipline of legal practice (clean lines, careful structure, document craft) overlaid with environmental data primitives (topographic contour lines, watershed flows, soil strata, water tables). The result should feel sophisticated, slightly technical, and quietly distinctive. Not "earthy law firm." Not "tech bro AI startup." Something in between that feels purpose-built for a senior environmental boutique.

### Color Palette

**Primary palette:**
- Deep forest `#1B3B2F` (primary surface, dark sections)
- Slate ink `#1F2937` (primary text on light backgrounds)
- Warm cream `#F4EFE6` (light backgrounds, soft contrast)
- Bone white `#FAFAF7` (page background)
- PerformanceLabs navy `#102D50` (institutional accent, used sparingly to signal partnership)

**Accent palette:**
- Copper signal `#B86F3D` (highlights, CTA hovers, key data points). This replaces the typical orange. More earth-toned, more sophisticated.
- Watershed blue `#3D6A8A` (secondary data, water/environmental references)
- Subtle sage `#8FA68E` (positive states, success, growth indicators)

**Critical rule:** Do not use bright/saturated greens or stock environmental colors. The palette should feel like a specialty firm, not a sustainability nonprofit.

### Typography
- **Display/headlines:** A high-quality serif with editorial weight. Recommend Fraunces (variable weight, available on Google Fonts) for its blend of legal/literary gravitas and modern responsiveness. Use the optical-size axis aggressively at large sizes for that "publication" feel.
- **Body/UI:** Inter for body and interface elements. Clean, neutral, reads well at all sizes.
- **Monospace accent:** JetBrains Mono for data, code, technical elements (used sparingly).
- **Headline weights:** 700 for primary headlines, 500 for secondary
- **Body weight:** 400 for paragraphs, 500 for emphasis, 600 for inline data

### Texture and Surface Treatments
- Subtle topographic contour lines as decorative background elements (very low opacity, 5-8%, behind content)
- Watershed flow lines as section dividers (animated SVG paths, drawn-on)
- Blueprint grid (faint, 24px) as a base layer on dark sections
- Soft paper texture on cream backgrounds (very subtle, 3-5% noise)
- No drop shadows on cards. Use thin 1px borders in muted tones instead.

### Motion Principles
- **Purposeful, never decorative.** Animation conveys meaning or directs attention. Never used for spectacle alone except in the intro.
- **Easing:** Custom cubic-bezier `cubic-bezier(0.22, 1, 0.36, 1)` for most transitions. Feels deliberate.
- **Duration:** 600-900ms for major transitions, 300-400ms for micro-interactions, 150ms for hovers.
- **Reduced motion respect:** All major animations have a `prefers-reduced-motion` fallback.

---

## 3. Information Architecture

The walkthrough is structured as a guided narrative with 9 sections. Tony controls progression with arrow keys or click-to-advance. Each section has a clear purpose and intended emotional beat.

### Section 1: Cold Open Animation (90 seconds)
**Purpose:** Establish that we understand their daily reality before we ever pitch anything.
**Emotional beat:** Recognition. "They actually see what we deal with."

### Section 2: The Firm You Are Building
**Purpose:** Acknowledge the credentials and weight of what Ned and Heather have done.
**Emotional beat:** Respect. "These people did their homework."

### Section 3: The Engagement
**Purpose:** Frame the 90-day partnership at a high level.
**Emotional beat:** Clarity. "I understand what they are proposing."

### Section 4: The 90-Day Plan
**Purpose:** Walk through Months 1, 2, 3 with deliverables.
**Emotional beat:** Confidence. "They have actually thought this through."

### Section 5: Aplora Legal Demo Simulation
**Purpose:** Show, don't tell. Live PFAS query through a mock interface.
**Emotional beat:** Credibility. "This is real software solving a real problem."

### Section 6: The Time Recovery Animation
**Purpose:** Make the ROI math viscerally felt, not just understood.
**Emotional beat:** Wonder. "I can actually see those hours coming back."

### Section 7: Investment
**Purpose:** Present pricing in context of value delivered.
**Emotional beat:** Reasonableness. "This is fair given everything we just saw."

### Section 8: What This Actually Buys You
**Purpose:** Land the human payoff. Headspace, resilience, partnership.
**Emotional beat:** Resonance. "They get what we are really after."

### Section 9: Why Now / Close
**Purpose:** Anchor the moment. PFAS, the regulatory wave, the firm they want to be by 2030.
**Emotional beat:** Conviction. "This is the right time to do this."

---

## 4. Detailed Section Specifications

### Section 1: Cold Open Animation

**Duration:** 60-90 seconds total. Auto-plays on load. Includes a "skip intro" button in the corner for repeat viewings, but it's intended to play in full during the live presentation.

**The Sequence:**

Opens on a black screen with a single line of typewriter text appearing at center:
> "It is Tuesday at 7:47 PM."

Beat. Then the screen fragments into a cinematic montage of overlapping animated vignettes representing the daily reality of running a firm. Each vignette is a small animated SVG illustration with subtle motion, layered and revealed in choreographed sequence:

1. **Email pile vignette.** An inbox visualization showing 47 unread messages. The number ticks upward as we watch. A timestamp shows "11:23 PM." Frustration energy.
2. **Handwritten note vignette.** A yellow legal pad with handwritten notes appears. Hand-drawn pen strokes animate across the page. Notes include phrases like "PFAS - WDNR follow-up," "call client re: SB 253," "permitting question." A magnifying glass hovers, searching, but cannot find what it's looking for.
3. **Time tracking vignette.** A calendar grid with billable hours visualizing as small blocks. The blocks are sparse and uncertain. A scrolling email thread runs alongside, with a question mark appearing: "0.3 hours? 0.5? 0.7?" Reconstructing time from fragments.
4. **The split.** All three vignettes momentarily collapse into a single visual: a tired silhouette of a lawyer at a desk, late at night, surrounded by the visual chaos of the three problems.

Beat. Then the chaos resolves. The vignettes reorganize into clean, structured forms:

5. **The resolution.** The same lawyer silhouette is now backlit by clean information architecture. The handwritten notes are indexed and searchable. The emails are triaged into priority lanes. The time blocks fill themselves in automatically. The energy shifts from frustration to ease.

The screen finally clears and resolves to the title:

> **WITTE DAVIS**
> *A 90-Day Partnership with PerformanceLabs and Aplora*

**Technical implementation notes:**
- Build as a single Framer Motion sequence with orchestrated timeline
- All illustrations as inline SVG components, animated via Framer Motion
- Background uses subtle blueprint grid that draws itself in during the resolution
- Audio: optional ambient soundscape (very subtle, mutable). If included, transitions from sparse/anxious tones during the chaos to a single resolved chord at the end. Default to muted; Tony can enable if desired.
- Includes a "Replay intro" button after the first play
- After title resolves, auto-advance prompt appears: "Continue →" but does not auto-progress

**Why this matters:** This animation is the single most important moment in the deck. If it lands with Ned, Heather, and Kathleen seeing themselves in those vignettes, every section after this rides on momentum. Build with care. Iterate until it feels like cinema, not animation.

---

### Section 2: The Firm You Are Building

**Layout:** Full-screen split. Left side displays a editorial-style headline. Right side reveals three credential pillars one at a time as Tony narrates.

**Headline copy:**
> "You are not building another firm.
> You are building the firm that defines the regional PFAS market for the next decade."

**Credential pillars (revealed via scroll or click-advance):**

1. **Ned's standing.** Visual: a stylized legal-document treatment listing the credentials. Chambers USA. Best Lawyers Lawyer of the Year. Biden-Harris EPA PFAS advisory. WDNR Secretary appointment. WisPAC co-chair. ASTM AC417.
2. **Heather's standing.** Visual: a multi-state map with NC, WI, KY, TX highlighted. Underneath, key practice anchors: anchor in-house counsel relationship, ESG and climate disclosure expertise, CA SB 253/261, EU CSRD/CSDDD, EPR regimes.
3. **The combination.** Visual: a Venn diagram showing where Ned's expertise (PFAS regulatory and remediation) and Heather's expertise (corporate environmental and climate disclosure) overlap. The center is highlighted as "the firm Witte Davis is uniquely positioned to be."

**Motion notes:**
- Credential items reveal with a "stamp" animation - they don't fade in, they appear as if being authenticated
- Each item has a subtle topographic line accent in the background
- The Venn diagram draws itself live, with the center revealing last

---

### Section 3: The Engagement

**Layout:** Center-stage statement format. One large statement, three supporting columns underneath.

**Top statement:**
> "A 90-day embedded partnership designed to deliver three outcomes."

**Three columns (animate in sequence):**

| Pillar | Description |
|---|---|
| **Recovered Time** | Daily friction removed. Hours returned to billable work, BD, or life. |
| **Aplora Legal** | A private AI platform tuned to your PFAS, multi-state, and climate disclosure practice. |
| **Brand and Engine** | Repositioned digital presence and an active business development rhythm. |

**Visual treatment:** Each column has an icon built from architectural/blueprint elements. Time pillar uses a clock-as-watershed-spiral motif. Aplora pillar uses a layered document with a subtle data-flow line. Brand pillar uses an interconnected network/topography motif.

**Motion:** Columns rise from the bottom one at a time with a ~400ms stagger. Each icon completes its drawing animation as the column lands.

---

### Section 4: The 90-Day Plan

**Layout:** Interactive timeline. A horizontal track runs across the screen with three clearly demarcated phases. Tony can click each month to expand its detail.

**Timeline interaction:**
- Default view shows three labeled phases: "01 Foundation," "02 Build," "03 Scale"
- Clicking a month expands an inline detail card with deliverables
- A subtle "drawing" animation runs along the timeline as each month is expanded
- Visual metaphor: the timeline itself looks like a watershed flowing left to right, with deliverables as tributaries joining the main flow

**Month 1 - Foundation**
*Listen, map, and ship the first wins.*
- Discovery and workflow mapping with Ned, Heather, and Kathleen
- Brand and voice audit
- Internal knowledge inventory
- Business development discovery
- **Ship:** Aplora Legal v1 by end of Month 1

**Month 2 - Build**
*Turn discovery into automation. Turn brand into presence.*
- Workflow automation: time tracking, secure note pipeline, email triage
- Aplora Legal v2 with deeper PFAS, multi-state, and climate disclosure tuning
- Website repositioning and SEO recovery
- BD activation: content cadence, speaking opportunities, referral system
- **Ship:** Aplora Legal v2, repositioned website, BD playbook in motion

**Month 3 - Scale**
*Make it durable. Make it yours.*
- Aplora Legal hardened to production-grade
- Workflow optimization round two with measured time recovery per attorney
- Marketing engine live with first published thought leadership
- 12-month strategic roadmap
- **Ship:** Production platform, measured ROI, defined ongoing relationship

**Special moment:** When Tony clicks Month 1, a small visual nod to Kathleen appears: a card surfaces noting "Working session with Kathleen to map current operations workflows." This is a deliberate signal that we see her role.

---

### Section 5: Aplora Legal Demo Simulation

**This is the centerpiece interactive moment.** Build with care. It needs to feel like real software, not a slick mockup.

**Layout:** Full-screen mock interface that resembles a polished AI workspace, styled in the Aplora aesthetic (deep forest surface, cream content area, copper accents). The interface has the feel of a hybrid between a research tool and a chat interface.

**Interface elements:**
- **Left rail:** Practice area filters (PFAS, Climate Disclosure, Multi-State Regulatory, M&A Due Diligence) with PFAS pre-selected
- **Center:** Query input field with placeholder "Ask Aplora Legal..."
- **Right rail:** Source library showing tuned data sources (CERCLA, WDNR remediation framework, ASTM AC417, state action levels for WI/NC/KY/TX, EU CSRD, CA SB 253/261)
- **Status bar:** Shows "Privileged. Private. Yours." in subtle text

**The simulated query:**

When Tony clicks the query input or presses a key, a realistic PFAS query types itself in (typewriter effect):

> "Compare PFAS soil action levels across Wisconsin, North Carolina, Kentucky, and Texas. Note any pending regulatory changes and flag implications for a manufacturing client with operations in all four states."

**The simulated response:**

Aplora "thinks" briefly (a subtle progress indicator with the language "Cross-referencing 4 jurisdictional frameworks..." then "Reviewing 23 regulatory documents..." then "Synthesizing comparison..."). Then the response streams in like real AI output, but the content is curated and accurate-feeling:

- A clean comparison table of action levels by state
- Footnoted citations to specific regulatory documents
- A flagged section noting recent WDNR proposed changes
- A practical recommendation framed as "Considerations for your client" with three bullet points
- Below the response: a "Save to Matter" button, a "Generate Client Memo" button, a "Track Regulatory Changes" toggle

**Critical elements that make this feel real:**
- The response should be substantive enough that Ned and Heather mentally evaluate it as if it were real legal output
- Citations should reference real regulatory frameworks (use general but accurate names)
- The "thinking" indicators should reference specific operations Aplora is performing
- The interface chrome should feel like production software, not a demo

**Tony narrates throughout:** "Watch what happens when Heather asks this in the middle of a Tuesday afternoon. She has 14 minutes between meetings. Aplora gives her a defensible starting point in 30 seconds, with citations she can verify, in an environment where the query never leaves your control."

**Secondary interaction:** After the response completes, Tony can click "Generate Client Memo" and a styled PDF preview slides in showing a polished memo draft with the firm's branding. This demonstrates the workflow loop, not just the query.

---

### Section 6: Time Recovery Animation

**Purpose:** Make the ROI math visceral, not just numerical.

**Layout:** Center-stage data visualization with a controlled animation sequence and live-adjustable inputs.

**The animation:**

Stage 1 - Establish the current state:
- A weekly calendar grid appears showing a typical week for one attorney
- Various blocks of time are highlighted in muted colors representing different friction sources: red-orange for "email triage time," dusty blue for "time entry reconstruction," sage for "note retrieval"
- The total visible friction time animates a counter: "8 hours per week per attorney"
- A second attorney calendar appears next to it, showing the same pattern
- Counter updates: "16 hours per week firm-wide"

*Wait—I need to reconcile this with the proposal's actual conservative number. The proposal uses 4 hours/week per attorney recovered. Let me restate the animation to match.*

Stage 1 (corrected) - Establish the current state:
- Two attorney week-views side by side
- Friction blocks visualize across each week, totaling 4 hours per attorney
- Counter: "Conservative friction across 2 attorneys: 8 hours per week"

Stage 2 - The recovery sequence:
- One by one, friction blocks "evaporate" with a gentle particle effect (think soft topographic dust)
- Each evaporated block drops into a "recovered hours" container at the bottom
- A subtle counter ticks: "1 hour... 2 hours... 4 hours..."
- The blocks reform on the right side as billable-hour blocks (50% conversion rate visualized)

Stage 3 - The compound math:
- The 4 billable hours fan out across 13 weeks (the engagement period)
- A revenue counter animates upward: "$32,500 recovered during the engagement"
- The view zooms out to show 52 weeks
- Counter continues: "$130,000 recovered annually"
- Final visual: a clean 3.6x return ratio appears, with the engagement cost ($36,000) and Year 1 return ($130,000) visualized as a comparative bar

**Live-adjustable inputs:**

Below the animation, Tony has access to three sliders he can adjust live during the conversation:
1. **Hours recovered per week per attorney** (default: 4, range: 2-8)
2. **Billable conversion rate** (default: 50%, range: 30%-80%)
3. **Blended hourly rate** (default: $625, range: $500-$800)

When Tony adjusts a slider, the animation re-renders with the new numbers in real time. The Year 1 revenue and ROI multiple update fluidly. This gives Tony the ability to say to Ned and Heather: "What if we're conservative and assume only 30% conversion? Even then, watch what happens."

**Default state shows the conservative scenario from the proposal.** Tony controls when to introduce the live adjustment, typically as a "let me show you what happens if we are even more conservative" moment.

---

### Section 7: Investment

**Layout:** A clean pricing presentation with the same structure as the proposal PDF, but enhanced for live presentation.

**Visual structure:**
- Centered headline: "Investment"
- A pricing card with the two-line breakdown (Aplora Legal Platform + Embedded Advisory)
- Total of $36,000 anchored visually
- A small caption beneath: "Even monthly cadence. No upfront payment."

**Subtle interaction:** As Tony hovers over each line, a small tooltip appears showing what that line includes. This lets Tony answer questions without leaving the slide.

**Optional flip:** A toggle in the corner allows Tony to flip the view to show "Year 1 Math" - which displays the engagement cost stacked against the recovered Year 1 revenue, with the difference highlighted as net Year 1 gain.

---

### Section 8: What This Actually Buys You

**Layout:** Editorial spread with a poetic layout. Less like a pitch slide, more like the closing essay of a thoughtful publication.

**Top headline:**
> "What this actually buys you."

**Below, in a flowing layout that does not feel like bullet points:**

Six concept cards arranged in a deliberately asymmetric grid. Each card has a single concept word as its headline, with a brief evocative description. As Tony reads each, the corresponding card subtly highlights.

1. **Headspace** - The room to think and stop carrying the firm home with you at night.
2. **Resilience** - When one of you is heads-down, the firm keeps moving.
3. **Partnership** - When neither of you is drowning, you show up for each other better.
4. **Reach** - Charlotte and Bayside operating as one firm.
5. **Selectivity** - The privilege of choosing the work that matters.
6. **Fit** - Software, brand, and operations made for who you actually are.

**Visual treatment:**
- Each card uses a subtle environmental data motif as background (topographic lines, watershed flow, soil strata)
- Typography leans heavily on the serif display font
- Generous white space - this section should feel like the proposal exhaling

**Motion:** Cards reveal one at a time as Tony advances. The cumulative effect should feel like a poem assembling itself.

---

### Section 9: Why Now / Close

**Layout:** Cinematic closing statement with a single-screen reveal.

**Sequence:**

A slow zoom-in on a single statement that reveals one phrase at a time:

> *PFAS is the defining environmental practice of the next decade.*
>
> *The firm that pairs senior practitioner authority with the right operational and technological foundation in 2026...*
>
> *...will be the firm that defines the regional market by 2030.*
>
> **That is the firm we want to help you build.**

The final line fades in last and holds.

Below the statement, a single subtle CTA: "Let's talk through next steps."

---

## 5. Technical Specifications

### Stack
- React 18 + Vite
- Tailwind CSS for styling (use the brand palette as Tailwind theme extensions)
- Framer Motion for all animations
- Recharts for any data visualization (the time recovery animation can use a hybrid of custom SVG + Recharts)
- Lucide React for any iconography (use sparingly; prefer custom SVG for branded elements)
- Deploy to Vercel
- Single-page application with section-by-section navigation

### Navigation Mechanics
- Arrow keys (left/right) advance and rewind
- Spacebar advances
- A subtle progress dots indicator at the bottom of every screen shows current section
- Click-anywhere-to-advance is disabled (prevents accidental progression during conversation)
- A small "section map" toggle in the corner allows Tony to jump to any section

### Performance
- All animations should be GPU-accelerated where possible (transform, opacity)
- Heavy assets (Aplora demo response content) preload during the cold open
- Target 60fps on a typical MacBook Pro
- Test specifically on Zoom screen-share which can degrade performance

### Responsive Considerations
- Designed for desktop screen-share at 1920x1080
- Should degrade gracefully to 1366x768
- Mobile is not a target - this is a presentation tool, not a public site

### File Structure
```
src/
├── components/
│   ├── sections/
│   │   ├── Section1ColdOpen.jsx
│   │   ├── Section2TheFirm.jsx
│   │   ├── Section3Engagement.jsx
│   │   ├── Section4NinetyDayPlan.jsx
│   │   ├── Section5AploraDemo.jsx
│   │   ├── Section6TimeRecovery.jsx
│   │   ├── Section7Investment.jsx
│   │   ├── Section8WhatThisBuys.jsx
│   │   └── Section9Close.jsx
│   ├── shared/
│   │   ├── Navigation.jsx
│   │   ├── ProgressDots.jsx
│   │   ├── SectionMap.jsx
│   │   └── BackgroundLayers.jsx (topographic, blueprint grid, etc.)
│   └── animations/
│       ├── EmailPileVignette.jsx
│       ├── HandwrittenNoteVignette.jsx
│       ├── TimeTrackingVignette.jsx
│       └── (other intro vignettes)
├── data/
│   ├── aploraDemoQuery.js (the simulated query and response content)
│   ├── timelineData.js
│   └── creditials.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

### State Management
- Use React's built-in state. No Redux, no Zustand needed for a presentation app.
- Section index is the primary state.
- Live ROI calculator state lives within Section 6 only.

---

## 6. Voice and Copy Direction

### Tone
- Confident without being aggressive
- Warm without being saccharine
- Specific over generic (always)
- Respectful of the reader's intelligence
- Lawyer-grade precision in language

### Language Rules
- **No em dashes anywhere.** Use periods, commas, or colons instead.
- **Avoid "we" overuse.** Don't start more than two consecutive sentences with "We."
- **Avoid "leverage," "synergy," "solutions," "ecosystem,"** and other consultantese.
- **Use specific names and references:** PFAS, CERCLA, CA SB 253, WDNR, ASTM AC417. These are credibility signals to Ned and Heather.
- **Acknowledge Kathleen explicitly** in operational sections.

### Sample Copy Standards

**Wrong:** "We leverage cutting-edge AI solutions to drive operational efficiency across your practice."

**Right:** "Aplora Legal handles the queries that would otherwise take Heather an hour, in 30 seconds, with citations she can defend."

---

## 7. Acceptance Criteria

The build is "done" when:

1. The cold open animation plays smoothly end-to-end on a fresh page load and feels like cinema, not animation.
2. All nine sections are navigable via arrow keys without page reloads.
3. The Aplora Legal demo simulation feels like real software. Ned and Heather, watching it, would not immediately think "this is a mockup."
4. The time recovery animation visually reinforces the ROI math, and the live sliders update the visualization in real time.
5. All copy reflects the language rules above. No em dashes anywhere.
6. The application performs at 60fps during a Zoom screen share on a MacBook Pro.
7. Tony can navigate the entire walkthrough without ever needing to consult notes about how the app works.

---

## 8. Pre-Build Decisions to Confirm with Tony

Before development begins, confirm with Tony:

1. Should the cold open animation include ambient audio, or stay silent by default?
2. Is there an existing Witte Davis logo or word mark to incorporate, or do we use a typographic treatment of the firm name?
3. For the Aplora demo simulation, should the simulated response reference real WDNR/state regulatory document names, or use generic-but-realistic placeholders?
4. Will any branded assets from the firm (photography, logo files) be available before build, or should we proceed with typographic and illustrative treatments only?
5. Does Tony want a "rehearsal mode" toggle that hides interactive controls and runs through the full walkthrough as a passive demo, useful for internal practice runs?

---

## 9. Build Timeline (Suggested)

**Week 1:** Visual design system, component library, all section layouts wireframed and styled. Cold open animation prototyped.

**Week 2:** Aplora Legal demo simulation built. Time recovery animation built with live sliders. All section copy locked.

**Week 3:** Polish pass. Performance optimization. Rehearsal with Tony, Paul, Eric. Final iteration based on rehearsal feedback.

**Target delivery:** Ready for live walkthrough one full week before the scheduled Witte Davis call, leaving time for rehearsal and refinement.

---

*End of brief.*
