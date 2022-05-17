import {data} from "@data/data";
import {Account, PersonalAccount} from "@scripts/classes/account";
import {LogList} from "@scripts/classes/log-list";
import {Form} from "@scripts/classes/form";
import {NotificationList} from "@scripts/classes/notification-list";
import {Tab} from "@scripts/classes/tab";
import {TabList} from "@scripts/classes/tab-list";
import {Dropdown} from "@scripts/classes/dropdown";
import {Filter} from "@scripts/classes/filter";
import {FilterList} from "@scripts/classes/filter-list";
import {FavoriteAccount} from "@scripts/classes/favorite-account";
import {FavoriteAccountList} from "@scripts/classes/favorite-account-list";
import {FavoriteAccountEditList} from "@scripts/classes/favorite-account-edit-list";
import {FavoriteAccountPasteList} from "@scripts/classes/favorite-account-paste-list";
import {View} from "@scripts/classes/view";
import {ViewSwitcher} from "@scripts/classes/view-switcher";

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

const personalFilterDropdown = new Dropdown(
  document.getElementById("personal-filter-dropdown")
);

const personalAllFilter = new Filter(
  "Aucun",
  false,
);

const personalOperationFilter = new Filter(
  "Opérations",
  "operation"
);

const personalTransferFilter = new Filter(
  "Transferts",
  "transfer"
);

function setPersonalLogListFilter(filter) {
  personalLogList.filter = filter.value;
  personalLogList.reset();
  personalFilterDropdown.close();
  personalFilterDropdown.updateLabel(filter.value ? `filtre: ${filter.name}` : "filtrer les résultats");
}

const personalFilterList = new FilterList(
  [
    personalAllFilter,
    personalOperationFilter,
    personalTransferFilter
  ],
  document.getElementById("personal-filter-list"),
  setPersonalLogListFilter
);

const accounts = data.account.personal.favoriteAccounts.map((favoriteAccount) => {
  return new FavoriteAccount(
    favoriteAccount.name,
    favoriteAccount.number
  );
});

const favoriteAccountList = new FavoriteAccountList(
  accounts
);

function deleteFavoriteAccount(favoriteAccount) {
  favoriteAccountList.deleteFavoriteAccount(favoriteAccount);
  favoriteAccountEditList.reset();
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
  }
}

function editFavoriteAccount(favoriteAccount, form, index) {
  const formData = new FormData(form.formElement);
  const newFavoriteAccount = new FavoriteAccount(
    formData.get("name"),
    formData.get("number")
  );
  favoriteAccountList.editFavoriteAccount(newFavoriteAccount, index);
  favoriteAccountEditList.reset();
}

const favoriteAccountEditList = new FavoriteAccountEditList(
  favoriteAccountList,
  editFavoriteAccount,
  deleteFavoriteAccount
);

const favoriteAccountPasteList = new FavoriteAccountPasteList(
  favoriteAccountList,
  pasteFavoriteAccount
);

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

const personalView = new View(
  document.getElementById("personal-view"),
  personalFilterDropdown,
  personalFilterList,
  personalLogList,
  favoriteAccountEditList
);

const personalOperationView = new View(
  document.getElementById("personal-operation-view"),
  false,
  false,
  personalOperationLogList,
  false
);

const personalTransferView = new View(
  document.getElementById("personal-transfer-view"),
  false,
  false,
  false,
  favoriteAccountPasteList
);

const viewSwitcher = new ViewSwitcher(
  personalView
);

const personalTab = new Tab(
  "mon compte",
  "personal",
  showPersonalView
);

const personalOperationTab = new Tab(
  "opération",
  "personal-operation",
  showPersonalOperationView
);

const personalTransferTab = new Tab(
  "transfert",
  "transfer",
  showPersonalTransferView
);

