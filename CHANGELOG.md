# Changelog

All notable changes to tty.css are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Light, dark, and automatic themes with CSS custom properties.
- Responsive forms, tables, navigation, cards, dialogs, dropdowns, and utilities.
- Connected semantic control groups and spaced action groups.
- Loading indicators, tooltips, progress bars, and meters.
- Accessibility, print, forced-colors, and reduced-motion styles.
- A build-free documentation site with reference guides and complete examples.
- A variable-only forest palette example and color customization guide covering light, dark, and automatic modes.
- A dedicated Colors guide covering hex and OKLCH palettes, gamut mapping, semantic overrides, and contrast testing.
- Public palette API: `--tty-accent-hue` (65), `--tty-accent-chroma` (0.125), `--tty-neutral-hue` (260), and `--tty-neutral-chroma` (0.025), with parameter-derived OKLCH semantic roles across light, dark, and automatic modes.
- Variable-only Ocean and Plum examples using the framework palette parameters, with previews and CSS downloads.

### Changed

- Namespace public custom properties with the project-specific `--tty-*` prefix.
- Require OKLCH support (Chrome/Edge 111+, Firefox 113+, Safari 15.4+) and derive color roles from accent and neutral parameters without support guards or generated-role hex fallbacks. Internal mode-specific lightness and chroma factors and direct semantic token overrides remain unchanged; status hex colors, Forest direct hex overrides, print hex colors, and SVG icon image tokens remain independent.

### Removed

- Remove the unused `--term-space` custom property.
