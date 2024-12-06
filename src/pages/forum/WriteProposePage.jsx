import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import ForumForm from "../../components/forum/ForumForm";

const WriteProposePage = () => {
  const navigate = useNavigate();
  // "myBook": 28,
  // "member": 12,
  // "title": "책에 대해 이야기해요",
  // "content": "이 책에 대한 다양한 의견을 나누고 싶습니다.",
  // "startDate": "2024-12-02T17:45:00"
  // 카드 클릭 시 상세 페이지로 이동
  const handleBackClick = () => {
    navigate("/forum/list");
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
          <ForumForm
          // onSubmit={}
          >
            작성하기
          </ForumForm>
        </div>
      </div>
    </BasicLayout>
  );
};

export default WriteProposePage;
