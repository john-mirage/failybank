const notificationTemplate = document.getElementById("notification-template");

export class NotificationList {
  constructor(notificationListElement) {
    this.notificationListElement = notificationListElement;
  }

  getNotificationIcon(type) {
    switch (type) {
      case "success":
        return  "#icon-check";
      case "error":
        return  "#icon-error";
    }
  }

  createNotification(notification) {
    const notificationFragment = notificationTemplate.content.cloneNode(true);
    const notificationElement = notificationFragment.querySelector(".notification");
    const notificationTitle = notificationElement.querySelector('[data-name="notification-name"]');
    const notificationDescription = notificationElement.querySelector('[data-name="notification-description"]');
    const notificationIconUse = notificationElement.querySelector('[data-name="notification-icon"]');
    const iconName = this.getNotificationIcon(notification.type);
    notificationIconUse.setAttribute("href", iconName);
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