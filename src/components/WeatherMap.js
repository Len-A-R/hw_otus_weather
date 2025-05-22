import { createElement } from "../utils.js";
import { getMapUrl } from "../services/map.js";

export class WeatherMap {
  constructor() {
    this.element = this.render();
  }

  render() {
    const section = createElement("section", { class: "sectionMap" });

    this.image = createElement("img", {
      class: "cityMapImage",
      alt: "Карта города",
    });

    section.appendChild(this.image);

    return section;
  }

  updateMap(longitude, latitude) {
    this.image.src = getMapUrl(longitude, latitude);
  }
}
