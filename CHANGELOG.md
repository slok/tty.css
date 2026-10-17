# Changelog

All notable changes to tty.css are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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

- Namespace public custom properties with the project-specific `--tty-*` prefix.
- Require OKLCH support (Chrome/Edge 111+, Firefox 113+, Safari 15.4+) and derive color roles from accent and neutral parameters without support guards or generated-role hex fallbacks. Internal mode-specific lightness and chroma factors and direct semantic token overrides remain unchanged; status hex colors, Monokai direct hex overrides, print hex colors, and SVG icon image tokens remain independent.

### Removed

- Remove the unused `--term-space` custom property.
