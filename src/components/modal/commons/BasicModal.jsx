import React, { useRef } from "react";
import { PiXCircleFill } from "react-icons/pi";
import Button from "../../commons/Button";

const SignupModal = ({ isOpen, confirmText, onConfirm, onClose, children }) => {
  const modalBackground = useRef();

  const closeModal = (e) => {
    if (e.target === modalBackground.current) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
      ref={modalBackground}
      onClick={closeModal}
    >
      <div className="bg-white rounded-t-3xl shadow p-6 w-full flex flex-col justify-between h-2/3">
        <div className=" flex justify-end ">
          <PiXCircleFill size={32} onClick={onClose} />
        </div>
        {children}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={onConfirm}
            className="text-undpoint py-3 rounded-full font-semibold w-full"
            color="undpoint"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
