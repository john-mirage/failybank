/**
 * Create a new account list.
 *
 * @class AccountList
 */
class AccountList {

  /**
   *
   * @param accountList
   * @param accounts
   */
  constructor(accounts) {
    this.accounts = accounts;
    this.createAccounts();
  }

  /**
   *
   */
  createDeleteAccount(account, deleteAccountRow) {
    const deleteTemplate = accountDeleteTemplate.content.cloneNode(true);
    const deleteRow = deleteTemplate.querySelector(".account");
    const deleteName = deleteRow.querySelector(".account__name");
    const deleteCode = deleteRow.querySelector(".account__number");
    const deleteButton = deleteRow.querySelector(".account__text-button");
    deleteName.textContent = account.name;
    deleteCode.textContent = account.code;
    deleteButton.addEventListener("click", () => {
      accountDeleteTable.removeChild(deleteRow);
      accountPasteTable.removeChild(pasteRow);
      handleSavedAccounts();
    }, { once: true });
    if (prepend) {
      accountDeleteTable.prepend(deleteTemplate);
    } else {
      accountDeleteTable.appendChild(deleteTemplate);
    }
  }

  /**
   *
   * @returns HTMLElement
   */
  createPasteAccount(account) {
    const pasteTemplate = accountPasteTemplate.content.cloneNode(true);
    const pasteRow = pasteTemplate.querySelector(".account");
    const pasteName = pasteRow.querySelector(".account__name");
    const pasteCode = pasteRow.querySelector(".account__number");
    pasteName.textContent = account.name;
    pasteCode.textContent = account.code;
    pasteRow.addEventListener("click", () => {
      if (transferAccountNumberInput.value !== account.code) {
        transferAccountNumberInput.value = account.code;
      }
    });
    if (prepend) {
      accountPasteTable.prepend(pasteTemplate);
    } else {
      accountPasteTable.appendChild(pasteTemplate);
    }
    return pasteRow;
  }

  deleteAccount(deleteAccountRow, pasteAccountRow) {
    accountDeleteList.removeChild(deleteAccountRow);
    accountPasteList.removeChild(pasteAccountRow);
    handleSavedAccounts();
  }

  /**
   *
   */
  createAccounts() {
    this.accounts.forEach((account) => {
      const accountPasteRow = this.createPasteAccount(account);
      this.createDeleteAccount(account, accountPasteRow);
    });
  }

  handleFavoriteAccounts() {
    const accountLength = accountDeleteTable.children.length;
    savedAccounts.textContent = `[${String(accountLength)}/5]`;
    if (accountLength >= 5) {
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