import React from "react";
import {
  PiBookOpenText,
  PiBookOpenTextFill,
  PiBookBookmark,
  PiBookBookmarkFill,
  PiBook,
  PiBookFill,
  PiPause,
  PiPauseFill,
} from "react-icons/pi";

const StateBox = ({ state, isActive, setActive }) => {
  const translateState = () => {
    switch (state) {
      case "READING":
        return "읽고 있는 책";
      case "WISH":
        return "읽고 싶은 책";
      case "COMPLETED":
        return "다 읽은 책";
      case "STOPPED":
        return "중단한 책";
    }
  };
  const getIcon = () => {
    switch (state) {
      case "READING":
        return isActive ? (
          <PiBookOpenTextFill color="#ffffff" size={28} />
        ) : (
          <PiBookOpenText color="#7d5c4d" size={28} />
        );
      case "WISH":
        return isActive ? (
          <PiBookBookmarkFill color="#ffffff" size={28} />
        ) : (
          <PiBookBookmark color="#7d5c4d" size={28} />
        );
      case "COMPLETED":
        return isActive ? (
          <PiBookFill color="#ffffff" size={28} />
        ) : (
          <PiBook color="#7d5c4d" size={28} />
        );
      case "STOPPED":
        return isActive ? (
          <PiPauseFill color="#ffffff" size={28} />
        ) : (
          <PiPause color="#7d5c4d" size={28} />
        );
    }
  };

  return (
    <div
      className={`min-w-36 min-h-20 w-1/2 rounded-md flex flex-col justify-center ${
        isActive
          ? "bg-undlightpoint text-white"
          : "bg-unddisabled text-undpoint"
      } text-und16 font-semibold`}
      onClick={() => setActive(state)}
    >
      <div className="flex justify-center">{getIcon()}</div>
      <div className="flex justify-center">{translateState()}</div>
    </div>
  );
};

export default StateBox;
