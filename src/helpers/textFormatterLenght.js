export const textFormatterLenght = (element, limit = 16) => {
  return element.trim().length > limit
    ? element.substring(0, limit) + " ..."
    : element;
};
