import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 책 전체 검색 API - AladinAPIController
const host = `${API_SERVER_HOST}/api/aladinApi`;

// 책 검색 목록 출력
export const getSearchBookList = async (keyword, sort, page) => {
  try {
    const res = await jwtAxios.get(`${host}/keyword`, {
      params: { keyword, sort, page },
    });
    console.log("*********res.data:", res.data);

    return res.data;
  } catch (error) {
    console.error(error, "검색 결과를 불러오는 데 실패하였습니다");
    throw new Error("서버에서 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

// 검색한 책 상세 출력
export const getSearchBookDetail = async (isbn13) => {
  try {
    const res = await jwtAxios.get(`${host}/detail`, {
      params: { isbn13 },
    });
    return res.data.data[0];
  } catch (error) {
    console.error(error, "검색 결과를 불러오는 데 실패하였습니다");
    throw new Error("서버에서 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};
