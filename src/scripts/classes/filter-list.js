export class FilterList {
  constructor(filters, filterListElement, handleFilterClick) {
    this.filters = filters;
    this.filterListElement = filterListElement;
    this.handleFilterClick = handleFilterClick;
    this.displayFilters();
    this.init();
  }

  displayFilters() {
    this.filters.forEach((filter) => {
      this.filterListElement.appendChild(filter.element);
      filter.element.addEventListener("click", () => {
        this.setActiveFilter(filter);
        this.handleFilterClick(filter);
      });
    });
  }

  setActiveFilter(filter) {
    this.activeFilter.disable();
    this.activeFilter = filter;
    this.activeFilter.activate();
  }

  init() {
    this.activeFilter = this.filters[0];
    this.activeFilter.activate();
  }

  reset() {
    this.setActiveFilter(this.filters[0]);
  }
}