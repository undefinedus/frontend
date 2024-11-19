import React from "react";
import AddBookDate from "./AddBookDate";
import AddBookPage from "./AddBookPage";

const AddBookInputs = ({ state }) => {
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

  return (
    <div>
      <div className={`${state === "읽고 있는 책" ? "mb-7" : "mb-4"}`}>
        {state !== "읽고 싶은 책" && <AddBookDate end={end()} />}
      </div>
      {(state === "읽고 있는 책" || state === "중단한 책") && (
        <AddBookPage state={state} />
      )}
    </div>
  );
};

export default AddBookInputs;
