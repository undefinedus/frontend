import { useEffect, useState } from "react";
import Quagga from "quagga";

const ISBNScanner = ({ onSwitchToCapture, onCloseScannner, onSuccessScan }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#isbn-scanner"), // HTML 요소
          constraints: {
            facingMode: "environment", // 후면 카메라
            width: { ideal: 1920 }, // 해상도 설정
            height: { ideal: 1080 },
          },
        },
        decoder: {
          readers: ["ean_reader"], // EAN-13 형식 인식
        },
      },
      (err) => {
        if (err) {
          console.log("Quagga 초기화 오류:", err);
          setError("카메라 초기화 오류가 발생했습니다.");
          return;
        }
        Quagga.start();
      }
    );

    // 인식 성공 시 처리
    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      if (isValidISBN(code)) {
        onSuccessScan(code);
      }
    });

    return () => {
      Quagga.stop(); // 컴포넌트 언마운트 시 스캔 중지
    };
  }, []);

  const isValidISBN = (code) => {
    const cleanCode = code.replace(/[^0-9X]/g, "");
    return (
      /^(978|979)\d{10}$/.test(cleanCode) || /^\d{9}[\dX]$/.test(cleanCode)
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">ISBN 실시간 스캔</h2>

      <div
        id="isbn-scanner"
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4"
        style={{ width: "100%", height: "300px" }}
      ></div>

      {error && (
        <div className="w-full p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-around mt-4">
        <button
          onClick={onSwitchToCapture}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
        >
          촬영 모드로 전환
        </button>
        <button
          onClick={onCloseScannner}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
        >
          스캔 종료
        </button>
      </div>
    </div>
  );
};

export default ISBNScanner;
