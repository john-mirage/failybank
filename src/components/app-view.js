class AppView extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();
    this.myAccountView = false;
    this.operationView = false;
    this.transferView = false;
    this.enterpriseView = false;
    this.offshoreView = false;
    this.activeView = false;
    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
      <style>
      .grid {
        display: grid;
        width: 100%;
        height: calc(100% - 72px);
      }
      .grid--my-account {
        grid-template-areas: "account-owner             log-list"
                             "account-number            log-list"
                             "favorite-account-add-form log-list"
                             "favorite-account-list     log-list";
      }
      .grid--operation {
        grid-template-areas: "deposit-form  log-list"
                             "withdraw-form log-list";
      }
      .grid--transfer {
        grid-template-areas: "transfer-form favorite-account-list";
      }
      .grid--enterprise {
        grid-template-areas: "account-owner log-list"
                             "account-info  log-list"
                             "deposit-form  log-list"
                             "withdraw-form log-list";
      }
      .grid--offshore {
        grid-template-areas: "account-owner log-list"
                             "account-info  log-list"
                             "deposit-form  log-list"
      }
      </style>
    `;
  }

  get name() {
    return this.getAttribute("name");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      const view = this.getView(newValue);
      if (this.activeView) {
        this.shadowRoot.replaceChild(view, this.activeView);
      } else {
        this.shadowRoot.appendChild(view);
      }
      this.activeView = view;
    }
  }

  getMyAccountView() {
    if (!this.myAccountView) {
      const template = document.getElementById("template-app-view-my-account");
      const fragment = template.content.cloneNode(true);
      this.myAccountView = fragment.querySelector(".grid");
    }
    return this.myAccountView;
  }

  getOperationView() {
    if (!this.operationView) {
      const template = document.getElementById("template-app-view-operation");
      const fragment = template.content.cloneNode(true);
      this.operationView = fragment.querySelector(".grid");
    }
    return this.operationView;
  }

  getTransferView() {
    if (!this.transferView) {
      const template = document.getElementById("template-app-view-transfer");
      const fragment = template.content.cloneNode(true);
      this.transferView = fragment.querySelector(".grid");
    }
    return this.transferView;
  }

  getEnterpriseView() {
    if (!this.enterpriseView) {
      const template = document.getElementById("template-app-view-enterprise");
      const fragment = template.content.cloneNode(true);
      this.enterpriseView = fragment.querySelector(".grid");
    }
    return this.enterpriseView;
  }

  getOffshoreView() {
    if (!this.offshoreView) {
      const template = document.getElementById("template-app-view-offshore");
      const fragment = template.content.cloneNode(true);
      this.offshoreView = fragment.querySelector(".grid");
    }
    return this.offshoreView;
  }

  getView(name) {
    switch (name) {
      case "my-account":
        return this.getMyAccountView();
      case "operation":
        return this.getOperationView();
      case "transfer":
        return this.getTransferView();
      case "enterprise":
        return this.getEnterpriseView();
      case "offshore":
        return this.getOffshoreView();
      default:
        throw new Error("The view name is not valid");
    }
  }
}

export default AppView;