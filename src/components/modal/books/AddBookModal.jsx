import React, { useEffect, useState } from "react";
import SlrModalLayout from "../../../layouts/SlrModalLayout";
import StateBox from "../../myBook/StateBox";
import AddBookInputs from "../../myBook/AddBookInputs";
import { addBook } from "../../../api/bookApi";

// COMPLETED,    // 다 읽은 책
// WISH,         // 읽고 싶은 책
// READING,      // 읽고 있는 책
// STOPPED       // 중단한 책

const initData = {
  title: "이펙티브 자바 - 제3판",
  author: "조슈아 블로크 (지은이), 개앞맵시 (옮긴이)",
  customerReviewRank: 10,
  subInfo: { itemPage: 520 },
};

const AddBookModal = ({ onClose, state = "읽고 있는 책", book = initData }) => {
  const [boxState, setBoxState] = useState(state);
  const [isReady, setIsReady] = useState(false);

  const addMyBook = async () => {
    try {
      // 성공 토스트메세지
      const res = await addBook();
      console.log(res);
      return "success";
    } catch (err) {
      console.error(err);
      // 실패 토스트메세지
      return "error";
    }
  };

  const handleReadyToAdd = () => {
    setIsReady(true);
  };

  const handleTabState = (tab) => {
    setBoxState(tab);
    setIsReady(false);
  };

  const handleClickButton = async () => {
    return await addMyBook();
  };

  return (
    <SlrModalLayout onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            <StateBox
              state={"읽고 있는 책"}
              isActive={boxState === "읽고 있는 책"}
              setActive={handleTabState}
            />
            <StateBox
              state={"읽고 싶은 책"}
              isActive={boxState === "읽고 싶은 책"}
              setActive={handleTabState}
            />
          </div>
          <div className="flex justify-between gap-3">
            <StateBox
              state={"다 읽은 책"}
              isActive={boxState === "다 읽은 책"}
              setActive={handleTabState}
            />
            <StateBox
              state={"중단한 책"}
              isActive={boxState === "중단한 책"}
              setActive={handleTabState}
            />
          </div>
        </div>
        <AddBookInputs
          state={boxState}
          setReady={handleReadyToAdd}
          book={book}
        />
      </div>
      <div className="fixed bottom-8 start-0 end-0 mt-4 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <button
            className={`w-72 h-12 rounded-3xl text-und18 ${
              isReady
                ? "bg-undpoint text-white"
                : "bg-unddisabled text-undtextgray"
            }`}
            onClick={() => isReady && handleClickButton()}
          >
            책 담기
          </button>
        </div>
      </div>
    </SlrModalLayout>
  );
};

export default AddBookModal;
