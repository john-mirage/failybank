import account from "./data";

const accountBalance = document.getElementById("balance");
const themeSwitchButton = document.getElementById("dark-mode-toggle");
const accountName = document.getElementById("account-name");
const accountNumber = document.getElementById("account-number");
const enterpriseTab = document.getElementById("tab-enterprise");
const offshoreTab = document.getElementById("tab-offshore");

// Account lists
const deleteAccountList = document.getElementById("account-delete-list");
const deleteAccountTemplate = document.getElementById("account-delete-template");
const pasteAccountList = document.getElementById("account-paste-list");
const pasteAccountTemplate = document.getElementById("account-paste-template");

// Log lists
const accountLogList = document.getElementById("account-log-list");
const accountOperationLogList = document.getElementById("account-operation-log-list");
const enterpriseAccountLogList = document.getElementById("enterprise-account-log-list");
const offshoreAccountLogList = document.getElementById("offshore-account-log-list");
const logTemplate = document.getElementById("log-template");

// Account elements
const accountAddForm = document.getElementById("account-add-form");
const accountAddNameInput = document.getElementById("account-add-name-input");
const accountAddNameMessage = document.getElementById("account-add-name-message");
const accountAddNumberInput = document.getElementById("account-add-number-input");
const accountAddNumberMessage = document.getElementById("account-add-number-message");

// Deposit elements
const depositForm = document.getElementById("deposit-form");
const depositInput = document.getElementById("deposit-input");
const depositMessage = document.getElementById("deposit-message");

// Withdraw elements
const withdrawForm = document.getElementById("withdraw-form");
const withdrawInput = document.getElementById("withdraw-input");
const withdrawMessage = document.getElementById("withdraw-message");

// Transfer elements
const transferForm = document.getElementById("transfer-form");
const transferAmountInput = document.getElementById("transfer-amount-input");
const transferAmountMessage = document.getElementById("transfer-amount-message");
const transferAccountNumberInput = document.getElementById("transfer-account-number-input");
const transferAccountNumberMessage = document.getElementById("transfer-account-number-message");
const transferReferenceInput = document.getElementById("transfer-reference-input");
const transferReferenceMessage = document.getElementById("transfer-reference-message");

// Enterprise elements
const enterpriseDepositForm = document.getElementById("enterprise-deposit-form");
const enterpriseDepositInput = document.getElementById("enterprise-deposit-input");
const enterpriseDepositMessage = document.getElementById("enterprise-deposit-message");
const enterpriseWithdrawForm = document.getElementById("enterprise-withdraw-form");
const enterpriseWithdrawInput = document.getElementById("enterprise-withdraw-input");
const enterpriseWithdrawMessage = document.getElementById("enterprise-withdraw-message");
const enterpriseAccountName = document.getElementById("enterprise-account-name");
const enterpriseAccountBalance = document.getElementById("enterprise-account-balance");

// Offshore elements
const offshoreDepositForm = document.getElementById("offshore-deposit-form");
const offshoreDepositInput = document.getElementById("offshore-deposit-input");
const offshoreDepositMessage = document.getElementById("offshore-deposit-message");
const offshoreAccountName = document.getElementById("offshore-account-name");
const offshoreAccountBalance = document.getElementById("offshore-account-balance");

const accountAddButton = document.getElementById("account-add-button");
const savedAccounts = document.getElementById("saved-accounts");

const LOGS_PER_PAGES = 10;
const ACCOUNT_LIMIT = 5;

const appElement = document.getElementById("app");

/*------------------------------------*\
  Formatters
\*------------------------------------*/

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

/*------------------------------------*\
  Favorite accounts
\*------------------------------------*/

function createDeleteAccountElement(account) {
  const accountFragment = deleteAccountTemplate.content.cloneNode(true);
  const accountElement = accountFragment.querySelector(".account");
  const accountNameElement = accountElement.querySelector(".account__name");
  const accountNumberElement = accountElement.querySelector(".account__number");
  const accountDeleteButtonElement = accountElement.querySelector(".account__text-button");
  accountNameElement.textContent = account.name;
  accountNumberElement.textContent = account.number;
  accountDeleteButtonElement.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("delete-favorite-account", {detail: {account, accountElement}}));
  }, {once: true});
  return accountFragment;
}

