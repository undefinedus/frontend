import React, { Children, useEffect } from "react";
import { Link } from "react-router-dom";
// import { PiX } from "react-icons/pi";
import {
  PiCaretLeftBold,
  PiPlusBold,
  PiMagnifyingGlass,
  PiBookOpenTextFill,
  PiBookBookmarkFill,
  PiBookFill,
  PiPauseFill,
  PiInfo,
} from "react-icons/pi";

// 제목만
export const OnlyTitle = ({ title, showLine = true }) => {
  return (
    <div
      className={`h-16 flex items-center relative ${
        showLine && "border-unddisabled border-b px-6"
      }`}
    >
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
    </div>
  );
};

// 이전 버튼 + 제목
export const PrevTitle = ({ title, showLine = true, onClick }) => {
  return (
    <div
      className={`h-16 flex items-center relative px-6 ${
        showLine && "border-unddisabled border-b"
      } bg-undbgmain`}
    >
      {/* 이전 버튼 */}
      <button onClick={onClick} className="absolute">
        <PiCaretLeftBold size={28} color="#51392F" />
      </button>
      {/* 제목 */}
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
    </div>
  );
};

// 이전 버튼 + 책 담기
export const PrevAddBook = ({
  showLine = true,
  onClick,
  onAddBook,
  status,
}) => {
  useEffect(() => {
    console.log("*****book.status", status);
  });
  return (
    <div
      className={`h-16 flex items-center justify-between relative ${
        showLine && "border-unddisabled border-b px-6"
      }`}
    >
      {/* 이전 버튼 */}
      <button onClick={onClick} className="flex">
        <PiCaretLeftBold size={28} color="#51392F" />
      </button>

      {/* 책 담기 */}
      {status === null && (
        <button
          onClick={onAddBook}
          className="flex items-center justify-end gap-1 right-0"
        >
          <PiPlusBold size={28} color="#51392F" />
          <p className="text-right font-bold text-undclickbrown text-und18">
            책 담기
          </p>
        </button>
      )}
      {status === "COMPLETED" && (
        <div className="right-0 flex items-center">
          <PiBookFill size={28} color="#51392F" />
        </div>
      )}
      {status === "WISH" && (
        <div className="right-0 flex items-center">
          <PiBookBookmarkFill size={28} color="#51392F" />
        </div>
      )}
      {status === "READING" && (
        <div className="right-0 flex items-center">
          <PiBookOpenTextFill size={28} color="#51392F" />
        </div>
      )}
      {status === "STOPPED" && (
        <div className="right-0 flex items-center">
          <PiPauseFill size={28} color="#51392F" />
        </div>
      )}
    </div>
  );
};

// 제목 + 검색 버튼
export const TitleSearch = ({ title, showLine = true }) => {
  return (
    <div
      className={`h-16 flex items-center justify-start relative ${
        showLine && "border-unddisabled border-b px-6"
      }`}
    >
      {/* 제목 */}
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
      {/* 검색 버튼 */}
      <Link to="./searchbook" replace={true} className="absolute right-6">
        <PiMagnifyingGlass size={28} color="#51392F" />
      </Link>
    </div>
  );
};

export const CommonTopLayout = ({ title, showLine, onClick, chlidren }) => {
  return (
    <div
      className={`h-16 flex justify-between items-center w-full ${
        showLine && "border-unddisabled border-b"
      } bg-undbgmain`}
    >
      {/* 이전 버튼 */}
      <div className="w-1/3 flex justify-start pl-8 ">
        <button onClick={onClick}>
          <PiCaretLeftBold size={28} color="#51392F" />
        </button>
      </div>
      {/* 제목 */}
      <div className="flex justify-center items-center font-bold text-undclickbrown text-xl mx-auto w-1/3">
        {title}
      </div>
      <div className="w-1/3 flex justify-end pr-6">
        <PiInfo size={28} />
      </div>
      <div>{chlidren}</div>
    </div>
  );
};
