import { useState } from "react";
import { PiXCircleFill } from "react-icons/pi";

const SlrModalLayout = ({ size = "large", children, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className={`w-full ${
          size === "large" ? "h-5/6" : size === "profile" ? "h-80" : "h-2/3"
        } fixed bottom-0 bg-white rounded-t-3xl px-7 py-4 ${
          isClosing ? "animate-slideDown" : "animate-slideUp"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-4 h-6">
          <PiXCircleFill size={26} color="#0C0A09" onClick={handleClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SlrModalLayout;
