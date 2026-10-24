(() => {
  const root = document.documentElement;
  let storedTheme = null;

  try {
    storedTheme = localStorage.getItem("tty-theme");
  } catch {
    // Storage can be unavailable on local files or in restricted contexts.
  }

  const themeButton = document.querySelector("[data-theme-toggle]");
  const paletteSelectors = document.querySelectorAll("[data-palette-selector]");
  const palettePickers = document.querySelectorAll("[data-palette-picker]");
  const settings = window.ttyDocsPalette;
  const navigation = document.querySelector("[data-docs-navigation]");
  if (navigation) {
    const narrowScreen = window.matchMedia("(max-width: 46rem)");
    const updateNavigation = () => { navigation.open = !narrowScreen.matches; };
    updateNavigation();
    narrowScreen.addEventListener("change", updateNavigation);
  }

  const themes = ["light", "dark", "auto"];
  // Pixel Icon Library by HackerNoon; source and license: assets/icons/README.md.
  const appearanceIcons = {
    light: "brightness-high",
    dark: "moon",
    auto: "laptop",
  };
  if (themes.includes(storedTheme)) root.dataset.theme = storedTheme;

  function updateThemeLabel() {
    const theme = root.dataset.theme || "light";
    if (themeButton) {
      const next = themes[(themes.indexOf(theme) + 1) % themes.length];
      if (themeButton.hasAttribute("data-appearance-icon")) {
        themeButton.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><use href="../assets/icons/pixel.svg#${appearanceIcons[theme]}"></use></svg>`;
      } else {
        themeButton.textContent = `Appearance: ${theme}`;
      }
      const label = `Appearance: ${theme}. Switch to ${next}`;
      themeButton.setAttribute("aria-label", label);
      themeButton.title = label;
    }
  }
  window.addEventListener("tty-palette-restored", updateThemeLabel);

  function setAppearance(theme) {
    if (!themes.includes(theme)) return;
    root.dataset.theme = theme;
    try {
      localStorage.setItem("tty-theme", theme);
    } catch {
      // The theme still applies for the current page when storage is unavailable.
    }
    updateThemeLabel();
  }

  themeButton?.addEventListener("click", () => {
    const current = root.dataset.theme || "light";
    setAppearance(themes[(themes.indexOf(current) + 1) % themes.length]);
  });

  if (themeButton?.hasAttribute("data-appearance-icon")) themeButton.disabled = false;

  function updatePaletteSelectors() {
    if (!settings) return;
    const current = settings.getPreset();
    const label = settings.presets.find((preset) => preset.id === current)?.label || "Custom";
    paletteSelectors.forEach((selector) => { selector.value = current; });
    palettePickers.forEach((picker) => {
      picker.querySelector("[data-palette-label]").textContent = label;
      picker.querySelector("summary").setAttribute("aria-label", `Theme: ${label}. Choose theme`);
      picker.querySelectorAll("[data-palette-preset]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.palettePreset === current));
      });
      picker.querySelector("[data-palette-custom]").hidden = current !== "custom";
    });
  }

  if (settings) {
    paletteSelectors.forEach((selector) => {
      const options = settings.presets.map(({ id, label }) => new Option(label, id));
      const custom = new Option("Custom", "custom");
      custom.disabled = true;
      selector.replaceChildren(...options, custom);
      selector.disabled = false;
      selector.addEventListener("change", () => settings.setPreset(selector.value));
    });
    palettePickers.forEach((picker) => {
      const summary = picker.querySelector("summary");
      const list = picker.querySelector("ul");
      const items = settings.presets.map(({ id, label }) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.palettePreset = id;
        button.textContent = label;
        button.addEventListener("click", () => {
          settings.setPreset(id);
          picker.open = false;
          summary.focus();
        });
        item.append(button);
        return item;
      });
      const custom = document.createElement("li");
      custom.dataset.paletteCustom = "";
      const customLabel = document.createElement("span");
      customLabel.textContent = "Custom (edited palette)";
      custom.append(customLabel);
      list.replaceChildren(...items, custom);
      picker.hidden = false;
      picker.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !picker.open) return;
        event.preventDefault();
        picker.open = false;
        summary.focus();
      });
      picker.addEventListener("focusout", (event) => {
        if (event.relatedTarget && !picker.contains(event.relatedTarget)) picker.open = false;
      });
    });
    document.addEventListener("pointerdown", (event) => {
      palettePickers.forEach((picker) => {
        if (!picker.contains(event.target)) picker.open = false;
      });
    });
    updatePaletteSelectors();
    window.addEventListener("tty-palette-change", updatePaletteSelectors);
    window.addEventListener("tty-palette-restored", updatePaletteSelectors);
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.closest(".code-example")?.querySelector("code");
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.textContent);
        const previous = button.textContent;
        button.textContent = "Copied";
        setTimeout(() => (button.textContent = previous), 1200);
      } catch {
        button.textContent = "Select code";
      }
    });
  });

  document.querySelectorAll("[data-dialog-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = document.getElementById(button.dataset.dialogOpen);
      if (!dialog) return;
      root.classList.add("modal-is-open");
      dialog.showModal();
    });
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("close", () => root.classList.remove("modal-is-open"));
  });

  document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog")?.close());
  });

  updateThemeLabel();
})();
