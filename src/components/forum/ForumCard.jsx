import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiUserFill,
  PiClock,
  PiClockCountdown,
  PiEye,
  PiChatCenteredDots,
} from "react-icons/pi";
import PercentageBar from "../commons/PercentageBar";
import useDateDiff from "../../hooks/useDateDiff";

// 토론 카드형 목록
const ForumCard = ({ forum, onClick }) => {
  const { diffFromNow } = useDateDiff();

  useEffect(() => {
    // console.log(`forum, ${forum}`);
    // console.log(`forum 시작 시간, ${forum.startDateTime}`);
    // console.log(`forum 끝 시간, ${forum.closedAt}`);
  }, [forum]);
  return (
    <div
      className="w-full py-5 border-b border-unddisabled first:pt-0 last:border-none last:pb-0"
      onClick={onClick} // 클릭 이벤트 적용
    >
      <div className="flex items-start w-full h-24 justify-start gap-5">
        {/* 책 표지 */}
        <div className="w-16 h-24 object-contain flex-shrink-0">
          <img src={forum.cover} alt={forum.title} className="w-full h-full" />
        </div>

        {/* 게시글 정보 */}
        <div className="flex flex-col h-full justify-between">
          {/* 글 제목 */}
          <p className="text-undtextdark text-und14 font-bold w-full h-10 text-left line-clamp-2">
            {forum.title}
          </p>
          {/* 찬반 수 */}
          {forum.status !== "COMPLETED" && (
            <div className="flex gap-3 text-undtextgray font-extrabold text-und12 w-56 h-4 text-left ">
              <div className="flex gap-0.5 justify-center items-center">
                <PiUserFill size={16} color="A0CDDF" />
                {forum.agree}
              </div>
              <div className="flex gap-0.5 justify-center items-center">
                <PiUserFill size={16} color="DFA0B5" />
                {forum.disagree}
              </div>
            </div>
          )}
          {/* 발의 - 작성자 */}
          {forum.status === "PROPOSED" && (
            <p className="text-undtextgray text-und12 w-56 h-4 text-left">
              {forum.memberName}
            </p>
          )}

          {/* 종료 - 찬반결과 퍼센트바 */}
          {forum.status === "COMPLETED" && (
            <div className="flex justify-between text-undtextgray font-extrabold text-und12 items-center">
              찬성
              <div className="w-9/12">
                <PercentageBar leftValue={100 - forum.disagreePercent} />
              </div>
            </div>
          )}

          <div className="flex justify-start items-center w-56 h-4 text-undtextgray text-und12 text-left gap-3">
            <div className="flex justify-start items-center gap-1">
              {/* 발의, 종료 - 작성일 */}
              {(forum.status === "PROPOSED" ||
                forum.status === "COMPLETED") && (
                <>
                  <div className="flex justify-center items-center">
                    <PiClock size={16} color="78716C" />
                  </div>
                  {forum.createdDate.split("T")[0].replace(/-/g, ".")}
                </>
              )}
              {/* 토론 예정, 진행 중 - 토론 남은 시간 */}
              {(forum.status === "IN_PROGRESS" ||
                forum.status === "SCHEDULED") && (
                <>
                  <div className="flex justify-center items-center">
                    <PiClockCountdown size={16} color="78716C" />
                  </div>
                  {forum.status === "IN_PROGRESS"
                    ? `종료 ${diffFromNow(forum.closedAt)} 전`
                    : `${diffFromNow(forum.startDateTime)} 후 시작`}
                </>
              )}
            </div>
            {/* 조회수 */}
            <div className="flex justify-start items-center gap-1">
              <div className="flex justify-center items-center">
                <PiEye size={16} color="78716C" />
              </div>
              {forum.views}
            </div>
            {/* 진행 중, 종료 - 댓글 수 */}
            {(forum.status === "IN_PROGRESS" ||
              forum.status === "COMPLETED") && (
              <div className="flex justify-start items-center gap-1">
                <div className="flex justify-center items-center">
                  <PiChatCenteredDots size={16} color="78716C" />
                </div>
                {forum?.commentCount || 0}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
