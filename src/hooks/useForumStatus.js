import { useMemo } from "react";
import {
  FORUM_STATUS_KOREAN_TO_ENGLISH,
  FORUM_STATUS_ENGLISH_TO_KOREAN,
} from "../statusMapping";

const useForumStatus = () => {
  const getStatusInEnglish = (statusInKorean) =>
    FORUM_STATUS_KOREAN_TO_ENGLISH[statusInKorean] || null;
  const getStatusInKorean = (statusInEnglish) =>
    FORUM_STATUS_ENGLISH_TO_KOREAN[statusInEnglish] || null;

  return useMemo(() => ({ getStatusInEnglish, getStatusInKorean }), []);
};

export default useForumStatus;
