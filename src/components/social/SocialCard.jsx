import React from "react";
import basicProfile from "../../../public/assets/img/basicProfile.png";

// 소셜 카드
const SocialCard = ({ socialList, onFollowClick, onUnfollowClick }) => {
  return (
    <div className="flex w-full h-16 items-center gap-3 mb-6 last:mb-0">
      {/* 프로필 이미지 */}
      <div className="w-14 h-14 items-center flex-shrink-0 rounded-full overflow-hidden">
        <img
          src={socialList.profileImage || basicProfile} // 기본 이미지 처리
          alt={`${socialList.nickname}의 프로필`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* 사용자 정보 */}
      <div className="flex w-full flex-col gap-2 overflow-x-hidden">
        <div className="flex w-full justify-between items-center">
          {/* 닉네임 */}
          <p className="font-heavy text-und16 text-undtextdark text-left">
            {socialList.nickname}
          </p>
          {/* 팔로우 버튼 */}
          {/* 팔로우/팔로잉 버튼 */}
          {socialList.following === false && (
            <button
              className="w-16 h-7 bg-undpoint text-center align-middle text-white rounded-full text-und14"
              onClick={() => onFollowClick(socialList.id)}
            >
              팔로우
            </button>
          )}
          {socialList.following === true && (
            <button
              className="w-16 h-7 bg-white text-center align-middle text-undpoint border border-undpoint rounded-full text-und14"
              onClick={() => onUnfollowClick(socialList.id)}
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
            {socialList.preferences?.map((preference, index) => (
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
