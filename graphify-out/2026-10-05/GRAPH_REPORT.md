# Graph Report - portfolio-v4  (2026-10-05)

## Corpus Check
- 47 files · ~13,741 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 306 nodes · 386 edges · 24 communities (17 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c4d9fccb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Portfolio Website — Implementation Plan
- dependencies
- devDependencies
- page.tsx
- Farrely Firenza
- components.json
- compilerOptions
- hero.tsx
- layout.tsx
- car-scene.tsx
- include
- resume.ts
- navbar.tsx
- button.tsx
- README.md
- theme-flash.tsx
- opengraph-image.tsx
- AGENTS.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Portfolio Website — Implementation Plan` - 15 edges
3. `resumeData` - 10 edges
4. `FadeIn()` - 9 edges
5. `StaggerContainer()` - 8 edges
6. `StaggerItem()` - 8 edges
7. `Farrely Firenza` - 8 edges
8. `include` - 7 edges
9. `tailwind` - 6 edges
10. `aliases` - 6 edges

## Surprising Connections (you probably didn't know these)
- `SmoothScroll()` --references--> `lenis`  [EXTRACTED]
  src/components/motion/smooth-scroll.tsx → package.json
- `Cars()` --indirect_call--> `launchRace()`  [INFERRED]
  src/components/world/race-world.tsx → src/lib/race-state.ts
- `ThemeToggle()` --calls--> `useThemeTransition()`  [EXTRACTED]
  src/components/shared/theme-toggle.tsx → src/components/shared/use-theme-transition.ts
- `Button()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/button.tsx → src/lib/utils.ts
- `RaceWorldMount()` --calls--> `useMediaQuery()`  [EXTRACTED]
  src/components/world/race-world-mount.tsx → src/hooks/use-media-query.ts

## Import Cycles
- None detected.

## Communities (24 total, 7 thin omitted)

### Community 0 - "Portfolio Website — Implementation Plan"
Cohesion: 0.06
Nodes (32): 10. Accessibility Checklist, 11. Data Schema (TypeScript), 12. Next.js v16 Specific Considerations, 13. Open Questions & Decisions, 14. Success Criteria, 1. Overview & Design Philosophy, 2. Information Architecture (Single Page), 3. Tech Stack & Dependencies (+24 more)

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (29): class-variance-authority, clsx, framer-motion, lucide-react, next, next-themes, dependencies, class-variance-authority (+21 more)

### Community 2 - "devDependencies"
Cohesion: 0.07
Nodes (27): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+19 more)

### Community 3 - "page.tsx"
Cohesion: 0.20
Nodes (15): FadeIn(), FadeInProps, StaggerContainer(), StaggerContainerProps, StaggerItem(), AboutSection(), AwardsSection(), CourseworkSection() (+7 more)

### Community 4 - "Farrely Firenza"
Cohesion: 0.08
Nodes (23): About, Awards, Best Project 3 of Kelas Rutin by Blockdev.id, Certified UX Designer — Google x FGA Digitalent, Certified Visual Designer — Adobe, Chatto, Coursework, Education (+15 more)

### Community 5 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 7 - "hero.tsx"
Cohesion: 0.09
Nodes (24): LIVERIES, Livery, PartTone, _a, _b, CarHandle, Cars(), clamp01() (+16 more)

### Community 8 - "layout.tsx"
Cohesion: 0.12
Nodes (14): lenis, lenis, barlow, geistMono, geistSans, metadata, SmoothScroll(), ThemeProvider() (+6 more)

### Community 9 - "car-scene.tsx"
Cohesion: 0.32
Nodes (5): CarSvg(), HeroFallback(), ease, HeroSection(), stats

### Community 11 - "resume.ts"
Cohesion: 0.25
Nodes (7): Award, Course, Education, Experience, Project, ResumeData, Technologies

### Community 12 - "navbar.tsx"
Cohesion: 0.43
Nodes (4): Navbar(), navLinks, ThemeToggle(), useThemeTransition()

### Community 13 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 14 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **151 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+146 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `layout.tsx`, `devDependencies`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `lenis` connect `layout.tsx` to `dependencies`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _151 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio Website — Implementation Plan` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Farrely Firenza` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._