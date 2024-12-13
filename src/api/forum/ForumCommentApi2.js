import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 토론 댓글 API - DiscussionCommentController
const host = `${API_SERVER_HOST}/api/discussionComment`;

// 베스트 댓글 3개 목록
export const getBestComment = async (discussionId) => {
  const res = await jwtAxios.get(`${host}/bestComment/${discussionId}`);
  return res.data.data;
};

// 모든 댓글 목록
export const getCommentList = async (discussionId) => {
  const res = await jwtAxios.get(`${host}/${discussionId}`);
  return res.data.data;
};

// 댓글 작성
export const writeComment = async (discussionId, voteType, content) => {
  const data = {
    discussionId,
    voteType,
    content,
  };
  const res = await jwtAxios.post(
    `${host}/writeComment/${discussionId}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("=========writeComment from api: ", res);
  return res;
};
