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
const swiftDeleteList = document.getElementById("swift-delete-list");
const swiftPasteList = document.getElementById("swift-paste-list");
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

// Log lists
const globalLogList = document.getElementById("global-log-list");
const operationLogList = document.getElementById("operation-log-list");

const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});

/**
 * Balance
 */
const balanceText = document.getElementById("balance");
let balance = 2152800;

function displayBalance(newBalance) {
    const formatedBalance = numberFormatter.format(newBalance);
    balanceText.textContent = formatedBalance;
}

displayBalance(balance);

/**
 * Log manager
 */
const logs = [
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
];

let activeLogList = [...logs];

function createLogRow(log) {
    const logRoot = document.createElement("details");
    const logHeader = document.createElement("summary");
    const logBody = document.createElement("section");
    const logIcon = document.createElement("div");
    const logInfo = document.createElement("div");
    const logEntity = document.createElement("h3");
    const logDate = document.createElement("p");
    const logAmount = document.createElement("p");
    const logReferenceLabel = document.createElement("h5");
    const logReferenceText = document.createElement("p");
    logRoot.classList.add("log");
    logHeader.classList.add("log__header");
    logBody.classList.add("log__body");
    logIcon.classList.add("icon", `icon--${log.icon}`, "log__icon");
    logInfo.classList.add("log__info");
    logEntity.classList.add("log__entity");
    logDate.classList.add("log__date");
    logAmount.classList.add("log__amount", `log__amount--${log.amount > 0 ? "up" : "down"}`);
    logReferenceLabel.classList.add("log__reference-label");
    logReferenceText.classList.add("log__reference");
    logEntity.textContent = log.entity;
    logDate.textContent = log.date;
    logAmount.textContent = numberFormatter.format(log.amount);
    logReferenceLabel.textContent = "Référence: ";
    logReferenceText.textContent = log.reference;
    logRoot.appendChild(logHeader);
    logRoot.appendChild(logBody);
    logHeader.appendChild(logIcon);
    logHeader.appendChild(logInfo);
    logHeader.appendChild(logAmount);
    logInfo.appendChild(logEntity);
    logInfo.appendChild(logDate);
    logBody.appendChild(logReferenceLabel);
    logBody.appendChild(logReferenceText);
    return logRoot;
}

export function generateGlobalLogList(logs) {
    if (globalLogList.hasChildNodes) {
        globalLogList.innerHTML = "";
    }
    logs.forEach((log) => {
        const logRow = createLogRow(log);
        globalLogList.appendChild(logRow);
    });
}

export function generateOperationList(logs) {
    const filteredLogList = logs.filter((log) => log.type === "operation");
    if (operationLogList.hasChildNodes) {
        operationLogList.innerHTML = "";
    }
    filteredLogList.forEach((filteredLog) => {
        const operationLogRow = createLogRow(filteredLog);
        operationLogList.appendChild(operationLogRow);
    });
}

generateGlobalLogList(activeLogList);
generateOperationList(activeLogList);

/**
 * SWIFT Manager
 */
const swifts = [
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
];
  
let activeSwiftList = [...swifts];

function createSwiftDeleteRow(newSwift) {
    const swiftRoot = document.createElement("section");
    const swiftNameSection = document.createElement("div");
    const swiftCodeSection = document.createElement("div");
    const swiftButtonSection = document.createElement("div");
    const swiftName = document.createElement("h4");
    const swiftCode = document.createElement("p");
    const swiftDetails = document.createElement("details");
    const swiftIconButton = document.createElement("summary");
    const swiftTextButton = document.createElement("button");
    swiftRoot.classList.add("swift");
    swiftNameSection.classList.add("swift__section");
    swiftCodeSection.classList.add("swift__section");
    swiftButtonSection.classList.add("swift__section", "swift__section--align-right");
    swiftName.classList.add("swift__name");
    swiftCode.classList.add("swift__code", "swift__code--center");
    swiftDetails.classList.add("swift__details");
    swiftIconButton.classList.add("icon", "icon--small", "icon--button", "icon--delete");
    swiftTextButton.classList.add("button", "button--primary", "button--small", "swift__button");
    swiftRoot.appendChild(swiftNameSection);
    swiftRoot.appendChild(swiftCodeSection);
    swiftRoot.appendChild(swiftButtonSection);
    swiftNameSection.appendChild(swiftName);
    swiftCodeSection.appendChild(swiftCode);
    swiftButtonSection.appendChild(swiftDetails);
    swiftDetails.appendChild(swiftIconButton);
    swiftDetails.appendChild(swiftTextButton);
    swiftName.textContent = newSwift.name;
    swiftCode.textContent = newSwift.code;
    swiftTextButton.textContent = "Confirmer";
    swiftTextButton.addEventListener("click", () => {
        activeSwiftList = activeSwiftList.filter((oldSwift) => oldSwift.name !== newSwift.name);
        generateSwiftDeleteList(activeSwiftList);
        generateSwiftPasteList(activeSwiftList);
    });
    return swiftRoot;
}

