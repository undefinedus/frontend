import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle, PrevTitleReport } from "../../layouts/TopLayout";
import { getForumDetail } from "../../api/forum/forumApi.js";
import ForumTitle from "../../components/forum/ForumTitle.jsx";
import ForumContent from "../../components/forum/ForumContent.jsx";
import useCustomLogin from "../../hooks/useCustomLogin.js";
import AddReportModal from "../../components/modal/forum/AddReportModal.jsx";
import ParticipantsCount from "../../components/forum/ParticipantsCount.jsx";

// 예정된 토론 상세
const ScheduledDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginState } = useCustomLogin();

  const { discussionId } = useParams();
  const [forum, setForum] = useState({});
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
    console.log("*****discussionId:", discussionId); // 값을 확인
    fetchForum(discussionId); // API 호출
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

  return (
    <BasicLayout>
      <div className="w-full fixed top-0 bg-undbgmain">
        {isAuthor ? (
          <PrevTitle
            title={"토론 예정"}
            onClick={() => handleActionClick("back")} // 뒤로 가기 버튼
            showLine={false}
          />
        ) : (
          <PrevTitleReport
            title={"토론 예정"}
            onClick={handleActionClick} // 뒤로 가기, 신고 버튼
            showLine={false}
          />
        )}
      </div>
      <div className="flex flex-col pt-16 px-6 gap-4">
        <ForumTitle forum={forum} />
        <ForumContent forum={forum}>
          <ParticipantsCount forum={forum} forumGuide={false} />
        </ForumContent>
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

export default ScheduledDetailPage;
