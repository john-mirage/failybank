import data from "./data";

/*------------------------------------*\
  HTML elements
\*------------------------------------*/

const app = document.getElementById("app");

const personalThemeButton = document.getElementById("personal-theme-button");
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

const enterpriseDepositForm = document.getElementById("enterprise-deposit-form");
const enterpriseWithdrawForm = document.getElementById("enterprise-withdraw-form");
const enterpriseDepositAmountInput = document.getElementById("enterprise-deposit-amount-input");
const enterpriseDepositAmountMessage = document.getElementById("enterprise-deposit-amount-message");
const enterpriseWithdrawAmountInput = document.getElementById("enterprise-withdraw-amount-input");
const enterpriseWithdrawAmountMessage = document.getElementById("enterprise-withdraw-amount-message");

const offshoreDepositForm = document.getElementById("offshore-deposit-form");
const offshoreDepositAmountInput = document.getElementById("offshore-deposit-amount-input");
const offshoreDepositAmountMessage = document.getElementById("offshore-deposit-amount-message");

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
  Personal account
\*------------------------------------*/

const personalAccount = new PersonalAccount(data.account.personal);

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
    const accountName = personalFavoriteAccountNameInput.value;
    const accountNumber = personalFavoriteAccountNumberInput.value;
  }
}

function handlePersonalDepositForm(event) {
  event.preventDefault();
  const amountFieldIsValid = checkAmountField(personalDepositAmountInput, personalDepositAmountMessage);
  if (amountFieldIsValid) {
    const depositAmount = Number(personalDepositAmountInput.value);
  }
}

function handlePersonalWithdrawForm(event) {
  event.preventDefault();
  const withdrawFieldIsValid = checkAmountField(personalWithdrawAmountInput, personalWithdrawAmountMessage);
  const withdrawAmountIsValid = withdrawFieldIsValid ? checkWithdrawAmount(personalWithdrawAmountInput, personalWithdrawAmountMessage, personalAccount.balance) : false;
  if (withdrawFieldIsValid && withdrawAmountIsValid) {
    const withdrawAmount = Number(personalWithdrawAmountInput.value);
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
  }
}

personalThemeButton.addEventListener("change", handlePersonalThemeButton);
personalFavoriteAccountForm.addEventListener("submit", handlePersonalFavoriteAccountForm);
personalDepositForm.addEventListener("submit", handlePersonalDepositForm);
personalWithdrawForm.addEventListener("submit", handlePersonalWithdrawForm);
personalTransferForm.addEventListener("submit", handlePersonalTransferForm);

/*------------------------------------*\
  Enterprise account
\*------------------------------------*/

if (data.hasEnterprise) {
  const enterpriseAccount = new EnterpriseAccount(data.account.enterprise);

  function handleEnterpriseDepositForm(event) {
    event.preventDefault();
    const amountFieldIsValid = checkAmountField(enterpriseDepositAmountInput, enterpriseDepositAmountMessage);
    if (amountFieldIsValid) {
      const depositAmount = Number(enterpriseDepositAmountInput.value);
    }
  }

  function handleEnterpriseWithdrawForm(event) {
    event.preventDefault();
    const withdrawFieldIsValid = checkAmountField(enterpriseWithdrawAmountInput, enterpriseWithdrawAmountMessage);
    const withdrawAmountIsValid = withdrawFieldIsValid ? checkWithdrawAmount(enterpriseWithdrawAmountInput, enterpriseWithdrawAmountMessage, enterpriseAccount.balance) : false;
    if (withdrawFieldIsValid && withdrawAmountIsValid) {
      const withdrawAmount = Number(enterpriseWithdrawAmountInput.value);
    }
  }

  enterpriseDepositForm.addEventListener("submit", handleEnterpriseDepositForm);
  enterpriseWithdrawForm.addEventListener("submit", handleEnterpriseWithdrawForm);
}

/*------------------------------------*\
  Offshore account
\*------------------------------------*/

if (data.hasOffshore) {
  const offshoreAccount = new OffshoreAccount(data.account.offshore);

  function handleOffshoreDepositForm(event) {
    event.preventDefault();
    const amountFieldIsValid = checkAmountField(offshoreDepositAmountInput, offshoreDepositAmountMessage);
    if (amountFieldIsValid) {
      const depositAmount = Number(offshoreDepositAmountInput.value);
    }
  }

  offshoreDepositForm.addEventListener("submit", handleOffshoreDepositForm);
}

/*------------------------------------*\
  Load app
\*------------------------------------*/

setTimeout(() => {
  app.classList.replace("app--loading", "app--loaded");
}, 1000);