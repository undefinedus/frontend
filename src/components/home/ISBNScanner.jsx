import { useEffect, useState } from "react";
import Quagga from "quagga";
import SlrModalLayout from "../../layouts/SlrModalLayout";
import Button from "../../components/commons/Button";

// ISBN 스캔 카메라 모달
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
            width: "100%",
            height: "100%",
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
    <SlrModalLayout size={""} onClose={onCloseScannner}>
      <div className="flex w-full h-full flex-col justify-start items-center">
        <div className="flex w-full h-80 flex-col justify-start items-center gap-auto">
          {/* 상단 제목 */}
          <h2 className="text-xl font-bold mb-4">ISBN 스캔</h2>

          {/* 스캔 컨테이너 */}
          <div
            id="isbn-scanner"
            className="relative w-full h-80 bg-white overflow-hidden mb-4"
            style={{ width: "100%" }}
          >
            {/* 비디오 요소 스타일 강제 적용 */}
            <style>
              {`
          #isbn-scanner video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%; /* 컨테이너 너비 채움 */
            height: 100%; /* 컨테이너 높이 채움 */
            object-fit: cover; /* 화면 비율 유지하며 채우기 */
          }
        `}
            </style>
          </div>
          {/* 안내 메시지 */}
          <p className="text-undpoint text-und16 font-bold">
            기기에 따라 스캔 인식률이 낮을 수 있습니다
            <br />
            직접 촬영 모드로 전환하여 재시도해 주세요
          </p>
        </div>

        {/* 버튼들 */}
        <Button
          onClick={onSwitchToCapture}
          color="undpoint"
          className="h-12 rounded-3xl fixed bottom-8 left-6 right-6 text-und18 font-bold"
        >
          직접 촬영
        </Button>
      </div>
    </SlrModalLayout>
  );
};

export default ISBNScanner;
