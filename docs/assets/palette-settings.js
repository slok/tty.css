/* Docs-only preferences. Loaded synchronously in the head to avoid a flash. */
(() => {
  const root = document.documentElement;
  const defaultAppearance = root.dataset.theme || "light";
  const key = "tty-palette";
  const ranges = {
    "--tty-accent-hue": [0, 360, 1],
    "--tty-accent-chroma": [0, 0.18, 0.005],
    "--tty-neutral-hue": [0, 360, 1],
    "--tty-neutral-chroma": [0, 0.05, 0.001],
  };
  const properties = Object.keys(ranges);
  // One preset catalog for the docs bar and Colors playground. Values follow
  // the parameter order above: accent hue/chroma, then neutral hue/chroma.
  const presets = Object.freeze([
    ["default", "Default", [65, 0.125, 260, 0.025]],
    ["ocean", "Ocean", [245, 0.1, 245, 0.025]],
    ["plum", "Plum", [315, 0.1, 315, 0.025]],
    ["matrix", "Matrix", [145, 0.14, 145, 0.008]],
    ["nord", "Nord-inspired", [230, 0.07, 250, 0.02]],
    ["shopify", "Shopify-inspired", [125, 0.13, 145, 0.008]],
    ["anthropic", "Anthropic-inspired", [45, 0.1, 70, 0.012]],
    ["openai", "OpenAI-inspired", [0, 0, 0, 0]],
    ["lagoon", "Lagoon", [185, 0.11, 210, 0.02]],
    ["sakura", "Sakura", [355, 0.1, 350, 0.01]],
    ["ember", "Ember", [25, 0.14, 35, 0.012]],
    ["solarized", "Solarized-inspired", [85, 0.085, 200, 0.02]],
    ["cobalt", "Cobalt", [265, 0.15, 265, 0.03]],
    ["violet", "Violet", [290, 0.16, 285, 0.025]],
    ["mint", "Mint", [165, 0.075, 165, 0.012]],
    ["citrus", "Citrus", [110, 0.135, 95, 0.01]],
    ["copper", "Copper", [55, 0.16, 55, 0.015]],
    ["slate", "Slate", [250, 0.035, 250, 0.008]],
  ].map(([id, label, values]) => Object.freeze({ id, label, values: Object.freeze(values) })));

  function valid(values) {
    return values && typeof values === "object" && !Array.isArray(values)
      && properties.every((property) => {
        const value = values[property];
        const [min, max, step] = ranges[property];
        if (typeof value !== "number" || !Number.isFinite(value)) return false;
        const steps = (value - min) / step;
        return value >= min && value <= max
          && Math.abs(steps - Math.round(steps)) < 1e-8;
      });
  }

  function apply(values) {
    for (const property of properties) root.style.setProperty(property, values[property]);
  }

  function clearStorage() {
    try {
      localStorage.removeItem(key);
    } catch {
      // Restricted storage must not prevent using the current page.
    }
  }

  function load() {
    let saved;
    try {
      const theme = localStorage.getItem("tty-theme");
      root.dataset.theme = ["light", "dark", "auto"].includes(theme) ? theme : defaultAppearance;
      saved = localStorage.getItem(key);
    } catch {
      return;
    }
    if (saved !== null) {
      try {
        const values = JSON.parse(saved);
        if (valid(values)) {
          apply(values);
          return;
        }
      } catch {
        // Malformed preferences restore the default palette.
      }
      clearStorage();
    }
    for (const property of properties) root.style.removeProperty(property);
  }

  load();

  window.ttyDocsPalette = {
    presets,
    get() {
      const computed = getComputedStyle(root);
      return Object.fromEntries(properties.map((property) => [property, Number.parseFloat(computed.getPropertyValue(property))]));
    },
    set(values) {
      if (!valid(values)) return false;
      const palette = Object.fromEntries(properties.map((property) => [property, values[property]]));
      apply(palette);
      try {
        localStorage.setItem(key, JSON.stringify(palette));
      } catch {
        // Live changes still work when persistence is unavailable.
      }
      window.dispatchEvent(new Event("tty-palette-change"));
      return true;
    },
    reset() {
      for (const property of properties) root.style.removeProperty(property);
      clearStorage();
      window.dispatchEvent(new Event("tty-palette-change"));
    },
    getPreset() {
      const values = this.get();
      return presets.find((preset) => properties.every((property, index) =>
        Math.abs(values[property] - preset.values[index]) < 1e-8))?.id || "custom";
    },
    setPreset(id) {
      const preset = presets.find((preset) => preset.id === id);
      if (!preset) return false;
      if (id === "default") {
        this.reset();
        return true;
      }
      return this.set(Object.fromEntries(properties.map((property, index) => [property, preset.values[index]])));
    },
  };

  // Back/forward cache restores the old DOM without rerunning this script.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    load();
    window.dispatchEvent(new Event("tty-palette-restored"));
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== null && ![key, "tty-theme"].includes(event.key)) return;
    load();
    window.dispatchEvent(new Event("tty-palette-restored"));
  });
})();
