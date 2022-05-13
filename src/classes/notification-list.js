class NotificationList {
  constructor(notificationListElt, notificationTemplate) {
    this.notificationListElt = notificationListElt;
    this.notificationTemplate = notificationTemplate;
  }

  createNotification(notification) {
    const notificationFragment = this.notificationTemplate.content.cloneNode(true);
    const notificationElement = notificationFragment.querySelector(".notification");
    const notificationTitle = notificationFragment.querySelector(".notification__title");
    const notificationDescription = notificationFragment.querySelector(".notification__description");
    notificationElement.classList.add(`notification--${notification.type}`);
    notificationTitle.textContent = notification.title;
    notificationDescription.textContent = notification.description;
    return notificationElement;
  }

  deleteNotification(notificationElt) {
    this.notificationListElt.removeChild(notificationElt);
  }

  displayNotification(notification) {
    const notificationElt = this.createNotification(notification);
    this.notificationListElt.prepend(notificationElt);
    setTimeout(() => {
      this.deleteNotification(notificationElt);
    }, 5000);
  }
}