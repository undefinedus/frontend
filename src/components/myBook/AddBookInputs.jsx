import React, { useEffect, useState } from "react";
import AddBookDate from "./AddBookDate";
import AddBookPage from "./AddBookPage";
import AddBookRating from "./AddBookRating";
import AddBookReview from "./AddBookReview";
import AddBookWish from "./AddBookWish";

const AddBookInputs = ({ state, setReady, book }) => {
  const [pageInput, setPageInput] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [rating, setRating] = useState(3);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today
      .toISOString()
      .split("T")[0]
      .replaceAll("-", "."); // 'YYYY-MM-DD' 형식
    setStartDate(formattedDate);
    setEndDate(formattedDate);
  }, []);

  const end = () => {
    switch (state) {
      case "읽고 있는 책":
        return null;
      case "다 읽은 책":
        return "종료일";
      case "중단한 책":
        return "중단일";
    }
  };

  const handleDates = (which, date) => {
    which === "start" ? setStartDate(date) : setEndDate(date);
  };

  const handleRate = (rating) => {
    setRating(rating);
  };

  return (
    <div className="flex flex-col gap-4">
      {state !== "읽고 싶은 책" && (
        <AddBookDate
          end={end()}
          dates={[startDate, endDate]}
          setDate={handleDates}
        />
      )}
      {(state === "읽고 있는 책" || state === "중단한 책") && (
        <AddBookPage state={state} setReady={setReady} />
      )}
      {state === "다 읽은 책" && (
        <AddBookRating rating={rating} handleRate={handleRate} />
      )}
      {(state === "다 읽은 책" || state === "중단한 책") && (
        <AddBookReview state={state} />
      )}
      {state === "읽고 싶은 책" && <AddBookWish book={book} />}
    </div>
  );
};

export default AddBookInputs;
