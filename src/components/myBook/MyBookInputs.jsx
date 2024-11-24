import React, { useEffect, useState } from "react";
import MyBookDateInput from "./MyBookDateInput";
import MyBookPageInput from "./MyBookPageInput";
import MyBookRatingInput from "./MyBookRatingInput";
import MyBookReviewInput from "./MyBookReviewInput";
import MyBookWishInput from "./MyBookWishInput";

const MyBookInputs = ({ mode, state, setReady, book = {} }) => {
  const initAddData = {
    status: state,
    myRating: 5,
    oneLineReview: "",
    currentPage: 0,
    updateCount: 0,
    startDate: "today",
    endDate: "today",
  };

  const [currentPage, setCurrentPage] = useState(book.currentPage || 0);
  const [startDate, setStartDate] = useState(book.startDate || "");
  const [endDate, setEndDate] = useState(book.endDate || "");
  const [myRating, setMyRating] = useState(book.myRating || 5);
  const [oneLineReview, setOneLineReview] = useState(book.oneLineReview || "");
  const [data, setData] = useState({
    status: state,
    myRating: book.myRating,
    oneLineReview: book.oneLineReview,
    currentPage: book.currentPage,
    updateCount: book.updateCount,
    startDate: book.startDate,
    endDate: book.endDate,
  });
  const totalPage = book.itemPage;

  useEffect(() => {
    if (book.currentPage !== undefined) setCurrentPage(book.currentPage);
    if (book.startDate !== undefined) setStartDate(book.startDate);
    if (book.endDate !== undefined) setEndDate(book.endDate);
    if (book.myRating !== undefined) setMyRating(book.myRating);
    if (book.oneLineReview !== undefined) setOneLineReview(book.oneLineReview);
  }, [book]);

  useEffect(() => {
    switch (state) {
      case "WISH":
        setData({ status: "WISH", updateCount: 0 });
        break;
      case "READING":
        setData({
          status: "READING",
          startDate,
          currentPage,
          updateCount: book.updateCount + 1,
        });
        break;
      case "COMPLETED":
        setData({
          status: "COMPLETED",
          startDate,
          endDate,
          myRating,
          oneLineReview,
          updateCount: book.updateCount + 1,
        });
        break;
      case "STOPPED":
        setData({
          status: "STOPPED",
          startDate,
          endDate,
          currentPage,
          oneLineReview,
          updateCount: book.updateCount + 1,
        });
        break;
    }
  }, [startDate, endDate, currentPage, myRating, oneLineReview]);

  useEffect(() => {
    if (state === "COMPLETED" || state === "WISH") {
      setReady(true, data);
    } else if (currentPage !== "" && currentPage > 0) {
      setReady(true, data);
    } else {
      setReady(false, data);
    }
  }, [state, data]);

  const handleDates = (which, date) => {
    which === "start" ? setStartDate(date) : setEndDate(date);
  };

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handleRate = (rating) => {
    setMyRating(rating);
  };

  const handleReview = (review) => {
    setOneLineReview(review);
  };

  return (
    <div className="flex flex-col gap-4">
      {state !== "WISH" && (
        <MyBookDateInput
          state={state}
          startDate={startDate}
          endDate={endDate}
          setDate={handleDates}
        />
      )}
      {(state === "READING" || state === "STOPPED") && (
        <MyBookPageInput
          state={state}
          currentPage={currentPage}
          totalPage={totalPage}
          setPage={handlePage}
        />
      )}
      {state === "COMPLETED" && (
        <MyBookRatingInput myRating={myRating} handleRate={handleRate} />
      )}
      {(state === "COMPLETED" || state === "STOPPED") && (
        <MyBookReviewInput
          state={state}
          oneLineReview={oneLineReview}
          setReview={handleReview}
        />
      )}
      {state === "WISH" && <MyBookWishInput book={book} />}
    </div>
  );
};

export default MyBookInputs;
