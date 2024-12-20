import React from "react";
import { PiBookOpenFill, PiAlarmFill, PiPushPinFill } from "react-icons/pi";

// 토론 상세페이지 내용
const ForumContent = ({ forum, children }) => {
  const isMultiLine = forum.bookTitle?.length > 10; // 책 제목 길이가 10을 초과하면 줄바꿈

  return (
    // 전체 div
    <div className="flex w-full flex-col pt-4 gap-5 items-center text-und14">
      <div className="flex w-16 h-24 object-contain justify-center flex-shrink-0">
        <img src={forum.cover} alt={forum.bookTitle} className="h-full" />
      </div>
      {/* 책 제목, 토론 예정 시간 */}
      <div className="flex flex-col font-bold w-full gap-5">
        {/* 책 제목 */}
        <div
          className={`flex  w-full ${
            isMultiLine ? "flex-col items-start" : "justify-between"
          }`}
        >
          <div className="flex gap-1 w-1/2 items-center">
            <PiBookOpenFill size={16} color="7D5C4D" />
            <p className="text-undpoint font-extrabold">책 제목</p>
          </div>
          <p
            className={`text-undtextgray ${
              isMultiLine ? "text-left" : "text-right"
            }`}
          >
            {forum.bookTitle}
          </p>
        </div>
        {/* 토론 예정 시간 or 진행 시간 */}
        {forum.status === "IN_PROGRESS" || forum.status === "COMPLETED" ? (
          <div className="flex flex-col justify-start w-full">
            <div className="flex gap-1 w-full items-center">
              <PiAlarmFill size={16} color="7D5C4D" />
              <p className="text-left text-undpoint font-extrabold">
                토론 진행 시간
              </p>
            </div>
            <div className=" flex justify-between text-left text-undtextgray w-full">
              <p>
                {forum.startDate &&
                  `${forum.startDate
                    .split("T")[0]
                    .replace(/-/g, ".")} ${forum.startDate
                    .split("T")[1]
                    .slice(0, 5)}`}
              </p>
              ~
              <p>
                {forum.closedAt &&
                  ` ${forum.closedAt
                    .split("T")[0]
                    .replace(/-/g, ".")} ${forum.closedAt
                    .split("T")[1]
                    .slice(0, 5)}`}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <div className="flex gap-1 w-full items-center">
              <PiAlarmFill size={16} color="7D5C4D" />
              <p className="text-left text-undpoint font-extrabold">
                토론 예정 시간
              </p>
            </div>
            <p className="text-right text-undtextgray w-full">
              {forum.startDate &&
                `${forum.startDate
                  .split("T")[0]
                  .replace(/-/g, ".")} ${forum.startDate
                  .split("T")[1]
                  .slice(0, 5)}`}
            </p>
          </div>
        )}
        {/* 토론 내용 */}
        <div className={"flex  w-full flex-col items-start"}>
          <div className="flex gap-1 w-full items-center">
            <PiPushPinFill size={16} color="7D5C4D" />
            <p className="text-undpoint font-extrabold">토론 주제</p>
          </div>
          <p className="text-undtextgray text-left whitespace-pre-line">
            {forum.content}
          </p>
        </div>
      </div>
      {/* 찬반 수, 베스트 댓글 등 */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ForumContent;
