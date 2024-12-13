import React, { useEffect, useState } from "react";
import { PrevTitle } from "../../../layouts/TopLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { triggerRefresh } from "../../../slices/myPageRefreshSlice";
import { useDispatch } from "react-redux";
import Button from "../../../components/commons/Button";
import { modifyPreferences } from "../../../api/settings/myPageApi";

const CATEGORY_MAPPING = {
  잡지: "잡지",
  어린이: "어린이",
  "예술/대중문화": "예술_대중문화",
  "소설/시/희곡": "소설_시_희곡",
  "가정/요리/뷰티": "가정_요리_뷰티",
  여행: "여행",
  에세이: "에세이",
  경제경영: "경제경영",
  자기계발: "자기계발",
  인문학: "인문학",
  "종교/역학": "종교_역학",
  "컴퓨터/모바일": "컴퓨터_모바일",
  유아: "유아",
  사회과학: "사회과학",
  외국어: "외국어",
  역사: "역사",
  과학: "과학",
  만화: "만화",
  장르소설: "장르소설",
  청소년: "청소년",
  "건강/취미": "건강_취미_레저",
};

// 화면에 보여줄 카테고리 목록
const DISPLAY_CATEGORIES = Object.keys(CATEGORY_MAPPING);

// 백엔드 값 -> 프론트엔드 값으로 변환
const reverseMapping = Object.fromEntries(
  Object.entries(CATEGORY_MAPPING).map(([key, value]) => [value, key])
);

const CategoryButton = ({ label, isSelected, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-3.5 py-3 rounded-full
      ${
        isSelected
          ? "bg-undlightpoint text-white border-transparent"
          : "bg-white text-undtextgray border-unddisabled"
      }
      border transition-colors
      ${
        disabled && !isSelected
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }
    `}
  >
    {label}
  </button>
);

const PreferencesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [preferences, setPreferences] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [buttonDisableCondition, setButtonDisableCondition] = useState(true);
  const maxSelections = 3;

  useEffect(() => {
    if (state?.data?.preferences) {
      const transformedPreferences = state.data.preferences.map(
        (category) => reverseMapping[category] || category
      );
      setPreferences(transformedPreferences);
      setSelectedCategories(transformedPreferences);
    }
  }, [state]);

  useEffect(() => {
    const areArraysEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      return arr1.sort().join(",") === arr2.sort().join(","); // 정렬 후 문자열 비교
    };

    const isCategoryCountValid =
      selectedCategories.length >= 1 &&
      selectedCategories.length <= maxSelections;

    console.log("selectedCategories: ", selectedCategories);
    console.log("preferences: ", preferences);

    setButtonDisableCondition(
      areArraysEqual(preferences, selectedCategories) || !isCategoryCountValid
    );
  }, [selectedCategories, preferences]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : prev.length < maxSelections
        ? [...prev, category]
        : prev
    );
  };

  const fetchPreferences = async () => {
    try {
      const data = selectedCategories.map(
        (category) => CATEGORY_MAPPING[category]
      );
      const res = await modifyPreferences(data);
      console.log("res: ", res);

      if (res === "success") {
        dispatch(triggerRefresh());
        navigate({ pathname: "/settings/myPage" }, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full bg-undbgmain px-6">
      <div className="fixed top-0 left-0 right-0">
        <PrevTitle
          title={"내 취향 수정"}
          showLine={false}
          onClick={() =>
            navigate({ pathname: "/settings/myPage" }, { replace: true })
          }
        />
      </div>

      <div className="fixed top-16 bottom-20 left-0 right-0 px-6">
        <div className="flex flex-col justify-evenly h-full">
          <span className="text-undpoint text-base">
            취향을 선택해 주세요(최대 {maxSelections}개)
          </span>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-5">
            {DISPLAY_CATEGORIES.map((category) => (
              <CategoryButton
                key={category}
                label={category}
                isSelected={selectedCategories.includes(category)}
                onClick={() => toggleCategory(category)}
                disabled={
                  selectedCategories.length >= maxSelections &&
                  !selectedCategories.includes(category)
                }
              />
            ))}
          </div>
          <div className="fixed bottom-7 left-0 right-0 px-6">
            <Button
              className="py-2.5 rounded-full w-full"
              color={buttonDisableCondition ? "unddisabled" : "undpoint"}
              buttonDisabled={buttonDisableCondition}
              onClick={fetchPreferences}
            >
              수정하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPage;
