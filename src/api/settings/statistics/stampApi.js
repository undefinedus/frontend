import jwtAxios from "../../../util/jwtUtil";
import { API_SERVER_HOST } from "../../commonApi";
const host = `${API_SERVER_HOST}/api/calendar/getStamps`;

export const getStamps = async (year, month) => {
  try {
    const res = await jwtAxios.get(`${host}`, {
      params: { year: year, month: month },
    });

    return res;
  } catch (error) {
    console.log("달력 정보 조회에 실패했습니다.", error);
    throw error;
  }
};
