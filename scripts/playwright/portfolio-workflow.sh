#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

if ! command -v npx >/dev/null 2>&1; then
  echo "Error: npx is required but was not found on PATH." >&2
  echo "Install Node.js/npm first, then retry." >&2
  exit 1
fi

CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
PWCLI="${PWCLI:-$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh}"

if [[ ! -x "$PWCLI" ]]; then
  echo "Error: Playwright wrapper script not found or not executable at: $PWCLI" >&2
  exit 1
fi

BASE_URL="${1:-http://127.0.0.1:4321}"
SESSION="${PLAYWRIGHT_CLI_SESSION:-portfolio-workflow}"
ARTIFACT_DIR="${PROJECT_ROOT}/output/playwright/portfolio-workflow"
CONFIG_FILE="${SCRIPT_DIR}/playwright-cli.json"

mkdir -p "$ARTIFACT_DIR"
cd "$ARTIFACT_DIR"

pw() {
  "$PWCLI" --session "$SESSION" --config "$CONFIG_FILE" "$@"
}

# Best-effort cleanup of any prior session page.
pw close >/dev/null 2>&1 || true

echo "Running workflow against ${BASE_URL}"
echo "Artifacts: ${ARTIFACT_DIR}"

echo "[1/8] Open homepage"
pw open "$BASE_URL"
pw run-code "await page.waitForLoadState('domcontentloaded'); await page.waitForSelector('#about');"
pw run-code "await page.screenshot({ path: '01-home.png', fullPage: true });"

echo "[2/8] Navigate to Work section"
pw run-code "await page.getByRole('button', { name: /^Work$/ }).click();"
pw run-code "await page.waitForFunction(() => window.location.hash === '#work'); await page.waitForSelector('#work');"
pw run-code "await page.screenshot({ path: '02-work-section.png', fullPage: true });"

echo "[3/8] Navigate to Troubleshooting page"
pw run-code "await page.getByRole('button', { name: /Trouble/ }).click();"
pw run-code "await page.waitForURL(/\\/troubleshooting/); await page.waitForSelector('text=Tags');"
pw run-code "await page.screenshot({ path: '03-troubleshooting.png', fullPage: true });"

echo "[4/8] Return to Contact section"
pw run-code "await page.getByRole('button', { name: /^Contact$/ }).click();"
pw run-code "await page.waitForURL(/\\/#contact$/); await page.waitForSelector('#contact');"

echo "[5/8] Fill contact form"
pw run-code "await page.fill('#name', 'Playwright Smoke');"
pw run-code "await page.fill('#email', 'smoke@example.com');"
pw run-code "await page.fill('#subject', 'Portfolio workflow check');"
pw run-code "await page.fill('#message', 'This form fill is part of the Playwright CLI smoke workflow.');"
pw run-code "await page.screenshot({ path: '04-contact-filled.png', fullPage: true });"

echo "[6/8] Clear form and validate reset"
pw run-code "await page.getByRole('button', { name: /Clear Form|초기화/ }).click();"
pw run-code "await page.waitForFunction(() => {
  const getValue = (id) => document.querySelector(id)?.value ?? null;
  return getValue('#name') === '' && getValue('#email') === '' && getValue('#subject') === '' && getValue('#message') === '';
});"
pw run-code "await page.screenshot({ path: '05-contact-cleared.png', fullPage: true });"

echo "[7/8] Toggle language"
pw run-code "await page.getByRole('button', { name: /KOR|ENG/ }).click();"
pw run-code "await page.screenshot({ path: '06-language-toggled.png', fullPage: true });"

echo "[8/8] Close browser session"
pw close

echo "Workflow completed successfully."
