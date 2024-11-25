import { useEffect, useRef, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { OnlyTitle } from "../../layouts/TopLayout";
import { getBookList } from "../../api/bookApi";
import ScrollActionButtons from "../../components/commons/ScrollActionButtons";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/commons/SearchBar";
import {
  ItemCount,
  SortDropdown,
} from "../../components/commons/ListSortAndCount";
import ListNotice from "../../components/commons/ListNotice";
import BookList from "../../components/book/BookList";
import TabCondition from "../../components/commons/TabCondition";
import useBookStatus from "../../hooks/useBookStatus";

const statusTranslator = {
  "읽고 있는 책": "READING",
  "읽고 싶은 책": "WISH",
  "다 읽은 책": "COMPLETED",
  "중단한 책": "STOPPED",
};

const MyBookListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prevActiveTab, prevSearch, prevSort, prevScrollLeft } =
    location.state || {};
  const [openAddModal, setOpenAddModal] = useState(false);
  const [data, setData] = useState({});
  const [books, setBooks] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(prevActiveTab || "읽고 있는 책");
  const [search, setSearch] = useState(prevSearch || "");
  const [sort, setSort] = useState(prevSort || "최신순");
  const { getStatusInEnglish } = useBookStatus();
  const tabRef = useRef(null);
  const [tabScrollLeft, setTabScrollLeft] = useState(prevScrollLeft || 0);

  useEffect(() => {
    fetchBookList();
  }, [activeTab, sort, search]);

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

  // 스크롤 복원
  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.scrollLeft = tabScrollLeft;
    }
  }, [tabScrollLeft]);

  const fetchBookList = async () => {
    try {
      const status = getStatusInEnglish(activeTab);
      const sorts = sort === "최신순" ? "desc" : "asc";
      const res = await getBookList(status, sorts, search);
      console.log("res: ", res);
      setData(res);
      setBooks(res.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // 현재 스크롤 위치 저장
    if (tabRef.current) {
      setTabScrollLeft(tabRef.current.scrollLeft);
    }

    setSort("최신순");
  };

  const handleSort = (sort) => {
    setSort(sort);
  };

  const handleSearch = (search) => {
    console.log(search);
    setSearch(search);
  };

  const moveToDetail = (book) => {
    const bookId = book.id;
    navigate(
      { pathname: `../detail/${bookId}` },
      {
        replace: true,
        state: {
          prevActiveTab: activeTab,
          prevSearch: search,
          prevSort: sort,
          prevScrollLeft: tabScrollLeft,
        },
      }
    );
  };

  return (
    <BasicLayout>
      <div className="w-full min-h-screen">
        <div className="fixed top-0 start-0 z-50 w-full bg-undbgmain">
          <OnlyTitle title="내 책장" showLine={false} />

          {!isScrolled && (
            <div className="py-4 px-6">
              <SearchBar
                placeholder={"책 제목, 저자로 검색"}
                onChange={handleSearch}
                searchHistory={search}
              />
            </div>
          )}

          <div className="px-0">
            <TabCondition
              ref={tabRef}
              tabs={[
                "읽고 있는 책",
                "읽고 싶은 책",
                "다 읽은 책",
                "중단한 책",
                "책갈피",
              ]}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              initialScrollLeft={tabScrollLeft}
            />
          </div>

          {!isScrolled && (
            <div className="flex items-center justify-between px-6 py-2">
              <ItemCount count={data?.totalElements || 0} unit={"권"} />
              <SortDropdown
                onChange={handleSort}
                option1={"최신순"}
                option2={"오래된 순"}
                activeOption={sort}
              />
            </div>
          )}
        </div>

        {/* 검색 결과가 없을 때 공지 표시 */}
        {data.totalElements === 0 && (
          <div className="w-full h-full flex justify-center items-center">
            <ListNotice type="noResult" />
          </div>
        )}
        {/* 검색 목록 출력 */}
        {data.totalElements > 0 && (
          <div className="pt-52 pb-16 flex justify-center px-6">
            <BookList books={books} onCardClick={moveToDetail} />
          </div>
        )}

        <ScrollActionButtons
          mainLabel={"책 담기"}
          mainAction={() =>
            navigate({ pathname: "/home/searchbook" }, { replace: true })
          }
        />
      </div>
    </BasicLayout>
  );
};

export default MyBookListPage;
