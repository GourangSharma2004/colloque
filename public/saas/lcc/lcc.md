# Command

A personal productivity desktop app to manage your habits, goals, reminders, schedule, and notes — all in one place. Built with Tauri + React + TypeScript, fully offline with no backend required.

---

## Problem It Solves

Modern productivity is fragmented across multiple apps — calendars, note-takers, habit trackers, and reminders tools — each requiring accounts, cloud sync, and subscriptions. Command consolidates everything into a single, privacy-first desktop application that works completely offline.

---

## Features

### 🎯 Mission
Define and track your long-term goals and vision. Set ambitious objectives and break them down into actionable steps.

### 📅 Schedule
Create time-blocked daily rhythms with custom day assignments. Define which habits and activities appear on which days of the week. Supports custom modes for flexible scheduling.

### ⚡ Today
A focused view for your current day's tasks and habits. See what needs to be done right now with time-aware context.

### ⏰ Reminders
Set time-based alerts and notifications. Never miss important events or deadlines with a robust reminder system.

### 📚 Mind Dump
Organize your thoughts with a hierarchical document system. Create domains (categories) and files within them. Rich text editor with formatting support. All data stored locally with no practical storage limits.

---

## Privacy & Offline

- **100% Local Storage**: All your data lives on your machine — no cloud sync, no servers
- **No Account Required**: No sign-up, no login, no personal data collection
- **Works Offline**: Fully functional without internet connection
- **Your Data, Your Control**: Export your data anytime; nothing is locked behind a service

---

## Download & Install

Go to the [Releases](../../releases) page and download the file for your OS.

### Mac Users
1. Download the `.dmg` file (ARM = Apple Silicon M1/M2/M3, x86 = Intel Mac)
2. Open the `.dmg` and drag the app to your **Applications** folder
3. On first launch, if you see *"can't be opened because Apple cannot check it for malicious software"*:
   - Go to **System Settings → Privacy & Security**
   - Scroll down and click **"Open Anyway"**

### Windows Users
1. Download the `.exe` or `.msi` installer
2. If Windows SmartScreen blocks it, click **"More info"** → **"Run anyway"**
3. Follow the installer steps

---

## For Developers

Clone the repo and run locally:

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run tauri dev
```

**Requirements:**
- Node.js LTS
- Rust (install from https://rustup.rs)

---

## Releasing a New Version

Tag a commit to trigger the GitHub Actions build for all platforms:

```bash
git tag v1.0.0
git push origin v1.0.0
```

This automatically builds `.dmg` (Mac ARM + Intel) and `.exe`/`.msi` (Windows) and creates a GitHub Release with all files attached.

---

## Tech Stack

- **Tauri v2** — native desktop shell (Rust)
- **React 19** — UI framework
- **TypeScript 5.8** — type safety
- **Vite 7** — build tool & dev server
- **Zustand 5** — state management with persistence
- **IndexedDB (idb-keyval)** — large document storage
- **better-sqlite3** — reminders database
- **TailwindCSS** — styling
- **Framer Motion** — animations
- **Lucide React** — icons
- **Recharts** — data visualization
- **@xyflow/react** — flowchart editor

---

*Made by Gourang Sharma*
