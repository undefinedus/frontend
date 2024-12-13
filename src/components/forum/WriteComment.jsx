import React, { useState } from "react";
import ResizableTextarea from "./ResizableTextarea";

// 토론 댓글 작성
const WriteComment = ({ onClick }) => {
  const [comment, setComment] = useState(""); // 댓글 내용
  const [isButtonVisible, setIsButtonVisible] = useState(false); // 버튼 가시성 상태
  const isCommentValid = comment.length > 0; // 댓글 입력 여부 확인

  const handleClick = async (voteType) => {
    const success = await onClick(voteType, comment); // 댓글 작성 성공 여부 반환
    if (success) {
      setComment(""); // 성공 시 댓글 내용 초기화
      setIsButtonVisible(false); // 버튼 숨기기
    }
  };

  return (
    <div className="flex flex-col gap-1 bg-undbgmain">
      <div>
        <ResizableTextarea
          label="댓글 작성"
          value={comment}
          onFocus={() => setIsButtonVisible(true)} // 포커스 시 버튼 표시
          onBlur={() => setIsButtonVisible(false)} // 포커스 해제 시 버튼 숨기기
          onChange={(e) => setComment(e.target.value)}
          maxLength={300}
          rows={2} // 기본 행 수
        />
      </div>
      {isButtonVisible && (
        <div className="">
          <p className="text-undpoint text-und12 pb-2">
            토론 주제에 대해 작성하신 댓글의 입장을 선택해 주세요
          </p>
          <div className="flex gap-3 mt-1 text-und16 font-bold">
            <div
              className={`w-full rounded-md text-center flex justify-center items-center h-12 ${
                isCommentValid
                  ? "bg-undagree text-white" // 댓글이 입력된 경우
                  : "bg-unddisabled text-undtextgray" // 기본 상태
              }`}
              value="AGREE"
              onClick={() => isCommentValid && handleClick("AGREE", comment)} // AGREE 전달
            >
              찬성
            </div>
            <div
              className={`w-full rounded-md text-center flex justify-center items-center h-12 ${
                isCommentValid
                  ? "bg-unddisagree text-white" // 댓글이 입력된 경우
                  : "bg-unddisabled text-undtextgray" // 기본 상태
              }`}
              value="DISAGREE"
              onClick={() => isCommentValid && handleClick("DISAGREE", comment)} // DISAGREE 전달
            >
              반대
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteComment;
