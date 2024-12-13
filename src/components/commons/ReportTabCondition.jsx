import { forwardRef, useEffect } from "react";

const ReportTabCondition = forwardRef(function TabCondition(
  {
    tabs = [],
    setActiveTab,
    activeTab,
    showLine = true,
    initialScrollLeft = 0,
    counts = {},
  },
  ref
) {
  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollLeft = initialScrollLeft;
    }
  }, [initialScrollLeft, ref]);

  return (
    <div
      ref={ref}
      className={`px-8 flex overflow-x-auto w-full scrollbar-hide justify-center ${
        showLine && "border-unddisabled border-b"
      }`}
    >
      <div className="flex gap-8 justify-around w-full">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="relative pb-2 w-1/2 cursor-pointer text-center"
          >
            {/* Count 표시 */}
            <div
              className={`text-lg font-extrabold ${
                activeTab === tab
                  ? "text-undtextdark font-extrabold"
                  : "text-undtextgray font-medium"
              }`}
            >
              {counts[tab] || 0}
            </div>
            {/* 탭 이름 */}
            <div
              className={`text-base ${
                activeTab === tab
                  ? "text-undpoint font-extrabold"
                  : "text-undtextgray font-medium"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/_/g, "/")}
            </div>
            {/* 활성화 탭에 밑줄 */}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-undpoint rounded-t-lg"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default ReportTabCondition;
