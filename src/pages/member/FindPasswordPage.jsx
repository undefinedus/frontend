import React, { useState } from "react";
import FindPasswordStepOneComponent from "../../components/member/FindPasswordStepOneComponent";
import FindPasswordStepTwoComponent from "../../components/member/FindPasswordStepTwoComponent";
import MemberLayout from "../../layouts/MemberLayout";
import { useNavigate } from "react-router-dom";

function FindPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [registerData, setRegisterData] = useState({
    password: "",
  });

  const navigate = useNavigate();

  const handleEmailVerified = (email) => {
    setVerifiedEmail(email);
    setCurrentStep(2);
  };

  const handlePasswordSubmit = (password) => {
    setRegisterData((prev) => ({ ...prev, password: password }));
    navigate("member/login");
  };

  return (
    <MemberLayout value={"비밀번호 찾기"}>
      {currentStep === 1 && (
        <FindPasswordStepOneComponent onCheckedEmail={handleEmailVerified} />
      )}
      {currentStep === 2 && (
        <FindPasswordStepTwoComponent
          email={verifiedEmail}
          confirmButton={handlePasswordSubmit}
        />
      )}
    </MemberLayout>
  );
}

export default FindPasswordPage;
