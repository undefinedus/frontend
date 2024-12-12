import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 토론 댓글 API - DiscussionCommentController
const host = `${API_SERVER_HOST}/api/discussionComment`;

// 베스트 댓글 3개 목록
export const getBestComment = async (discussionId) => {
  const res = await jwtAxios.get(`${host}/bestComment/${discussionId}`);
  console.log("=========getBestComment from api: ", res.data.data);
  return res.data.data;
};
