import "./assets/styles/global.css";

import "./assets/styles/components/screen.css";
import "./assets/styles/components/app.css";
import "./assets/styles/components/bar.css";
import "./assets/styles/components/balance.css";
import "./assets/styles/components/tab-list.css";
import "./assets/styles/components/toggle-button.css";
import "./assets/styles/components/view.css";
import "./assets/styles/components/grid.css";
import "./assets/styles/components/text.css";
import "./assets/styles/components/column.css";
import "./assets/styles/components/paper.css";
import "./assets/styles/components/table.css";
import "./assets/styles/components/icon.css";
import "./assets/styles/components/form.css";
import "./assets/styles/components/section.css";
import "./assets/styles/components/swift.css";

import "./assets/styles/states.css";

/**
 * Transfer past System for the swift codes.
 */
const transferSwiftRows = document.getElementsByClassName("swift--transfer");
const transferSwiftTexts = document.getElementsByClassName("swift__code--transfer");
const transferSwiftButtons = document.getElementsByClassName("icon--transfer");
const transferSwiftInput = document.getElementById("transfer-swift-input");

for (let rowIndex = 0; rowIndex < transferSwiftRows.length; rowIndex++) {
    transferSwiftButtons[rowIndex].addEventListener("click", () => {
        if (transferSwiftInput.value !== transferSwiftTexts[rowIndex].textContent) {
            transferSwiftInput.value = transferSwiftTexts[rowIndex].textContent;
        }
    });
}

/**
 * Input validations
 */
const swiftAddForm = document.getElementById("swift-add-form");
const depositForm = document.getElementById("deposit-form");
const withdrawForm = document.getElementById("withdraw-form");
const transferForm = document.getElementById("transfer-form");

function validateAmount(amount) {
    const search = amount.search(/^[0-9]+$/);
    return search > -1;
}

function validateSwift(swift) {
    const search = swift.search(/^[0-9]{10}$/);
    return search > -1;
}

swiftAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(swiftAddForm);
    const swift = formData.get("swift-code");
    const swiftIsValid = validateSwift(swift);
    if (swiftIsValid) {
        console.log("Swift code is valid");
        swiftAddForm.reset();
    } else {
        console.log("Swift code is not valid");
    }
});

depositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(depositForm);
    const depositValue = formData.get("deposit-amount");
    const amountIsValid = validateAmount(depositValue);
    if (amountIsValid) {
        console.log("Deposit amount is valid");
        depositForm.reset();
    } else {
        console.log("Deposit amount is not valid");
    }
});

withdrawForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(withdrawForm);
    const withdrawValue = formData.get("withdraw-amount");
    const amountIsValid = validateAmount(withdrawValue);
    if (amountIsValid) {
        console.log("Withdraw amount is valid");
        withdrawForm.reset();
    } else {
        console.log("Withdraw amount is not valid");
    }
});

transferForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(transferForm);
    const transferAmount = formData.get("transfer-amount");
    const transferSwift = formData.get("transfer-swift");
    const transferReference = formData.get("transfer-reference");
    const amountIsValid = validateAmount(transferAmount);
    const swiftIsValid = validateAmount(transferSwift);
    const referenceIsValid = true;
    if (amountIsValid && swiftIsValid && referenceIsValid) {
        console.log("transfer values are valid");
        transferForm.reset();
    } else {
        console.log("transfer values are not valid");
    }
});