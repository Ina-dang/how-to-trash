# AGENTS.md

## Project
- Name: `how-to-trash`
- Stack: Next.js App Router, TypeScript, Tailwind CSS, npm
- Primary language: Korean

## Goal
- Build an MVP for checking local trash disposal rules by region.
- Current MVP target: Yeongdeungpo-gu, Seoul.
- Keep the product simple, practical, and easy to scan.

## Coding Rules
- Prefer TypeScript without `any`.
- Prefer small, readable components and straightforward data flow.
- Follow App Router conventions and keep server/client boundaries explicit.
- Do not add new dependencies unless clearly necessary.
- Reuse existing code before introducing abstractions.
- Keep style definitions and UI components in separate files when introducing reusable patterns.
- Keep component-specific styles next to the component in `*.style.ts` files and prefer `cva` for reusable class definitions.
- Check the installed Next.js docs in `node_modules/next/dist/docs/` if framework behavior is uncertain.

## UI Rules
- Mobile-first.
- Korean-first copy.
- Prefer Tailwind utility classes for styling.
- Use `cn` from `src/lib/utils.ts` when conditional class composition is needed.
- Prioritize clarity over decoration.
- Avoid overengineering animation, state, or design system work during MVP.

## Data Rules
- Static or mock data is acceptable for MVP.
- Prefer explicit source links for disposal rules.
- Do not invent official policy details.

## Workflow
- Understand existing files before editing.
- Make minimal changes that move the MVP forward.
- Prefer conventional commit messages when suggesting commits.
