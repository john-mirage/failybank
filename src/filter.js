class Filter {
  constructor(detailsElement, buttonElements, eventType) {
    this.detailsElement = detailsElement;
    this.buttonElements = buttonElements;
    this.eventType = eventType;
    this.closeDetails = this.closeDetails.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.buttonElements.forEach(this.handleButton);
    this.detailsElement.addEventListener("toggle", this.handleDetails);
  }

  closeDetails(event) {
    const clickIsInsideDetails = this.detailsElement.contains(event.target);
    if (!clickIsInsideDetails) {
      this.detailsElement.removeAttribute("open");
    }
  }

  handleButton(buttonElement) {
    buttonElement.addEventListener("click", (event) => {
      const filter = event.target.dataset.filter;
      const customEvent = new CustomEvent(this.eventType, { detail: { filter } });
      this.detailsElement.dispatchEvent(customEvent);
    });
  }

  handleDetails() {
    if (this.detailsElement.open) {
      document.addEventListener("click", this.closeDetails);
    } else {
      document.removeEventListener("click", this.closeDetails);
    }
  }
}