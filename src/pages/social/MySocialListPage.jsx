import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getMySocialList,
  patchFollow,
  getMySocialInfo, // 최신 프로필 정보 가져오는 API 추가
} from "../../api/social/mySocialApi";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import FollowTabs from "../../components/social/FollowTabs";
import SocialList from "../../components/social/SocialList";
import SearchBar from "../../components/commons/SearchBar";

const MySocialListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabs] = useState(["팔로워", "팔로잉"]); // 탭 종류
  const { tabCondition, prevSearch, mySocialProfile } = location?.state || {};
  const [socialList, setSocialList] = useState({ content: [], hasNext: true }); // 팔로워or팔로잉 목록
  const [activeTab, setActiveTab] = useState(tabCondition || tabs[0]); // 팔로워or팔로잉 탭 관리
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // 목록 초기 페이지 지정
  const [search, setSearch] = useState(""); // 검색어 상태
  const [socialProfile, setSocialProfile] = useState(mySocialProfile); // 최신 프로필 상태

  // 최신 프로필 API 호출
  const fetchMySocialInfo = async () => {
    try {
      const response = await getMySocialInfo();
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

  // 프로필 정보 업데이트
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

  // 닉네임 검색 핸들러
  const handleSearch = (search) => {
    console.log(search);
    setSearch(search);
  };

  // 이전 버튼 클릭
  const handleBackClick = () => {
    navigate("/social", { replace: true });
  };

  // 유저 검색 목록 카드 클릭 시 유저 책장으로 이동
  const handleCardClick = (profile) => {
    // 현재 스크롤 위치 저장
    // scrollPositionRef.current =
    // window.scrollY || document.documentElement.scrollTop;
    console.log("Navigating to bookshelf 프로필:", profile);
    console.log("Navigating to bookshelf 프로필 아이디:", profile.id);
    navigate(`../bookshelf/${profile.id}`, {
      replace: true,
      state: {
        profile,
        search: search, // 현재 검색어
        // searchUserList: searchUserList, // 검색 결과 목록
        // scrollPosition: scrollPositionRef.current, // 스크롤 위치 저장
      },
    });
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
        {/* 유저 검색 */}
        <div className="flex w-full py-3 px-6 bg-undbgmain">
          <SearchBar
            placeholder={"닉네임으로 검색"}
            onChange={handleSearch}
            searchHistory={search}
          />
        </div>
      </div>
      <div className="px-6 h-full flex flex-col">
        {/* 소셜 목록 */}
        <div className="flex-grow pt-48 pb-24 ">
          <SocialList
            socialList={socialList}
            activeTab={activeTab}
            search={search}
            onFollowClick={handleFollowClick}
            onUnfollowClick={handleUnfollowClick}
            onCardClick={handleCardClick}
          />
          {/* 로딩 중 */}
          {isLoading && <p className="text-center py-4">로딩 중...</p>}
        </div>
      </div>
    </BasicLayout>
  );
};

export default MySocialListPage;
