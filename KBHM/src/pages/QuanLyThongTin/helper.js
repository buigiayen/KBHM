function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export const DateToStringDate = (date) => {
  return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join("/") + "";
};
