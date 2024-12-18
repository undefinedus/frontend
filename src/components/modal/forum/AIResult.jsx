import { useState } from "react";
import { PiScalesFill, PiScrollFill, PiSealQuestionFill } from "react-icons/pi";
import PercentageBar from "../../commons/PercentageBar";

const AIResult = ({ AIResult, forum }) => {
  const draw =
    AIResult.result === null
      ? forum.commentCount === 0
        ? "noResult"
        : "draw"
      : null;
  return (
    <div className="flex flex-col w-full gap-5 font-bold pb-4">
      <div className="w-full flex justify-center gap-3">
        <div className="w-full h-3 border-dashed border-b border-undpoint"></div>
        <div className="w-56 h-6 flex items-center justify-center text-undpoint">
          AI 토론 분석
        </div>
        <div className="w-full h-3 border-dashed border-b border-undpoint"></div>
      </div>
      {draw !== "noResult" && (
        <div className="flex flex-col w-full">
          <div className="flex gap-1 w-1/2 items-center flex-shrink-0">
            <PiScrollFill size={16} color="7D5C4D" />
            {/* <PiChatsFill size={16} color="7D5C4D" /> */}
            <p className="text-undpoint font-extrabold">토론 요약</p>
          </div>
          <p
            className="text-undtextgray 
        text-left"
          >
            {AIResult.conclusion}
          </p>
        </div>
      )}
      <div className="flex flex-col w-full gap-1">
        <div className="flex gap-1 w-1/2 items-center flex-shrink-0">
          <PiScalesFill size={16} color="7D5C4D" />
          {/* <PiHeadCircuitFill size={16} color="7D5C4D" /> */}
          <p className="text-undpoint font-extrabold">결론</p>
        </div>
        <p
          className="text-undtextgray 
        text-left"
        >
          {AIResult.result === true
            ? "찬성 측 의견이 더 설득력 있는 것으로 평가되었습니다."
            : AIResult.result === false
            ? "반대 측 의견이 더 설득력 있는 것으로 평가되었습니다."
            : forum.commentCount === 0
            ? "참여 인원이 부족하여 분석할 수 없습니다"
            : "찬성과 반대 측 모두 비슷한 설득력을 가진 것으로 평가되었습니다."}
        </p>
        {/* 종료 - 찬반결과 퍼센트바 */}
        {forum.status === "COMPLETED" && (
          <div className="flex justify-between text-undpoint font-extrabold text-und14 items-center">
            {draw !== "noResult" && "찬성"}
            <div className="w-9/12">
              {draw === null ? (
                <PercentageBar leftValue={100 - forum.disagreePercent} />
              ) : draw === "draw" ? (
                <PercentageBar leftValue={50} />
              ) : (
                <></>
              )}
            </div>
            {draw !== "noResult" && "반대"}
          </div>
        )}
      </div>
      {draw !== "noResult" && (
        <div className="flex flex-col w-full">
          <div className="flex gap-1 w-1/2 items-center flex-shrink-0">
            <PiSealQuestionFill size={16} color="7D5C4D" />
            <p className="text-undpoint font-extrabold">근거</p>
          </div>
          <p
            className="text-undtextgray 
        text-left"
          >
            {AIResult.reasoning}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIResult;
