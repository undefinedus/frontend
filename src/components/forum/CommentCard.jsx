import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiSiren, PiThumbsUpFill } from "react-icons/pi";
import useDateDiff from "../../hooks/useDateDiff";
import PortraitPlaceholder from "../commons/PortraitPlaceholder";

// 토론 댓글 카드
const commentCard = ({
  comment,
  onClickReport,
  onClickLike,
  onClickDislike,
}) => {
  const { diffFromNow } = useDateDiff();

  useEffect(() => {
    console.log("댓글", comment);
    // console.log(`forum, ${coment}`);
    // console.log(`댓글 작성 시간, ${coment.createTime}`);
  }, [comment]);
  return (
    <div
      className={`flex flex-col w-full p-4 border rounded-md gap-2 ${
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
        <div className="w-9 h-full">
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
        {/* 닉네임, 칭호, 신고, 몇분전 */}
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <p className="text-und14 font-bold text-undtextdark">
              {comment.nickname}
            </p>
            <PiSiren size={16} color="#D55636" onClick={onClickReport} />
          </div>
          <div className="flex w-full justify-between text-und12 text-undtextgray">
            <p> {comment.honorific}</p>
            <p>5분 전</p>
          </div>
        </div>
      </div>
      <div className="text-und14 font-bold text-undtextdark">
        {comment.content}
      </div>
      <div className="flex gap-4 text-undtextgray text-und12 h-4 text-left">
        <div
          className="flex gap-0.5 justify-center items-center"
          onClick={onClickLike}
        >
          <PiThumbsUpFill size={18} color="A0CDDF" />
          {comment.like}
        </div>
        <div
          className="flex gap-0.5 justify-center items-center"
          onClick={onClickDislike}
        >
          <PiThumbsUpFill size={18} color="DFA0B5" />
          {comment.dislike}
        </div>
      </div>
    </div>
  );
};

export default commentCard;
