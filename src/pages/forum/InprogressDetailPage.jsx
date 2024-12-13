import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle, PrevTitleReport } from "../../layouts/TopLayout";
import { getForumDetail } from "../../api/forum/forumApi.js";
import { getBestComment } from "../../api/forum/forumCommentApi.js";
import ForumTitle from "../../components/forum/ForumTitle.jsx";
import ForumContent from "../../components/forum/ForumContent.jsx";
import useCustomLogin from "../../hooks/useCustomLogin.js";
import AddReportModal from "../../components/modal/forum/AddReportModal.jsx";
import CommentCard from "../../components/forum/CommentCard.jsx";
import { PiChatCenteredDots } from "react-icons/pi";
import CommentList from "../../components/forum/CommentList.jsx";

// 진행중 토론 상세
const InprogressDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginState } = useCustomLogin();

  const { discussionId } = useParams();
  const [forum, setForum] = useState({});
  const [bestComments, setBestComments] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태

  const { prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location.state;

  // 작성자와 로그인 유저 일치 여부
  useEffect(() => {
    setIsAuthor(forum.memberName === loginState.nickname);
  }, [forum, loginState]);

  // 토론 상세 API 호출
  useEffect(() => {
    fetchForum(discussionId); // API 호출
  }, [discussionId]);

  // 베스트댓글 상세 API 호출
  useEffect(() => {
    console.log("*****베스트댓글 discussionId:", discussionId);
    fetchBestComment(discussionId); // API 호출
  }, [discussionId]);

  // 상세 API
  const fetchForum = async (discussionId) => {
    try {
      const res = await getForumDetail(discussionId);
      setForum(res);
      console.log("상세 데이터:", res);
    } catch (err) {
      console.error("API 호출 중 오류:", err);
    }
  };

  // 베스트 댓글 API
  const fetchBestComment = async (discussionId) => {
    try {
      const res = await getBestComment(discussionId);
      setBestComments(res);
      console.log("베댓 데이터:", res);
    } catch (err) {
      console.error("API 호출 중 오류:", err);
    }
  };

  // 뒤로가기, 수정, 삭제, 신고 버튼
  const handleActionClick = (action) => {
    console.log("Action Clicked:", action); // 추가
    if (action === "back") {
      console.log("discussionId : ", discussionId);
      navigate("/forum/list", {
        replace: true,
        state: {
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

  // 의견 더보기 클릭
  const handleMoreComment = () => {
    navigate("/forum/inprogress/opinions/${discussionId}", {
      replace: true,
      state: {
        prevActiveTab,
        prevSearch,
        prevSort,
        prevScrollLeft,
      },
    });
  };

  return (
    <BasicLayout>
      <div className="w-full fixed top-0 bg-undbgmain">
        {isAuthor ? (
          <PrevTitle
            title={"토론 진행 중"}
            onClick={() => handleActionClick("back")} // 뒤로 가기 버튼
            showLine={false}
          />
        ) : (
          <PrevTitleReport
            title={"토론 진행 중"}
            onClick={handleActionClick} // 뒤로 가기, 신고 버튼
            showLine={false}
          />
        )}
      </div>
      <div className="flex flex-col pt-16 pb-20 px-6">
        <ForumTitle forum={forum} />
        <ForumContent forum={forum} />
        <div className="flex flex-col border-t border-unddisabled text-und18 font-bold text-left py-4 gap-1">
          베스트 의견
          <CommentList comments={bestComments} />
        </div>
        <div
          className="flex gap-1 text-undpoint text-und14 font-bold items-center justify-center bg-white border border-unddisabled rounded-md h-12 w-full"
          onClick={handleMoreComment}
        >
          <PiChatCenteredDots size={24} color="#7D5C4D" />더 보기
        </div>
      </div>
      {/* 신고 모달 */}
      {isReportModalOpen && (
        <AddReportModal
          onCancel={handleReportCancel} // 취소 클릭 시 모달 닫기
          onConfirm={(reason) => {
            handleReportConfirm(reason); // 확인 클릭 시 처리
          }}
          forum={forum}
        />
      )}
    </BasicLayout>
  );
};

export default InprogressDetailPage;
