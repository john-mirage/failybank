import data from "./data";
import {Account, PersonalAccount} from "./classes/account";
import {Tab, TabList} from "./classes/tab-list";
import {Form} from "./classes/form";
import {NotificationList} from "./classes/notification-list";
import {FilterDropdown} from "./classes/filter";
import {LogList} from "./classes/log-list";
import {AccountList, PasteAccountList, DeleteAccountList} from "./classes/account-list";
import {ViewSwitcher, View} from "./classes/view-list";

/*------------------------------------*\
  Formatters
\*------------------------------------*/

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "always",
  maximumFractionDigits: 0
});

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

/*------------------------------------*\
  App theme
\*------------------------------------*/

function setAppTheme(bank) {
  switch (bank) {
    case "fleeca":
      document.documentElement.classList.add("fleeca");
      break;
    case "maze":
      document.documentElement.classList.add("maze");
      break;
    default:
      throw new Error("The theme is not valid");
  }
}

setAppTheme(data.bank);

/*------------------------------------*\
  Personal account
\*------------------------------------*/

function getCurrentFormattedDate() {
  const date = new Date();
  return date.toISOString();
}

const personalAccount = new PersonalAccount(
  data.account.personal,
  document.getElementById("personal-account-owner"),
  document.getElementById("personal-account-number"),
  document.getElementById("personal-account-balance")
);

if (personalAccount.theme === "dark") {
  const personalThemeButton = document.getElementById("personal-theme-button");
  personalThemeButton.checked = true;
  document.documentElement.classList.add("dark");
}

const personalLogList = new LogList(
  data.account.personal.logs,
  document.getElementById("personal-log-list")
);

const personalOperationLogList = new LogList(
  data.account.personal.logs.filter((log) => log.type === "operation"),
  document.getElementById("personal-operation-log-list")
);

const personalFavoriteAccountForm = new Form(
  [
    document.getElementById("personal-favorite-account-name-input"),
    document.getElementById("personal-favorite-account-number-input")
  ],
  document.getElementById("personal-favorite-account-form"),
  document.getElementById("personal-favorite-account-form-button")
);

const personalDepositForm = new Form(
  [
    document.getElementById("personal-deposit-amount-input")
  ],
  document.getElementById("personal-deposit-form"),
  document.getElementById("personal-deposit-form-button")
);

const personalWithdrawForm = new Form(
  [
    document.getElementById("personal-withdraw-amount-input")
  ],
  document.getElementById("personal-withdraw-form"),
  document.getElementById("personal-withdraw-form-button")
);

const personalTransferForm = new Form(
  [
    document.getElementById("personal-transfer-amount-input"),
    document.getElementById("personal-transfer-account-number-input"),
    document.getElementById("personal-transfer-reference-input")
  ],
  document.getElementById("personal-transfer-form"),
  document.getElementById("personal-transfer-form-button")
);

const notificationList = new NotificationList(
  document.getElementById("notification-list")
);

const personalFilterDropdown = new FilterDropdown(
  document.getElementById("personal-filter-dropdown")
);

const personalFilterDropdownButtonElements = personalFilterDropdown.detailsElement.querySelectorAll(".filter__button");

personalFilterDropdownButtonElements.forEach((buttonElement) => {
  buttonElement.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter;
    personalFilterDropdown.setActiveFilter(event.target);
    personalLogList.filter = filter === "all" ? false : filter;
    personalLogList.reset();
  });
});

const favoriteAccountList = new AccountList(
  data.account.personal.favoriteAccounts
);

function deleteFavoriteAccount(account) {
  favoriteAccountList.deleteAccount(account);
  deleteFavoriteAccountList.reset();
  notificationList.displayNotification({
    title: "Compte favoris",
    description: "le compte a était supprimé avec succès",
    type: "success"
  });
}

const personalTransferAccountNumberInput = document.getElementById("personal-transfer-account-number-input");

function pasteFavoriteAccount(accountNumber) {
  if (personalTransferAccountNumberInput.value !== accountNumber) {
    personalTransferAccountNumberInput.value = accountNumber;
    personalTransferForm.checkFields();
    notificationList.displayNotification({
      title: "Compte favoris",
      description: `le compte ${accountNumber} a était ajouter au formulaire`,
      type: "success"
    });
  }
}

const deleteFavoriteAccountList = new DeleteAccountList(
  favoriteAccountList,
  document.getElementById("delete-favorite-account-list"),
  deleteFavoriteAccount
);

const pasteFavoriteAccountList = new PasteAccountList(
  favoriteAccountList,
  document.getElementById("paste-favorite-account-list"),
  pasteFavoriteAccount
);

