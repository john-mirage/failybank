const deleteAccountTemplate = document.getElementById("account-delete-template");

class DeleteAccountList {

  constructor(accounts, list) {
    this.accounts = accounts;
    this.accountLimit = 5;
    this.list = list;
    this.addAccountsInList();
    document.addEventListener("add-favorite-account", (event) => {
      const account = event.detail.account;
      this.addAccount(account, "insertBefore");
    });
    document.addEventListener("delete-favorite-account", (event) => {
      const { account, accountElement } = event.detail;
      this.deleteAccount(account, accountElement);
    });
  }

  createAccountElement(account, position) {
    const accountFragment = deleteAccountTemplate.content.cloneNode(true);
    const accountElement = accountFragment.querySelector(".account");
    const accountNameElement = accountElement.querySelector(".account__name");
    const accountNumberElement = accountElement.querySelector(".account__number");
    const accountDeleteButtonElement = accountElement.querySelector(".account__text-button");
    accountNameElement.textContent = account.name;
    accountNumberElement.textContent = account.number;
    accountDeleteButtonElement.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("delete-favorite-account", { detail: { account, accountElement } }));
    }, { once: true });
    if (position) {
      deleteAccountList.prepend(accountFragment);
    } else {
      deleteAccountList.appendChild(accountFragment);
    }
  }

  addAccountsInList() {
    this.accounts.forEach(account => {
      this.createAccountElement(account);
    });
  }

  addAccount(account, position) {
    if (this.accounts.length < this.accountLimit) {
      switch (position) {
        case "insertBefore":
          this.accounts = [account, ...this.accounts];
          this.createAccountElement(account, "insertBefore");
          break;
        case "insertAfter":
          this.accounts = [...this.accounts, account];
          this.createAccountElement(account, "insertAfter");
          break;
        default:
          throw new Error("The position is not valid");
      }
    } else {
      throw new Error("Account limit is reached");
    }
  }

  deleteAccount(account, accountElement) {
    this.accounts = this.accounts.filter((savedAccount) => {
      return savedAccount.number !== account.number;
    });
    this.list.removeChild(accountElement);
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