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
    this.hasNotBeenDisplayedOnce = true;
  }

  listenButtons(favoriteAccount) {
    const normalView = favoriteAccount.getNormalView();
    const editView = favoriteAccount.getEditView();
    const normalViewEditButton = normalView.querySelector(".favorite-account__icon-button--edit");
    const normalViewDeleteButton = normalView.querySelector(".favorite-account__icon-button--delete");
    const editViewCancelButton = editView.querySelector(".favorite-account__text-button--cancel");
    const editViewEditButton = editView.querySelector(".favorite-account__text-button--edit");
    normalViewEditButton.addEventListener("click", () => {
      this.enterEditMode(favoriteAccount);
    });
    normalViewDeleteButton.addEventListener("click", () => {
      this.handleDeleteButtonClick();
    });
    editViewCancelButton.addEventListener("click", () => {
      this.exitEditMode(favoriteAccount);
    });
    editViewEditButton.addEventListener("click", () => {
      this.exitEditMode(favoriteAccount);
      this.handleEditButtonClick(favoriteAccount);
    });
  }

  /**
   * Display the favorite accounts in the list represented by an HTML element.
   */
  display() {
    this.favoriteAccountList.favoriteAccounts.forEach((favoriteAccount) => {
      const normalView = favoriteAccount.getNormalView();
      if (this.hasNotBeenDisplayedOnce) {
        this.listenButtons(favoriteAccount);
      }
      favoriteAccountEditListElement.appendChild(normalView);
    });
    this.hasNotBeenDisplayedOnce = false;
  }

  /**
   * Enter the edit mode to modify a favorite account.
   *
   * @param favoriteAccount {FavoriteAccount} - The favorite account.
   */
  enterEditMode(favoriteAccount) {
    const normalView = favoriteAccount.getNormalView();
    const editView = favoriteAccount.getEditView();
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