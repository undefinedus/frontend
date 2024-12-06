import React, { useEffect } from "react";
import { PiBookOpenFill, PiAlarmFill } from "react-icons/pi";

// 토론 상세페이지 내용
const ForumContent = ({ forum, children }) => {
  return (
    // 전체 div
    <div className="flex w-full flex-col items-center gap-4 text-und14">
      <div className="w-16 h-24 object-contain flex-shrink-0">
        <img
          src={forum.cover}
          alt={forum.bookTitle}
          className="w-full h-full"
        />
      </div>
      {/* 책 제목, 토론 예정 시간 */}
      <div className="flex flex-col font-bold w-full gap-1 px-6">
        {/* 책 제목 */}
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <PiBookOpenFill size={16} color="7D5C4D" />
            <p className="text-left text-undpoint flex-shrink-0">책 제목</p>
          </div>
          <p className="text-right text-undtextgray">{forum.bookTitle}</p>
        </div>
        {/* 토론 예정 시간 */}
        <div className="flex justify-between">
          <div className="flex gap-1">
            <PiAlarmFill size={16} color="7D5C4D" />
            <p className="text-left text-undpoint">토론 예정 시간</p>
          </div>
          <p className="text-right text-undtextgray">
            {forum.createdDate &&
              `${forum.createdDate
                .split("T")[0]
                .replace(/-/g, ".")} ${forum.createdDate
                .split("T")[1]
                .slice(0, 5)}`}
          </p>
        </div>
      </div>
      {/* 토론 내용 */}
      <div className="text-undtextdark text-left">{forum.content}</div>
      {/* 찬반 수, 베스트 댓글 등 */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ForumContent;
