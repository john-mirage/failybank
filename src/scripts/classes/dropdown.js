export class Dropdown {
  constructor(detailsElement) {
    this.detailsElement = detailsElement;
    this.summaryElement = this.detailsElement.querySelector(".dropdown__header");
    this.closeWhenClickOutside = this.closeWhenClickOutside.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.detailsElement.addEventListener("toggle", this.handleChange);
  }

  close() {
    this.detailsElement.removeAttribute("open");
  }

  updateLabel(name) {
    this.summaryElement.textContent = name;
  }

  closeWhenClickOutside(event) {
    const clickIsInsideDropdown = this.detailsElement.contains(event.target);
    if (!clickIsInsideDropdown) this.close();
  }

  handleChange() {
    if (this.detailsElement.open) {
      document.addEventListener("click", this.closeWhenClickOutside);
    } else {
      document.removeEventListener("click", this.closeWhenClickOutside);
    }
  }

  reset() {
    this.summaryElement.textContent = "filtrer les résultats";
  }
}