const personalTab = new Tab(
  "mon compte",
  "personal-tab",
  true
);

const personalOperationTab = new Tab(
  "opération",
  "personal-operation-tab"
);

const personalTransferTab = new Tab(
  "transfert",
  "personal-transfer-tab"
);

const tabList = new TabList(
  [
    personalTab,
    personalOperationTab,
    personalTransferTab
  ],
  document.getElementById("tab-list")
);

const personalView = new View(
  document.getElementById("personal-view"),
  personalFilterDropdown,
  personalLogList,
  deleteFavoriteAccountList
);

const personalOperationView = new View(
  document.getElementById("personal-operation-view"),
  false,
  personalOperationLogList,
  false
);

const personalTransferView = new View(
  document.getElementById("personal-transfer-view"),
  false,
  false,
  pasteFavoriteAccountList
);

const viewSwitcher = new ViewSwitcher(
  personalView
);

const personalTabInput = document.getElementById("personal-tab");
const personalOperationTabInput = document.getElementById("personal-operation-tab");
const personalTransferTabInput = document.getElementById("personal-transfer-tab");

function showPersonalView() {
  tabList.setActiveTab(personalTab);
  viewSwitcher.switch(personalView);
}

function showPersonalOperationView() {
  tabList.setActiveTab(personalOperationTab);
  viewSwitcher.switch(personalOperationView);
}

function showPersonalTransferView() {
  tabList.setActiveTab(personalTransferTab);
  viewSwitcher.switch(personalTransferView);
}

function switchTheme(event) {
  personalAccount.theme = event.target.checked ? "dark" : "light";
  if (personalAccount.theme === "dark") {
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    }
  }
}

const personalThemeButton = document.getElementById("personal-theme-button");

function addFavoriteAccount(event) {
  event.preventDefault();
  const formData = new FormData(personalFavoriteAccountForm.formElement);
  const newAccount = {
    name: formData.get("name"),
    number: formData.get("number")
  }
  const accountListIsNotFull = favoriteAccountList.accounts.length < 5;
  const accountIsNotInTheList = favoriteAccountList.accounts.find((account) => account.number === newAccount) === -1;
  if (accountListIsNotFull && accountIsNotInTheList) {
    favoriteAccountList.addAccount(newAccount);
    deleteFavoriteAccountList.reset();
    personalFavoriteAccountForm.reset();
    notificationList.displayNotification({
      title: "Compte favoris",
      description: "le compte a était enregistré avec succès",
      type: "success"
    });
  } else if (!accountListIsNotFull) {
    notificationList.displayNotification({
      title: "Compte favoris",
      description: "Limite de compte favoris enregistrés atteinte",
      type: "error"
    });
  } else if (!accountIsNotInTheList) {
    notificationList.displayNotification({
      title: "Compte favoris",
      description: `Le compte ${newAccount.number} existe deja dans la liste`,
      type: "error"
    });
  }
}

function depositToPersonalAccount(event) {
  event.preventDefault();
  const formData = new FormData(personalDepositForm.formElement);
  const depositAmount = Number(formData.get("amount"));
  if (personalAccount.cash > depositAmount) {
    const log = {
      label: "Dépot",
      amount: depositAmount,
      date: getCurrentFormattedDate(),
      reference: "Dépot sur votre compte",
      type: "operation"
    }
    personalLogList.addLog(log);
    if (tabList.activeTab.elementId === "personal-tab") {
      personalLogList.reset();
    }
    personalOperationLogList.addLog(log);
    if (tabList.activeTab.elementId === "personal-operation-tab") {
      personalOperationLogList.reset();
    }
    personalAccount.cash -= depositAmount;
    personalAccount.balance += depositAmount;
    personalAccount.displayBalance();
    personalDepositForm.reset();
    notificationList.displayNotification({
      title: "Dépot",
      description: "le dépot a était éffectué avec succès",
      type: "success"
    });
  } else {
    notificationList.displayNotification({
      title: "Dépot",
      description: "Vous ne disposé pas des fonds nécessaires sur vous",
      type: "error"
    });
  }
}

