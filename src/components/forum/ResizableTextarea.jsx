import React, { useRef, useEffect } from "react";

const ResizableTextarea = ({
  label, // 텍스트레이블 (예: "발의 내용")
  value, // textarea의 값
  onChange, // 값이 변경될 때 호출되는 핸들러
  maxLength, // 최대 문자 수
  placeholder, // placeholder 텍스트
  rows = 1, // 기본 행 수 (디폴트값: 1)
  disabled,
}) => {
  const textareaRef = useRef(null);

  // textarea 높이 동적 관리
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞게 높이 설정
    }
  };

  // value 초기값 설정 시 높이 조정
  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  // 변경 핸들러
  const handleChange = (event) => {
    if (event.target.value.length <= maxLength) {
      onChange(event);
      adjustTextareaHeight();
    }
  };

  return (
    <div className="flex flex-col text-left justify-start gap-1">
      <div className="flex justify-between items-center">
        <p className="text-und16 font-bold text-undtextdark">{label}</p>
        <p className="text-und12 font-bold text-undtextgray">
          ({value.length}자/{maxLength}자)
        </p>
      </div>
      <textarea
        ref={textareaRef}
        className="w-full border border-unddisabled rounded-[10px] p-4 text-undtextdark text-und14 text-left"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows} // props로 받은 초기 행 수 설정
        style={{ overflow: "hidden" }}
        disabled={disabled}
      />
    </div>
  );
};

export default ResizableTextarea;
