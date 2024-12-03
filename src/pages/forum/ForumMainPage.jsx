import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getForums } from "../../api/forum/ForumApi";
import useForumStatus from "../../hooks/useForumStatus";
import BasicLayout from "../../layouts/BasicLayout";
import { OnlyTitle } from "../../layouts/TopLayout";
import SearchBar from "../../components/commons/SearchBar";
import TabCondition from "../../components/commons/TabCondition";
import {
  ItemCount,
  SortDropdown,
} from "../../components/commons/ListSortAndCount";
import ScrollActionButtons from "../../components/commons/ScrollActionButtons";
import ForumList from "../../components/forum/ForumList";

// 토론 메인 게시판 리스트
const ForumMainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location.state || {}; // state 상태
  const { getStatusInEnglish } = useForumStatus();
  const { state } = location; // 기존 검색 상태

  const scrollPositionRef = useRef(0); // 스크롤 위치를 저장하기 위한 ref
  const [search, setSearch] = useState(prevSearch || ""); // 검색어 상태
  const [activeTab, setActiveTab] = useState("주제 발의"); // 현재 선택된 탭
  const [sort, setSort] = useState(prevSort || "최신순");
  const option1 = "최신순"; // 정렬 옵션1 지정
  const option2 = "오래된 순"; // 정렬 옵션2 지정
  const [sortOption, setSortOption] = useState(state?.sortOption || option1); // 정렬 기본값 설정
  const [lastId, setLastId] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [totalElements, setTotalElements] = useState(state?.totalElements || 0); // 총 검색 결과 수 상태
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [forums, setForums] = useState(state?.forums || []);

  const tabRef = useRef(null); // 탭
  const [tabScrollLeft, setTabScrollLeft] = useState(prevScrollLeft || 0);

  const observer = useRef(null); // 마지막 스크롤 감지
  const sentinelRef = useRef(null); // 마지막 스크롤 감지

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

  // API 호출
  useEffect(() => {
    fetchForums(); // 초기 데이터 로드
  }, [activeTab, sort, search]);

  // 마지막 게시물 체크, 스크롤
  useEffect(() => {
    if (sentinelRef.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !loading && hasNext) {
            setLoading(true);
            fetchForums(lastId);
          }
        },
        { threshold: 1.0 }
      );
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasNext]);

  // 토론 목록 API 호출
  const fetchForums = async (lastId = null) => {
    try {
      setLoading(true);
      const status = getStatusInEnglish(activeTab);
      const sorts = sort === "최신순" ? "desc" : "asc";
      const res = await getForums(status, sorts, search, lastId);
      if (lastId) {
        setForums((prevForums) => [...prevForums, ...res]);
      } else {
        setForums(res.content);
      }
      console.log("*****res : ", res);
      setLastId(res.lastId);
      setHasNext(res.hasNext);
      setTotalElements(res.totalElements);
      setLoading(false);
    } catch (error) {
      console.error("토론 목록을 불러오는 데 실패했습니다:", error);
      setLoading(false);
    }
    return forums;
  };

  // 토론 게시판 탭 클릭 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab); // 탭 변경
    setLastId(null); // 상태 초기화
    setForums([]);
    setHasNext(false);
    // 현재 스크롤 위치 저장
    if (tabRef.current) {
      setTabScrollLeft(tabRef.current.scrollLeft);
    }
  };

  // 목록 정렬 관리
  const handleSort = (sort) => {
    setSort(sort);
  };

  // 게시물 검색 관리
  const handleSearch = (search) => {
    console.log(search);
    setSearch(search);
  };

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (forum) => {
    // 현재 스크롤 위치 저장
    scrollPositionRef.current =
      window.scrollY || document.documentElement.scrollTop;

    navigate(`propose/${forum.discussionId}`, {
      replace: true,
      state: {
        search, // 현재 검색어
        forums, // 현재 검색 결과 목록
        totalElements, // 검색 결과 개수
        sortOption, // 정렬 옵션
        // isSearchExecuted,
        scrollPosition: scrollPositionRef.current, // 스크롤 위치 저장
      },
    });
  };
  return (
    <BasicLayout>
      <div className="w-full fixed top-0">
        <OnlyTitle title={"토론"} showLine={isScrolled ? true : false} />
      </div>

      {!isScrolled && (
        <div className="px-6 mt-16">
          <SearchBar
            placeholder="책 제목, 글 제목으로 검색"
            onChange={handleSearch}
            searchHistory={search}
          />
        </div>
      )}
      <div className={isScrolled ? "pt-16" : "pt-4"}>
        <TabCondition
          ref={tabRef}
          tabs={["주제 발의", "토론 예정", "진행 중", "토론 종료"]}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          initialScrollLeft={tabScrollLeft}
        />
      </div>
      {!isScrolled && (
        <div className=" flex justify-between px-6 py-4">
          <ItemCount count={totalElements} unit={"개"} />
          <SortDropdown
            onChange={handleSort}
            option1={option1}
            option2={option2}
            activeOption={sortOption}
          />
        </div>
      )}
      <ScrollActionButtons onlyTop={true} />
      {activeTab === "주제 발의" ? (
        <ScrollActionButtons
          mainLabel={"글쓰기"}
          mainAction={() =>
            navigate({ pathname: "/forum/propose/write" }, { replace: true })
          }
          onlyTop={false}
        />
      ) : (
        <ScrollActionButtons onlyTop={true} />
      )}
      <div className="px-6 flex justify-center">
        <ForumList forums={forums} onCardClick={handleCardClick} />
      </div>
    </BasicLayout>
  );
};

export default ForumMainPage;
