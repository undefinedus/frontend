import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMySocialInfo } from "../../api/social/socialMainAPI";
import { OnlyTitle } from "../../layouts/TopLayout";
import BasicLayout from "../../layouts/BasicLayout";
import SocialProfile from "../../components/social/SocialProfile";

// 소셜 메인 페이지(내 소셜)
const SocialMainPage = () => {
  const navigate = useNavigate();
  const [mySocialProfile, setMySocialProfile] = useState([]); // 내 소셜 프로필 정보 상태

  // 내 소셜 프로필 정보
  useEffect(() => {
    const fetchData = async () => {
      const mysocialInfo = await fetchMySocialInfo();
      setMySocialProfile(mysocialInfo); // 가져온 데이터를 상태로 설정
    };
    fetchData();
  }, []);

  // 내 소셜 정보 API
  const fetchMySocialInfo = async () => {
    try {
      const response = await getMySocialInfo();
      console.log("***** 내 소셜 정보 :", response.data); // 여기서 응답 데이터 출력
      return response.data; // 응답 반환
    } catch (error) {
      console.error(error, "내 소셜 정보를 불러오는 데 실패하였습니다");
      return error;
    }
  };

  // 프로필 팔로워/팔로잉 클릭 시 상세 페이지로 이동
  const handleSocialTabClick = (tabCondition) => {
    navigate(`../list`, {
      replace: true,
      state: {
        tabCondition, // "팔로워" 또는 "팔로잉"
        search: "", // 검색어 (기본값으로 null 전달)
        mySocialProfile, // 프로필 정보 전달
      },
    });
  };

  // // 유저 검색 목록 클릭 시 유저 책장으로 이동
  // const handleSocialTabClick = (tabCondition) => {
  //   // 현재 스크롤 위치 저장
  //   // scrollPositionRef.current =
  //   // window.scrollY || document.documentElement.scrollTop;
  //   navigate(`../list`, {
  //     replace: true,
  //     state: {
  //       tabCondition, // "팔로워" 또는 "팔로잉"
  //       search: "", // 검색어 (기본값으로 null 전달)
  //       // scrollPosition: scrollPositionRef.current, // 스크롤 위치 저장
  //     },
  //   });
  // };

  return (
    <BasicLayout>
      {/* 상단 네비 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-undbgmain">
        <OnlyTitle title={"내 소셜"} showLine={true} />
      </div>
      <div className="flex flex-col w-full px-6">
        {/* 프로필 */}
        <div className="flex w-full pt-20">
          <SocialProfile
            socialProfile={mySocialProfile}
            onFollowerClick={() => handleSocialTabClick("팔로워")} // 팔로워 클릭
            onFollowingClick={() => handleSocialTabClick("팔로잉")} // 팔로잉 클릭
          />
        </div>
        {/* 유저 검색 */}
        <div className="flex w-full pt-16">유저 검색</div>
      </div>
      <div className="flex flex-col w-full px-6">
        {/* 유저 목록 */}
        <div className="flex w-full pt-16">유저 검색 목록</div>
      </div>
    </BasicLayout>
  );
};

export default SocialMainPage;
