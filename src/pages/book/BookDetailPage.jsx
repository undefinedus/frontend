import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevAddBook } from "../../layouts/TopLayout";
import { getSearchBookDetail } from "../../api/home/searchBookAPI";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import BookCoverTitle from "../../components/book/BookCoverTitle";
import BookInformation from "../../components/book/BookInformation";
import AddBookModal from "../../components/modal/books/AddBookModal";
import MyBookModal from "../../components/modal/books/MyBookModal";

// 책 상세정보 페이지
const BookDetail = () => {
  const { isbn13 } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // 전달받은 state를 가져옴
  const { state } = location; // 기존 검색 상태
  const [book, setBook] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // 책 담기 모달 상태

  useEffect(() => {
    fetchBookDetail(isbn13);
  }, [isbn13]);

  const fetchBookDetail = async (isbn13) => {
    try {
      const book = await getSearchBookDetail(isbn13);
      console.log("******책 정보", book);
      setBook(book);
    } catch (error) {
      console.error(error);
    }
  };

  // 기존 검색 상태를 함께 navigate로 전달
  const handleBackClick = () => {
    navigate(
      "../searchbook",
      {
        state: state,
      } // 기존 검색 상태를 그대로 전달
    );
  };

  const handleOpenAddBookModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseAddBookModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  console.log(
    "*********카드 클릭 -> 넘겨받은 기존 검색값 :",
    state.searchKeyword
  );

  return (
    <BasicLayout>
      <div className="fixed top-0 left-0 w-full z-50 bg-undbgmain">
        <PrevAddBook
          showLine={true}
          onClick={handleBackClick}
          status={book.status}
          onAddBook={handleOpenAddBookModal}
        />
      </div>
      <div className="pt-20 pb-4">
        <BookCoverTitle book={book} />
      </div>
      <div className="pb-20">
        <BookInformation book={book} />
      </div>
      {/* 모달 렌더링 */}
      {isModalOpen && (
        // <AddBookModal book={book} onClose={handleCloseAddBookModal} />
        <MyBookModal
          mode={"ADD"}
          book={book}
          onClose={handleCloseAddBookModal}
        />
      )}
    </BasicLayout>
  );
};

export default BookDetail;