function depositAllToPersonalAccount() {
  if (personalAccount.cash > 0) {
    const log = {
      label: "Dépot",
      amount: personalAccount.cash,
      date: getCurrentFormattedDate(),
      reference: "Dépot sur votre compte",
      type: "operation"
    }
    personalLogList.addLog(log);
    if (tabList.activeTab.elementId === "personal-tab") {
      personalLogList.reset();
    }
    personalOperationLogList.addLog(log);
    if (tabList.activeTab.elementId === "personal-operation-tab") {
      personalOperationLogList.reset();
    }
    personalAccount.cash = 0;
    notificationList.displayNotification({
      title: "Dépot",
      description: "le dépot a était éffectué avec succès",
      type: "success"
    });
  } else {
    notificationList.displayNotification({
      title: "Dépot",
      description: "Vous n'avez pas d'argent sur vous",
      type: "error"
    });
  }
}

function withdrawToPersonalAccount(event) {
  event.preventDefault();
  const formData = new FormData(personalWithdrawForm.formElement);
  const withdrawAmount = Number(formData.get("amount"));
  if (personalAccount.balance >= withdrawAmount) {
    const log = {
      label: "Retrait",
      amount: -withdrawAmount,
      date: getCurrentFormattedDate(),
      reference: "Retrait depuis votre compte",
      type: "operation"
    }
    personalLogList.addLog(log);
    if (tabList.activeTab.elementId === "personal-tab") {
      personalLogList.reset();
    }
    personalOperationLogList.addLog(log);
    if (tabList.activeTab.elementId === "personal-operation-tab") {
      personalOperationLogList.reset();
    }
    personalAccount.cash += withdrawAmount;
    personalAccount.balance -= withdrawAmount;
    personalAccount.displayBalance();
    personalWithdrawForm.reset();
    notificationList.displayNotification({
      title: "Retrait",
      description: "le retrait a était éffectué avec succès",
      type: "success"
    });
  } else {
    notificationList.displayNotification({
      title: "Retrait",
      description: "Vous ne disposé pas des fonds nécessaires sur votre compte",
      type: "error"
    });
  }
}

function transferToAccount(event) {
  event.preventDefault();
  const formData = new FormData(personalTransferForm.formElement);
  const transferAmount = Number(formData.get("amount"));
  if (personalAccount.balance >= transferAmount) {
    //const transferAccountNumber = formData.get("number");
    const log = {
      label: "Transfert",
      amount: -transferAmount,
      date: getCurrentFormattedDate(),
      reference: formData.get("reference"),
      type: "operation"
    }
    personalLogList.addLog(log);
    if (tabList.activeTab.elementId === "personal-tab") {
      personalLogList.reset();
    }
    personalAccount.balance -= transferAmount;
    personalAccount.displayBalance();
    personalTransferForm.reset();
    notificationList.displayNotification({
      title: "Transfert",
      description: "le transfert a était éffectué avec succès",
      type: "success"
    });
  } else {
    notificationList.displayNotification({
      title: "Transfert",
      description: "Vous ne disposé pas des fonds nécessaires sur votre compte",
      type: "error"
    });
  }
}

const personalAllDepositButton = document.getElementById("personal-all-deposit-button");

personalFavoriteAccountForm.formElement.addEventListener("submit", addFavoriteAccount);
personalDepositForm.formElement.addEventListener("submit", depositToPersonalAccount);
personalAllDepositButton.addEventListener("click", depositAllToPersonalAccount);
personalWithdrawForm.formElement.addEventListener("submit", withdrawToPersonalAccount);
personalTransferForm.formElement.addEventListener("submit", transferToAccount);

personalThemeButton.addEventListener("click", switchTheme);
personalTabInput.addEventListener("change", showPersonalView);
personalOperationTabInput.addEventListener("change", showPersonalOperationView);
personalTransferTabInput.addEventListener("change", showPersonalTransferView);

/*------------------------------------*\
  Enterprise & Offshore accounts
\*------------------------------------*/

