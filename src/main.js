import data from "./data";

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
  document.getElementById("personal-account-balance"),
  document.getElementById("personal-account-log-list"),
  document.getElementById("personal-account-number"),
  document.getElementById("personal-account-operation-log-list")
);

personalAccount.logList.createPageLogs();

let previousLogList = personalAccount.logList;

const personalTab = new TopAppBarTab(
  "personal",
  personalTabView,
  personalTabContainer
);

const personalOperationTab = new TopAppBarTab(
  "personal-operation",
  personalOperationTabView,
  personalOperationTabContainer
);

const personalTransferTab = new TopAppBarTab(
  "personal-transfer",
  personalTransferTabView,
  personalTransferTabContainer
);

const tabList = new TabList(
  personalTab,
  personalOperationTab,
  personalTransferTab
);

const personalFavoriteAccountNameField = new FormField(personalFavoriteAccountNameInput);
const personalFavoriteAccountNumberField = new FormField(personalFavoriteAccountNumberInput);
const personalDepositAmountField = new FormField(personalDepositAmountInput);
const personalWithdrawAmountField = new FormField(personalWithdrawAmountInput);
const personalTransferAmountField = new FormField(personalTransferAmountInput);
const personalTransferAccountNumberField = new FormField(personalTransferAccountNumberInput);
const personalTransferReferenceField = new FormField(personalTransferReferenceInput);

const personalFavoriteAccountForm = new Form(
  [personalFavoriteAccountNameField, personalFavoriteAccountNumberField],
  personalFavoriteAccountFormElt,
  personalFavoriteAccountFormButton
);

const personalDepositForm = new Form(
  [personalDepositAmountField],
  personalDepositFormElt,
  personalDepositFormButton
);

const personalWithdrawForm = new Form(
  [personalWithdrawAmountField],
  personalWithdrawFormElt,
  personalWithdrawFormButton
);

const personalTransferForm = new Form(
  [personalTransferAmountField, personalTransferAccountNumberField, personalTransferReferenceField],
  personalTransferFormElt,
  personalTransferFormButton
);

const notificationList = new NotificationList(
  document.getElementById("notification-list")
);

const personalFilter = new Filter(
  document.getElementById("personal-filter"),
  "update-personal-filter"
);

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

/*------------------------------------*\
  Enterprise & Offshore accounts
\*------------------------------------*/

if (data.hasEnterprise) {
  const enterpriseDepositFormElt = document.getElementById("enterprise-deposit-form");
  const enterpriseWithdrawFormElt = document.getElementById("enterprise-withdraw-form");
  const enterpriseDepositAmountInput = document.getElementById("enterprise-deposit-amount-input");
  const enterpriseWithdrawAmountInput = document.getElementById("enterprise-withdraw-amount-input");
  const enterpriseTabInput = document.getElementById("enterprise-tab-input");
  const enterpriseDepositFormButton = document.getElementById("enterprise-deposit-form-button");
  const enterpriseWithdrawFormButton = document.getElementById("enterprise-withdraw-form-button");
  const enterpriseAllDepositButton = document.getElementById("enterprise-all-deposit-button");

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

/*------------------------------------*\
  Load app
\*------------------------------------*/

const app = document.getElementById("app");

setTimeout(() => {
  app.classList.replace("app--loading", "app--loaded");
}, 1000);

if (this.theme === "dark") {
  personalThemeButton.checked = true;
  document.documentElement.classList.add("dark");
}