# tty.css

A small, class-light CSS framework for semantic HTML—mixing
[turbopuffer's](https://turbopuffer.com/) visual style with
[Pico CSS's](https://picocss.com/) semantic, class-light philosophy.
Monospace text, hard borders, and textured offset shadows, without a component runtime.

- One CSS file; no framework JavaScript, fonts, or icon dependencies.
- Native HTML elements styled by default, with optional layout and appearance classes.
- Light, dark, and automatic themes; customization through CSS variables.

**[Documentation](https://slok.github.io/tty.css/docs/reference/)** ·
**[Examples](https://slok.github.io/tty.css/docs/examples/)** ·
**[Customization](https://slok.github.io/tty.css/docs/reference/customization.html)**

## Install

Use the CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/slok/tty.css@main/tty.min.css">
```

`@main` follows the latest main branch; pin a release tag or commit for production.
Or download [`tty.css`](tty.css) and link it locally:

```html
<link rel="stylesheet" href="tty.css">
```

## Start with HTML

```html
<!doctype html>
<html lang="en" data-theme="auto">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="tty.css">
    <title>Hello, tty.css</title>
  </head>
  <body>
    <main>
      <h1>Plain HTML. Sharp edges.</h1>
      <article>
        <h2>Start building</h2>
        <p>Semantic elements provide the defaults. Classes are optional.</p>
        <button type="button">Hello</button>
      </article>
    </main>
  </body>
</html>
```

See the docs for [components](https://slok.github.io/tty.css/docs/reference/components.html),
[layouts](https://slok.github.io/tty.css/docs/reference/layout.html),
[themes](https://slok.github.io/tty.css/docs/reference/themes.html), and
[accessibility and browser requirements](https://slok.github.io/tty.css/docs/reference/accessibility.html).
Interactive examples supply their own application JavaScript; tty.css supplies styling only.

## Contributing

Issues and pull requests are welcome. The framework source is the root
[`tty.css`](tty.css); documentation and examples live in [`docs/`](docs/).
The documentation site is static and needs no build step.

## License

[MIT](LICENSE) © slok
