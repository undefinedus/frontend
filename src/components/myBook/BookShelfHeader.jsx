import React from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

const BookShelfHeader = ({ isMine = true }) => {
  return (
    <div className="bg-undbgmain mt-1 py-14 px-2">
      <div className="flex items-center">
        <span className="w-1/3 flex justify-start">
          <PiCaretLeft size={"28"} color="#7d5c4d" />
        </span>
        <span className="w-1/3 flex justify-center text-xl text-undpoint font-bold">
          {isMine ? "나" : "undefined님"}의 책꽂이
        </span>
        <span className="w-1/3 flex justify-end">
          <PiCaretRight size={"28"} color="#7d5c4d" />
        </span>
      </div>
    </div>
  );
};

export default BookShelfHeader;
