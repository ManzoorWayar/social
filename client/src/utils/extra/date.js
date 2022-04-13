export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getYears = () => {
  const currentYear = new Date().getUTCFullYear();

  return Array(currentYear - (currentYear - 50))
    .fill("")
    .map((totalYears, otherYears) => currentYear - otherYears);
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};
