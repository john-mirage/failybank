export class Tab {
  constructor(name, handleClick, temporary = false) {
    this.name = name;
    this.element = this.create();
    this.handleClick = handleClick;
    this.temporary = temporary;
    this.handleClick = this.handleClick.bind(this);
  }

  create() {
    const button = document.createElement("button");
    button.classList.add("tab");
    button.textContent = this.name;
    button.addEventListener("click", this.handleClick);
    return button;
  }
}