import React, { useEffect, useState } from "react";
import {
  PiArrowElbowDownRight,
  PiSiren,
  PiThumbsUpFill,
  PiThumbsUpDuotone,
  PiThumbsDownFill,
  PiThumbsDownDuotone,
} from "react-icons/pi";
import useDateDiff from "../../hooks/useDateDiff";
import PortraitPlaceholder from "../commons/PortraitPlaceholder";
import useCustomLogin from "../../hooks/useCustomLogin.js";

// 토론 댓글 카드
const CommentCard = ({
  forum,
  comment,
  onReply,
  isReplyActive,
  onClickReport,
  onClickLike,
  onClickDislike,
}) => {
  const { diffFromNow } = useDateDiff();
  const { loginState } = useCustomLogin();
  const [isAuthor, setIsAuthor] = useState(false); // 작성자 일치
  const [isReported, setIsReported] = useState(comment.isReport); // 신고 상태

  // 작성자와 로그인 유저 일치 여부
  useEffect(() => {
    setIsAuthor(comment.nickname === loginState.nickname);
  }, [comment, loginState]);

  // 신고 아이콘 클릭 핸들러
  const handleReportClick = () => {
    if (!comment.isReport) {
      onClickReport(comment); // 신고 이벤트 실행
    }
  };

  // 좋아요 클릭 핸들러
  const handleLikeClick = () => {
    if (comment.commentId) {
      onClickLike(comment.commentId);
    } else {
      console.error("Error: commentId is undefined");
    }
  };

  // 싫어요 클릭 핸들러
  const handleDislikeClick = () => {
    if (comment.commentId) {
      onClickDislike(comment.commentId);
    } else {
      console.error("Error: commentId is undefined");
    }
  };

  return (
    <div className="flex gap-2">
      {comment.parentId !== null && (
        <div className="flex-shrink-0">
          <PiArrowElbowDownRight size={24} color="#78716C" />
        </div>
      )}
      <div
        className={`flex flex-col w-full p-4 mb-4 border rounded-md gap-2 ${
          comment.voteType === "AGREE"
            ? "border-undagree bg-undagree/10"
            : comment.voteType === "DISAGREE"
            ? "border-unddisagree bg-unddisagree/10"
            : "border-unddisabled bg-transparent"
        }`}
      >
        {/* 프로필, 닉네임, 칭호, 신고, 몇분전 */}
        <div className="flex justify-between gap-2">
          {/* 프로필 사진 */}
          <div className="w-9 h-9 items-center flex-shrink-0 rounded-full overflow-hidden">
            {comment.profileImage &&
            comment.profileImage !== "defaultProfileImage.jpg" ? (
              <img
                src={comment.profileImage}
                alt={`${comment.nickname}의 프로필`}
                className="w-full h-full object-cover"
              />
            ) : (
              <PortraitPlaceholder iconSize={20} circleSize={9} />
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-between">
              {/* 닉네임 */}
              <p className="text-und14 font-bold text-undtextdark">
                {comment.nickname}
              </p>
              <div className="flex gap-1.5 items-center text-und12 text-undtextgray">
                {/* 작성시간 */}
                <p>{diffFromNow(comment.createTime)} 전</p>
                {/* 신고하기 */}
                {comment.nickname !== "탈퇴한 회원" &&
                  !isAuthor &&
                  comment.viewStatus !== "BLOCKED" && (
                    <PiSiren
                      size={16}
                      color={isReported ? "#78716C" : "#D55636"} // 상태에 따라 색상 변경
                      onClick={handleReportClick} // 신고 클릭 핸들러
                    />
                  )}
              </div>
            </div>
            {/* 칭호 */}
            <p className="flex w-full justify-between text-und12 text-undtextgray">
              {comment.honorific}
            </p>
          </div>
        </div>
        {comment.viewStatus === "BLOCKED" ? (
          <div className="text-undtextdark text-und14 text-left">
            관리자에 의해 차단된 댓글입니다
          </div>
        ) : (
          <div className="text-und14 text-left">
            {comment?.parentNickname && (
              <span className="font-bold text-undtextgray mr-1.5">
                @{comment.parentNickname}
              </span>
            )}
            <span className="text-undtextdark">{comment.content}</span>
          </div>
        )}
        {comment.viewStatus !== "BLOCKED" && (
          <div className="flex justify-between">
            <div className="flex gap-4 text-undtextgray text-und12 h-4 text-left">
              {/* 좋아요 */}
              <div
                className="flex gap-0.5 justify-center items-center"
                onClick={handleLikeClick}
              >
                {comment?.isLike === true ? (
                  <PiThumbsUpFill size={18} color="A0CDDF" />
                ) : (
                  <PiThumbsUpDuotone size={18} color="A0CDDF" />
                )}

                {comment.like}
              </div>
              {/* 싫어요 */}
              <div
                className="flex gap-0.5 justify-center items-center"
                onClick={handleDislikeClick}
              >
                {comment?.isLike === false ? (
                  <PiThumbsDownFill size={18} color="DFA0B5" />
                ) : (
                  <PiThumbsDownDuotone size={18} color="DFA0B5" />
                )}
                {comment.dislike}
              </div>
            </div>
            {/* 댓글 달기 */}
            {comment?.isSelected === false && forum?.status !== "COMPLETED" && (
              <p
                className="text-undtextgray font-bold text-und12"
                onClick={onReply} // 댓글 달기 핸들러 호출
              >
                {isReplyActive ? "작성 취소" : "의견 작성"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
