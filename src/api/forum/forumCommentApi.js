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
export const getCommentList = async (discussionId, lastId = null) => {
  let apiRoute = `${host}/${discussionId}?size=20`;
  if (lastId) apiRoute += `&lastId=${lastId}`;
  const res = await jwtAxios.get(apiRoute);
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
  return res;
};

// 대댓글 작성
export const writeReply = async (
  discussionId,
  discussionCommentId,
  voteType,
  content
) => {
  const data = {
    discussionId,
    discussionCommentId,
    voteType,
    content,
  };
  const res = await jwtAxios.post(
    `${host}/writeComment/${discussionId}/${discussionCommentId}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res;
};

// 댓글 좋아요
export const addLike = async (commentId) => {
  const res = await jwtAxios.patch(`${host}/addLike/${commentId}`);
  return res.data;
};

// 댓글 싫어요
export const addDislike = async (commentId) => {
  const res = await jwtAxios.patch(`${host}/addDislike/${commentId}`);
  return res.data;
};
