import React from "react";

// hasInner : 퍼센트 바 안에 글자 넣을지 여부 (토론 기준 default 잡아놔서 그냥 쓰면 됨)
// leftValue : 왼쪽에 들어갈 % 값, 오른쪽 값은 100 - leftValue 할 예정
const PercentageBar = ({ hasInner = true, leftValue }) => {
  const rightValue = 100 - leftValue;

  // Colors based on the designs shown
  const leftColor = hasInner ? "bg-[#A0CDDF]" : "bg-[#7D5C4D]";
  const rightColor = hasInner ? "bg-[#DFA0B5]" : "bg-[#EEE9E4]";

  if (hasInner) {
    return (
      <div className="relative w-full h-4 rounded-md overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Left side */}
          <div
            className={`h-full z-10 flex items-center justify-start ps-1 text-white text-und12 font-extrabold ${leftColor}`}
            style={{ width: `${leftValue}%` }}
          >
            {leftValue}%
          </div>

          {/* Right side */}
          <div
            className={`h-full flex items-center justify-end pe-1 text-white text-und12 font-extrabold ${rightColor}`}
            style={{ width: `${rightValue}%` }}
          >
            {rightValue}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-1.5 flex rounded-full overflow-hidden">
      <div
        className={`h-full ${leftColor} rounded-e-full`}
        style={{ width: `${leftValue}%` }}
      />
      <div
        className={`h-full ${rightColor}`}
        style={{ width: `${rightValue}%` }}
      />
    </div>
  );
};

export default PercentageBar;
