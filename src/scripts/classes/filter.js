export class Filter {
  constructor(label, value) {
    this.label = label;
    this.value = value;
    this.template = document.getElementById("filter-template");
    this.element = this.createElement();
  }

  createElement() {
    const filterFragment = this.template.content.cloneNode(true);
    const filterElement = filterFragment.querySelector(".filter");
    filterElement.textContent = this.label;
    return filterElement;
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