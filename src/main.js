import data from "./data";

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
  App theme
\*------------------------------------*/

function setAppTheme(bank) {
  switch (bank) {
    case "fleeca":
      document.documentElement.classList.add("fleeca");
      break;
    case "maze":
      document.documentElement.classList.add("maze");
      break;
    default:
      throw new Error("The theme is not valid");
  }
}

setAppTheme(data.bank);

/*------------------------------------*\
  Fields verification
\*------------------------------------*/

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

function checkWithdrawAmount(input, message, balance) {
  const amount = Number(input.value);
  if (balance < amount) {
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

/*------------------------------------*\
  Logs
\*------------------------------------*/

const logTemplate = document.getElementById("log-template");

const LOGS_PER_PAGE = 10;

class LogList {
  constructor(logs, list) {
    this.logList = list;
    this.logs = logs;
    this.page = 1;
    this.observer = new IntersectionObserver((entries) => this.getNextPage(entries));
    this.observedLog = false;
    this.getPageNumber();
    this.getPageLogs();
    this.createPageLogs();
  }

  addLog(log) {
    this.logs.unshift(log);
    this.resetList();
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
    this.pageNumber = Math.ceil( logNumber / LOGS_PER_PAGE);
  }

  getPageLogs() {
    const firstIndex = LOGS_PER_PAGE * (this.page - 1);
    const lastIndex = LOGS_PER_PAGE * this.page;
    this.pageLogs = this.logs.slice(firstIndex, lastIndex);
  }

  resetList() {
    this.logList.innerHTML = "";
    this.page = 1;
    this.getPageLogs();
    this.createPageLogs();
  }
}

/*------------------------------------*\
  Account list
\*------------------------------------*/

const deleteAccountList = document.getElementById("account-delete-list");
const deleteAccountTemplate = document.getElementById("account-delete-template");
const pasteAccountList = document.getElementById("account-paste-list");
const pasteAccountTemplate = document.getElementById("account-paste-template");
const personalFavoriteAccountSumText = document.getElementById("personal-favorite-account-sum-text");
const personalFavoriteAccountFormButton = document.getElementById("personal-favorite-account-form-button");

const ACCOUNTS_LIMIT = 5;

class AccountList {
  constructor(accounts) {
    this.accounts = accounts;
    this.createList();
    this.handleAddButton();
  }

  addAccount(account) {
    if (this.accounts.length < ACCOUNTS_LIMIT) {
      this.accounts = [account, ...this.accounts];
      this.resetList();
    } else {
      throw new Error("Account limit is reached");
    }
  }

  deleteAccount(account) {
    this.accounts = this.accounts.filter((savedAccount) => {
      return savedAccount.number !== account.number;
    });
    this.resetList();
  }

  createDeleteAccount(account) {
    const accountFragment = deleteAccountTemplate.content.cloneNode(true);
    const accountElement = accountFragment.querySelector(".account");
    const accountNameElement = accountElement.querySelector(".account__name");
    const accountNumberElement = accountElement.querySelector(".account__number");
    const accountDeleteButtonElement = accountElement.querySelector(".account__text-button");
    accountNameElement.textContent = account.name;
    accountNumberElement.textContent = account.number;
    accountDeleteButtonElement.addEventListener("click", () => {
      this.deleteAccount(account);
    }, {once: true});
    deleteAccountList.appendChild(accountFragment);
  }

  createPasteAccount(account) {
    const accountFragment = pasteAccountTemplate.content.cloneNode(true);
    const accountElement = accountFragment.querySelector(".account");
    const accountNameElement = accountElement.querySelector(".account__name");
    const accountNumberElement = accountElement.querySelector(".account__number");
    accountNameElement.textContent = account.name;
    accountNumberElement.textContent = account.number;
    accountElement.addEventListener("click", () => {
      if (personalTransferAccountNumberInput.value !== account.number) {
        personalTransferAccountNumberInput.value = account.number;
      }
    });
    pasteAccountList.appendChild(accountFragment);
  }

  createList() {
    this.accounts.forEach((account) => {
      this.createDeleteAccount(account);
      this.createPasteAccount(account);
    });
  }

  resetList() {
    deleteAccountList.innerHTML = "";
    pasteAccountList.innerText = "";
    this.createList();
    this.handleAddButton();
  }

  handleAddButton() {
    const numberOfAccounts = this.accounts.length;
    personalFavoriteAccountSumText.textContent = `[${String(numberOfAccounts)}/5]`;
    if (numberOfAccounts >= 5) {
      if (personalFavoriteAccountFormButton.classList.contains("button--primary")) {
        personalFavoriteAccountFormButton.classList.replace("button--primary", "button--disabled");
        personalFavoriteAccountFormButton.setAttribute("disabled", "");
      }
    } else if (personalFavoriteAccountFormButton.classList.contains("button--disabled")) {
      personalFavoriteAccountFormButton.classList.replace("button--disabled", "button--primary");
      personalFavoriteAccountFormButton.removeAttribute("disabled");
    }
  }
}

/*------------------------------------*\
  Account
\*------------------------------------*/

const personalThemeButton = document.getElementById("personal-theme-button");

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
      logListElement,
    );
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

/*------------------------------------*\
  Tabs
\*------------------------------------*/

class TabList {
  constructor(...tabs) {
    this.tabs = tabs;
    this.activeTab = tabs[0];
    this.listenTabs();
  }

  addTab(tab) {
    this.tabs = [...this.tabs, tab];
    this.listenTab(tab);
  }

  setActiveTab(tab) {
    this.activeTab.deactivate();
    this.activeTab = tab;
    this.activeTab.activate();
  }

  listenTab(tab) {
    tab.inputElt.addEventListener("change", () => {
      this.setActiveTab(tab);
    });
  }

  listenTabs() {
    this.tabs.forEach((tab) => {
      this.listenTab(tab);
    });
  }
}

class Tab {
  constructor(containerElt, inputElt, viewElt) {
    this.containerElt = containerElt;
    this.inputElt = inputElt;
    this.viewElt = viewElt;
  }

  activate() {
    this.containerElt.classList.add("tab-list__item--active");
    this.viewElt.classList.add("view--active");
  }

  deactivate() {
    this.containerElt.classList.remove("tab-list__item--active");
    this.viewElt.classList.remove("view--active");
  }

  remove() {
    this.containerElt.remove();
    this.viewElt.remove();
  }
}

class OffshoreTab extends Tab {
  constructor(containerElt, inputElt, viewElt) {
    super(containerElt, inputElt, viewElt);
  }

  activate() {
    this.viewElt.classList.add("view--active");
  }

  deactivate() {
    this.viewElt.classList.remove("view--active");
  }
}

/*------------------------------------*\
  Personal account
\*------------------------------------*/

const personalDepositForm = document.getElementById("personal-deposit-form");
const personalWithdrawForm = document.getElementById("personal-withdraw-form");
const personalTransferForm = document.getElementById("personal-transfer-form");
const personalDepositAmountInput = document.getElementById("personal-deposit-amount-input");
const personalDepositAmountMessage = document.getElementById("personal-deposit-amount-message");
const personalWithdrawAmountInput = document.getElementById("personal-withdraw-amount-input");
const personalWithdrawAmountMessage = document.getElementById("personal-withdraw-amount-message");
const personalTransferAmountInput = document.getElementById("personal-transfer-amount-input");
const personalTransferAmountMessage = document.getElementById("personal-transfer-amount-message");
const personalTransferAccountNumberInput = document.getElementById("personal-transfer-account-number-input");
const personalTransferAccountNumberMessage = document.getElementById("personal-transfer-account-number-message");
const personalTransferReferenceInput = document.getElementById("personal-transfer-reference-input");
const personalTransferReferenceMessage = document.getElementById("personal-transfer-reference-message");
const personalFavoriteAccountForm = document.getElementById("personal-favorite-account-form");
const personalFavoriteAccountNameInput = document.getElementById("personal-favorite-account-name-input");
const personalFavoriteAccountNameMessage = document.getElementById("personal-favorite-account-name-message");
const personalFavoriteAccountNumberInput = document.getElementById("personal-favorite-account-number-input");
const personalFavoriteAccountNumberMessage = document.getElementById("personal-favorite-account-number-message");
const personalTabContainer = document.getElementById("personal-tab");
const personalTabInput = document.getElementById("personal-tab-input");
const personalTabView = document.getElementById("personal-tab-view");
const personalOperationTabContainer = document.getElementById("personal-operation-tab");
const personalOperationTabInput = document.getElementById("personal-operation-tab-input");
const personalOperationTabView = document.getElementById("personal-operation-tab-view");
const personalTransferTabContainer = document.getElementById("personal-transfer-tab");
const personalTransferTabInput = document.getElementById("personal-transfer-tab-input");
const personalTransferTabView = document.getElementById("personal-transfer-tab-view");
const enterpriseTabContainer = document.getElementById("enterprise-tab");
const enterpriseTabView = document.getElementById("enterprise-tab-view");
const offshoreTabContainer = document.getElementById("offshore-tab");
const offshoreTabView = document.getElementById("offshore-tab-view");

function getCurrentFormattedDate() {
  const date = new Date();
  return date.toISOString();
}

const personalTab = new Tab(
  personalTabContainer,
  personalTabInput,
  personalTabView
);

const personalOperationTab = new Tab(
  personalOperationTabContainer,
  personalOperationTabInput,
  personalOperationTabView
);

const personalTransferTab = new Tab(
  personalTransferTabContainer,
  personalTransferTabInput,
  personalTransferTabView
);

const tabList = new TabList(
  personalTab,
  personalOperationTab,
  personalTransferTab
);

const personalAccount = new PersonalAccount(
  data.account.personal,
  document.getElementById("personal-account-owner"),
  document.getElementById("personal-account-balance"),
  document.getElementById("personal-account-log-list"),
  document.getElementById("personal-account-number"),
  document.getElementById("personal-account-operation-log-list")
);

function handlePersonalThemeButton(event) {
  personalAccount.theme = event.target.checked ? "dark" : "light";
  if (personalAccount.theme === "dark") {
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    }
  }
}

