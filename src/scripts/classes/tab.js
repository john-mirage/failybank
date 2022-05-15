export class Tab {
  constructor(name, handleClick, temporary = false) {
    this.name = name;
    this.element = this.createElement();
    this.handleClick = handleClick;
    this.temporary = temporary;
  }

  createElement() {
    const button = document.createElement("button");
    button.classList.add("tab");
    button.textContent = this.name;
    button.addEventListener("click", () => {
      this.handleClick();
    });
    return button;
  }
}