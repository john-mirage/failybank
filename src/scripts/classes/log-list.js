import {currencyFormatter, dateTimeFormatter} from "@scripts/utils/formatters";

const LOGS_PER_PAGE = 10;

export class LogList {
  constructor(logs, logListElement) {
    this.logs = logs;
    this.logListElement = logListElement;
    this.logTemplate = document.getElementById("log-template");
    this.filteredLogs = false;
    this.filter = false;
    this.page = 1;
    this.observer = new IntersectionObserver((entries) => this.getNextPage(entries));
    this.observedLogElement = false;
    this.getNextPage = this.getNextPage.bind(this);
  }

  addLog(log) {
    this.logs.unshift(log);
  }

  createLog(log) {
    const logFragment = this.logTemplate.content.cloneNode(true);
    const logElement = logFragment.querySelector(".log");
    const logIconElement = logElement.querySelector(".log__icon");
    const logLabelElement = logElement.querySelector('[data-name="log-label"]');
    const logDateElement = logElement.querySelector('[data-name="log-datetime"]');
    const logAmountElement = logElement.querySelector('[data-name="log-amount"]');
    const logReferenceElement = logElement.querySelector('[data-name="log-reference"]');
    logIconElement.classList.add(`log__icon--${log.type}`);
    logAmountElement.classList.add(`typography--${log.amount > 0 ? "number-positive" : "number-negative"}`);
    logLabelElement.textContent = log.label;
    logDateElement.textContent = dateTimeFormatter.format(new Date(log.date));
    logAmountElement.textContent = currencyFormatter.format(log.amount);
    logReferenceElement.textContent = log.reference;
    return logElement;
  }

  createPageLogs(pageLogs) {
    pageLogs.forEach((pageLog, pageLogIndex) => {
      const isLastLog = pageLogIndex === (pageLogs.length - 1);
      const isNotLastPage = this.page < this.pageTotal;
      const logElement = this.createLog(pageLog);
      if (isLastLog && isNotLastPage) {
        this.observeLastPageLog(logElement);
        this.observedLogElement = logElement;
      }
      this.logListElement.appendChild(logElement);
    });
  }

  getNextPage(entries) {
    if (entries[0].isIntersecting) {
      this.page += 1;
      this.unobserveLastPageLog();
      if (this.filter) {
        this.displayFilteredLogs();
      } else {
        this.displayLogs();
      }
    }
  }

  getPageTotal(logs) {
    const logNumber = logs.length;
    this.pageTotal = Math.ceil( logNumber / LOGS_PER_PAGE);
  }

  getPageLogs(logs) {
    const firstIndex = LOGS_PER_PAGE * (this.page - 1);
    const lastIndex = LOGS_PER_PAGE * this.page;
    return logs.slice(firstIndex, lastIndex);
  }

  getFilteredLogs() {
    return this.logs.filter((log) => {
      return log.type === this.filter;
    });
  }

  displayInitialLogs() {
    if (this.filter) {
      this.filteredLogs = this.getFilteredLogs();
      this.getPageTotal(this.filteredLogs);
      this.displayFilteredLogs();
    } else {
      this.getPageTotal(this.logs);
      this.displayLogs();
    }
  }

  displayFilteredLogs() {
    const pageLogs = this.getPageLogs(this.filteredLogs);
    this.createPageLogs(pageLogs);
  }

  displayLogs() {
    const pageLogs = this.getPageLogs(this.logs);
    this.createPageLogs(pageLogs);
  }

  reset() {
    this.clear();
    this.displayInitialLogs();
  }

  clear() {
    this.unobserveLastPageLog();
    this.logListElement.scrollTop = 0;
    this.logListElement.innerHTML = "";
    if (this.page > 1) {
      this.page = 1;
    }
  }

  observeLastPageLog(logElement) {
    if (!this.observedLogElement) {
      this.observer.observe(logElement);
      this.observedLogElement = logElement;
    }
  }

  unobserveLastPageLog() {
    if (this.observedLogElement) {
      this.observer.unobserve(this.observedLogElement);
      this.observedLogElement = false;
    }
  }
}