const tabList = new TabList(
  [
    personalTab,
    personalOperationTab,
    personalTransferTab
  ],
  document.getElementById("tab-list")
);

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
  const newAccount = new FavoriteAccount(
    formData.get("name"),
    formData.get("number")
  );
  const accountListIsNotFull = favoriteAccountList.favoriteAccounts.length < 5;
  const accountIsNotInTheList = favoriteAccountList.favoriteAccounts.findIndex((favoriteAccount) => favoriteAccount.number === newAccount.number) === -1;
  if (accountListIsNotFull && accountIsNotInTheList) {
    favoriteAccountList.addFavoriteAccount(newAccount);
    favoriteAccountEditList.reset();
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
    if (tabList.activeTab.name === "personal") {
      personalLogList.reset();
    }
    personalOperationLogList.addLog(log);
    if (tabList.activeTab.name === "personal-operation") {
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
    if (tabList.activeTab.name === "personal") {
      personalLogList.reset();
    }
    personalOperationLogList.addLog(log);
    if (tabList.activeTab.name === "personal-operation") {
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
    if (tabList.activeTab.name === "personal") {
      personalLogList.reset();
    }
    personalOperationLogList.addLog(log);
    if (tabList.activeTab.name === "personal-operation") {
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
    if (tabList.activeTab.name === "personal") {
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

  const enterpriseFilterDropdown = new Dropdown(
    document.getElementById("enterprise-filter-dropdown")
  );

  const enterpriseAllFilter = new Filter(
    "Aucun",
    false,
  );

  const enterpriseOperationFilter = new Filter(
    "Opérations",
    "operation"
  );

  const enterpriseTransferFilter = new Filter(
    "Transferts",
    "transfer"
  );

  function setEnterpriseLogListFilter(filter) {
    enterpriseLogList.filter = filter.value;
    enterpriseLogList.reset();
    enterpriseFilterDropdown.close();
    enterpriseFilterDropdown.updateLabel(filter.value ? `filtre: ${filter.name}` : "filtrer les résultats");
  }

  const enterpriseFilterList = new FilterList(
    [
      enterpriseAllFilter,
      enterpriseOperationFilter,
      enterpriseTransferFilter
    ],
    document.getElementById("enterprise-filter-list"),
    setEnterpriseLogListFilter
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

  function showEnterpriseView() {
    tabList.setActiveTab(enterpriseTab);
    viewSwitcher.switch(enterpriseView);
  }

  const enterpriseTab = new Tab(
    "entreprise",
    "enterprise",
    showEnterpriseView
  );

  tabList.addTab(enterpriseTab);

  const enterpriseView = new View(
    document.getElementById("enterprise-view"),
    enterpriseFilterDropdown,
    enterpriseFilterList,
    enterpriseLogList,
    false
  );

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
      if (tabList.activeTab.name === "enterprise") {
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
      if (tabList.activeTab.name === "enterprise") {
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
      if (tabList.activeTab.name === "enterprise") {
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

    const offshoreFilterDropdown = new Dropdown(
      document.getElementById("offshore-filter-dropdown")
    );

    const offshoreAllFilter = new Filter(
      "Aucun",
      false,
    );

    const offshoreOperationFilter = new Filter(
      "Opérations",
      "operation"
    );

    const offshoreTransferFilter = new Filter(
      "Transferts",
      "transfer"
    );

    function setOffshoreLogListFilter(filter) {
      offshoreLogList.filter = filter.value;
      offshoreLogList.reset();
      offshoreFilterDropdown.close();
      offshoreFilterDropdown.updateLabel(filter.value ? `filtre: ${filter.name}` : "filtrer les résultats");
    }

    const offshoreFilterList = new FilterList(
      [
        offshoreAllFilter,
        offshoreOperationFilter,
        offshoreTransferFilter
      ],
      document.getElementById("offshore-filter-list"),
      setOffshoreLogListFilter
    );

    const offshoreDepositForm = new Form(
      [
        document.getElementById("offshore-deposit-amount-input")
      ],
      document.getElementById("offshore-deposit-form"),
      document.getElementById("offshore-deposit-form-button")
    );

    function showOffshoreView() {
      tabList.setActiveTab(offshoreTab);
      viewSwitcher.switch(offshoreView);
    }

    const offshoreTab = new Tab(
      "offshore",
      "offshore",
      showOffshoreView,
      true
    );

    const offshoreTabButton = document.getElementById("offshore-tab-button");

    const offshoreView = new View(
      document.getElementById("offshore-view"),
      offshoreFilterDropdown,
      offshoreFilterList,
      offshoreLogList,
      false
    );

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
        if (tabList.activeTab.name === "offshore") {
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
}, 500);
