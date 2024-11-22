import React from "react";
import BookCard from "./BookCard";

// 책 카드형 목록
const BookList = ({ books, onCardClick }) => {
  return (
    <div className="py-4 w-full">
      {books.map((book, index) => (
        <BookCard
          key={index}
          book={book}
          onClick={() => onCardClick(book)} // 클릭 이벤트 전달
        />
      ))}
    </div>
  );
};

export default BookList;
