const balanceText = document.getElementById("balance");
const darkModeToggle = document.getElementById("dark-mode-toggle");

class Account {

  constructor(account, currencyFormatter) {
    this.id = account.id;
    this.number = account.code;
    this.balance = account.balance;
    this.logs = account.logs;
    this.favoriteAccounts = account.favoriteAccounts;
    this.hasEnterprise = account.hasEnterprise;
    this.offshore = account.offshore;
    this.currencyFormatter = currencyFormatter;
    this.theme = account.theme;
    this.displayBalance();
    if (this.theme === "dark") {
      darkModeToggle.checked = true;
      document.documentElement.classList.add("dark");
    }
    darkModeToggle.addEventListener("change", this.handleTheme);
    accountName.textContent = activeAccount.name;
    accountNumber.textContent = activeAccount.number;
    if (activeAccount.hasEnterprise) {
      enterpriseTab.classList.remove("tab-list__item--hidden");
      if (activeAccount.hasOffShore) {
        offshoreTab.classList.remove("icon--hidden");
      }
    }
    document.documentElement.classList.add(activeAccount.bank);
  }

  displayBalance() {
    if (this.balance < 1) {
      if (!balanceText.classList.contains("balance__value--negative")) {
        balanceText.classList.add("balance__value--negative");
      }
    } else {
      if (balanceText.classList.contains("balance__value--negative")) {
        balanceText.classList.remove("balance__value--negative");
      }
    }
    balanceText.textContent = this.currencyFormatter.format(this.balance);
  }

  handleTheme(event) {
    if (event.target.checked) {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
      }
    }
  }

}