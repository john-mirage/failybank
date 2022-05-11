class Form {
  constructor(fields, buttonElt) {
    this.fields = fields;
    this.buttonElt = buttonElt;
    this.buttonIsActive = false;
    this.isActive = true;
  }

  checkFields() {
    if (this.isActive) {
      const fieldsAreValid = this.fields.every((field) => field.checkField());
      if (fieldsAreValid && !this.buttonIsActive) {
        this.activateSubmitButton();
      } else if (this.buttonIsActive) {
        this.deactivateSubmitButton();
      }
    }
  }

  activate() {
    this.isActive = true;
    this.checkFields();
  }

  deactivate() {
    this.isActive = false;
    if (this.buttonIsActive) {
      this.deactivateSubmitButton();
    }
  }

  activateSubmitButton() {
    this.buttonIsActive = true;
    this.buttonElt.classList.replace("button--disabled", "button--primary");
    this.buttonElt.removeAttribute("disabled");
  }

  deactivateSubmitButton() {
    this.buttonIsActive = false;
    this.buttonElt.classList.replace("button--primary", "button--disabled");
    this.buttonElt.setAttribute("disabled", "");
  }
}

class Field {
  constructor(inputElt) {
    this.inputElt = inputElt;
  }

  checkField() {
    return this.inputElt.validity;
  }
}