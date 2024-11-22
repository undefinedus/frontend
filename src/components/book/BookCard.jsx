import React from "react";
import { useNavigate } from "react-router-dom";
import { PiStarFill } from "react-icons/pi";

// 책 카드형 목록
const BookCard = ({ book, onClick }) => {
  return (
    <div
      className="w-full py-5 border-b border-unddisabled first:pt-0 last:border-none last:pb-0"
      onClick={onClick} // 클릭 이벤트 적용
    >
      <div className="flex items-start w-80 h-24 justify-between ">
        {/* 책 표지 */}
        <div className="w-16 h-24 object-contain flex-shrink-0">
          <img src={book.cover} alt={book.title} className="w-full h-full" />
        </div>

        {/* 책 정보 */}
        <div className="flex flex-col h-full justify-between">
          {/* 제목 */}
          <p className="text-undtextdark text-und14 font-bold w-56 h-5 text-left truncate">
            {book.title}
          </p>
          {/* 저자 */}
          <p className="text-undtextgray text-und14 w-56 h-5 text-left truncate">
            {book.author}
          </p>
          {/* 출판사 */}
          <p className="text-undtextgray text-und14 w-56 h-5 text-left truncate">
            {book.publisher}
          </p>
          {/* 평점 */}
          <div className="flex items-center w-56 h-5">
            <PiStarFill size={20} color="#FFD400" />
            <p className="ml-1 text-undtextgray text-und14 ">
              {Number(book.customerReviewRank) / 2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
