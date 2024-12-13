import React, { useEffect } from "react";
import { PiUserFill } from "react-icons/pi";

// 토론 카드형 목록
const ParticipantsCount = ({
  forum,
  onClickAgree,
  onClickDisagree,
  forumGuide = true,
}) => {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex text-undtextgray font-bold text-und14 w-full h-12 text-center justify-between px-6 gap-4">
        <div
          className="flex gap-2 justify-center items-center w-full bg-white border border-unddisabled rounded-md"
          onClick={onClickAgree}
        >
          <PiUserFill size={16} color="A0CDDF" />
          찬성 {forum.agreeCount}
        </div>
        <div
          className="flex gap-2 justify-center items-center w-full bg-white border border-unddisabled rounded-md"
          onClick={onClickDisagree}
        >
          <PiUserFill size={16} color="DFA0B5" />
          반대 {forum.disagreeCount}
        </div>
      </div>
      {forumGuide && (
        <div className="text-und12 text-undpoint">
          토론에 참가할 의향이 있다면 참가측을 선택해 주세요
        </div>
      )}
    </div>
  );
};

export default ParticipantsCount;
