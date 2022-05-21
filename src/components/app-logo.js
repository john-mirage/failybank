import {bank} from "@data/data";

const logo = {
  "fleeca": `
    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.167 25.5L29.917 33H41.917L41 38.5H23L27.167 13.5H12.167L11 20.5H24L23.167 25.5H10.167L8.917 33H21.917L21 38.5H2L7 8.5H46L45.167 13.5H33.167L32 20.5H44L43.167 25.5H31.167Z"/>
  `,
  "maze": `
    <path fill-rule="evenodd" clip-rule="evenodd" d="M36.48 4.8H4.80005V43.2H9.60004V9.6H18.24V36.48H23.04V9.6H31.68V37.44H36.48V4.8ZM38.4 38.4H29.76V11.52H24.96V38.4H16.32V11.52H11.52V43.2H43.2V4.8H38.4V38.4Z"/>
  `,
};

class AppLogo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    const template = document.getElementById("template-app-logo");
    const fragment = template.content.cloneNode(true);
    this.svg = fragment.querySelector(".logo");
    this.svg.innerHTML = logo[bank];
    this.shadowRoot.innerHTML = `
      <style>
      .logo {
        display: block;
        width: 48px;
        height: 48px;
        color: var(--color-bank);
      }
      </style>
    `;
    this.shadowRoot.appendChild(fragment);
  }
}

export default AppLogo;