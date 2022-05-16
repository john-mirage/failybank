const favoriteAccountPasteListElement = document.getElementById("favorite-account-paste-list");
const favoriteAccountPasteListCountElement = document.getElementById("favorite-account-paste-list-count");

/**
 * This class is used to display a list of favorite accounts that
 * can be used to paste an account number in a form input.
 *
 * @class
 */
export class FavoriteAccountPasteList {

  /**
   * @constructor
   * @param accountList {AccountList} - The account list.
   * @param handleClick {Function} - A function called when the user click on the HTML element.
   */
  constructor(
    accountList,
    handleClick
  ) {
    this.accountList = accountList;
    this.handleClick = handleClick;
  }

  /**
   * Display the favorite accounts in the list represented by an HTML element.
   */
  display() {

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
    favoriteAccountPasteListElement.innerHTML = "";
  }
}