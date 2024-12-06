import React, { useEffect, useState } from "react";
import DatePicker from "react-mobile-datepicker";

const TimePickerSlider = ({ children, time, setTime, minTime, maxTime }) => {
  const [isOpen, setIsOpen] = useState(false); // DatePicker 열기/닫기 상태
  const [selectedTime, setSelectedTime] = useState(() =>
    time && !isNaN(new Date(time)) ? new Date(time) : new Date()
  ); // 선택된 시간 저장
  const updateDatePart = (dateObject, newDateString) => {
    const [year, month, day] = newDateString.split("-").map(Number); // time의 yyyy-mm-dd를 분해
    const updatedDate = new Date(dateObject); // 기존 dateObject 복사
    updatedDate.setFullYear(year, month - 1, day); // 년, 월, 일 업데이트
    return updatedDate;
  };

  const parsedMinTime = updateDatePart(new Date(minTime), time);
  const parsedMaxTime = updateDatePart(new Date(maxTime), time);
  // 사용자 정의 시간 설정 (시간과 분만 표시, 분은 00과 30만 표시)
  const dateConfig = {
    hour: {
      format: "hh",
      step: 1,
    },
    minute: {
      format: "mm",
      step: 1,
    },
  };

  useEffect(() => {
    console.log("민타임:", minTime, "맥스타임:", maxTime);
    console.log("파스민타임:", parsedMinTime, "파스맥스타임:", parsedMaxTime);
    console.log("타임:", time);
  }, [minTime, maxTime, time]);

  const handleSelect = (time) => {
    setSelectedTime(time);

    // 선택된 시간과 분을 `HH:mm` 형식으로 변환
    const hours = time.getHours();
    const minutes = time.getMinutes();
    setTime(`${String(hours).padStart(2, "0")}:${minutes}`);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <span onClick={() => setIsOpen(true)}>{children}</span>
      <DatePicker
        isOpen={isOpen}
        theme="default"
        value={selectedTime}
        dateConfig={{
          ...dateConfig,
        }}
        min={parsedMinTime}
        max={parsedMaxTime}
        showHeader={false}
        confirmText="확인"
        cancelText="취소"
        onSelect={handleSelect}
        onCancel={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TimePickerSlider;
