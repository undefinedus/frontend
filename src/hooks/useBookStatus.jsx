import { useMemo } from "react";
import {
  STATUS_KOREAN_TO_ENGLISH,
  STATUS_ENGLISH_TO_KOREAN,
} from "../statusMapping";
import {
  PiBookBookmarkFill,
  PiBookFill,
  PiBookOpenTextFill,
  PiPauseFill,
} from "react-icons/pi";

const useBookStatus = () => {
  const getStatusInEnglish = (statusInKorean) =>
    STATUS_KOREAN_TO_ENGLISH[statusInKorean] || null;
  const getStatusInKorean = (statusInEnglish) =>
    STATUS_ENGLISH_TO_KOREAN[statusInEnglish] || null;
  const getIconByStatus = (status) => {
    switch (status) {
      case "READING":
        return <PiBookOpenTextFill color={"#78716C"} size={20} />;
      case "WISH":
        return <PiBookBookmarkFill color={"#78716C"} size={20} />;
      case "COMPLETED":
        return <PiBookFill color={"#78716C"} size={20} />;
      case "STOPPED":
        return <PiPauseFill color={"#78716C"} size={20} />;
    }
  };

  return useMemo(
    () => ({ getStatusInEnglish, getStatusInKorean, getIconByStatus }),
    []
  );
};

export default useBookStatus;
