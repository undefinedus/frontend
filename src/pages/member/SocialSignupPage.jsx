import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MemberLayout from '../../layouts/MemberLayout';
import SignupStepThree from '../../components/member/SignupStepThree';
import SignupStepFour from '../../components/member/SignupStepFour';

const SocialSignupPage = () => {

  const location = useLocation();
  const { kakaoInfo } = location.state;

  console.log(kakaoInfo);

  const [currentStep, setCurrentStep] = useState(3);
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    nickname: "",
    birth: "",
    gender: "",
    preferences: [],
  });

  const handleRegisterDataUpdate = (data) => {
    setRegisterData((prev) => {
      const updated = {
        ...prev,
        ...data,
      };
      return updated;
    });
  };

  useEffect(() => {
    console.log(registerData);
    
  },[registerData]);

  useEffect(() => {
    handleRegisterDataUpdate({username: "kakao_" + kakaoInfo, password: "kakao_" + kakaoInfo})
  }, [kakaoInfo])
  return (
    <>
    <MemberLayout
      value={`${
        currentStep === 3
          ? "거의 다 왔어요!"
          : currentStep === 4
          ? "마지막 단계에요!"
          : ""
      }`}
    >
    
      {currentStep === 3 && (
        <SignupStepThree
          registerData={registerData}
          onRegisterDataUpdate={handleRegisterDataUpdate}
          onComplete={() => setCurrentStep(4)}
        />
      )}
      {currentStep === 4 && <SignupStepFour registerData={registerData} isSocial={true} />}
    </MemberLayout>
  </>
  );
};

export default SocialSignupPage;