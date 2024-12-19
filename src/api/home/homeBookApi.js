import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 홈 추천 도서 API - AladinAPIController
const host = `${API_SERVER_HOST}/api/aladinApi`; // 베스트 셀러, 취향 맞춤
const gptHost = `${API_SERVER_HOST}/api/ai`; // AI 추천 도서

// 베스트셀러 목록 출력
export const getBestSeller = async () => {
  const res = await jwtAxios.get(`${host}/bestseller`);
  return res.data;
};

// 취향 맞춤 목록 출력
export const getCategoryBest = async () => {
  const res = await jwtAxios.get(`${host}/editorChoice`);
  return res.data;
};

// AI 맞춤 목록 출력
export const getAIRecommend = async (signal) => {
  const res = await jwtAxios.get(`${gptHost}/recommended`, {
    signal: signal,
  });
  return res.data;
};
