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
 * Transfer past System for the swift codes.
 */
for (let rowIndex = 0; rowIndex < transferSwiftRows.length; rowIndex++) {
    transferSwiftButtons[rowIndex].addEventListener("click", () => {
        if (transferSwiftInput.value !== transferSwiftTexts[rowIndex].textContent) {
            transferSwiftInput.value = transferSwiftTexts[rowIndex].textContent;
        }
    });
}

/**
 * Form validations
 */
swiftAddForm.addEventListener("submit", (event) => {
    if (!swiftAddInput.validity.valid) {
        if (swiftAddInput.validity.valueMissing) {
            swiftAddMessage.textContent = "Veuillez entrer un code SWIFT";
        } else if (swiftAddInput.validity.tooShort || swiftAddInput.validity.tooLong) {
            swiftAddMessage.textContent = "Le code SWIFT doit comporter exactement 10 chiffres";
        } else if (swiftAddInput.validity.patternMismatch) {
            swiftAddMessage.textContent = "Le code SWIFT ne doit comporter que des chiffres";
        }
    } else {
        swiftAddForm.reset();
        if (swiftAddMessage.textContent.length > 0) {
            swiftAddMessage.textContent = "";
        }
    }
    event.preventDefault();
});

depositForm.addEventListener("submit", (event) => {
    if (!depositInput.validity.valid) {
        if (depositInput.validity.valueMissing) {
            depositMessage.textContent = "Veuillez entrer un montant";
        } else if (depositInput.validity.patternMismatch) {
            depositMessage.textContent = "Le montant ne doit comporter que des chiffres";
        }
    } else {
        depositForm.reset();
        if (depositMessage.textContent.length > 0) {
            depositMessage.textContent = "";
        }
    }
    event.preventDefault();
});

withdrawForm.addEventListener("submit", (event) => {
    if (!withdrawInput.validity.valid) {
        if (withdrawInput.validity.valueMissing) {
            withdrawMessage.textContent = "Veuillez entrer un montant";
        } else if (withdrawInput.validity.patternMismatch) {
            withdrawMessage.textContent = "Le montant ne doit comporter que des chiffres";
        }
    } else {
        withdrawForm.reset();
        if (withdrawMessage.textContent.length > 0) {
            withdrawMessage.textContent = "";
        }
    }
    event.preventDefault();
});

transferForm.addEventListener("submit", (event) => {
    if (!transferAmountInput.validity.valid) {
        if (transferAmountInput.validity.valueMissing) {
            transferAmountMessage.textContent = "Veuillez entrer un montant";
        } else if (transferAmountInput.validity.patternMismatch) {
            transferAmountMessage.textContent = "Le montant ne doit comporter que des chiffres";
        }
    } else if (transferAmountInput.validity.valid) {
        if (transferAmountMessage.textContent.length > 0) {
            transferAmountMessage.textContent = "";
        }
    }

    if (!transferSwiftInput.validity.valid) {
        if (transferSwiftInput.validity.valueMissing) {
            transferSwiftMessage.textContent = "Veuillez entrer un code SWIFT";
        } else if (transferSwiftInput.validity.tooShort || transferSwiftInput.validity.tooLong) {
            transferSwiftMessage.textContent = "Le code SWIFT doit comporter exactement 10 chiffres";
        } else if (transferSwiftInput.validity.patternMismatch) {
            transferSwiftMessage.textContent = "Le code SWIFT ne doit comporter que des chiffres";
        }
    } else if (transferSwiftInput.validity.valid) {
        if (transferSwiftMessage.textContent.length > 0) {
            transferSwiftMessage.textContent = "";
        }
    }

    if (!transferReferenceInput.validity.valid) {
        if (transferReferenceInput.validity.valueMissing) {
            transferReferenceMessage.textContent = "Veuillez entrer la référence du transfert";
        } else if (transferReferenceInput.validity.tooLong) {
            transferReferenceMessage.textContent = "La référence du transfert ne doit exeder 40 caractères";
        }
    } else if (transferReferenceInput.validity.valid) {
        if (transferReferenceMessage.textContent.length > 0) {
            transferReferenceMessage.textContent = "";
        }
    }

    if (transferAmountInput.validity.valid && transferSwiftInput.validity.valid && transferReferenceInput.validity.valid) {
        transferForm.reset();
    }
    event.preventDefault();
});

enterpriseDepositForm.addEventListener("submit", (event) => {
    if (!enterpriseDepositInput.validity.valid) {
        if (enterpriseDepositInput.validity.valueMissing) {
            enterpriseDepositMessage.textContent = "Veuillez entrer un montant";
        } else if (enterpriseDepositInput.validity.patternMismatch) {
            enterpriseDepositMessage.textContent = "Le montant ne doit comporter que des chiffres";
        }
    } else {
        enterpriseDepositForm.reset();
        if (enterpriseDepositMessage.textContent.length > 0) {
            enterpriseDepositMessage.textContent = "";
        }
    }
    event.preventDefault();
});

enterpriseWithdrawForm.addEventListener("submit", (event) => {
    if (!enterpriseWithdrawInput.validity.valid) {
        if (enterpriseWithdrawInput.validity.valueMissing) {
            enterpriseWithdrawMessage.textContent = "Veuillez entrer un montant";
        } else if (enterpriseWithdrawInput.validity.patternMismatch) {
            enterpriseWithdrawMessage.textContent = "Le montant ne doit comporter que des chiffres";
        }
    } else {
        enterpriseWithdrawForm.reset();
        if (enterpriseWithdrawMessage.textContent.length > 0) {
            enterpriseWithdrawMessage.textContent = "";
        }
    }
    event.preventDefault();
});

offshoreDepositForm.addEventListener("submit", (event) => {
    if (!offshoreDepositInput.validity.valid) {
        if (offshoreDepositInput.validity.valueMissing) {
            offshoreDepositMessage.textContent = "Veuillez entrer un montant";
        } else if (offshoreDepositInput.validity.patternMismatch) {
            offshoreDepositMessage.textContent = "Le montant ne doit comporter que des chiffres";
        }
    } else {
        offshoreDepositForm.reset();
        if (offshoreDepositMessage.textContent.length > 0) {
            offshoreDepositMessage.textContent = "";
        }
    }
    event.preventDefault();
});