function createPasteAccountElement(account) {
  const accountFragment = pasteAccountTemplate.content.cloneNode(true);
  const accountElement = accountFragment.querySelector(".account");
  const accountNameElement = accountElement.querySelector(".account__name");
  const accountNumberElement = accountElement.querySelector(".account__number");
  accountNameElement.textContent = account.name;
  accountNumberElement.textContent = account.number;
  accountElement.addEventListener("click", () => {
    if (transferAccountNumberInput.value !== account.number) {
      transferAccountNumberInput.value = account.number;
    }
  });
  return accountFragment;
}

class AccountList {
  constructor(
    accounts,
    list,
    createAccountElement
  ) {
    this.accounts = accounts;
    this.list = list;
    this.createAccountElement = createAccountElement;
    this.addAccountsToList();
    document.addEventListener("add-favorite-account", (event) => {
      const account = event.detail.account;
      this.addAccount(account, true);
    });
    document.addEventListener("delete-favorite-account", (event) => {
      const { account, accountElement } = event.detail;
      this.deleteAccount(account, accountElement);
    });
  }

  addAccountsToList() {
    this.accounts.forEach((account) => {
      const accountElement = this.createAccountElement(account);
      this.list.appendChild(accountElement);
    });
  }

  addAccount(account) {
    if (this.accounts.length < ACCOUNT_LIMIT) {
      this.accounts = [account, ...this.accounts];
      this.resetList();
    } else {
      throw new Error("Account limit is reached");
    }
  }

  deleteAccount(account, accountElement) {
    this.accounts = this.accounts.filter((savedAccount) => {
      return savedAccount.number !== account.number;
    });
    this.resetList();
  }

  resetList() {
    this.list.innerHTML = "";
    this.addAccountsToList();
  }

}

class DeleteAccountList extends AccountList {
  constructor(accounts, list, createAccountElement) {
    super(accounts, list, createAccountElement);
    this.handleAddButton();
  }

  addAccount(account, position) {
    super.addAccount(account, position);
    this.handleAddButton();
  }

  deleteAccount(account, accountElement) {
    super.deleteAccount(account, accountElement);
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

class PasteAccountList extends AccountList {
  constructor(accounts, list, createAccountElement) {
    super(accounts, list, createAccountElement);
  }
}

/*------------------------------------*\
  Logs
\*------------------------------------*/

class LogList {
  constructor(
    logs,
    list,
    eventType,
  ) {
    this.logList = list;
    this.logs = logs;
    this.page = 1;
    this.observer = new IntersectionObserver((entries) => {
      this.getNextPage(entries);
    });
    this.observedLog = false;
    this.eventType = eventType;
    this.getPageNumber();
    this.getPageLogs();
    this.createPageLogs();
    document.addEventListener(this.eventType, (event) => {
      const log = event.detail.log;
      this.addLog(log);
    });
  }

  addLog(log) {
    this.logs.unshift(log);
    this.reset();
  }

  createLog(
    log,
    prepend = false,
    observe = false
  ) {
    const logFragment = logTemplate.content.cloneNode(true);
    const logRow = logFragment.querySelector(".log");
    const logIcon = logRow.querySelector(".log__icon");
    const logType = logRow.querySelector(".log__type");
    const logDate = logRow.querySelector(".log__date");
    const logAmount = logRow.querySelector(".log__amount");
    const logReference = logRow.querySelector(".log__reference");
    logIcon.classList.add(`log__icon--${log.type}`);
    logAmount.classList.add(`log__amount--${log.amount > 0 ? "up" : "down"}`);
    logType.textContent = log.label;
    logDate.textContent = dateTimeFormatter.format(new Date(log.date));
    logAmount.textContent = currencyFormatter.format(log.amount);
    logReference.textContent = log.reference;
    if (prepend) {
      this.logList.prepend(logFragment);
    } else {
      this.logList.appendChild(logFragment);
    }
    if (observe) {
      this.observedLog = logRow;
      this.observer.observe(logRow);
    }
  }

  createPageLogs() {
    if (this.observedLog) {
      this.observer.unobserve(this.observedLog);
      this.observedLog = false;
    }
    this.pageLogs.forEach((pageLog, pageLogIndex) => {
      const isLastLog = pageLogIndex === (this.pageLogs.length - 1);
      const isNotLastPage = this.page < this.pageNumber;
      if (isLastLog && isNotLastPage) {
        this.createLog(pageLog, false, true);
      } else {
        this.createLog(pageLog);
      }
    });
  }

  getNextPage(entries) {
    if (entries[0].isIntersecting) {
      this.page += 1;
      this.getPageLogs();
      this.createPageLogs();
    }
  }

  getPageNumber() {
    const logNumber = this.logs.length;
    this.pageNumber = Math.ceil( logNumber / LOGS_PER_PAGES);
  }

  getPageLogs() {
    const firstIndex = LOGS_PER_PAGES * (this.page - 1);
    const lastIndex = LOGS_PER_PAGES * this.page;
    this.pageLogs = this.logs.slice(firstIndex, lastIndex);
  }

  reset() {
    this.logList.innerHTML = "";
    this.page = 1;
    this.getPageLogs();
    this.createPageLogs();
  }
}

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

/*------------------------------------*\
  Forms
\*------------------------------------*/

function getCurrentDate() {
  const date = new Date();
  return date.toISOString();
}

function checkAccountNameField(input, message) {
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      message.textContent = "Veuillez entrer un nom";
    } else if (input.validity.tooLong) {
      message.textContent = "Le nom ne doit pas exeder 40 caractères";
    } else {
      message.textContent = "Il y a une erreur";
    }
    return false;
  }
  if (message.textContent.length > 0) message.textContent = "";
  return true;
}

