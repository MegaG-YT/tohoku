@AGENTS.md

# Hokkaido Tohoku Project

## Git Workflow

After completing any task:
1. Stage all changed files: git add -A
2. Commit with a descriptive message in conventional format:
   - feat: new features
   - fix: bug fixes
   - chore: maintenance, cleanup
   - style: styling/CSS only changes
   - docs: documentation updates
   - refactor: code restructuring without behavior change
3. Push to main: git push origin main

Always commit and push after completing work. Do not wait for the user to ask. Every task ends with a push.

## Design Rules (always apply)

- Never use emojis in UI — lucide-react icons only
- Never use purple gradients or flashy effects
- Match existing component patterns exactly
- Read existing components before creating new ones to match the established style
- Prefer editing existing files over creating new ones

### Brand & Color System
- Colors are defined as CSS custom properties in `globals.css` using `--brand-*` prefix
- Use CSS custom properties from `globals.css` — never hardcode hex values in components
- Colors will be refined during implementation to match the Adobe XD source

### Typography
- Noto Sans JP (primary) + Inter (Latin fallback) + Hiragino Sans, Meiryo, sans-serif
- Font stack is configured in `globals.css` via `--font-sans`

### Animation Rules
- Use Framer Motion for all animations — no raw CSS animations
- Scroll animations: `useInView` with `once: true` (don't re-trigger)
- Default entrance: 30px translate-y + opacity fade, staggered 0.1s for groups
- Only animate `transform` and `opacity` (GPU-accelerated properties)
- Respect `prefers-reduced-motion` — disable or reduce animations when set
- Parallax on hero only, not on other sections
- Tab transitions use `AnimatePresence` for crossfade
- Hover effects: scale lift + shadow on cards, color transitions on interactive elements

### Image Handling
- Use `next/image` for all images — never raw `<img>` tags
- WebP format preferred, with blur placeholders
- Lazy-load all images below the fold
- All images require descriptive Japanese alt text

### Section Divider (Half-Pill Pattern)
When adding a section divider between page sections, use the half-pill pattern:
- Half-pill shape: `rounded-r-full border-2 border-l-0` — flush with left viewport edge, rounded only on right
- Width: `w-[60vw]` mobile / `w-[45vw]` tablet / `w-[33vw]` desktop (1/3 of screen)
- Text: right-aligned inside the pill using `flex items-center justify-end`, bold
- Line: a `h-[2px] flex-1` sibling extends from the pill's right edge to the right side of the screen
- Animation: Framer Motion slide-in from left (`x: "-100%"` → `x: 0`), 1.8s duration, `ease: [0.16, 1, 0.3, 1]`, `once: true`, viewport margin `-100px` top
- The pill wrapper needs `overflow-hidden` so the slide-in works; the outer container is `flex items-center`
- Place the divider OUTSIDE the `max-w-7xl` container so the pill touches the left edge and the line reaches the right edge
- Only change the `<h2>` text for each section — keep all other styles identical

### Component Architecture
- `components/ui/` — shadcn primitives only (button, card, tabs, sheet)
- `components/sections/` — page sections (header, hero, etc.)
- `components/shared/` — reusable pieces (section-wrapper, counter)
- Use shadcn/ui + CVA for variant-driven components
- Use `cn()` from `lib/utils.ts` for class merging — never concatenate class strings manually

### Responsive Design
- Mobile-first Tailwind classes always
- Nav: hamburger menu on mobile (shadcn Sheet, slide from right)

## Development Principles

- In general, do not propose changes to code you haven't read. Read files before modifying them.
- Avoid over-engineering. Only make changes that are directly requested or clearly necessary.
- Don't add features, refactor code, or make "improvements" beyond what was asked.
- Don't add docstrings, comments, or type annotations to code you didn't change.
- Don't add error handling or validation for scenarios that can't happen.
- Don't create helpers or abstractions for one-time operations.
- Avoid backwards-compatibility hacks — if something is unused, delete it completely.
- Be careful not to introduce security vulnerabilities (XSS, injection, etc.).

## Coding Standards

- All UI text in Japanese unless specified otherwise
- Use TypeScript strict mode patterns
- Server components by default, "use client" only when needed
- Dynamic imports for browser-only libraries (e.g., mapbox-gl):
  `const lib = (await import('library')).default`
- Validate at system boundaries (user input, external APIs), trust internal code

## Available MCP Servers

Claude Code has access to these MCP servers — use them instead of manual alternatives:

**perplexity** — Web search with full page content. Use for research and finding up-to-date information.

**filesystem** — Read/write/search files on the local machine outside the repo.

**n8n** — Workflow automation node docs and templates.

**context7** — Up-to-date documentation and code examples for any library.

Check available MCPs with the current session — some may be enabled or disabled depending on configuration.
