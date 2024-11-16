import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./Calendar.css";

const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const Calendar = ({
  id,
  labeltext,
  className,
  name,
  onChange,
  onDateSelect,
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);

  const LeftArrow = ({ fill }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18L9 12L15 6"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const RightArrow = ({ fill }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18L15 12L9 6"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  useEffect(() => {
    const currentDate = new Date();
    const fourteenYearsAgo = new Date(
      currentDate.getFullYear() - 14,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    setMaxDate(fourteenYearsAgo);

    const minYear = 1900;
    const maxYear = currentDate.getFullYear() - 14;
    const years = Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => maxYear - i
    );
    setAvailableYears(years);
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // ISO 형식으로 변경
  };

  const is14YearsOld = (date) => {
    if (!date || !maxDate) return false;
    return date <= maxDate;
  };

  const handleDateChange = (date) => {
    if (date && !is14YearsOld(date)) {
      alert("만 14세 이상만 가입할 수 있습니다.");
      return;
    }

    setSelectedDate(date);

    if (onChange) {
      onChange({
        target: {
          value: formatDate(date),
          name,
        },
      });
    }

    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <div className="text-start w-full">
      <label className="text-undtextdark flex justify-between" htmlFor={id}>
        <div>{labeltext}</div>
        <div className="text-sm">{children}</div>
      </label>
      <div className="w-full">
        <DatePicker
          formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
          dateFormat="yyyy-MM-dd"
          shouldCloseOnSelect
          minDate={new Date("1900-01-01")}
          maxDate={maxDate}
          selected={selectedDate}
          onChange={handleDateChange}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={availableYears.length}
          peekNextMonth
          showMonthDropdown
          dropdownMode="select"
          wrapperClassName="w-full"
          className={`block p-2.5 w-full rounded-full ${className || ""}`}
          placeholderText="생년월일을 선택해주세요"
          dayClassName={(d) => {
            if (!is14YearsOld(d)) {
              return "text-gray-400 cursor-not-allowed line-through w-9 h-9 flex items-center justify-center";
            }
            return d.getDate() === selectedDate?.getDate()
              ? "text-white rounded-full w-9 h-9 flex items-center justify-center"
              : "text-white hover:bg-white/10 rounded-full w-9 h-9 flex items-center justify-center";
          }}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex justify-center items-center bg-undpoint ">
              <div className="flex justify-around w-full gap-3">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  className={`w-8 h-8 p-1 rounded-full ${
                    prevMonthButtonDisabled
                      ? "cursor-default bg-unddisabled"
                      : "bg-undpoint"
                  }`}
                  disabled={prevMonthButtonDisabled}
                >
                  <LeftArrow
                    fill={prevMonthButtonDisabled ? "#A68171" : "#ffffff"}
                  />
                </button>
                <div className="flex items-center justify-around w-1/2">
                  <select
                    value={date.getFullYear()}
                    className="bg-undpoint text-white border-none text-base font-medium cursor-pointer rounded-full px-1 py-1 mr-3"
                    onChange={({ target: { value } }) =>
                      changeYear(Number(value))
                    }
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={date.getMonth()}
                    className="bg-undpoint text-white border-none text-base font-medium cursor-pointer rounded-full px-1 py-1"
                    onChange={({ target: { value } }) =>
                      changeMonth(Number(value))
                    }
                  >
                    {MONTHS.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={increaseMonth}
                  className={`w-8 h-8 p-1 rounded-full ${
                    nextMonthButtonDisabled
                      ? "cursor-default bg-undpoint"
                      : "bg-undpoint"
                  }`}
                  disabled={nextMonthButtonDisabled}
                >
                  <RightArrow
                    fill={nextMonthButtonDisabled ? "#A68171" : "#ffffff"}
                  />
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

Calendar.propTypes = {
  id: PropTypes.string,
  labeltext: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onDateSelect: PropTypes.func,
  children: PropTypes.node,
};

export default Calendar;
