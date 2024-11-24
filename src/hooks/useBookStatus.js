import { useMemo } from "react";
import {
  STATUS_KOREAN_TO_ENGLISH,
  STATUS_ENGLISH_TO_KOREAN,
} from "../statusMapping";

const useBookStatus = () => {
  const getStatusInEnglish = (statusInKorean) =>
    STATUS_KOREAN_TO_ENGLISH[statusInKorean] || null;
  const getStatusInKorean = (statusInEnglish) =>
    STATUS_ENGLISH_TO_KOREAN[statusInEnglish] || null;

  return useMemo(() => ({ getStatusInEnglish, getStatusInKorean }), []);
};

export default useBookStatus;
