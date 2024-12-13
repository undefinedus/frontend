import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout.jsx";
import { PrevTitle } from "../../layouts/TopLayout.jsx";
import {
  getCommentList,
  writeComment,
} from "../../api/forum/forumCommentApi.js";
import useCustomLogin from "../../hooks/useCustomLogin.js";
import AddReportModal from "../../components/modal/forum/AddReportModal.jsx";
import CommentList from "../../components/forum/CommentList.jsx";
import WriteComment from "../../components/forum/WriteComment.jsx";

// 진행중 토론 의견 목록
const ForumOpinionsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginState } = useCustomLogin();

  const { discussionId } = useParams();
  // const [forum, setForum] = useState({});
  const [comments, setComments] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태

  const { forum, prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location.state;

  // 작성자와 로그인 유저 일치 여부
  useEffect(() => {
    setIsAuthor(forum.memberName === loginState.nickname);
  }, [forum, loginState]);

  // 모든 댓글 상세 API 호출
  useEffect(() => {
    console.log("*****모든 댓글 discussionId:", discussionId);
    fetchCommentList(discussionId); // API 호출
  }, [discussionId]);

  // 모든 댓글 API
  const fetchCommentList = async (discussionId) => {
    try {
      const res = await getCommentList(discussionId);
      setComments(res.content);
      console.log("모든 댓글 데이터:", res);
    } catch (err) {
      console.error("API 호출 중 오류:", err);
    }
  };

  // 댓글 작성 API
  const fetchWriteComment = async (discussionId, voteType, comment) => {
    try {
      const res = await writeComment(discussionId, voteType, comment);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // 뒤로가기, 신고 버튼
  const handleActionClick = (action) => {
    if (action === "back") {
      console.log("댓글 discussionId : ", discussionId);
      const targetPath =
        forum?.status !== "COMPLETED"
          ? `../inprogress/${discussionId}`
          : `../completed/${discussionId}`;
      navigate(targetPath, {
        replace: true,
        state: {
          forum,
          prevActiveTab,
          prevSearch,
          prevSort,
          prevScrollLeft,
        },
      });
    } else if (action === "report") {
      setIsReportModalOpen(true); // 신고 모달 열기
    }
  };

  // 신고 모달 취소
  const handleReportCancel = () => {
    setIsReportModalOpen(false); // 신고 모달 닫기
  };

  // 신고 모달 확인
  const handleReportConfirm = (selectedReason) => {
    console.log("신고 사유:", selectedReason);
    setIsReportModalOpen(false); // 신고 모달 닫기
    // TODO: 신고 처리 로직 추가
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = async (voteType, comment) => {
    try {
      await fetchWriteComment(discussionId, voteType, comment);
      navigate(`/forum/opinions/${discussionId}`, {
        replace: true,
        state: {
          forum,
          prevActiveTab,
          prevSearch,
          prevSort,
          prevScrollLeft,
        },
      });
      return true; // 성공 시 true 반환
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      return false; // 실패 시 false 반환
    }
  };
  return (
    <BasicLayout>
      <div className="w-full fixed top-0 bg-undbgmain">
        <PrevTitle
          title={`의견(${forum.commentCount}개)`}
          onClick={() => handleActionClick("back")} // 뒤로 가기 버튼
          showLine={false}
        />
      </div>
      <div className="flex flex-col pt-16 pb-20 px-6 gap-1">
        <CommentList comments={comments} forum={forum} />
        {forum?.status !== "COMPLETED" && (
          <WriteComment onClick={handleCommentSubmit} />
        )}
      </div>

      {/* 신고 모달 */}
      {isReportModalOpen && (
        <AddReportModal
          onCancel={handleReportCancel} // 취소 클릭 시 모달 닫기
          onConfirm={(reason) => {
            handleReportConfirm(reason); // 확인 클릭 시 처리
          }}
          // comment={comment}
        />
      )}
    </BasicLayout>
  );
};

export default ForumOpinionsPage;
