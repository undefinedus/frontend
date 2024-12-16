import React, { useState } from "react";
import CommentCard from "./CommentCard";
import WriteComment from "./WriteComment";

const CommentList = ({ comments, forum, handleReplySubmit }) => {
  const [activeComment, setActiveComment] = useState(null); // 활성화된 댓글 ID

  // 댓글 달기 클릭 핸들러
  const handleReply = (commentId, groupId, groupOrder) => {
    setActiveComment((prev) =>
      prev?.commentId === commentId ? null : { commentId, groupId, groupOrder }
    );
  };

  return (
    <div className="flex flex-col w-full">
      {comments.map((comment, index) => (
        <React.Fragment key={comment.commentId}>
          {/* CommentCard 렌더링 */}
          <CommentCard
            comment={comment}
            forum={forum}
            onReply={() =>
              handleReply(
                comment.commentId,
                comment.groupId,
                comment.groupOrder
              )
            } // 댓글 달기 핸들러
            isReplyActive={activeComment?.commentId === comment.commentId} // 활성화 상태 전달
          />
          {/* WriteComment를 동적으로 표시 */}
          {activeComment &&
            activeComment.groupId === comment.groupId &&
            activeComment.groupOrder === comment.groupOrder && (
              <div className="w-full flex">
                <WriteComment
                  isReplyActive={activeComment?.commentId === comment.commentId}
                  onClick={async (voteType, comment) => {
                    const success = await handleReplySubmit(
                      activeComment.commentId,
                      voteType,
                      comment
                    );

                    // 작성 성공 시 활성화 상태 닫기
                    if (success) {
                      setActiveComment(null);
                    }
                  }}
                />
              </div>
            )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CommentList;
