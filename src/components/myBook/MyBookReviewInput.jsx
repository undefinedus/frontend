import React from "react";

const MyBookReviewInput = ({ state, oneLineReview, setReview }) => {
  const maxLength = 100;
  const placeholderText =
    state === "COMPLETED"
      ? "한 줄 평으로 책을 추억해 보세요!"
      : "책에 대한 한 줄 평을 남겨 보세요!";

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setReview(inputValue);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2.5">
      <div className="w-full flex items-center justify-between">
        <div className="text-und16 text-undtextdark font-bold">한 줄 평</div>
        <div className="text-und14 text-undtextgray font-bold">{`(${
          oneLineReview?.length || 0
        }/${maxLength}자)`}</div>
      </div>
      <div className="w-full h-24">
        <textarea
          className={`w-full h-full bg-undbgsub rounded-xl text-center snap-center content-center p-3 ${
            oneLineReview && "text-undtextgray"
          }`}
          placeholder={placeholderText}
          value={oneLineReview}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default MyBookReviewInput;
