import React from "react";

const BookmarkPageInput = ({ page, setPage, totalPage }) => {
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
    if (parsedValue > 0 && parsedValue <= totalPage) {
      setPage(parsedValue);
    }
  };

  return (
    <div className="flex gap-0.5 items-center">
      <input
        type="number"
        placeholder="-"
        value={page === 0 ? "-" : page}
        onChange={handleInputChange}
        onFocus={(e) => e.target.select()}
        className="w-16 h-6 text-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub"
      />
      <p className="text-und14 text-undtextgray">쪽</p>
    </div>
  );
};

export default BookmarkPageInput;
