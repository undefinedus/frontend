import React, { useEffect, useState } from "react";
import MobileDatePicker from "react-mobile-datepicker";

// chlidren : pages/myBook/MyBookShelfPage.jsx 참고
// date, setDate : 날짜 저장할 state (부모 컴포넌트에 선언)
// minDate, maxDate : 최소 / 최대 날짜 제한값, "YYYY-MM-DD" 형식 String 으로
const DatePickerSlider = ({ children, date, setDate, minDate, maxDate }) => {
  const parsedMinDate = minDate ? new Date(minDate) : new Date("1900-01-01");
  const parsedMaxDate =
    maxDate && maxDate !== "today" ? new Date(maxDate) : new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() =>
    date && !isNaN(new Date(date)) ? new Date(date) : new Date()
  );

  const handleSelect = (date) => {
    // console.log("datedfsssssssssss", date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    setSelectedDate(date);
    setDate(`${year}-${month}-${day}`); // YYYY-MM-DD 형식
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <span onClick={() => setIsOpen(true)}>{children}</span>
      <MobileDatePicker
        isOpen={isOpen}
        theme="default"
        value={selectedDate}
        min={parsedMinDate}
        max={parsedMaxDate}
        showHeader={false}
        confirmText="확인"
        cancelText="취소"
        onSelect={handleSelect}
        onCancel={() => setIsOpen(false)}
      />
    </div>
  );
};

export default DatePickerSlider;
