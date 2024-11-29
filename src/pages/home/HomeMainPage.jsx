import { useEffect, useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
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
import TabCondition from "../../components/commons/TabCondition";

// 책 추천 홈 페이지
const HomePage = () => {
  const navigate = useNavigate();
  const [AIRecommend, setAIRecommend] = useState([]); // AI 추천 상태
  const [categoryBest, setCategoryBest] = useState([]); // 카테고리별 추천 상태
  const [bestSeller, setBestSeller] = useState([]); // 베스트셀러 상태
  // const [isFetchData, setIsFetchData] = useState(true); // for 로딩
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]); // 기본 선택 탭
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const AIRecommendList = await fetchAIRecommend(); // AI 맞춤 목록
        setAIRecommend(AIRecommendList);

        const categoryBestList = await fetchCategoryBest(); // 취향 맞춤 목록
        setCategoryBest(categoryBestList);
        const categoryTabs = Object.keys(categoryBestList);
        setTabs(categoryTabs);
        setActiveTab(categoryTabs[0]);

        const bestSellerList = await fetchBestSeller(); // 베스트 셀러 목록
        setBestSeller(bestSellerList);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false); // 모든 데이터 로딩 후 로딩 상태 해제
      }
    };
    startTransition(() => {
      fetchData();
    });
  }, []);

  useEffect(() => {
    console.log("*** onClick 함수 확인 AIRecommend:", AIRecommend);
    console.log("*** onClick 함수 확인 categoryBest:", categoryBest);
    console.log("*** onClick 함수 확인 bestSeller:", bestSeller);
  }, [AIRecommend, categoryBest, bestSeller]);

  // 베스트 셀러 API
  const fetchBestSeller = async () => {
    try {
      const response = await getBestSeller();
      console.log("*****베스트셀러 목록 :", response.data);
      // return response.data
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(error, "베스트셀러 목록을 불러오는 데 실패하였습니다");
      return error;
    }
  };

  // 취향 맞춤 API
  const fetchCategoryBest = async () => {
    try {
      const response = await getCategoryBest();
      console.log("*****취향맞춤 추천 목록 :", response.data);
      setTabs(Object.keys(response.data));
      setActiveTab(Object.keys(response.data)[0]);
      console.log("*****", Object.keys(response.data)[0]);
      console.log("*****", response.data[Object.keys(response.data)[0]]);

      return response.data;
    } catch (error) {
      console.error(error, "취향맞춤 추천 목록을 불러오는 데 실패하였습니다");
      return error;
    }
  };

  // AI 추천 API
  const fetchAIRecommend = async () => {
    try {
      const response = await getAIRecommend();
      console.log("*****AI 추천 목록 :", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(error, "AI 추천 목록을 불러오는 데 실패하였습니다");
      return error;
    }
  };

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (book) => {
    console.log("handleCardClick 디버깅 book:", book); // 디버깅
    navigate(`detail/${book.isbn13}`, {
      replace: true,
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
          {/* AI 추천 목록 */}
          <div className="pt-20 pl-6 pb-10">
            <div className="flex w-full h-full pb-2">
              <PiTargetBold size={24} color="#D55636" />
              <p className="ml-2 font-heavy text-undtextdark text-und18">
                AI 추천 도서
              </p>
            </div>
            <HomeBooksList books={AIRecommend} onCardClick={handleCardClick} />
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
          {/* 베스트 셀러 목록 */}
          <div className="pb-20 pl-6">
            <div className="flex w-full h-full pb-2">
              <PiMedalFill size={24} color="#D55636" />
              <p className="ml-2 font-heavy text-undtextdark text-und18">
                주간 베스트 셀러
              </p>
            </div>
            <HomeBooksList books={bestSeller} onCardClick={handleCardClick} />
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export default HomePage;
