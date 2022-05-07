import data from "./data";

// Account elements
const accountName = document.getElementById("account-name");
const accountNumber = document.getElementById("account-number");
const accountAddForm = document.getElementById("account-add-form");
const accountAddNameInput = document.getElementById("account-add-name-input");
const accountAddNameMessage = document.getElementById("account-add-name-message");
const accountAddNumberInput = document.getElementById("account-add-number-input");
const accountAddNumberMessage = document.getElementById("account-add-number-message");
const accountDeleteTable = document.getElementById("account-delete-table");
const accountDeleteTemplate = document.getElementById("account-delete-template");
const accountPasteTable = document.getElementById("account-paste-table");
const accountPasteTemplate = document.getElementById("account-paste-template");
const accountAddButton = document.getElementById("account-add-button");
const savedAccounts = document.getElementById("saved-accounts");

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
const enterpriseTab = document.getElementById("tab-enterprise");
const enterpriseDepositForm = document.getElementById("enterprise-deposit-form");
const enterpriseDepositInput = document.getElementById("enterprise-deposit-input");
const enterpriseDepositMessage = document.getElementById("enterprise-deposit-message");
const enterpriseWithdrawForm = document.getElementById("enterprise-withdraw-form");
const enterpriseWithdrawInput = document.getElementById("enterprise-withdraw-input");
const enterpriseWithdrawMessage = document.getElementById("enterprise-withdraw-message");

// Offshore elements
const offshoreTab = document.getElementById("tab-offshore");
const offshoreDepositForm = document.getElementById("offshore-deposit-form");
const offshoreDepositInput = document.getElementById("offshore-deposit-input");
const offshoreDepositMessage = document.getElementById("offshore-deposit-message");

const balanceText = document.getElementById("balance");
const globalLogTable = document.getElementById("global-log-table");
const operationLogTable = document.getElementById("operation-log-table");
const globalLogTemplate = document.getElementById("log-template");
const appElement = document.getElementById("app");

const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "always",
    maximumFractionDigits: 0
});

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
});

/**
 * Get the current formatted date in ISO format.
 *
 * @returns {string}
 */
function getCurrentFormatedDate() {
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
    if (activeAccount.balance < amount) {
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

accountAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const savedAccountNumberIsValid = accountDeleteTable.children.length < 5;
    if (savedAccountNumberIsValid) {
        const accountNameFieldIsValid = checkAccountNameField(accountAddNameInput, accountAddNameMessage);
        const accountNumberFieldIsValid = checkAccountNumberField(accountAddNumberInput, accountAddNumberMessage);
        if (accountNameFieldIsValid && accountNumberFieldIsValid) {
            const account = { name: accountAddNameInput.value, code: accountAddNumberInput.value };
            const accountPasteRow = createAccountPasteRow(account, true);
            createAccountDeleteRow(account, accountPasteRow, true);
            activeAccount.accounts.push(account);
            accountAddForm.reset();
            handleSavedAccounts();
        }
    }
});

depositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amountFieldIsValid = checkAmountField(depositInput, depositMessage);
    if (amountFieldIsValid) {
        const amount = Number(depositInput.value);
        const log = {
            entity: "Dépot",
            date: getCurrentFormatedDate(),
            amount: amount,
            reference: "Dépot sur votre compte",
            type: "operation",
            icon: "bank",
        }
        createLogRow(log, true);
        activeAccount.logs.push(log);
        activeAccount.balance += amount;
        displayBalance(activeAccount.balance);
        depositForm.reset();
    }
});

withdrawForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const withdrawFieldIsValid = checkAmountField(withdrawInput, withdrawMessage);
    const withdrawAmountIsValid = withdrawFieldIsValid ? checkWithdrawAmount(withdrawInput, withdrawMessage) : false;
    if (withdrawFieldIsValid && withdrawAmountIsValid) {
        const amount = Number(withdrawInput.value);
        const log = {
            entity: "Retrait",
            date: getCurrentFormatedDate(),
            amount: -amount,
            reference: "Retrait depuis votre compte",
            type: "operation",
            icon: "bank",
        }
        createLogRow(log, true);
        activeAccount.logs.push(log);
        activeAccount.balance -= amount;
        displayBalance(activeAccount.balance);
        withdrawForm.reset();
    }
});

transferForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const transferAmountFieldIsValid = checkAmountField(transferAmountInput, transferAmountMessage);
    const transferAmountIsValid = transferAmountFieldIsValid ? checkWithdrawAmount(transferAmountInput, transferAmountMessage) : false;
    const transferAccountFieldIsValid = checkAccountNumberField(transferAccountNumberInput, transferAccountNumberMessage);
    const transferReferenceFieldIsValid = checkReferenceField(transferReferenceInput, transferReferenceMessage);
    if (transferAmountFieldIsValid && transferAmountIsValid && transferAccountFieldIsValid && transferReferenceFieldIsValid) {
        const amount = Number(transferAmountInput.value);
        const log = {
            entity: "Transfert",
            date: getCurrentFormatedDate(),
            amount: -amount,
            reference: transferReferenceInput.value,
            type: "transfert",
            icon: "bank",
        }
        createLogRow(log, true);
        activeAccount.logs.push(log);
        activeAccount.balance -= amount;
        displayBalance(activeAccount.balance);
        transferForm.reset();
    }
});

enterpriseDepositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amountFieldIsValid = checkAmountField(enterpriseDepositInput, enterpriseDepositMessage);
    if (amountFieldIsValid) {
        enterpriseDepositForm.reset();
    }
});

enterpriseWithdrawForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const withdrawFieldIsValid = checkAmountField(enterpriseWithdrawInput, enterpriseWithdrawMessage);
    const withdrawAmountIsValid = withdrawFieldIsValid ? checkWithdrawAmount(enterpriseWithdrawInput, enterpriseWithdrawMessage) : false;
    if (withdrawFieldIsValid && withdrawAmountIsValid) {
        enterpriseWithdrawForm.reset();
    }
});

offshoreDepositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amountFieldIsValid = checkAmountField(offshoreDepositInput, offshoreDepositMessage);
    if (amountFieldIsValid) {
        offshoreDepositForm.reset();
    }
});

setTimeout(() => {
    appElement.classList.replace("app--loading", "app--loaded");
}, 1000);
