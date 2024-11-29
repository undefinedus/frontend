import React, { useEffect, useState } from "react";
import DatePickerSlider from "../commons/DatePickerSlider";

const MyBookDateInput = ({ state, startDate, endDate, setDate }) => {
  const today = new Date().toISOString().split("T")[0];
  const [startDateInput, setStartDateInput] = useState();

  useEffect(() => {
    startDate === "today" && setDate("start", today);
    endDate === "today" && setDate("end", today);
  }, [startDate, endDate]);

  const handleDate = (where, date) => {
    setDate(where, date);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-start">
        <p className="text-und16 text-undtextdark font-bold">독서 기간</p>
      </div>
      <div className={`flex ${state !== "READING" && "gap-5"} mt-2.5`}>
        <div
          className={`flex ${
            state !== "READING"
              ? "flex-col w-1/2 gap-1"
              : "justify-between w-full"
          }`}
        >
          <div
            className={`${
              state !== "READING" ? "w-full" : "w-1/2"
            } flex justify-start text-und14 text-undtextgray font-bold`}
          >
            시작일
          </div>
          <div
            className={`${
              state !== "READING" ? "w-full mt-1" : "w-1/2"
            } flex justify-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub`}
          >
            <DatePickerSlider
              setDate={(date) => handleDate("start", date)}
              minDate={"1900-01-01"}
              maxDate={"today"}
            >
              <div className="w-full">
                {startDate === "today" ? today : startDate}
              </div>
            </DatePickerSlider>
          </div>
        </div>
        {state !== "READING" && (
          <div className={`flex flex-col w-1/2 gap-1`}>
            <div className="w-full flex justify-start text-und14 text-undtextgray font-bold">
              {state === "COMPLETED" ? "종료일" : "중단일"}
            </div>
            <div className="w-full mt-1 flex justify-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub">
              <DatePickerSlider
                setDate={(date) => handleDate("end", date)}
                minDate={startDate}
                maxDate={"today"}
              >
                <div className="w-full">
                  {endDate === "today" ? today : endDate}
                </div>
              </DatePickerSlider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookDateInput;
