const deleteAccountList = document.getElementById("account-delete-table");
const pasteAccountList = document.getElementById("account-paste-table");
const accountDeleteTemplate = document.getElementById("account-delete-template");
const accountPasteTemplate = document.getElementById("account-paste-template");
const accountAddButton = document.getElementById("account-add-button");
const savedAccounts = document.getElementById("saved-accounts");
const transferAccountNumberInput = document.getElementById("transfer-account-number-input");

class AccountList {

  constructor(accounts, addAccountInList, removeAccountFromList) {
    this.accounts = accounts;
    this.addAccountInList = addAccountInList;
    this.removeAccountFromList = removeAccountFromList;
    this.createList();
    document.addEventListener("add-favorite-account", (event) => {
      const lessThanFiveAccounts = this.accounts.length < 5;
      if (lessThanFiveAccounts) {
        const account = event.detail.account;
        this.addAccount(account);
      }
    });
  }

  createList() {
    this.accounts.forEach((account) => {
      this.addAccountInList(account);
    });
  }

  /**
   * Add an account.
   *
   * @param account - The account to add.
   */
  addAccount(account) {
    this.accounts.unshift(account);
    this.displayAccountRow(account, true);
    this.updateAddButton();
  }

  /**
   * Delete a favorite account.
   *
   * @param account - The account to delete.
   * @param deleteRow - The corresponding delete row on the DOM.
   * @param pasteRow - The corresponding paste row on the DOM.
   */
  deleteAccount(account, deleteRow, pasteRow) {
    document.dispatchEvent(new CustomEvent("delete-favorite-account", { detail: { account } }));
    this.accounts = this.accounts.filter((favoriteAccount) => account.number !== favoriteAccount.number);
    deleteAccountList.removeChild(deleteRow);
    pasteAccountList.removeChild(pasteRow);
  }

  /**
   * Handle add favorite account button.
   */
  updateAddButton() {
    const numberOfAccounts = this.accounts.length;
    savedAccounts.textContent = `[${String(numberOfAccounts)}/5]`;
    if (numberOfAccounts >= 5) {
      if (accountAddButton.classList.contains("button--primary")) {
        accountAddButton.classList.replace("button--primary", "button--disabled");
        accountAddButton.setAttribute("disabled", "");
      }
    } else if (accountAddButton.classList.contains("button--disabled")) {
      accountAddButton.classList.replace("button--disabled", "button--primary");
      accountAddButton.removeAttribute("disabled");
    }
  }
}

/**
 * Create delete account row in the list.
 *
 * @param account - The account to add to the DOM.
 * @param pasteRow - The paste account row to delete when deleting the account delete row.
 * @param prepend - Indicates that the account delete row should be added before the other rows.
 */
function createDeleteAccountRow(account, pasteRow, prepend = false) {
  const deleteFragment = accountDeleteTemplate.content.cloneNode(true);
  const deleteRow = deleteFragment.querySelector(".account");
  const deleteName = deleteRow.querySelector(".account__name");
  const deleteCode = deleteRow.querySelector(".account__number");
  const deleteButton = deleteRow.querySelector(".account__text-button");
  deleteName.textContent = account.name;
  deleteCode.textContent = account.number;
  deleteButton.addEventListener("click", () => {
    this.deleteFavoriteAccount(account, deleteRow, pasteRow);
    this.updateAddButton();
  }, { once: true });
  if (prepend) {
    deleteAccountList.prepend(deleteFragment);
  } else {
    deleteAccountList.appendChild(deleteFragment);
  }
}

/**
 * Create paste account row.
 *
 * @param newAccount - The new account to add.
 * @param prepend - Indicates that the account paste row should be added before the other rows.
 * @return HTMLElement - The account paste row (used as delete reference).
 */
function createPasteAccountRow(newAccount, prepend = false) {
  const pasteTemplate = accountPasteTemplate.content.cloneNode(true);
  const pasteRow = pasteTemplate.querySelector(".account");
  const pasteName = pasteRow.querySelector(".account__name");
  const pasteCode = pasteRow.querySelector(".account__number");
  pasteName.textContent = newAccount.name;
  pasteCode.textContent = newAccount.number;
  pasteRow.addEventListener("click", () => {
    if (transferAccountNumberInput.value !== newAccount.number) {
      transferAccountNumberInput.value = newAccount.number;
    }
  });
  if (prepend) {
    pasteAccountList.prepend(pasteTemplate);
  } else {
    pasteAccountList.appendChild(pasteTemplate);
  }
  return pasteRow;
}