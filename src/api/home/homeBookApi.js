import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 홈 추천 도서 API - AladinAPIController
const host = `${API_SERVER_HOST}/api/aladinApi`; // 베스트 셀러, 취향 맞춤
const gptHost = `${API_SERVER_HOST}/api/chatGpt`; // AI 추천 도서

// 베스트셀러 목록 출력
export const getBestSeller = async () => {
  try {
    const res = await jwtAxios.get(`${host}/bestseller`);
    return res.data;
  } catch (error) {
    console.error(error, "베스트 셀러 목록을 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 베스트 셀러 데이터를 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 취향 맞춤 목록 출력
export const getCategoryBest = async () => {
  try {
    const res = await jwtAxios.get(`${host}/editorChoice`);
    return res.data;
  } catch (error) {
    console.error(error, "취향 맞춤 목록을 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 취향 맞춤 데이터를 가져오는 중 오류가 발생했습니다."
    );
  }
};

// AI 맞춤 목록 출력
export const getAIRecommend = async () => {
  try {
    const res = await jwtAxios.get(`${gptHost}/recommended`);
    return res.data;
  } catch (error) {
    console.error(error, "AI 추천 목록을 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 AI 추천 데이터를 가져오는 중 오류가 발생했습니다."
    );
  }
};
