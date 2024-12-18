import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 토론 댓글 API - DiscussionCommentController
const host = `${API_SERVER_HOST}/api/discussionComment`;

// 베스트 댓글 3개 목록
export const getBestComment = async (discussionId) => {
  const res = await jwtAxios.get(`${host}/bestComment/${discussionId}`);
  console.log("res at api: ", res);

  return res.data.data;
};

// 모든 댓글 목록
export const getCommentList = async (discussionId, lastId = null) => {
  let apiRoute = `${host}/${discussionId}?size=10`;
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
  console.log("=========writeComment from api: ", res);
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
  console.log("=========writeReply from api: ", res);
  return res;
};

// 댓글 좋아요
export const addLike = async (commentId) => {
  console.log("addLike의 댓글ID:", commentId);
  try {
    const res = await jwtAxios.patch(`${host}/addLike/${commentId}`);
    console.log("addLike", res);
    return res;
  } catch (error) {
    console.error("addLike error from server:", error.response);
    throw error;
  }
};

// 댓글 싫어요
export const addDislike = async (commentId) => {
  console.log("addDislike 댓글ID:", commentId);
  try {
    const res = await jwtAxios.patch(`${host}/addDislike/${commentId}`);
    console.log("addDislike", res);
    return res;
  } catch (error) {
    console.error("addDislike error from server:", error.response);
    throw error;
  }
};
