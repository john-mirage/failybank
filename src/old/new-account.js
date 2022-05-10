class Account {
  constructor(owner, balance, logs) {
    this.owner = owner;
    this.balance = balance;
    this.logs = logs;
  }

  displayBalance() {

  }

  displayAccount() {

  }

  displayAccountLogs() {

  }
}

class PersonalAccount extends Account {
  constructor(owner, balance, logs, number, favoriteAccounts, theme) {
    super(owner, balance, logs);
    this.number = number;
    this.accountList = favoriteAccounts;
    this.theme = theme;

    document.addEventListener("reset-favorite-accounts", (event) => {
      const favoriteAccounts = event.detail.favoriteAccounts;
      this.accountList.reset(favoriteAccounts);
    });
  }

  displayFavoriteAccounts() {

  }
}

class EnterpriseAccount extends Account {
  constructor(owner, balance, logs) {
    super(owner, balance, logs);
  }
}

class OffshoreAccount extends Account {
  constructor(owner, balance, logs) {
    super(owner, balance, logs);
  }
}