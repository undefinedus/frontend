import { forwardRef, useEffect, useRef } from "react";

const TabCondition = forwardRef(function TabCondition(
  {
    tabs = [],
    setActiveTab,
    activeTab,
    showLine = true,
    initialScrollLeft = 0,
  },
  externalRef
) {
  const internalRef = useRef();

  const ref = externalRef || internalRef;

  useEffect(() => {
    if (ref?.current) {
      const maxScrollLeft = ref.current.scrollWidth - ref.current.offsetWidth;
      ref.current.scrollLeft = Math.min(initialScrollLeft, maxScrollLeft);
    }
  }, [initialScrollLeft, ref]);

  useEffect(() => {
    if (ref?.current) {
      const container = ref.current;
      const index = tabs.indexOf(activeTab);
      if (index === -1) return;

      const tabElement = container.children[0].children[index];
      if (!tabElement) return;

      const containerWidth = container.offsetWidth;
      const tabOffsetLeft = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;
      const maxScrollLeft = container.scrollWidth - containerWidth;

      const scrollTo = Math.min(
        tabOffsetLeft - containerWidth / 2 + tabWidth / 2,
        maxScrollLeft
      );

      container.scrollTo({ left: Math.max(scrollTo, 0), behavior: "smooth" });
    }
  }, [activeTab, ref, tabs]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
            onClick={() => handleTabClick(tab, index)}
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
