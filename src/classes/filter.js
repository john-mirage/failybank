export class FilterDropdown {
  constructor(detailsElement) {
    this.detailsElement = detailsElement;
    this.titleElement = this.detailsElement.querySelector(".filter__header");
    this.initialButtonElement = this.detailsElement.querySelector(".filter__button");
    this.activeButtonElement = this.initialButtonElement;
    this.closeDetails = this.closeDetails.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.detailsElement.addEventListener("toggle", this.handleDetails);
  }

  closeDetails(event) {
    const clickIsInsideDetails = this.detailsElement.contains(event.target);
    if (!clickIsInsideDetails) {
      this.detailsElement.removeAttribute("open");
    }
  }

  handleDetails() {
    if (this.detailsElement.open) {
      document.addEventListener("click", this.closeDetails);
    } else {
      document.removeEventListener("click", this.closeDetails);
    }
  }

  setActiveFilter(buttonElement) {
    this.detailsElement.removeAttribute("open");
    this.activeButtonElement.classList.replace("filter__button--inactive", "filter__button--active");
    this.activeButtonElement.removeAttribute("disabled");
    this.activeButtonElement = buttonElement;
    this.activeButtonElement.classList.replace("filter__button--active", "filter__button--inactive");
    this.activeButtonElement.setAttribute("disabled", "");
    this.titleElement.textContent = this.activeButtonElement.dataset.filter === "all"
      ? "Filtrer les résultats"
      : `Filtre: ${this.activeButtonElement.textContent}`;
  }

  reset() {
    this.setActiveFilter(this.initialButtonElement);
  }
}