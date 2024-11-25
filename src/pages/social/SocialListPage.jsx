import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getMySocialList,
  patchFollow,
  getMySocialInfo, // 최신 프로필 정보 가져오는 API 추가
} from "../../api/social/socialMainAPI";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import FollowTabs from "../../components/social/FollowTabs";
import SocialList from "../../components/social/SocialList";

const SocialListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabs] = useState(["팔로워", "팔로잉"]); // 탭 종류
  const {
    tabCondition,
    search,
    mySocialProfile: initialProfile,
  } = location.state || {};
  const [socialList, setSocialList] = useState({ content: [], hasNext: true });
  const [activeTab, setActiveTab] = useState(tabCondition || tabs[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // 최신 프로필 상태
  const [socialProfile, setSocialProfile] = useState(initialProfile);

  // 이전 버튼 클릭
  const handleBackClick = () => {
    navigate("/social", { replace: true });
  };

  // 최신 프로필 API 호출
  const fetchMySocialInfo = async () => {
    try {
      const response = await getMySocialInfo();
      console.log("***** 최신 프로필 정보 :", response.data);
      setSocialProfile(response.data); // 최신 프로필 업데이트
    } catch (error) {
      console.error("프로필 정보를 불러오는 데 실패했습니다:", error);
    }
  };

  // 소셜 목록 API 호출
  const fetchSocialList = useCallback(
    async (pageToLoad = 1) => {
      try {
        setIsLoading(true);
        const response = await getMySocialList(activeTab, search, pageToLoad);
        console.log("***** 소셜 리스트 :", response);

        setSocialList((prevList) => ({
          content:
            pageToLoad === 1
              ? response.content
              : [...prevList.content, ...response.content],
          hasNext: response.hasNext,
        }));

        setPage(pageToLoad);
      } catch (error) {
        console.error("소셜 리스트를 가져오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab, search]
  );

  // 팔로우 상태 변경 API 호출
  const fetchPatchFollow = async (targetMemberId) => {
    try {
      const response = await patchFollow(targetMemberId);
      console.log("*****팔로우 patchFollow :", response.data);

      // 소셜 리스트 업데이트
      setSocialList((prevList) => ({
        ...prevList,
        content: prevList.content.map((profile) =>
          profile.id === targetMemberId
            ? { ...profile, following: !profile.following }
            : profile
        ),
      }));

      // 팔로우/언팔로우 후 최신 프로필 정보 업데이트
      await fetchMySocialInfo();
    } catch (error) {
      console.error("팔로우 상태를 변경하는 데 실패하였습니다:", error);
    }
  };

  // 탭 변경 시 초기화 및 첫 페이지 호출
  useEffect(() => {
    setSocialList({ content: [], hasNext: true });
    setPage(1);
    fetchSocialList(1);
  }, [activeTab, fetchSocialList]);

  useEffect(() => {
    const fetchSocialProfile = async () => {
      try {
        const updatedProfile = await getMySocialInfo(); // 서버에서 최신 프로필 가져오기
        setSocialProfile(updatedProfile.data); // 최신 데이터로 상태 업데이트
      } catch (error) {
        console.error("프로필 정보를 가져오는 데 실패하였습니다.", error);
      }
    };

    fetchSocialProfile(); // 컴포넌트 로드 시 항상 최신 데이터 가져오기
  }, []);

  // 무한 스크롤 관리
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollHeight - scrollTop <= clientHeight + 100 &&
        socialList.hasNext &&
        !isLoading
      ) {
        fetchSocialList(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [socialList.hasNext, isLoading, page, fetchSocialList]);

  // 팔로우 핸들러
  const handleFollowClick = (id) => {
    fetchPatchFollow(id);
  };

  // 언팔로우 핸들러
  const handleUnfollowClick = (id) => {
    fetchPatchFollow(id);
  };

  return (
    <BasicLayout>
      <div className="fixed top-0 w-full">
        {/* 상단 네비바 */}
        <PrevTitle
          title={"내 소셜"}
          showLine={false}
          onClick={handleBackClick}
        />
        {/* 팔로워/팔로잉 탭 */}
        <FollowTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          socialProfile={socialProfile}
        />
      </div>
      {/* 소셜 목록 */}
      <div className="px-6 pt-36 pb-20 h-full">
        <SocialList
          socialList={socialList}
          activeTab={activeTab}
          onFollowClick={handleFollowClick}
          onUnfollowClick={handleUnfollowClick}
        />
        {isLoading && <p className="text-center py-4">로딩 중...</p>}
      </div>
    </BasicLayout>
  );
};

export default SocialListPage;
