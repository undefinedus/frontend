import React, { useEffect, useState } from "react";
import MemberLayout from "../../layouts/MemberLayout";
import Input from "../../components/commons/Input";
import Button from "../../components/commons/Button";
import PropTypes from "prop-types";
import { registMember } from "../../api/signupApi";

const SignupStepTwo = ({ email, confirmButton }) => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState(
    "영문, 숫자, 특수문자 혼용 12~20자로 입력해 주세요"
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // 비밀번호 확인 에러 메시지 상태
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisableCondition, setButtonDisableCondition] = useState(true);

  const confirmButtonHandler = () => {
    if (password !== confirmPassword || strength === "불가") {
      setButtonDisableCondition(true);
    } else if (
      (strength === "안전" || strength === "보통") &&
      password === confirmPassword
    ) {
      setButtonDisableCondition(false);
    }
  };

  const handleRegister = async () => {
    try {
      confirmButton(password);
    } catch (err) {
      console.log("비밀번호 재설정 실패");
    }
  };

  useEffect(() => {
    confirmButtonHandler();
  }, [password, confirmPassword, strength]);

  const evaluateStrength = (password) => {
    // 길이 체크
    const isValidLength = password.length >= 12 && password.length <= 20;

    // 영문, 숫자, 특수문자 체크
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[~!@#$%^&*]/.test(password);

    // 조합 개수 계산
    const count = [hasLetters, hasNumbers, hasSpecialChars].filter(
      Boolean
    ).length;

    // 길이 조건을 만족하지 않으면 "불가"
    if (!isValidLength) {
      return "불가"; // 12자 미만 또는 20자 초과
    }

    // 길이 조건을 만족하는 경우에만 조합 검사
    if (count >= 3) {
      return "안전"; // 3가지 조합 + 12~20자
    } else if (count === 2) {
      return "보통"; // 2가지 조합 + 12~20자
    } else if (count === 1) {
      return "불가"; // 1가지 조합 또는 길이 조건 미달
    } else {
      return ""; // 비밀번호가 비어있을 때
    }
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value === "") {
      setConfirmPasswordError("");
    } else if (password !== value) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다");
    } else {
      setConfirmPasswordError("");
    }
  };

  // 비밀번호 강도 평가
  const handleChange = (e) => {
    const newPassword = e.target.value;
    const newStrength = evaluateStrength(newPassword);
    setPassword(newPassword);
    setStrength(newStrength);

    if (newStrength === "안전" || newStrength === "보통") {
      setPasswordErrorText("사용 가능한 패스워드 입니다.");
    } else {
      setPasswordErrorText("영문, 숫자, 특수문자 혼용 12~20자로 입력해 주세요");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-4">
        <div>
          <Input
            className="border border-undtextgray w-full rounded-full"
            labeltext="아이디"
            readonly={true}
            value={email}
          />
        </div>
        <div>
          <Input
            className="border border-undtextgray w-full"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            labeltext="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
          >
            {strength && (
              <p
                style={{
                  color:
                    strength === "안전"
                      ? "green"
                      : strength === "보통"
                      ? "orange"
                      : "red",
                }}
              >
                {strength}
              </p>
            )}
          </Input>
          <span
            className={`text-xs text-undtextgray flex justify-start mt-1`}
            style={{
              color:
                strength === "안전" || strength === "보통"
                  ? "gray"
                  : strength === "불가"
                  ? "red"
                  : "gray",
            }}
          >
            {passwordErrorText}
          </span>
        </div>
        <div>
          <Input
            className="border border-undtextgray w-full"
            type="password"
            labeltext="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="비밀번호를 입력해 주세요"
          ></Input>
          <span className="text-xs text-red-500 flex justify-start mt-1">
            {confirmPasswordError}
          </span>
        </div>
      </div>
      <div className="flex items-center mb-5">
        <Button
          className="py-2.5 rounded-full w-full"
          color={`${buttonDisableCondition ? "unddisabled" : "undpoint"}`}
          buttonDisabled={buttonDisableCondition}
          onClick={handleRegister}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

SignupStepTwo.propTypes = {
  email: PropTypes.string.isRequired,
  confirmButton: PropTypes.func.isRequired,
};

export default SignupStepTwo;
