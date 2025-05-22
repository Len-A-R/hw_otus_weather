import { createElement } from "../utils.js";
import { getWeatherData } from "../services/weather.js";

export class WeatherInfo {
  constructor() {
    this.element = this.render();
  }

  render() {
    const section = createElement("section", { class: "sectionWeather" });

    this.info = createElement(
      "p",
      { class: "weatherInfo" },
      "Информация о погоде",
    );

    section.appendChild(this.info);

    return section;
  }

  setLoading(city) {
    this.info.innerText = `Загрузка данных для города ${city}...`;
  }

  setError(city) {
    this.info.innerText = `Ошибка при загрузке данных для города ${city}`;
  }

  async updateWeather(coordinates, city) {
    try {
      const weather = await getWeatherData(
        {
          lat: coordinates.latitude,
          lon: coordinates.longitude,
        },
        city,
      );

      this.info.innerText = `Город: ${city}
Температура: ${weather.temp}°C
Погода: ${weather.condition}`;

      return true;
    } catch (error) {
      this.setError(city);
      console.error(error);
      return false;
    }
  }
}