function handlePersonalFavoriteAccountForm(event) {
  event.preventDefault();
  const accountNameFieldIsValid = checkAccountNameField(personalFavoriteAccountNameInput, personalFavoriteAccountNameMessage);
  const accountNumberFieldIsValid = checkAccountNumberField(personalFavoriteAccountNumberInput, personalFavoriteAccountNumberMessage);
  if (accountNameFieldIsValid && accountNumberFieldIsValid) {
    const account = {
      name: personalFavoriteAccountNameInput.value,
      number: personalFavoriteAccountNumberInput.value
    }
    personalAccount.favoriteAccountList.addAccount(account);
  }
}

function handlePersonalDepositForm(event) {
  event.preventDefault();
  const amountFieldIsValid = checkAmountField(personalDepositAmountInput, personalDepositAmountMessage);
  if (amountFieldIsValid) {
    const depositAmount = Number(personalDepositAmountInput.value);
    const log = {
      label: "Dépot",
      amount: depositAmount,
      date: getCurrentFormattedDate(),
      reference: "Dépot sur votre compte",
      type: "operation"
    }
    personalAccount.logList.addLog(log);
    personalAccount.operationLogList.addLog(log);
    personalAccount.balance += depositAmount;
    personalAccount.displayBalance();
  }
}

function handlePersonalWithdrawForm(event) {
  event.preventDefault();
  const withdrawFieldIsValid = checkAmountField(personalWithdrawAmountInput, personalWithdrawAmountMessage);
  const withdrawAmountIsValid = withdrawFieldIsValid ? checkWithdrawAmount(personalWithdrawAmountInput, personalWithdrawAmountMessage, personalAccount.balance) : false;
  if (withdrawFieldIsValid && withdrawAmountIsValid) {
    const withdrawAmount = Number(personalWithdrawAmountInput.value);
    const log = {
      label: "Retrait",
      amount: -withdrawAmount,
      date: getCurrentFormattedDate(),
      reference: "Retrait depuis votre compte",
      type: "operation"
    }
    personalAccount.logList.addLog(log);
    personalAccount.operationLogList.addLog(log);
    personalAccount.balance -= withdrawAmount;
    personalAccount.displayBalance();
  }
}

