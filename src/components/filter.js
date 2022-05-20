class Filter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    const template = document.getElementById("template-filter");
    const filterFragment = template.content.cloneNode(true);
    const filterElement = filterFragment.querySelector(".filter");
    const labelElement = filterElement.querySelector(".filter__label");
    const iconElement = document.createElement("app-icon");
    iconElement.setAttribute("shape", this.icon);
    iconElement.setAttribute("size", "24");
    labelElement.textContent = this.label;
    filterElement.prepend(iconElement);
    this.shadowRoot.innerHTML = `
      <style>
      .filter {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 32px;
        border: none;
        background-color: transparent;
        text-align: left;
        cursor: pointer;
        font-family: inherit;
        color: var(--color-filter);
        padding: 0 8px;
      }
      .filter:hover {
        background-color: var(--color-filter-background-hover);
        color: var(--color-filter-active);
      }
      .filter__label {
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1;
        margin-left: 8px;
      }
      </style>
    `;
    this.shadowRoot.appendChild(filterElement);
  }

  get label() {
    return this.getAttribute("label");
  }

  get icon() {
    return this.getAttribute("icon");
  }
}

export default Filter;