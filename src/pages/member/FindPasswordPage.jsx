import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindPasswordStepOneComponent from "../../components/member/FindPasswordStepOneComponent";
import FindPasswordStepTwoComponent from "../../components/member/FindPasswordStepTwoComponent";
import MemberLayout from "../../layouts/MemberLayout";
import { updatePassword } from "../../api/signupApi";

function FindPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const navigate = useNavigate();

  // 이메일 인증 완료 시 호출되는 함수
  const handleEmailVerified = (email) => {
    setVerifiedEmail(email);
    setCurrentStep(2);
  };

  // 새 비밀번호 설정 완료 시 호출되는 함수
  const handlePasswordSubmit = async (password) => {
    try {
      const response = await updatePassword(verifiedEmail, password);

      if (response.result) {
        navigate("/member/login", {
          replace: true,
          state: {
            message:
              "비밀번호가 성공적으로 변경되었습니다. 새로운 비밀번호로 로그인해주세요.",
          },
        });
        alert("비밀번호가 성공적으로 변경 되었습니다");
      } else {
        // 실패 메시지 처리
        console.error("비밀번호 변경 실패:", response.message);
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
    }
  };

  return (
    <MemberLayout value="비밀번호 찾기">
      <div className="w-full h-full flex flex-col">
        {/* 단계별 컴포넌트 렌더링 */}
        {currentStep === 1 && (
          <FindPasswordStepOneComponent onCheckedEmail={handleEmailVerified} />
        )}
        {currentStep === 2 && (
          <FindPasswordStepTwoComponent
            email={verifiedEmail}
            confirmButton={handlePasswordSubmit}
          />
        )}
      </div>
    </MemberLayout>
  );
}

export default FindPasswordPage;
