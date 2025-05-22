export const createElement = (tag, attributes = {}, text = "") => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  if (text) element.innerText = text;
  return element;
};
