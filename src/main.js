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
  Logs
\*------------------------------------*/

const logTemplate = document.getElementById("log-template");

const LOGS_PER_PAGE = 10;

class LogList {
  constructor(logs, list) {
    this.listElt = list;
    this.logs = logs;
    this.page = 1;
    this.observer = new IntersectionObserver((entries) => {
      this.getNextPage(entries);
    });
    this.observedLog = false;
    this.getPageNumber();
    this.getPageLogs();
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
      this.listElt.prepend(logFragment);
    } else {
      this.listElt.appendChild(logFragment);
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
    this.clearList();
    this.createPageLogs();
  }

  clearList() {
    if (this.observedLog) {
      this.observer.unobserve(this.observedLog);
      this.observedLog = false;
    }
    this.listElt.scrollTop = 0;
    this.listElt.innerHTML = "";
    if (this.page > 1) {
      this.page = 1;
      this.getPageLogs();
    }
  }
}

/*------------------------------------*\
  Account list
\*------------------------------------*/

const deleteAccountList = document.getElementById("account-delete-list");
const deleteAccountTemplate = document.getElementById("account-delete-template");
const pasteAccountList = document.getElementById("account-paste-list");
const pasteAccountTemplate = document.getElementById("account-paste-template");

const ACCOUNTS_LIMIT = 5;

class AccountList {
  constructor(accounts) {
    this.accounts = accounts;
    this.createList();
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
      logListElement
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
  }

  addTab(tab) {
    this.tabs = [...this.tabs, tab];
  }

  setActiveTab(tab) {
    this.activeTab.deactivate();
    this.activeTab = tab;
    this.activeTab.activate();
  }
}

class Tab {
  constructor(viewElt) {
    this.viewElt = viewElt;
  }

  activate() {
    this.viewElt.classList.add("view--active");
  }

  deactivate() {
    this.viewElt.classList.remove("view--active");
  }
}

class TopAppBarTab extends Tab {
  constructor(containerElt, viewElt) {
    super(viewElt);
    this.containerElt = containerElt;
  }

  activate() {
    super.activate();
    this.containerElt.classList.add("tab-list__item--active");
  }

  deactivate() {
    super.deactivate();
    this.containerElt.classList.remove("tab-list__item--active");
  }
}

/*------------------------------------*\
  Forms
\*------------------------------------*/

class Form {
  constructor(fields, buttonElt) {
    this.fields = fields;
    this.buttonElt = buttonElt;
    this.buttonIsActive = false;
    this.isActive = true;
    this.fields.forEach((field) => {
      field.inputElt.addEventListener("keyup", () => this.checkFields());
    });
  }

  checkFields() {
    if (this.isActive) {
      const fieldsAreValid = this.fields.every((field) => field.checkField());
      console.log(fieldsAreValid);
      if (fieldsAreValid && !this.buttonIsActive) {
        this.activateSubmitButton();
      } else if (!fieldsAreValid && this.buttonIsActive) {
        this.deactivateSubmitButton();
      }
    }
  }

  activate() {
    this.isActive = true;
    this.checkFields();
  }

  deactivate() {
    this.isActive = false;
    if (this.buttonIsActive) {
      this.deactivateSubmitButton();
    }
  }

  activateSubmitButton() {
    this.buttonIsActive = true;
    this.buttonElt.classList.replace("button--disabled", "button--primary");
    this.buttonElt.removeAttribute("disabled");
  }

  deactivateSubmitButton() {
    this.buttonIsActive = false;
    this.buttonElt.classList.replace("button--primary", "button--disabled");
    this.buttonElt.setAttribute("disabled", "");
  }
}

class Field {
  constructor(inputElt) {
    this.inputElt = inputElt;
  }

  checkField() {
    return this.inputElt.validity.valid;
  }
}

/*------------------------------------*\
  Personal account
\*------------------------------------*/

