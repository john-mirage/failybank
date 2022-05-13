class Form {
  constructor(fields, formElt, buttonElt) {
    this.fields = fields;
    this.formElt = formElt;
    this.buttonElt = buttonElt;
    this.buttonIsActive = false;
    this.fields.forEach((field) => {
      field.inputElt.addEventListener("keyup", () => this.checkFields());
    });
  }

  checkFields() {
    const fieldsAreValid = this.fields.every((field) => field.checkField());
    if (fieldsAreValid && !this.buttonIsActive) {
      this.activateSubmitButton();
    } else if (!fieldsAreValid && this.buttonIsActive) {
      this.deactivateSubmitButton();
    }
  }

  reset() {
    this.formElt.reset();
    this.deactivateSubmitButton();
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

class FormField {
  constructor(inputElt) {
    this.inputElt = inputElt;
  }

  checkField() {
    return this.inputElt.validity.valid;
  }
}