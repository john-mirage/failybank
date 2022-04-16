import "./assets/styles/global.css";
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
import "./assets/styles/states.css";

const swiftDeleteList = document.getElementById("swift-delete-list");
const swiftPasteList = document.getElementById("swift-paste-list");
const swiftAddForm = document.getElementById("swift-add-form");
const swiftAddNameInput = document.getElementById("swift-add-name-input");
const swiftAddNameMessage = document.getElementById("swift-add-name-message");
const swiftAddCodeInput = document.getElementById("swift-add-code-input");
const swiftAddCodeMessage = document.getElementById("swift-add-code-message");
const depositForm = document.getElementById("deposit-form");
const depositInput = document.getElementById("deposit-input");
const depositMessage = document.getElementById("deposit-message");
const withdrawForm = document.getElementById("withdraw-form");
const withdrawInput = document.getElementById("withdraw-input");
const withdrawMessage = document.getElementById("withdraw-message");
const transferSwiftInput = document.getElementById("transfer-swift-input");
const transferSwiftMessage = document.getElementById("transfer-swift-message");
const transferForm = document.getElementById("transfer-form");
const transferAmountInput = document.getElementById("transfer-amount-input");
const transferReferenceInput = document.getElementById("transfer-reference-input");
const transferAmountMessage = document.getElementById("transfer-amount-message");
const transferReferenceMessage = document.getElementById("transfer-reference-message");
const enterpriseDepositForm = document.getElementById("enterprise-deposit-form");
const enterpriseDepositInput = document.getElementById("enterprise-deposit-input");
const enterpriseDepositMessage = document.getElementById("enterprise-deposit-message");
const enterpriseWithdrawForm = document.getElementById("enterprise-withdraw-form");
const enterpriseWithdrawInput = document.getElementById("enterprise-withdraw-input");
const enterpriseWithdrawMessage = document.getElementById("enterprise-withdraw-message");
const offshoreDepositForm = document.getElementById("offshore-deposit-form");
const offshoreDepositInput = document.getElementById("offshore-deposit-input");
const offshoreDepositMessage = document.getElementById("offshore-deposit-message");

/**
 * Form validations
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
        case "reference":
            if (input.validity.valueMissing) {
                message.textContent = "Veuillez entrer la référence du transfert";
            } else if (input.validity.tooLong) {
                message.textContent = "La référence du transfert ne doit exeder 40 caractères";
            }
            break;
        default:
            throw new Error("The type is not valid");
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

swiftAddForm.addEventListener("submit", (event) => {
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
        activeSwiftList = [{ name: swiftAddNameInput.value, code: swiftAddCodeInput.value }, ...activeSwiftList];
        generateSwiftDeleteList(activeSwiftList);
        generateSwiftPasteList(activeSwiftList);
        resetForm(swiftAddForm);
    }
    event.preventDefault();
});

depositForm.addEventListener("submit", (event) => {
    if (!depositInput.validity.valid) {
        displayErrorMessage("amount", depositInput, depositMessage);
    } else {
        console.log("Deposit form submitted");
        resetForm(depositForm);
        resetMessage(depositMessage);
    }
    event.preventDefault();
});

withdrawForm.addEventListener("submit", (event) => {
    if (!withdrawInput.validity.valid) {
        displayErrorMessage("amount", withdrawInput, withdrawMessage);
    } else {
        console.log("Withdraw form submitted");
        resetForm(withdrawForm);
        resetMessage(withdrawMessage);
    }
    event.preventDefault();
});

transferForm.addEventListener("submit", (event) => {
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
        resetForm(transferForm);
    }
    event.preventDefault();
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
    if (!enterpriseWithdrawInput.validity.valid) {
        displayErrorMessage("amount", enterpriseWithdrawInput, enterpriseWithdrawMessage);
    } else {
        console.log("Enterprise withdraw form submitted");
        resetForm(enterpriseWithdrawForm);
        resetMessage(enterpriseWithdrawMessage);
    }
    event.preventDefault();
});

offshoreDepositForm.addEventListener("submit", (event) => {
    if (!offshoreDepositInput.validity.valid) {
        displayErrorMessage("amount", offshoreDepositInput, offshoreDepositMessage);
    } else {
        console.log("Offshore deposit form submitted");
        resetForm(offshoreDepositForm);
        resetMessage(offshoreDepositMessage);
    }
    event.preventDefault();
});

/**
 * Data
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
    swiftCode.classList.add("swift__code");
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
    const swiftNameSection = document.createElement("div");
    const swiftCodeSection = document.createElement("div");
    const swiftName = document.createElement("h4");
    const swiftCode = document.createElement("p");
    const swiftButtonSection = document.createElement("div");
    const swiftIconButton = document.createElement("button");
    swiftRoot.classList.add("swift", "swift--transfer");
    swiftNameSection.classList.add("swift__section");
    swiftCodeSection.classList.add("swift__section");
    swiftButtonSection.classList.add("swift__section", "swift__section--align-right");
    swiftName.classList.add("swift__name");
    swiftCode.classList.add("swift__code");
    swiftIconButton.classList.add("icon", "icon--no-bg", "icon--paste");
    swiftRoot.appendChild(swiftNameSection);
    swiftRoot.appendChild(swiftCodeSection);
    swiftRoot.appendChild(swiftButtonSection);
    swiftNameSection.appendChild(swiftName);
    swiftCodeSection.appendChild(swiftCode);
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

function generateSwiftDeleteList(swifts) {
    if (swiftDeleteList.hasChildNodes) {
        swiftDeleteList.innerHTML = "";
    }
    swifts.forEach((swift) => {
        const swiftRow = createSwiftDeleteRow(swift);
        swiftDeleteList.appendChild(swiftRow);
    });
}

function generateSwiftPasteList(swifts) {
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

const logs = [
    {
        entity: "Los Santos Police Department",
        date: "22-04-2022",
        amount: "- 2455$",
        reference: "Amende pour refus d'optempérer",
        type: "fine",
        icon: "police",
    },
    {
        entity: "Owen Chapman",
        date: "21-03-2022",
        amount: "+ 2580$",
        reference: "Argent pour les qualifications des Failygames",
        type: "transfer",
        icon: "person",
    }
];