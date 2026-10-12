/* Docs-only preferences. Loaded synchronously in the head to avoid a flash. */
(() => {
  const root = document.documentElement;
  const key = "tty-palette";
  const ranges = {
    "--tty-accent-hue": [0, 360, 1],
    "--tty-accent-chroma": [0, 0.18, 0.005],
    "--tty-neutral-hue": [0, 360, 1],
    "--tty-neutral-chroma": [0, 0.05, 0.001],
  };
  const properties = Object.keys(ranges);

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
      if (["light", "dark", "auto"].includes(theme)) root.dataset.theme = theme;
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
      return true;
    },
    reset() {
      for (const property of properties) root.style.removeProperty(property);
      clearStorage();
    },
  };

  // Back/forward cache restores the old DOM without rerunning this script.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    load();
    window.dispatchEvent(new Event("tty-palette-restored"));
  });
})();
