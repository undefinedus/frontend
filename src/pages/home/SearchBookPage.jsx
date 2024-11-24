import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSearchBookList } from "../../api/home/searchBookAPI";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import { IsbnBookSearch } from "../../components/home/ISBNSearchBar";
import {
  ItemCount,
  SortDropdown,
} from "../../components/commons/ListSortAndCount";
import ListNotice from "../../components/commons/ListNotice";
import ScrollActionButtons from "../../components/commons/ScrollActionButtons";
import BookList from "../../components/book/BookList";

// 책 전체 검색 페이지
const SearchBookPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location; // 기존 검색 상태

  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const [books, setBooks] = useState([]); // 검색 결과 상태
  const [totalResults, setTotalResults] = useState(0); // 총 검색 결과 수 상태
  const [isSearchExecuted, setIsSearchExecuted] = useState(false); // 검색 실행 여부
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태

  const option1 = "관련도 순"; // 정렬 옵션1 지정
  const option2 = "출간일 순"; // 정렬 옵션2 지정
  const [sortOption, setSortOption] = useState(option1); // 정렬 기본값 설정

  // 정렬 옵션에 따른 API 매핑
  const sortMappings = {
    [option1]: "Accuracy", // 관련도 순
    [option2]: "PublishTime", // 출간일 순
  };

  // 스크롤 관리
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 740); // 100px 이상 스크롤 시 버튼 전환
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 책 상세에서 뒤로가기로 넘어왔을 때 검색어값 유지
  useEffect(() => {
    if (!isSearchExecuted && location.state) {
      console.log(
        "**********뒤로가기 클릭 -> 기존값 넘겨받음 : ",
        location.state
      );
      // location.state가 존재하면 검색어와 목록 복구
      setSearchKeyword(location.state.searchKeyword || "");
      setBooks(location.state.books || []);
      setTotalResults(location.state.totalResults || 0);
      setIsSearchExecuted(true);
    }
  }, [location.state, location.key]);

  // 검색 버튼 클릭 시 실행
  const handleSearchSubmit = (keyword) => {
    setSearchKeyword(keyword); // 입력값 업데이트
    console.log("*****검색어:", keyword);
    fetchBooks(keyword, sortMappings[sortOption]);
    setIsSearchExecuted(true);
  };

  // 정렬 변경 시 실행
  const handleSortChange = async (option) => {
    setSortOption(option); // 선택된 정렬 옵션 업데이트
    console.log("*****선택된 정렬 옵션:", option);
    if (searchKeyword) {
      console.log("*****정렬 옵션 변경으로 재검색 실행:", option);
      await fetchBooks(searchKeyword, sortMappings[option]); // API 재호출
    }
  };

  // 검색 결과
  const fetchBooks = async (searchKeyword, sort = sortOption, page = 1) => {
    try {
      const response = await getSearchBookList(searchKeyword, sort, page);
      setBooks(response.data.items); // 데이터 목록
      setTotalResults(response.data.totalResults); // 검색 결과 수
      console.log("*****검색결과 :", response.data.items);
      console.log("*****총 검색 결과 수 :", response.data.totalResults);
    } catch (error) {
      console.error(error, "검색 결과를 불러오는 데 실패하였습니다");
    }
  };

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (book) => {
    navigate(`detail/${book.isbn13}`, {
      replace: true,
      state: {
        searchKeyword, // 현재 검색어
        books, // 현재 검색 결과 목록
        totalResults, // 검색 결과 개수
      },
    });
  };

  // 이전 버튼 클릭 관리
  const handleBackClick = () => {
    // 기존 검색 상태를 함께 navigate로 전달
    navigate("../");
  };

  return (
    <BasicLayout>
      <div className="w-full min-h-screen">
        <div className="fixed top-0 z-50 w-full">
          {/* 상단 제목 */}
          <PrevTitle
            title={"책 전체 검색"}
            showLine={isScrolled ? true : false}
            onClick={handleBackClick}
          />
          {/* 검색창 컴포넌트 */}
          {!isScrolled && (
            <div>
              <IsbnBookSearch
                onSearchSubmit={handleSearchSubmit}
                searchHistory={state?.searchKeyword || null}
              />
              {isSearchExecuted && totalResults > 0 && (
                <div className="flex h-6 justify-center py-4 px-6 bg-undbgmain">
                  <div className="w-80 h-full flex items-center justify-between">
                    <ItemCount count={totalResults} unit={"권"} />
                    <SortDropdown
                      onChange={handleSortChange}
                      option1={option1}
                      option2={option2}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* 검색 결과가 없을 때 공지 표시 */}
        {isSearchExecuted && totalResults === 0 && (
          <div className="w-full h-full flex justify-center items-center">
            <ListNotice type="noResult" />
          </div>
        )}
        {/* 검색 목록 출력 */}
        {isSearchExecuted && totalResults > 0 && (
          <div className="pt-32 pb-16 flex justify-center">
            <BookList books={books} onCardClick={handleCardClick} />
          </div>
        )}
      </div>
      <ScrollActionButtons onlyTop={true} />
    </BasicLayout>
  );
};

export default SearchBookPage;
