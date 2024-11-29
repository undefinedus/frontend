import React, { useEffect, useState } from "react";
import { PiCaretDown } from "react-icons/pi";

// 목록 아이템 개수 및 정렬
export const ItemCount = ({ count, unit }) => {
  return (
    <div className="w-24 h-6 ">
      <div className="flex h-full items-center justify-between">
        <p className="text-und14 text-undtextgray">
          {count}
          {unit}
        </p>
      </div>
    </div>
  );
};

// 정렬 드롭다운
export const SortDropdown = ({ onChange, option1, option2, activeOption }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  const [selectedOption, setSelectedOption] = useState(option1); // 정렬 기본값: option1

  useEffect(() => {
    if (activeOption) setSelectedOption(activeOption);
  }, [activeOption]);

  // 드롭다운 열고 닫는 핸들러
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 옵션 클릭 핸들러
  const handleOptionClick = (option) => {
    setSelectedOption(option); // 선택된 옵션 업데이트
    setIsOpen(false); // 드롭다운 닫기
    onChange(option); // 상위 컴포넌트로 선택된 값 전달
  };

  return (
    <div className="relative w-24 bg-undbgmain">
      {/* 선택된 옵션 및 드롭다운 토글 */}
      <div
        className="flex justify-end items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <p className="text-und14 text-undtextgray pr-0.5">{selectedOption}</p>
        <PiCaretDown size={24} color="#78716C" />
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute mt-1 w-24 bg-white border border-unddisabled rounded shadow-lg z-10">
          {/* 옵션1 */}
          <p
            className={`px-1 py-2 text-und14 text-undtextgray border-b border-unddisabled cursor-pointer hover:bg-unddisabled`}
            onClick={() => handleOptionClick(option1)}
          >
            {option1}
          </p>
          {/* 옵션2 */}
          <p
            className={`px-1 py-2 text-und14 text-undtextgray cursor-pointer hover:bg-unddisabled`}
            onClick={() => handleOptionClick(option2)}
          >
            {option2}
          </p>
        </div>
      )}
    </div>
  );
};
