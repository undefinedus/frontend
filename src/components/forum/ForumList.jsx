// 자리용 임시 파일
import React from "react";
import ForumCard from "./ForumCard";

const ForumList = ({ forums, onCardClick }) => {
  return (
    <div className="pb-4 w-full">
      {forums.map((forum, index) => (
        <ForumCard
          key={index}
          forum={forum}
          onClick={() => onCardClick(forum)} // 클릭 이벤트 전달
        />
      ))}
    </div>
  );
};

export default ForumList;
