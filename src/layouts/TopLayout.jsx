import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { PiX } from "react-icons/pi";
import { PiCaretLeft, PiPlus, PiMagnifyingGlass } from "react-icons/pi";

// 제목만
export const OnlyTitle = ({ title, showLine = true }) => {
  return (
    <div
      className={`px-6 h-16 flex items-center relative ${
        showLine && "border-unddisabled border-b"
      }`}
    >
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
    </div>
  );
};

// 이전 버튼 + 제목
export const PrevTitle = ({ title, showLine = true }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`px-6 h-16 flex items-center relative ${
        showLine && "border-unddisabled border-b"
      }`}
    >
      {/* 이전 버튼 */}
      <button onClick={() => navigate(-1)} className="absolute left-6">
        <PiCaretLeft size={28} color="#51392F" />
      </button>
      {/* 제목 */}
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
    </div>
  );
};

// 이전 버튼 + 책 담기
export const PrevAddBook = ({ showLine = true }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`px-6 h-16 flex items-center relative ${
        showLine && "border-unddisabled border-b"
      }`}
    >
      {/* 이전 버튼 */}
      <button onClick={() => navigate(-1)} className="absolute left-6">
        <PiCaretLeft size={28} color="#51392F" />
      </button>

      {/* 책 담기 */}
      <button
        onClick={() => navigate(-1)}
        className="absolute right-6 flex items-center space-x-1.5"
      >
        <PiPlus size={28} color="#51392F" />
        <p className="font-bold text-undclickbrown text-base">책 담기</p>
      </button>
    </div>
  );
};

// 제목 + 검색 버튼
export const TitleSearch = ({ title, showLine = true }) => {
  return (
    <div
      className={`px-6 h-16 flex items-center relative ${
        showLine && "border-unddisabled border-b"
      }`}
    >
      {/* 제목 */}
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
      {/* 검색 버튼 */}
      <Link to="./searchbook" className="absolute right-6">
        <PiMagnifyingGlass size={28} color="#51392F" />
      </Link>
    </div>
  );
};
