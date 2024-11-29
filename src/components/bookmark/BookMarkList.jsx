import React, { useEffect } from "react";
import BookMarkCard from "./BookMarkCard";

const BookMarkList = ({ bookmarks, onCardClick }) => {
  useEffect(() => {
    console.log(bookmarks);
  }, [bookmarks]);

  return (
    <div className="py-4 w-full">
      {bookmarks.map((bookmark, index) => (
        <BookMarkCard
          key={index}
          bookmark={bookmark}
          onClick={() => onCardClick(bookmark)}
        />
      ))}
    </div>
  );
};

export default BookMarkList;
