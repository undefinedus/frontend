import React, { useState } from "react";

function MyBook() {
  const [inputValue, setInputValue] = useState(0);

  // input 값이 0~100 사이로 제한되도록 하는 핸들러
  const handleInputChange = (e) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setInputValue(value);
    // 0~100 사이의 값으로 설정하는 함수 추후에 책 페이지 수 입력받으면 그에 맞는 %로 수정해야함
  };

  return (
    <>
      {/* <input
        className="border rounded-md w-full mb-3"
        type="number"
        value={inputValue === 0 ? "" : inputValue}
        onChange={handleInputChange}
        placeholder="임시 입력기 (0-100)"
      /> */}
      {/* 임시 % 입력 */}

      <div className="grid grid-cols-MyBookGrid gap-4 w-full ">
        <div className="flex justify-center p-0.5">
          <img
            className="w-16 h-24"
            src="/assets/img/BookImg_01.png"
            alt="Book01"
          />
          {/* 책 이름과 정보를 받아올때는 수정 해야함. */}
        </div>

        <div className="w-full text-xs flex flex-col justify-between items-start text-undtextgray gap-1 overflow-hidden whitespace-nowrap text-ellipsis">
          {/* 책 제목 */}
          <div className="font-semibold text-undtextdark">
            혼자 공부하는 자바 - 1:1 과외하듯 배우는 자바
          </div>
          {/* 책 저자 */}
          <div>신용권</div>
          {/* n일동안 n회 읽었어요! */}
          <div>13일 동안 3회 읽었어요!</div>
          {/* 위의 값들은 나중에 다 사용자 입력에 따라 달라지도록 바꿔야함 */}

          {/* 입력된 %에따라 그래프가 채워지는 부분 */}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center mt-1">
              <div className="w-full bg-gray-100 h-1 rounded-md">
                <div
                  className={`h-full bg-undpoint rounded-md transition-all duration-300`}
                  style={{ width: `${inputValue}%` }}
                />
              </div>
              <div className="text-undpoint ps-3">{inputValue}%</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBook;
