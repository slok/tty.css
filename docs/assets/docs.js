(() => {
  const root = document.documentElement;
  let storedTheme = null;

  try {
    storedTheme = localStorage.getItem("tty-theme");
  } catch {
    // Storage can be unavailable on local files or in restricted contexts.
  }

  const themeButton = document.querySelector("[data-theme-toggle]");
  const themes = ["light", "dark", "auto"];
  if (themes.includes(storedTheme)) root.dataset.theme = storedTheme;

  function updateThemeLabel() {
    if (!themeButton) return;
    const theme = root.dataset.theme || "light";
    themeButton.textContent = `Theme: ${theme}`;
    themeButton.setAttribute("aria-label", `Current theme: ${theme}. Change theme`);
  }
  window.addEventListener("tty-palette-restored", updateThemeLabel);

  themeButton?.addEventListener("click", () => {
    const current = root.dataset.theme || "light";
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    root.dataset.theme = next;
    try {
      localStorage.setItem("tty-theme", next);
    } catch {
      // The theme still applies for the current page when storage is unavailable.
    }
    updateThemeLabel();
  });

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
