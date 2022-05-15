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
