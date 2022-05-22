class AppTab extends HTMLElement {
  static get observedAttributes() {
    return ["label"];
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.tab = document.createElement("button");
    this.tab.classList.add("tab");
    this.tab.textContent = this.label;
    this.shadowRoot.innerHTML = `
      <style>
      :host {
        font-family: var(--font-display);
      }
      .tab {
        box-sizing: border-box;
        width: 116px;
        height: 100%;
        border-left: none;
        border-right: none;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        background-color: transparent;
        color: var(--color-tab);
        cursor: pointer;
        font-family: inherit;
        font-size: 12px;
        font-weight: 650;
        text-transform: uppercase;
        letter-spacing: 0.06rem;
      }
      .active {
        color: var(--color-tab-active);
        border-bottom: 4px solid var(--color-bank);
      }
      </style>
    `;
    this.shadowRoot.appendChild(this.tab);
  }

  get label() {
    return this.getAttribute("label");
  }

  activate() {
    this.tab.classList.add("active");
    this.tab.setAttribute("disabled", "");
  }

  disable() {
    this.tab.classList.remove("active");
    this.tab.removeAttribute("disabled");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue && name === "label") {
      this.tab.textContent = newValue;
    }
  }
}

export default AppTab;