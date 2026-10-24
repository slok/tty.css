/* Colors-page controls. Persistence lives in the shared docs-only loader. */
(() => {
  const panel = document.querySelector("[data-palette-playground]");
  const settings = window.ttyDocsPalette;
  if (!panel || !settings) return;

  const code = panel.querySelector("[data-palette-code]");
  const values = settings.get();
  const controls = [...panel.querySelectorAll("[data-palette-var]")].map((input) => {
    const property = input.dataset.paletteVar;
    input.value = values[property];
    return {
      input,
      property,
      output: input.parentElement.querySelector("[data-palette-value]"),
    };
  });

  function render() {
    for (const { input, output } of controls) {
      const hue = input.dataset.paletteVar.endsWith("-hue");
      const value = `${input.value}${hue ? "°" : ""}`;
      if (output.value !== value) output.value = value;
      input.setAttribute("aria-valuetext", `${input.value}${hue ? " degrees" : ""}`);
    }
    code.textContent = `:root {\n${controls.map(({ property, input }) => `  ${property}: ${input.value};`).join("\n")}\n}`;
  }

  function save() {
    settings.set(Object.fromEntries(controls.map(({ input, property }) => [property, Number(input.value)])));
  }

  for (const { input } of controls) {
    input.addEventListener("input", save);
  }

  function reset() {
    settings.reset();
  }

  panel.querySelector("[data-palette-reset]").addEventListener("click", reset);

  function restore() {
    const restored = settings.get();
    for (const { input, property } of controls) input.value = restored[property];
    render();
  }
  window.addEventListener("tty-palette-change", restore);
  window.addEventListener("tty-palette-restored", restore);

  render();
  panel.hidden = false;
})();
