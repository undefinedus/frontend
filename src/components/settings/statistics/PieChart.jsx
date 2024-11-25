import * as React from "react";
import { ResponsivePie } from "@nivo/pie";

const Piechart = () => {
  // const handle = {
  //   padClick: (data: any) => {
  //     console.log(data);
  //   },

  //   legendClick: (data: any) => {
  //     console.log(data);
  //   },
  // };

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div className="w-80 h-52 border border-unddisabled flex justify-center">
      <ResponsivePie
        /**
         * chart에 사용될 데이터
         */
        data={[
          { id: "경제경영", value: 42 / 100 },
          { id: "만화", value: 27 / 100 },
          { id: "소설/시/희곡", value: 18 / 100 },
          { id: "역사", value: 9 / 100 },
          { id: "인문학", value: 4 / 100 },
          { id: "기타", value: 2 / 100 },
        ]}
        /**
         * chart margin
         */
        margin={{ top: 10, right: 20, bottom: 10, left: -80 }}
        /**
         * chart 중간 빈공간 반지름
         */

        startAngle={-270}
        endAngle={250}
        innerRadius={0.5}
        /**
         * pad 간격
         */
        padAngle={0}
        /**
         * pad radius 설정 (pad별 간격이 있을 시 보임)
         */
        cornerRadius={0}
        /**
         * chart 색상
         */
        colors={[
          "#E57373",
          "#FFB74D",
          "#FFD54F",
          "#81C784",
          "#64B5F6",
          "#D3d3d3",
        ]} // 커스터하여 사용할 때
        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * pad border 두께 설정
         */
        borderWidth={0}
        /**
         * link label skip할 기준 각도
         */
        arcLinkLabelsSkipAngle={0}
        /**
         * link label 색상
         */
        arcLinkLabelsTextColor="#000000"
        /**
         * link label 연결되는 선 두께
         */
        arcLinkLabelsThickness={0}
        /**
         * link label 연결되는 선 색상
         */
        sortByValue={true}
        enableArcLinkLabels={false}
        arcLinkLabelsColor={{ from: "color" }} // pad 색상에 따라감
        /**
         * label (pad에 표현되는 글씨) skip할 기준 각도
         */
        arcLabelsSkipAngle={0}
        theme={{
          /**
           * label style (pad에 표현되는 글씨)
           */
          labels: {
            text: {
              fontSize: 14,
              fill: "#ffffff",
            },
          },
          /**
           * legend style (default로 하단에 있는 색상별 key 표시)
           */
          legends: {
            text: {
              fontSize: 12,
              fill: "undtextgray",
            },
          },
        }}
        /**
         * pad 클릭 이벤트
         */
        // onClick={handle.padClick}
        /**
         * legend 설정 (default로 하단에 있는 색상별 key 표시)
         */
        legends={[
          {
            anchor: "right", // 위치
            direction: "column", // item 그려지는 방향
            justify: false, // 글씨, 색상간 간격 justify 적용 여부
            translateX: 20, // chart와 X 간격
            translateY: 30, // chart와 Y 간격
            itemsSpacing: 3, // item간 간격
            itemWidth: 100, // item width
            itemHeight: 18, // item height
            itemDirection: "left-to-right", // item 내부에 그려지는 방향
            itemOpacity: 1, // item opacity
            symbolSize: 18, // symbol (색상 표기) 크기
            symbolShape: "square", // symbol (색상 표기) 모양
            effects: [
              {
                // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                on: "hover",
                style: {
                  itemTextColor: "olive",
                },
              },
            ],
            // onClick: handle.legendClick, // legend 클릭 이벤트
          },
        ]}
      />
    </div>
  );
};

export default Piechart;
