const notificationTemplate = document.getElementById("notification-template");

export class NotificationList {
  constructor(notificationListElement) {
    this.notificationListElement = notificationListElement;
  }

  createNotification(notification) {
    const notificationFragment = notificationTemplate.content.cloneNode(true);
    const notificationElement = notificationFragment.querySelector(".notification");
    const notificationTitle = notificationFragment.querySelector('[data-name="notification-name"]');
    const notificationDescription = notificationFragment.querySelector('[data-name="notification-description"]');
    notificationElement.classList.add(`notification--${notification.type}`);
    notificationTitle.textContent = notification.title;
    notificationDescription.textContent = notification.description;
    return notificationElement;
  }

  deleteNotification(notificationElt) {
    this.notificationListElement.removeChild(notificationElt);
  }

  displayNotification(notification) {
    const notificationElt = this.createNotification(notification);
    this.notificationListElement.prepend(notificationElt);
    setTimeout(() => {
      this.deleteNotification(notificationElt);
    }, 5000);
  }
}