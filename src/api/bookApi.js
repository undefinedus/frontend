import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/books`;

export const getBookList = async () => {
  const res = await jwtAxios.get(`${host}`);
  console.log(res);
  return res;
};

export const addBook = async () => {
  const res = await jwtAxios.post(`${host}`);
  console.log(res);
  return res;
};
