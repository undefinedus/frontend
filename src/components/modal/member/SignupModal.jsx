import React, { useRef } from "react";
import { PiXCircleFill } from "react-icons/pi";
import Button from "../../commons/Button";
import { useNavigate } from "react-router-dom";

const SignupModal = ({
  isOpen,
  confirmText,
  onClose,
  children,
  buttonDisabled,
  onConfirm,
}) => {
  const modalBackground = useRef();
  const navigate = useNavigate();

  const closeModal = (e) => {
    if (e.target === modalBackground.current) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!buttonDisabled) {
      onConfirm?.(); // onConfirm이 있다면 실행
      navigate("/member/signup"); // 회원가입 페이지로 이동
      onClose(); // 모달 닫기
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
      ref={modalBackground}
      onClick={closeModal}
    >
      <div className="bg-white rounded-t-3xl shadow p-6 w-full flex flex-col justify-between h-[469px]">
        <div className=" flex justify-end ">
          <PiXCircleFill size={32} onClick={onClose} />
        </div>
        <div className="w-full flex flex-col gap-4">{children}</div>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleConfirm}
            className="text-undpoint py-3 rounded-full font-bold w-full text-lg"
            color={`${buttonDisabled ? "unddisabled" : "undpoint"}`}
            disabled={buttonDisabled}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
