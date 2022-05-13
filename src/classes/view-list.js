class ViewList {
  constructor(...views) {
    this.views = views;
    this.activeView = this.views[0];
  }

  setActiveView(view) {
    this.activeView.deactivate();
    this.activeView = view;
    this.activeView.activate();
  }
}

class View {
  constructor(view) {
    this.viewElement = view.element;
    this.account = view.account;
    this.forms = view.forms;
    this.logList = view.logList;
    this.logListFilter = view.logListFilter;
    this.accountList = view.accountList;
    this.account.display();
  }

  activate() {
    this.viewElement.classList.add("view--active");
    this.logList.displayLogs();
  }

  deactivate() {
    this.viewElement.classList.remove("view--active");
    this.forms.forEach((form) => form.reset());
    if (this.logList) {
      this.logList.clearList();
      this.logListFilter.reset();
    }
  }
}