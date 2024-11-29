import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart = () => (
  <div className="w-80 h-40 flex justify-center bg-white border border-unddisabled rounded-sm">
    <ResponsiveBar
      data={[
        {
          연도: "2022",
          경제경영: 5,
          경제경영Color: "hsl(262, 70%, 50%)",
          만화: 10,
          만화Color: "hsl(240, 70%, 50%)",
          "소설/시/희곡": 2,
          "소설/시/희곡Color": "hsl(309, 70%, 50%)",
          기타: 4,
          기타Color: "hsl(334, 70%, 50%)",
        },
        {
          연도: "2023",

          만화: 15,
          만화Color: "hsl(204, 70%, 50%)",
          역사: 2,
          역사Color: "hsl(96, 70%, 50%)",
          "소설/시/희곡": 3,
          "소설/시/희곡Color": "hsl(298, 70%, 50%)",

          기타: 6,
          기타Color: "hsl(345, 70%, 50%)",
        },
        {
          연도: "2024",
          경제경영: 3,
          경제경영Color: "hsl(357, 70%, 50%)",
          만화: 19,
          만화Color: "hsl(264, 70%, 50%)",
          역사: 3,
          역사Color: "hsl(318, 70%, 50%)",

          기타: 8,
          기타Color: "hsl(66, 70%, 50%)",
        },
      ]}
      keys={["경제경영", "만화", "소설/시/희곡", "역사", "인문학", "기타"]}
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

export default BarChart;
