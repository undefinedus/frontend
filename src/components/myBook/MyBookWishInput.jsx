import React from "react";
import { PiStarFill } from "react-icons/pi";

const MyBookWishInput = ({ book }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-3.5">
        <div className="flex justify-start text-und16 text-undtextdark font-bold">
          책 제목
        </div>
        <div className="flex justify-start text-und14 text-undtextgray">
          {book.title}
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex justify-start text-und16 text-undtextdark font-bold">
          저자
        </div>
        <div className="flex justify-end items-center text-und14 text-undtextgray">
          {book.author}
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex justify-start text-und16 text-undtextdark font-bold">
          평점
        </div>
        <div className="flex justify-end items-center text-und14 text-undtextgray gap-1">
          <PiStarFill color="#FFD400" size={20} />
          <p>{book.customerReviewRank / 2}</p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex justify-start text-und16 text-undtextdark font-bold">
          페이지 수
        </div>
        <div className="flex justify-end items-center text-und14 text-undtextgray gap-1">
          {book.itemPage}
        </div>
      </div>
    </div>
  );
};

export default MyBookWishInput;
