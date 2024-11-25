import React from "react";

// ISBN 인식 옵션 선택 모달
const ISBNOptionsModal = ({ onSelectOption, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-md w-80 text-center">
        <p className="text-base font-bold">
          ISBN을 인식할 방법을 선택해 주세요
        </p>
        <p className="text-und14 font-bold mb-4">
          (기기에 따라 스캔 인식률이 다를 수 있습니다)
        </p>
        <button
          className="bg-undpoint text-white py-2 px-4 rounded-lg"
          onClick={() => onSelectOption("scan")}
        >
          스캔
        </button>
        <button
          className="bg-undpoint text-white py-2 px-4 rounded-lg"
          onClick={() => onSelectOption("capture")}
        >
          촬영
        </button>
        <button
          className="bg-undtextgray text-white py-2 px-4 rounded-lg"
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ISBNOptionsModal;
