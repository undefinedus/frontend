import React, { useEffect, useState } from "react";
import SlrModalLayout from "../../../layouts/SlrModalLayout";
import BookmarkPageInput from "../../bookmark/BookmarkPageInput";
import { PiCamera } from "react-icons/pi";
import BookmarkMarkInput from "../../bookmark/BookmarkMarkInput";
import { addBookmark } from "../../../api/book/bookMarkApi";

const BookMarkModal = ({ mode, onClose, book }) => {
  const [isReady, setIsReady] = useState(false);
  const [page, setPage] = useState(0);
  const [mark, setMark] = useState("");

  useEffect(() => {
    console.log("mark from modal: ", mark);
    if (mark !== "") setIsReady(true);
    else {
      setIsReady(false);
    }
  }, [mark]);

  const fetchAddBookmark = async () => {
    const data = {
      title: book.title,
      pageNumber: page,
      phrase: mark,
    };

    try {
      const res = await addBookmark(data);
      console.log("result: ", res.data.result);
      if (res.data.result === "success") {
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SlrModalLayout onClose={onClose}>
      <div className="flex flex-col">
        <h1 className="text-start text-und16 font-bold text-undtextdark">
          책 제목
        </h1>
        <p className="text-start text-und14 text-undtextgray">{book.title}</p>
      </div>

      <div className="w-full flex items-center justify-between mt-4">
        <h1 className="text-start text-und16 font-bold text-undtextdark">
          책갈피 위치
        </h1>
        <BookmarkPageInput
          page={page}
          setPage={setPage}
          totalPage={book.itemPage}
        />
      </div>

      <div className="w-full flex flex-col mt-6">
        <div className="w-full flex justify-between items-center">
          <PiCamera color={"#0c0a09"} size={32} />
          <p className="text-und14 text-end text-undtextgray">
            {"("}
            {mark.length}/200자{")"}
          </p>
        </div>
        <BookmarkMarkInput mark={mark} setMark={setMark} />
      </div>

      <div className="fixed px-6 w-full bottom-8 start-0 end-0 mt-4 flex justify-center items-center">
        <div className="w-full ">
          <button
            className={`w-full h-12 rounded-full text-und18 ${
              isReady
                ? "bg-undpoint text-white"
                : "bg-unddisabled text-undtextgray"
            } font-bold`}
            disabled={!isReady}
            onClick={fetchAddBookmark}
          >
            {mode === "ADD" ? "책갈피 추가" : "수정하기"}
          </button>
        </div>
      </div>
    </SlrModalLayout>
  );
};

export default BookMarkModal;
