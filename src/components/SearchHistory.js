import { createElement } from "../utils.js";
import { getSearchHistory, saveSearchHistory } from "../services/history.js";

export class SearchHistory {
  constructor(onCitySelect) {
    this.onCitySelect = onCitySelect;
    this.element = this.render();
    this.updateDisplay();
  }

  render() {
    const section = createElement("section", { class: "sectionHistory" });

    const label = createElement(
      "label",
      { class: "historyLabel" },
      "История поиска",
    );
    const line = createElement("hr");
    this.list = createElement("ul", { class: "historyList" });

    section.appendChild(label);
    section.appendChild(line);
    section.appendChild(this.list);

    return section;
  }

  updateDisplay() {
    this.list.innerHTML = "";

    getSearchHistory().forEach((city) => {
      const item = createElement("li", { class: "history-item" }, city);

      item.addEventListener("click", () => {
        this.onCitySelect(city);
      });

      this.list.appendChild(item);
    });
  }

  addCity(city) {
    saveSearchHistory(city);
    this.updateDisplay();
  }
}
