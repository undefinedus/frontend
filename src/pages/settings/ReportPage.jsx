import React, { useEffect, useState, useRef } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import ReportTabCondition from "../../components/commons/ReportTabCondition";
import { SortDropdown } from "../../components/commons/ListSortAndCount";
import { useLocation, useNavigate } from "react-router-dom";
import { getReportList } from "../../api/settings/reportApi";
import ReportComponents from "../../components/settings/report/ReportComponents";
import ScrollActionButtons from "../../components/commons/ScrollActionButtons";

const ReportPage = () => {
  const location = useLocation();
  const [reports, setReports] = useState([]);
  const tabList = ["미처리", "처리 완료"];
  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [isScrolled, setIsScrolled] = useState(false);
  const { prevSort, prevScrollLeft } = location.state || {};
  const [sort, setSort] = useState(prevSort || "최신순");
  const [tabScrollLeft, setTabScrollLeft] = useState(prevScrollLeft || 0);
  const tabRef = useRef(null);
  const [tabCounts, setTabCounts] = useState({
    미처리: 0,
    "처리 완료": 0,
  });

  const navigate = useNavigate();

  const handleSort = (sort) => {
    setSort(sort);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "미처리") {
      setSort("최신순");
    } else if (tab === "처리 완료") {
      setSort("오래된 순");
    }

    // 현재 스크롤 위치 저장
    if (tabRef.current) {
      setTabScrollLeft(tabRef.current.scrollLeft);
    }

    setSort("최신순");
  };

  const fetchReports = async () => {
    try {
      // sort 상태값에 따라 정렬 방식 결정
      const sortOrder = sort === "최신순" ? "desc" : "asc";
      const response = await getReportList(activeTab, sortOrder);
      setReports(response.data.content);
    } catch (error) {
      console.error("신고 내역 조회 실패:", error);
    }
  };

  const fetchReportCounts = async () => {
    try {
      const unprocessedData = await getReportList("미처리");
      const processedData = await getReportList("처리 완료");

      const unprocessedCount = unprocessedData.data.totalElements;
      const processedCount = processedData.data.totalElements;

      setTabCounts({
        미처리: unprocessedCount,
        "처리 완료": processedCount,
      });
    } catch (error) {
      console.error("신고 내역 가져오기 실패!", error);
      setTabCounts({
        미처리: 0,
        "처리 완료": 0,
      });
    }
  };

  // 스크롤 복원
  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.scrollLeft = tabScrollLeft;
    }
  }, [tabScrollLeft]);

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

  // 컴포넌트 마운트 시 탭 카운트 fetch
  useEffect(() => {
    fetchReportCounts();
  }, []); // 컴포넌트 마운트 시 1회만 실행

  // 탭 변경 시 reports fetch
  useEffect(() => {
    fetchReports();
  }, [activeTab, sort]);

  useEffect(() => {
    if (activeTab === "미처리") {
      setSort("최신순");
    } else if (activeTab === "처리 완료") {
      setSort("오래된 순");
    }
  }, [activeTab]);

  // 스크롤 복원
  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.scrollLeft = tabScrollLeft;
    }
  }, [tabScrollLeft]);

  return (
    <BasicLayout>
      <PrevTitle
        title="신고내역"
        showLine={false}
        onClick={() => navigate("/admin")}
      />
      <div className="flex overflow-x-auto w-full scrollbar-hide justify-center">
        <div className="flex gap-6 lg:justify-between lg:w-full"></div>
      </div>

      <ReportTabCondition
        tabs={tabList}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        showLine={true}
        counts={tabCounts} // counts prop 추가
      />

      {!isScrolled && (
        <div className="flex items-center justify-end px-6 py-2 my-1">
          <SortDropdown
            onChange={handleSort}
            option1={"최신순"}
            option2={"오래된 순"}
            activeOption={sort}
          />
        </div>
      )}

      <div className="px-6 pb-20">
        <ReportComponents reports={reports} />
      </div>

      <ScrollActionButtons mainLabel={"책 담기"} onlyTop={true} />
    </BasicLayout>
  );
};

export default ReportPage;
