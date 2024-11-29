import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiStarFill } from "react-icons/pi";
import PercentageBar from "../commons/PercentageBar";
import useDateDiff from "../../hooks/useDateDiff";
import DrawMyRating from "./DrawMyRating";
import useBookStatus from "../../hooks/useBookStatus";

// 책 카드형 목록
const BookCard = ({ book, onClick, infoOnly = false, withIcon = false }) => {
  const { diffToday } = useDateDiff();
  const { getIconByStatus } = useBookStatus();

  const differenceInDays = diffToday(book.startDate);

  const state = book?.status || "WISH";

  return (
    <div
      className="w-full py-5 border-b border-unddisabled first:pt-0 last:border-none last:pb-0"
      onClick={onClick} // 클릭 이벤트 적용
    >
      <div className="flex items-start w-80 h-24 justify-between">
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
          {(state === "WISH" || infoOnly) && (
            <div>
              {/* 출판사 */}
              <p className="text-undtextgray text-und14 w-56 h-5 text-left truncate">
                {book.publisher}
              </p>
              {/* 평점 */}
              <div
                className={`flex items-center ${
                  withIcon ? "justify-between" : "justify-start"
                }`}
              >
                <div className={`flex items-center h-5 `}>
                  <PiStarFill size={20} color="#FFD400" />
                  <p className="ml-1 text-undtextgray text-und14 ">
                    {Number(book.customerReviewRank) / 2}
                  </p>
                </div>
                <div>{getIconByStatus(book.status)}</div>
              </div>
            </div>
          )}
          {!infoOnly && (state === "COMPLETED" || state === "STOPPED") && (
            <p className="text-undtextgray text-und14 w-56 h-5 text-left truncate">
              {book.oneLineReview}
            </p>
          )}
          {!infoOnly && (state === "READING" || state === "STOPPED") && (
            <div className="flex justify-between items-center gap-1.5">
              <div className="w-full">
                <PercentageBar
                  hasInner={false}
                  leftValue={Math.floor(
                    (book.currentPage / book.itemPage) * 100
                  )}
                />
              </div>
              <div className="text-und14 text-undpoint">{`${Math.floor(
                (book.currentPage / book.itemPage) * 100
              )}%`}</div>
            </div>
          )}
          {!infoOnly && state === "COMPLETED" && (
            <div className="flex gap-0.5">
              <DrawMyRating myRating={book.myRating} />
            </div>
          )}
          {!infoOnly && state === "READING" && (
            <div
              className={`flex ${
                withIcon ? "justify-between" : "justify-start"
              }`}
            >
              <p className="text-undtextgray text-und14 w-56 h-5 text-left truncate">
                {differenceInDays}일 동안 {book.updateCount}회 읽었어요!
              </p>
              {withIcon && <p>{getIconByStatus(book.status)}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
