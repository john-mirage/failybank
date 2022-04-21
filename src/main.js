// CSS / Global
import "./assets/styles/global.css";

// CSS / Components
import "./assets/styles/components/screen.css";
import "./assets/styles/components/app.css";
import "./assets/styles/components/bar.css";
import "./assets/styles/components/balance.css";
import "./assets/styles/components/tab-list.css";
import "./assets/styles/components/toggle-button.css";
import "./assets/styles/components/view.css";
import "./assets/styles/components/grid.css";
import "./assets/styles/components/column.css";
import "./assets/styles/components/paper.css";
import "./assets/styles/components/icon.css";
import "./assets/styles/components/form.css";
import "./assets/styles/components/section.css";
import "./assets/styles/components/account.css";
import "./assets/styles/components/log.css";
import "./assets/styles/components/button.css";

// CSS / States
import "./assets/styles/states.css";

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
 * POVERS: remove this variable when finish to plug init function in your script.
 */
const data = {
    bank: "fleeca",
    darkMode: true,
    name: "Hubert Bonisseur de La Bath",
    balance: 2152800,
    number: "0123456789",
    accounts: [
        {
            name: "Lena Silvo",
            code: "0123456789",
        },
        {
            name: "Owen Chapman",
            code: "1234567890",
        },
        {
            name: "Garry Green",
            code: "2345678901",
        },
        {
            name: "Arthur Popov",
            code: "3456789012",
        },
        {
            name: "Quentin Cooper",
            code: "4567890123",
        },
    ],
    logs: [
        {
            entity: "Los Santos Police Department",
            date: "2022-04-20T15:00:00",
            amount: -2455,
            reference: "Amende pour refus d'optempérer",
            type: "fine",
            icon: "police",
        },
        {
            entity: "Transfert",
            date: "2022-04-19T15:00",
            amount: 2580,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
        {
            entity: "Dépot",
            date: "2022-04-18T15:00:00",
            amount: 15000,
            reference: "Vente de la voiture",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Transfert",
            date: "2022-04-17T15:00:00",
            amount: 20000,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
        {
            entity: "Retrait",
            date: "2022-04-16T15:00:00",
            amount: -4500,
            reference: "Achat ARC",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Los Santos Police Department",
            date: "2022-04-15T15:00:00",
            amount: -100000,
            reference: "Amende pour braquage de banque",
            type: "fine",
            icon: "police",
        },
        {
            entity: "Dépot",
            date: "2022-04-14T15:00:00",
            amount: 1200,
            reference: "Vente de la voiture",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Retrait",
            date: "2022-04-13T15:00:00",
            amount: -8500,
            reference: "Achat ARC",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Transfert",
            date: "2022-04-12T15:00:00",
            amount: 15000,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
        {
            entity: "Los Santos Police Department",
            date: "2022-04-20T15:00:00",
            amount: -2455,
            reference: "Amende pour refus d'optempérer",
            type: "fine",
            icon: "police",
        },
        {
            entity: "Transfert",
            date: "2022-04-19T15:00",
            amount: 2580,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
        {
            entity: "Dépot",
            date: "2022-04-18T15:00:00",
            amount: 15000,
            reference: "Vente de la voiture",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Transfert",
            date: "2022-04-17T15:00:00",
            amount: 20000,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
        {
            entity: "Retrait",
            date: "2022-04-16T15:00:00",
            amount: -4500,
            reference: "Achat ARC",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Los Santos Police Department",
            date: "2022-04-15T15:00:00",
            amount: -100000,
            reference: "Amende pour braquage de banque",
            type: "fine",
            icon: "police",
        },
        {
            entity: "Dépot",
            date: "2022-04-14T15:00:00",
            amount: 1200,
            reference: "Vente de la voiture",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Retrait",
            date: "2022-04-13T15:00:00",
            amount: -8500,
            reference: "Achat ARC",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Transfert",
            date: "2022-04-12T15:00:00",
            amount: 15000,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
        {
            entity: "Retrait",
            date: "2022-04-13T15:00:00",
            amount: -8500,
            reference: "Achat ARC",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Transfert",
            date: "2022-04-12T15:00:00",
            amount: 15000,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
    ],
    hasEnterprise: true,
    hasOffShore: true,
};

/**
 * Current state of the account.
 */
let activeAccount = {};

/**
 * Balance
 */
function displayBalance(newBalance) {
    if (newBalance < 1) {
        if (!balanceText.classList.contains("balance__value--negative")) {
            balanceText.classList.add("balance__value--negative");
        }
    } else {
        if (balanceText.classList.contains("balance__value--negative")) {
            balanceText.classList.remove("balance__value--negative");
        }
    }
    const formatedBalance = numberFormatter.format(newBalance);
    balanceText.textContent = formatedBalance;
}

/**
 * Log manager
 */

function getCurrentFormatedDate() {
    const date = new Date();
    return date.toISOString();
}

function createLogRow(log, prepend = false) {
    const logTemplate = globalLogTemplate.content.cloneNode(true);
    const logRow = logTemplate.querySelector(".log");
    const logIcon = logRow.querySelector(".log__icon");
    const logType = logRow.querySelector(".log__type");
    const logDate = logRow.querySelector(".log__date");
    const logAmount = logRow.querySelector(".log__amount");
    const logReference = logRow.querySelector(".log__reference");
    logIcon.classList.add(`icon--${log.icon}`);
    logAmount.classList.add(`log__amount--${log.amount > 0 ? "up" : "down"}`);
    logType.textContent = log.entity;
    const date = new Date(log.date);
    logDate.textContent = dateTimeFormatter.format(date);
    logAmount.textContent = numberFormatter.format(log.amount);
    logReference.textContent = log.reference;
    if (prepend) {
        globalLogTable.prepend(logTemplate);
        if (log.type === "operation") {
            const operationRow = logRow.cloneNode(true);
            operationLogTable.prepend(operationRow);
        }
    } else {
        globalLogTable.appendChild(logTemplate);
        if (log.type === "operation") {
            const operationRow = logRow.cloneNode(true);
            operationLogTable.appendChild(operationRow);
        }
    }
}

/**
 * Account Manager
 */
function createAccountDeleteRow(account, pasteRow, prepend = false) {
    const deleteTemplate = accountDeleteTemplate.content.cloneNode(true);
    const deleteRow = deleteTemplate.querySelector(".account");
    const deleteName = deleteRow.querySelector(".account__name");
    const deleteCode = deleteRow.querySelector(".account__code");
    const deleteButton = deleteRow.querySelector(".account__button");
    deleteName.textContent = account.name;
    deleteCode.textContent = account.code;
    deleteButton.addEventListener("click", () => {
        accountDeleteTable.removeChild(deleteRow);
        accountPasteTable.removeChild(pasteRow);
    }, { once: true });
    if (prepend) {
        accountDeleteTable.prepend(deleteTemplate);
    } else {
        accountDeleteTable.appendChild(deleteTemplate);
    }
}

function createAccountPasteRow(account, prepend = false) {
    const pasteTemplate = accountPasteTemplate.content.cloneNode(true);
    const pasteRow = pasteTemplate.querySelector(".account");
    const pasteName = pasteRow.querySelector(".account__name");
    const pasteCode = pasteRow.querySelector(".account__code");
    pasteName.textContent = account.name;
    pasteCode.textContent = account.code;
    pasteRow.addEventListener("click", () => {
        if (transferAccountNumberInput.value !== account.code) {
            transferAccountNumberInput.value = account.code;
        }
    });
    if (prepend) {
        accountPasteTable.prepend(pasteTemplate);
    } else {
        accountPasteTable.appendChild(pasteTemplate);
    }
    return pasteRow;
}

/**
 * Form manager
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

function checkSavedAccountNumber(table, message) {
    if (table.children.length >= 5) {
        message.textContent = "Limite de compte atteinte";
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
        } else if (Number(input.value) < 50) {
            message.textContent = "Le montant doit être supérieur à 50";
        } else {
            message.textContent = "Il y a une erreur";
        }
        return false;
    }
    if (message.textContent.length > 0) message.textContent = "";
    return true;
}

function checkWithdrawAmount(input, message) {
    const amount = Number(input.value);
    if (balance < amount) {
        message.textContent = "Vous n'avez pas les fonds nécessaire";
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

accountAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const accountNameFieldIsValid = checkAccountNameField(accountAddNameInput, accountAddNameMessage);
    const savedAccountNumberIsValid = accountNameFieldIsValid ? checkSavedAccountNumber(accountDeleteTable, accountAddNameMessage) : false;
    const accountNumberFieldIsValid = checkAccountNumberField(accountAddNumberInput, accountAddNumberMessage);
    if (accountNameFieldIsValid && accountNumberFieldIsValid && savedAccountNumberIsValid) {
        const account = { name: accountAddNameInput.value, code: accountAddNumberInput.value };
        const accountPasteRow = createAccountPasteRow(account, true);
        createAccountDeleteRow(account, accountPasteRow, true);
        accountAddForm.reset();
    }
});

depositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amountFieldIsValid = checkAmountField(depositInput, depositMessage);
    if (amountFieldIsValid) {
        const amount = Number(depositInput.value);
        createLogRow({
            entity: "Dépot",
            date: getCurrentFormatedDate(),
            amount: amount,
            reference: "Dépot sur votre compte",
            type: "operation",
            icon: "bank",
        }, true);
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
        createLogRow({
            entity: "Retrait",
            date: getCurrentFormatedDate(),
            amount: -amount,
            reference: "Retrait depuis votre compte",
            type: "operation",
            icon: "bank",
        }, true);
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
        createLogRow({
            entity: "Transfert",
            date: getCurrentFormatedDate(),
            amount: -amount,
            reference: transferReferenceInput.value,
            type: "transfert",
            icon: "bank",
        }, true);
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

/**
 * Init
 */
const darkModeToggle = document.getElementById("dark-mode-toggle");

function initAccount(account) {
    setTimeout(() => {
        appElement.classList.replace("app--loading", "app--loaded");
    }, 1000);
    activeAccount = {...account};
    document.documentElement.classList.add(activeAccount.bank);
    if (activeAccount.darkMode) {
        darkModeToggle.checked = true;
        document.documentElement.classList.add("dark");
    }
    if (activeAccount.hasEnterprise) {
        enterpriseTab.classList.remove("tab-list__item--hidden");
        if (activeAccount.hasOffShore) {
            offshoreTab.classList.remove("icon--hidden");
        }
    }
    displayBalance(activeAccount.balance);
    accountName.textContent = activeAccount.name;
    accountNumber.textContent = activeAccount.number;
    activeAccount.logs.forEach((log) => createLogRow(log));
    activeAccount.accounts.forEach((savedAccount) => {
        const accountPasteRow = createAccountPasteRow(savedAccount);
        createAccountDeleteRow(savedAccount, accountPasteRow);
    });
}

/**
 * POVERS: Move this part in your script.
 */
initAccount(data);

/**
 * Dark mode
 */
darkModeToggle.addEventListener("change", (event) => {
    if (event.target.checked) {
        if (!document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.add("dark");
        }
    } else {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
        }
    }
});