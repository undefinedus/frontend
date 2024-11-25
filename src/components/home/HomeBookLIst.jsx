import React from "react";
import HomeBookCard from "./HomeBookCard";

// AI추천 도서 10개 목록
const HomeBooksList = ({ books, onCardClick }) => {
  console.log("HomeBooksList books:", books); // 디버깅
  console.log("HomeBooksList onCardClick:", onCardClick); // 디버깅

  return (
    <div>
      <div className="flex flex-low overflow-x-auto w-full items-baseline gap-4 pr-6">
        {books.map((book, index) => (
          <HomeBookCard
            key={index}
            book={book}
            onClick={() => onCardClick(book)} // 클릭 이벤트 전달
          />
        ))}
      </div>
    </div>
  );
};
export default HomeBooksList;
