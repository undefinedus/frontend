import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/books`;

export const getBookList = async (status, sort, search, lastId = null) => {
  let apiRoute = `${host}?status=${status}&sort=${sort}&search=${search}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }
  const res = await jwtAxios.get(apiRoute);
  return res.data.data;
};

export const getBookDetail = async (bookId) => {
  const res = await jwtAxios.get(`${host}/${bookId}`);
  return res.data.data;
};

export const addBook = async (data) => {
  const res = await jwtAxios.post(`${host}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const modifyBook = async (bookId, data) => {
  const res = await jwtAxios.patch(`${host}/${bookId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const deleteBook = async (bookId) => {
  const res = await jwtAxios.delete(`${host}/${bookId}`);
  return res.data.result;
};
