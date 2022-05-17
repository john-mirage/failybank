export class Filter {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.element = this.createElement();
  }

  createElement() {
    const button = document.createElement("button");
    button.classList.add("typography", "typography--body-medium", "filter");
    button.textContent = this.name;
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