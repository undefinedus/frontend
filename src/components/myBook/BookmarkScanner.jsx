import { useState } from "react";
import ImageSelectionModal from "../modal/ImageSelectionModal";

const BookmarkScanner = ({ onSuccessExtract }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setIsModalOpen(true);
    } else {
      setImageUrl(null);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
  };

  const handleExtractedText = (text) => {
    console.log(text);
    onSuccessExtract(text);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold">책갈피 스캐너</h2>

      {/* 파일 업로드 */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="mt-4"
      />

      {/* ImageSelectionModal 호출 */}
      {isModalOpen && imageUrl && (
        <ImageSelectionModal
          source={imageUrl}
          onClose={handleCloseModal}
          onExtractedText={handleExtractedText}
        />
      )}
    </div>
  );
};

export default BookmarkScanner;
