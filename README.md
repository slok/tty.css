# tty.css

A small, class-light CSS framework for semantic HTML. Its visual language is
inspired by technical and terminal interfaces: monospace text, deep navy,
warm orange, hard borders, and offset shadows.

- One CSS file
- No JavaScript
- Light, dark, and automatic themes
- Responsive native elements
- Low-specificity selectors
- Focused customization through CSS variables

Open `index.html` to see every supported element.

## Install

Copy `tty.css` into your project and link it from the document head:

```html
<link rel="stylesheet" href="tty.css" />
```

tty.css imports JetBrains Mono and Space Grotesk from Google Fonts. Remove the
first `@import` rule if you prefer to avoid a network font dependency; the
fallback stacks work without it.

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
- Buttons and links with `role="button"`
- Forms, fieldsets, labels, validation, and common input types
- Checkboxes, radios, switches, ranges, files, and colors
- Tables
- Articles
- `details` and `summary`
- `progress` and `meter`
- Native dialogs

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

The heading level remains semantic. tty.css gives headings inside card headers
a consistent component-title size, whether the document hierarchy calls for an
`h2`, `h3`, or `h4`. For form groups, use the native `fieldset` and `legend`
elements instead of the `.legend` class.

## Classes

The class layer is intentionally small.

### Composition

| Class | Purpose |
| --- | --- |
| `.container` | Centered element using `--term-container` |
| `.grid` | Responsive auto-fitting grid |
| `.group` | Horizontal control or button group; stacks on small screens |
| `.overflow-auto` | Scroll container for wide tables or content |
| `.legend` | Places a direct article header title over the card border |
| `.terminal` | Dithered offset background treatment |
| `.sr-only` | Visually hidden accessible text |

`role="group"` receives the same layout as `.group`.

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

## Form states

Use native attributes whenever possible:

```html
<label for="email">Email</label>
<input id="email" type="email" required />

<input aria-invalid="true" aria-describedby="email-error" />
<small id="email-error">Enter a valid email.</small>

<label>
  <input type="checkbox" role="switch" />
  Enable indexing
</label>
```

Supported state attributes include `disabled`, `readonly`, `required`,
`aria-invalid`, `aria-disabled`, and `aria-current`.

## Customize

Override variables after loading tty.css:

```css
:root {
  --term-font: "IBM Plex Mono", monospace;
  --term-font-display: "IBM Plex Sans", sans-serif;
  --term-bg: #fffdf5;
  --term-surface: #ffffff;
  --term-fg: #172554;
  --term-fg-muted: #526174;
  --term-border: #cbd5e1;
  --term-border-strong: #172554;
  --term-accent: #fde047;
  --term-accent-hover: #facc15;
  --term-accent-fg: #422006;
  --term-focus: #c2410c;
  --term-container: 80rem;
  --term-reading-width: 72ch;
  --term-space: 1rem;
  --term-radius: 0;
  --term-border-width: 1px;
  --term-frame-width: 2px;
  --term-shadow-x: 0.5rem;
  --term-shadow-y: 0.5rem;
  --term-control-height: 2.75rem;
}
```

Dark-theme values can be customized separately:

```css
:root[data-theme="dark"] {
  --term-bg: #09090b;
  --term-surface: #18181b;
  --term-accent: #a3e635;
}
```

## Override styles

Most framework selectors are wrapped in `:where()`, giving them zero
specificity. A plain selector in application CSS usually wins without
`!important`:

```css
article {
  box-shadow: none;
}

button.danger {
  background: var(--term-danger);
  color: white;
}
```

## Browser support

The compatibility target follows Pico CSS v2's Browserslist `defaults`
philosophy:

- Browsers with more than 0.5% global usage
- The last two versions of major browsers
- Firefox ESR
- Browsers that are not officially dead

Core content and controls remain usable if a newer decorative feature such as
`color-mix()` is unavailable.

## Accessibility

tty.css includes visible `:focus-visible` outlines, reduced-motion handling,
touch-sized controls, dark color-scheme support, and print styles. The
application remains responsible for valid landmarks, labels, alternative text,
dialog behavior, and meaningful ARIA attributes.
