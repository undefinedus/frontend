// 자리용 임시 파일
import React, { useEffect } from "react";
import ComentCard from "./CommentCard";

const CommentList = ({ comments }) => {
  useEffect(() => {
    console.log("comments", comments);
  });
  return (
    <div className="pb-4 w-full">
      {comments.map((comment, index) => (
        <ComentCard key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
