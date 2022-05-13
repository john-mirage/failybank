export class ViewSwitcher {
  constructor(initialView) {
    this.activeView = initialView;
  }

  switch(view) {
    this.activeView.deactivate();
    this.activeView = view;
    this.activeView.activate();
  }
}

export class View {
  constructor(viewElement) {
    this.viewElement = viewElement;
  }

  activate() {
    this.viewElement.classList.add("view--active");
  }

  deactivate() {
    this.viewElement.classList.remove("view--active");
  }
}