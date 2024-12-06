import React, { useEffect, useState } from "react";
import LineChart from "../statistics/LineChart";
import BarChart from "../statistics/BarChart";
import {
  PiSealCheckDuotone,
  PiCalendarDuotone,
  PiBookOpenTextDuotone,
} from "react-icons/pi";
import {
  getMonthlyCompletedMyBookData,
  getMemberYears,
  getTotalStatisticsYearsBookInfo,

} from "../../../api/settings/statistics/statisticsApi";

import YearDropdown from "../../settings/record/YearDropdown";

function YearlyMonthlyStatisticsComponent() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [standardYears, setStandardYears] = useState([]);
  const [yearlyStats, setYearlyStats] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [currentYearStats, setCurrentYearStats] = useState({
    monthlyAverageBooks: 0,
    totalBooksThisYear: 0,
    totalPagesThisYear: 0,
  });
  const [totalYearlyStats, setTotalYearlyStats] = useState({
    completedBooks: [],
    monthlyAverages: [],
    totalPages: [],
  });
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setStandardYears([currentYear, currentYear - 1, currentYear - 2]);
  }, []);

  // 데이터 표준화 함수
  const standardizeData = (data, valueKey) => {
    return standardYears.map((year) => {
      const found = data.find((item) => item.year === year);
      return {
        year,
        [valueKey]: found ? found[valueKey] : 0,
      };
    });
  };

  useEffect(() => {
    const fetchTotalYearlyData = async () => {
      try {
        const response = await getTotalStatisticsYearsBookInfo();
        const { data } = response.data;

        setTotalYearlyStats({
          completedBooks: standardizeData(
            data.statisticsYearBookResponseDTO,
            "completedBooks"
          ),
          monthlyAverages: standardizeData(
            data.statisticsMonthBookAverageByYearResponseDTO,
            "averageBooks"
          ),
          totalPages: standardizeData(
            data.statisticsTotalPageByYearResponseDTO,
            "totalPage"
          ),
        });
      } catch (error) {
        console.error("연간 총계 데이터 로딩 실패", error);
      }
    };

    if (standardYears.length > 0) {
      fetchTotalYearlyData();
    }
  }, [standardYears]);

  useEffect(() => {
    const fetchYearOptions = async () => {
      try {
        const response = await getMemberYears();
        setYearOptions(response.data.data);

        // 기본 선택 년도를 사용자의 데이터 중 가장 최근 년도로 설정
        if (response.data.data.length > 0) {
          setSelectedYear(response.data.data[0]); // 데이터는 이미 정렬되어 있다고 가정
        }
      } catch (error) {
        console.error("연도 옵션 로딩 실패", error);
      }
    };

    fetchYearOptions();
  }, []);

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        // yearOptions에 있는 년도들에 대해서만 데이터를 가져옴
        const yearlyDataPromises = yearOptions.map((year) =>
          getMonthlyCompletedMyBookData(year)
        );
        const yearlyResponses = await Promise.all(yearlyDataPromises);

        // 년도별 데이터 정리
        const yearlyData = yearlyResponses.map((res, index) => ({
          year: yearOptions[index],
          totalBooks: res.data.data.totalBooksThisYear,
          monthlyAverage: res.data.data.monthlyAverageBooks,
          totalPages: res.data.data.totalPagesThisYear,
        }));

        setYearlyStats(yearlyData);

        // 현재 선택된 연도의 상세 데이터 설정
        const currentYearData = yearlyResponses.find(
          (res) => res.data.data.yearlyStats.year === selectedYear
        )?.data.data;

        if (currentYearData) {
          const monthlyData = currentYearData.yearlyStats.monthlyStats;
          setMonthlyStats(monthlyData);
          setCurrentYearStats({
            monthlyAverageBooks: currentYearData.monthlyAverageBooks,
            totalBooksThisYear: currentYearData.totalBooksThisYear,
            totalPagesThisYear: currentYearData.totalPagesThisYear,
          });

          // LineChart 데이터 형식으로 변환
          const formattedLineChartData = [
            {
              id: "완독한 책",
              data: monthlyData.map((item) => ({
                x: `${item.month}`,
                y: item.completedBooks,
              })),
            },
          ];

          setLineChartData(formattedLineChartData);
        }
      } catch (error) {
        console.error("통계 데이터 로딩 실패", error);
      }
    };
    if (yearOptions.length > 0) {
      fetchYearlyData();
    }
  }, [selectedYear, yearOptions]);

  const handleYearChange = (selectedOption) => {
    const year = parseInt(selectedOption.replace("년", ""));
    setSelectedYear(year);
  };

  return (
    <div className=" bg-undbgmain">
      <div>
        <div className="flex flex-col">
          <div className="font-black mb-2">연간 통계</div>
          <div className="flex justify-center">
            <BarChart />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <PiSealCheckDuotone size={24} color="#7D5C4D" />
                  <div className="font-extrabold text-base text-undpoint">
                    총 읽은 책 수
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {totalYearlyStats.completedBooks.map((stat) => (
                    <div key={stat.year} className="flex justify-between">
                      <div className="font-extrabold text-base text-undtextgray">
                        {stat.year}년
                      </div>
                      <div className="font-bold text-undtextgray">
                        {stat.completedBooks} 권
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <PiCalendarDuotone size={24} color="#7D5C4D" />
                  <div className="font-extrabold text-base text-undpoint">
                    월 평균 읽은 책
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {totalYearlyStats.monthlyAverages.map((stat) => (
                    <div key={stat.year} className="flex justify-between">
                      <div className="font-extrabold text-base text-undtextgray">
                        {stat.year}년
                      </div>
                      <div className="font-bold text-undtextgray">
                        {stat.averageBooks} 권
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 pb-6">
                <div className="flex gap-1">
                  <PiBookOpenTextDuotone size={24} color="#7D5C4D" />
                  <div className="font-extrabold text-base text-undpoint">
                    총 읽은 페이지 수
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {totalYearlyStats.totalPages.map((stat) => (
                    <div key={stat.year} className="flex justify-between">
                      <div className="font-extrabold text-base text-undtextgray">
                        {stat.year}년
                      </div>
                      <div className="font-bold text-undtextgray">
                        {stat.totalPage} 쪽
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-1 border-t border-unddisabled pt-6">
            <div className="flex justify-center w-full">
              <YearDropdown
                options={yearOptions}
                onChange={handleYearChange}
                activeOption={selectedYear}
              />
            </div>
            <div className="flex justify-center ">
              <LineChart data={lineChartData} />
            </div>
            <div>
              <div className="flex flex-col gap-2 mt-5">
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <PiSealCheckDuotone size={24} color="#7D5C4D" />
                    <div className="font-extrabold text-base text-undpoint">
                      연간 총 읽은 책 수
                    </div>
                  </div>
                  <div className="font-bold text-base text-undtextgray">
                    {currentYearStats.totalBooksThisYear}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <PiCalendarDuotone size={24} color="#7D5C4D" />
                    <div className="font-extrabold text-base text-undpoint">
                      월 평균 읽은 책
                    </div>
                  </div>
                  <div className="font-bold text-base text-undtextgray">
                    {currentYearStats.monthlyAverageBooks}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <PiBookOpenTextDuotone size={24} color="#7D5C4D" />
                    <div className="font-extrabold text-base text-undpoint">
                      총 읽은 페이지 수
                    </div>
                  </div>
                  <div className="font-bold text-base text-undtextgray">
                    {currentYearStats.totalPagesThisYear}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearlyMonthlyStatisticsComponent;
