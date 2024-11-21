import React, { useEffect, useState } from "react";
import { PiStar, PiStarFill } from "react-icons/pi";

const AddBookRating = ({ rating, handleRate }) => {
  const [ratingList, setRatingList] = useState([]);

  useEffect(() => {
    const list = Array.from({ length: 5 }, (_, i) =>
      i + 1 <= rating ? "fill" : "empty"
    );
    setRatingList(list);
  }, [rating]);

  const renderRatings = () => {
    return (
      <div className="flex w-36 justify-between">
        {ratingList.map((item, i) => {
          return item === "fill" ? (
            <PiStarFill
              key={i}
              color={"#FFD400"}
              size={24}
              onClick={() => {
                handleRate(i + 1);
              }}
            />
          ) : (
            <PiStar
              key={i}
              color={"#FFD400"}
              size={24}
              onClick={() => {
                handleRate(i + 1);
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="text-und16 text-undtextdark font-bold">별점</div>
      <div>{renderRatings()}</div>
    </div>
  );
};

export default AddBookRating;
