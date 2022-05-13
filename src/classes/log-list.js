const LOGS_PER_PAGE = 10;

class LogList {
  constructor(logs, list) {
    this.listElt = list;
    this.logs = logs;
    this.filter = false;
    this.page = 1;
    this.observer = new IntersectionObserver((entries) => {
      this.getNextPage(entries);
    });
    this.observedLog = false;
    this.getPageNumber();
    this.getPageLogs();
  }

  addLog(log) {
    this.logs.unshift(log);
  }

  createLog(log, prepend = false, observe = false) {
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
      this.listElt.prepend(logFragment);
    } else {
      this.listElt.appendChild(logFragment);
    }
    if (observe) {
      this.observedLog = logRow;
      this.observer.observe(logRow);
    }
  }

  setFilter(filter) {
    this.filter = filter === "all" ? false : filter;
    this.resetList();
  }

  createPageLogs(pageLogs) {
    this.getPageLogs();
    if (this.observedLog) {
      this.observer.unobserve(this.observedLog);
      this.observedLog = false;
    }
    pageLogs.forEach((pageLog, pageLogIndex) => {
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
    this.pageNumber = Math.ceil( logNumber / LOGS_PER_PAGE);
  }

  getPageLogs(filteredLogs) {
    const firstIndex = LOGS_PER_PAGE * (this.page - 1);
    const lastIndex = LOGS_PER_PAGE * this.page;
    return filteredLogs.slice(firstIndex, lastIndex);
  }

  getFilteredLogs() {
    return this.filter ? this.logs.filter((log) => log.type === this.filter) : this.logs;
  }

  displayLogs() {
    const filteredLogs = this.getFilteredLogs();
    const pageLogs = this.getPageLogs(filteredLogs);
    this.createPageLogs(pageLogs);
  }

  resetList() {
    this.clearList();
    this.displayLogs();
  }

  clearList() {
    this.unobserveList();
    this.listElt.scrollTop = 0;
    this.listElt.innerHTML = "";
    if (this.page > 1) {
      this.page = 1;
    }
  }

  unobserveList() {
    if (this.observedLog) {
      this.observer.unobserve(this.observedLog);
      this.observedLog = false;
    }
  }
}