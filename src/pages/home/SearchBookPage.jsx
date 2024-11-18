import React, { useState, useEffect } from "react";
import getSearchBookList from "../../api/commons/searchBookAPI";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import { IsbnBookSearch } from "../../components/commons/SearchBar";
import {
  ItemCount,
  SortDropdown,
} from "../../components/commons/ListSortAndCount";
import ListNotice from "../../components/commons/ListNotice";

// 책 전체 검색 페이지
const SearchBookPage = () => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const [books, setBooks] = useState([]); // 검색 결과 상태
  const [totalResults, setTotalResults] = useState(0); // 총 검색 결과 수 상태
  const [isSearchExecuted, setIsSearchExecuted] = useState(false); // 검색 실행 여부

  // 정렬 옵션 지정
  const option1 = "관련도 순";
  const option2 = "출간일 순";
  const [sortOption, setSortOption] = useState(option1); // 기본값 설정

  // 정렬 옵션에 따른 API 매핑
  const sortMappings = {
    [option1]: "Accuracy", // 관련도 순
    [option2]: "PublishTime", // 출간일 순
  };

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

  return (
    <BasicLayout>
      <div className="h-full">
        {/* 상단 제목 */}
        <PrevTitle title={"책 전체 검색"} showLine={false} />
        {/* 검색창 컴포넌트 */}
        <IsbnBookSearch onSearchSubmit={handleSearchSubmit} />
        {/* 개수 및 정렬 */}
        {isSearchExecuted && totalResults > 0 && (
          <div className="flex h-6 justify-center mt-4 px-6">
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
        {/* 검색 결과가 없을 때 공지 표시 */}
        {isSearchExecuted && totalResults === 0 && (
          <div className="w-full h-full bg-yellow-500 flex justify-center items-center">
            <ListNotice type="noResult" />
          </div>
        )}
        {/* <div><SearchBooks/></div>*/}
      </div>
    </BasicLayout>
  );
};

export default SearchBookPage;
