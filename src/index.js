import "./styles.css";

const app = document.querySelector(".app");

const cityEditor = document.createElement("input");
cityEditor.setAttribute("id", "cityEditor");
cityEditor.setAttribute("type", "text");
cityEditor.setAttribute("placeholder", "Weather");

const showButton = document.createElement("button");
showButton.setAttribute("id", "showButton");
showButton.innerText = "Show";

const cityMapImage = document.createElement("img");
cityMapImage.setAttribute("id", "cityMapImage");
cityMapImage.setAttribute(
  "src",
  "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyD0_y22-Zy1-71-gq88z913496_7-958I",
);

const weatherInfo = document.createElement("p");
weatherInfo.setAttribute("id", "weatherInfo");
weatherInfo.innerText = "Weather info";

const historyListContainer = document.createElement("div");
historyListContainer.setAttribute("class", "historyListContainer");
const historyLabel = document.createElement("label");
historyLabel.innerText = "History";
const historyLine = document.createElement("hr");
const historyList = document.createElement("ul");
//добавим в список элементы Moscow, London, New York
const historyListItems = ["Moscow", "London", "New York"];
historyListItems.forEach((item) => {
  const historyListItem = document.createElement("li");
  historyListItem.innerText = item;
  historyList.appendChild(historyListItem);
});

historyListContainer.appendChild(historyLabel);
historyListContainer.appendChild(historyLine);
historyListContainer.appendChild(historyList);

app.appendChild(cityEditor);
app.appendChild(showButton);
app.appendChild(cityMapImage);
app.appendChild(weatherInfo);
app.appendChild(historyListContainer);
