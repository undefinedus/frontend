import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 책 전체 검색 API - AladinAPIController
const host = `${API_SERVER_HOST}/api/aladinApi`;

// 책 검색 목록 출력
export const getSearchBookList = async (keyword, sort, page) => {
  const res = await jwtAxios.get(`${host}/keyword`, {
    params: { keyword, sort, page },
  });
  return res.data;
};

// 검색한 책 상세 출력
export const getSearchBookDetail = async (isbn13) => {
  const res = await jwtAxios.get(`${host}/detail`, {
    params: { isbn13 },
  });
  return res.data.data[0];
};
