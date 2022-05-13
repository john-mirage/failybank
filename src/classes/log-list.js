const LOGS_PER_PAGE = 10;

class LogList {
  constructor(logs, logListElement, logTemplate) {
    this.logs = logs;
    this.logListElement = logListElement;
    this.logTemplate = logTemplate;
    this.filteredLogs = false;
    this.filter = false;
    this.page = 1;
    this.observer = new IntersectionObserver(this.getNextPage);
    this.observedLogElement = false;
    this.getPageTotal();
    this.getPageLogs();
    this.getNextPage = this.getNextPage.bind(this);
  }

  addLog(log) {
    this.logs.unshift(log);
  }

  createLog(log) {
    const logFragment = this.logTemplate.content.cloneNode(true);
    const logElement = logFragment.querySelector(".log");
    const logIconElement = logElement.querySelector(".log__icon");
    const logTypeElement = logElement.querySelector(".log__type");
    const logDateElement = logElement.querySelector(".log__date");
    const logAmountElement = logElement.querySelector(".log__amount");
    const logReferenceElement = logElement.querySelector(".log__reference");
    logIconElement.classList.add(`log__icon--${log.type}`);
    logAmountElement.classList.add(`log__amount--${log.amount > 0 ? "up" : "down"}`);
    logTypeElement.textContent = log.label;
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
      if (isLastLog && isNotLastPage) this.observe(logElement);
      this.logListElement.appendChild(logElement);
    });
  }

  getNextPage(entries) {
    if (entries[0].isIntersecting) {
      this.page += 1;
      this.unobserve();
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

  resetList() {
    this.clearList();
    this.displayInitialLogs();
  }

  clearList() {
    this.unobserve();
    this.logListElement.scrollTop = 0;
    this.logListElement.innerHTML = "";
    if (this.page > 1) {
      this.page = 1;
    }
  }

  observe(logElement) {
    this.observer.observe(logElement);
    this.observedLogElement = logElement;
  }

  unobserve() {
    if (this.observedLogElement) {
      this.observer.unobserve(this.observedLogElement);
      this.observedLogElement = false;
    }
  }
}