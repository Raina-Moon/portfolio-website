# Responsive Checklist

## Quick Triage

1. Is there horizontal overflow at any tested width?
2. Does any heading/body text overlap, clip, or collapse?
3. Do nav, tabs, and filters remain usable on 360-414 widths?
4. Are critical CTA buttons always visible and tappable?
5. Does modal/drawer content fit and scroll correctly?

## Common Root Causes

- Fixed width containers without safe `max-width`.
- Unbounded `white-space: nowrap` on long labels.
- Absolute positioning tied to desktop assumptions.
- Grid definitions missing narrow-width fallback.
- Large `gap` or `padding` values not scaled for mobile.

## Preferred Fix Patterns

- Replace hard width with `width: min(100%, <max>)`.
- Use `overflow-wrap: anywhere` for long dynamic strings.
- Add `minmax(0, 1fr)` to grid tracks to prevent overflow.
- Switch row/column layout at the smallest necessary breakpoint.
- Use `clamp()` for font-size and spacing where appropriate.

## Regression Guard

- Recheck neighboring components in the same container.
- Recheck focus order and keyboard accessibility after layout changes.
- Recheck sticky header/footer overlap after height adjustments.
