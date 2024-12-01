import React, { useState } from "react";
import NotificationsComponent from "../../components/settings/NotificationsComponent";
import { PrevTitle } from "../../layouts/TopLayout";
import NavBar from "../../layouts/NavBar";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const [bookshelfNotifications, setBookshelfNotifications] = useState([
    {
      id: "bookshelf-1", // id 추가
      alertTitle: "독서 활동",
      description: "토론 예정 시간 3시간 전 알림",
      isEnabled: false,
    },
    {
      id: "bookshelf-2", // id 추가
      alertTitle: "책갈피 카카오톡 메시지",
      description: "카카오톡 메시지로 내 책갈피 랜덤 발송",
      isEnabled: false,
    },
  ]);

  const [snsNotifications, setSnsNotifications] = useState([
    {
      id: "sns-1", // id 추가
      alertTitle: "새로운 팔로워",
      description: "누군가 나를 팔로우했을 시 알림",
      isEnabled: false,
    },
    {
      id: "sns-2", // id 추가
      alertTitle: "내 책장 공개",
      description: "소셜 검색에서 내 계정 노출 여부",
      isEnabled: false,
    },
  ]);

  const [discussionNotifications, setDiscussionNotifications] = useState([
    {
      id: "discussion-1", // id 추가
      alertTitle: "발의 채택/기각",
      description: "누군가 나를 팔로우했을 시 알림",
      isEnabled: false,
    },
    {
      id: "discussion-2", // id 추가
      alertTitle: "토론 개최 예정",
      description: "소셜 검색에서 내 계정 노출 여부",
      isEnabled: false,
    },
    {
      id: "discussion-3", // id 추가
      alertTitle: "토론 댓글",
      description: "누군가 나를 멘션했을 시 알림",
      isEnabled: false,
    },
  ]);

  // 핸들러 수정
  const handleBookshelfToggle = (id) => (checked) => {
    setBookshelfNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEnabled: checked } : item
      )
    );
  };

  const handleDiscussionToggle = (id) => (checked) => {
    setDiscussionNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEnabled: checked } : item
      )
    );
  };

  const handleSnsToggle = (id) => (checked) => {
    setSnsNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEnabled: checked } : item
      )
    );
  };

  // 디버깅을 위한 콘솔 로그 추가
  const bookshelfItems = bookshelfNotifications.map((item) => ({
    ...item,
    onChange: handleBookshelfToggle(item.id),
  }));

  const snsItems = snsNotifications.map((item) => ({
    ...item,
    onChange: handleSnsToggle(item.id),
  }));

  const discussionItems = discussionNotifications.map((item) => ({
    ...item,
    onChange: handleDiscussionToggle(item.id),
  }));

  const navigate = useNavigate();

  return (
    <div>
      <PrevTitle
        title={"알림 설정"}
        showLine={false}
        onClick={() => navigate("/settings")}
      />
      <div className="px-7 pt-4 flex flex-col gap-4">
        <NotificationsComponent
          subtitle={"책장"}
          notificationItems={bookshelfItems}
        />
        <NotificationsComponent
          subtitle={"소셜"}
          notificationItems={snsItems}
        />
        <NotificationsComponent
          subtitle={"토론"}
          notificationItems={discussionItems}
        />
      </div>
      <NavBar />
    </div>
  );
};

export default NotificationsPage;
