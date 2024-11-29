import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSocialInfo } from "../../api/social/socialBookShelfAPI";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import SocialProfile from "../../components/social/SocialProfile";
import SearchBar from "../../components/commons/SearchBar";
import TabCondition from "../../components/commons/TabCondition";
import {
  ItemCount,
  SortDropdown,
} from "../../components/commons/ListSortAndCount";

// 소셜 유저 책장
const SocialBookListPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 전달받은 state를 가져옴
  const searchUserList = location?.state?.searchUserList; // state와 socialList 안전하게 접근
  const profile = location?.state?.profile; // state와 socialList 안전하게 접근
  const { state } = location; // 기존 검색 상태
  const [socialProfile, setSocialProfile] = useState([]); // 내 소셜 프로필 정보 상태
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태 관리

  console.log("*****profile : ", profile);

  // 내 소셜 프로필 정보
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

  // 내 소셜 정보 API
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

  // 기존 검색 상태를 함께 navigate로 전달
  const handleBackClick = () => {
    navigate(
      "../",
      // "../list",
      {
        state: state,
        replace: true,
      } // 기존 검색 상태를 그대로 전달
    );
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
              // onFollowerClick={() => handleSocialTabClick("팔로워")} // 팔로워 클릭
              // onFollowingClick={() => handleSocialTabClick("팔로잉")} // 팔로잉 클릭
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
            // activeTab={activeTab}
            // setActiveTab={handleTabChange}
          />
        </div>
        {!isScrolled && (
          <div className="flex items-center justify-between px-6 py-2">
            <ItemCount
            // count={data?.totalElements || 0} unit={"권"}
            />
            <SortDropdown
              // onChange={handleSort}
              option1={"최신순"}
              option2={"오래된 순"}
              // activeOption={sort}
            />
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default SocialBookListPage;
