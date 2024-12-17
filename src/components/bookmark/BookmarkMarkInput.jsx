import { useState } from "react";

const BookmarkMarkInput = ({ mode, mark, setMark }) => {
  const [activatePlaceholder, setActivePlaceholder] = useState(mark === "");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 200) {
      setMark(inputValue);
    }
  };

  const handleActivatePlaceholder = (boolean) => {
    setActivePlaceholder(boolean);
  };

  return (
    <div className="relative w-full h-72 mt-1 rounded-xl">
      <textarea
        className={`w-full h-full bg-undbgsub px-6 py-10 rounded-xl text-center snap-center content-center ${
          mark && "text-undtextgray"
        } scroll-hide font-bookmark italic`}
        value={mark}
        onChange={handleChange}
        onFocus={() => handleActivatePlaceholder(false)}
        onBlur={() => handleActivatePlaceholder(mark === "")}
        readOnly={mode === "READ" || mode === "SOCIAL"}
      />
      {activatePlaceholder && (
        <div
          className="w-full absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-und14 text-undtextgray"
          style={{ pointerEvents: "none" }}
        >
          <p>책을 읽다 발견한</p>
          <p>소중한 한 줄로 채워보세요</p>
        </div>
      )}
      <div className="rounded-t-xl absolute top-0 start-0 flex justify-start items-center w-full h-10 bg-undbgsub">
        <img className="ml-3" src="/assets/img/DoubleQuotesLeft.png" />
      </div>
      <div className="rounded-b-xl absolute bottom-0 start-0 flex justify-end items-center w-full h-10 bg-undbgsub">
        <img className="mr-3" src="/assets/img/DoubleQuotesRight.png" />
      </div>
    </div>
  );
};

export default BookmarkMarkInput;
