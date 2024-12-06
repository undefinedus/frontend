import React, { useEffect, useState } from "react";
import { PiMedalFill } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PieChart from "../statistics/PieChart";
import { getCategoryStatistics } from "../../../api/settings/statistics/statisticsApi";

const CategoryComponent = () => {
  const [statisticsData, setStatisticsData] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryStatistics();

        const categoryList =
          response.data.data.statisticsCategoryBookCountResponseDTOList;
        const totalCount = response.data.data.totalCount;

        const categoryTotals = categoryList.reduce((acc, item) => {
          const { categoryName, bookCount } = item;
          acc[categoryName] = (acc[categoryName] || 0) + bookCount;
          return acc;
        }, {});

        const sortedData = Object.entries(categoryTotals)
          .map(([categoryName, bookCount]) => ({
            categoryName,
            bookCount,
          }))
          .sort((a, b) => b.bookCount - a.bookCount);

        setStatisticsData(sortedData);
        setTotalBooks(totalCount);

        const total = sortedData.reduce((sum, item) => sum + item.bookCount, 0);
        const top5 = sortedData.slice(0, 5);
        const othersCount = sortedData
          .slice(5)
          .reduce((sum, item) => sum + item.bookCount, 0);

        const pieChartData = [
          ...top5.map((item) => ({
            id: item.categoryName,
            value: item.bookCount / total,
          })),
        ];

        if (othersCount > 0) {
          pieChartData.push({
            id: "기타",
            value: othersCount / total,
          });
        }

        setChartData(pieChartData);
      } catch (error) {
        console.error("통계 데이터 로딩 실패", error);
      }
    };
    fetchData();
  }, []);

  const medalColors = ["#FFD400", "#CDCDCD", "#8D6627"];

  return (
    <div className="bg-undbgmain w-full">
      <div>
        <div className="flex flex-col gap-7">
          <div className="flex justify-center">
            <PieChart data={chartData} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-extrabold flex justify-end">
              {`총 ${totalBooks}권`}
            </div>
            <div className="space-y-2">
              {/* 상위 5개 카테고리 */}
              {statisticsData.slice(0, 5).map((category, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {index < 3 ? (
                      <PiMedalFill color={medalColors[index]} size={24} />
                    ) : (
                      <div className="w-6" />
                    )}
                    <div>{category.categoryName}</div>
                  </div>
                  <div>{`${category.bookCount}권`}</div>
                </div>
              ))}

              {/* 더보기/접기 버튼 - 추가 데이터가 있을 때만 표시 */}
              {statisticsData.length > 5 && (
                <>
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="w-full flex items-center justify-center gap-1 text-gray-500 hover:text-gray-700 pt-2"
                  >
                    {showMore ? (
                      <>
                        <span>접기</span>
                        <IoIosArrowUp size={20} />
                      </>
                    ) : (
                      <>
                        <span>더보기</span>
                        <IoIosArrowDown size={20} />
                      </>
                    )}
                  </button>

                  {/* 나머지 카테고리 */}
                  {showMore && (
                    <div className="space-y-2 pt-2 border-t border-gray-200">
                      {statisticsData.slice(5).map((category, index) => (
                        <div
                          key={`rest-${index}`}
                          className="flex justify-between items-center text-gray-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6" />
                            <div>{category.categoryName}</div>
                          </div>
                          <div>{`${category.bookCount}권`}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
