import {Form} from "@scripts/classes/form";

const favoriteAccountEditListElement = document.getElementById("favorite-account-edit-list");
const favoriteAccountEditListCountElement = document.getElementById("favorite-account-edit-list-count");

/**
 * This class is used to display a list of favorite accounts that
 * can be edited or deleted.
 *
 * @class
 */
export class FavoriteAccountEditList {

  /**
   * @constructor
   * @param favoriteAccountList {FavoriteAccountList} - The favorite account list.
   * @param handleEditButtonClick {Function} - A function called when the user click on an edit button.
   * @param handleDeleteButtonClick {Function} - A function called when the user click on a delete button.
   */
  constructor(
    favoriteAccountList,
    handleEditButtonClick,
    handleDeleteButtonClick,
  ) {
    this.favoriteAccountList = favoriteAccountList;
    this.handleEditButtonClick = handleEditButtonClick;
    this.handleDeleteButtonClick = handleDeleteButtonClick;
  }

  listenButtons(favoriteAccount) {
    const normalView = favoriteAccount.getNormalView();
    const editView = favoriteAccount.getEditView();
    const normalViewEditButton = normalView.querySelector(".favorite-account__icon-button--edit");
    const normalViewDeleteButton = normalView.querySelector(".favorite-account__icon-button--delete");
    const editViewCancelButton = editView.querySelector(".favorite-account__text-button--cancel");
    const editViewConfirmButton = editView.querySelector(".button--confirm");
    normalViewEditButton.addEventListener("click", () => {
      this.enterEditMode(favoriteAccount);
    });
    normalViewDeleteButton.addEventListener("click", () => {
      this.handleDeleteButtonClick();
    });
    editViewCancelButton.addEventListener("click", () => {
      this.exitEditMode(favoriteAccount);
    });
    editViewConfirmButton.addEventListener("click", () => {
      this.handleEditButtonClick(favoriteAccount);
    });
  }

  createForm(favoriteAccount) {
    const formElement = favoriteAccount.getEditView();
    const nameInput = formElement.querySelector(".favorite-account__input--name");
    const numberInput = formElement.querySelector(".favorite-account__input--number");
    const confirmButton = formElement.querySelector(".button--confirm");
    const form = new Form(
      [
        nameInput,
        numberInput
      ],
      formElement,
      confirmButton
    );
    form.checkFields();
  }

  displayCount() {
    const favoriteAccountsTotal = String(this.favoriteAccountList.favoriteAccounts.length);
    if (favoriteAccountEditListCountElement.textContent !== favoriteAccountsTotal) {
      favoriteAccountEditListCountElement.textContent = favoriteAccountsTotal;
    }
  }

  /**
   * Display the favorite accounts in the list represented by an HTML element.
   */
  display() {
    this.favoriteAccountList.favoriteAccounts.forEach((favoriteAccount) => {
      const normalView = favoriteAccount.getNormalView();
      if (!favoriteAccount.isListened) {
        this.listenButtons(favoriteAccount);
        this.createForm(favoriteAccount);
        favoriteAccount.isListened = true;
      }
      favoriteAccountEditListElement.appendChild(normalView);
    });
    this.displayCount();
  }

  /**
   * Enter the edit mode to modify a favorite account.
   *
   * @param favoriteAccount {FavoriteAccount} - The favorite account.
   */
  enterEditMode(favoriteAccount) {
    const normalView = favoriteAccount.getNormalView();
    const editView = favoriteAccount.getEditView();
    const nameInputElement = editView.querySelector(".favorite-account__input--name");
    const numberInputElement = editView.querySelector(".favorite-account__input--number");
    nameInputElement.value = favoriteAccount.name;
    numberInputElement.value = favoriteAccount.number;
    favoriteAccountEditListElement.replaceChild(editView, normalView);
  }

  /**
   * Enter the edit mode.
   *
   * @param favoriteAccount {FavoriteAccount} - The favorite account.
   */
  exitEditMode(favoriteAccount) {
    const normalView = favoriteAccount.getNormalView();
    const editView = favoriteAccount.getEditView();
    favoriteAccountEditListElement.replaceChild(normalView, editView);
  }

  /**
   * Reset the list by deleting all the favorite accounts from the list and
   * recreate them.
   */
  reset() {
    this.clear();
    this.display();
  }

  /**
   * Clear the list by deleting all the favorite accounts from the list.
   */
  clear() {
    favoriteAccountEditListElement.innerHTML = "";
  }
}