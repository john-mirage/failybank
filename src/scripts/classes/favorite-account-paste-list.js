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
   * @param favoriteAccountList {FavoriteAccountList} - The favorite account list.
   * @param handleClick {Function} - A function called when the user click on the HTML element.
   */
  constructor(
    favoriteAccountList,
    handleClick
  ) {
    this.favoriteAccountList = favoriteAccountList;
    this.handleClick = handleClick;
  }

  displayCount() {
    const favoriteAccountsTotal = String(this.favoriteAccountList.favoriteAccounts.length);
    if (favoriteAccountPasteListCountElement.textContent !== favoriteAccountsTotal) {
      favoriteAccountPasteListCountElement.textContent = favoriteAccountsTotal;
    }
  }

  /**
   * Display the favorite accounts in the list represented by an HTML element.
   */
  display() {
    this.favoriteAccountList.favoriteAccounts.forEach((favoriteAccount) => {
      const element = favoriteAccount.getPasteView();
      favoriteAccountPasteListElement.appendChild(element);
      element.addEventListener("click", () => {
        this.handleClick(favoriteAccount.number);
      });
    });
    this.displayCount();
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