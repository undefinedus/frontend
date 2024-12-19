import React, { useEffect } from "react";
import { PiClock, PiEye, PiChatCenteredDots, PiUserFill } from "react-icons/pi";
import PortraitPlaceholder from "../commons/PortraitPlaceholder";

// 토론 상세페이지 제목, 작성자 등 기본 정보
const ForumInfo = ({ forum }) => {
  return (
    <div className="flex flex-col items-start w-full pb-4 justify-start gap-2 border-unddisabled border-b">
      {/* 글 제목 */}
      <p className="text-undtextdark text-und18 font-bold w-full text-left">
        {forum.viewStatus === "BLOCKED"
          ? "관리자에 의해 차단된 글입니다"
          : forum.title}
      </p>

      {/* 작성자 및 글 정보 */}
      <div className="flex w-full items-center h-9 gap-3">
        <div className="w-9 h-9 flex justify-center items-center">
          {forum.profileImage &&
          forum.profileImage === "defaultProfileImage.jpg" ? (
            <PortraitPlaceholder iconSize={20} circleSize={9} />
          ) : (
            <div className="w-9 h-9">
              <img
                alt="myProfileImage"
                src={forum.profileImage}
                className="w-full h-full object-cover flex-shrink-0 rounded-full overflow-hidden"
              />
            </div>
          )}
        </div>
        <div className="text-undtextgray flex-col w-full">
          <div className="flex w-full justify-between">
            {/* 닉네임 */}
            <p className="font-bold text-und14 w-full h-5 text-left">
              {forum.memberName}
            </p>
            {/* 진행 중, 종료 - 찬반 수 */}
            {(forum.status === "IN_PROGRESS" ||
              forum.status === "COMPLETED") && (
              <div className="flex gap-3 text-undtextgray text-und12 h-4 text-left">
                <div className="flex gap-0.5 justify-center items-center">
                  <PiUserFill size={16} color="A0CDDF" />
                  {forum.agreeCommentCount}
                </div>
                <div className="flex gap-0.5 justify-center items-center">
                  <PiUserFill size={16} color="DFA0B5" />
                  {forum.disagreeCommentCount}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-start items-center w-full h-4 text-und12 text-left gap-2">
            {/* 작성일 */}
            <div className="flex justify-center items-center gap-1">
              <PiClock size={16} color="78716C" />
              {forum.createdDate?.split("T")[0].replace(/-/g, ".")}
            </div>
            {/* 조회수 */}
            <div className="flex justify-start items-center gap-1">
              <PiEye size={16} color="78716C" />
              {forum.views}
            </div>
            {/* 진행 중, 종료 - 댓글 수 */}
            {(forum.status === "IN_PROGRESS" ||
              forum.status === "COMPLETED") && (
              <div className="flex justify-start items-center gap-1">
                <PiChatCenteredDots size={16} color="78716C" />
                {forum.commentCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumInfo;
