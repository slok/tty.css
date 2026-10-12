/* Colors-page controls. Persistence lives in the shared docs-only loader. */
(() => {
  const panel = document.querySelector("[data-palette-playground]");
  const settings = window.ttyDocsPalette;
  if (!panel || !settings) return;

  const code = panel.querySelector("[data-palette-code]");
  const selector = panel.querySelector("[data-palette-selector]");
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
  // Values follow the controls: accent hue/chroma, then neutral hue/chroma.
  const presets = {
    ocean: [245, 0.1, 245, 0.025],
    plum: [315, 0.1, 315, 0.025],
    matrix: [145, 0.14, 145, 0.008],
    nord: [230, 0.07, 250, 0.02],
    shopify: [125, 0.13, 145, 0.008],
    anthropic: [45, 0.1, 70, 0.012],
    openai: [0, 0, 0, 0],
    lagoon: [185, 0.11, 210, 0.02],
    sakura: [355, 0.1, 350, 0.01],
    ember: [25, 0.14, 35, 0.012],
    solarized: [85, 0.085, 200, 0.02],
    cobalt: [265, 0.15, 265, 0.03],
    violet: [290, 0.16, 285, 0.025],
    mint: [165, 0.075, 165, 0.012],
    citrus: [110, 0.135, 95, 0.01],
    copper: [55, 0.16, 55, 0.015],
    slate: [250, 0.035, 250, 0.008],
  };
  const defaults = controls.map(({ input }) => Number(input.defaultValue));

  function render() {
    for (const { input, output } of controls) {
      const hue = input.dataset.paletteVar.endsWith("-hue");
      const value = `${input.value}${hue ? "°" : ""}`;
      if (output.value !== value) output.value = value;
      input.setAttribute("aria-valuetext", `${input.value}${hue ? " degrees" : ""}`);
    }
    code.textContent = `:root {\n${controls.map(({ property, input }) => `  ${property}: ${input.value};`).join("\n")}\n}`;
    const matches = (values) => controls.every(({ input }, index) => Number(input.value) === values[index]);
    selector.value = matches(defaults) ? "default"
      : Object.keys(presets).find((name) => matches(presets[name])) || "custom";
  }

  function save() {
    settings.set(Object.fromEntries(controls.map(({ input, property }) => [property, Number(input.value)])));
    render();
  }

  for (const { input } of controls) {
    input.addEventListener("input", save);
  }

  function reset() {
    settings.reset();
    const defaults = settings.get();
    for (const { input, property } of controls) {
      input.value = defaults[property];
    }
    render();
  }

  selector.addEventListener("change", () => {
    if (selector.value === "default") return reset();
    const preset = presets[selector.value];
    if (!preset) return;
    controls.forEach(({ input }, index) => { input.value = preset[index]; });
    save();
  });
  panel.querySelector("[data-palette-reset]").addEventListener("click", reset);

  window.addEventListener("tty-palette-restored", () => {
    const restored = settings.get();
    for (const { input, property } of controls) input.value = restored[property];
    render();
  });

  render();
  panel.hidden = false;
})();
