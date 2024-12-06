import React, { useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useAnimate, useInView } from "framer-motion";

const LineChart = ({ data }) => {
  // useAnimate()로 수정
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      const enterAnimation = async () => {
        await animate(
          "path",
          { pathLength: [0, 1] },
          { duration: 1, ease: "easeOut" }
        );
      };
      enterAnimation();
    }
  }, [animate, isInView]);

  return (
    // ref={scope} 추가
    <div ref={scope} className="w-80 h-40 flex justify-center bg-white">
      <ResponsiveLine
        data={data}
        colors={"#2779B2"}
        margin={{ top: 20, right: 12, bottom: 20, left: 30 }}
        xScale={{ type: "point", min: "1" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        enablePointLabel={true}
        yFormat=".0f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 1,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
          format: (value) => `${value}월`,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          truncateTickAt: 0,
          tickValues: 5,
        }}
        pointSize={8}
        pointColor={"#2779B2"}
        pointBorderWidth={0}
        pointBorderColor={"#2779B2"}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        motionConfig={{
          mass: 1,
          tension: 170,
          friction: 26,
          clamp: false,
          precision: 0.01,
          velocity: 1,
        }}
        transitionMode="pushOut"
        enableGridY={false}
      />
    </div>
  );
};

export default LineChart;
