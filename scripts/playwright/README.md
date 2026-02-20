# Playwright Browser Workflow Automation

This script automates a stable smoke workflow for the Astro portfolio app using the Playwright CLI wrapper.

## What it does

1. Opens the homepage.
2. Navigates to the `#work` section.
3. Opens `/troubleshooting`.
4. Returns to `/#contact`.
5. Fills the contact form.
6. Clears the form and verifies it reset.
7. Toggles language once.
8. Captures screenshots at each checkpoint.

Artifacts are saved to `output/playwright/portfolio-workflow/`.

## Prerequisites

- Node.js/npm with `npx` available.
- Dependencies installed for the frontend you plan to run.
- Dev server running (default expected URL: `http://127.0.0.1:4321`).

## Run steps

From repo root:

```bash
# 1) Start the Astro frontend in a separate terminal
npm run dev:frontend:astro

# 2) Run the Playwright workflow (default URL)
bash scripts/playwright/portfolio-workflow.sh

# 3) Or run against a custom URL
bash scripts/playwright/portfolio-workflow.sh http://127.0.0.1:4321
```

Optional:

```bash
# Use a dedicated Playwright CLI session name
PLAYWRIGHT_CLI_SESSION=portfolio-smoke bash scripts/playwright/portfolio-workflow.sh
```
