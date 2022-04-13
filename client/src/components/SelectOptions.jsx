import React from "react";
import { months, getYears, getDaysInMonth } from "../utils/extra/date";

const SelectOptions = ({ month, days, year, changeYear }) => {
  return (
    <>
      {month &&
        months.map((value, index) => (
          <option key={index + 1} value={index}>
            {value}
          </option>
        ))}
      {days &&
        [...Array(getDaysInMonth(changeYear.year, changeYear.month + 1))].map(
          (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          )
        )}
      {year &&
        getYears().map((year, index) => (
          <option key={index + 1} value={year}>
            {year}
          </option>
        ))}
    </>
  );
};

export default SelectOptions;
