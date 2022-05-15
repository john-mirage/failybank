export class Tab {
  constructor(
    label,
    name,
    handleClick,
    temporary = false
  ) {
    this.label = label;
    this.name = name;
    this.handleClick = handleClick;
    this.temporary = temporary;
    this.element = this.createElement();
    if (this.temporary) this.activate();
  }

  createElement() {
    const button = document.createElement("button");
    button.classList.add("tab");
    button.textContent = this.label;
    button.addEventListener("click", () => {
      this.handleClick();
    });
    return button;
  }

  activate() {
    this.element.classList.add("tab--active");
    this.element.setAttribute("disabled", "");
  }

  disable() {
    this.element.classList.remove("tab--active");
    this.element.removeAttribute("disabled");
  }
}