const WEATHER_API_KEY = "ce2efde41862706bd2d4973c702caa1b"; //'438a6126ddefed6f39f4f435f57043aa';
const WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"; //'https://api.openweathermap.org/data/3.0/onecall';

/**
 * Получает данные о погоде для указанного города
 * @param {object} coord - Координаты местности
 * @param {string} city - Название города
 * @returns {Promise<Object>} - Объект с данными о погоде
 */
export const getWeatherData = async (coord, city) => {
  try {
    // Формируем URL для запроса
    const params = new URLSearchParams({
      lat: coord.lat,
      lon: coord.lon,
      appid: WEATHER_API_KEY,
      units: "metric", // Температура в градусах Цельсия
      lang: "ru", // Описание погоды на русском языке
    });

    const url = `${WEATHER_API_URL}?${params}`;

    // Выполняем запрос к API
    const response = await fetch(url);

    // Проверяем успешность запроса
    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
    }

    // Получаем данные в формате JSON
    const data = await response.json();

    // Формируем объект с нужными данными
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: Math.round(data.main.pressure * 0.75), // Переводим из гПа в мм рт.ст.
      windSpeed: data.wind.speed,
      windDirection: getWindDirection(data.wind.deg),
      condition: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      city: data.name,
      country: data.sys.country,
    };
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
    throw new Error(`Не удалось получить данные о погоде для города ${city}`);
  }
};

/**
 * Преобразует угол направления ветра в текстовое описание
 * @param {number} degrees - Угол в градусах
 * @returns {string} - Текстовое описание направления ветра
 */
const getWindDirection = (degrees) => {
  const directions = [
    "северный",
    "северо-восточный",
    "восточный",
    "юго-восточный",
    "южный",
    "юго-западный",
    "западный",
    "северо-западный",
  ];

  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};
