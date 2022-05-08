const pasteAccountTemplate = document.getElementById("account-paste-template");

class PasteAccountList {

  constructor(accounts, list, input) {
    this.accounts = accounts;
    this.accountLimit = 5;
    this.list = list;
    this.input = input;
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
    const accountFragment = pasteAccountTemplate.content.cloneNode(true);
    const accountElement = accountFragment.querySelector(".account");
    const accountNameElement = accountElement.querySelector(".account__name");
    const accountNumberElement = accountElement.querySelector(".account__number");
    accountNameElement.textContent = account.name;
    accountNumberElement.textContent = account.number;
    accountElement.addEventListener("click", () => {
      if (this.input.value !== account.number) {
        this.input.value = account.number;
      }
    });
    switch (position) {
      case "insertBefore":
        this.list.prepend(accountFragment);
        break;
      case "insertAfter":
        this.list.appendChild(accountFragment);
        break;
      default:
        throw new Error("The position is not valid");
    }
  }

  addAccountsInList() {
    this.accounts.forEach((account) => {
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
  }
}

export default PasteAccountList;