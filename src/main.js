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
import "./assets/styles/components/swift.css";
import "./assets/styles/components/log.css";
import "./assets/styles/components/button.css";

// CSS / States
import "./assets/styles/states.css";

// SWIFT elements
const swiftAddForm = document.getElementById("swift-add-form");
const swiftAddNameInput = document.getElementById("swift-add-name-input");
const swiftAddNameMessage = document.getElementById("swift-add-name-message");
const swiftAddCodeInput = document.getElementById("swift-add-code-input");
const swiftAddCodeMessage = document.getElementById("swift-add-code-message");

// Deposit elements
const depositForm = document.getElementById("deposit-form");
const depositInput = document.getElementById("deposit-input");
const depositMessage = document.getElementById("deposit-message");

// Withdraw elements
const withdrawForm = document.getElementById("withdraw-form");
const withdrawInput = document.getElementById("withdraw-input");
const withdrawMessage = document.getElementById("withdraw-message");

// Transfer elements
const transferSwiftInput = document.getElementById("transfer-swift-input");
const transferSwiftMessage = document.getElementById("transfer-swift-message");
const transferForm = document.getElementById("transfer-form");
const transferAmountInput = document.getElementById("transfer-amount-input");
const transferReferenceInput = document.getElementById("transfer-reference-input");
const transferAmountMessage = document.getElementById("transfer-amount-message");
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

const enterpriseTab = document.getElementById("tab-enterprise");
const offshoreTab = document.getElementById("tab-offshore");
const balanceText = document.getElementById("balance");

const globalLogTable = document.getElementById("global-log-table");
const operationLogTable = document.getElementById("operation-log-table");
const globalLogTemplate = document.getElementById("global-log-template");

const swiftDeleteTable = document.getElementById("swift-delete-table");
const swiftDeleteTemplate = document.getElementById("swift-delete-template");

const swiftPasteTable = document.getElementById("swift-paste-table");
const swiftPasteTemplate = document.getElementById("swift-paste-template");

const accountName = document.getElementById("account-name");
const accountNumber = document.getElementById("account-number");

const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});

/**
 * POVERS: remove this variable when finish to plug init function in your script.
 */
