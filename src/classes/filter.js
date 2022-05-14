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
        this.handleFilterClick(filter.value);
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

export class Filter {
  constructor(label, value) {
    this.label = label;
    this.value = value;
    this.template = document.getElementById("filter-template");
    this.element = this.createElement();
  }

  createElement() {
    const filterFragment = this.template.content.cloneNode(true);
    const filterElement = filterFragment.querySelector(".filter");
    filterElement.textContent = this.label;
    return filterElement;
  }

  activate() {
    this.element.classList.add("filter--active");
    this.element.setAttribute("disabled", "");
  }

  disable() {
    this.element.classList.remove("filter--active");
    this.element.removeAttribute("disabled");
  }
}