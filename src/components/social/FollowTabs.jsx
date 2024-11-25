import React from "react";

const FollowTabs = ({ tabs = [], setActiveTab, activeTab, socialProfile }) => {
  return (
    <div className="flex justify-between text-center gap-8 px-6 border-unddisabled border-b bg-undbgmain">
      {/* 팔로워 */}
      <div
        className={`relative flex w-1/2 flex-col items-center pb-2 cursor-pointer ${
          activeTab === tabs[0] ? "text-undtextdark" : "text-undtextgray"
        }`}
        onClick={() => setActiveTab(tabs[0])}
      >
        <span className="font-heavy text-und20">
          {socialProfile.followerCount}
        </span>
        <span className="text-und16">{tabs[0]}</span>
        {activeTab === tabs[0] && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-undpoint rounded-t-lg"></div>
        )}
      </div>

      {/* 팔로잉 */}
      <div
        className={`relative flex w-1/2 flex-col items-center pb-2 cursor-pointer ${
          activeTab === tabs[1] ? "text-undtextdark" : "text-undtextgray"
        }`}
        onClick={() => setActiveTab(tabs[1])}
      >
        <span className="font-heavy text-und20">
          {socialProfile.followingCount}
        </span>
        <span className="text-und16">{tabs[1]}</span>
        {activeTab === tabs[1] && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-undpoint rounded-t-lg"></div>
        )}
      </div>
    </div>
  );
};

export default FollowTabs;