if (data.hasEnterprise) {

  const enterpriseAccount = new Account(
    data.account.enterprise,
    document.getElementById("enterprise-account-owner"),
    document.getElementById("enterprise-account-balance")
  );

  const enterpriseLogList = new LogList(
    data.account.enterprise.logs,
    document.getElementById("enterprise-log-list")
  );

  const enterpriseFilterDropdown = new FilterDropdown(
    document.getElementById("enterprise-filter-dropdown")
  );

  const enterpriseDepositForm = new Form(
    [
      document.getElementById("enterprise-deposit-amount-input")
    ],
    document.getElementById("enterprise-deposit-form"),
    document.getElementById("enterprise-deposit-form-button")
  );

  const enterpriseWithdrawForm = new Form(
    [
      document.getElementById("enterprise-withdraw-amount-input")
    ],
    document.getElementById("enterprise-withdraw-form"),
    document.getElementById("enterprise-withdraw-form-button")
  );

  const enterpriseFilterDropdownButtonElements = enterpriseFilterDropdown.detailsElement.querySelectorAll(".filter__button");

  enterpriseFilterDropdownButtonElements.forEach((buttonElement) => {
    buttonElement.addEventListener("click", (event) => {
      const filter = event.target.dataset.filter;
      enterpriseFilterDropdown.setActiveFilter(event.target);
      enterpriseLogList.filter = filter === "all" ? false : filter;
      enterpriseLogList.reset();
    });
  });

  const enterpriseTab = new Tab(
    "entreprise",
    "enterprise-tab",
    false
  );

  tabList.addTab(enterpriseTab);

  const enterpriseTabInput = document.getElementById("enterprise-tab");

  const enterpriseView = new View(
    document.getElementById("enterprise-view"),
    enterpriseFilterDropdown,
    enterpriseLogList,
    false
  );

  function showEnterpriseView() {
    tabList.setActiveTab(enterpriseTab);
    viewSwitcher.switch(enterpriseView);
  }

  function depositToEnterpriseAccount(event) {
    event.preventDefault();
    const formData = new FormData(enterpriseDepositForm.formElement);
    const depositAmount = Number(formData.get("amount"));
    if (personalAccount.cash > depositAmount) {
      const log = {
        label: "Dépot",
        amount: depositAmount,
        date: getCurrentFormattedDate(),
        reference: "Dépot sur votre compte",
        type: "operation"
      }
      enterpriseLogList.addLog(log);
      if (tabList.activeTab.elementId === "enterprise-tab") {
        enterpriseLogList.reset();
      }
      personalAccount.cash -= depositAmount;
      enterpriseAccount.balance += depositAmount;
      enterpriseAccount.displayBalance();
      enterpriseDepositForm.reset();
      notificationList.displayNotification({
        title: "Dépot",
        description: "le dépot a était éffectué avec succès",
        type: "success"
      });
    } else {
      notificationList.displayNotification({
        title: "Dépot",
        description: "Vous ne disposé pas des fonds nécessaires sur vous",
        type: "error"
      });
    }
  }

  function depositAllToEnterpriseAccount() {
    if (personalAccount.cash > 0) {
      const log = {
        label: "Dépot",
        amount: personalAccount.cash,
        date: getCurrentFormattedDate(),
        reference: "Dépot le compte de l'entreprise",
        type: "operation"
      }
      enterpriseLogList.addLog(log);
      if (tabList.activeTab.elementId === "enterprise-tab") {
        enterpriseLogList.reset();
      }
      personalAccount.cash = 0;
      enterpriseAccount.displayBalance();
      notificationList.displayNotification({
        title: "Dépot",
        description: "le dépot a était éffectué avec succès",
        type: "success"
      });
    } else {
      notificationList.displayNotification({
        title: "Dépot",
        description: "Vous n'avez pas d'argent sur vous",
        type: "error"
      });
    }
  }

  function withdrawToEnterpriseAccount(event) {
    event.preventDefault();
    const formData = new FormData(enterpriseWithdrawForm.formElement);
    const withdrawAmount = Number(formData.get("amount"));
    if (enterpriseAccount.balance > withdrawAmount) {
      const log = {
        label: "Retrait",
        amount: -withdrawAmount,
        date: getCurrentFormattedDate(),
        reference: "Retrait depuis le compte de l'entreprise",
        type: "operation"
      }
      enterpriseLogList.addLog(log);
      if (tabList.activeTab.elementId === "enterprise-tab") {
        enterpriseLogList.reset();
      }
      personalAccount.cash += withdrawAmount;
      enterpriseAccount.balance -= withdrawAmount;
      enterpriseAccount.displayBalance();
      enterpriseWithdrawForm.reset();
      notificationList.displayNotification({
        title: "Retrait",
        description: "le retrait a était éffectué avec succès",
        type: "success"
      });
    } else {
      notificationList.displayNotification({
        title: "Retrait",
        description: "Vous ne disposé pas des fonds nécessaires sur votre compte",
        type: "error"
      });
    }
  }

  const enterpriseAllDepositButton = document.getElementById("enterprise-all-deposit-button");

  enterpriseTabInput.addEventListener("click", showEnterpriseView);
  enterpriseDepositForm.formElement.addEventListener("submit", depositToEnterpriseAccount);
  enterpriseWithdrawForm.formElement.addEventListener("submit", withdrawToEnterpriseAccount);
  enterpriseAllDepositButton.addEventListener("click", depositAllToEnterpriseAccount);

  if (data.hasOffshore) {

    const offshoreAccount = new Account(
      data.account.offshore,
      document.getElementById("offshore-account-owner"),
      document.getElementById("offshore-account-balance")
    );

    const offshoreLogList = new LogList(
      data.account.offshore.logs,
      document.getElementById("offshore-log-list")
    );

    const offshoreFilterDropdown = new FilterDropdown(
      document.getElementById("offshore-filter-dropdown")
    );

    const offshoreDepositForm = new Form(
      [
        document.getElementById("offshore-deposit-amount-input")
      ],
      document.getElementById("offshore-deposit-form"),
      document.getElementById("offshore-deposit-form-button")
    );

    const offshoreFilterDropdownButtonElements = offshoreFilterDropdown.detailsElement.querySelectorAll(".filter__button");

    offshoreFilterDropdownButtonElements.forEach((buttonElement) => {
      buttonElement.addEventListener("click", (event) => {
        const filter = event.target.dataset.filter;
        offshoreFilterDropdown.setActiveFilter(event.target);
        offshoreLogList.filter = filter === "all" ? false : filter;
        offshoreLogList.reset();
      });
    });

    const offshoreTab = new Tab(
      "offshore",
      "offshore-tab",
      false
    );

    const offshoreTabButton = document.getElementById("offshore-tab-button");

    const offshoreView = new View(
      document.getElementById("offshore-view"),
      offshoreFilterDropdown,
      offshoreLogList,
      false
    );

    function showOffshoreView() {
      tabList.addTab(offshoreTab);
      const offshoreTabInput = document.getElementById("offshore-tab");
      offshoreTabInput.checked = true;
      tabList.setActiveTab(offshoreTab);
      viewSwitcher.switch(offshoreView);
    }

    function depositToOffshoreAccount(event) {
      event.preventDefault();
      const formData = new FormData(offshoreDepositForm.formElement);
      const depositAmount = Number(formData.get("amount"));
      if (personalAccount.cash > depositAmount) {
        const log = {
          label: "Dépot",
          amount: depositAmount,
          date: getCurrentFormattedDate(),
          reference: "Dépot sur le compte offshore",
          type: "operation"
        }
        offshoreLogList.addLog(log);
        if (tabList.activeTab.elementId === "offshore-tab") {
          offshoreLogList.reset();
        }
        personalAccount.cash -= depositAmount;
        offshoreAccount.balance += depositAmount;
        offshoreAccount.displayBalance();
        offshoreDepositForm.reset();
        notificationList.displayNotification({
          title: "Dépot",
          description: "le dépot a était éffectué avec succès",
          type: "success"
        });
      } else {
        notificationList.displayNotification({
          title: "Dépot",
          description: "Vous ne disposé pas des fonds nécessaires sur vous",
          type: "error"
        });
      }
    }

    function depositAllToOffshoreAccount() {
      if (personalAccount.cash > 0) {
        const log = {
          label: "Dépot",
          amount: personalAccount.cash,
          date: getCurrentFormattedDate(),
          reference: "Dépot sur le compte offshore",
          type: "operation"
        }
        offshoreLogList.addLog(log);
        if (tabList.activeTab.name === "offshore") {
          offshoreLogList.reset();
        }
        personalAccount.cash = 0;
        offshoreAccount.displayBalance();
        notificationList.displayNotification({
          title: "Dépot",
          description: "le dépot a était éffectué avec succès",
          type: "success"
        });
      } else {
        notificationList.displayNotification({
          title: "Dépot",
          description: "Vous n'avez pas d'argent sur vous",
          type: "error"
        });
      }
    }

    const offshoreAllDepositButton = document.getElementById("offshore-all-deposit-button");

    offshoreTabButton.addEventListener("click", showOffshoreView);
    offshoreDepositForm.formElement.addEventListener("submit", depositToOffshoreAccount);
    offshoreAllDepositButton.addEventListener("click", depositAllToOffshoreAccount);

  } else {
    const offshoreView = document.getElementById("offshore-view");
    const offshoreTabButton = document.getElementById("offshore-tab-button");
    offshoreView.remove();
    offshoreTabButton.remove();
  }
} else {
  const enterpriseView = document.getElementById("enterprise-view");
  const offshoreView = document.getElementById("offshore-view");
  const offshoreTabButton = document.getElementById("offshore-tab-button");
  enterpriseView.remove();
  offshoreView.remove();
  offshoreTabButton.remove();
}

/*------------------------------------*\
  Load app
\*------------------------------------*/

const app = document.getElementById("app");

setTimeout(() => {
  app.classList.replace("app--loading", "app--loaded");
}, 1000);
