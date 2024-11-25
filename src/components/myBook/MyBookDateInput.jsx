import React, { useEffect } from "react";

const MyBookDateInput = ({ state, startDate, endDate, setDate }) => {
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    startDate === "today" && setDate("start", today);
    endDate === "today" && setDate("end", today);
  }, [startDate, endDate]);

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
            {startDate === "today" ? today : startDate}
          </div>
        </div>
        {state !== "READING" && (
          <div className={`flex flex-col w-1/2 gap-1`}>
            <div className="w-full flex justify-start text-und14 text-undtextgray font-bold">
              {state === "COMPLETED" ? "종료일" : "중단일"}
            </div>
            <div className="w-full mt-1 flex justify-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub">
              {endDate === "today" ? today : endDate}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookDateInput;
