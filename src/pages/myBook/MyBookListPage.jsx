import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import ReadingBook from "../../components/myBook/ReadingBook";
import { OnlyTitle } from "../../layouts/TopLayout";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getBookList } from "../../api/bookApi";
import ScrollActionButtons from "../../components/commons/ScrollActionButtons";
import AddBookModal from "../../components/modal/books/AddBookModal";

const MyBookListPage = () => {
  const books = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const { loginState } = useCustomLogin();
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    console.log(loginState);
    fetchBookList();
  });

  const fetchBookList = async (status) => {
    try {
      const list = await getBookList();
      console.log(list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
  };

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
      {openAddModal && <AddBookModal onClose={handleCloseModal} />}
      <ScrollActionButtons mainLabel={"책 담기"} mainAction={handleOpenModal} />
    </BasicLayout>
  );
};

export default MyBookListPage;
