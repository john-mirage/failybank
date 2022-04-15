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

/**
 * Transfer past System for the swift codes.
 */
const transferSwiftRows = document.getElementsByClassName("swift--transfer");
const transferSwiftTexts = document.getElementsByClassName("swift__code--transfer");
const transferSwiftButtons = document.getElementsByClassName("swift__icon-button--transfer");
const transferSwiftInput = document.getElementById("transfer-swift-input");

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
const swiftAddForm = document.getElementById("swift-add-form");
const depositForm = document.getElementById("deposit-form");
const withdrawForm = document.getElementById("withdraw-form");
const transferForm = document.getElementById("transfer-form");

swiftAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

depositForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

withdrawForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

transferForm.addEventListener("submit", (event) => {
    event.preventDefault();
});