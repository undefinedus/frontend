import React, { useEffect, useState } from "react";
import PercentageBar from "../commons/PercentageBar";

const initBookInfo = {
  title: "혼자 공부하는 자바 - 1:1 과외하듯 배우는 프로그래밍 자습서",
  author: "신용권",
  rate: 3.8,
  totalPage: 520,
};

// 페이지 아님 페이지 입력하는 컴포넌트임
const AddBookPage = ({ state, bookInfo = initBookInfo, setReady }) => {
  const [pageInput, setPageInput] = useState("");
  const percentage = Math.floor(
    ((pageInput === "" ? 0 : pageInput) / bookInfo.totalPage) * 100
  );

  useEffect(() => {
    if (pageInput > 0 && pageInput < bookInfo.totalPage) {
      setReady();
    }
  }, [pageInput]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setPageInput(value);
      return;
    }
    const parsedValue = parseInt(value, 10);
    if (parsedValue > 0 && parsedValue < bookInfo.totalPage) {
      setPageInput(parsedValue);
    }
  };

  return (
    <div
      className={`${
        state === "중단한 책"
          ? "flex justify-between items-center"
          : "flex flex-col"
      } w-full`}
    >
      <div className="flex justify-start text-und16 text-undtextdark font-bold">
        {state === "중단한 책" ? "중단한 페이지" : "읽은 페이지 수"}
      </div>
      {state === "읽고 있는 책" && (
        <div className="flex justify-between items-center gap-1 mt-2.5">
          <div className="w-full">
            <PercentageBar hasInner={false} leftValue={percentage} />
          </div>
          <div className="text-und14 text-undpoint">{`${percentage}%`}</div>
        </div>
      )}

      <div
        className={`flex items-center ${state === "읽고 있는 책" && "mt-1"}`}
      >
        <input
          type="number"
          placeholder="-"
          value={pageInput}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          className="w-16 h-6 text-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub"
        />
        <div className="text-und14 text-undtextgray">
          / {bookInfo.totalPage} 쪽
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
