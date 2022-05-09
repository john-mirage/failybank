import account from "./data";
import {DeleteAccountList, PasteAccountList} from "./script/account-list";
import {LogList} from "./script/log-list";

// Delete account list
const deleteAccountList = document.getElementById("account-delete-list");
const deleteAccountTemplate = document.getElementById("account-delete-template");

// Paste account list
const pasteAccountList = document.getElementById("account-paste-list");
const pasteAccountTemplate = document.getElementById("account-paste-template");

// Log lists
const accountLogList = document.getElementById("account-log-list");
const accountOperationLogList = document.getElementById("account-operation-log-list");

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

// Offshore elements
const offshoreDepositForm = document.getElementById("offshore-deposit-form");
const offshoreDepositInput = document.getElementById("offshore-deposit-input");
const offshoreDepositMessage = document.getElementById("offshore-deposit-message");

const appElement = document.getElementById("app");
document.documentElement.classList.add("fleeca");

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

new DeleteAccountList(
  account.favoriteAccounts,
  deleteAccountList,
  createDeleteAccountElement
);

new PasteAccountList(
  account.favoriteAccounts,
  pasteAccountList,
  createPasteAccountElement
);

new LogList(
  account.logs,
  accountLogList,
  currencyFormatter,
  dateTimeFormatter,
  "add-account-log"
);

new LogList(
  account.logs.filter((log) => log.type === "operation"),
  accountOperationLogList,
  currencyFormatter,
  dateTimeFormatter,
  "add-account-operation-log"
);

/**
 * Get the current date in ISO format.
 *
 * @return {string} - The current ISO date.
 */
function getCurrentDate() {
  const date = new Date();
  return date.toISOString();
}

/**
 * Check account name input.
 *
 * @param input
 * @param message
 * @returns {boolean}
 */
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

/**
 * Check account number input.
 *
 * @param input
 * @param message
 * @returns {boolean}
 */
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

/**
 * Check amount input.
 *
 * @param input
 * @param message
 * @returns {boolean}
 */
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

/**
 * Check withdraw amount input.
 *
 * @param input
 * @param message
 * @returns {boolean}
 */
function checkWithdrawAmount(input, message) {
  const amount = Number(input.value);
  if (account.balance < amount) {
    message.textContent = "Vous n'avez pas les fonds nécessaires";
    return false;
  }
  return true;
}

/**
 * Check reference input.
 *
 * @param input
 * @param message
 * @returns {boolean}
 */
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

/**
 * Handle account add form.
 *
 * @param event - The event.
 */
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

/**
 * Handle deposit form.
 *
 * @param event - The event.
 */
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

/**
 * Handle withdraw form.
 *
 * @param event - The event.
 */
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

/**
 * Handle transfer form.
 *
 * @param event - The event.
 */
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

/**
 * Handle enterprise deposit form.
 *
 * @param event - The event.
 */
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

/**
 * Handle enterprise withdraw form.
 *
 * @param event - The event.
 */
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

/**
 * Handle offshore deposit form.
 *
 * @param event - The event.
 */
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

setTimeout(() => {
  appElement.classList.replace("app--loading", "app--loaded");
}, 1000);
