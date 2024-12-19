import jwtAxios from "../../../util/jwtUtil";
import { API_SERVER_HOST } from "../../commonApi";
const host = `${API_SERVER_HOST}/api/calendar/getStamps`;

export const getStamps = async (year, month) => {
  const res = await jwtAxios.get(`${host}`, {
    params: { year: year, month: month },
  });
  return res;
};
