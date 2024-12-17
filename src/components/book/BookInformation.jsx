import React from "react";
import { PiStarFill, PiArrowSquareOut } from "react-icons/pi";
import he from "he";

// 책 정보(저자, 출판사, 평점, 책 소개, 더 알아보기) 컴포넌트
const BookInformation = ({ book, hasDescription = true }) => {
  const { author, publisher, customerReviewRank, fullDescription, link } = book; // book 객체에서 필요한 값 구조 분해

  const handleLinkClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer"); // 새 탭에서 링크 열기
    }
  };

  return (
    <div className="flex flex-col items-start px-6 gap-4">
      {/* 저자 */}
      <div className="flex">
        <p className="w-14 text-und14 text-left font-bold text-undtextdark flex-shrink-0">
          저자
        </p>
        <p className="text-und14 text-left text-undtextgray">{author}</p>
      </div>
      {/* 출판사 */}
      <div className="flex">
        <p className="w-14 text-und14 text-left font-bold text-undtextdark">
          출판사
        </p>
        <p className="text-und14 text-left text-undtextgray">{publisher}</p>
      </div>
      {/* 평점 */}
      <div className="flex">
        <p className="w-14 text-und14 text-left font-bold text-undtextdark">
          평점
        </p>
        <div className="flex w-56 h-5">
          <PiStarFill size={20} color="#FFD400" />
          <p className="ml-1 text-undtextgray text-und14 ">
            {Number(customerReviewRank) / 2}
          </p>
        </div>
      </div>
      {hasDescription && (
        //책 소개
        <div className="">
          {/* 고정된 너비의 "책 소개" 라벨 */}
          <p className="w-14 text-und14 text-left font-bold text-undtextdark flex-shrink-0 pb-1">
            책 소개
          </p>
          {/* /* 내용이 길어질 경우 줄 바꿈 및 overflow 처리 */}
          <p className="text-und14 text-left text-undtextgray">
            {he
              .decode(fullDescription || "")
              .split(/<br\s*\/?>/i)
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </div>
      )}

      {/* 더 알아보기 */}
      <div className="flex flex-col gap-2 cursor-pointer justify-between">
        <div className="flex" onClick={handleLinkClick}>
          <p className="text-und14 text-left font-bold text-undpoint pr-1">
            더 알아보기
          </p>
          <PiArrowSquareOut size={20} color="#7D5C4D" />
        </div>
        {/* <p className="text-und12 text-right font-bold text-undtextgray">
          도서 api 제공 : 알라딘
        </p> */}
      </div>
    </div>
  );
};

export default BookInformation;
