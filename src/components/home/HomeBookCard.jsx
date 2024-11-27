import React from "react";

const HomeBookCard = ({ book, onClick }) => {
  // 두 번째 카테고리만 추출
  const getCategoryName = () => {
    const categories = book.categoryName.split(">"); // '>'를 기준으로 문자열 나눔
    return categories[1] ? categories[1].trim() : ""; // 두 번째 항목 반환 (없으면 빈 문자열)
  };

  // 저자 이름에서 괄호 앞까지만 추출
  const getAuthorName = () => {
    return book.author.split("(")[0].trim(); // '(' 앞부분만 반환
  };

  // 출판사 이름에서 괄호 앞까지만 추출
  const getpublisher = () => {
    return book.publisher.split("(")[0].trim(); // '(' 앞부분만 반환
  };

  // 순위 배경색
  const getBackgroundClass = (rank) => {
    if (rank === 1) return "bg-undgold opacity-100";
    if (rank === 2) return "bg-undsilver opacity-100";
    if (rank === 3) return "bg-undbronze opacity-100";
    return "bg-black opacity-65";
  };

  return (
    <div
      className="w-full flex flex-col first:pt-0 last:border-none last:pb-0"
      onClick={() => {
        console.log("HomeBookCard onClick triggered"); // 디버깅
        onClick();
      }} // 클릭 이벤트 적용
    >
      <div className="flex flex-col items-center">
        <div className="w-28 h-40 mb-2.5 relative">
          {/* 책 표지 */}
          {book.bestRank && (
            <p
              className={`absolute top-1.5 right-1.5 w-8 h-6 font-extrabold text-white rounded-full text-und12 flex items-center justify-center ${getBackgroundClass(
                Number(book.bestRank)
              )}`}
            >
              {book.bestRank}위
            </p>
          )}
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* 책 정보 */}
        <div className="flex flex-col">
          {/* 카테고리 */}
          <p className="text-undtextgray text-und14 font-bold truncate text-left pb-1">
            {getCategoryName()}
          </p>
          {/* 제목 */}
          <p className="text-undtextdark text-und14 text-left h-11 font-bold line-clamp-2 pb-1">
            {book.title}
          </p>
          {/* 저자 및 출판사 */}
          <p className="text-undtextgray text-und14 text-left font-bold line-clamp-1">
            {getAuthorName()} · {getpublisher()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeBookCard;
