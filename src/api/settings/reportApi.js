import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../commonApi";

const host = `${API_SERVER_HOST}/api/reports`;

// tabCondition 값을 변환하는 함수
const convertTabCondition = (tab) => {
  switch (tab) {
    case "미처리":
      return "미처리";
    case "처리완료":
      return "처리 완료"; // 공백 추가
    default:
      return tab;
  }
};

export const getReportList = async (tab, sortOrder = "desc") => {
  try {
    const res = await jwtAxios.get(`${host}`, {
      params: {
        tabCondition: tab,
        sort: sortOrder, // "desc" 또는 "asc"
      },
    });

    return res.data;
  } catch (error) {
    console.error("신고내역 조회 실패:", error);
    throw error;
  }
};

export const getReportDetail = async (id) => {
  try {
    const res = await jwtAxios.get(`${host}/${id}`);

    return res.data;
  } catch (error) {
    console.error("신고 상세 내역 조회 실패:", error);
    throw error;
  }
};

export const rejectReport = async (id) => {
  try {
    const res = await jwtAxios.patch(`${host}/reject/${id}`);

    return res.data;
  } catch (error) {
    console.error("신고 반려 실패:", error);
    throw error;
  }
};

export const approvalReport = async (id) => {
  try {
    const res = await jwtAxios.patch(`${host}/approval/${id}`);

    return res.data;
  } catch (error) {
    console.error("신고 승인 실패:", error);
    throw error;
  }
};
