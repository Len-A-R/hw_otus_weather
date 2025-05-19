import "./styles.css";

// Функция для создания элемента с заданными атрибутами и текстом
const createElement = (tag, attributes = {}, text = "") => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  if (text) element.innerText = text;
  return element;
};

// надходим основной элемент на странице
const app = document.querySelector(".app");

// секция для ввода города
const sectionInput = createElement("section", { class: "sectionInput" });
const cityEditor = createElement("input", {
  class: "cityEditor",
  type: "text",
  placeholder: "Weather",
});

const showButton = createElement("button", { class: "showButton" }, "Show");
sectionInput.appendChild(cityEditor);
sectionInput.appendChild(showButton);

// секция для отображения карты
const sectionMap = createElement("section", { class: "sectionMap" });

const MAPS_API_URL = "https://maps.googleapis.com/maps/api/staticmap";
const mapParams = {
  center: "Brooklyn+Bridge,New+York,NY",
  zoom: "13",
  size: "600x300",
  maptype: "roadmap",
  markers: [
    "color:blue%7Clabel:S%7C40.702147,-74.015794",
    "color:green%7Clabel:G%7C40.711614,-74.012318",
    "color:red%7Clabel:C%7C40.718217,-73.998284",
  ].join("&markers="),
  key: "AIzaSyD0_y22-Zy1-71-gq88z913496_7-958I",
};

const mapUrl = `${MAPS_API_URL}?${new URLSearchParams(mapParams)}`;

const cityMapImage = createElement("img", {
  class: "cityMapImage",
  src: mapUrl,
});
sectionMap.appendChild(cityMapImage);

// секция для отображения информации о погоде
const sectionWeather = createElement("section", { class: "sectionWeather" });
const weatherInfo = createElement(
  "p",
  { class: "weatherInfo" },
  "Weather info",
);
sectionWeather.appendChild(weatherInfo);

// секция для истории поиска
const sectionHistory = createElement("section", { class: "sectionHistory" });
const historyLabel = createElement(
  "label",
  { class: "historyLabel" },
  "History",
);
const historyLine = createElement("hr");
const historyList = createElement("ul");
//добавим в список элементы Moscow, London, New York
const historyListItems = ["Moscow", "London", "New York"];
historyListItems.forEach((item) => {
  const historyListItem = document.createElement("li");
  historyListItem.innerText = item;
  historyList.appendChild(historyListItem);
});

sectionHistory.appendChild(historyLabel);
sectionHistory.appendChild(historyLine);
sectionHistory.appendChild(historyList);

app.appendChild(cityEditor);
app.appendChild(showButton);
app.appendChild(cityMapImage);
app.appendChild(weatherInfo);
app.appendChild(sectionHistory);
