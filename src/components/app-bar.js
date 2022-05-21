class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    const template = document.getElementById("template-app-bar");
    const fragment = template.content.cloneNode(true);
    this.shadowRoot.innerHTML = `
      <style>
      :host {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        height: 72px;
        padding-left: 24px;
        padding-right: 24px;
        background-color: var(--color-top-app-bar);
        border-bottom: 0.1rem solid var(--color-top-app-bar-border);
      }
      .section {
        box-sizing: border-box;
        flex: 1 1 0;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .left {
        justify-content: flex-start;
      }
      .middle {
        justify-content: center;
      }
      .right {
        justify-content: flex-end;
      }
      </style>
    `;
    this.shadowRoot.appendChild(fragment);
  }
}

export default AppBar;