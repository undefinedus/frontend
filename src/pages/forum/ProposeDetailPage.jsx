import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import {
  PrevTitleModifyDelete,
  PrevTitleReport,
} from "../../layouts/TopLayout";
import {
  getForumDetail,
  addJoinAgree,
  addJoinDisagree,
  deleteForum,
} from "../../api/forum/forumApi.js";
import ForumTitle from "../../components/forum/ForumTitle.jsx";
import ForumContent from "../../components/forum/ForumContent.jsx";
import useCustomLogin from "../../hooks/useCustomLogin.js";
import AddReportModal from "../../components/modal/forum/AddReportModal.jsx";
import ParticipantsCount from "../../components/forum/ParticipantsCount.jsx";
import TwoButtonModal from "../../components/modal/commons/TwoButtonModal.jsx";
import { setRef } from "@fullcalendar/core/internal.js";

// 발의글 상세
const ProposeDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginState } = useCustomLogin();

  const { discussionId } = useParams();
  const [forum, setForum] = useState({});
  const [agree, setAgree] = useState(forum?.agree);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태
  const [isDeletetModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달 상태
  const [refresh, setRefresh] = useState(false);

  const { prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location.state;

  // 작성자와 로그인 유저 일치 여부
  useEffect(() => {
    setIsAuthor(forum.memberName === loginState.nickname);
  }, [forum, loginState]);

  // 토론 상세 API 호출
  useEffect(() => {
    if (!discussionId) return;
    fetchForumDetail(discussionId); // API 호출
  }, [discussionId, refresh]);

  // 상세 API
  const fetchForumDetail = async (discussionId) => {
    try {
      const res = await getForumDetail(discussionId);
      setForum(res);
      console.log("상세 데이터:", res);
    } catch (err) {
      console.error("API 호출 중 오류:", err);
    }
  };

  // 토론 삭제 API
  const fetchdeleteForum = async (discussionId) => {
    try {
      const res = await deleteForum(discussionId);
      console.log("삭제 데이터:", res);
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
    } else if (action === "modify") {
      console.log("discussionId : ", discussionId);
      navigate(`/forum/propose/modify/${discussionId}`, {
        replace: true,
        state: {
          forum,
          prevSearch,
          prevSort,
          prevScrollLeft,
        },
      });
    } else if (action === "delete") {
      setIsDeleteModalOpen(true); // 삭제 확인 모달 열기
    } else if (action === "report") {
      setIsReportModalOpen(true); // 신고 모달 열기
    }
  };

  // 찬성 참석 핸들러
  const handleAgree = async () => {
    const res = await fetchJoinAgree();
  };

  const handleDisagree = async () => {
    const res = await fetchJoinDisagree();
  };

  const fetchJoinAgree = async () => {
    if (!discussionId) return;
    try {
      const res = await addJoinAgree(discussionId);
      console.log("res : ", res);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJoinDisagree = async () => {
    if (!discussionId) return;
    try {
      const res = await addJoinDisagree(discussionId);
      console.log("res: ", res);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
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

  // 삭제 모달 취소
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false); // 신고 모달 닫기
  };

  // 삭제 모달 확인
  const handleDeleteConfirm = async (discussionId) => {
    await fetchdeleteForum(discussionId);
    setIsReportModalOpen(false);
    navigate(`/forum/list`, {
      replace: true,
      state: {
        prevActiveTab,
        prevSearch,
        prevSort,
        prevScrollLeft,
        refresh: true,
      },
    });
  };

  return (
    <BasicLayout>
      <div className="w-full fixed top-0 bg-undbgmain">
        {isAuthor ? (
          <PrevTitleModifyDelete
            title={"주제 발의"}
            onClick={handleActionClick} // 뒤로 가기, 수정, 삭제 버튼
            showLine={false}
          />
        ) : (
          <PrevTitleReport
            title={"주제 발의"}
            onClick={handleActionClick} // 뒤로 가기, 신고 버튼
            showLine={false}
          />
        )}
      </div>
      <div className="flex flex-col pt-16 px-6 gap-4">
        <ForumTitle forum={forum} />
        <ForumContent forum={forum}>
          <ParticipantsCount
            forum={forum}
            onClickAgree={handleAgree}
            onClickDisagree={handleDisagree}
          />
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
      {/* 신고 모달 */}
      {isDeletetModalOpen && (
        <TwoButtonModal
          onCancel={handleDeleteCancel} // 취소 클릭 시 모달 닫기
          onConfirm={() => handleDeleteConfirm(discussionId)} // 확인 클릭 시 글 삭제
          forum={forum}
          cancelText="취소"
          confirmText="확인"
        >
          해당 발의글에 대한 내용이 모두 사라져요{"\n"}
          정말로 삭제하시겠습니까?
        </TwoButtonModal>
      )}
    </BasicLayout>
  );
};

export default ProposeDetailPage;
