const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

export const dateFormatted = date => date.toLocaleDateString("es", options);
