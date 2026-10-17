# tty.css

A small, class-light CSS framework for semantic HTML. Its visual language is
inspired by technical and terminal interfaces: monospace text, deep navy,
warm orange, hard borders, and offset shadows.

Inspired by Pico CSS + turbopuffer.

- One CSS file
- No JavaScript required
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
| `docs/examples/` | Seven general examples and a Monokai palette example |
| `docs/assets/docs.css` | Documentation-site layout only |
| `docs/assets/docs.js` | Documentation theme and copy controls only |
| `docs/assets/tabs.js` | Docs-only ARIA tabs example controller; not part of tty.css |
| `docs/assets/tabs-alpine.js` | Docs-only Alpine.js tabs example controller |
| `docs/assets/palette-settings.js` | Docs-only saved palette preference across the site |
| `tty.css` | Canonical framework source and local distribution file |

The framework itself is only the repository-root `tty.css`; it imports no fonts,
assets, or JavaScript. The documentation and examples use that local stylesheet
at runtime, with documentation-only assets where needed. Three interactive
examples load Alpine.js for application behavior, not styling; the pricing
example uses a small vanilla JavaScript estimator with no application library.

See [`docs/reference/pico-comparison.html`](docs/reference/pico-comparison.html)
for the current feature comparison and remaining gaps with Pico CSS.

### Examples

Three examples use plain semantic HTML with no application JavaScript:

- Product landing page
- Authentication flow
- Service status page

A docs-only preference script applies the saved palette to these previews;
native behavior and tty.css need no JavaScript.

One example adds vanilla JavaScript without an application library:

- [OrbitDB pricing](docs/examples/pricing.html): native pricing cards and FAQ,
  with a small usage estimator ([HTML source](docs/examples/pricing.html),
  [JavaScript source](docs/examples/pricing.js)).

Three progressively interactive examples use Alpine.js 3.16.3 with application
logic embedded directly in the page:

- SaaS dashboard
- Search console
- Persistent task board

