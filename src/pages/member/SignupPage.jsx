import { useState } from "react";
import SignupStepOne from "../../components/member/SignupStepOne";
import SignupStepTwo from "../../components/member/SignupStepTwo";
import MemberLayout from "../../layouts/MemberLayout";
import SignupStepThree from "../../components/member/SignupStepThree";
import SignupStepFour from "../../components/member/SignupStepFour";

function SignupPage() {

  const [currentStep, setCurrentStep] = useState(1);
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
  const handleEmailVerified = (email) => {
    setRegisterData((prev) => ({ ...prev, username: email }));
    setCurrentStep(2);
  };

  const handlePasswordSubmit = (password) => {
    setRegisterData((prev) => ({ ...prev, password: password }));
    setCurrentStep(3);
  };

  return (
    <>
      <MemberLayout
        value={`${
          currentStep === 1 || currentStep === 2
            ? "회원가입"
            : currentStep === 3
            ? "거의 다 왔어요!"
            : currentStep === 4
            ? "마지막 단계에요!"
            : ""
        }`}
      >
        {currentStep === 1 && (
          <SignupStepOne onEmailVerified={handleEmailVerified} />
        )}
        {currentStep === 2 && (
          <SignupStepTwo
            email={registerData.username}
            nextButton={() => setCurrentStep(3)}
            onPasswordSubmit={handlePasswordSubmit}
          />
        )}
        {currentStep === 3 && (
          <SignupStepThree
            registerData={registerData}
            onRegisterDataUpdate={handleRegisterDataUpdate}
            onComplete={() => setCurrentStep(4)}
          />
        )}
        {currentStep === 4 && <SignupStepFour registerData={registerData} />}
      </MemberLayout>
    </>
  );
}

export default SignupPage;
