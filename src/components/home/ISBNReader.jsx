import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const ISBNReader = ({ onSuccessRead }) => {
  const fileInputRef = useRef();
  const [error, setError] = useState(null);

  useEffect(() => {
    fileInputRef.current.click();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const tempDivId = "temp-scanner";
      const tempDiv = document.createElement("div");
      tempDiv.id = tempDivId;
      tempDiv.style.display = "none";
      document.body.appendChild(tempDiv);

      const html5QrCode = new Html5Qrcode("temp-scanner");
      try {
        const result = await html5QrCode.scanFile(file, true);
        if (isValidISBN(result)) {
          onSuccessRead(result);
        } else {
          setError("유효한 ISBN이 아닙니다.");
        }
      } catch (err) {
        setError("바코드 인식에 실패했습니다.");
        console.error("스캔 오류: ", err);
      } finally {
        html5QrCode.clear();
        document.body.removeChild(tempDiv);
      }
    }
  };

  const isValidISBN = (code) => {
    const cleanCode = code.replace(/[^0-9X]/g, "");
    return (
      /^(978|979)\d{10}$/.test(cleanCode) || /^\d{9}[\dX]$/.test(cleanCode)
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">ISBN 사진 업로드</h2>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="mb-4 hidden"
      />

      {error && (
        <div className="w-full p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default ISBNReader;
