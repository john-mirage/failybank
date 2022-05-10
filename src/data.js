const oldData = {
  name: "Hubert Bonisseur de La Bath",
  number: "0123456789",
  balance: 2152800,
  theme: "dark",
  favoriteAccounts: [
    {
      name: "Lena Silvo",
      number: "0123456789"
    },
    {
      name: "Owen Chapman",
      number: "1234567890"
    },
    {
      name: "Pamela Padilla",
      number: "2345678901"
    },
    {
      name: "Garry Green",
      number: "3456789012"
    },
    {
      name: "Quentin Cooper",
      number: "4567890123"
    },
  ],
  logs: [
    {
      label: "Dépot",
      amount: 15000,
      date: "2022-04-19T15:00",
      reference: "Failygames",
      type: "operation",
    },
    {
      label: "Retrait",
      amount: -5000,
      date: "2022-04-15T15:00",
      reference: "American Restaurant Company",
      type: "operation",
    },
    {
      label: "Transfert",
      amount: -8000,
      date: "2022-04-14T15:00",
      reference: "Owen Chapman",
      type: "transfer",
    },
    {
      label: "Dépot",
      amount: 15000,
      date: "2022-04-19T15:00",
      reference: "Failygames",
      type: "operation",
    },
    {
      label: "Retrait",
      amount: -5000,
      date: "2022-04-15T15:00",
      reference: "American Restaurant Company",
      type: "operation",
    },
    {
      label: "Transfert",
      amount: -8000,
      date: "2022-04-14T15:00",
      reference: "Owen Chapman",
      type: "transfer",
    },
    {
      label: "Dépot",
      amount: 15000,
      date: "2022-04-19T15:00",
      reference: "Failygames",
      type: "operation",
    },
    {
      label: "Retrait",
      amount: -5000,
      date: "2022-04-15T15:00",
      reference: "American Restaurant Company",
      type: "operation",
    },
    {
      label: "Transfert",
      amount: -8000,
      date: "2022-04-14T15:00",
      reference: "Owen Chapman",
      type: "transfer",
    },
    {
      label: "Dépot",
      amount: 15000,
      date: "2022-04-19T15:00",
      reference: "Failygames",
      type: "operation",
    },
    {
      label: "Retrait",
      amount: -5000,
      date: "2022-04-15T15:00",
      reference: "American Restaurant Company",
      type: "operation",
    },
    {
      label: "Transfert",
      amount: -8000,
      date: "2022-04-14T15:00",
      reference: "Owen Chapman",
      type: "transfer",
    },
  ],
  hasEnterprise: true,
  enterprise: {
    owner: "Garry Green",
    balance: 2000000,
    logs: [
      {
        label: "Dépot",
        amount: 4859,
        date: "2022-04-19T15:00",
        reference: "Failygames",
        type: "operation",
      },
      {
        label: "Retrait",
        amount: -6874,
        date: "2022-04-15T15:00",
        reference: "American Restaurant Company",
        type: "operation",
      },
    ],
  },
  hasOffshore: true,
  offshore: {
    owner: "Arthur Povers",
    balance: 30254856,
    logs: [
      {
        label: "Dépot",
        amount: 4859,
        date: "2022-04-19T15:00",
        reference: "Failygames",
        type: "operation",
      },
      {
        label: "Retrait",
        amount: -6874,
        date: "2022-04-15T15:00",
        reference: "American Restaurant Company",
        type: "operation",
      },
    ],
  },
};

const data = {
  bank: "fleeca",
  hasEnterprise: true,
  hasOffshore: true,
  account: {
    personal: {
      owner: "Garry Green",
      number: "0123456789",
      balance: 48569,
      theme: "dark",
      favoriteAccounts: [],
      logs: [
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
      ]
    },
    enterprise: {
      owner: "Arthur Popov",
      balance: 485321,
      logs: [
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
      ]
    },
    offshore: {
      owner: "Quentin Cooper",
      balance: 4123547,
      logs: [
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
        {
          label: "Dépot",
          amount: 15000,
          date: "2022-04-19T15:00",
          reference: "Failygames",
          type: "operation",
        },
        {
          label: "Retrait",
          amount: -5000,
          date: "2022-04-15T15:00",
          reference: "American Restaurant Company",
          type: "operation",
        },
        {
          label: "Transfert",
          amount: -8000,
          date: "2022-04-14T15:00",
          reference: "Owen Chapman",
          type: "transfer",
        },
      ]
    }
  }
}

export default data;