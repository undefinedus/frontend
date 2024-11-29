import React, { forwardRef } from "react";
// 공통 입력 필드 컴포넌트
const Input = forwardRef((props, ref) => {
  const {
    id,
    labeltext,
    className,
    type,
    name,
    value,
    placeholder,
    onChange,
    disabled,
    maxLength,
    minLength,
    children,
    readonly,
    onInput,
    onKeyDown,
    width,
  } = props;

  return (
    <div className={`text-start ${width || "w-full"}`}>
      <label className={` text-undtextdark flex justify-between`} htmlFor={id}>
        <div>{labeltext}</div>
        <div className="text-sm">{children}</div>
      </label>
      <input
        className={`block p-2.5 rounded-full${
          readonly
            ? "focus:outline-none text-undtextdark bg-opacity-10 bg-undtextgray text-opacity-60"
            : ""
        } ${className} `}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        ref={ref}
        readOnly={readonly}
        onInput={onInput}
        onKeyDown={onKeyDown}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