Use the [palette playground](docs/reference/colors.html#playground) for generated
palettes, or [Monokai](docs/examples/color-theme.html) for full color overrides.
Monokai adapts the classic dark palette for UI contrast and includes a light
companion; it keeps its own colors regardless of the saved playground palette.

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
- Buttons and button-styled links (`a.button`, or legacy `a[role="button"]`)
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
- ARIA tabs with connected frames and application-managed behavior

tty.css styles dialogs but does not open or close them. Use the native dialog
API in application code when interactive behavior is needed:

```js
document.querySelector("dialog").showModal();
```

## Navigation links

Top-level menu links outside `aside` inherit color and weight without text underlines;
explicit `.primary`, `.secondary`, and `.contrast` link colors are preserved. They use
inline-block layout, `0.35rem 0.5rem` padding, and a transparent
`--tty-frame-width` bottom border to reserve space. Hover reveals a 45%
current-color border; `aria-current="page"` keeps it solid, even on hover.
The global keyboard focus outline is unchanged. Button-styled links, breadcrumb
links, dropdown items, and navigation inside `aside` are excluded. See the
[Navigation reference](docs/reference/navigation.html) for markup and examples.

## Tabs

Use one `.tabs` wrapper around a labelled `role="tablist"` and its sibling
`role="tabpanel"` elements. Tab buttons use `role="tab"`, `aria-selected`,
and `aria-controls`; panels use unique IDs and `aria-labelledby`.

tty.css styles the selected state through `aria-selected="true"` and respects
`hidden` on inactive panels. It does not switch tabs. Application JavaScript
must synchronize selection, panel visibility, roving `tabindex`, and keyboard
navigation. Use your preferred library or the JavaScript examples in the
[Tabs reference](docs/reference/tabs.html). The
[Alpine dashboard](docs/examples/dashboard.html) shows a library-based example.

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

Keep the heading directly inside the article, or inside one plain `div` wrapper,
when it belongs inside the card:

```html
<article>
  <h3>launch</h3>
  <p>Includes all database features.</p>
</article>
```

The heading level remains semantic. Direct card headings and
`article > div > h1` through `h6` share the same sizing: `h1`/`h2` use the larger
card-title style and `h3`–`h6` the smaller style. This extends through only one
plain `div`, not arbitrary descendants; nested articles retain their own context.
Headings inside card headers use a compact component-title size. For form groups, use the
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
| `.grid` | Responsive auto-fitting grid; `--tty-grid-min` defaults to `17rem` |
| `.group` | Spaced actions in a horizontal row; stacks on small screens |
| `.group.inline` | Keeps a group on one line and spreads its items apart |
| `.overflow-auto` | Scroll container for wide tables or content |
| `.legend` | Places a direct article header title over the card border |
| `a.button` | Button presentation for a navigating link, preserving native link semantics |
| `.double-border` | Double-line frame at 3× `--tty-frame-width` |
| `.strong-shadow` | Dense SVG-mask shadow, full opacity by default, with unchanged offsets |
| `.muted` | Muted surface background |
| `.flat` | No decorative shadow; border remains |
| `.plain` | Removes list markers/padding or opts a non-dropdown disclosure into a borderless, transparent surface |
| `.tabs` | Connected ARIA tab row and framed panels; behavior supplied by application code |
| `.dropdown` | Turns a native `details` element into an overlay menu |
| `.breadcrumb` | Formats a labelled navigation path with separators |
| `.striped` | Adds alternating rows to a table |
| `.hoverable` | Highlights table rows on pointer hover |
| `.bordered` | Adds vertical table cell rules |
| `.compact` | Reduces table cell padding and type size |
| `html.modal-is-open` | Prevents document scrolling while a modal is open |
| `.terminal` | Dithered offset background treatment |
| `.sr-only` | Visually hidden accessible text |

Frame treatments compose independently on `article`, `fieldset`, `dialog`,
`.tabs` (coordinating tabs and panels), and `.overflow-auto` table wrappers.
Table-wrapper treatments affect the table frame and its shadow. For `dialog > article`, put them
on the dialog; its direct article receives the frame, while the default Standard
shadow remains outside the scrolling article. Nested frames stay unchanged unless
given their own classes. These are visual classes, not ARIA roles.
See [live frame examples](docs/reference/cards.html#frame-treatments).

Use `<details class="dropdown"><summary>Choose</summary><ul>…</ul></details>`
for dropdowns. The list scrolls; no wrapper is needed. Dropdown and tooltip overlays
are shadowless and do not support frame treatments.

Use `.plain` on `ul` or `ol` to remove markers and padding while preserving
margins. Add `role="list"` to these lists to preserve list semantics in
Safari/VoiceOver when markers are removed. On `details:not(.dropdown)` it removes
the border and background but retains padding and the chevron; ordinary disclosures
keep their default frame.

```html
<ul class="plain" role="list"><li>All systems operational</li></ul>
<details class="plain">
  <summary>Deployment notes</summary>
  <p>No downtime required.</p>
</details>
<div class="grid" style="--tty-grid-min: 14rem">
  <article><h3>Primary</h3><p>Healthy</p></article>
  <article><h3>Replica</h3><p>Healthy</p></article>
</div>
```

`role="group"` creates connected controls with joined borders. On small
screens, the controls stack vertically while preserving those joined borders.

### Button variants

Apply these to `button`, supported button inputs, or `a.button` (legacy
`a[role="button"]` remains supported):

```html
<button>Primary</button>
<button class="secondary">Secondary</button>
<button class="contrast">Contrast</button>
<button class="outline">Outline</button>
<a href="/docs" class="button">Read docs</a>
```

Use `button` for actions and `a.button` for navigation. Unlike `role="button"`,
`.button` preserves link semantics and native link keyboard behavior; CSS does
not implement button keyboard behavior for legacy role-based links.

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

Inside a form, helper `small` text after controls, wrapping labels, connected
groups, search forms, and dropdowns remains muted and block-level. Only `small`
immediately after an `input`, `select`, or `textarea` outside a label receives a
negative top margin; text inside labels is not pulled upward. Native `output`
uses tabular numerals without imposing alignment:

```html
<label for="total">Estimated total</label>
<output id="total" name="total">42.00</output>
```

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

Load overrides after tty.css. Use the
[palette playground](docs/reference/colors.html#playground) to generate palette
CSS, or the [Monokai example](docs/examples/color-theme.html) for a full direct
color-token override. Check contrast in every mode; see the
[Colors guide](docs/reference/colors.html) and
[CSS variables reference](docs/reference/customization.html) for details.

Fonts, layout, and shape also use custom properties:

```css
:root {
  --tty-font: "IBM Plex Mono", monospace;
  --tty-font-display: "IBM Plex Sans", sans-serif;
  --tty-container: 80rem;
  --tty-reading-width: 72ch;
  --tty-radius: 0.2rem;
  --tty-frame-radius: 0;
  --tty-border-width: 1px;
  --tty-frame-width: 2px;
  --tty-shadow-x: 0.5rem;
  --tty-shadow-y: 0.5rem;
  --tty-control-height: 2.5rem;
}
```

`--tty-frame-radius` controls articles, fieldsets, dialogs, and exposed tab-frame
corners independently of control corners (`--tty-radius`). Joined tab edges stay square.

Frame shadows use a Standard SVG mask by default; `.strong-shadow` selects Dense,
and `.flat` removes the shadow. Override `--tty-shadow-color` (default
`var(--tty-border-strong)`), `--tty-shadow-opacity` (`0.6`, or `1` for Dense),
`--tty-shadow-pattern` (SVG mask), or `--tty-shadow-pattern-size` (`4px 4px`),
including on `.strong-shadow`. Use `3px 3px` for Fine without changing the offset.
The same tokens apply to articles, fieldsets, tabs, table wrappers, and dialogs.
Small solid control shadows, radio states, and validation treatments remain intentional.
See [shadow examples](docs/reference/cards.html#shadow-textures).

## Override styles

Most framework selectors are wrapped in `:where()`, giving them zero
specificity. A plain selector in application CSS usually wins without
`!important`:

```css
article {
  --tty-shadow-color: var(--tty-accent);
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
