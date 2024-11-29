import { forwardRef, useEffect } from "react";

const TabCondition = forwardRef(function TabCondition(
  {
    tabs = [],
    setActiveTab,
    activeTab,
    showLine = true,
    initialScrollLeft = 0,
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
      className={`flex overflow-x-auto w-full scrollbar-hide justify-center ${

      

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
            {/* 탭 이름 */}
            {tab.replace(/_/g, "/")}
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

export default TabCondition;
