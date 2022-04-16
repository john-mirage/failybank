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
import "./assets/styles/states.css";

const swiftDeleteList = document.getElementById("swift-delete-list");
const swiftPasteList = document.getElementById("swift-paste-list");
const swiftAddForm = document.getElementById("swift-add-form");
const swiftAddInput = document.getElementById("swift-add-input");
const swiftAddMessage = document.getElementById("swift-add-message");
const depositForm = document.getElementById("deposit-form");
const depositInput = document.getElementById("deposit-input");
const depositMessage = document.getElementById("deposit-message");
const withdrawForm = document.getElementById("withdraw-form");
const withdrawInput = document.getElementById("withdraw-input");
const withdrawMessage = document.getElementById("withdraw-message");
const transferSwiftRows = document.getElementsByClassName("swift--transfer");
const transferSwiftTexts = document.getElementsByClassName("swift__code--transfer");
const transferSwiftButtons = document.getElementsByClassName("swift__icon-button--transfer");
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
        case "transfer":
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
    if (!swiftAddInput.validity.valid) {
        displayErrorMessage("swift", swiftAddInput, swiftAddMessage);
    } else {
        resetForm(swiftAddForm);
        resetMessage(swiftAddMessage);
    }
    event.preventDefault();
});

depositForm.addEventListener("submit", (event) => {
    if (!depositInput.validity.valid) {
        displayErrorMessage("amount", depositInput, depositMessage);
    } else {
        resetForm(depositForm);
        resetMessage(depositMessage);
    }
    event.preventDefault();
});

withdrawForm.addEventListener("submit", (event) => {
    if (!withdrawInput.validity.valid) {
        displayErrorMessage("amount", withdrawInput, withdrawMessage);
    } else {
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
        displayErrorMessage("transfer", transferReferenceInput, transferReferenceMessage);
    } else if (transferReferenceInput.validity.valid) {
        resetMessage(transferReferenceMessage);
    }

    if (transferAmountInput.validity.valid && transferSwiftInput.validity.valid && transferReferenceInput.validity.valid) {
        resetForm(transferForm);
    }
    event.preventDefault();
});

enterpriseDepositForm.addEventListener("submit", (event) => {
    if (!enterpriseDepositInput.validity.valid) {
        displayErrorMessage("amount", enterpriseDepositInput, enterpriseDepositMessage);
    } else {
        resetForm(enterpriseDepositForm);
        resetMessage(enterpriseDepositMessage);
    }
    event.preventDefault();
});

enterpriseWithdrawForm.addEventListener("submit", (event) => {
    if (!enterpriseWithdrawInput.validity.valid) {
        displayErrorMessage("amount", enterpriseWithdrawInput, enterpriseWithdrawMessage);
    } else {
        resetForm(enterpriseWithdrawForm);
        resetMessage(enterpriseWithdrawMessage);
    }
    event.preventDefault();
});

offshoreDepositForm.addEventListener("submit", (event) => {
    if (!offshoreDepositInput.validity.valid) {
        displayErrorMessage("amount", offshoreDepositInput, offshoreDepositMessage);
    } else {
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
        name: "Quentin Coooper",
        code: "4567890123",
    },
];

let activeSwiftList = [...swifts];

function createSwiftDeleteRow(newSwift) {
    const swiftRoot = document.createElement("section");
    const swiftInfo = document.createElement("div");
    const swiftName = document.createElement("h4");
    const swiftCode = document.createElement("p");
    const swiftSwitch = document.createElement("details");
    const swiftDeleteButton = document.createElement("summary");
    const swiftIcon = document.createElement("div");
    const swiftConfirmButton = document.createElement("button");
    swiftRoot.classList.add("swift");
    swiftInfo.classList.add("swift__info");
    swiftName.classList.add("swift__name");
    swiftCode.classList.add("swift__code");
    swiftSwitch.classList.add("swift__switch");
    swiftDeleteButton.classList.add("swift__icon-button");
    swiftIcon.classList.add("swift__icon", "swift__icon--delete");
    swiftConfirmButton.classList.add("swift__button");
    swiftName.textContent = newSwift.name;
    swiftCode.textContent = newSwift.code;
    swiftConfirmButton.textContent = "Confirmer";
    swiftRoot.appendChild(swiftInfo);
    swiftRoot.appendChild(swiftSwitch);
    swiftInfo.appendChild(swiftName);
    swiftInfo.appendChild(swiftCode);
    swiftSwitch.appendChild(swiftDeleteButton);
    swiftSwitch.appendChild(swiftConfirmButton);
    swiftDeleteButton.appendChild(swiftIcon);
    swiftConfirmButton.addEventListener("click", () => {
        activeSwiftList = activeSwiftList.filter((oldSwift) => oldSwift.name !== newSwift.name);
        generateSwiftDeleteList(activeSwiftList);
        generateSwiftPasteList(activeSwiftList);
    });
    return swiftRoot;
}

function createSwiftPasteRow(newSwift) {
    const swiftRoot = document.createElement("section");
    const swiftInfo = document.createElement("div");
    const swiftName = document.createElement("h4");
    const swiftCode = document.createElement("p");
    const swiftIconButton = document.createElement("button");
    const swiftIcon = document.createElement("span");
    swiftRoot.classList.add("swift", "swift--transfer");
    swiftInfo.classList.add("swift__info");
    swiftName.classList.add("swift__name");
    swiftCode.classList.add("swift__code");
    swiftIconButton.classList.add("swift__icon-button");
    swiftIcon.classList.add("swift__icon", "swift__icon--paste");
    swiftName.textContent = newSwift.name;
    swiftCode.textContent = newSwift.code;
    swiftRoot.appendChild(swiftInfo);
    swiftRoot.appendChild(swiftIconButton);
    swiftInfo.appendChild(swiftName);
    swiftInfo.appendChild(swiftCode);
    swiftIconButton.appendChild(swiftIcon);
    swiftIconButton.addEventListener("click", () => {
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
