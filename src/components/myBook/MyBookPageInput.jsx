import { useState } from "react";
import PercentageBar from "../commons/PercentageBar";

const MyBookPageInput = ({ state, currentPage, totalPage, setPage }) => {
  const percentage = Math.floor(
    ((currentPage === "" ? 0 : currentPage) / totalPage) * 100
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setPage(value);
      return;
    }
    const parsedValue = parseInt(value, 10);
    if (Number.isNaN(parsedValue)) {
      return; // 유효하지 않은 숫자 입력 무시
    }
    if (parsedValue > 0 && parsedValue < totalPage) {
      setPage(parsedValue);
    }
  };

  return (
    <div
      className={`${
        state === "STOPPED"
          ? "flex justify-between items-center"
          : "flex flex-col"
      } w-full`}
    >
      <div className="flex justify-start text-und16 text-undtextdark font-bold">
        {state === "STOPPED" ? "중단한 페이지" : "읽은 페이지 수"}
      </div>
      {state === "READING" && (
        <div className="flex justify-between items-center gap-2.5 mt-2.5">
          <div className="w-full">
            <PercentageBar hasInner={false} leftValue={percentage} />
          </div>
          <div className="text-und14 text-undpoint">{`${percentage}%`}</div>
        </div>
      )}

      <div className={`flex items-center ${state === "READING" && "mt-1"}`}>
        <input
          type="number"
          placeholder="-"
          value={currentPage}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          className="w-16 h-6 text-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub"
        />

        <div className="text-und14 text-undtextgray">/ {totalPage} 쪽</div>
      </div>
    </div>
  );
};

export default MyBookPageInput;
