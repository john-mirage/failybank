/*------------------------------------*\
  Account
\*------------------------------------*/

class Account {
  constructor(account) {
    this.name = account.name;
    this.number = account.number;
    this.balance = account.balance;
    this.favoriteAccounts = account.favoriteAccounts;
    this.logs = account.logs;
    this.theme = account.theme;
    if (this.theme === "dark") {
      themeSwitchButton.checked = true;
      document.documentElement.classList.add("dark");
    }
    this.displayAccount();
    this.displayFavoriteAccounts();
    this.displayAccountLogs();
    this.hasEnterprise = account.hasEnterprise;
    this.hasOffshore = account.hasOffshore;
    if (this.hasEnterprise) {
      enterpriseTab.classList.remove("tab-list__item--hidden");
      this.enterpriseOwner = account.enterprise.owner;
      this.enterpriseBalance = account.enterprise.balance;
      this.enterpriseLogs = account.enterprise.logs;
      this.displayEnterpriseAccount();
      this.displayEnterpriseAccountLogs();
    }
    if (this.hasOffshore) {
      offshoreTab.classList.add("paper__button--visible");
      this.offshoreOwner = account.offshore.owner;
      this.offshoreBalance = account.offshore.balance;
      this.offshoreLogs = account.offshore.logs;
      this.displayOffshoreAccount();
      this.displayOffshoreAccountLogs();
    }
    themeSwitchButton.addEventListener("change", (event) => {
      this.handleTheme(event);
    });
    document.addEventListener("update-account-balance", (event) => {
      const amount = event.detail.amount;
      this.balance += amount;
      this.displayBalance(this.balance, accountBalance);
    });
    document.addEventListener("update-enterprise-account-balance", (event) => {
      const amount = event.detail.amount;
      this.enterpriseBalance += amount;
      this.displayBalance(this.enterpriseBalance, enterpriseAccountBalance);
    });
    document.addEventListener("update-offshore-account-balance", (event) => {
      const amount = event.detail.amount;
      this.offshoreBalance += amount;
      this.displayBalance(this.offshoreBalance, offshoreAccountBalance);
    });
  }

  handleTheme(event) {
    this.theme = event.target.checked ? "dark" : "light";
    document.dispatchEvent(new CustomEvent("theme-update", { theme: this.theme }));
    if (this.theme === "dark") {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
      }
    }
  }

  displayBalance(balance, balanceElement) {
    if (balance < 1) {
      if (!balanceElement.classList.contains("balance__value--negative")) {
        balanceElement.classList.add("balance__value--negative");
      }
    } else {
      if (balanceElement.classList.contains("balance__value--negative")) {
        balanceElement.classList.remove("balance__value--negative");
      }
    }
    balanceElement.textContent = currencyFormatter.format(balance);
  }

  displayAccount() {
    accountName.textContent = this.name;
    accountNumber.textContent = this.number;
    this.displayBalance(this.balance, accountBalance);
  }

  displayEnterpriseAccount() {
    enterpriseAccountName.textContent = this.enterpriseOwner;
    this.displayBalance(this.enterpriseBalance, enterpriseAccountBalance);
  }

  displayOffshoreAccount() {
    offshoreAccountName.textContent = this.offshoreOwner;
    this.displayBalance(this.offshoreBalance, offshoreAccountBalance);
  }

  displayFavoriteAccounts() {
    new DeleteAccountList(this.favoriteAccounts, deleteAccountList, createDeleteAccountElement);
    new PasteAccountList(this.favoriteAccounts, pasteAccountList, createPasteAccountElement);
  }

  displayAccountLogs() {
    new LogList(this.logs, accountLogList, "add-account-log");
    new LogList(this.logs.filter(log => log.type === "operation"), accountOperationLogList, "add-account-operation-log");
  }

  displayEnterpriseAccountLogs() {
    new LogList(this.enterpriseLogs, enterpriseAccountLogList, "add-enterprise-account-log");
  }

  displayOffshoreAccountLogs() {
    new LogList(this.offshoreLogs, offshoreAccountLogList, "add-offshore-account-log");
  }
}