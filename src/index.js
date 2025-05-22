import "./styles.css";
import { CityInput } from "./components/CityInput.js";
import { WeatherMap } from "./components/WeatherMap.js";
import { WeatherInfo } from "./components/WeatherInfo.js";
import { SearchHistory } from "./components/SearchHistory.js";
import { getCoordinates } from "./services/map.js";

class WeatherApp {
  constructor() {
    this.app = document.querySelector(".app");
    this.initComponents();
    this.mountComponents();
    this.loadCurrentLocation();
  }

  initComponents() {
    // Инициализация компонентов с передачей колбэков
    this.cityInput = new CityInput(this.searchCity.bind(this));
    this.weatherMap = new WeatherMap();
    this.weatherInfo = new WeatherInfo();
    this.searchHistory = new SearchHistory(
      this.selectCityFromHistory.bind(this),
    );
  }

  mountComponents() {
    // Добавление компонентов на страницу
    this.app.appendChild(this.cityInput.element);
    this.app.appendChild(this.weatherMap.element);
    this.app.appendChild(this.weatherInfo.element);
    this.app.appendChild(this.searchHistory.element);
  }

  async searchCity(city) {
    this.weatherInfo.setLoading(city);

    try {
      const coordinates = await getCoordinates(city);

      // Обновляем карту
      this.weatherMap.updateMap(coordinates.longitude, coordinates.latitude);

      // Обновляем информацию о погоде
      const success = await this.weatherInfo.updateWeather(coordinates, city);

      if (success) {
        // Добавляем город в историю
        this.searchHistory.addCity(coordinates.shortName || city);
      }
    } catch (error) {
      this.weatherInfo.setError(city);
      console.error(error);
    }
  }

  selectCityFromHistory(city) {
    this.cityInput.setCity(city);
    this.searchCity(city);
  }

  loadCurrentLocation() {
    // Проверяем поддержку геолокации в браузере
    if (navigator.geolocation) {
      // Показываем сообщение о получении местоположения
      this.weatherInfo.info.innerText = "Определение вашего местоположения...";

      // Запрашиваем текущие координаты
      navigator.geolocation.getCurrentPosition(
        // Успешное получение координат
        async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Текущие координаты:", latitude, longitude);

            // Обновляем карту с текущими координатами
            this.weatherMap.updateMap(longitude, latitude);

            // Получаем название места по координатам (обратное геокодирование)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            );

            if (!response.ok) {
              throw new Error("Ошибка при определении местоположения");
            }

            const data = await response.json();
            const cityName =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              "Неизвестное местоположение";

            console.log("Определенное местоположение:", cityName);

            // Устанавливаем название города в поле ввода
            this.cityInput.setCity(cityName);

            // Получаем и отображаем данные о погоде
            await this.weatherInfo.updateWeather(
              { latitude, longitude },
              cityName,
            );

            // Добавляем город в историю
            this.searchHistory.addCity(cityName);
          } catch (error) {
            console.error("Ошибка при обработке местоположения:", error);
            this.loadDefaultCity(); // Загружаем данные для Москвы в случае ошибки
          }
        },
        // Ошибка получения координат
        (error) => {
          console.error("Ошибка геолокации:", error);
          this.loadDefaultCity(); // Загружаем данные для Москвы в случае ошибки
        },
        // Опции геолокации
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      // Если геолокация не поддерживается
      console.log("Геолокация не поддерживается вашим браузером");
      this.loadDefaultCity(); // Загружаем данные для Москвы
    }
  }
  loadDefaultCity() {
    const defaultCity = "Москва";
    this.cityInput.setCity(defaultCity);
    this.searchCity(defaultCity);
  }
}

// Запускаем приложение при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
  new WeatherApp();
});