function createSwiftPasteRow(newSwift) {
    const swiftRoot = document.createElement("section");
    const swiftInfoSection = document.createElement("div");
    const swiftName = document.createElement("h4");
    const swiftCode = document.createElement("p");
    const swiftButtonSection = document.createElement("div");
    const swiftIconButton = document.createElement("button");
    swiftRoot.classList.add("swift", "swift--transfer");
    swiftInfoSection.classList.add("swift__section");
    swiftButtonSection.classList.add("swift__section", "swift__section--align-right");
    swiftName.classList.add("swift__name", "swift__name--margin");
    swiftCode.classList.add("swift__code");
    swiftIconButton.classList.add("icon", "icon--no-bg", "icon--paste");
    swiftRoot.appendChild(swiftInfoSection);
    swiftRoot.appendChild(swiftButtonSection);
    swiftInfoSection.appendChild(swiftName);
    swiftInfoSection.appendChild(swiftCode);
    swiftButtonSection.appendChild(swiftIconButton);
    swiftName.textContent = newSwift.name;
    swiftCode.textContent = newSwift.code;
    swiftRoot.addEventListener("click", () => {
        if (transferSwiftInput.value !== newSwift.code) {
            transferSwiftInput.value = newSwift.code;
        }
    });
    return swiftRoot;
}

export function generateSwiftDeleteList(swifts) {
    if (swiftDeleteList.hasChildNodes) {
        swiftDeleteList.innerHTML = "";
    }
    swifts.forEach((swift) => {
        const swiftRow = createSwiftDeleteRow(swift);
        swiftDeleteList.appendChild(swiftRow);
    });
}

export function generateSwiftPasteList(swifts) {
    if (swiftPasteList.hasChildNodes) {
        swiftPasteList.innerHTML = "";
    }
    swifts.forEach((swift) => {
        const swiftRow = createSwiftPasteRow(swift);
        swiftPasteList.appendChild(swiftRow);
    });
}

generateSwiftDeleteList(activeSwiftList);
generateSwiftPasteList(activeSwiftList);

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
        console.log("Swift Add form submitted");
        if (activeSwiftList.length >= 5) {
            displayErrorMessage("tooMuchSwift", swiftAddNameInput, swiftAddNameMessage);
        } else {
            activeSwiftList = [{
                name: swiftAddNameInput.value,
                code: swiftAddCodeInput.value
            }, ...activeSwiftList];
            generateSwiftDeleteList(activeSwiftList);
            generateSwiftPasteList(activeSwiftList);
            resetForm(swiftAddForm);
        }
    }
});

depositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!depositInput.validity.valid) {
        displayErrorMessage("amount", depositInput, depositMessage);
    } else {
        console.log("Deposit form submitted");
        const amount = Number(depositInput.value);
        if (amount <= 0) {
            displayErrorMessage("noAmount", depositInput, depositMessage);
        } else {
            activeLogList = [{
                entity: "Dépot",
                date: getCurrentFormatedDate(),
                amount: amount,
                reference: "Dépot sur votre compte",
                type: "operation",
                icon: "bank",
            }, ...activeLogList];
            balance += amount;
            displayBalance(balance);
            generateGlobalLogList(activeLogList);
            generateOperationList(activeLogList);
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
            activeLogList = [{
                entity: "Retrait",
                date: getCurrentFormatedDate(),
                amount: -amount,
                reference: "Retrait depuis votre compte",
                type: "operation",
                icon: "bank",
            }, ...activeLogList];
            balance -= amount;
            displayBalance(balance);
            generateGlobalLogList(activeLogList);
            generateOperationList(activeLogList);
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
            activeLogList = [{
                entity: "Transfert",
                date: getCurrentFormatedDate(),
                amount: -Number(transferAmountInput.value),
                reference: amount,
                type: "transfert",
                icon: "bank",
            }, ...activeLogList];
            balance -= amount;
            displayBalance(balance);
            generateGlobalLogList(activeLogList);
            generateOperationList(activeLogList);
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