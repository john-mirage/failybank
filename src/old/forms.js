/*------------------------------------*\
  Forms
\*------------------------------------*/

import account from "../data";

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