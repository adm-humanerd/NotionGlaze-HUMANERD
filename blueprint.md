# NotionGlaze-HUMANERD Project Blueprint

## Project Overview
This project is an **Astro.js** based web application designed for high performance and scalability using Cloudflare's infrastructure. It likely integrates with the Notion API (based on recent conversation history) to render content dynamically.

## Project Details
- **Frontend Framework:** Astro.js (^5.16.4)
- **UI Frameworks:** React (^19.2.3)
- **Styling:** Tailwind CSS (^4.1.18)
- **Deployment Platform:** Cloudflare (via Wrangler/Cloudflare Pages)
- **Key Features:**
  - Notion-like rendering experience.
  - Saju analysis architecture (mentioned in history).
  - Cloudflare Worker integration.

## Current State & Changes
### Deployment Workflow Transition
The user is currently transitioning or clarifying their deployment workflow. They are using `npx wrangler deploy` to push changes directly to Cloudflare, but recently connected the Git repository for automated deployment.

### Current Issue: Missing Environment Variables on Cloudflare
After connecting the Git repository, the application cannot find the Notion API keys.

### Plan for Current Task
1. **Identify the cause:** Cloudflare Pages/Workers Git integration requires environment variables to be defined in the Cloudflare Dashboard.
2. **Troubleshooting Steps:**
    - Verify variables are in both **Production** and **Preview** environments.
    - Check if the variables are set as **Environment Variables** (Runtime) and not just **Build Variables**.
    - Ensure a **Re-deployment** has occurred after adding the variables.
    - Consider using `process.env` or dynamic runtime access if `import.meta.env` is being optimized away at build time.

---
*Created on 2026-01-11 18:38 by Antigravity*
