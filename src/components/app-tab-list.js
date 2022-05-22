class AppTabList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    const template = document.getElementById("template-app-tab-list");
    const fragment = template.content.cloneNode(true);
    this.shadowRoot.innerHTML = `
      <style>
      :host {
        display: flex;
        flex-direction: row;
        height: 100%;
      }
      </style>
    `;
    this.shadowRoot.appendChild(fragment);
  }

  addTab(tab) {

  }

  setActiveTab(tab) {

  }
}

export default AppTabList;