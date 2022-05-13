export class ViewSwitcher {
  constructor(initialView) {
    this.activeView = initialView;
    this.activeView.activate();
  }

  switch(view) {
    this.activeView.deactivate();
    this.activeView = view;
    this.activeView.activate();
  }
}

export class View {
  constructor(
    viewElement,
    filterDropdown,
    logList,
    favoriteAccountList
    ) {
    this.viewElement = viewElement;
    this.filterDropdown = filterDropdown;
    this.logList = logList;
    this.favoriteAccountList = favoriteAccountList;
  }

  activate() {
    this.viewElement.classList.add("view--active");
    if (this.logList) {
      this.logList.logListElement.scrollTop = 0;
      this.logList.displayInitialLogs();
    }
    if (this.favoriteAccountList) this.favoriteAccountList.createAccounts();
  }

  deactivate() {
    this.viewElement.classList.remove("view--active");
    if (this.filterDropdown) this.filterDropdown.reset();
    if (this.logList) {
      if (this.logList.filter) this.logList.filter = false;
      this.logList.clear();
    }
    if (this.favoriteAccountList) this.favoriteAccountList.clear();
  }
}