class Form {
  constructor(inputElements, formElement, buttonElement) {
    this.inputElements = inputElements;
    this.formElement = formElement;
    this.buttonElement = buttonElement;
    this.buttonIsActive = false;
    this.inputElements.forEach((inputElement) => {
      inputElement.addEventListener("keyup", () => this.checkFields());
    });
  }

  checkFields() {
    const fieldsAreValid = this.inputElements.every((field) => field.validity.valid);
    if (fieldsAreValid && !this.buttonIsActive) {
      this.activateSubmitButton();
    } else if (!fieldsAreValid && this.buttonIsActive) {
      this.deactivateSubmitButton();
    }
  }

  reset() {
    this.formElement.reset();
    this.deactivateSubmitButton();
  }

  activateSubmitButton() {
    this.buttonIsActive = true;
    this.buttonElement.classList.replace("button--disabled", "button--primary");
    this.buttonElement.removeAttribute("disabled");
  }

  deactivateSubmitButton() {
    this.buttonIsActive = false;
    this.buttonElement.classList.replace("button--primary", "button--disabled");
    this.buttonElement.setAttribute("disabled", "");
  }
}
