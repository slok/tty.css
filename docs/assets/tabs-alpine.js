document.addEventListener("alpine:init", () => {
  Alpine.data("exampleTabs", () => ({
    activeTab: 0,
    tabStop: 0,

    focusTab(index, tab) {
      this.tabStop = index;
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    },

    activateTab(index, tab) {
      this.activeTab = index;
      this.tabStop = index;
      tab.focus({ preventScroll: true });
      this.focusTab(index, tab);
    },

    moveTab(event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const tabs = Array.from(event.currentTarget.querySelectorAll(':scope > button[role="tab"]'))
        .filter((tab) => !tab.disabled);
      const index = tabs.indexOf(event.target);
      if (index < 0) return;
      let next;
      switch (event.key) {
        case "ArrowRight": next = (index + 1) % tabs.length; break;
        case "ArrowLeft": next = (index - 1 + tabs.length) % tabs.length; break;
        case "Home": next = 0; break;
        case "End": next = tabs.length - 1; break;
        default: return;
      }
      event.preventDefault();
      tabs[next].focus({ preventScroll: true });
    },
  }));
});
