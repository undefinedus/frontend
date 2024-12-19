import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import ForumForm from "../../components/forum/ForumForm";
import { writePropose } from "../../api/forum/forumApi";
import TwoButtonModal from "../../components/modal/commons/TwoButtonModal";
import BasicModal from "../../components/modal/commons/BasicModal";
import Filter from "badwords-ko";

const WriteProposePage = () => {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isProfanityModalOpen, setIsProfanityModalOpen] = useState(false);
  const [discussionId, setDiscussionId] = useState(null);

  // 비속어 필터 인스턴스 생성
  const badwordsFilter = new Filter();

  const checkProfanity = (text) => {
    return badwordsFilter.isProfane(text);
  };

  const fetchWritePropose = async (isbn13, subject, content, startDate) => {
    try {
      const res = await writePropose(isbn13, subject, content, startDate);
      console.log("작성 결과 :", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate("/forum/list");
  };

  const handleSubmit = async (isbn13, subject, content, startDate) => {

    // 제목과 내용의 비속어 검사
    if (checkProfanity(subject) || checkProfanity(content)) {
      setIsProfanityModalOpen(true);
      return;
    }

    const res = await fetchWritePropose(isbn13, subject, content, startDate);

    if (res) {
      setDiscussionId(res.data.id);
      setIsSuccessModalOpen(true);
    }

  };

  const handleSuccessModalCancel = () => {
    setIsSuccessModalOpen(false);
    navigate("/forum/list", {
      state: {
        prevActiveTab: "주제 발의",
      },
    });
  };

  const handleSuccessModalConfirm = () => {
    setIsSuccessModalOpen(false);
    if (discussionId) {
      navigate(`/forum/propose/${discussionId}`);
    }
  };

  const handleProfanityModalConfirm = () => {
    setIsProfanityModalOpen(false);
  };

  return (
    <BasicLayout>
      <div className="relative">
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

        {/* 성공 시 모달 */}
        {isSuccessModalOpen && (
          <TwoButtonModal

            onCancel={handleSuccessModalCancel}
            onConfirm={handleSuccessModalConfirm}

            cancelText="취소"
            confirmText="확인"
          >
            <p className="text-und14 font-bold text-undtextdark text-center">
              작성한 글로 이동하시겠습니까?
            </p>
          </TwoButtonModal>
        )}

        {/* 비속어 감지 시 모달 */}
        {isProfanityModalOpen && (
          <BasicModal
            className={"absolute w-80 right-1/2 translate-x-1/2"}
            isOpen={isProfanityModalOpen}
            onConfirm={handleProfanityModalConfirm}
            onClose={handleProfanityModalConfirm}
            activeCloseButton={true}
            confirmText="확인"
          >
            <p className="text-lg font-bold text-undtextdark text-center mb-4">
              욕설이나 비속어가 포함되었습니다.
            </p>
          </BasicModal>
        )}
      </div>
    </BasicLayout>
  );
};

export default WriteProposePage;
