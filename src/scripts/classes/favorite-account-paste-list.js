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
   * @param targetInputElement {HTMLInputElement} - The input.
   * @param handleClick {Function} - The function used when the user click on an element.
   */
  constructor(
    favoriteAccountList,
    targetInputElement,
    handleClick
  ) {
    this.favoriteAccountList = favoriteAccountList;
    this.targetInputElement = targetInputElement;
    this.handleClick = handleClick;
    this.activeFavoriteAccountElement = false;
    this.resetActiveFavoriteAccountElement = this.resetActiveFavoriteAccountElement.bind(this);
  }

  /**
   * Display the count of the favorite accounts.
   */
  displayCount() {
    const favoriteAccountsTotal = String(this.favoriteAccountList.favoriteAccounts.length);
    if (favoriteAccountPasteListCountElement.textContent !== favoriteAccountsTotal) {
      favoriteAccountPasteListCountElement.textContent = favoriteAccountsTotal;
    }
  }

  /**
   * Set the active favorite account element.
   * The active element is the element who has been clicked.
   *
   * @param favoriteAccount {FavoriteAccount} - The favorite account.
   */
  setActiveFavoriteAccountElement(favoriteAccount) {
    if (this.activeFavoriteAccountElement) this.targetInputElement.removeEventListener("keyup", this.resetActiveFavoriteAccountElement);
    this.targetInputElement.value = favoriteAccount.number;
    if (this.activeFavoriteAccountElement) this.activeFavoriteAccountElement.dataset.copied = "false";
    this.activeFavoriteAccountElement = favoriteAccount.getPasteView();
    this.activeFavoriteAccountElement.dataset.copied = "true";
    this.handleClick();
  }

  /**
   * Reset the active account element.
   */
  resetActiveFavoriteAccountElement() {
    this.activeFavoriteAccountElement.dataset.copied = "false";
    this.activeFavoriteAccountElement = false;
  }

  /**
   * Display the favorite accounts in the list represented by an HTML element.
   */
  display() {
    this.favoriteAccountList.favoriteAccounts.forEach((favoriteAccount) => {
      const favoriteAccountElement = favoriteAccount.getPasteView();
      favoriteAccountPasteListElement.appendChild(favoriteAccountElement);
      if (!favoriteAccount.isListenedForPasteList) {
        favoriteAccountElement.addEventListener("click", () => {
          if (this.targetInputElement.value !== favoriteAccount.number) {
            this.setActiveFavoriteAccountElement(favoriteAccount);
            this.targetInputElement.addEventListener("keyup", this.resetActiveFavoriteAccountElement, {once: true});
          }
        });
        favoriteAccount.isListenedForPasteList = true;
      }
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