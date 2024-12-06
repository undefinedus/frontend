import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/reports`;

export const addReport = async (reportData) => {
  console.log("reportData at api: ", reportData);

  const res = await jwtAxios.post(`${host}`, reportData, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("=========postReport from api: ", res);
  return res;
};
