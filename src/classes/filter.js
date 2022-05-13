class FilterList {
  constructor(detailsElement) {
    this.detailsElement = detailsElement;
    this.titleElement = this.detailsElement.querySelector(".filter__header");
    this.initialButtonElement = this.detailsElement.querySelector(".filter__button");
    this.activeButton = this.initialButtonElement;
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

  updateActiveButton(buttonElement) {
    this.detailsElement.removeAttribute("open");
    this.activeButton.classList.replace("filter__button--inactive", "filter__button--active");
    this.activeButton.removeAttribute("disabled");
    this.activeButton = buttonElement;
    this.activeButton.classList.replace("filter__button--active", "filter__button--inactive");
    this.activeButton.setAttribute("disabled", "");
    this.titleElement.textContent = this.activeButton.dataset.filter === "all" ? "Filtrer les résultats" : `Filtre: ${this.activeButton.textContent}`;
  }

  reset() {
    this.updateActiveButton(this.initialButtonElement);
  }
}