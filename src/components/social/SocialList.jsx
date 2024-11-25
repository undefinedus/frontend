import React from "react";
import SocialCard from "../../components/social/SocialCard";
import ListNotice from "../../components/commons/ListNotice";

// 소셜 목록
const SocialList = ({
  socialList,
  activeTab,
  onFollowClick,
  onUnfollowClick,
}) => {
  // `content`가 비어 있는지 확인
  const isContentEmpty = socialList?.content?.length === 0;

  return (
    <div className="flex flex-col h-full">
      {isContentEmpty ? (
        // 탭에 따라 다른 `ListNotice` 출력
        activeTab === "팔로워" ? (
          <div className="flex flex-col items-center justify-center h-full">
            <ListNotice type="noFollower" />
          </div>
        ) : activeTab === "팔로잉" ? (
          <ListNotice type="noFollowing" />
        ) : null
      ) : (
        // `content`가 있을 때 `SocialCard` 출력
        socialList?.content?.map((profile, index) => (
          <SocialCard
            key={index}
            socialList={profile}
            onFollowClick={onFollowClick}
            onUnfollowClick={onUnfollowClick}
          />
        ))
      )}
    </div>
  );
};

export default SocialList;
