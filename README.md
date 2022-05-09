# FailyV Unofficial bank app

![Project screenshot](/docs/preview.png)

## API

To interact with the App, you have to listen to the custom events launched every time
the user perform an action on the data.

```javascript
document.addEventListener("event-name", (event) => {
  const data = event.detail.data;
  // Do something with the data.
});
```

| Event name                  | Description                                   | data      |
|-----------------------------|-----------------------------------------------|-----------|
| `add-favorite-account`      | The user added a new favorite account         | `account` |
| `delete-favorite-account`   | The user removed a favorite account           | `account` |
| `update-balance`            | The balance has been updated                  | dz        |
| `add-account-log`           | A log has been added to the account           | `log`     |
| `add-account-operation-log` | A operation log has been added to the account | `log`     |