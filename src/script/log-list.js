/**
 * Date time formatter.
 * Used to format log ISO dates.
 *
 * @type {Intl.DateTimeFormat}
 */
const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

/**
 * Log template element.
 * Used as a template for the logs.
 *
 * @type {HTMLTemplateElement}
 */
const logTemplate = document.getElementById("log-template");

/**
 * Logs loaded initially and each time the user reach the last page.
 *
 * @type {number}
 */
const LOGS_PER_PAGES = 15;

/**
 * Create a new log list.
 * This class is used to populate a DOM element with the logs provided and
 * add an infinite scroll to this list.
 *
 * @Class LogList
 */
class LogList {

  /**
   * @constructor
   * @param logList
   * @param logs
   * @param currencyFormatter
   */
  constructor(logList, logs, currencyFormatter) {
    this.logList = logList;
    this.logs = logs;
    this.currencyFormatter = currencyFormatter;
    this.page = 1;
    this.observer = new IntersectionObserver(this.getNextPage);
    this.observedLog = false;
    this.getPageNumber();
    this.getPageLogs();
    this.createPageLogs();
  }

  /**
   * Create a new log and add it to the DOM.
   *
   * @param log - The log to be created.
   * @param prepend - Indicate if the log should be first or last in the DOM element.
   * @param observe - Indicate if the log HTML element should be observed to trigger the next page.
   */
  createLog(
    log,
    prepend = false,
    observe = false
  ) {
    const logFragment = logTemplate.content.cloneNode(true);
    const logRow = logFragment.querySelector(".log");
    const logIcon = logRow.querySelector(".log__icon");
    const logType = logRow.querySelector(".log__type");
    const logDate = logRow.querySelector(".log__date");
    const logAmount = logRow.querySelector(".log__amount");
    const logReference = logRow.querySelector(".log__reference");
    logIcon.classList.add(`log__icon--${log.icon}`);
    logAmount.classList.add(`log__amount--${log.amount > 0 ? "up" : "down"}`);
    logType.textContent = log.entity;
    logDate.textContent = dateTimeFormatter.format(new Date(log.date));
    logAmount.textContent = this.currencyFormatter.format(log.amount);
    logReference.textContent = log.reference;
    if (prepend) {
      this.logList.prepend(logFragment);
    } else {
      this.logList.appendChild(logFragment);
    }
    if (observe) {
      this.observedLog = logRow;
      this.observer.observe(logRow);
    }
  }

  /**
   * Create the logs for the current page.
   */
  createPageLogs() {
    if (this.observedLog) {
      this.observer.unobserve(this.observedLog);
      this.observedLog = false;
    }
    this.pageLogs.forEach((pageLog, pageLogIndex) => {
      const isLastLog = pageLogIndex === (this.pageLogs.length - 1);
      const isNotLastPage = this.page < this.pageNumber;
      if (isLastLog && isNotLastPage) {
        this.createLog(pageLog, false, true);
      } else {
        this.createLog(pageLog);
      }
    });
  }

  /**
   * Get the next page.
   *
   * @param entries - The entries observed by the intersection observer.
   */
  getNextPage(entries) {
    if (entries[0].isIntersecting) {
      this.page += 1;
      this.createPageLogs();
    }
  }

  /**
   * Get the page number for the logs.
   */
  getPageNumber() {
    const logNumber = this.logs.length;
    this.pageNumber = Math.ceil( logNumber / LOGS_PER_PAGES);
  }

  /**
   * Get the page logs.
   */
  getPageLogs() {
    const firstIndex = LOGS_PER_PAGES * (this.page - 1);
    const lastIndex = LOGS_PER_PAGES * this.page;
    this.pageLogs = this.logs.slice(firstIndex, lastIndex);
  }

  /**
   * Reset the log list.
   */
  reset() {
    this.logList.innerHTML = "";
    this.page = 1;
    this.getPageLogs();
    this.createPageLogs();
  }
}

export default LogList;