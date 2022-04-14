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
import "./assets/styles/components/row.css";
import "./assets/styles/components/paper.css";
import "./assets/styles/components/input.css";
import "./assets/styles/components/button.css";
import "./assets/styles/components/divider.css";
import "./assets/styles/components/table.css";
import "./assets/styles/components/icon-button.css";

import "./assets/styles/states.css";

const swiftAddForm = document.getElementById("swift-add-form");

swiftAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(swiftAddForm);
    const swiftCode = formData.get("swift-code");
    const search = swiftCode.search("^[0-9]{10}$");
    if (search > -1) {
        console.log("Swift code is valid");
    } else {
        console.log("Swift code is not valid");
    }
});