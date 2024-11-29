import { useEffect, useState } from "react";
import { PiStar, PiStarFill } from "react-icons/pi";

const DrawMyRating = ({ myRating }) => {
  const [ratingList, setRatingList] = useState([]);

  useEffect(() => {
    const list = Array.from({ length: 5 }, (_, i) =>
      i + 1 <= myRating ? "fill" : "empty"
    );
    setRatingList(list);
  }, [myRating]);

  return (
    <>
      {ratingList.map((item, i) => {
        return item === "fill" ? (
          <PiStarFill key={i} color={"#FFD400"} size={20} />
        ) : (
          <PiStar key={i} color={"#FFD400"} size={20} />
        );
      })}
    </>
  );
};

export default DrawMyRating;
