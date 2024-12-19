import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../commonApi";

const host = `${API_SERVER_HOST}/api/reports`;

export const getReportList = async (tab, sortOrder = "desc", lastId = null) => {
  let apiUrl = `${host}?tabCondition=${encodeURIComponent(
    tab
  )}&sort=${sortOrder}`;
  if (lastId) {
    apiUrl += `&lastId=${lastId}`;
  }
  const response = await jwtAxios.get(apiUrl);
  return response.data;
};

export const getReportDetail = async (id) => {
  const response = await jwtAxios.get(`${host}/${id}`);
  return response.data;
};

export const rejectReport = async (id) => {
  const response = await jwtAxios.patch(`${host}/reject/${id}`);
  return response.data;
};

export const approvalReport = async (id) => {
  const response = await jwtAxios.patch(`${host}/approval/${id}`);
  return response.data;
};
