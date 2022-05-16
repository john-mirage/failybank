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

  /**
   * Display the favorite accounts in the list represented by an HTML element.
   */
  display() {
    this.favoriteAccountList.favoriteAccounts.forEach((favoriteAccount) => {
      const element = favoriteAccount.getNormalView();
      favoriteAccountEditListElement.appendChild(element);
    });
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