function checkAccountNumberField(input, message) {
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      message.textContent = "Veuillez entrer un numéro de compte";
    } else if (input.validity.tooShort || input.validity.tooLong) {
      message.textContent = "Le numéro de compte doit comporter 10 chiffres";
    } else if (input.validity.patternMismatch) {
      message.textContent = "Le numéro de compte ne comporte que des chiffres";
    } else {
      message.textContent = "Il y a une erreur";
    }
    return false;
  }
  if (message.textContent.length > 0) message.textContent = "";
  return true;
}

function checkAmountField(input, message) {
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      message.textContent = "Veuillez entrer un montant";
    } else if (input.validity.patternMismatch) {
      message.textContent = "Le montant ne doit comporter que des chiffres";
    } else {
      message.textContent = "Il y a une erreur";
    }
    return false;
  } else if (Number(input.value) < 50) {
    message.textContent = "Le montant doit être supérieur où égale à 50$";
    return false;
  }
  if (message.textContent.length > 0) message.textContent = "";
  return true;
}

function checkWithdrawAmount(input, message) {
  const amount = Number(input.value);
  if (account.balance < amount) {
    message.textContent = "Vous n'avez pas les fonds nécessaires";
    return false;
  }
  return true;
}

function checkReferenceField(input, message) {
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      message.textContent = "Veuillez entrer la référence du transfert";
    } else if (input.validity.tooLong) {
      message.textContent = "La référence du transfert ne doit exeder 40 caractères";
    } else {
      message.textContent = "Il y a une erreur";
    }
    return false;
  }
  if (message.textContent.length > 0) message.textContent = "";
  return true;
}

function handleAccountAddForm(event) {
  event.preventDefault();
  const accountNameFieldIsValid = checkAccountNameField(accountAddNameInput, accountAddNameMessage);
  const accountNumberFieldIsValid = checkAccountNumberField(accountAddNumberInput, accountAddNumberMessage);
  if (accountNameFieldIsValid && accountNumberFieldIsValid) {
    const account = {
      name: accountAddNameInput.value,
      number: accountAddNumberInput.value
    };
    document.dispatchEvent(new CustomEvent("add-favorite-account", {detail: {account}}));
  }
}

function handleDepositForm(event) {
  event.preventDefault();
  const amountFieldIsValid = checkAmountField(depositInput, depositMessage);
  if (amountFieldIsValid) {
    const amount = Number(depositInput.value);
    const log = {
      label: "Dépot",
      amount,
      date: getCurrentDate(),
      reference: "Dépot sur votre compte",
      type: "operation",
    }
    document.dispatchEvent(new CustomEvent("add-account-log", {detail: {log}}));
    document.dispatchEvent(new CustomEvent("add-account-operation-log", {detail: {log}}));
    document.dispatchEvent(new CustomEvent("update-balance", {detail: {amount}}));
    depositForm.reset();
  }
}

function handleWithdrawForm(event) {
  event.preventDefault();
  const withdrawFieldIsValid = checkAmountField(withdrawInput, withdrawMessage);
  const withdrawAmountIsValid = withdrawFieldIsValid ? checkWithdrawAmount(withdrawInput, withdrawMessage) : false;
  if (withdrawFieldIsValid && withdrawAmountIsValid) {
    const amount = Number(`-${withdrawInput.value}`);
    const log = {
      label: "Retrait",
      amount,
      date: getCurrentDate(),
      reference: "Retrait depuis votre compte",
      type: "operation",
    }
    document.dispatchEvent(new CustomEvent("add-account-log", {detail: {log}}));
    document.dispatchEvent(new CustomEvent("add-account-operation-log", {detail: {log}}));
    document.dispatchEvent(new CustomEvent("update-balance", {detail: {amount}}));
    withdrawForm.reset();
  }
}

