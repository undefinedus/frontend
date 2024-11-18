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
  const getIcon = () => {
    switch (state) {
      case "읽고 있는 책":
        return isActive ? (
          <PiBookOpenTextFill color="#ffffff" size={28} />
        ) : (
          <PiBookOpenText color="#7d5c4d" size={28} />
        );
      case "읽고 싶은 책":
        return isActive ? (
          <PiBookBookmarkFill color="#ffffff" size={28} />
        ) : (
          <PiBookBookmark color="#7d5c4d" size={28} />
        );
      case "다 읽은 책":
        return isActive ? (
          <PiBookFill color="#ffffff" size={28} />
        ) : (
          <PiBook color="#7d5c4d" size={28} />
        );
      case "중단한 책":
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
      <div className="flex justify-center">{state}</div>
    </div>
  );
};

export default StateBox;
