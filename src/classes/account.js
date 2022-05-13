class Account {
  constructor(
    account,
    ownerElement,
    balanceElement,
    logListElement
  ) {
    this.owner = account.owner;
    this.ownerElement = ownerElement;
    this.balance = account.balance;
    this.balanceElement = balanceElement;
    this.logList = new LogList(account.logs, logListElement);
    this.displayOwner();
    this.displayBalance();
  }

  displayOwner() {
    this.ownerElement.textContent = this.owner;
  }

  displayBalance() {
    if (this.balance < 1) {
      if (this.balanceElement.classList.contains("section__number--up")) {
        this.balanceElement.classList.replace("section__number--up","section__number--down");
      } else if (!this.balanceElement.classList.contains("section__number--down")) {
        this.balanceElement.classList.add("section__number--down");
      }
    } else {
      if (this.balanceElement.classList.contains("section__number--down")) {
        this.balanceElement.classList.replace("section__number--down","section__number--up");
      } else if (!this.balanceElement.classList.contains("section__number--up")) {
        this.balanceElement.classList.add("section__number--up");
      }
    }
    this.balanceElement.textContent = currencyFormatter.format(this.balance);
  }
}

class PersonalAccount extends Account {
  constructor(
    account,
    ownerElement,
    balanceElement,
    logListElement,
    numberElement,
    operationLogListElement
  ) {
    super(
      account,
      ownerElement,
      balanceElement,
      logListElement
    );
    this.cash = account.cash;
    this.number = account.number;
    this.numberElement = numberElement;
    this.theme = account.theme;
    if (this.theme === "dark") {
      personalThemeButton.checked = true;
      document.documentElement.classList.add("dark");
    }
    this.favoriteAccountList = new AccountList(account.favoriteAccounts);
    this.operationLogList = new LogList(account.logs.filter(log => log.type === "operation"), operationLogListElement);
    this.displayNumber();
  }

  displayNumber() {
    this.numberElement.textContent = this.number;
  }

  displayBalance() {
    if (this.balance < 1) {
      if (!this.balanceElement.classList.contains("balance__value--down")) {
        this.balanceElement.classList.add("balance__value--down");
      }
    } else {
      if (this.balanceElement.classList.contains("balance__value--down")) {
        this.balanceElement.classList.remove("balance__value--down");
      }
    }
    this.balanceElement.textContent = currencyFormatter.format(this.balance);
  }
}