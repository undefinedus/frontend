import { useEffect, useState } from "react";
import { PiPlusBold, PiCaretDoubleUpBold } from "react-icons/pi";

// mainAction : 글 작성버튼 클릭 시 함수
// mainLabel : 글쓰기, 책갈피 등 버튼에 넣을 텍스트
// onlyTop : 글 작성 버튼 없이 상단으로 버튼만 있을 경우 true
const ScrollActionButtons = ({ mainAction, mainLabel, onlyTop = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100); // 100px 이상 스크롤 시 버튼 전환
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {!isScrolled ? (
        !onlyTop && (
          <button
            className={`w-28 h-12 bg-undlightpoint flex justify-between text-white rounded-full px-4 py-3 shadow-lg`}
            onClick={mainAction}
          >
            <PiPlusBold size={24} /> {mainLabel}
          </button>
        )
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <button
            className="bg-undlightpoint w-12 h-12 text-white rounded-full flex items-center justify-center"
            onClick={handleScrollToTop}
          >
            <PiCaretDoubleUpBold size={24} />
          </button>
          {!onlyTop && (
            <button
              className={`bg-undlightpoint w-12 h-12 text-white rounded-full flex items-center justify-center`}
              onClick={mainAction}
            >
              <PiPlusBold size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ScrollActionButtons;
