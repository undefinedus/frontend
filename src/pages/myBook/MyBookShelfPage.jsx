import { useEffect, useRef, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import BookShelf from "../../components/myBook/BookShelf";
import BookShelfHeader from "../../components/myBook/BookShelfHeader";
import ISBNOptionsModal from "../../components/modal/books/ISBNOptionsModal";
import ISBNScanner from "../../components/home/ISBNScanner";
import ISBNReader from "../../components/home/ISBNReader";

import BookmarkScanner from "../../components/myBook/BookmarkScanner";

// 기능 개발용 페이지
const MyBookShelfPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [isReaderActive, setIsReaderActive] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [isBookmarkScannerActive, setIsBookmarkScannerActive] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOptionSelect = (option) => {
    closeModal();
    if (option === "scan") {
      setIsScannerActive(true);
      setIsReaderActive(false);
    } else if (option === "capture") {
      setIsReaderActive(true);
      setIsScannerActive(false);
    }
  };

  const handleSwitchToCapture = () => {
    setIsScannerActive(false);
    setIsReaderActive(true);
  };

  const handleCloseScanner = () => {
    setIsScannerActive(false);
  };

  const handleSuccessToGetISBN = (code) => {
    setIsbn(code);
    setIsReaderActive(false);
    setIsScannerActive(false);
  };

  const handleBookmarkReader = () => {
    setIsBookmarkScannerActive(true);
  };

  const handleSuccessToGetText = (text) => {
    setExtractedText(text);
    setIsBookmarkScannerActive(false);
  };

  return (
    <BasicLayout>
      <BookShelfHeader />

      <div className="bg-black w-20 h-20 text-white" onClick={openModal}>
        ISBN 스캔
      </div>

      <div
        className="bg-black w-20 h-20 text-white"
        onClick={handleBookmarkReader}
      >
        구절 스캔
      </div>

      {isModalOpen && (
        <ISBNOptionsModal
          onSelectOption={handleOptionSelect}
          onClose={closeModal}
        />
      )}

      {isScannerActive && (
        <div className="mt-10">
          <ISBNScanner
            onSwitchToCapture={handleSwitchToCapture}
            onCloseScannner={handleCloseScanner}
            onSuccessScan={handleSuccessToGetISBN}
          />
        </div>
      )}

      {isReaderActive && (
        <div className="mt-10">
          <ISBNReader onSuccessRead={handleSuccessToGetISBN} />
        </div>
      )}

      {isBookmarkScannerActive && (
        <div className="mt-10">
          <BookmarkScanner onSuccessExtract={handleSuccessToGetText} />
        </div>
      )}

      {extractedText && (
        <div className="w-full p-4 bg-green-100 text-green-700 rounded-lg">
          추출된 텍스트: {extractedText}
        </div>
      )}

      {isbn && (
        <div className="w-full p-4 bg-green-100 text-green-700 rounded-lg">
          스캔된 ISBN: {isbn}
        </div>
      )}
    </BasicLayout>
  );
};

export default MyBookShelfPage;
