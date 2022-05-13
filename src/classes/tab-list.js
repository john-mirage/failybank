class TabList {
  constructor(...tabs) {
    this.tabs = tabs;
    this.activeTab = tabs[0];
  }

  addTab(tab) {
    this.tabs = [...this.tabs, tab];
  }

  setActiveTab(tab) {
    this.activeTab.deactivate();
    this.activeTab = tab;
    this.activeTab.activate();
  }
}

class Tab {
  constructor(name, viewElt) {
    this.name = name;
    this.viewElt = viewElt;
  }

  activate() {
    this.viewElt.classList.add("view--active");
  }

  deactivate() {
    this.viewElt.classList.remove("view--active");
  }
}

class TopAppBarTab extends Tab {
  constructor(name, viewElt, containerElt) {
    super(name, viewElt);
    this.containerElt = containerElt;
  }

  activate() {
    super.activate();
    this.containerElt.classList.add("tab-list__item--active");
  }

  deactivate() {
    super.deactivate();
    this.containerElt.classList.remove("tab-list__item--active");
  }
}