function handleTransferForm(event) {
  event.preventDefault();
  const transferAmountFieldIsValid = checkAmountField(transferAmountInput, transferAmountMessage);
  const transferAmountIsValid = transferAmountFieldIsValid ? checkWithdrawAmount(transferAmountInput, transferAmountMessage) : false;
  const transferAccountFieldIsValid = checkAccountNumberField(transferAccountNumberInput, transferAccountNumberMessage);
  const transferReferenceFieldIsValid = checkReferenceField(transferReferenceInput, transferReferenceMessage);
  if (transferAmountFieldIsValid && transferAmountIsValid && transferAccountFieldIsValid && transferReferenceFieldIsValid) {
    const amount = Number(`-${transferAmountInput.value}`);
    const log = {
      label: "Transfert",
      amount,
      date: getCurrentDate(),
      reference: transferReferenceInput.value,
      type: "transfer",
    }
    document.dispatchEvent(new CustomEvent("add-account-log", {detail: {log}}));
    document.dispatchEvent(new CustomEvent("update-balance", {detail: {amount}}));
    transferForm.reset();
  }
}

function handleEnterpriseDepositForm(event) {
  event.preventDefault();
  const amountFieldIsValid = checkAmountField(enterpriseDepositInput, enterpriseDepositMessage);
  if (amountFieldIsValid) {
    const amount = Number(enterpriseDepositInput.value);
    const log = {
      label: "Dépot",
      amount,
      date: getCurrentDate(),
      reference: "Dépot sur le compte",
      type: "enterprise",
    }
    document.dispatchEvent(new CustomEvent("add-enterprise-log", {detail: {log}}));
    document.dispatchEvent(new CustomEvent("update-enterprise-balance", {detail: {amount}}));
    enterpriseDepositForm.reset();
  }
}

function handleEnterpriseWithdrawForm(event) {
  event.preventDefault();
  const withdrawFieldIsValid = checkAmountField(enterpriseWithdrawInput, enterpriseWithdrawMessage);
  const withdrawAmountIsValid = withdrawFieldIsValid ? checkWithdrawAmount(enterpriseWithdrawInput, enterpriseWithdrawMessage) : false;
  if (withdrawFieldIsValid && withdrawAmountIsValid) {
    const amount = Number(`-${enterpriseWithdrawInput.value}`);
    const log = {
      label: "Retrait",
      amount,
      date: getCurrentDate(),
      reference: "Retrait depuis le compte",
      type: "enterprise",
    }
    document.dispatchEvent(new CustomEvent("add-enterprise-log", {detail: {log}}));
    document.dispatchEvent(new CustomEvent("update-enterprise-balance", {detail: {amount}}));
    enterpriseWithdrawForm.reset();
  }
}

function handleOffshoreDepositForm(event) {
  event.preventDefault();
  const amountFieldIsValid = checkAmountField(offshoreDepositInput, offshoreDepositMessage);
  if (amountFieldIsValid) {
    const amount = Number(offshoreDepositInput.value);
    const log = {
      label: "Dépot",
      amount,
      date: getCurrentDate(),
      reference: "Dépot sur le compte",
      type: "offshore",
    }
    document.dispatchEvent(new CustomEvent("add-offshore-log", {detail: {log}}));
    document.dispatchEvent(new CustomEvent("update-offshore-balance", {detail: {amount}}));
    offshoreDepositForm.reset();
  }
}

accountAddForm.addEventListener("submit", handleAccountAddForm);
depositForm.addEventListener("submit", handleDepositForm);
withdrawForm.addEventListener("submit", handleWithdrawForm);
transferForm.addEventListener("submit", handleTransferForm);
enterpriseDepositForm.addEventListener("submit", handleEnterpriseDepositForm);
enterpriseWithdrawForm.addEventListener("submit", handleEnterpriseWithdrawForm);
offshoreDepositForm.addEventListener("submit", handleOffshoreDepositForm);

/*------------------------------------*\
  Init
\*------------------------------------*/

setTimeout(() => {
  appElement.classList.replace("app--loading", "app--loaded");
}, 1000);

new Account(account);

document.documentElement.classList.add("fleeca");
