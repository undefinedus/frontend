import React, { useState } from "react";

const AddBookReview = ({ state }) => {
  const [textInput, setTextInput] = useState("");
  const maxLength = 100;
  const placeholderText =
    state === "다 읽은 책"
      ? "한 줄 평으로 책을 추억해 보세요!"
      : "책에 대한 한 줄 평을 남겨 보세요!";

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setTextInput(inputValue);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2.5">
      <div className="w-full flex items-center justify-between">
        <div className="text-und16 text-undtextdark font-bold">한 줄 평</div>
        <div className="text-und14 text-undtextgray font-bold">{`(${textInput.length}/${maxLength}자)`}</div>
      </div>
      <div className="w-full h-24">
        <textarea
          className="w-full h-full bg-undbgsub rounded-xl text-center snap-center content-center p-3"
          placeholder={placeholderText}
          value={textInput}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AddBookReview;
