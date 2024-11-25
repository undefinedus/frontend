import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignupStepThree from "../../components/member/SignupStepThree";
import SignupStepFour from "../../components/member/SignupStepFour";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

const KakaoRedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(3);
  const [socialRegisterData, setSocialRegisterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authCode = searchParams.get("code");

  useEffect(() => {
    const processKakaoLogin = async () => {
      try {
        if (!authCode) {
          throw new Error("인증 코드가 없습니다.");
        }

        // 1. 인증 코드로 액세스 토큰 받기
        const accessToken = await getAccessToken(authCode);

        // 2. 액세스 토큰으로 회원 정보 받기
        const memberInfo = await getMemberWithAccessToken(accessToken);
        console.log("Member Info:", memberInfo);

        if (memberInfo.result === "exists") {
          // 기존 회원인 경우
          dispatch(login(memberInfo.member));
          navigate("/myBook/shelf", { replace: true });
        } else if (memberInfo.result === "new") {
          // 신규 회원인 경우 - username은 kakaoId 사용
          setSocialRegisterData({
            username: memberInfo.kakaoId,
            nickname: "",
            birth: "",
            gender: "",
            preferences: [],
            isSocialLogin: true,
          });
        }
      } catch (error) {
        console.error("카카오 로그인 처리 실패:", error);
        alert("카카오 로그인 처리 중 오류가 발생했습니다.");
        navigate("/member/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    processKakaoLogin();
  }, [authCode, dispatch, navigate]);

  const handleRegisterDataUpdate = (additionalData) => {
    setSocialRegisterData((prev) => ({
      ...prev,
      ...additionalData,
    }));
  };

  const handleStepThreeComplete = () => {
    setCurrentStep(4);
  };

  const handleSocialRegister = async () => {
    try {
      // 백엔드 요구사항에 맞게 데이터 구성
      const registerData = {
        username: socialRegisterData.username,
        nickname: socialRegisterData.nickname,
        birth: socialRegisterData.birth,
        gender: socialRegisterData.gender,
        preferences: socialRegisterData.preferences,
      };

      const response = await registerSocialMember(registerData);

      if (response.result === "success" && response.member) {
        dispatch(login(response.member));
        navigate("/myBook/shelf", { replace: true });
      } else {
        throw new Error(response.msg || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("소셜 회원가입 실패:", error);
      alert(error.message);
      navigate("/member/login", { replace: true });
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <>
      {currentStep === 3 && (
        <SignupStepThree
          registerData={socialRegisterData}
          onRegisterDataUpdate={handleRegisterDataUpdate}
          onComplete={handleStepThreeComplete}
        />
      )}
      {currentStep === 4 && (
        <SignupStepFour
          registerData={socialRegisterData}
          onComplete={handleSocialRegister}
        />
      )}
    </>
  );
};

export default KakaoRedirectPage;
