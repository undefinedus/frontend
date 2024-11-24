import React from "react";
import LoadingSpinner from "../commons/LoadingSpinner"; // Spinner 컴포넌트 import

const Button = ({
  buttonDisabled,
  className,
  color,
  onClick,
  children,
  onKeyDown,
  isLoading, // 로딩 상태 prop 추가
  loadingText = "전송 중", // 로딩 시 표시할 텍스트 (기본값 설정)
  ...props
}) => {
  const colorClasses = {
    undpoint: "bg-undpoint text-white",
    unddisabled: "bg-unddisabled text-undtextgray",
    // 필요한 색상 추가
  };

  // 버튼 내용을 렌더링하는 함수
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner size="sm" />
          <span className="text-base">{loadingText}</span>
        </div>
      );
    }
    return children;
  };

  return (
    <button
      {...props}
      onKeyDown={onKeyDown}
      onClick={onClick}
      disabled={buttonDisabled || isLoading} // isLoading일 때도 버튼 비활성화
      className={`${colorClasses[color]} ${className} ${
        isLoading ? "cursor-not-allowed" : ""
      }`}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
