import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import ReadingBook from "../../components/myBook/ReadingBook";
import { OnlyTitle } from "../../layouts/TopLayout";

const MyBookListPage = () => {
  const books = [1, 2, 3, 4];

  return (
    <BasicLayout>
      <OnlyTitle title="내 책장" showLine={false} />
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
    </BasicLayout>
  );
};

export default MyBookListPage;
