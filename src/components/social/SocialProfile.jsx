import React from "react";
import basicProfile from "../../../public/assets/img/basicProfile.png";

// 소셜 프로필
const SocialProfile = ({
  socialProfile, // 소셜 프로필 정보 데이터
  onFollowerClick, // 팔로우 목록 버튼
  onFollowingClick, // 팔로잉 목록 버튼
  onFollowClick, // 팔로우 버튼
  onUnfollowClick, // 언팔로우 버튼
}) => {
  const isFollowing = socialProfile.isFollowing;

  return (
    <div
      className={`flex w-full items-center border rounded-2xl px-5 shadow-md bg-white gap-8 ${
        isFollowing ? "h-32" : "h-24"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* 프로필 이미지 */}
        <div
          className={`${
            isFollowing ? "w-14 h-14" : "w-16 h-16"
          } flex-shrink-0 rounded-full overflow-hidden`}
        >
          {" "}
          <img
            src={socialProfile.profileImage || basicProfile} // 기본 이미지 처리
            alt={`${socialProfile.nickname}의 프로필`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* 팔로우/팔로잉 버튼 */}
        {isFollowing === false && (
          <button
            className="w-16 h-7 py-1 px-1 bg-undpoint text-white rounded-full font-bold text-und12 mt-2"
            onClick={onFollowClick}
          >
            팔로우
          </button>
        )}
        {isFollowing === true && (
          <button
            className="w-16 h-7 py-1 px-1 border border-undpoint text-undpoint rounded-full font-bold text-und12 mt-2"
            onClick={onUnfollowClick}
          >
            팔로잉
          </button>
        )}
      </div>
      {/* 사용자 정보 */}
      <div className="flex w-full flex-col justify-between">
        {/* 닉네임 */}
        <p className="font-heavy text-und16 text-undtextdark text-left">
          {socialProfile.nickname}
        </p>
        {/* 팔로워, 팔로잉 */}
        <div className="flex justify-between text-center mt-2">
          {/* 팔로워 */}
          <div
            className="flex flex-col justify-center text-undtextgray cursor-pointer"
            onClick={onFollowerClick}
          >
            <span className="font-bold text-und16 text-undtextdark">
              {socialProfile.followerCount}
            </span>
            <span>팔로워</span>
          </div>
          {/* 팔로잉 */}
          <div
            className="flex flex-col items-center text-undtextgray cursor-pointer"
            onClick={onFollowingClick}
          >
            <span className="font-bold text-und16 text-undtextdark">
              {socialProfile.followingCount}
            </span>
            <span>팔로잉</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProfile;
