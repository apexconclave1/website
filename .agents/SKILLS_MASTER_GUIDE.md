# Apex Conclave — Skills Master Guide

> Quick index of the project skills in `.agents/skills/` (read by Cursor, Codex, Gemini CLI, Copilot, OpenCode and others; linked from `.claude/skills/` for Claude Code). Installed with the `skills` CLI; `skills-lock.json` records each source and hash.

---

## Installed Skills

| # | Skill | Directory | Purpose |
|---|---|---|---|
| 1 | **Find Skills** | `skills/find-skills/` | Search skills.sh for a skill that fits a task. Present it and wait for the owner's OK before installing (never `-g -y`) |
| 2 | **iOS Design Guidelines** | `skills/ios-design-guidelines/` | Apple Human Interface Guidelines for iPhone; use the web-relevant rules (touch targets, text size, contrast, motion) for phone reviews |
| 3 | **macOS Design Guidelines** | `skills/macos-design-guidelines/` | Apple Human Interface Guidelines for Mac; use the keyboard, pointer, visual design and accessibility rules for laptop reviews |
| 4 | **k6** | `skills/k6/` | Grafana's k6 load-testing guide (scripts, executors, thresholds). Needs `brew install k6`; run with `K6_NO_USAGE_REPORT=true`. Never against production with heavy load |
| 5 | **k6 Perf Test Website** | `skills/k6-perf-test-website/` | Grafana's workflow for website load tests (smoke, average, breakpoint). Its Playwright/HAR recording path is optional and not used here |
| 6 | **Security and Hardening** | `skills/security-and-hardening/` | Addy Osmani's OWASP-based checklist: trust boundaries, input validation, uploads, secrets, rate limits, headers |
| 7 | **Supabase** | `skills/supabase/` | Supabase's own guidance: RLS, key exposure, storage policies. Its MCP server and CLI login are not used here |

The earlier hand-written skills (frontend design, animations, React, web guidance, SEO, analytics) were removed by the owner on 2026-10-23. Their rules that still apply live in `DESIGN.md` and `AGENTS.md`.

---

## How to Use Skills

1. **Read the relevant `SKILL.md`** before working on that aspect of the project.
2. **`DESIGN.md` wins** where a skill disagrees with the project's design system (the Apple skills are written for native apps).
3. **Check `PROGRESS.md`** to understand what has been done and what's next.
4. **New skills:** find with `find-skills`, read the files, ask the owner, then install project-level: `DISABLE_TELEMETRY=1 npx skills@<pinned> add <source> --skill <name> -a universal -a claude-code -y`.

---

## Skill Activation Guide

| When you're working on... | Activate skill... |
|---|---|
| Looking for a capability the project doesn't have | `find-skills` |
| Reviewing phone layouts, tap areas, text size | `ios-design-guidelines` |
| Reviewing laptop layouts, keyboard and pointer use | `macos-design-guidelines` |
| Load testing (many users at once) | `k6`, `k6-perf-test-website` |
| Security testing or hardening API routes, uploads, headers | `security-and-hardening` |
| Database access rules, keys, storage | `supabase` |
