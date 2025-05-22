import { createElement } from "../utils.js";

export class CityInput {
  constructor(onSearch) {
    this.onSearch = onSearch;
    this.element = this.render();
    this.setupEventListeners();
  }

  render() {
    const section = createElement("form", { class: "sectionInput" });

    this.input = createElement("input", {
      class: "cityEditor",
      type: "text",
      placeholder: "Введите название города",
    });

    this.button = createElement(
      "button",
      {
        class: "showButton",
        type: "button",
      },
      "Показать",
    );

    section.appendChild(this.input);
    section.appendChild(this.button);

    return section;
  }

  setupEventListeners() {
    this.button.addEventListener("click", () => {
      this.search();
    });

    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.search();
    });

    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.search();
      }
    });
  }

  search() {
    const city = this.input.value.trim();
    if (city) {
      this.onSearch(city);
    }
  }

  setCity(city) {
    this.input.value = city;
  }

  getCity() {
    return this.input.value.trim();
  }
}
