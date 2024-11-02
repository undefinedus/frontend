import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import ReadingBook from "../components/RedingBook";

const MyBookShelf = () => {
  const books = [1, 2, 3, 4];

  return (
    <div>
      <BasicLayout />
      <div className="mt-32 flex flex-col gap-4">
        {books.map((book, index) => (
          <div
            key={index}
            className={`pb-4 ${
              index !== books.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <ReadingBook />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookShelf;
