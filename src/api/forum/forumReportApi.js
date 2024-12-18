import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/reports`;

// 토론글 신고
export const addReportForum = async (discussionId, reason) => {
  const data = {
    discussionId,
    reason,
  };

  try {
    const res = await jwtAxios.post(
      `${host}/discussion/${discussionId}`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res;
  } catch (error) {
    console.error("addReportForum error from server:", error.response);
    throw error;
  }
};

// 토론 댓글 신고
export const addReportComment = async (commentId, reason) => {
  const data = {
    commentId,
    reason,
  };

  try {
    const res = await jwtAxios.post(`${host}/comment/${commentId}`, data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("res at api: ", res);

    return res.data;
  } catch (error) {
    console.error("Error response from server:", error.response);
    throw error;
  }
};
