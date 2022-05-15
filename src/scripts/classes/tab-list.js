export class TabList {
  constructor(initialTabs, tabListElement) {
    this.initialTabs = initialTabs;
    this.tabListElement = tabListElement;
    this.activeTab = initialTabs[0];
    this.createInitialTabs();
  }

  addTab(tab) {
    this.tabListElement.appendChild(tab.element);
  }

  deleteTab(tab) {
    this.tabListElement.removeChild(tab.element);
  }

  createInitialTabs() {
    this.initialTabs.forEach((initialTab) => {
      this.tabListElement.appendChild(initialTab.element);
    });
    this.activeTab.element.classList.add("tab--active");
  }

  setActiveTab(tab) {
    if (this.activeTab.temporary) {
      this.deleteTab(this.activeTab);
    } else {
      this.activeTab.element.classList.remove("tab--active");
    }
    this.activeTab = tab;
    if (this.activeTab.temporary) {
      this.addTab(this.activeTab);
    } else {
      this.activeTab.element.classList.add("tab--active");
    }
  }
}
