// import React from "react";
// import SocialCard from "../../components/social/SocialCard";
// import ListNotice from "../../components/commons/ListNotice";

// // 소셜 팔로워/팔로잉 목록
// const SocialList = ({
//   socialList,
//   activeTab = null,
//   onFollowClick,
//   onUnfollowClick,
//   onCardClick,
// }) => {
//   // `content`가 비어 있는지 확인
//   const isContentEmpty = socialList?.content?.length === 0;

//   return (
//     <div className="flex flex-col">
//       {!isContentEmpty ? (
//         // 탭에 따라 다른 `ListNotice` 출력
//         activeTab === "팔로워" ? (
//           <div className="flex flex-col items-center justify-center h-full">
//             <ListNotice type="noFollower" />
//           </div>
//         ) : activeTab === "팔로잉" ? (
//           <div className="flex flex-col items-center justify-center h-full">
//             <ListNotice type="noFollowing" />
//           </div>
//         ) : null
//       ) : (
//         // `content`가 있을 때 `SocialCard` 출력
//         <div className="h-full">
//           {socialList?.content?.map((profile, index) => (
//             <SocialCard
//               key={index}
//               profile={profile}
//               onFollowClick={onFollowClick}
//               onUnfollowClick={onUnfollowClick}
//               onCardClick={onCardClick} // 클릭 이벤트 전달
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SocialList;

import React from "react";
import SocialCard from "../../components/social/SocialCard";
import ListNotice from "../../components/commons/ListNotice";

// 소셜 팔로워/팔로잉 목록
const SocialList = ({
  socialList,
  activeTab = null,
  search = "", // 검색어 상태 추가
  onFollowClick,
  onUnfollowClick,
  onCardClick,
}) => {
  // 검색어가 있는 상태에서 `content`가 비어 있는지 확인
  const isSearchResultEmpty = search && socialList?.content?.length === 0;

  // 탭에서 `content`가 비어 있는지 확인
  const isTabContentEmpty = !search && socialList?.content?.length === 0;

  return (
    <div className="flex flex-col h-full">
      {isSearchResultEmpty ? (
        // 검색어가 있을 때 검색 결과 없음 출력
        <div className="flex-grow flex items-center justify-center">
          <ListNotice type="noResult" />
        </div>
      ) : isTabContentEmpty ? (
        // 검색어가 없고 탭에 따라 다른 `ListNotice` 출력
        <div className="flex-grow flex items-center justify-center">
          {activeTab === "팔로워" ? (
            <ListNotice type="noFollower" />
          ) : activeTab === "팔로잉" ? (
            <ListNotice type="noFollowing" />
          ) : null}
        </div>
      ) : (
        // `content`가 있을 때 `SocialCard` 출력
        <div className="flex flex-col gap-4">
          {socialList?.content?.map((profile, index) => (
            <SocialCard
              key={index}
              profile={profile}
              onFollowClick={onFollowClick}
              onUnfollowClick={onUnfollowClick}
              onCardClick={onCardClick} // 클릭 이벤트 전달
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialList;
