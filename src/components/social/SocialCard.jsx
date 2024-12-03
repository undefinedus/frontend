import React, { useState } from "react";
import basicProfile from "../../../public/assets/img/basicProfile.png";

// 소셜 팔로워/팔로잉 카드
const SocialCard = ({
  profile,
  onFollowClick,
  onUnfollowClick,
  onCardClick,
}) => {
  const [isFollowing, setIsFollowing] = useState(profile.following);
  // console.log("소셜카드 프로필 ", profile);

  const handleFollow = async () => {
    try {
      await onFollowClick(profile.id);
      setIsFollowing(true); // 버튼 상태 업데이트
    } catch (error) {
      console.error("팔로우 요청 실패:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await onUnfollowClick(profile.id);
      setIsFollowing(false); // 버튼 상태 업데이트
    } catch (error) {
      console.error("언팔로우 요청 실패:", error);
    }
  };

  return (
    <div
      className="flex w-full h-16 items-center gap-3 mb-6 last:mb-0"
      onClick={() => onCardClick(profile)}
    >
      {/* 프로필 이미지 */}
      <div className="w-14 h-14 items-center flex-shrink-0 rounded-full overflow-hidden">
        <img
          src={profile.profileImage || basicProfile} // 기본 이미지 처리
          alt={`${profile.nickname}의 프로필`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* 사용자 정보 */}
      <div className="flex w-full flex-col gap-2 overflow-x-hidden">
        <div className="flex w-full justify-between items-center">
          {/* 닉네임 */}
          <p className="font-heavy text-und16 text-undtextdark text-left">
            {profile.nickname}
          </p>
          {/* 팔로우/팔로잉 버튼 */}
          {profile.following === false && (
            <button
              className="w-16 h-7 bg-undpoint text-center align-middle text-white rounded-full text-und14"
              // onClick={() => onFollowClick(profile.id)}
              onClick={(e) => {
                e.stopPropagation();
                handleFollow();
              }}
            >
              팔로우
            </button>
          )}
          {profile.following === true && (
            <button
              className="w-16 h-7 bg-white text-center align-middle text-undpoint border border-undpoint rounded-full text-und14"
              // onClick={() => onUnfollowClick(profile.id)}
              onClick={(e) => {
                e.stopPropagation();
                handleUnfollow();
              }}
            >
              팔로잉
            </button>
          )}
        </div>
        {/* 취향 목록 */}
        <div className="w-full">
          <div
            className="flex overflow-x-auto w-full scrollbar-hide
           justify-start gap-2 text-center items-center whitespace-nowrap text-und12 text-undpoint cursor-pointer"
          >
            {profile.preferences?.map((preference, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-full bg-unddisabled"
              >
                {preference.replace(/_/g, "/")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
