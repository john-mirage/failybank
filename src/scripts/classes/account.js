import {balanceFormatter} from "@scripts/utils/formatters";

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
    this.displayOwner();
    this.displayBalance();
  }

  displayOwner() {
    this.ownerElement.textContent = this.owner;
  }

  displayBalance() {
    if (this.balance < 1) {
      this.balanceElement.classList.replace(
        "typography--number-positive",
        "typography--number-negative"
      );
    }
    this.balanceElement.textContent = balanceFormatter.format(this.balance);
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