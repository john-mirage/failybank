const icon = {
  "filter": `
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  `,
  "close": `
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
  `,
};

class AppIcon extends HTMLElement {

  static get observedAttributes() {
    return ["shape"];
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    const template = document.getElementById("template-app-icon");
    const fragment = template.content.cloneNode(true);
    this.svg = fragment.querySelector(".icon");
    const shape = this.shape;
    const size = this.size;
    this.svg.innerHTML = icon[shape];
    this.shadowRoot.innerHTML = `
      <style>
      .icon {
        display: block;
        width: ${size}px;
        height: ${size}px;
      }
      </style>
    `;
    this.shadowRoot.appendChild(fragment);
  }

  get shape() {
    return this.getAttribute("shape");
  }

  get size() {
    return this.getAttribute("size");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue && name === "shape") {
       this.svg.innerHTML = icon[newValue];
    }
  }
}

export default AppIcon;