const personalDepositFormElt = document.getElementById("personal-deposit-form");
const personalWithdrawFormElt = document.getElementById("personal-withdraw-form");
const personalTransferFormElt = document.getElementById("personal-transfer-form");
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
const personalFavoriteAccountFormElt = document.getElementById("personal-favorite-account-form");
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
const personalFavoriteAccountSumText = document.getElementById("personal-favorite-account-sum-text");
const personalFavoriteAccountFormButton = document.getElementById("personal-favorite-account-form-button");
const personalDepositFormButton = document.getElementById("personal-deposit-form-button");
const personalWithdrawFormButton = document.getElementById("personal-withdraw-form-button");
const personalTransferFormButton = document.getElementById("personal-transfer-form-button");

function getCurrentFormattedDate() {
  const date = new Date();
  return date.toISOString();
}

const personalAccount = new PersonalAccount(
  data.account.personal,
  document.getElementById("personal-account-owner"),
  document.getElementById("personal-account-balance"),
  document.getElementById("personal-account-log-list"),
  document.getElementById("personal-account-number"),
  document.getElementById("personal-account-operation-log-list")
);

personalAccount.logList.createPageLogs();

let previousLogList = personalAccount.logList;

const personalTab = new TopAppBarTab(personalTabContainer, personalTabView);
const personalOperationTab = new TopAppBarTab(personalOperationTabContainer, personalOperationTabView);
const personalTransferTab = new TopAppBarTab(personalTransferTabContainer, personalTransferTabView);

const tabList = new TabList(personalTab, personalOperationTab, personalTransferTab);

const personalFavoriteAccountNameField = new Field(personalFavoriteAccountNameInput);
const personalFavoriteAccountNumberField = new Field(personalFavoriteAccountNumberInput);
const personalDepositAmountField = new Field(personalDepositAmountInput);
const personalWithdrawAmountField = new Field(personalWithdrawAmountInput);
const personalTransferAmountField = new Field(personalTransferAmountInput);
const personalTransferAccountNumberField = new Field(personalTransferAccountNumberInput);
const personalTransferReferenceField = new Field(personalTransferReferenceInput);

const personalFavoriteAccountForm = new Form(
  [personalFavoriteAccountNameField, personalFavoriteAccountNumberField],
  personalFavoriteAccountFormButton
);

const personalDepositForm = new Form(
  [personalDepositAmountField],
  personalDepositFormButton
);

const personalWithdrawForm = new Form(
  [personalWithdrawAmountField],
  personalWithdrawFormButton
);

const personalTransferForm = new Form(
  [personalTransferAmountField, personalTransferAccountNumberField, personalTransferReferenceField],
  personalTransferFormButton
);

if (personalAccount.favoriteAccountList.accounts.length >= 5) {
  personalFavoriteAccountForm.deactivate();
}

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
  const account = {
    name: personalFavoriteAccountNameInput.value,
    number: personalFavoriteAccountNumberInput.value
  }
  personalAccount.favoriteAccountList.addAccount(account);
  personalFavoriteAccountForm.reset();
}

function handlePersonalDepositForm(event) {
  event.preventDefault();
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
  personalDepositForm.reset();
}

function handlePersonalWithdrawForm(event) {
  event.preventDefault();
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
  personalWithdrawForm.reset();
}

function handlePersonalTransferForm(event) {
  event.preventDefault();
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
  personalTransferForm.reset();
}

personalTabInput.addEventListener("change", () => {
  tabList.setActiveTab(personalTab);
  previousLogList.clearList();
  previousLogList = personalAccount.logList;
  personalAccount.logList.createPageLogs();
});

personalOperationTabInput.addEventListener("change", () => {
  tabList.setActiveTab(personalOperationTab);
  previousLogList.clearList();
  previousLogList = personalAccount.operationLogList;
  personalAccount.operationLogList.createPageLogs();
});

personalTransferTabInput.addEventListener("change", () => {
  tabList.setActiveTab(personalTransferTab);
  previousLogList.clearList();
});

personalThemeButton.addEventListener("change", handlePersonalThemeButton);
personalFavoriteAccountFormElt.addEventListener("submit", handlePersonalFavoriteAccountForm);
personalDepositFormElt.addEventListener("submit", handlePersonalDepositForm);
personalWithdrawFormElt.addEventListener("submit", handlePersonalWithdrawForm);
personalTransferFormElt.addEventListener("submit", handlePersonalTransferForm);

