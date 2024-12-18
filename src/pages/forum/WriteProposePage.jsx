import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import ForumForm from "../../components/forum/ForumForm";
import { writePropose } from "../../api/forum/forumApi";
import TwoButtonModal from "../../components/modal/commons/TwoButtonModal";

const WriteProposePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [discussionId, setDiscussionId] = useState(null); // 새로 생성된 글 ID 저장

  const fetchWritePropose = async (isbn13, subject, content, startDate) => {
    try {
      const res = await writePropose(isbn13, subject, content, startDate);
      console.log("작성 결과 :", res);
      if (res?.data?.discussionId) {
        // setDiscussionId(res.data.discussionId); // 새 글 ID 저장
        // setIsModalOpen(true); // 모달 오픈
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 뒤로 가기 버튼 클릭
  const handleBackClick = () => {
    navigate("/forum/list");
  };

  // 작성하기 버튼 클릭 핸들러
  const handleSubmit = async (isbn13, subject, content, startDate) => {
    await fetchWritePropose(isbn13, subject, content, startDate);
    navigate("/forum/list", {
      state: {
        prevActiveTab: "주제 발의",
      },
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false); // 취소
    navigate("/forum/list", {
      state: {
        prevActiveTab: "주제 발의",
      },
    });
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false); // 확인
    if (discussionId) {
      navigate(`/forum/propose/${discussionId}`);
    }
  };

  return (
    <BasicLayout>
      <div>
        <div className="w-full fixed top-0 bg-undbgmain">
          <PrevTitle
            title={"발의글 작성"}
            showLine={true}
            onClick={handleBackClick}
          />
        </div>
        <div className="flex flex-col w-full h-full">
          <ForumForm onSubmit={handleSubmit} forum={null}>
            작성하기
          </ForumForm>
        </div>
        {isModalOpen && (
          <TwoButtonModal
            // onCancel={handleModalCancel}
            // onConfirm={handleModalConfirm}
            cancelText="취소"
            confirmText="확인"
          >
            <p className="text-und14 font-bold text-undtextdark text-center">
              작성한 글로 이동하시겠습니까?
            </p>
          </TwoButtonModal>
        )}
      </div>
    </BasicLayout>
  );
};

export default WriteProposePage;
