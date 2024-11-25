import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetail } from "../../api/bookApi";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitleModifyDelete } from "../../layouts/TopLayout";
import BookCoverTitle from "../../components/book/BookCoverTitle";
import BookInformation from "../../components/book/BookInformation";
import useBookStatus from "../../hooks/useBookStatus";
import TwoButtonModal from "../../components/modal/commons/TwoButtonModal";
import MyBookModal from "../../components/modal/books/MyBookModal";

const initData = {
  status: "",
  myRating: 0,
  oneLineReview: "",
  currentPage: 0,
  updateCount: 0,
  startDate: "0000-00-00",
  endDate: "0000-00-00",
};

const MyBookDetailPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { getStatusInKorean } = useBookStatus();
  const [book, setBook] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchBookDetail = async () => {
      try {
        const res = await getBookDetail(bookId);
        if (isMounted) setBook(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookDetail();

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  const end = () => {
    switch (book.status) {
      case "READING":
        return null;
      case "COMPLETED":
        return "종료일";
      case "STOPPED":
        return "중단일";
    }
  };

  const fetchDeleteBook = async () => {
    try {
      const res = await deleteBook(bookId);
      return res;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const handleClick = async (option) => {
    if (option === "back") {
      navigate({ pathname: "../list" }, { replace: true });
    } else if (option === "modify") {
      setModifyModalOpen(true);
    } else if (option === "delete") {
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    const res = await fetchDeleteBook();
    if (res === "success") {
      navigate({ pathname: "../list" });
    }
  };

  return (
    <BasicLayout>
      <div className="fixed top-0 left-0 w-full z-50 bg-undbgmain">
        <PrevTitleModifyDelete
          title={getStatusInKorean(book.status)}
          onClick={handleClick}
        />
      </div>
      <div className="pt-20 pb-4">
        <BookCoverTitle book={book} />
      </div>

      {book.status !== "WISH" && (
        <div className="flex flex-col gap-4 px-6">
          {/* {book.status !== "WISH" && (
            <AddBookDate
              end={end()}
              dates={[book.startDate, book.endDate]}
              book={book}
            />
          )}
          {(book.status === "READING" || book.status === "STOPPED") && (
            <AddBookPage state={book.status} bookInfo={book} />
          )}
          {book.status === "COMPLETED" && (
            <AddBookRating rating={book.myRating} />
          )}
          {(book.status === "COMPLETED" || book.status === "STOPPED") && (
            <AddBookReview
              state={book.status}
              oneLineReview={book.oneLineReview}
            />
          )} */}
        </div>
      )}

      {book.status !== "WISH" && (
        <div className="w-full flex justify-center gap-3 py-4 px-6">
          <div className="w-full h-10 flex flex-col">
            <div className="w-full h-5"></div>
            <div className="w-full h-5 border-dashed border-t border-undpoint"></div>
          </div>
          <div className="w-36 h-10 flex items-center justify-center text-undpoint">
            책 정보
          </div>
          <div className="w-full h-10 flex flex-col">
            <div className="w-full h-5"></div>
            <div className="w-full h-5 border-dashed border-t border-undpoint"></div>
          </div>
        </div>
      )}

      <div className="py-2.5 pb-20">
        <BookInformation
          book={book}
          hasDescription={book.status !== "WISH" ? false : true}
        />
      </div>
      {deleteModalOpen && (
        <TwoButtonModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteModalOpen(false)}
        >
          {book.status !== "WISH" && (
            <p className="text-und16 text-undclickbrown font-bold">
              {"그동안 기록했던 내용이 모두 사라져요"}
            </p>
          )}
          <p className="text-und16 text-undclickbrown font-bold">
            {"정말로 삭제하시겠습니까?"}
          </p>
        </TwoButtonModal>
      )}
      {modifyModalOpen && (
        // <ModifyBookModal
        //   book={book}
        //   state={book.status}
        //   onClose={() => setModifyModalOpen(false)}
        // />
        <MyBookModal
          mode={"MODIFY"}
          book={book}
          onClose={() => setModifyModalOpen(false)}
        />
      )}
    </BasicLayout>
  );
};

export default MyBookDetailPage;
