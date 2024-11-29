import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/bookmark`;

export const getAllBook = async (search = "", sort = "desc", lastId = null) => {
  let apiRoute = `${host}/addSearch?search=${search}&sort=${sort}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }
  const res = await jwtAxios.get(apiRoute);
  console.log("getAllBook res: ", res.data.data);
  return res.data.data;
};

export const addBookmark = async (data) => {
  console.log("data from api: ", data);
  const res = await jwtAxios.post(host, data);
  console.log("addBookmark res: ", res);
  return res;
};

export const getBookmarkList = async (
  search = "",
  sort = "desc",
  lastId = ""
) => {
  let apiRoute = `${host}?search=${search}&sort=${sort}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }
  const res = await jwtAxios.get(apiRoute);
  console.log("getBookmarkList res: ", res.data.data);
  return res.data.data;
};

export const modifyBookmark = async (bookmarkId, data) => {
  console.log("data from api: ", data);
  const res = await jwtAxios.patch(`${host}/${bookmarkId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("modifyBookmarkList res: ", res);
  return res;
};

export const deleteBookmark = async (bookmarkId) => {
  const res = await jwtAxios.delete(`${host}/${bookmarkId}`);
  console.log("deleteBookmark res: ", res);
  return res;
};
