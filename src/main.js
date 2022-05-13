import data from "./data";
import {PersonalAccount} from "./classes/account";
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

personalLogList.displayInitialLogs();

const personalTab = new Tab(
  "mon compte",
  "personal-tab"
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
  document.getElementById("personal-view")
);

const personalOperationView = new View(
  document.getElementById("personal-operation-view")
);

const personalTransferView = new View(
  document.getElementById("personal-transfer-view")
);

const viewSwitcher = new ViewSwitcher(
  personalView
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

const filterDropdown = new FilterDropdown(
  document.getElementById("personal-filter-dropdown")
);

const filterDropdownButtons = document.querySelectorAll(".filter__button");

filterDropdownButtons.forEach((filterDropdownButton) => {
  filterDropdownButton.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter;
    filterDropdown.setActiveFilter(event.target);
    personalLogList.filter = filter === "all" ? false : filter;
    personalLogList.reset();
  });
});

const favoriteAccountList = new AccountList(
  data.account.personal.favoriteAccounts
);

const deleteFavoriteAccountList = new DeleteAccountList(
  favoriteAccountList,
  document.getElementById("delete-favorite-account-list")
);

deleteFavoriteAccountList.createAccounts();

const personalTabInput = document.getElementById("personal-tab");
const personalOperationInput = document.getElementById("personal-operation-tab");
const personalTransferInput = document.getElementById("personal-transfer-tab");

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

personalTabInput.addEventListener("change", showPersonalView);
personalOperationInput.addEventListener("change", showPersonalOperationView);
personalTransferInput.addEventListener("change", showPersonalTransferView);

/*
function handlePersonalThemeButton(event) {
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

function handlePersonalFavoriteAccountForm(event) {
  event.preventDefault();
  const account = {
    name: personalFavoriteAccountNameInput.value,
    number: personalFavoriteAccountNumberInput.value
  }
  if (personalAccount.favoriteAccountList.accounts.length < 5) {
    personalAccount.favoriteAccountList.addAccount(account);
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

function handlePersonalFavoriteAccountDelete(event) {
  const account = event.detail.account;
  personalAccount.favoriteAccountList.deleteAccount(account);
  notificationList.displayNotification({
    title: "Compte favoris",
    description: "le compte a était supprimé avec succès",
    type: "success"
  });
}

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

function handlePersonalFilter(event) {
  const filter = event.detail.filter;
  console.log(filter);
}

personalTabInput.addEventListener("change", () => {
  tabList.setActiveTab(personalTab);
  previousLogList.clearList();
  previousLogList = personalAccount.logList;
  personalAccount.logList.createPageLogs();
});

personalOperationTabInput.addEventListener("change", () => {
  tabList.setActiveTab(personalOperationTab);
  previousLogList.clearList();
  previousLogList = personalAccount.operationLogList;
  personalAccount.operationLogList.createPageLogs();
});

personalTransferTabInput.addEventListener("change", () => {
  tabList.setActiveTab(personalTransferTab);
  previousLogList.clearList();
});

personalFilter.filterElement.addEventListener("update-personal-filter", handlePersonalFilter);
personalThemeButton.addEventListener("change", handlePersonalThemeButton);
personalFavoriteAccountFormElt.addEventListener("submit", handlePersonalFavoriteAccountForm);
document.addEventListener("personal-favorite-account-delete", handlePersonalFavoriteAccountDelete);
document.addEventListener("personal-favorite-account-number-paste", handlePersonalFavoriteAccountNumberPaste);
personalDepositFormElt.addEventListener("submit", handlePersonalDepositForm);
personalDepositAllDepositButton.addEventListener("click", handlePersonalAllDepositButton);
personalWithdrawFormElt.addEventListener("submit", handlePersonalWithdrawForm);
personalTransferFormElt.addEventListener("submit", handlePersonalTransferForm);
*/

/*------------------------------------*\
  Enterprise & Offshore accounts
\*------------------------------------*/

/*
if (data.hasEnterprise) {

  const enterpriseAccount = new Account(
    data.account.enterprise,
    document.getElementById("enterprise-account-owner"),
    document.getElementById("enterprise-account-balance"),
    document.getElementById("enterprise-account-log-list")
  );

  const enterpriseTab = new TopAppBarTab("enterprise", enterpriseTabView, enterpriseTabContainer);

  tabList.addTab(enterpriseTab);

  const enterpriseDepositField = new FormField(enterpriseDepositAmountInput);
  const enterpriseWithdrawField = new FormField(enterpriseWithdrawAmountInput);

  const enterpriseDepositForm = new Form(
    [enterpriseDepositField],
    enterpriseDepositFormElt,
    enterpriseDepositFormButton
  );

  const enterpriseWithdrawForm = new Form(
    [enterpriseWithdrawField],
    enterpriseWithdrawFormElt,
    enterpriseWithdrawFormButton
  );

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

  enterpriseTabInput.addEventListener("change", () => {
    tabList.setActiveTab(enterpriseTab);
    previousLogList.clearList();
    previousLogList = enterpriseAccount.logList;
    enterpriseAccount.logList.createPageLogs();
  });

  enterpriseDepositFormElt.addEventListener("submit", handleEnterpriseDepositForm);
  enterpriseAllDepositButton.addEventListener("click", handleEnterpriseAllDepositButton)
  enterpriseWithdrawFormElt.addEventListener("submit", handleEnterpriseWithdrawForm);

  if (data.hasOffshore) {
    const offshoreDepositFormElt = document.getElementById("offshore-deposit-form");
    const offshoreDepositAmountInput = document.getElementById("offshore-deposit-amount-input");
    const offshoreTabInput = document.getElementById("offshore-tab-input");
    const offshoreDepositFormButton = document.getElementById("offshore-deposit-form-button");
    const offshoreAllDepositButton = document.getElementById("offshore-all-deposit-button");

    const offshoreAccount = new Account(
      data.account.offshore,
      document.getElementById("offshore-account-owner"),
      document.getElementById("offshore-account-balance"),
      document.getElementById("offshore-account-log-list")
    );

    const offshoreTab = new Tab("offshore", offshoreTabView);

    tabList.addTab(offshoreTab);

    const offshoreDepositField = new FormField(offshoreDepositAmountInput);

    const offshoreDepositForm = new Form(
      [offshoreDepositField],
      offshoreDepositFormElt,
      offshoreDepositFormButton
    );

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

    offshoreTabInput.addEventListener("change", () => {
      tabList.setActiveTab(offshoreTab);
      previousLogList.clearList();
      previousLogList = offshoreAccount.logList;
      offshoreAccount.logList.createPageLogs();
    });

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
