import React, { useState } from "react";
import { PiMagnifyingGlass, PiBarcode } from "react-icons/pi";

// 책 제목, 작가명, ISBN으로 검색
export const IsbnBookSearch = ({ onSearchSubmit }) => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 관리
  // 검색 실행 처리
  const handleSearch = () => {
    onSearchSubmit(searchKeyword); // 상위 컴포넌트로 검색 실행
  };

  // 엔터키 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터키 입력 시 검색 실행
    }
  };

  return (
    <div className="flex h-10 justify-center items-center">
      <div
        className="w-72 h-full px-2.5 flex items-center justify-between border
    border-unddisabled rounded-full bg-white"
      >
        {/* 검색 버튼 */}
        <button onClick={handleSearch}>
          <PiMagnifyingGlass size={28} color="#78716C" />
        </button>
        {/* 검색어 입력 */}
        <input
          type="search"
          placeholder="책 제목, 작가명, ISBN으로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)} // 입력값 상태 업데이트
          onKeyDown={handleKeyDown} // 엔터키 이벤트 처리
          className="text-undtextdark text-und16 w-full pl-2.5"
        />
        {/* 바코드 버튼 */}
      </div>
      <button>
        <PiBarcode size={28} color="#78716C" />
      </button>
    </div>
  );
};
