import React, { useEffect, useState } from "react";
import { PrevTitleInfo } from "../../layouts/TopLayout";
import NavBar from "../../layouts/NavBar";
import CategoryComponent from "../../components/settings/record/CategoryComponent";
import DailyStatisticsComponent from "../../components/settings/record/DailyStatisticsComponent";
import YearlyMonthlyStatisticsComponent from "../../components/settings/record/YearlyMonthlyStatisticsComponent";
import TabCondition from "../../components/commons/TabCondition";
import BasicLayout from "../../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";

const RecordPage = () => {
  const tabList = ["카테고리별", "일자별", "연/월별"];
  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const navigete = useNavigate();

  return (
    <BasicLayout>
      <div className="bg-undbgmain">
        <div className="fixed h-28 left-0 top-0 right-0 bottom-0 z-50">
          <PrevTitleInfo
            title={"통계"}
            showLine={false}
            onClickInfo={() => setInfoTooltip((prev) => !prev)}
            onClick={() => navigete("/settings")}
          />
          <div className="bg-undbgmain">
            <TabCondition
              tabs={tabList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showLine={true}
            />
          </div>
        </div>

        <div
          className={`
        
        ${infoTooltip ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
        >
          <div
            className={`
          relative
          ${infoTooltip ? "opacity-100" : "opacity-0"}
        `}
          >
            <ul className="list-disc absolute list-inside rounded-xl gap-2 bg-unddisabled text-undclickbrown font-bold text-xs flex flex-col items-start top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 z-50 w-80 px-3.5 py-4">
              <li className="mb-2">
                카테고리별, 연/월별 통계는 '다 읽은 책'만 비교합니다
              </li>
              <li>연간 통계는 최근 3년간의 독서량을 비교합니다</li>
            </ul>
          </div>
        </div>

        <div className="px-6 pt-28 pb-20 w-full">
          <div
            className={`
          transition-opacity duration-300 ease-in-out
          ${
            activeTab === "카테고리별"
              ? "opacity-100"
              : "opacity-0 h-0 overflow-hidden"
          }
        `}
          >
            {activeTab === "카테고리별" && <CategoryComponent />}
          </div>
          <div
            className={`
          transition-opacity duration-300 ease-in-out
          ${
            activeTab === "일자별"
              ? "opacity-100"
              : "opacity-0 h-0 overflow-hidden"
          }
        `}
          >
            {activeTab === "일자별" && <DailyStatisticsComponent />}
          </div>
          <div
            className={`
          transition-opacity duration-300 ease-in-out
          ${
            activeTab === "연/월별"
              ? "opacity-100"
              : "opacity-0 h-0 overflow-hidden"
          }
        `}
          >
            {activeTab === "연/월별" && <YearlyMonthlyStatisticsComponent />}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default RecordPage;
