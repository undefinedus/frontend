import React, { useState, useRef } from "react";
import { useNavigate, useLocation, replace } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import ForumForm from "../../components/forum/ForumForm";
import { modifyPropose } from "../../api/forum/forumApi";

// 발의글 수정
const ModifyProposePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { discussionId } = useParams();
  // const [forum, setForum] = useState({});

  const { forum, prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location.state;

  const handleBackClick = () => {
    // `../propose/${forumId}`
    navigate(`/forum/propose/${forum.discussionId}`, {
      replace: true,
      state: {
        prevActiveTab,
        prevSearch,
        prevSort,
        prevScrollLeft,
      },
    });
  };

  // 수정하기 버튼 클릭 핸들러
  const handleSubmit = (discussionId, subject, content, startDate) => {
    fetchModifyPropose(forum.discussionId, subject, content, startDate);
    navigate(`/forum/propose/${forum.discussionId}`, {
      replace: true,
      state: {
        prevActiveTab: "주제 발의",
        prevSearch,
        prevSort,
        prevScrollLeft,
      },
    });
  };

  const fetchModifyPropose = async (
    discussionId,
    subject,
    content,
    startDate
  ) => {
    try {
      const res = await modifyPropose(
        discussionId,
        subject,
        content,
        startDate
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasicLayout>
      <div>
        <div className="w-full fixed top-0 bg-undbgmain">
          <PrevTitle
            title={"발의글 수정"}
            showLine={true}
            onClick={handleBackClick}
          />
        </div>
        <div className="flex flex-col w-full h-full overflow-hidden">
          <ForumForm onSubmit={handleSubmit} forum={forum}>
            수정하기
          </ForumForm>
        </div>
      </div>
    </BasicLayout>
  );
};
export default ModifyProposePage;
