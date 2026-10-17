(() => {
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tablist = group.querySelector(':scope > [role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(tablist.querySelectorAll(':scope > button[role="tab"]'));
    const panels = Array.from(group.querySelectorAll(':scope > [role="tabpanel"]'));
    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    if (!enabledTabs.length) return;

    function setTabStop(tab) {
      tabs.forEach((item) => (item.tabIndex = item === tab ? 0 : -1));
    }

    function revealTab(tab) {
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    function selectTab(tab) {
      tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      panels.forEach((panel) => (panel.hidden = panel.id !== tab.getAttribute("aria-controls")));
      setTabStop(tab);
    }

    const selected = enabledTabs.find((tab) => tab.getAttribute("aria-selected") === "true");
    selectTab(selected || enabledTabs[0]);

    tablist.addEventListener("focusout", (event) => {
      if (!tablist.contains(event.relatedTarget)) {
        setTabStop(enabledTabs.find((tab) => tab.getAttribute("aria-selected") === "true"));
      }
    });

    enabledTabs.forEach((tab) => {
      tab.addEventListener("focus", () => {
        setTabStop(tab);
        revealTab(tab);
      });

      tab.addEventListener("click", () => {
        selectTab(tab);
        tab.focus({ preventScroll: true });
        revealTab(tab);
      });

      tab.addEventListener("keydown", (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const index = enabledTabs.indexOf(tab);
        let next;
        switch (event.key) {
          case "ArrowRight":
            next = enabledTabs[(index + 1) % enabledTabs.length];
            break;
          case "ArrowLeft":
            next = enabledTabs[(index - 1 + enabledTabs.length) % enabledTabs.length];
            break;
          case "Home":
            next = enabledTabs[0];
            break;
          case "End":
            next = enabledTabs[enabledTabs.length - 1];
            break;
          default:
            return;
        }
        event.preventDefault();
        setTabStop(next);
        next.focus({ preventScroll: true });
      });
    });
  });
})();
