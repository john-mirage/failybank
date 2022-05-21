class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    const template = document.getElementById("template-app-root");
    const fragment = template.content.cloneNode(true);
    this.shadowRoot.innerHTML = `
      <style>
      :host {
        box-sizing: border-box;
        display: flex;
        width: 1280px;
        height: 720px;
        margin: auto;
        background-color: var(--color-app);
        box-shadow: var(--color-app-shadow);
        overflow: hidden;
        user-select: none;
      }
      @media screen and (min-width: 1920px) {
        :host {
          width: 1600px;
          height: 900px;
        }
      }
      @media screen and (min-width: 3840px) {
        :host {
          width: 2560px;
          height: 1440px;
        }
      }
      </style>
    `;
    this.shadowRoot.appendChild(fragment);
  }
}

export default AppRoot;