const accountAddButton = document.getElementById("account-add-button");
const savedAccounts = document.getElementById("saved-accounts");

const ACCOUNT_LIMIT = 5;

class AccountList {

  constructor(
    accounts,
    list,
    createAccountElement
  ) {
    this.accounts = accounts;
    this.list = list;
    this.createAccountElement = createAccountElement;
    this.addAccountsToList();
    document.addEventListener("add-favorite-account", (event) => {
      const account = event.detail.account;
      this.addAccount(account, true);
    });
    document.addEventListener("delete-favorite-account", (event) => {
      const { account, accountElement } = event.detail;
      this.deleteAccount(account, accountElement);
    });
  }

  addAccountsToList() {
    this.accounts.forEach((account) => {
      const accountElement = this.createAccountElement(account);
      this.list.appendChild(accountElement);
    });
  }

  addAccount(account) {
    if (this.accounts.length < ACCOUNT_LIMIT) {
      this.accounts = [account, ...this.accounts];
      this.resetList();
    } else {
      throw new Error("Account limit is reached");
    }
  }

  deleteAccount(account, accountElement) {
    this.accounts = this.accounts.filter((savedAccount) => {
      return savedAccount.number !== account.number;
    });
    this.resetList();
  }

  resetList() {
    this.list.innerHTML = "";
    this.addAccountsToList();
  }

}

export class DeleteAccountList extends AccountList {
  constructor(accounts, list, createAccountElement) {
    super(accounts, list, createAccountElement);
    this.handleAddButton();
  }

  addAccount(account, position) {
    super.addAccount(account, position);
    this.handleAddButton();
  }

  deleteAccount(account, accountElement) {
    super.deleteAccount(account, accountElement);
    this.handleAddButton();
  }

  handleAddButton() {
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

export class PasteAccountList extends AccountList {
  constructor(accounts, list, createAccountElement) {
    super(accounts, list, createAccountElement);
  }
}