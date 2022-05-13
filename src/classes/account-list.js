const ACCOUNTS_LIMIT = 5;

export class AccountList {
  constructor(accounts) {
    this.accounts = accounts;
  }

  addAccount(account) {
    if (this.accounts.length < ACCOUNTS_LIMIT) {
      this.accounts = [account, ...this.accounts];
    } else {
      throw new Error("Account limit is reached");
    }
  }

  deleteAccount(account) {
    this.accounts = this.accounts.filter((savedAccount) => {
      return savedAccount.number !== account.number;
    });
  }
}

export class DeleteAccountList {
  constructor(
    accountList,
    accountListElement
  ) {
    this.accountList = accountList;
    this.accountListElement = accountListElement;
    this.accountTemplate = document.getElementById("favorite-account-delete-template");
    this.deleteAccountProps = [];
    this.createAccount = this.createAccount.bind(this);
  }

  createAccount(account) {
    const accountFragment = this.accountTemplate.content.cloneNode(true);
    const accountElement = accountFragment.querySelector(".account");
    const accountNameElement = accountElement.querySelector(".account__name");
    const accountNumberElement = accountElement.querySelector(".account__number");
    const accountDeleteButtonElement = accountElement.querySelector(".account__text-button");
    accountNameElement.textContent = account.name;
    accountNumberElement.textContent = account.number;
    this.deleteAccountProps.push({account, accountDeleteButtonElement});
    this.accountListElement.appendChild(accountFragment);
  }

  createAccounts() {
    this.accountList.accounts.forEach(this.createAccount);
  }

  reset() {
    this.accountListElement.innerHTML = "";
    this.createAccounts();
  }
}

export class PasteAccountList {
  constructor(
    accountList,
    accountListElement
  ) {
    this.accountList = accountList;
    this.accountListElement = accountListElement;
    this.accountTemplate = document.getElementById("favorite-account-paste-template");
    this.pasteAccountProps = [];
    this.createAccount = this.createAccount.bind(this);
  }

  createAccount(account) {
    const accountFragment = this.accountTemplate.content.cloneNode(true);
    const accountElement = accountFragment.querySelector(".account");
    const accountNameElement = accountElement.querySelector(".account__name");
    const accountNumberElement = accountElement.querySelector(".account__number");
    accountNameElement.textContent = account.name;
    accountNumberElement.textContent = account.number;
    this.pasteAccountProps.push({account, accountNumber: account.number});
    this.accountListElement.appendChild(accountFragment);
  }

  createAccounts() {
    this.accountList.accounts.forEach(this.createAccount);
  }

  reset() {
    this.accountListElement.innerHTML = "";
    this.createAccounts();
  }
}