/*------------------------------------*\
  Enterprise & Offshore accounts
\*------------------------------------*/

if (data.hasEnterprise) {
  const enterpriseDepositFormElt = document.getElementById("enterprise-deposit-form");
  const enterpriseWithdrawFormElt = document.getElementById("enterprise-withdraw-form");
  const enterpriseDepositAmountInput = document.getElementById("enterprise-deposit-amount-input");
  const enterpriseDepositAmountMessage = document.getElementById("enterprise-deposit-amount-message");
  const enterpriseWithdrawAmountInput = document.getElementById("enterprise-withdraw-amount-input");
  const enterpriseWithdrawAmountMessage = document.getElementById("enterprise-withdraw-amount-message");
  const enterpriseTabInput = document.getElementById("enterprise-tab-input");
  const enterpriseDepositFormButton = document.getElementById("enterprise-deposit-form-button");
  const enterpriseWithdrawFormButton = document.getElementById("enterprise-withdraw-form-button");

  const enterpriseAccount = new Account(
    data.account.enterprise,
    document.getElementById("enterprise-account-owner"),
    document.getElementById("enterprise-account-balance"),
    document.getElementById("enterprise-account-log-list")
  );

  const enterpriseTab = new TopAppBarTab(enterpriseTabContainer, enterpriseTabView);

  tabList.addTab(enterpriseTab);

  const enterpriseDepositField = new Field(enterpriseDepositAmountInput);
  const enterpriseWithdrawField = new Field(enterpriseWithdrawAmountInput);

  const enterpriseDepositForm = new Form(
    [enterpriseDepositField],
    enterpriseDepositFormButton
  );

  const enterpriseWithdrawForm = new Form(
    [enterpriseWithdrawField],
    enterpriseWithdrawFormButton
  );

  function handleEnterpriseDepositForm(event) {
    event.preventDefault();
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
    enterpriseDepositForm.reset();
  }

  function handleEnterpriseWithdrawForm(event) {
    event.preventDefault();
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
    enterpriseWithdrawForm.reset();
  }

  enterpriseTabInput.addEventListener("change", () => {
    tabList.setActiveTab(enterpriseTab);
    previousLogList.clearList();
    previousLogList = enterpriseAccount.logList;
    enterpriseAccount.logList.createPageLogs();
  });

  enterpriseDepositFormElt.addEventListener("submit", handleEnterpriseDepositForm);
  enterpriseWithdrawFormElt.addEventListener("submit", handleEnterpriseWithdrawForm);

  if (data.hasOffshore) {
    const offshoreDepositFormElt = document.getElementById("offshore-deposit-form");
    const offshoreDepositAmountInput = document.getElementById("offshore-deposit-amount-input");
    const offshoreDepositAmountMessage = document.getElementById("offshore-deposit-amount-message");
    const offshoreTabInput = document.getElementById("offshore-tab-input");
    const offshoreDepositFormButton = document.getElementById("offshore-deposit-form-button");

    const offshoreAccount = new Account(
      data.account.offshore,
      document.getElementById("offshore-account-owner"),
      document.getElementById("offshore-account-balance"),
      document.getElementById("offshore-account-log-list")
    );

    const offshoreTab = new Tab(offshoreTabView);

    tabList.addTab(offshoreTab);

    const offshoreDepositField = new Field(offshoreDepositAmountInput);

    const offshoreDepositForm = new Form(
      [offshoreDepositField],
      offshoreDepositFormButton
    );

    function handleOffshoreDepositForm(event) {
      event.preventDefault();
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
      offshoreDepositForm.reset();
    }

    offshoreTabInput.addEventListener("change", () => {
      tabList.setActiveTab(offshoreTab);
      previousLogList.clearList();
      previousLogList = offshoreAccount.logList;
      offshoreAccount.logList.createPageLogs();
    });

    offshoreDepositFormElt.addEventListener("submit", handleOffshoreDepositForm);
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