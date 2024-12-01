import React from "react";

const BookMarkCard = ({ bookmark, onClick }) => {
  return (
    <div
      className="w-full py-5 border-b border-unddisabled first:pt-0 last:border-none last:pb-0"
      onClick={onClick}
    >
      <div className="w-full text-und14 p-5 bg-undbgsub flex flex-col text-left">
        <p className="font-bookmark italic font-bold text-undclickbrown mb-4">
          {bookmark.phrase}
        </p>
        <p className="w-full text-undtextgray text-und12 mb-1 truncate">
          {bookmark.title}
        </p>
        <p className="text-undtextgray text-und12">{bookmark.recordDate}</p>
      </div>
    </div>
  );
};

export default BookMarkCard;
