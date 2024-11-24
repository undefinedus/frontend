import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { PiX } from "react-icons/pi";
import {
  PiCaretLeftBold,
  PiPlusBold,
  PiMagnifyingGlass,
  PiBookOpenTextFill,
  PiBookBookmarkFill,
  PiBookFill,
  PiPauseFill,
  PiPencil,
  PiTrash,
  PiTrashSimple,
  PiPencilSimple,
} from "react-icons/pi";

// 제목만
export const OnlyTitle = ({ title, showLine = true }) => {
  return (
    <div
      className={`h-16 flex items-center relative px-6 ${
        showLine && "border-unddisabled border-b"
      }`}
    >
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
    </div>
  );
};

// 이전 버튼 + 제목
export const PrevTitle = ({ title, showLine = true, onClick }) => {
  return (
    <div
      className={`h-16 flex items-center relative px-6 ${
        showLine && "border-unddisabled border-b"
      } bg-undbgmain`}
    >
      {/* 이전 버튼 */}
      <button onClick={onClick} className="absolute">
        <PiCaretLeftBold size={28} color="#51392F" />
      </button>
      {/* 제목 */}
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
    </div>
  );
};

// 이전 버튼 + 책 담기
export const PrevAddBook = ({
  showLine = true,
  onClick,
  onAddBook,
  status,
}) => {
  useEffect(() => {
    console.log("*****book.status", status);
  });
  return (
    <div
      className={`h-16 flex items-center justify-between relative ${
        showLine && "border-unddisabled border-b px-6"
      }`}
    >
      {/* 이전 버튼 */}
      <button onClick={onClick} className="flex">
        <PiCaretLeftBold size={28} color="#51392F" />
      </button>

      {/* 책 담기 */}
      {status === null && (
        <button
          onClick={onAddBook}
          className="flex items-center justify-end gap-1 right-0"
        >
          <PiPlusBold size={28} color="#51392F" />
          <p className="text-right font-bold text-undclickbrown text-und18">
            책 담기
          </p>
        </button>
      )}
      {status === "COMPLETED" && (
        <div className="right-0 flex items-center">
          <PiBookFill size={28} color="#51392F" />
        </div>
      )}
      {status === "WISH" && (
        <div className="right-0 flex items-center">
          <PiBookBookmarkFill size={28} color="#51392F" />
        </div>
      )}
      {status === "READING" && (
        <div className="right-0 flex items-center">
          <PiBookOpenTextFill size={28} color="#51392F" />
        </div>
      )}
      {status === "STOPPED" && (
        <div className="right-0 flex items-center">
          <PiPauseFill size={28} color="#51392F" />
        </div>
      )}
    </div>
  );
};

// 이전 버튼 + 제목 + 수정 + 삭제
export const PrevTitleModifyDelete = ({ onClick, title }) => {
  return (
    <div className="px-6 h-16 flex items-center justify-between relative border-unddisabled border-b">
      {/* 이전 버튼 */}
      <button className="absolute left-6" onClick={() => onClick("back")}>
        <PiCaretLeftBold size={28} color="#51392F" />
      </button>
      {/* 제목 */}
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
      <div className="absolute right-6 flex gap-3">
        <button onClick={() => onClick("modify")}>
          <PiPencilSimple size={28} color="#51392F" />
        </button>
        <button onClick={() => onClick("delete")}>
          <PiTrashSimple size={28} color="#51392F" />
        </button>
      </div>
    </div>
  );
};

// 제목 + 검색 버튼
export const TitleSearch = ({ title, showLine = true }) => {
  return (
    <div
      className={`h-16 flex items-center justify-start relative ${
        showLine && "border-unddisabled border-b px-6"
      }`}
    >
      {/* 제목 */}
      <div className="font-bold text-undclickbrown text-xl mx-auto">
        {title}
      </div>
      {/* 검색 버튼 */}
      <Link to="./searchbook" replace={true} className="absolute right-6">
        <PiMagnifyingGlass size={28} color="#51392F" />
      </Link>
    </div>
  );
};
