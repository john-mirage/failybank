export class Filter {
  constructor(label, value) {
    this.label = label;
    this.value = value;
    this.element = this.createElement();
  }

  createElement() {
    const button = document.createElement("button");
    button.classList.add("filter");
    button.textContent = this.label;
    return button;
  }

  activate() {
    this.element.classList.add("filter--active");
    this.element.setAttribute("disabled", "");
  }

  disable() {
    this.element.classList.remove("filter--active");
    this.element.removeAttribute("disabled");
  }
}