function handlePersonalTransferForm(event) {
  event.preventDefault();
  const transferAmountFieldIsValid = checkAmountField(personalTransferAmountInput, personalTransferAmountMessage);
  const transferAmountIsValid = transferAmountFieldIsValid ? checkWithdrawAmount(personalTransferAmountInput, personalTransferAmountMessage, personalAccount.balance) : false;
  const transferAccountFieldIsValid = checkAccountNumberField(personalTransferAccountNumberInput, personalTransferAccountNumberMessage);
  const transferReferenceFieldIsValid = checkReferenceField(personalTransferReferenceInput, personalTransferReferenceMessage);
  if (transferAmountFieldIsValid && transferAmountIsValid && transferAccountFieldIsValid && transferReferenceFieldIsValid) {
    const transferAmount = Number(personalTransferAmountInput.value);
    const transferAccountNumber = personalTransferAccountNumberInput.value;
    const transferReference = personalTransferReferenceInput.value;
    const log = {
      label: "Transfert",
      amount: -transferAmount,
      date: getCurrentFormattedDate(),
      reference: transferReference,
      type: "operation"
    }
    personalAccount.logList.addLog(log);
    personalAccount.balance -= transferAmount;
    personalAccount.displayBalance();
  }
}

personalThemeButton.addEventListener("change", handlePersonalThemeButton);
personalFavoriteAccountForm.addEventListener("submit", handlePersonalFavoriteAccountForm);
personalDepositForm.addEventListener("submit", handlePersonalDepositForm);
personalWithdrawForm.addEventListener("submit", handlePersonalWithdrawForm);
personalTransferForm.addEventListener("submit", handlePersonalTransferForm);

/*------------------------------------*\
  Enterprise & Offshore accounts
\*------------------------------------*/

