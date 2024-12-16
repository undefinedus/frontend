import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle, PrevTitleReport } from "../../layouts/TopLayout";
import { getForumDetail, getAIResult } from "../../api/forum/forumApi.js";
import { getBestComment } from "../../api/forum/forumCommentApi.js";
import ForumTitle from "../../components/forum/ForumTitle.jsx";
import ForumContent from "../../components/forum/ForumContent.jsx";
import useCustomLogin from "../../hooks/useCustomLogin.js";
import AddReportModal from "../../components/modal/forum/AddReportModal.jsx";
import {
  PiCaretRightBold,
  PiChatCenteredDots,
  PiMedalMilitaryFill,
} from "react-icons/pi";
import CommentList from "../../components/forum/CommentList.jsx";
import PercentageBar from "../../components/commons/PercentageBar.jsx";
import AIResult from "../../components/modal/forum/AIResult.jsx";

// 종료된 토론 상세
const CompletedDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginState } = useCustomLogin();

  const { discussionId } = useParams();
  const [forum, setForum] = useState({}); // 토론글
  const [forumResult, setForumResult] = useState({}); // AI 결과분석
  const [bestComments, setBestComments] = useState([]); // 베스트 댓글
  const [isAuthor, setIsAuthor] = useState(false); // 작성자 일치 여부
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태

  const { prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location.state;

  // 작성자와 로그인 유저 일치 여부
  useEffect(() => {
    setIsAuthor(forum.memberName === loginState.nickname);
  }, [forum, loginState]);

  // 토론 상세 API 호출
  useEffect(() => {
    fetchForum(discussionId);
  }, [discussionId]);

  // 토론 결과분석 API 호출
  useEffect(() => {
    fetchAIResult(discussionId);
  }, [discussionId]);

  // 베스트댓글 API 호출
  useEffect(() => {
    fetchBestComment(discussionId);
  }, [discussionId]);

  // 토론 상세 API
  const fetchForum = async (discussionId) => {
    try {
      const res = await getForumDetail(discussionId);
      setForum(res);
      // console.log("상세 데이터:", res);
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

  // AI 결과분석 API
  const fetchAIResult = async (discussionId) => {
    try {
      const res = await getAIResult(discussionId);
      setForumResult(res);
      console.log("AI 결과분석 데이터:", res);
    } catch (err) {
      console.error("API 호출 중 오류:", err);
    }
  };

  // 뒤로가기, 신고 버튼
  const handleActionClick = (action) => {
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
  };

  return (
    <BasicLayout>
      <div className="w-full fixed top-0 bg-undbgmain">
        {isAuthor ? (
          <PrevTitle
            title={"종료된 토론"}
            onClick={() => handleActionClick("back")} // 뒤로 가기 버튼
            showLine={false}
          />
        ) : (
          <PrevTitleReport
            title={"종료된 토론"}
            onClick={handleActionClick} // 뒤로 가기, 신고 버튼
            showLine={false}
          />
        )}
      </div>
      <div className="flex flex-col pt-16 pb-20 px-6">
        <ForumTitle forum={forum} />
        <ForumContent forum={forum}>
          {/* AI 토론 결과 분석 */}
          <AIResult AIResult={forumResult} forum={forum} />
        </ForumContent>
        <div className="flex flex-col border-t border-unddisabled text-und14 text-left pt-4">
          <div className="flex w-full justify-between pb-4">
            <div className="flex gap-0.5 font-extrabold items-center">
              {bestComments.length !== 0 ? (
                <div className="flex text-center items-center text-und16 font-extrabold text-undred justify-start gap-1">
                  <div>
                    <PiMedalMilitaryFill size={20} color="#D55636" />
                  </div>
                  <p className="flex w-full">BEST 의견</p>
                </div>
              ) : (
                <p className="flex w-full font-extrabold text-und16">의견</p>
              )}
            </div>
            <div
              className="flex gap-1 items-center text-undtextgray"
              onClick={handleMoreComment}
            >
              <div className="flex text-center items-center font-bold gap-0.5">
                {" "}
                <PiChatCenteredDots size={18} color="78716C" />
                <div className="flex gap-1 text-und14">
                  <p className="text-undtextgray">전체 보기</p>
                  <p className="text-undtextdark font-extrabold">
                    {forum.commentCount}
                  </p>
                </div>
              </div>
              <PiCaretRightBold />
            </div>
          </div>
          {bestComments && (
            <CommentList comments={bestComments} forum={forum} />
          )}
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

export default CompletedDetailPage;
