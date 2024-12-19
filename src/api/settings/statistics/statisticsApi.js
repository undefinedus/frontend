import jwtAxios from "../../../util/jwtUtil";
import { API_SERVER_HOST } from "../../commonApi";
const host = `${API_SERVER_HOST}/api/statistics`;

export const getCategoryStatistics = async () => {
  const res = await jwtAxios.get(`${host}`);
  return res;
};

export const getMonthlyCompletedMyBookData = async (year) => {
  const res = await jwtAxios.get(`${host}/monthly`, {
    params: { year: year },
  });
  return res;
};

export const getTotalStatisticsYearsBookInfo = async () => {
  const response = await jwtAxios.get(`${host}/totalYearly`, {});
  return response;
};

export const getMemberYears = async () => {
  const response = await jwtAxios.get(`${host}/years`, {});
  return response;
};

export const getCategoryAndBookCountByYearList = async () => {
  const res = await jwtAxios.get(`${host}/yearly`);
  return res;
};
