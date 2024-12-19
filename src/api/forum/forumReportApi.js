import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/reports`;

// 토론글 신고
export const addReportForum = async (discussionId, reason) => {
  const data = {
    discussionId,
    reason,
  };
  const res = await jwtAxios.post(`${host}/discussion/${discussionId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

// 토론 댓글 신고
export const addReportComment = async (commentId, reason) => {
  const data = {
    commentId,
    reason,
  };
  const res = await jwtAxios.post(`${host}/comment/${commentId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
