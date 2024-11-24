import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiStarFill } from "react-icons/pi";
import PercentageBar from "../commons/PercentageBar";
import AddBookRating from "../myBook/AddBookRating";
import useDateDiff from "../../hooks/useDateDiff";

// 책 카드형 목록
const BookCard = ({ book, onClick }) => {
  const { diffToday } = useDateDiff();
  // let differenceInDays = null;

  // if (book.startDate) {
  //   const today = new Date();
  //   const startDateObject = new Date(book.startDate);

  //   // 날짜만 비교 (시간 정보 제거)
  //   const todayDateOnly = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate()
  //   );
  //   const startDateOnly = new Date(
  //     startDateObject.getFullYear(),
  //     startDateObject.getMonth(),
  //     startDateObject.getDate()
  //   );

  //   // 날짜 차이 계산
  //   const differenceInMilliseconds =
  //     todayDateOnly.getTime() - startDateOnly.getTime();

  //   differenceInDays = Math.ceil(
  //     differenceInMilliseconds / (1000 * 60 * 60 * 24) + 1
  //   );
  // }

  const differenceInDays = diffToday(book.startDate);

  const state = book?.status || "WISH";

  return (
    <div
      className="py-5 border-b border-unddisabled first:pt-0 last:border-none last:pb-0"
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
          {state === "WISH" && (
            <>
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
            </>
          )}
          {(state === "COMPLETED" || state === "STOPPED") && (
            <p className="text-undtextgray text-und14 w-56 h-5 text-left truncate">
              {book.oneLineReview}
            </p>
          )}
          {(state === "READING" || state === "STOPPED") && (
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
          {state === "COMPLETED" && (
            <AddBookRating rating={book.myRating} noTitle={true} />
          )}
          {state === "READING" && (
            <p className="text-undtextgray text-und14 w-56 h-5 text-left truncate">
              {differenceInDays}일 동안 {book.updateCount}회 읽었어요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