if (data.hasEnterprise) {
  const enterpriseDepositForm = document.getElementById("enterprise-deposit-form");
  const enterpriseWithdrawForm = document.getElementById("enterprise-withdraw-form");
  const enterpriseDepositAmountInput = document.getElementById("enterprise-deposit-amount-input");
  const enterpriseDepositAmountMessage = document.getElementById("enterprise-deposit-amount-message");
  const enterpriseWithdrawAmountInput = document.getElementById("enterprise-withdraw-amount-input");
  const enterpriseWithdrawAmountMessage = document.getElementById("enterprise-withdraw-amount-message");
  const enterpriseTabInput = document.getElementById("enterprise-tab-input");

  const enterpriseTab = new Tab(
    enterpriseTabContainer,
    enterpriseTabInput,
    enterpriseTabView
  );

  tabList.addTab(enterpriseTab);

  const enterpriseAccount = new Account(
    data.account.enterprise,
    document.getElementById("enterprise-account-owner"),
    document.getElementById("enterprise-account-balance"),
    document.getElementById("enterprise-account-log-list")
  );

  function handleEnterpriseDepositForm(event) {
    event.preventDefault();
    const amountFieldIsValid = checkAmountField(enterpriseDepositAmountInput, enterpriseDepositAmountMessage);
    if (amountFieldIsValid) {
      const depositAmount = Number(enterpriseDepositAmountInput.value);
      const log = {
        label: "Dépot",
        amount: depositAmount,
        date: getCurrentFormattedDate(),
        reference: "Dépot sur votre compte",
        type: "operation"
      }
      enterpriseAccount.logList.addLog(log);
      enterpriseAccount.balance += depositAmount;
      enterpriseAccount.displayBalance();
    }
  }

  function handleEnterpriseWithdrawForm(event) {
    event.preventDefault();
    const withdrawFieldIsValid = checkAmountField(enterpriseWithdrawAmountInput, enterpriseWithdrawAmountMessage);
    const withdrawAmountIsValid = withdrawFieldIsValid ? checkWithdrawAmount(enterpriseWithdrawAmountInput, enterpriseWithdrawAmountMessage, enterpriseAccount.balance) : false;
    if (withdrawFieldIsValid && withdrawAmountIsValid) {
      const withdrawAmount = Number(enterpriseWithdrawAmountInput.value);
      const log = {
        label: "Retrait",
        amount: -withdrawAmount,
        date: getCurrentFormattedDate(),
        reference: "Retrait depuis votre compte",
        type: "operation"
      }
      enterpriseAccount.logList.addLog(log);
      enterpriseAccount.balance -= withdrawAmount;
      enterpriseAccount.displayBalance();
    }
  }

  enterpriseDepositForm.addEventListener("submit", handleEnterpriseDepositForm);
  enterpriseWithdrawForm.addEventListener("submit", handleEnterpriseWithdrawForm);

  if (data.hasOffshore) {
    const offshoreDepositForm = document.getElementById("offshore-deposit-form");
    const offshoreDepositAmountInput = document.getElementById("offshore-deposit-amount-input");
    const offshoreDepositAmountMessage = document.getElementById("offshore-deposit-amount-message");
    const offshoreTabInput = document.getElementById("offshore-tab-input");

    const offshoreTab = new OffshoreTab(
      offshoreTabContainer,
      offshoreTabInput,
      offshoreTabView
    );

    tabList.addTab(offshoreTab);

    const offshoreAccount = new Account(
      data.account.offshore,
      document.getElementById("offshore-account-owner"),
      document.getElementById("offshore-account-balance"),
      document.getElementById("offshore-account-log-list")
    );

    function handleOffshoreDepositForm(event) {
      event.preventDefault();
      const amountFieldIsValid = checkAmountField(offshoreDepositAmountInput, offshoreDepositAmountMessage);
      if (amountFieldIsValid) {
        const depositAmount = Number(offshoreDepositAmountInput.value);
        const log = {
          label: "Dépot",
          amount: depositAmount,
          date: getCurrentFormattedDate(),
          reference: "Dépot sur votre compte",
          type: "operation"
        }
        offshoreAccount.logList.addLog(log);
        offshoreAccount.balance += depositAmount;
        offshoreAccount.displayBalance();
      }
    }

    offshoreDepositForm.addEventListener("submit", handleOffshoreDepositForm);
  } else {
    offshoreTabContainer.remove();
    offshoreTabView.remove();
  }
} else {
  enterpriseTabContainer.remove();
  enterpriseTabView.remove();
  offshoreTabContainer.remove();
  offshoreTabView.remove();
}

/*------------------------------------*\
  Load app
\*------------------------------------*/

const app = document.getElementById("app");

setTimeout(() => {
  app.classList.replace("app--loading", "app--loaded");
}, 1000);