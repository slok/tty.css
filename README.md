# tty.css

A small, class-light CSS framework for semantic HTML. Its visual language is
inspired by technical and terminal interfaces: monospace text, deep navy,
warm orange, hard borders, and offset shadows.

Inspired by Pico CSS + turbopuffer.

- One CSS file
- No JavaScript
- Light, dark, and automatic themes
- Responsive native elements
- Low-specificity selectors
- Focused customization through CSS variables

Visit the [project site](https://slok.github.io/tty.css/docs/), open
`docs/index.html` locally, browse `docs/reference/` for the complete reference,
or visit `docs/examples/` for realistic pages.

## Project site

The repository is also a build-free static site:

| Path | Contents |
| --- | --- |
| `docs/index.html` | GitHub Pages landing page and quick install |
| `docs/reference/` | Grouped guides and element reference |
| `docs/examples/` | Six general examples and three color-palette examples built with tty.css |
| `docs/assets/docs.css` | Documentation-site layout only |
| `docs/assets/docs.js` | Documentation theme and copy controls only |
| `tty.css` | Canonical framework source and local distribution file |

The framework itself is only the repository-root `tty.css`; it imports no fonts,
assets, or JavaScript. The documentation and examples use that local stylesheet
at runtime, with documentation-only assets where needed. The three interactive
examples additionally load Alpine.js for application behavior, not styling.

See [`docs/reference/pico-comparison.html`](docs/reference/pico-comparison.html)
for the current feature comparison and remaining gaps with Pico CSS.

### Examples

Three examples use plain semantic HTML with no JavaScript:

- Product landing page
- Authentication flow
- Service status page

Three progressively interactive examples use Alpine.js 3.16.3 with application
logic embedded directly in the page:

- SaaS dashboard
- Search console
- Persistent task board

Three variable-only palettes demonstrate light, dark, and automatic modes:
[Forest (hex)](docs/examples/color-theme.html),
[Ocean (OKLCH)](docs/examples/ocean-theme.html), and
[Plum (OKLCH)](docs/examples/plum-theme.html). Load their CSS after tty.css.
Forest overrides semantic tokens directly; Ocean and Plum use the framework's
four public accent/neutral hue and chroma parameters.
The [Colors guide](docs/reference/colors.html) explains palette design, OKLCH,
gamut mapping, and contrast checks; the
[CSS variables reference](docs/reference/customization.html#colors) lists all color tokens.

## Install

Use jsDelivr for automatic minification and compression:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/slok/tty.css@main/tty.min.css" />
```

`@main` follows the latest main branch; pin a release tag or commit for production.

Alternatively, download the repository-root [`tty.css`](tty.css), keep it locally, and link it
from the document head:

```html
<link rel="stylesheet" href="tty.css" />
```

## Start with semantic HTML

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="tty.css" />
    <title>Search console</title>
  </head>
  <body>
    <header>
      <nav aria-label="Primary navigation">
        <ul><li><strong>Search console</strong></li></ul>
        <ul><li><a href="/login" role="button">Log in</a></li></ul>
      </nav>
    </header>

    <main>
      <h1>Search every byte.</h1>
      <p>Semantic HTML receives complete styling without component classes.</p>
      <button type="button">Create index</button>
    </main>
  </body>
</html>
```

Direct children `header`, `main`, and `footer` are centered containers. Use
`.container` when another element needs the same maximum width.

## Themes

Light is the default theme:

```html
<html lang="en">
```

Set a fixed dark theme:

```html
<html lang="en" data-theme="dark">
```

Follow the operating-system preference:

```html
<html lang="en" data-theme="auto">
```

Theme selection is attribute-based and does not require JavaScript. An
application can persist or change the attribute using its own preferred
approach.

## Supported elements

tty.css directly styles:

- Headings, paragraphs, lists, definition lists, and inline text elements
- Links, blockquotes, figures, images, and horizontal rules
- `code`, `kbd`, `samp`, and `pre`
- Navigation
- Breadcrumb navigation and disclosure dropdowns
- Buttons and links with `role="button"`
- Forms, fieldsets, labels, validation, and common input types
- Checkboxes, radios, switches, ranges, files, and colors
- Tables
- Articles
- `details` and `summary`
- Dropdown menus built with `details.dropdown`
- Loading indicators through `aria-busy="true"`
- CSS tooltips through `data-tooltip`
- `progress` and `meter`
- Native dialogs, including structured `dialog > article` modals

tty.css styles dialogs but does not open or close them. Use the native dialog
API in application code when interactive behavior is needed:

```js
document.querySelector("dialog").showModal();
```

## Card titles

Use semantic structure to distinguish card sections from card content.

An article header renders as the default full-width header band:

```html
<article>
  <header>
    <h3>Standard header</h3>
  </header>
  <p>Card content.</p>
</article>
```

Add `.legend` to the same semantic header when its heading should intersect the
top border:

```html
<article>
  <header class="legend">
    <h3>Cost calculator</h3>
  </header>
  <p>Card content.</p>
</article>
```

Keep the heading directly inside the article when it belongs inside the card:

```html
<article>
  <h3>launch</h3>
  <p>Includes all database features.</p>
</article>
```

The heading level remains semantic. tty.css gives direct card headings and
headings inside card headers a compact component-title size, whether the
document hierarchy calls for an `h2`, `h3`, or `h4`. For form groups, use the
native `fieldset` and `legend` elements instead of the `.legend` class. Direct
`details` children become compact grouped rows inside a `fieldset`; standalone
disclosures retain their own frame.

## Classes

The class layer is intentionally small.

### Composition

| Class | Purpose |
| --- | --- |
| `.container` | Centered element using `--tty-container` |
| `.narrow` | Centered element capped at 32rem for focused flows |
| `.reading` | Centered 56rem long-form article with readable typography |
| `.grid` | Responsive auto-fitting grid |
| `.group` | Spaced actions in a horizontal row; stacks on small screens |
| `.group.inline` | Keeps a group on one line and spreads its items apart |
| `.overflow-auto` | Scroll container for wide tables or content |
| `.legend` | Places a direct article header title over the card border |
| `.dropdown` | Turns a native `details` element into an overlay menu |
| `.breadcrumb` | Formats a labelled navigation path with separators |
| `.striped` | Adds alternating rows to a table |
| `.hoverable` | Highlights table rows on pointer hover |
| `.bordered` | Adds vertical table cell rules |
| `.compact` | Reduces table cell padding and type size |
| `html.modal-is-open` | Prevents document scrolling while a modal is open |
| `.terminal` | Dithered offset background treatment |
| `.sr-only` | Visually hidden accessible text |

`role="group"` creates connected controls with joined borders. On small
screens, the controls stack vertically while preserving those joined borders.

### Button variants

Apply these to `button`, supported button inputs, or links with
`role="button"`:

```html
<button>Primary</button>
<button class="secondary">Secondary</button>
<button class="contrast">Contrast</button>
<button class="outline">Outline</button>
<a href="/docs" role="button">Read docs</a>
```

Normal links support the same emphasis language without becoming buttons:

```html
<a href="/docs">Primary link</a>
<a href="/docs" class="secondary">Secondary link</a>
<a href="/docs" class="contrast">Contrast link</a>
```

## Form states

Use native attributes whenever possible:

```html
<label for="email">Email</label>
<input id="email" type="email" required />

<input aria-invalid="true" aria-describedby="email-error" />
<small id="email-error">Enter a valid email.</small>

<input aria-invalid="false" aria-describedby="email-success" />
<small id="email-success">Email verified.</small>

<label>
  <input type="checkbox" role="switch" />
  Enable indexing
</label>
```

Supported state attributes include `disabled`, `readonly`, `required`,
`aria-invalid`, `aria-disabled`, and `aria-current`.

ARIA does not define an `aria-valid` attribute. Use `aria-invalid="false"` to
mark a field as explicitly valid.

## Search

Use the native search input for its icon and browser clear behavior. Add
`role="search"` to join a search input and action while exposing a search
landmark:

```html
<input type="search" name="search" placeholder="Search" aria-label="Search" />

<form role="search">
  <input
    type="search"
    name="query"
    placeholder="Search namespaces"
    aria-label="Search namespaces"
  />
  <button type="submit">Search</button>
</form>
```

## Specialized inputs

Date and time controls keep their native platform pickers while receiving
terminal calendar and clock icons, tabular numerals, and theme support:

```html
<input type="date" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />
<input type="time" />
```

The icon tokens are `--tty-icon-date`, `--tty-icon-datetime`, and
`--tty-icon-time`. Search uses `--tty-icon-search`.

## Loading and tooltips

Use semantic busy state for inline content, blocks, and buttons:

```html
<span aria-busy="true">Indexing documents…</span>
<button aria-busy="true" disabled>Deploying…</button>
```

`aria-busy` communicates that an update is in progress; it does not disable a
control. Add the native `disabled` attribute while a button must not be
activated, then remove both attributes when the operation completes.

Tooltips support top, right, bottom, and left placement:

```html
<button data-tooltip="Runs the deployment">Deploy</button>
<a href="/help" data-tooltip="Read the guide" data-placement="bottom">Help</a>
```

Tooltip content should remain supplementary; essential instructions must also
be present in regular document content.

## Customize

Load overrides after tty.css. For a related palette in all modes, use the four
public parameters (defaults: accent hue `65`, chroma `0.125`; neutral hue `260`,
chroma `0.025`):

```css
:root {
  --tty-accent-hue: 245;
  --tty-accent-chroma: 0.1;
  --tty-neutral-hue: 245;
  --tty-neutral-chroma: 0.025;
}
```

Accent parameters drive buttons, links, general focus, and selection; neutral
parameters independently drive surfaces, text, borders, code, control focus, and
shadows. Light/dark/auto select internal lightness and chroma factors; `--_tty-*`
internals are not public API. Status colors remain independent hex values, and
SVG icon image tokens are unchanged.

OKLCH support is required; generated roles have no hex fallback or support guard.
Existing direct semantic token overrides remain compatible, can use any CSS
color format supported by the target browsers, and can be mixed with parameters.
Neither parameter nor direct OKLCH overrides need support guards. Recheck contrast in every
mode; hue and chroma do not guarantee accessible arbitrary palettes. See the
[Colors guide](docs/reference/colors.html) and
[exact role formulas](docs/reference/customization.html#color-formulas).

For exact semantic colors, or font and shape changes, override variables:

```css
:root {
  --tty-font: "IBM Plex Mono", monospace;
  --tty-font-display: "IBM Plex Sans", sans-serif;
  --tty-bg: #fffdf5;
  --tty-surface: #ffffff;
  --tty-fg: #172554;
  --tty-fg-muted: #526174;
  --tty-border: #cbd5e1;
  --tty-border-strong: #172554;
  --tty-accent: #fde047;
  --tty-accent-hover: #facc15;
  --tty-accent-fg: #422006;
  --tty-link: #b45309;
  --tty-link-hover: #9a3412;
  --tty-focus: #c2410c;
  --tty-container: 80rem;
  --tty-reading-width: 72ch;
  --tty-radius: 0;
  --tty-border-width: 1px;
  --tty-frame-width: 2px;
  --tty-shadow-x: 0.5rem;
  --tty-shadow-y: 0.5rem;
  --tty-control-height: 2.5rem;
}
```

Direct color overrides must match active theme selector specificity. Dark-theme
values can be customized separately:

```css
:root[data-theme="dark"] {
  --tty-bg: #09090b;
  --tty-surface: #18181b;
  --tty-accent: #a3e635;
}
```

For automatic dark, repeat the dark overrides on `:root[data-theme="auto"]`
inside `@media (prefers-color-scheme: dark)`. Parameter overrides alone need no
such repetition.

## Override styles

Most framework selectors are wrapped in `:where()`, giving them zero
specificity. A plain selector in application CSS usually wins without
`!important`:

```css
article {
  box-shadow: none;
}

button.danger {
  background: var(--tty-danger);
  color: white;
}
```

## Browser support

OKLCH is required: Chrome/Edge 111+, Firefox 113+, and Safari 15.4+ are the
minimum versions for palette support, not a guarantee of all framework features.
The modern support target is the intersection of browsers supporting the CSS
features tty.css uses and Pico CSS v2's Browserslist `defaults` philosophy:

- Browsers with more than 0.5% global usage
- The last two versions of major browsers
- Firefox ESR
- Browsers that are not officially dead

Some decorative `color-mix()` effects have simpler fallbacks, but browsers without
OKLCH are unsupported and have no framework color fallback.

RTL layouts are out of scope and are not guaranteed.

## Accessibility

tty.css includes visible `:focus-visible` outlines, reduced-motion handling,
touch-sized controls, dark color-scheme support, and print styles. The
application remains responsible for valid landmarks, labels, alternative text,
dialog behavior, and meaningful ARIA attributes.

## License

[MIT](LICENSE) © slok
