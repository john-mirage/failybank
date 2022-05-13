class Filter {
  constructor(detailsElement, eventType) {
    this.filterElement = detailsElement;
    this.titleElement = this.filterElement.querySelector(".filter__header");
    this.buttonElements = this.filterElement.querySelectorAll(".filter__button");
    this.eventType = eventType;
    this.activeButton = this.buttonElements[0];
    this.closeDetails = this.closeDetails.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.buttonElements.forEach(this.handleButton);
    this.filterElement.addEventListener("toggle", this.handleDetails);
  }

  closeDetails(event) {
    const clickIsInsideDetails = this.filterElement.contains(event.target);
    if (!clickIsInsideDetails) {
      this.filterElement.removeAttribute("open");
    }
  }

  handleButton(buttonElement) {
    buttonElement.addEventListener("click", (event) => {
      const filter = event.target.dataset.filter;
      const customEvent = new CustomEvent(this.eventType, { detail: { filter } });
      this.filterElement.dispatchEvent(customEvent);
      this.updateActiveButton(event.target);
    });
  }

  updateActiveButton(buttonElement) {
    this.filterElement.removeAttribute("open");
    this.activeButton.classList.replace("filter__button--inactive", "filter__button--active");
    this.activeButton.removeAttribute("disabled");
    this.activeButton = buttonElement;
    this.activeButton.classList.replace("filter__button--active", "filter__button--inactive");
    this.activeButton.setAttribute("disabled", "");
    this.titleElement.textContent = this.activeButton.dataset.filter === "all" ? "Filtrer les résultats" : `Filtre: ${this.activeButton.textContent}`;
  }

  reset() {
    this.updateActiveButton(this.buttonElements[0]);
  }

  handleDetails() {
    if (this.filterElement.open) {
      document.addEventListener("click", this.closeDetails);
    } else {
      document.removeEventListener("click", this.closeDetails);
    }
  }
}