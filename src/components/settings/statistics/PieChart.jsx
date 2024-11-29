import * as React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => {
  return (
    <div className="w-80 h-52 border border-transparent flex justify-center">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 40, bottom: 20, left: -70 }}
        startAngle={-270}
        endAngle={250}
        innerRadius={0.5}
        padAngle={0}
        cornerRadius={0}
        valueFormat={".0%"}
        colors={[
          "#E57373",
          "#FFB74D",
          "#FFD54F",
          "#81C784",
          "#64B5F6",
          "#D3d3d3",
        ]}
        borderWidth={0}
        arcLinkLabelsSkipAngle={0}
        arcLinkLabelsTextColor="#000000"
        arcLinkLabelsThickness={0}
        sortByValue={true}
        enableArcLinkLabels={false}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={0}
        theme={{
          labels: {
            text: {
              fontSize: 14,
              fill: "#ffffff",
            },
          },
          legends: {
            text: {
              fontSize: 12,
              fill: "undtextgray",
            },
          },
        }}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 30,
            translateY: 30,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 14,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "olive",
                },
              },
            ],
          },
        ]}
        motionConfig={{
          mass: 0.1,
          tension: 170,
          friction: 29,
          clamp: false,
          precision: 0.01,
          velocity: 1,
        }}
        transitionMode="pushOut"
      />
    </div>
  );
};

export default PieChart;
