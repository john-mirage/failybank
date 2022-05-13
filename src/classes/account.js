class Account {
  constructor(
    account,
    ownerElement,
    balanceElement,
    balanceNegativeClass
  ) {
    this.owner = account.owner;
    this.ownerElement = ownerElement;
    this.balance = account.balance;
    this.balanceElement = balanceElement;
    this.balanceNegativeClass = balanceNegativeClass;
    this.displayOwner();
    this.displayBalance();
  }

  displayOwner() {
    this.ownerElement.textContent = this.owner;
  }

  displayBalance() {
    if (this.balance < 1) {
      if (!this.balanceElement.classList.contains(this.balanceNegativeClass)) {
        this.balanceElement.classList.add(this.balanceNegativeClass);
      }
    } else {
      if (this.balanceElement.classList.contains(this.balanceNegativeClass)) {
        this.balanceElement.classList.remove(this.balanceNegativeClass);
      }
    }
    this.balanceElement.textContent = currencyFormatter.format(this.balance);
  }
}

class PersonalAccount extends Account {
  constructor(
    account,
    accountOwnerElement,
    accountNumberElement,
    accountBalanceElement,
    accountBalanceNegativeClass
  ) {
    super(
      account,
      accountOwnerElement,
      accountBalanceElement,
      accountBalanceNegativeClass
    );
    this.accountNumber = account.number;
    this.accountNumberElement = accountNumberElement;
    this.cash = account.cash;
    this.theme = account.theme;
    this.displayNumber();
  }

  displayNumber() {
    this.accountNumberElement.textContent = this.number;
  }
}