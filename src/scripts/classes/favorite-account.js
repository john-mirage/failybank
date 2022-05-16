import {Form} from "@scripts/classes/form";

const normalTemplate = document.getElementById("favorite-account-normal-template");
const editTemplate = document.getElementById("favorite-account-edit-template");
const pasteTemplate = document.getElementById("favorite-account-paste-template");

class FavoriteAccount {
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.normalElement = false;
    this.editElement = false;
    this.pasteElement = false;
  }

  getNormalElement() {
    if (!this.normalElement) {
      const fragment = normalTemplate.content.cloneNode(true);
      const element = fragment.querySelector(".favorite-account");
      const nameElement = element.querySelector(".favorite-account__name");
      const numberElement = element.querySelector(".favorite-account__number");
    }
    return this.normalElement;
  }

  getEditElement() {
    if (!this.editElement) {
      const fragment = editTemplate.content.cloneNode(true);
      const element = fragment.querySelector(".favorite-account");
    }
    return this.editElement;
  }

  getPasteElement() {
    if (!this.pasteElement) {
      const fragment = pasteTemplate.content.cloneNode(true);
      const element = fragment.querySelector(".favorite-account");
      const nameElement = element.querySelector(".favorite-account__name");
      const numberElement = element.querySelector(".favorite-account__number");
    }
    return this.pasteElement;
  }
}