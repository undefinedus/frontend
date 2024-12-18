import React, { useState, useEffect, useRef } from "react";
import he from "he";

// 책 표지와 제목을 보여주는 컴포넌트
const BookCoverTitle = ({ book }) => {
  const { title, cover } = book; // book 객체에서 필요한 값 구조 분해
  const [isMultiline, setIsMultiline] = useState(false); // 줄바꿈 여부 상태
  const titleRef = useRef(null); // 제목 DOM 참조

  useEffect(() => {
    // 줄바꿈 여부 확인
    const element = titleRef.current;
    if (element) {
      const isOverflowing = element.scrollHeight > element.offsetHeight;
      setIsMultiline(isOverflowing); // 줄바꿈 여부 업데이트
    }
  }, [title]); // title이 변경될 때마다 실행

  return (
    <div className="flex flex-col items-center px-6">
      {/* 책 표지 */}
      <div className="flex-shrink-0 ">
        <img src={cover} alt={title} className="h-40 w-auto object-contain" />
      </div>

      {/* 책 제목 */}
      <p
        ref={titleRef} // 제목 DOM 참조
        className={`h-8 pt-4 text-und16 text-left w-full content-center ${
          isMultiline && "h-auto" // 줄바꿈 시 폰트 크기 16
        } font-bold`}
      >
        {he
          .decode(title || "")
          .split(/<br\s*\/?>/i)
          .map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </p>
    </div>
  );
};

export default BookCoverTitle;
