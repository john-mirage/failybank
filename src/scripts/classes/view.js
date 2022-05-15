export class View {
  constructor(
    viewElement,
    filterList,
    logList,
    favoriteAccountList
  ) {
    this.viewElement = viewElement;
    this.filterList = filterList;
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
    if (this.filterList) this.filterList.reset();
    if (this.logList) {
      if (this.logList.filter) this.logList.filter = false;
      this.logList.clear();
    }
    if (this.favoriteAccountList) this.favoriteAccountList.clear();
  }
}