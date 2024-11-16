import React, { useEffect, useRef, useState } from "react";
import Tesseract, { createWorker } from "tesseract.js";

const ImageSelectionModal = ({ source, onClose, onExtractedText }) => {
  const imgRef = useRef();

  const [selection, setSelection] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPosition, setStartPosition] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const preprocessImage = (image, selection) => {
    console.log("Preprocess 시작");
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = selection.width;
    croppedCanvas.height = selection.height;
    const croppedCtx = croppedCanvas.getContext("2d");

    croppedCtx.drawImage(
      image,
      selection.x,
      selection.y,
      selection.width,
      selection.height,
      0,
      0,
      selection.width,
      selection.height
    );

    // console.log("이미지 잘림 완료:", croppedCanvas);

    // const imageData = croppedCtx.getImageData(
    //   0,
    //   0,
    //   croppedCanvas.width,
    //   croppedCanvas.height
    // );
    // const data = imageData.data;

    // console.log("이미지 데이터 가져오기 완료");

    // // grayscale
    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }

    // // binarize
    // const threshold = 128;
    // for (let i = 0; i < data.length; i += 4) {
    //   const value = data[i] < threshold ? 0 : 255;
    //   data[i] = value;
    //   data[i + 1] = value;
    //   data[i + 2] = value;
    // }

    // croppedCtx.putImageData(imageData, 0, 0);

    // console.log("이미지 전처리 완료");

    return croppedCanvas;
  };

  const handleStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = imgRef.current.getBoundingClientRect();
    setStartPosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setIsSelecting(true);
  };

  const handleMove = (e) => {
    if (!isSelecting || !startPosition) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = imgRef.current.getBoundingClientRect();
    const currentPosition = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    setSelection({
      x: Math.min(startPosition.x, currentPosition.x),
      y: Math.min(startPosition.y, currentPosition.y),
      width: Math.abs(currentPosition.x - startPosition.x),
      height: Math.abs(currentPosition.y - startPosition.y),
    });
  };

  const handleEnd = async () => {
    setIsSelecting(false);

    if (selection && imgRef.current) {
      const image = new Image();
      image.src = source;

      image.onload = async () => {
        console.log("이미지 로드 완료");
        const processedCanvas = preprocessImage(image, selection);

        console.log("Processed Canvas 생성 완료:", processedCanvas);

        setIsProcessing(true);

        try {
          console.log("Worker recognize 호출 준비");
          const {
            data: { text },
          } = await Tesseract.recognize(processedCanvas, "kor", {
            logger: (m) => console.log("진행 상태:", m),
            //langPath: "/tessdata",
          });
          console.log("OCR 결과:", text);
          onExtractedText(text);
        } catch (error) {
          console.error("텍스트 추출 오류:", error);
          onExtractedText("텍스트 추출에 실패했습니다.");
        } finally {
          setIsProcessing(false);
          onClose();
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-md"
          disabled={isProcessing}
        >
          닫기
        </button>
        <div
          className="relative w-full h-full"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          <img
            ref={imgRef}
            src={source}
            alt="Captured"
            className="w-full h-full object-contain rounded-lg"
          />
          {selection && (
            <div
              style={{
                position: "absolute",
                top: selection.y,
                left: selection.x,
                width: selection.width,
                height: selection.height,
                border: "2px solid blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSelectionModal;
