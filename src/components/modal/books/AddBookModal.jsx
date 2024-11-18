import React, { useState } from "react";
import SlrModalLayout from "../../../layouts/SlrModalLayout";
import StateBox from "../../myBook/StateBox";
import AddBookInputs from "../../myBook/AddBookInputs";

const AddBookModal = ({ onClose, state = "읽고 있는 책" }) => {
  const [boxState, setBoxState] = useState(state);

  const handleTabState = (tab) => {
    setBoxState(tab);
  };

  return (
    <SlrModalLayout onClose={onClose}>
      <div className="flex flex-col gap-3 mb-7">
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
      <AddBookInputs state={boxState} />
    </SlrModalLayout>
  );
};

export default AddBookModal;
