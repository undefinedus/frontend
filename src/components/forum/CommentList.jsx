// 자리용 임시 파일
import React, { useEffect } from "react";
import ComentCard from "./CommentCard";

const CommentList = ({ comments, forum }) => {
  useEffect(() => {
    console.log("*******comments", comments);
    console.log("*******forum", forum);
  }, [forum]);
  return (
    <div className="flex flex-col w-full">
      {comments?.map((comment, index) => (
        <ComentCard key={index} comment={comment} forum={forum} />
      ))}
    </div>
  );
};

export default CommentList;
