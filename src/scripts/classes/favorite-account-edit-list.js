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
    this.hasBeenDisplayedOnce = false;
  }

  listenButtons(favoriteAccount, form, index) {
    const normalView = favoriteAccount.getNormalView();
    const editView = favoriteAccount.getEditView();
    const normalViewEditButton = normalView.querySelector(".button--edit");
    const normalViewDeleteButton = normalView.querySelector(".button--delete");
    const editViewCancelButton = editView.querySelector(".button--cancel");
    const editViewConfirmButton = editView.querySelector(".button--confirm");
    normalViewEditButton.addEventListener("click", () => {
      this.enterEditMode(favoriteAccount, form);
    });
    normalViewDeleteButton.addEventListener("click", () => {
      this.handleDeleteButtonClick(favoriteAccount);
    });
    editViewCancelButton.addEventListener("click", () => {
      this.exitEditMode(favoriteAccount);
    });
    editViewConfirmButton.addEventListener("click", () => {
      this.handleEditButtonClick(favoriteAccount, form, index);
    });
  }

  createForm(favoriteAccount) {
    const formElement = favoriteAccount.getEditView();
    const nameInput = formElement.querySelector(".favorite-account__input--name");
    const numberInput = formElement.querySelector(".favorite-account__input--number");
    const confirmButton = formElement.querySelector(".button--confirm");
    return new Form(
      [
        nameInput,
        numberInput
      ],
      formElement,
      confirmButton
    );
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
    this.favoriteAccountList.favoriteAccounts.forEach((favoriteAccount, index) => {
      const normalView = favoriteAccount.getNormalView();
      if (!this.hasBeenDisplayedOnce) {
        const form = this.createForm(favoriteAccount);
        this.listenButtons(favoriteAccount, form, index);
      }
      favoriteAccountEditListElement.appendChild(normalView);
    });
    this.hasBeenDisplayedOnce = true;
    this.displayCount();
  }

  /**
   * Enter the edit mode to modify a favorite account.
   *
   * @param favoriteAccount {FavoriteAccount} - The favorite account.
   * @param form {Form} - The form.
   */
  enterEditMode(favoriteAccount, form) {
    const normalView = favoriteAccount.getNormalView();
    const editView = favoriteAccount.getEditView();
    const nameInputElement = editView.querySelector('[data-name="account-owner"]');
    const numberInputElement = editView.querySelector('[data-name="account-number"]');
    nameInputElement.value = favoriteAccount.name;
    numberInputElement.value = favoriteAccount.number;
    form.checkFields();
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