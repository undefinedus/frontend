import React from "react";

const ISBNOptionsModal = ({ onSelectOption, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-80 text-center">
        <h3 className="text-base font-bold mb-4">
          스캔은 기기에 따라 인식률이 떨어질 수 있습니다.
        </h3>
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
