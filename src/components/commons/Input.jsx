import React, { forwardRef } from "react";

// 공통 입력 필드 컴포넌트
const MyPageInput = forwardRef((props, ref) => {
  const {
    id,
    label,
    className,
    type,
    name,
    value,
    placeholder,
    onChange,
    disabled,
    maxLength,
  } = props;

  return (
    <div className="text-start">
      <label className={`mb-2 text-undtextdark`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`block p-2.5 rounded-full ${className} w-[297px] border border-undtextgray `}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        ref={ref}
      />
    </div>
  );
});

MyPageInput.displayName = "MyPageInput";

export default MyPageInput;
