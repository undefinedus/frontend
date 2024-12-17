import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAIRecommend,
  getBestSeller,
  getCategoryBest,
} from "../../api/home/homeBookApi";
import BasicLayout from "../../layouts/BasicLayout";
import { TitleSearch } from "../../layouts/TopLayout";
import HomeBooksList from "../../components/home/HomeBookLIst";
import { PiTargetBold, PiHeartFill, PiMedalFill } from "react-icons/pi";
import LoadingPage from "../LoadingPage";
import LoadingSpinner from "../../components/commons/LoadingSpinner";
import TabCondition from "../../components/commons/TabCondition";

// 책 추천 홈 페이지
const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { AIBook } = location?.state || [];
  const [AIRecommend, setAIRecommend] = useState([]); // AI 추천 상태
  const [categoryBest, setCategoryBest] = useState([]); // 카테고리별 추천 상태
  const [bestSeller, setBestSeller] = useState([]); // 베스트셀러 상태
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]); // 기본 선택 탭
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isAILoading, setIsAILoading] = useState(false);

  const AIComment = (
    <>
      <p className="text-und14 text-undtextgray">
        AI가 내 책장을 분석중이에요!
      </p>
      <p className="text-und14 text-undtextgray">잠시만 기다려 주세요</p>
    </>
  );

  const [aiLoadingComment, setAILoadingComment] = useState(AIComment);

  useEffect(() => {
    if (AIBook && AIBook.length > 0) {
      setAIRecommend(AIBook);
    }
  }, [location]);

  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const categoryBestList = await fetchCategoryBest(
          abortController.signal
        );
        if (!isCancelled) {
          setCategoryBest(categoryBestList);
          const categoryTabs = Object.keys(categoryBestList);
          setTabs(categoryTabs);
          setActiveTab(categoryTabs[0]);
        }

        const bestSellerList = await fetchBestSeller(abortController.signal);
        if (!isCancelled) {
          setBestSeller(bestSellerList);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false); // 모든 데이터 로딩 후 로딩 상태 해제}
        }
      }
    };

    const fetchAIData = async () => {
      try {
        setIsAILoading(true);

        const AIRecommendList = await fetchAIRecommend(abortController.signal);

        if (!isCancelled) {
          setAIRecommend(AIRecommendList);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
        }
        setAILoadingComment(
          <p className="text-und14 text-undred">
            AI가 책장을 분석하는 중 오류가 발생했어요😢
          </p>
        );
      } finally {
        if (!isCancelled) {
          setIsAILoading(false);
        }
      }
    };

    fetchData();

    if (!AIBook || AIBook.length === 0) fetchAIData();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, []);

  // 베스트 셀러 API
  const fetchBestSeller = async (signal) => {
    try {
      const response = await getBestSeller(signal);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return error;
    }
  };

  // 취향 맞춤 API
  const fetchCategoryBest = async (signal) => {
    try {
      const response = await getCategoryBest(signal);
      setTabs(Object.keys(response.data));
      setActiveTab(Object.keys(response.data)[0]);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  // AI 추천 API
  const fetchAIRecommend = async (signal) => {
    try {
      console.log(AIBook);

      const response = await getAIRecommend(signal);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (book) => {
    navigate(`detail/${book.isbn13}`, {
      replace: true,
      state: { AIBook: AIRecommend },
    });
  };

  return (
    <BasicLayout>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {/* 상단 네비 */}
          <div className="fixed top-0 left-0 w-full z-50 bg-undbgmain">
            <TitleSearch title={"홈"} showLine={true} />
          </div>
          {/* 베스트 셀러 목록 */}
          <div className="pt-20 pl-6 pb-10">
            <div className="flex w-full h-full pb-2">
              <PiMedalFill size={24} color="#D55636" />
              <p className="ml-2 font-heavy text-undtextdark text-und18">
                주간 베스트 셀러
              </p>
            </div>
            <HomeBooksList books={bestSeller} onCardClick={handleCardClick} />
          </div>
          {/* 취향 맞춤 추천 도서 목록 */}
          <div className="pb-10">
            <div className="flex w-full h-full pb-2 pl-6">
              <PiHeartFill size={24} color="#D55636" />
              <p className="ml-2 font-heavy text-undtextdark text-und18">
                취향별 추천 도서
              </p>
            </div>
            <div className="pb-4">
              <TabCondition
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showLine={false}
              />
            </div>
            {activeTab && (
              <div className="pl-6">
                <HomeBooksList
                  books={categoryBest[activeTab]}
                  onCardClick={handleCardClick}
                />
              </div>
            )}
          </div>
          {/* AI 추천 목록 */}
          <div className="pb-20 pl-6">
            <div className="flex w-full h-full pb-2">
              <PiTargetBold size={24} color="#D55636" />
              <p className="ml-2 font-heavy text-undtextdark text-und18">
                AI 추천 도서
              </p>
            </div>
            {isAILoading ? (
              <div>
                <LoadingSpinner size={"sm"} />
                {aiLoadingComment}
              </div>
            ) : (
              <HomeBooksList
                books={AIRecommend}
                onCardClick={handleCardClick}
              />
            )}
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export default HomePage;
