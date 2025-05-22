// ======= УПРАВЛЕНИЕ ДАННЫМИ =======
const STORAGE_KEY = "weatherSearchHistory";

export const getSearchHistory = () => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : ["Москва", "Лондон", "Нью-Йорк"];
};

export const saveSearchHistory = (city) => {
  let history = getSearchHistory();

  // Если город уже есть в истории, перемещаем его в начало
  const index = history.indexOf(city);
  if (index !== -1) {
    history.splice(index, 1);
  }

  // Добавляем город в начало списка
  history.unshift(city);

  // Ограничиваем историю до 5 элементов
  history = history.slice(0, 10);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
};
