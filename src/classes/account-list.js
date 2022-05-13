const ACCOUNTS_LIMIT = 5;

export class AccountList {
  constructor(accounts) {
    this.accounts = accounts;
  }

  displayCount(countElement) {
    const accountTotal = String(this.accounts.length);
    if (countElement.textContent !== accountTotal) {
      countElement.textContent = accountTotal;
    }
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
    accountListElement,
    deleteFavoriteAccount
  ) {
    this.accountList = accountList;
    this.accountListElement = accountListElement;
    this.accountListCountElement = document.getElementById("personal-favorite-account-count");
    this.deleteFavoriteAccount = deleteFavoriteAccount;
    this.accountTemplate = document.getElementById("favorite-account-delete-template");
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
    accountDeleteButtonElement.addEventListener("click", () => {
      this.deleteFavoriteAccount(account);
    }, { once: true });
    this.accountListElement.appendChild(accountFragment);
  }

  createAccounts() {
    this.accountList.accounts.forEach(this.createAccount);
    this.accountList.displayCount(this.accountListCountElement);
  }

  displayCount() {

  }

  reset() {
    this.clear();
    this.createAccounts();
  }

  clear() {
    this.accountListElement.innerHTML = "";
  }
}

export class PasteAccountList {
  constructor(
    accountList,
    accountListElement,
    pasteAccountNumberToForm
  ) {
    this.accountList = accountList;
    this.accountListElement = accountListElement;
    this.accountListCountElement = document.getElementById("personal-transfer-favorite-account-count");
    this.pasteAccountNumber = pasteAccountNumberToForm;
    this.accountTemplate = document.getElementById("favorite-account-paste-template");
    this.createAccount = this.createAccount.bind(this);
  }

  createAccount(account) {
    const accountFragment = this.accountTemplate.content.cloneNode(true);
    const accountElement = accountFragment.querySelector(".account");
    const accountNameElement = accountElement.querySelector(".account__name");
    const accountNumberElement = accountElement.querySelector(".account__number");
    accountNameElement.textContent = account.name;
    accountNumberElement.textContent = account.number;
    accountElement.addEventListener("click", () => {
      this.pasteAccountNumber(account.number);
    });
    this.accountListElement.appendChild(accountFragment);
  }

  createAccounts() {
    this.accountList.accounts.forEach(this.createAccount);
    this.accountList.displayCount(this.accountListCountElement);
  }

  reset() {
    this.clear();
    this.createAccounts();
  }

  clear() {
    this.accountListElement.innerHTML = "";
  }
}