import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { getCategoryAndBookCountByYearList } from "../../../api/settings/statistics/statisticsApi";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const response = await getCategoryAndBookCountByYearList();
        const apiData = response.data.data;

        // 현재 연도 구하기
        const currentYear = new Date().getFullYear();

        // 최근 3년 연도 배열 생성
        const yearsList = [currentYear - 2, currentYear - 1, currentYear];

        const allCategories = new Set();
        apiData.forEach((yearData) => {
          yearData.statisticsCategoryBookCountResponseDTOList.forEach(
            (category) => {
              allCategories.add(category.categoryName);
            }
          );
        });
        setCategories([...allCategories]);

        const transformedData = yearsList.map((year) => {
          const yearData = apiData.find((data) => data.year === year);

          const dataPoint = {
            연도: year.toString(),
          };

          allCategories.forEach((category) => {
            dataPoint[category] = 0;
          });

          if (yearData) {
            yearData.statisticsCategoryBookCountResponseDTOList.forEach(
              (category) => {
                dataPoint[category.categoryName] = category.bookCount;
              }
            );
          }

          return dataPoint;
        });
        setChartData(transformedData);
      } catch (error) {
        console.error("연간 카테고리별 통계 데이터 로딩 실패", error);
      }
    };
    fetchAndProcessData();
  }, []);
  return (
    <div className="w-80 h-40 flex justify-center bg-white border border-unddisabled rounded-sm">
      <ResponsiveBar
        data={chartData}
        keys={categories}
        indexBy="연도"
        margin={{ top: 10, right: 110, bottom: 30, left: 30 }}
        padding={0.45}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 115,
            translateY: 0,
            itemsSpacing: -5,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 10,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        // role="application"
        // ariaLabel="Nivo bar chart demo"
        // barAriaLabel={(e) =>
        //   e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        // }
      />
    </div>
  );
};

export default BarChart;
