import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 토론 API - DiscussionCommentController / ChatGPTController
const host = `${API_SERVER_HOST}/api/discussion`;
const gptHost = `${API_SERVER_HOST}/api/chatGpt`; // AI 토론 결과 분석

// 토론 목록
export const getForums = async (status, sort, search, lastId = null) => {
  let apiRoute = `${host}?status=${status}&sort=${sort}&search=${search}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }
  try {
    const res = await jwtAxios.get(apiRoute);
    console.log("=========getForums from api: ", res);
    return res.data.data;
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error; // 상위로 오류 전달
  }
};

// 토론 상세
export const getForumDetail = async (discussionId) => {
  const res = await jwtAxios.get(`${host}/detail?discussionId=${discussionId}`);
  console.log("=========getForumDetail from api: ", res.data.data);
  return res.data.data;
};

// 찬성 참석
// export const getForumDetail = async (discussionId) => {
//   const res = await jwtAxios.get(`${host}//joinAgree`);
//   console.log("=========getForumDetail from api: ", res.data.data);
//   return res.data.data;
// };

// 발의글 작성
export const writePropose = async (data) => {
  console.log("data at api: ", data);

  const res = await jwtAxios.post(`${host}/register?isbn13=${isbn13}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("=========writePropose from api: ", res);
  return res;
};
