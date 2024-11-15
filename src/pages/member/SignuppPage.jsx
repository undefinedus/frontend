import React, { useState } from "react";
import SignupStepOne from "../../components/member/SignupStepOne";
import SignupStepTwo from "../../components/member/SignupStepTwo";
import MemberLayout from "../../layouts/MemberLayout";
import PropTypes from "prop-types";

function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const handleEmailVerified = (email) => {
    setVerifiedEmail(email);
    setCurrentStep(2);
  };

  return (
    <>
      <MemberLayout value={"회원가입"}>
        {currentStep === 1 && (
          <SignupStepOne onEmailVerified={handleEmailVerified} />
        )}
        {currentStep === 2 && <SignupStepTwo email={verifiedEmail} />}
      </MemberLayout>
    </>
  );
}

SignupStepOne.propTypes = {
  onEmailVerified: PropTypes.func.isRequired,
};

export default SignupPage;
