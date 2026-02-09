---
name: responsive-qa-fixer
description: Audit completed UI work for responsive quality and patch issues before handoff. Use when Codex needs to check and fix layouts across mobile, tablet, and desktop after building or changing frontend screens/components, including overflow, wrapping, spacing, breakpoint behavior, touch targets, and readability problems.
---

# Responsive QA Fixer

## Overview

Run a consistent responsive QA pass after UI implementation. Detect layout regressions across breakpoints, apply minimal safe fixes, and verify no new issues are introduced.

## Workflow

1. Identify scope.
- List changed pages/components and key interaction states.
- Prioritize user-facing routes and high-traffic UI first.

2. Audit breakpoint matrix.
- Test widths: 360, 390, 414, 768, 1024, 1280, 1440.
- Test portrait and landscape for phone/tablet.
- Check at 100% zoom first; then spot-check 200% text zoom behavior.

3. Validate core responsive checks.
- No horizontal scroll on root/page containers unless explicitly required.
- Text wraps cleanly; no clipping/overlap/truncation of critical content.
- Controls remain tappable (target size and spacing) on mobile widths.
- Grids and cards reflow without broken alignment.
- Images/media scale without distortion or overflow.
- Sticky/fixed elements do not hide interactive content.
- Modals/drawers fit viewport and keep scroll lock behavior correct.

4. Apply fixes in this order.
- Prefer fluid constraints (`min()`, `max()`, `clamp()`, `%`, `fr`) before hard pixel overrides.
- Fix container sizing and overflow first, then typography and spacing.
- Keep breakpoint additions minimal; avoid duplicating styles.
- Preserve existing design system tokens and patterns when available.

5. Re-verify after patching.
- Re-test the same matrix.
- Confirm fixes do not regress nearby components.
- Report exact files changed and what issue each change resolved.

## Output Contract

When finishing a responsive pass, return:

1. Findings list with severity (`critical`, `major`, `minor`) and location.
2. Patch summary by file and rationale.
3. Verification matrix and pass/fail status.
4. Any residual risks that need designer/product sign-off.

## Reference

Use `references/responsive-checklist.md` for a compact issue checklist and fix heuristics.
