import React from "react";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";

// 책 카드형 목록
const BookList = ({ books, onCardClick }) => {
  // const navigate = useNavigate();

  // 카드 클릭 시 상세 페이지로 이동
  // const handleCardClick = () => {
  //   navigate(`detail/${isbn13}`);
  // };

  return (
    <div className="py-4">
      {books.map((book, index) => (
        <BookCard
          key={index}
          cover={book.cover}
          title={book.title}
          author={book.author}
          publisher={book.publisher}
          customerReviewRank={book.customerReviewRank}
          isbn13={book.isbn13}
          onClick={() => onCardClick(book)} // 클릭 이벤트 전달
        />
      ))}
    </div>
  );
};

export default BookList;
