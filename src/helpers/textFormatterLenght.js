export const textFormatterLenght = (element, limit = 16) => {
  return element.length > limit
    ? element.substring(0, limit) + " ..."
    : element;
};
