import AccountList from "./account-list";
import LogList from "./log-list";

const balanceText = document.getElementById("balance");
const themeSwitchButton = document.getElementById("dark-mode-toggle");
const accountName = document.getElementById("account-name");
const accountNumber = document.getElementById("account-number");
const enterpriseTab = document.getElementById("tab-enterprise");
const offshoreTab = document.getElementById("tab-offshore");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "always",
  maximumFractionDigits: 0
});

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

/**
 * @class Account
 */
class Account {

  /**
   * @constructor
   * @param account - The account data.
   */
  constructor(account) {
    this.name = account.name;
    this.number = account.number;
    this.balance = account.balance;
    this.logs = account.logs;
    this.favoriteAccounts = account.favoriteAccounts;
    this.hasEnterprise = account.hasEnterprise;
    if (this.hasEnterprise) this.enterpriseLogs = account.enterprise.logs;
    this.hasOffshore = account.hasOffshore;
    this.theme = account.theme;
    themeSwitchButton.addEventListener("change", (event) => { this.handleTheme(event); });
    document.addEventListener("update-balance", (event) => { this.handleBalance(event); });
  }

  handleBalance(event) {
    const amount = event.detail.amount;
    this.balance += amount;
    this.displayBalance();
  }

  handleTheme(event) {
    this.theme = event.target.checked ? "dark" : "light";
    if (this.theme === "dark") {
      document.dispatchEvent(new CustomEvent("theme-update", { theme: this.theme }));
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
      }
    }
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
    balanceText.textContent = currencyFormatter.format(this.balance);
  }

  displayEnterpriseTab() {
    if (this.hasEnterprise) {
      enterpriseTab.classList.remove("tab-list__item--hidden");
      if (this.hasOffshore) {
        offshoreTab.classList.add("paper__button--visible");
      }
    }
  }

  displayAccount() {
    accountName.textContent = this.name;
    accountNumber.textContent = this.number;
    this.displayBalance();
    this.displayEnterpriseTab();
    if (this.theme === "dark") {
      themeSwitchButton.checked = true;
      document.documentElement.classList.add("dark");
    }
  }

  displayFavoriteAccounts() {
    const accountList = new AccountList(this.favoriteAccounts);
    accountList.updateAddButton();
    accountList.displayAllAccountRows();
  }

  /**
   * Display the logs.
   */
  displayLogs() {
    const globalLogList = new LogList(
      document.getElementById("global-log-list"),
      this.logs,
      currencyFormatter,
      dateTimeFormatter,
      "add-global-log"
    );
    const operationLogList = new LogList(
      document.getElementById("operation-log-list"),
      this.logs.filter((log) => log.type === "operation"),
      currencyFormatter,
      dateTimeFormatter,
      "add-operation-log"
    );
    if (this.hasEnterprise) {
      const enterpriseLogList = new LogList(
        document.getElementById("enterprise-log-list"),
        this.enterpriseLogs,
        currencyFormatter,
        dateTimeFormatter,
        "add-enterprise-log"
      );
    }
  }

}

export default Account;