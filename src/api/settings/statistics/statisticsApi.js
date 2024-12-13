import jwtAxios from "../../../util/jwtUtil";
import { API_SERVER_HOST } from "../../commonApi";
const host = `${API_SERVER_HOST}/api/statistics`;

export const getCategoryStatistics = async () => {
  try {
    const res = await jwtAxios.get(`${host}`);

    console.log("API 원본 응답", res);

    return res;
  } catch (error) {
    console.error("통계 데이터 조회 실패:", error);
    throw error;
  }
};

export const getMonthlyCompletedMyBookData = async (year) => {
  try {
    const res = await jwtAxios.get(`${host}/monthly`, {
      params: { year: year },
    });

    return res;
  } catch (error) {
    console.log("월간 데이터 통계 조회 실패", error);
    throw error;
  }
};

export const getTotalStatisticsYearsBookInfo = async () => {
  try {
    const response = await jwtAxios.get(`${host}/totalYearly`, {});
    return response;
  } catch (error) {
    console.log("다 읽은 책 통계 세부 정보 조회 실패", error);
    throw error;
  }
};

export const getMemberYears = async () => {
  try {
    const response = await jwtAxios.get(`${host}/years`, {});
    return response;
  } catch (error) {
    console.log("연도 조회 실패", error);
    throw error;
  }
};

export const getCategoryAndBookCountByYearList = async () => {
  try {
    const res = await jwtAxios.get(`${host}/yearly`);

    return res;
  } catch (error) {
    console.log("연간 데이터 통계 조회 실패", error);
    throw error;
  }
};
