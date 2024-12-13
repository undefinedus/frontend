import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getSocialInfo,
  patchFollow,
  getSocialBooks,
} from "../../api/social/socialBookShelfApi";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import SocialProfile from "../../components/social/SocialProfile";
import SearchBar from "../../components/commons/SearchBar";
import TabCondition from "../../components/commons/TabCondition";
import {
  ItemCount,
  SortDropdown,
} from "../../components/commons/ListSortAndCount";
import BookList from "../../components/book/BookList";
import useBookStatus from "../../hooks/useBookStatus";
import ListNotice from "../../components/commons/ListNotice";

// 소셜 유저 책장
const SocialBookListPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 전달받은 state를 가져옴
  const searchUserList = location?.state?.searchUserList; // state와 socialList 안전하게 접근
  const profile = location?.state?.profile; // state와 socialList 안전하게 접근
  const { state } = location; // 기존 검색 상태
  const { prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location.state || {};
  const [socialProfile, setSocialProfile] = useState([]); // 유저 소셜 프로필 정보 상태
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태 관리
  const [data, setData] = useState({});
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState(prevActiveTab || "읽고 있는 책");
  const [search, setSearch] = useState(prevSearch || "");
  const [sort, setSort] = useState(prevSort || "최신순");
  const { getStatusInEnglish } = useBookStatus();

  // 소셜 유저 프로필 정보
  useEffect(() => {
    const fetchData = async () => {
      const socialInfo = await fetchSocialInfo();
      setSocialProfile(socialInfo); // 가져온 데이터를 상태로 설정
    };
    fetchData();
  }, []);

  // 스크롤 관리
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100); // 100px 이상 스크롤 시 버튼 전환
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 소셜 유저 책장 목록
  useEffect(() => {
    fetchSocialBooks();
  }, [activeTab, sort, search]);

  // 소셜 유저 정보 API
  const fetchSocialInfo = async () => {
    try {
      const targetMemberId = profile.id;
      const response = await getSocialInfo(targetMemberId);
      console.log("***** 소셜 프로필 정보 :", response); // 여기서 응답 데이터 출력
      return response; // 응답 반환
    } catch (error) {
      console.error(error, "소셜 정보를 불러오는 데 실패하였습니다");
      return error;
    }
  };

  // 팔로우 상태 변경 API 호출
  const fetchPatchFollow = async (targetMemberId) => {
    try {
      const response = await patchFollow(targetMemberId);
      console.log("*****팔로우 patchFollow :", response.data);

      // 팔로우/언팔로우 후 최신 프로필 정보 업데이트
      await fetchSocialInfo();
    } catch (error) {
      console.error("팔로우 상태를 변경하는 데 실패하였습니다:", error);
    }
  };

  // 유저 소셜 책장 책 목록 출력 API 호출
  const fetchSocialBooks = async () => {
    try {
      const status = getStatusInEnglish(activeTab);
      const sorts = sort === "최신순" ? "desc" : "asc";
      const response = await getSocialBooks(status, sorts, search, profile.id);
      setData(response);
      setBooks(response.content);

      // await fetchSocialInfo();
    } catch (error) {
      console.error("팔로우 상태를 변경하는 데 실패하였습니다:", error);
    }
  };

  // 프로필 팔로워/팔로잉 클릭 시 상세 페이지로 이동
  const handleSocialTabClick = (tabCondition) => {
    navigate(`../list/${profile.id}`, {
      replace: true,
      state: {
        tabCondition, // "팔로워" 또는 "팔로잉"
        search: "", // 검색어 (기본값으로 null 전달)
        socialProfile, // 프로필 정보 전달
      },
    });
  };

  // 기존 검색 상태를 함께 navigate로 전달
  const handleBackClick = () => {
    navigate(
      "../",
      {
        state: state,
        replace: true,
      } // 기존 검색 상태를 그대로 전달
    );
  };

  // 팔로우 핸들러
  const handleFollowClick = async (id) => {
    await patchFollow(id);
    setSocialProfile((prev) => ({
      ...prev,
      isFollowing: true,
    }));
  };

  // 언팔로우 핸들러
  const handleUnfollowClick = async (id) => {
    await patchFollow(id);
    setSocialProfile((prev) => ({
      ...prev,
      isFollowing: false,
    }));
  };

  // 탭 선택 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // 현재 스크롤 위치 저장
    // if (tabRef.current) {
    //   setTabScrollLeft(tabRef.current.scrollLeft);
    // }

    setSort("최신순");
  };

  // 책 목록 정렬 핸들러
  const handleSort = (sort) => {
    setSort(sort);
  };

  return (
    <BasicLayout>
      <div className="fixed top-0 left-0 w-full z-50 bg-undbgmain">
        <PrevTitle
          title="소셜 책장"
          showLine={true}
          onClick={handleBackClick}
        />
        {!isScrolled && (
          <div className="flex px-6 w-full pt-3.5">
            <SocialProfile
              socialProfile={socialProfile}
              onFollowClick={async () => handleFollowClick(socialProfile.id)} // 팔로우 버튼 클릭
              onUnfollowClick={async () =>
                handleUnfollowClick(socialProfile.id)
              } // 언팔로우 버튼 클릭
              onFollowerClick={() => handleSocialTabClick("팔로워")} // 팔로워 클릭
              onFollowingClick={() => handleSocialTabClick("팔로잉")} // 팔로잉 클릭
            />
          </div>
        )}
        {!isScrolled && (
          <div className="py-4 px-6">
            <SearchBar
              placeholder={"책 제목, 저자로 검색"}
              // onChange={handleSearch}
            />
          </div>
        )}
        <div className="px-0">
          <TabCondition
            tabs={[
              "읽고 있는 책",
              "읽고 싶은 책",
              "다 읽은 책",
              "중단한 책",
              "책갈피",
            ]}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />
        </div>
        {!isScrolled && (
          <div className="flex items-center justify-between px-6 pt-4">
            <ItemCount count={data?.totalElements || 0} unit={"권"} />
            <SortDropdown
              onChange={handleSort}
              option1={"최신순"}
              option2={"오래된 순"}
              activeOption={sort}
            />
          </div>
        )}
        {/* <div className="flex h-full pb-16 px-6"> */}
        <div className="flex justify-center w-full h-20 px-6">
          <div className="items-center">
            {/* 검색 결과가 없을 때 공지 표시 */}
            {data.totalElements === 0 && <ListNotice type="noResult" />}
          </div>
          {/* 검색 목록 출력 */}
          {data.totalElements > 0 && (
            <div className="pb-16 flex justify-center">
              <BookList
                books={books}
                // onCardClick={moveToDetail}
              />
            </div>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export default SocialBookListPage;
