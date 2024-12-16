import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 토론 API - DiscussionCommentController / ChatGPTController
const host = `${API_SERVER_HOST}/api/discussion`;
const gptHost = `${API_SERVER_HOST}/api/ai`; // AI 토론 결과 분석

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
export const postJoinAgree = async (discussionId) => {
  const res = await jwtAxios.get(
    `${host}/joinAgree?discussionId=${discussionId}`
  );
  console.log("=========postJoinAgree from api: ", res);
  return res;
};

// 반대 참석
export const postJoinDisagree = async (discussionId) => {
  const res = await jwtAxios.get(
    `${host}/joinDisagree?discussionId=${discussionId}`
  );
  console.log("=========postJoinDisagree from api: ", res);
  return res;
};

// 발의글 작성
export const writePropose = async (isbn13, title, content, startDate) => {
  const data = {
    isbn13,
    title,
    content,
    startDate,
  };
  const res = await jwtAxios.post(`${host}/register`, data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("=========writePropose from api: ", res);
  return res;
};

// 발의글 수정
export const modifyPropose = async (
  discussionId,
  title,
  content,
  modifyStartTime
) => {
  const data = {
    discussionId,
    title,
    content,
    modifyStartTime,
  };
  const res = await jwtAxios.patch(`${host}/update`, data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("=========modifyPropose from api: ", res);
  return res;
};

// 토론 삭제(발의 상태일 때만)
export const deleteForum = async (discussionId) => {
  const res = await jwtAxios.delete(`${host}/${discussionId}`);
  console.log("=========deleteForum 삭제 완료", res);
  return res;
};

// AI 토론 결과 분석
export const getAIResult = async (discussionId) => {
  const res = await jwtAxios.get(`${gptHost}/discussion/${discussionId}`);
  console.log("=========getAIResult from api: ", res.data.data);
  return res.data.data;
};
