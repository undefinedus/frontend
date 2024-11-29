import { useEffect, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

// 책 제목, 작가명 실시간 검색
const SearchBar = ({ searchHistory = null, placeholder, onChange }) => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 관리

  useEffect(() => {
    if (searchHistory) {
      setSearchKeyword(searchHistory);
    }
  }, [searchHistory]);

  const handleKeyUp = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full flex h-10 justify-center items-center bg-undbgmain">
      <div
        className="w-full h-full px-2 flex items-center justify-between border
    border-unddisabled rounded-full bg-white gap-2.5"
      >
        <PiMagnifyingGlass size={28} color="#78716C" />
        <input
          type="search"
          placeholder={placeholder}
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          onKeyUp={handleKeyUp}
          className="text-undtextdark text-und16 w-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
