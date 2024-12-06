import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../commonApi";

const host = `${API_SERVER_HOST}/api/reports`;

export const getReportList = async (tab, sortOrder = "desc", lastId = null) => {
  try {
    let apiUrl = `${host}?tabCondition=${encodeURIComponent(
      tab
    )}&sort=${sortOrder}`;

    if (lastId) {
      apiUrl += `&lastId=${lastId}`;
    }

    const response = await jwtAxios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("신고내역 조회 실패:", error);
    throw error;
  }
};

export const getReportDetail = async (id) => {
  try {
    const response = await jwtAxios.get(`${host}/${id}`);
    return response.data;
  } catch (error) {
    console.error("신고 상세 조회 실패:", error);
    throw error;
  }
};

export const rejectReport = async (id) => {
  try {
    const response = await jwtAxios.patch(`${host}/reject/${id}`);
    return response.data;
  } catch (error) {
    console.error("신고 반려 실패:", error);
    throw error;
  }
};

export const approvalReport = async (id) => {
  try {
    const response = await jwtAxios.patch(`${host}/approval/${id}`);
    return response.data;
  } catch (error) {
    console.error("신고 승인 실패:", error);
    throw error;
  }
};
