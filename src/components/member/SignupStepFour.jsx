import React, { useEffect, useState } from "react";
import Button from "../../components/commons/Button";
import { registMember } from "../../api/signupApi";
import BasicModal from "../../components/modal/commons/BasicModal";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useCustomLogin from "../../hooks/useCustomLogin";
// 화면에 보여줄 카테고리와 실제 전송될 Enum 값을 매핑
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
  "건강/취미": "건강_취미_레저",
};

// 화면에 보여줄 카테고리 목록
const DISPLAY_CATEGORIES = [
  "잡지",
  "어린이",
  "예술/대중문화",
  "소설/시/희곡",
  "가정/요리/뷰티",
  "여행",
  "에세이",
  "경제경영",
  "자기계발",
  "인문학",
  "종교/역학",
  "컴퓨터/모바일",
  "유아",
  "사회과학",
  "외국어",
  "역사",
  "과학",
  "만화",
  "장르소설",
  "건강/취미",
];

const CategoryButton = ({ label, isSelected, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-3.5 py-2.5 rounded-full
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

const SignupStepFour = ({ registerData }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [buttonDisableCondition, setButtonDisableCondition] = useState(true);
  const maxSelections = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { doLogin } = useCustomLogin();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setButtonDisableCondition(selectedCategories.length !== maxSelections);
  }, [selectedCategories]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : prev.length < maxSelections
        ? [...prev, category]
        : prev
    );
  };

  const handleRegister = async () => {
    try {
      const finalRegisterData = {
        username: registerData.username,
        password: registerData.password,
        nickname: registerData.nickname,
        birth: registerData.birth, // YYYY-MM-DD 형식인지 확인
        gender: registerData.gender, // "MALE" 또는 "FEMALE"
        preferences: selectedCategories.map(
          (category) => CATEGORY_MAPPING[category]
        ), // 선택된 카테고리 배열
      };

      const response = await registMember(finalRegisterData);
      if (response.result) {
        openModal();
      } else {
        alert(`회원가입에 실패했습니다: ${response.message || ""}`);
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert(`회원가입 처리 중 오류가 발생했습니다: ${err.message || ""}`);
    }
  };

  const handleBackgroundClick = () => {
    startButtonHandler();
  };

  const startButtonHandler = async () => {
    try {
      await handleRegister();

      // 회원가입 성공 후 자동 로그인 시도
      const loginResult = await doLogin({
        email: registerData.username,
        pw: registerData.password,
      });

      if (!loginResult.error) {
        navigate("/myBook/shelf", { replace: true });
      } else {
        console.error("자동 로그인 실패");
        navigate("/member/login", { replace: true });
      }
    } catch (err) {
      console.error("처리 실패:", err);
      navigate("/member/login", { replace: true });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <span className="text-undpoint text-base mb-8">
          취향을 선택해 주세요(최대 {maxSelections}개)
        </span>
        <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-4 mb-8">
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
        <Button
          className="py-2.5 rounded-full w-full"
          color={buttonDisableCondition ? "unddisabled" : "undpoint"}
          buttonDisabled={buttonDisableCondition}
          onClick={openModal}
        >
          회원가입 완료
        </Button>
      </div>
      {isModalOpen && (
        <BasicModal
          isOpen={isModalOpen}
          onBackgroundClick={handleBackgroundClick}
          onClose={closeModal}
          confirmText={"시작하기"}
          className={"w-full h-56"}
          bgClassName={"px-4"}
          activeCloseButton={true}
          onConfirm={startButtonHandler}
        >
          <div className="flex flex-col gap-5 h-full">
            <div className="font-bold text-xl text-undpoint">
              공책에 오신 것을 환영해요! 🎉
            </div>
            <div className="text-base text-undtextgray">
              독서의 즐거움을 공유하고, <br />
              다양한 사람들과 이야기를 나눠 보세요!
            </div>
          </div>
        </BasicModal>
      )}
    </>
  );
};

SignupStepFour.propTypes = {
  registerData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    nickname: PropTypes.string,
    birth: PropTypes.string,
    gender: PropTypes.string,
    preferences: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default SignupStepFour;