const data = {
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
            date: "22-04-2022",
            amount: -2455,
            reference: "Amende pour refus d'optempérer",
            type: "fine",
            icon: "police",
        },
        {
            entity: "Transfert",
            date: "21-03-2022",
            amount: 2580,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
        {
            entity: "Dépot",
            date: "20-03-2022",
            amount: 15000,
            reference: "Vente de la voiture",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Transfert",
            date: "19-03-2022",
            amount: 20000,
            reference: "Argent pour les qualifications des Failygames",
            type: "transfer",
            icon: "person",
        },
        {
            entity: "Retrait",
            date: "18-03-2022",
            amount: -4500,
            reference: "Achat ARC",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Los Santos Police Department",
            date: "17-04-2022",
            amount: -100000,
            reference: "Amende pour braquage de banque",
            type: "fine",
            icon: "police",
        },
        {
            entity: "Dépot",
            date: "17-03-2022",
            amount: 1200,
            reference: "Vente de la voiture",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Retrait",
            date: "16-03-2022",
            amount: -8500,
            reference: "Achat ARC",
            type: "operation",
            icon: "bank",
        },
        {
            entity: "Transfert",
            date: "19-03-2022",
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
    logDate.textContent = log.date;
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
 * SWIFT Manager
 */
function createSwiftDeleteRow(swift, pasteRow, prepend = false) {
    const deleteTemplate = swiftDeleteTemplate.content.cloneNode(true);
    const deleteRow = deleteTemplate.querySelector(".swift");
    const deleteName = deleteRow.querySelector(".swift__name");
    const deleteCode = deleteRow.querySelector(".swift__code");
    const deleteButton = deleteRow.querySelector(".swift__button");
    deleteName.textContent = swift.name;
    deleteCode.textContent = swift.code;
    deleteButton.addEventListener("click", () => {
        swiftDeleteTable.removeChild(deleteRow);
        swiftPasteTable.removeChild(pasteRow);
    }, { once: true });
    if (prepend) {
        swiftDeleteTable.prepend(deleteTemplate);
    } else {
        swiftDeleteTable.appendChild(deleteTemplate);
    }
}

function createSwiftPasteRow(swift, prepend = false) {
    const pasteTemplate = swiftPasteTemplate.content.cloneNode(true);
    const pasteRow = pasteTemplate.querySelector(".swift");
    const pasteName = pasteRow.querySelector(".swift__name");
    const pasteCode = pasteRow.querySelector(".swift__code");
    pasteName.textContent = swift.name;
    pasteCode.textContent = swift.code;
    pasteRow.addEventListener("click", () => {
        if (transferSwiftInput.value !== swift.code) {
            transferSwiftInput.value = swift.code;
        }
    });
    if (prepend) {
        swiftPasteTable.prepend(pasteTemplate);
    } else {
        swiftPasteTable.appendChild(pasteTemplate);
    }
    return pasteRow;
}

/**
 * Form manager
 */
function displayErrorMessage(type, input, message) {
    switch (type) {
        case "name":
            if (input.validity.valueMissing) {
                message.textContent = "Veuillez entrer un nom";
            } else if (input.validity.tooLong) {
                message.textContent = "Le nom ne doit exeder 40 caractères";
            }
            break;
        case "amount":
            if (input.validity.valueMissing) {
                message.textContent = "Veuillez entrer un montant";
            } else if (input.validity.patternMismatch) {
                message.textContent = "Le montant ne doit comporter que des chiffres";
            }
            break;
        case "swift":
            if (input.validity.valueMissing) {
                message.textContent = "Veuillez entrer un code SWIFT";
            } else if (input.validity.tooShort || input.validity.tooLong) {
                message.textContent = "Le code SWIFT doit comporter exactement 10 chiffres";
            } else if (input.validity.patternMismatch) {
                message.textContent = "Le code SWIFT ne doit comporter que des chiffres";
            }
            break;
        case "tooMuchSwift":
            message.textContent = "Limite maximum atteinte (5)";
            break;
        case "reference":
            if (input.validity.valueMissing) {
                message.textContent = "Veuillez entrer la référence du transfert";
            } else if (input.validity.tooLong) {
                message.textContent = "La référence du transfert ne doit exeder 40 caractères";
            }
            break;
        case "noAmount":
            message.textContent = "Le montant doit être supérieur à 0";
            break;
        case "noFund":
            message.textContent = "Vous n'avez pas les fonds nécessaires";
            break;
        default:
            throw new Error("The message type is not valid");
    }
}

function resetForm(form) {
    form.reset();
}

function resetMessage(message) {
    if (message.textContent.length > 0) {
        message.textContent = "";
    }
};

function getCurrentFormatedDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formatedMonth = month > 9 ? String(month) : `0${String(month)}`;
    const year = date.getFullYear();
    return `${day}-${formatedMonth}-${year}`;
}

swiftAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!swiftAddNameInput.validity.valid) {
        displayErrorMessage("name", swiftAddNameInput, swiftAddNameMessage);
    } else {
        resetMessage(swiftAddNameMessage);
    }

    if (!swiftAddCodeInput.validity.valid) {
        displayErrorMessage("swift", swiftAddCodeInput, swiftAddCodeMessage);
    } else {
        resetMessage(swiftAddCodeMessage);
    }

    if (swiftAddNameInput.validity.valid && swiftAddCodeInput.validity.valid) {
        if (swiftDeleteTable.children.length >= 5) {
            displayErrorMessage("tooMuchSwift", swiftAddNameInput, swiftAddNameMessage);
        } else {
            const swift = { name: swiftAddNameInput.value, code: swiftAddCodeInput.value };
            const swiftPasteRow = createSwiftPasteRow(swift, true);
            createSwiftDeleteRow(swift, swiftPasteRow, true);
            resetForm(swiftAddForm);
        }
    }
});

depositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!depositInput.validity.valid) {
        displayErrorMessage("amount", depositInput, depositMessage);
    } else {
        const amount = Number(depositInput.value);
        if (amount <= 0) {
            displayErrorMessage("noAmount", depositInput, depositMessage);
        } else {
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
            resetForm(depositForm);
            resetMessage(depositMessage);
        }
    }
});

withdrawForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!withdrawInput.validity.valid) {
        displayErrorMessage("amount", withdrawInput, withdrawMessage);
    } else {
        console.log("Withdraw form submitted");
        const amount = Number(withdrawInput.value);
        if (balance < amount) {
            displayErrorMessage("noFund", withdrawInput, withdrawMessage);
        } else if (amount <= 0) {
            displayErrorMessage("noAmount", withdrawInput, withdrawMessage);
        } else {
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
            resetForm(withdrawForm);
            resetMessage(withdrawMessage);
        }
    }
});

transferForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!transferAmountInput.validity.valid) {
        displayErrorMessage("amount", transferAmountInput, transferAmountMessage);
    } else if (transferAmountInput.validity.valid) {
        resetMessage(transferAmountMessage);
    }

    if (!transferSwiftInput.validity.valid) {
        displayErrorMessage("swift", transferSwiftInput, transferSwiftMessage);
    } else if (transferSwiftInput.validity.valid) {
        resetMessage(transferSwiftMessage);
    }

    if (!transferReferenceInput.validity.valid) {
        displayErrorMessage("reference", transferReferenceInput, transferReferenceMessage);
    } else if (transferReferenceInput.validity.valid) {
        resetMessage(transferReferenceMessage);
    }

    if (transferAmountInput.validity.valid && transferSwiftInput.validity.valid && transferReferenceInput.validity.valid) {
        console.log("Transfer form submitted");
        const amount = Number(transferAmountInput.value);
        if (balance < amount) {
            displayErrorMessage("noFund", transferAmountInput, transferAmountMessage);
        } else if (amount <= 0) {
            displayErrorMessage("noAmount", transferAmountInput, transferAmountMessage);
        } else {
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
            resetForm(transferForm);
        }
    }
});

enterpriseDepositForm.addEventListener("submit", (event) => {
    if (!enterpriseDepositInput.validity.valid) {
        displayErrorMessage("amount", enterpriseDepositInput, enterpriseDepositMessage);
    } else {
        console.log("Enterprise deposit form submitted");
        resetForm(enterpriseDepositForm);
        resetMessage(enterpriseDepositMessage);
    }
    event.preventDefault();
});

enterpriseWithdrawForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!enterpriseWithdrawInput.validity.valid) {
        displayErrorMessage("amount", enterpriseWithdrawInput, enterpriseWithdrawMessage);
    } else {
        console.log("Enterprise withdraw form submitted");
        resetForm(enterpriseWithdrawForm);
        resetMessage(enterpriseWithdrawMessage);
    }
});

offshoreDepositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!offshoreDepositInput.validity.valid) {
        displayErrorMessage("amount", offshoreDepositInput, offshoreDepositMessage);
    } else {
        console.log("Offshore deposit form submitted");
        resetForm(offshoreDepositForm);
        resetMessage(offshoreDepositMessage);
    }
});

/**
 * Init
 */
function initAccount(account) {
    activeAccount = {...account};
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
    activeAccount.accounts.forEach((swift) => {
        const swiftPasteRow = createSwiftPasteRow(swift);
        createSwiftDeleteRow(swift, swiftPasteRow);
    });
}

/**
 * POVERS: Move this part in your script.
 */
initAccount(data);