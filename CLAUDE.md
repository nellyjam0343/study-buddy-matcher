# CLAUDE.md

## Project
Study Buddy Matcher — a clone-and-make-it-yours reference app for student groups. People sign up, answer questions, get matched with a study buddy, see why, and chat. Runs entirely on Cloudflare free tiers. Live: https://studybuddy-matcher.pages.dev

## Stack
- Cloudflare Pages (`public/`) + Pages Functions (`functions/`)
- Cloudflare D1 / SQLite (`schema.sql`)
- Optional Claude-powered matching; falls back to rule-based matching when no key is set

## Key files
- `public/app.js` — the app (sign-up flow + all screens)
- `public/questions.js` — the survey
- `public/theme.css` — the design
- `wrangler.jsonc` — Cloudflare config

## Commands
`npm run dev`, `npm run deploy`, `npm run db:create`, `npm run db:init`, `npm run db:reset`, `npm run set-key`

## Rules
- The README is the teaching doc for learners — keep it plain-language and update its PROGRESS line when a step is finished.
- The app must keep working with no API key (AI is optional, never required).
