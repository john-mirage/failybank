class Dropdown extends HTMLElement {

  /**
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.getElementById("template-dropdown");
    const dropdownFragment = template.content.cloneNode(true);
    this.dropdownElement = dropdownFragment.querySelector(".dropdown");
    this.shadowRoot.innerHTML = `
      <style>
      .dropdown {
        box-sizing: border-box;
        position: relative;
      }
      .dropdown__button {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          list-style: none;
          color: var(--color-dropdown-button);
          cursor: pointer;
          text-align: end;
      }
      .dropdown__button:hover {
          color: var(--color-dropdown-button-active);
      }
      .dropdown__label {
        font-size: 1.2rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08rem;
      }
      .dropdown__icon {
          box-sizing: border-box;
          display: block;
          width: 2rem;
          height: 2rem;
          margin-right: 0.8rem;
      }
      .dropdown__content {
          box-sizing: border-box;
          position: absolute;
          bottom: -0.8rem;
          right: 0;
          transform: translateY(100%);
          z-index: 100;
          width: 200px;
          background-color: var(--color-dropdown-content);
          box-shadow: var(--color-dropdown-content-shadow);
      }
      </style>
    `;
    this.shadowRoot.appendChild(this.dropdownElement);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  /**
   * Set the dropdown button label.
   *
   * @param label {string} - The new label.
   */
  set label(label) {
    const buttonLabel = this.dropdownElement.querySelector(".dropdown__label");
    buttonLabel.textContent = label;
  }

  /**
   * Close the dropdown
   */
  close() {
    this.dropdownElement.removeAttribute("open");
  }

  /**
   * Close the dropdown if the user click outside the dropdown
   * when it is open.
   *
   * @param event {Event} - The event.
   */
  handleDocumentClick(event) {
    const clickIsInsideDropdown = this.dropdownElement.contains(event.composedPath()[0]);
    if (!clickIsInsideDropdown && this.dropdownElement.open) this.close();
  }

  /**
   * Listen the document when the user open the dropdown.
   * Remove the listener when the user close the dropdown.
   */
  handleOutsideClick() {
    if (this.dropdownElement.open) {
      document.addEventListener("click", this.handleDocumentClick);
    } else {
      document.removeEventListener("click", this.handleDocumentClick);
    }
  }

  /**
   * Listen the dropdown toggle when the component is mounted.
   */
  connectedCallback() {
    this.dropdownElement.addEventListener("toggle", this.handleOutsideClick);
  }

  /**
   * Remove the dropdown toggle listener on dropdown when the component is unmounted.
   */
  disconnectedCallback() {
    this.dropdownElement.removeEventListener("toggle", this.handleOutsideClick);
  }
}

export default Dropdown;