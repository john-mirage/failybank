const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "always",
  maximumFractionDigits: 0
});

export class Account {
  constructor(
    account,
    accountOwnerElement,
    accountBalanceElement
  ) {
    this.owner = account.owner;
    this.ownerElement = accountOwnerElement;
    this.balance = account.balance;
    this.balanceElement = accountBalanceElement;
    this.balanceNegativeClass = "balance__value--negative";
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

export class PersonalAccount extends Account {
  constructor(
    account,
    accountOwnerElement,
    accountNumberElement,
    accountBalanceElement
  ) {
    super(
      account,
      accountOwnerElement,
      accountBalanceElement
    );
    this.balanceNegativeClass = "section__balance--negative";
    this.accountNumber = account.number;
    this.accountNumberElement = accountNumberElement;
    this.cash = account.cash;
    this.theme = account.theme;
    this.displayNumber();
  }

  displayNumber() {
    this.accountNumberElement.textContent = this.accountNumber;
  }
}