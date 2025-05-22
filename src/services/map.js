// ======= РАБОТА С КАРТОЙ =======
const GEOCODER_API_KEY = "db731357-dfe6-4929-944b-b4ab85d8cddd";
const GEOCODER_API_URL = "https://geocode-maps.yandex.ru/1.x/";
const MAP_API_URL = "https://static-maps.yandex.ru/1.x/";

/**
 * Получает географические координаты для указанного города
 * @param {string} city - Название города
 * @returns {Promise<Object>} - Объект с координатами (долгота, широта)
 */
export const getMapUrl = (longitude, latitude) => {
  const mapParams = {
    l: "map",
    size: "450,450",
    z: "11",
    ll: `${longitude},${latitude}`,
    pt: `${longitude},${latitude},pm2rdm`,
  };

  return `${MAP_API_URL}?${new URLSearchParams(mapParams)}`;
};

/**
 * Получает географические координаты для указанного города
 * @param {string} city - Название города
 * @returns {Promise<Object>} - Объект с координатами (долгота, широта)
 */
export const getCoordinates = async (city) => {
  try {
    // Формируем URL для запроса
    const params = new URLSearchParams({
      apikey: GEOCODER_API_KEY,
      format: "json",
      geocode: city,
      results: 1, // Нам нужен только первый результат
    });

    const url = `${GEOCODER_API_URL}?${params}`;

    // Выполняем запрос к API
    const response = await fetch(url);

    // Проверяем успешность запроса
    if (!response.ok) {
      throw new Error(
        `Ошибка API геокодера: ${response.status} ${response.statusText}`,
      );
    }

    // Получаем данные в формате JSON
    const data = await response.json();

    // Проверяем наличие результатов
    const featureMembers = data.response.GeoObjectCollection.featureMember;
    if (!featureMembers || featureMembers.length === 0) {
      throw new Error(`Город "${city}" не найден`);
    }

    // Извлекаем координаты из ответа
    // Яндекс возвращает координаты в формате "долгота широта"
    const coordinates = featureMembers[0].GeoObject.Point.pos.split(" ");
    const geoObject = featureMembers[0].GeoObject;
    return {
      longitude: parseFloat(coordinates[0]),
      latitude: parseFloat(coordinates[1]),
      // Дополнительно можно вернуть полное название места
      fullName:
        featureMembers[0].GeoObject.metaDataProperty.GeocoderMetaData.text,
      // Добавляем краткое название населенного пункта
      shortName: geoObject.name,
    };
  } catch (error) {
    console.error("Ошибка при получении координат:", error);
    throw new Error(`Не удалось получить координаты для города ${city}`);
  }
};
