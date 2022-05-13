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

const viewList = {
  element: "",
  account: "",
  forms: [],
  logList: "",
  logListFilter: "",
  accountList: "",
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
    this.viewElement.classList.add("viewList--active");
    this.logList.displayLogs();
  }

  deactivate() {
    this.viewElement.classList.remove("viewList--active");
    this.forms.forEach((form) => form.reset());
    if (this.logList) {
      this.logList.clearList();
      this.logListFilter.reset();
    }
  }
}