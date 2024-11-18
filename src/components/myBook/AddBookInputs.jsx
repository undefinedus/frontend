import React from "react";
import AddBookDate from "./AddBookDate";

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
      {state !== "읽고 싶은 책" && <AddBookDate end={end()} />}
      {}
    </div>
  );
};

export default AddBookInputs;
