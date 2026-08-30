# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PRP 5G Academy** is a Spanish-language medical education platform (PWA) for teaching PRP (Platelet-Rich Plasma) 5G protocols. It is a fully static site — no build step, no package manager, no backend.

Domain: `prp5gacademy.com` (configured via `CNAME`)

## Development Workflow

There are no build, lint, or test commands. This is a raw HTML/CSS/JS project.

To develop locally, serve the root directory with any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`. Login with the built-in demo account: `demo@prp5g.com` / `demo123`.

The Service Worker (`sw.js`) caches aggressively. During development, disable it in DevTools (Application → Service Workers → Bypass for network) or hard-reload with Ctrl+Shift+R.

## Architecture

### File Roles

| File | Role |
|------|------|
| `index.html` | **Sales landing page** — entry point for new visitors |
| `login.html` | Login / registration form |
| `dashboard.html` | **Core SPA** — entire course experience (~19,000 lines) |
| `modulo1.html` | Standalone presentation view for Module 1 |
| `payment.html` | Stripe checkout page — reads `?email=` and `?name=` URL params to store them in localStorage before redirect |
| `success.html` | Post-payment confirmation — activates the user's paid access by reading `prp5g_pending_email` from localStorage |
| `consentimiento.html` | Printable informed consent form |
| `contraindicaciones.html` | Printable contraindications guide |
| `icon.svg` | PWA icon (SVG, works across browsers) |
| `sw.js` | Service Worker (PWA offline support, cache version `prp5g-v2`) |
| `manifest.json` | PWA manifest |

### User Flow

1. Visitor → `index.html` (landing page, redirects paid users to `dashboard.html`)
2. Clicks CTA → `login.html?tab=registro` (register tab opens by default)
3. Registers → `payment.html?email=...&name=...` (stores email in localStorage)
4. Pays via Stripe → redirects to `success.html`
5. `success.html` marks user as paid in localStorage → redirects to `dashboard.html`

Returning users: `index.html` → `login.html` → `dashboard.html`

### SPA Routing in `dashboard.html`

`dashboard.html` is a single-page application: every "page" is a `<div class="page" id="page-{name}">` hidden with `display:none`. Navigation calls `showPage(pageId)` which toggles `.active` on the target page div.

Sidebar module expansion uses `toggleModule(moduleNum)` which toggles `.open` on the module's `.module-item`.

### Authentication & Access Control

Authentication is entirely client-side via `localStorage`:

- `prp5g_session` — JSON object: `{ name, email, plan, paid, paidAt }`
- `prp5g_users` — JSON array of all registered users

Access expiration is 12 months from `paidAt`. Unpaid users are redirected to `payment.html`. There is no server; all auth logic is enforced only in the browser.

### Course Data Model (localStorage)

Progress is tracked via localStorage keys set in `completeLesson()`. The course has:
- 6 modules × 4 lessons = 24 lessons total
- Per-module 5-question quizzes checked by `checkQuiz()`
- Final exam: 10 questions, 80% minimum to unlock certificate via `showCertificate()`
- `isCourseComplete()` gates the final exam

### Video Player

There is no `<video>` element with a real media source. The "video player" is a custom JS implementation using `startVideo()`, `togglePlayPause()`, `seekVideo()`, `changeSpeed()`, and `toggleFullscreen()` controlling CSS animations and timed content reveals — not actual video files.

### PWA / Service Worker

`sw.js` uses a cache-first strategy for the listed assets (`prp5g-v1` cache). When updating cached pages, bump the cache version string in `sw.js` to force cache invalidation on next visit.

## CSS Conventions

All CSS is inline (embedded `<style>` blocks in each HTML file). CSS custom properties are defined on `:root`:

- `--gold`: `#c9a84c` / `#D4AF37` — primary brand color
- `--dark`: `#0a0a0a` / `#1a1a1a` — dark background
- `--text`: `#e0e0e0` / `#ede8dc` — body text

Color usage: gold for interactive/active states, `#2ecc71` green for success/completion, `#e74c3c` red for errors/warnings, `#3498db` blue for info.

Class naming is BEM-style (`.lesson-content`, `.progress-bar`) with state classes `.active`, `.completed`, `.open`.

## JavaScript Conventions

- Vanilla ES6 — no frameworks, no imports
- All functions are global (defined directly in `<script>` blocks)
- DOM manipulation via `document.getElementById()` and `document.querySelector()`
- Event handling via inline `onclick` attributes in HTML
- Async effects (loading states, transitions) use `setTimeout()` — there are no real API calls
- The language is Spanish throughout the UI; keep all user-facing strings in Spanish
