/*------------------------------------*\
  Logs
\*------------------------------------*/

class LogList {
  constructor(
    logs,
    list,
    eventType,
  ) {
    this.logList = list;
    this.logs = logs;
    this.page = 1;
    this.observer = new IntersectionObserver((entries) => {
      this.getNextPage(entries);
    });
    this.observedLog = false;
    this.eventType = eventType;
    this.getPageNumber();
    this.getPageLogs();
    this.createPageLogs();
    document.addEventListener(this.eventType, (event) => {
      const log = event.detail.log;
      this.addLog(log);
    });
  }

  addLog(log) {
    this.logs.unshift(log);
    this.reset();
  }

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
    logIcon.classList.add(`log__icon--${log.type}`);
    logAmount.classList.add(`log__amount--${log.amount > 0 ? "up" : "down"}`);
    logType.textContent = log.label;
    logDate.textContent = dateTimeFormatter.format(new Date(log.date));
    logAmount.textContent = currencyFormatter.format(log.amount);
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

  getNextPage(entries) {
    if (entries[0].isIntersecting) {
      this.page += 1;
      this.getPageLogs();
      this.createPageLogs();
    }
  }

  getPageNumber() {
    const logNumber = this.logs.length;
    this.pageNumber = Math.ceil( logNumber / LOGS_PER_PAGES);
  }

  getPageLogs() {
    const firstIndex = LOGS_PER_PAGES * (this.page - 1);
    const lastIndex = LOGS_PER_PAGES * this.page;
    this.pageLogs = this.logs.slice(firstIndex, lastIndex);
  }

  reset() {
    this.logList.innerHTML = "";
    this.page = 1;
    this.getPageLogs();
    this.createPageLogs();
  }
}