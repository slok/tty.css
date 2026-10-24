# Changelog

All notable changes to tty.css are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Action groups wrap when their contents exceed the available width, including inside narrow cards on wide screens.

### Changed

- Unordered lists use square bullets at every nesting level; ordered lists and markerless lists are unchanged.

### Added

- Square `.badge` labels with neutral, info, success, warning, and danger tones using the existing notice palette, wrapping long text, and theme-aware foregrounds; no JavaScript is required.
- Opt-in `nav.pagination` styling for numbered pages, cursor-based links, and sequential content navigation, sharing existing button appearance and interaction rules without duplicated styling. Includes wrapping layouts, current-page and unavailable states, and optional result summaries. Pagination logic stays application-owned; no JavaScript is required.
- Semantic `.notice` callouts with neutral, info, success, warning, and danger tones, composable `.outline` and `.strong` treatments, and an optional `--tty-notice-color` override; no JavaScript is required.
- Optional `ol.timeline` styling for chronological lists, with a vertical line, square markers, and item spacing. Opt-in `.horizontal` and `.alternating` variants apply above a 44rem viewport and fall back to vertical on smaller screens. Native list semantics and author-defined content are preserved; no JavaScript is required.
- Opt-in `.textured` on native `progress[value]` for a continuous Dense SVG-mask fill over a muted track, with CSS `color` customization and optional `--tty-progress-pattern` / `--tty-progress-pattern-size` overrides. Default progress, meters, and indeterminate styling are unchanged; no framework JavaScript is required.
- `.plain` for markerless, unpadded lists (margins preserved) and opt-in borderless, transparent non-dropdown disclosures (padding and chevron preserved); ordinary disclosure defaults are unchanged.
- `a.button` for button-styled navigation with native link semantics; existing `a[role="button"]` styling remains supported.
- `--tty-grid-min` (default `17rem`) controls `.grid` minimum column width, with local overrides.
- An OrbitDB pricing example with native `.button` links, aligned plan cards, a vanilla JavaScript usage estimator, and native FAQ disclosures. Named subtotals have live announcements disabled; one polite live total updates on changes and form reset. The product landing page links to matching plans and the estimator.
- Composable `.double-border`, `.strong-shadow`, `.muted`, and `.flat` visual frame treatments for articles, fieldsets, dialogs, and tabs, with live documentation examples.
- Public frame-shadow overrides: `--tty-shadow-color`, `--tty-shadow-opacity`, `--tty-shadow-pattern`, and `--tty-shadow-pattern-size`, honored with `.strong-shadow` as well as default frames.
- Class-light ARIA tabs with connected frames, dithered panel shadows, theme support, a keyboard-accessible documentation demo, and an Alpine dashboard example. Tab behavior remains application-owned; tty.css ships no JavaScript.
- Light, dark, and automatic themes with CSS custom properties.
- Responsive forms, tables, navigation, cards, dialogs, dropdowns, and utilities.
- Connected semantic control groups and spaced action groups.
- Loading indicators, tooltips, progress bars, and meters.
- Accessibility, print, forced-colors, and reduced-motion styles.
- A build-free documentation site with reference guides and complete examples.
- A Monokai full direct-token palette example with classic dark colors and a noncanonical light-mode adaptation, plus a Colors guide covering generated palettes, semantic overrides, gamut mapping, and contrast testing across light, dark, and automatic modes. The separate `monokai-theme.css` stylesheet loads after tty.css; application CSS stays separate.
- Public palette API: `--tty-accent-hue` (65), `--tty-accent-chroma` (0.125), `--tty-neutral-hue` (260), and `--tty-neutral-chroma` (0.025), with parameter-derived OKLCH semantic roles across light, dark, and automatic modes.
- An experimental Colors-page palette playground with live hue/chroma sliders and copyable CSS. A docs-only preference script saves palettes across docs and examples, including otherwise HTML-only previews; Default clears the preference. The framework still requires no JavaScript.
- Seventeen named parameter-only playground presets, including nature-, terminal-, and brand-inspired palettes, in a compact selector. Monokai is a separate full-override example, not a parameter-only preset.

### Changed

- `nav.menu` opts top-level plain links into inherited color/weight, no text underline, padding, and a reserved bottom border. Hover uses 45% current color; `aria-current="page"` stays solid, including on hover. Explicit `.primary`, `.secondary`, and `.contrast` colors and keyboard focus outlines are preserved. Both `a.button` and `a[role="button"]` are excluded. Plain `nav` retains horizontal layout and ordinary links; breadcrumbs remain independent and should not use `.menu`. No ancestor-based exceptions are needed.
- Compact card-title sizing applies only to direct article titles and article-header titles; headings inside content wrappers use the ordinary heading hierarchy.
- Automatic helper styling uses only direct adjacency: text-like inputs (excluding checkbox, radio, range, hidden, button, submit, and reset), selects, and textareas followed by `small`, regardless of ancestry. Explicit `small.helper` supports wrapped/grouped controls with muted block styling and `margin: 0 0 1rem`, never the automatic negative margin. IDs and wrappers do not infer helpers. `output` uses tabular numerals without imposed alignment.
- Text inputs, selects, and textareas use a thin, flush focus edge instead of a detached outline; other controls retain their existing focus indicators.
- Decorative shadows share a 4×4px Standard SVG mask with two staggered rectangular marks at 0.6 opacity across articles, fieldsets, tabs, table wrappers, and dialogs; `.strong-shadow` uses the inverse Dense mask at full opacity. The same public mask tokens apply to these frames. Color and pattern scale are independent of the existing offsets; `3px 3px` tiles provide Fine texture without a new class. Small solid control shadows, radio states, and validation treatments remain intentional.
- Frame treatments on `.overflow-auto` table wrappers affect the table frame and its shadow. Dropdown and tooltip overlays are shadowless and do not support frame treatments; dropdown lists remain direct children of `details`, with no wrapper needed.
- Structured `dialog > article` layouts show the default Standard shadow outside the scrolling article, not only the strong-shadow variant.
- Square article, fieldset, dialog, and exposed tab-frame corners through `--tty-frame-radius: 0`, independently of the existing control radius. Inputs, buttons, and joined search controls retain their previous rounding.
- Namespace public custom properties with the project-specific `--tty-*` prefix.
- Require OKLCH support (Chrome/Edge 111+, Firefox 113+, Safari 15.4+) and derive color roles from accent and neutral parameters without support guards or generated-role hex fallbacks. Internal mode-specific lightness and chroma factors and direct semantic token overrides remain unchanged; status hex colors, Monokai direct hex overrides, print hex colors, and SVG icon image tokens remain independent.

### Removed

- Remove the unused `--term-space` custom property.
