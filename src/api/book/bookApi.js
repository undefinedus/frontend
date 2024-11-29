import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/books`;

export const getBookList = async (status, sort, search, lastId = null) => {
  let apiRoute = `${host}?status=${status}&sort=${sort}&search=${search}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }
  const res = await jwtAxios.get(apiRoute);
  console.log("=========getBookList from api: ", res);
  return res.data.data;
};

export const getBookDetail = async (bookId) => {
  const res = await jwtAxios.get(`${host}/${bookId}`);
  console.log("=========getBookDetail from api: ", res);
  return res.data.data;
};

export const addBook = async (data) => {
  console.log("data at api: ", data);

  const res = await jwtAxios.post(`${host}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("=========addBook from api: ", res);
  return res;
};

export const modifyBook = async (bookId, data) => {
  console.log("=========data from api: ", data);

  const res = await jwtAxios.patch(`${host}/${bookId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("=========updateBook from api: ", res);
  return res;
};

export const deleteBook = async (bookId) => {
  const res = await jwtAxios.delete(`${host}/${bookId}`);
  console.log("=========deleteBook from api: ", res);
  return res.data.result;
};
