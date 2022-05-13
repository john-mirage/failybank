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

personalLogList.displayInitialLogs();

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

const personalTransferAccountNumberInput = document.getElementById("personal-transfer-account-number-input")

function pasteFavoriteAccount(accountNumber) {
  personalTransferAccountNumberInput.value = accountNumber;
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

deleteFavoriteAccountList.createAccounts();

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
  const account = {
    name: formData.get("name"),
    number: formData.get("number")
  }
  if (favoriteAccountList.accounts.length < 5) {
    favoriteAccountList.addAccount(account);
    deleteFavoriteAccountList.reset();
    personalFavoriteAccountForm.reset();
    notificationList.displayNotification({
      title: "Compte favoris",
      description: "le compte a était enregistré avec succès",
      type: "success"
    });
  } else {
    notificationList.displayNotification({
      title: "Compte favoris",
      description: "Limite de compte favoris enregistrés atteinte",
      type: "error"
    });
  }
}

personalFavoriteAccountForm.formElement.addEventListener("submit", addFavoriteAccount);

personalThemeButton.addEventListener("click", switchTheme);
personalTabInput.addEventListener("change", showPersonalView);
personalOperationTabInput.addEventListener("change", showPersonalOperationView);
personalTransferTabInput.addEventListener("change", showPersonalTransferView);

/*

function handlePersonalDepositForm(event) {
  event.preventDefault();
  const depositAmount = Number(personalDepositAmountInput.value);
  if (personalAccount.cash > depositAmount) {
    const log = {
      label: "Dépot",
      amount: depositAmount,
      date: getCurrentFormattedDate(),
      reference: "Dépot sur votre compte",
      type: "operation"
    }
    personalAccount.logList.addLog(log);
    if (tabList.activeTab.name === "personal") {
      personalAccount.logList.resetList();
    }
    personalAccount.operationLogList.addLog(log);
    if (tabList.activeTab.name === "personal-operation") {
      personalAccount.operationLogList.resetList();
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

function handlePersonalAllDepositButton() {
  if (personalAccount.cash > 0) {
    const log = {
      label: "Dépot",
      amount: personalAccount.cash,
      date: getCurrentFormattedDate(),
      reference: "Dépot sur votre compte",
      type: "operation"
    }
    personalAccount.logList.addLog(log);
    if (tabList.activeTab.name === "personal") {
      personalAccount.logList.resetList();
    }
    personalAccount.operationLogList.addLog(log);
    if (tabList.activeTab.name === "personal-operation") {
      personalAccount.operationLogList.resetList();
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

function handlePersonalFavoriteAccountNumberPaste() {
  personalTransferForm.checkFields();
}

function handlePersonalWithdrawForm(event) {
  event.preventDefault();
  const withdrawAmount = Number(personalWithdrawAmountInput.value);
  if (personalAccount.balance >= withdrawAmount) {
    const log = {
      label: "Retrait",
      amount: -withdrawAmount,
      date: getCurrentFormattedDate(),
      reference: "Retrait depuis votre compte",
      type: "operation"
    }
    personalAccount.logList.addLog(log);
    if (tabList.activeTab.name === "personal") {
      personalAccount.logList.resetList();
    }
    personalAccount.operationLogList.addLog(log);
    if (tabList.activeTab.name === "personal-operation") {
      personalAccount.operationLogList.resetList();
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

function handlePersonalTransferForm(event) {
  event.preventDefault();
  const transferAmount = Number(personalTransferAmountInput.value);
  if (personalAccount.balance >= transferAmount) {
    const transferAccountNumber = personalTransferAccountNumberInput.value;
    const transferReference = personalTransferReferenceInput.value;
    const log = {
      label: "Transfert",
      amount: -transferAmount,
      date: getCurrentFormattedDate(),
      reference: transferReference,
      type: "operation"
    }
    personalAccount.logList.addLog(log);
    if (tabList.activeTab.name === "personal") {
      personalAccount.logList.resetList();
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
*/

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

  enterpriseTabInput.addEventListener("click", showEnterpriseView);

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

    offshoreTabButton.addEventListener("click", showOffshoreView);

  }
}

/*
if (data.hasEnterprise) {

  function handleEnterpriseDepositForm(event) {
    event.preventDefault();
    const depositAmount = Number(enterpriseDepositAmountInput.value);
    if (personalAccount.cash > depositAmount) {
      const log = {
        label: "Dépot",
        amount: depositAmount,
        date: getCurrentFormattedDate(),
        reference: "Dépot sur votre compte",
        type: "operation"
      }
      enterpriseAccount.logList.addLog(log);
      if (tabList.activeTab.name === "enterprise") {
        enterpriseAccount.logList.resetList();
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

  function handleEnterpriseAllDepositButton() {
    if (personalAccount.cash > 0) {
      const log = {
        label: "Dépot",
        amount: personalAccount.cash,
        date: getCurrentFormattedDate(),
        reference: "Dépot le compte de l'entreprise",
        type: "operation"
      }
      enterpriseAccount.logList.addLog(log);
      if (tabList.activeTab.name === "enterprise") {
        enterpriseAccount.logList.resetList();
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

  function handleEnterpriseWithdrawForm(event) {
    event.preventDefault();
    const withdrawAmount = Number(enterpriseWithdrawAmountInput.value);
    if (enterpriseAccount.balance > withdrawAmount) {
      const log = {
        label: "Retrait",
        amount: -withdrawAmount,
        date: getCurrentFormattedDate(),
        reference: "Retrait depuis le compte de l'entreprise",
        type: "operation"
      }
      enterpriseAccount.logList.addLog(log);
      if (tabList.activeTab.name === "enterprise") {
        enterpriseAccount.logList.resetList();
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

  enterpriseDepositFormElt.addEventListener("submit", handleEnterpriseDepositForm);
  enterpriseAllDepositButton.addEventListener("click", handleEnterpriseAllDepositButton)
  enterpriseWithdrawFormElt.addEventListener("submit", handleEnterpriseWithdrawForm);

  if (data.hasOffshore) {

    function handleOffshoreDepositForm(event) {
      event.preventDefault();
      const depositAmount = Number(offshoreDepositAmountInput.value);
      if (personalAccount.cash > depositAmount) {
        const log = {
          label: "Dépot",
          amount: depositAmount,
          date: getCurrentFormattedDate(),
          reference: "Dépot sur le compte offshore",
          type: "operation"
        }
        offshoreAccount.logList.addLog(log);
        if (tabList.activeTab.name === "offshore") {
          offshoreAccount.logList.resetList();
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

    function handleOffshoreAllDepositButton() {
      if (personalAccount.cash > 0) {
        const log = {
          label: "Dépot",
          amount: personalAccount.cash,
          date: getCurrentFormattedDate(),
          reference: "Dépot sur le compte offshore",
          type: "operation"
        }
        offshoreAccount.logList.addLog(log);
        if (tabList.activeTab.name === "offshore") {
          offshoreAccount.logList.resetList();
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

    offshoreDepositFormElt.addEventListener("submit", handleOffshoreDepositForm);
    offshoreAllDepositButton.addEventListener("click", handleOffshoreAllDepositButton)
  } else {
    offshoreTabContainer.remove();
    offshoreTabView.remove();
  }
} else {
  enterpriseTabContainer.remove();
  enterpriseTabView.remove();
  offshoreTabContainer.remove();
  offshoreTabView.remove();
}
 */

/*------------------------------------*\
  Load app
\*------------------------------------*/

const app = document.getElementById("app");

setTimeout(() => {
  app.classList.replace("app--loading", "app--loaded");
}, 1000);
