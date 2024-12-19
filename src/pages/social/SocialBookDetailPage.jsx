import React, { useEffect, useState } from "react";
import { PrevAddBook } from "../../layouts/TopLayout";
import BasicLayout from "../../layouts/BasicLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addSocialBookToMyBook,
  getSocialBookDetail,
} from "../../api/social/socialBookShelfApi";
import BookInformation from "../../components/book/BookInformation";
import BookCustomInformation from "../../components/book/BookCustomInformation";
import BookCoverTitle from "../../components/book/BookCoverTitle";
import { setRef } from "@fullcalendar/core/internal.js";

// 유저 소셜 책 상세 페이지
const SocialBookDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location?.state || {};
  const { targetMemberId, bookId } = useParams();

  const [book, setBook] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (bookId && targetMemberId) {
      fetchBookDetail();
    }
  }, [targetMemberId, bookId, refresh]);

  const fetchBookDetail = async () => {
    if (!bookId || !targetMemberId) return;
    try {
      const res = await getSocialBookDetail(targetMemberId, bookId);
      console.log("social getbookdetail res: ", res);
      setBook(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAddBook = async () => {
    if (!bookId) return;
    try {
      const res = await addSocialBookToMyBook(bookId);
      console.log("addSocialBook res: ", res);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    console.log("handleBackClick");
    if (!targetMemberId) return;
    navigate(`../bookshelf/${targetMemberId}`, {
      replace: true,
      state: {
        prevActiveTab,
        prevSearch,
        prevSort,
        prevScrollLeft,
      },
    });
  };

  const handleAddBook = async () => {
    await fetchAddBook();
  };

  return (
    <BasicLayout>
      {/* 상단 네비 */}
      <div className="fixed top-0 left-0 right-0 w-full z-50 bg-undbgmain">
        <PrevAddBook
          showLine={false}
          status={book?.existingStatus}
          onClick={handleBackClick}
          onAddBook={handleAddBook}
        />
      </div>
      <div className="pt-20 pb-4">
        <BookCoverTitle book={book} />
      </div>

      {book.status !== "WISH" && (
        <div className="flex flex-col gap-4 px-6">
          <BookCustomInformation book={book} />
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
    </BasicLayout>
  );
};

export default SocialBookDetailPage;
