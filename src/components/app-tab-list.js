import {tabs} from "@data/data";

class AppTabList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
      <style>
      :host {
        display: flex;
        flex-direction: row;
        height: 100%;
      }
      </style>
    `;
    this.tabs = tabs.map((tab) => {
      const tabElement = document.createElement("app-tab");
      tabElement.label = tab.label;
      this.shadowRoot.appendChild(tabElement);
      return tabElement;
    });
    this.tabs[0].activate();
  }
}

export default AppTabList;