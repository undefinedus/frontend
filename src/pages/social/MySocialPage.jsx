import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMySocialInfo,
  getSearchUserList,
  patchFollow,
} from "../../api/social/mySocialApi";
import { OnlyTitle } from "../../layouts/TopLayout";
import BasicLayout from "../../layouts/BasicLayout";
import SocialProfile from "../../components/social/SocialProfile";
import SearchBar from "../../components/commons/SearchBar";
import ListNotice from "../../components/commons/ListNotice";
import SocialList from "../../components/social/SocialList";

// 소셜 메인 페이지(내 소셜)
const SocialMainPage = () => {
  const navigate = useNavigate();
  const scrollPositionRef = useRef(0); // 스크롤 위치를 저장하기 위한 ref
  const [mySocialProfile, setMySocialProfile] = useState([]); // 내 소셜 프로필 정보 상태
  const [searchUserList, setSearchUserList] = useState({
    content: [],
    hasNext: true,
  }); // 모든 유저 검색 목록 상태
  const mySocialSearch = sessionStorage.getItem("mySocialSearch");
  const [search, setSearch] = useState(mySocialSearch ? mySocialSearch : ""); // 전체 검색 닉네임 검색어 상태
  const [isLoading, setIsLoading] = useState(false);
  // 내 소셜 프로필 정보
  useEffect(() => {
    const fetchData = async () => {
      const mysocialInfo = await fetchMySocialInfo();
      setMySocialProfile(mysocialInfo); // 가져온 데이터를 상태로 설정
    };
    fetchData();
  }, []);

  // 검색어 입력 시 유저 검색 목록 API 호출
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        const searchUserList = await fetchSearchUserList(search);
        setSearchUserList(searchUserList); // 가져온 데이터를 상태로 설정
      } else {
        setSearchUserList([]); // 검색어 없을 경우 목록 초기화
      }
    };
    fetchData();
    return () => {
      console.log(`unmount ${search}`);
      sessionStorage.setItem("mySocialSearch", search);
    };
  }, [search]);

  // 내 소셜 정보 API
  const fetchMySocialInfo = async () => {
    try {
      setIsLoading(true);
      const response = await getMySocialInfo();
      console.log("***** 내 소셜 정보 :", response.data); // 여기서 응답 데이터 출력
      setIsLoading(false);
      return response.data; // 응답 반환
    } catch (error) {
      console.error(error, "내 소셜 정보를 불러오는 데 실패하였습니다");
      setIsLoading(false);
      return error;
    }
  };

  // 유저 검색 목록 API
  const fetchSearchUserList = async () => {
    try {
      setIsLoading(true);
      const response = await getSearchUserList(search);
      console.log(
        "*****유저 검색 목록(response.data.data):",
        response.data.data
      ); // 여기서 응답 데이터 출력
      setIsLoading(false);
      return response.data.data; // 응답 반환
    } catch (error) {
      console.error(error, "유저 검색 목록을 불러오는 데 실패하였습니다");
      setIsLoading(false);
      return error;
    }
  };

  // 팔로우 상태 변경 API 호출
  const fetchPatchFollow = async (targetMemberId) => {
    try {
      const response = await patchFollow(targetMemberId);
      console.log("*****팔로우 patchFollow :", response.data);

      // 소셜 리스트 업데이트
      setSearchUserList((prevList) => ({
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

  // 프로필 팔로워/팔로잉 클릭 시 상세 페이지로 이동
  const handleSocialTabClick = (tabCondition) => {
    navigate(`../list`, {
      // replace: true,
      state: {
        tabCondition, // "팔로워" 또는 "팔로잉"
        search: "", // 검색어 (기본값으로 null 전달)
        mySocialProfile, // 프로필 정보 전달
      },
    });
  };

  const handleSearch = (search) => {
    console.log(search);

    setSearch(search);
  };

  // 팔로우 핸들러
  const handleFollowClick = (id) => {
    fetchPatchFollow(id);
  };

  // 언팔로우 핸들러
  const handleUnfollowClick = (id) => {
    fetchPatchFollow(id);
  };

  // 유저 검색 목록 카드 클릭 시 유저 책장으로 이동
  const handleCardClick = (profile) => {
    // 현재 스크롤 위치 저장
    scrollPositionRef.current =
      window.scrollY || document.documentElement.scrollTop;
    navigate(`../bookshelf/${profile.id}`, {
      replace: true,
      state: {
        profile,
        search: search, // 현재 검색어
        searchUserList: searchUserList, // 검색 결과 목록
        scrollPosition: scrollPositionRef.current, // 스크롤 위치 저장
      },
    });
  };

  return (
    <BasicLayout>
      {/* 상단 네비 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-undbgmain">
        <OnlyTitle title={"내 소셜"} showLine={true} />
        <div className="flex flex-col w-full px-6">
          {/* 프로필 */}
          <div className="flex w-full pt-3.5">
            <SocialProfile
              socialProfile={mySocialProfile}
              onFollowerClick={() => handleSocialTabClick("팔로워")} // 팔로워 클릭
              onFollowingClick={() => handleSocialTabClick("팔로잉")} // 팔로잉 클릭
            />
          </div>
          {/* 유저 검색 */}
          <div className="flex w-full pt-3.5 pb-3">
            <SearchBar
              placeholder={"닉네임으로 검색"}
              onChange={handleSearch}
              searchHistory={search}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full px-6 pt-60 pb-20">
        {/* 유저 목록 */}
        {search ? (
          <SocialList
            socialList={searchUserList}
            onFollowClick={handleFollowClick}
            onUnfollowClick={handleUnfollowClick}
            onCardClick={handleCardClick}
            search={search}
          />
        ) : (
          !isLoading && <ListNotice type="socialSearch" />
        )}
      </div>
    </BasicLayout>
  );
};

export default SocialMainPage;
