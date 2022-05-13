export class TabList {
  constructor(initialTabs, tabListElement) {
    this.initialTabs = initialTabs;
    this.tabListElement = tabListElement;
    this.activeTab = initialTabs[0];
    this.activeTab.element.classList.add("tab--active");
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
  }

  setActiveTab(tab) {
    if (this.activeTab.name === "offshore") {
      this.deleteTab(this.activeTab);
    } else {
      this.activeTab.element.classList.remove("tab--active");
    }
    this.activeTab = tab;
    this.activeTab.element.classList.add("tab--active");
  }
}

export class Tab {
  constructor(name, elementId, active = false) {
    this.name = name;
    this.elementId = elementId;
    this.template = document.getElementById("tab-template");
    this.element = this.create();
    if (active) {
      const inputElement = this.element.querySelector(".tab__input");
      inputElement.checked = true;
    }
  }

  create() {
    const tabFragment = this.template.content.cloneNode(true);
    const tabElement = tabFragment.querySelector(".tab");
    const tabLabelElement = tabFragment.querySelector(".tab__label");
    const tabInputElement = tabFragment.querySelector(".tab__input");
    tabLabelElement.textContent = this.name;
    tabLabelElement.setAttribute("for", this.elementId);
    tabInputElement.setAttribute("id", this.elementId);
    return tabElement;
  }
}