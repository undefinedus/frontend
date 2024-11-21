import React, { useRef } from "react";
import { PiXCircleFill } from "react-icons/pi";
import Button from "../../commons/Button";

const BasicModal = ({
  isOpen,
  confirmText,
  Bottom,
  onConfirm,
  onClose,
  onBackgroundClick, // 새로 추가된 prop
  children,
  className,
  bgClassName,
  activeCloseButton,
}) => {
  const modalBackground = useRef();

  const closeModal = (e) => {
    if (e.target === modalBackground.current) {
      // 커스텀 핸들러가 있으면 그것을 사용, 없으면 기본 onClose 사용
      if (onBackgroundClick) {
        onBackgroundClick();
      } else {
        onClose();
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${
        Bottom ? "flex items-end" : `flex items-center ${bgClassName}`
      }`}
      ref={modalBackground}
      onClick={closeModal}
    >
      <div
        className={`${
          Bottom
            ? "bg-white rounded-t-3xl shadow p-6 w-full flex flex-col justify-between h-2/3"
            : `bg-white rounded-lg shadow p-6 flex flex-col justify-between  ${className}`
        }`}
      >
        <div
          className={`flex justify-end ${activeCloseButton ? "hidden" : ""}`}
        >
          <PiXCircleFill size={32} onClick={onClose} />
        </div>
        <div>{children}</div>
        <div>
          <Button
            onClick={onConfirm}
            className="text-undpoint py-3 rounded-full font-bold text-lg w-full"
            color="undpoint"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicModal;
