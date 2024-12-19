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
  const navigate = useNavigate();
  const { prevSort, prevScrollLeft } = location?.state || {};

  // 상태 관리
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState("미처리");
  const [sort, setSort] = useState(prevSort || "최신순");
  const [isScrolled, setIsScrolled] = useState(false);
  const [tabScrollLeft, setTabScrollLeft] = useState(prevScrollLeft || 0);
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [tabCounts, setTabCounts] = useState({
    미처리: 0,
    "처리 완료": 0,
  });

  // ref 설정
  const tabRef = useRef(null);
  const observer = useRef(null);
  const sentinelRef = useRef(null);

  const fetchReports = async (lastId = null) => {
    try {
      setLoading(true);
      const sortOrder = sort === "최신순" ? "desc" : "asc";
      const response = await getReportList(activeTab, sortOrder, lastId);

      if (lastId) {
        setReports((prev) => [...prev, ...response.data.content]);
      } else {
        setReports(response.data.content);
      }

      setLastId(response.data.lastId);
      setHasNext(response.data.hasNext);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error("신고 내역 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReportCounts = async () => {
    try {
      const [unprocessedData, processedData] = await Promise.all([
        getReportList("미처리"),
        getReportList("처리 완료"),
        setLoading(true),
      ]);

      setTabCounts({
        미처리: unprocessedData.data.totalElements,
        "처리 완료": processedData.data.totalElements,
      });
    } catch (error) {
      console.error("탭 카운트 조회 실패:", error);
      setTabCounts({
        미처리: 0,
        "처리 완료": 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (newSort) => {
    setSort(newSort);
    setReports([]);
    setLastId(null);
    setHasNext(false);
  };

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setSort("최신순");
      setReports([]);
      setLastId(null);
      setHasNext(false);
      setTotalElements(0);

      if (tabRef.current) {
        setTabScrollLeft(tabRef.current.scrollLeft);
      }
    }
  };

  // Intersection Observer 설정
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading && hasNext) {
          fetchReports(lastId);
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasNext, lastId]);

  // 탭/정렬 변경 시 데이터 fetch
  useEffect(() => {
    fetchReports();
  }, [activeTab, sort]);

  // 스크롤 관리
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 초기 탭 카운트 로드
  useEffect(() => {
    fetchReportCounts();
  }, []);

  // 스크롤 위치 복원
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

      <ReportTabCondition
        tabs={["미처리", "처리 완료"]}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        showLine={true}
        counts={tabCounts}
        ref={tabRef}
      />

      {!isScrolled && (
        <div className="flex items-center justify-end px-6 py-2 my-1">
          <SortDropdown
            onChange={handleSort}
            option1="최신순"
            option2="오래된 순"
            activeOption={sort}
          />
        </div>
      )}

      <div className="px-6 pb-20">
        <ReportComponents reports={reports} />
      </div>

      {/* Sentinel Element - 무한 스크롤 감지용 */}
      {totalElements > 0 && !loading && (
        <div ref={sentinelRef} className="h-1" />
      )}

      <ScrollActionButtons onlyTop={true} />
    </BasicLayout>
  );
};

export default ReportPage;
