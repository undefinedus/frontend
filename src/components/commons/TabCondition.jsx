import React, { useState } from "react";

const TabCondition = ({
  tabs = [],
  setActiveTab,
  activeTab,
  showLine = true,
}) => {
  return (
    <div
      className={`px-6 flex overflow-x-auto w-full scrollbar-hide ${
        showLine && "border-unddisabled border-b"
      }`}
    >
      <div className="flex gap-6 lg:justify-between lg:w-full">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`relative pb-2 w-24 cursor-pointer text-center text-und14 ${
              activeTab === tab
                ? "text-undpoint font-extrabold"
                : "text-undtextgray font-medium"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/_/g, "/")}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-undpoint rounded-t-lg"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabCondition;
