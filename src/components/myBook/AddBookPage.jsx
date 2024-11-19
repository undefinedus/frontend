import React, { useEffect, useState } from "react";
import PercentageBar from "../commons/PercentageBar";

const initBookInfo = {
  title: "혼자 공부하는 자바 - 1:1 과외하듯 배우는 프로그래밍 자습서",
  author: "신용권",
  rate: 3.8,
  totalPage: 520,
};

// 페이지 아님 페이지 입력하는 컴포넌트임
const AddBookPage = ({ state, bookInfo = initBookInfo }) => {
  const [pageInput, setPageInput] = useState(52);
  const percentage = Math.round((pageInput / bookInfo.totalPage) * 100);

  return (
    <div
      className={`${
        state === "중단한 책" ? "flex justify-between" : "flex flex-col"
      } w-full`}
    >
      <div className="flex justify-start text-und16 text-undtextdark font-bold mb-2.5">
        {state === "중단한 책" ? "중단한 페이지" : "읽은 페이지 수"}
      </div>
      <div className="flex justify-between items-center gap-1">
        <div className="w-full">
          <PercentageBar hasInner={false} leftValue={percentage} />
        </div>
        <div className="text-und14 text-undpoint">{`${percentage}%`}</div>
      </div>
      <div className="flex"></div>
    </div>
  );
};

export default AddBookPage;
