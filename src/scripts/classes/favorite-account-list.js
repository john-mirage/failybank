const ACCOUNTS_LIMIT = 5;

/**
 * This class is used as a reference for the lists who display the favorite accounts.
 * Used by: FavoriteAccountEditList
 * Used by: FavoriteAccountPasteList
 *
 * @class
 */
export class FavoriteAccountList {

  /**
   * @constructor
   * @param favoriteAccounts {FavoriteAccount[]} - An array of favorite account instances.
   */
  constructor(favoriteAccounts) {
    this.favoriteAccounts = favoriteAccounts;
  }

  /**
   * Add a favorite account in the list.
   *
   * @param favoriteAccount {FavoriteAccount} - The favorite account to add.
   */
  addFavoriteAccount(favoriteAccount) {
    if (this.favoriteAccounts.length < ACCOUNTS_LIMIT) {
      this.favoriteAccounts = [favoriteAccount, ...this.favoriteAccounts];
    } else {
      throw new Error("Account limit is reached");
    }
  }

  /**
   * Edit a favorite account of the list.
   *
   * @param newFavoriteAccount {FavoriteAccount} - The edited favorite account.
   * @param index {number} - The index of the modified favorite account.
   */
  editFavoriteAccount(newFavoriteAccount, index) {
    this.favoriteAccounts[index] = newFavoriteAccount;
  }

  /**
   * Delete a favorite account from the list.
   *
   * @param favoriteAccount {FavoriteAccount} - The favorite account to delete.
   */
  deleteFavoriteAccount(favoriteAccount) {
    this.favoriteAccounts = this.favoriteAccounts.filter((savedAccount) => {
      return savedAccount.number !== favoriteAccount.number;
    });
  }
}
